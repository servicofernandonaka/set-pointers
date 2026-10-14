const test = require('node:test'), assert = require('node:assert');
const E = require('../js/engine.js');
const D = require('../js/dados.js');
const base = { estilo: 'completo', nivel: 'intermediario', cotovelo: 'nao' };
const rec = (o) => E.recomendar(Object.assign({}, base, o), D);

test('integridade: toda raquete e corda tem fonte com URL e campos numéricos ou null', () => {
  D.raquetes.forEach((r) => {
    assert.ok(r.fonte && /^https:\/\//.test(r.fonte.url), r.id + ' sem fonte');
    ['cabeca_pol2', 'peso_g', 'swingweight', 'rigidez', 'balanco_cm'].forEach((k) => assert.ok(r[k] === null || typeof r[k] === 'number', r.id + ' ' + k));
  });
  D.cordas.forEach((c) => {
    assert.ok(c.fonte && /^https:\/\//.test(c.fonte.url), c.id + ' sem fonte');
    assert.ok(D.tipos[c.tipo], c.id + ' tipo desconhecido');
  });
  assert.equal(new Set(D.raquetes.concat(D.cordas).map((x) => x.id)).size, D.raquetes.length + D.cordas.length, 'ids repetidos');
});

test('faixas de rigidez e swingweight', () => {
  assert.equal(E.faixaRigidez(54), 'flexivel');
  assert.equal(E.faixaRigidez(57), 'flexivel');
  assert.equal(E.faixaRigidez(60), 'media');
  assert.equal(E.faixaRigidez(65), 'rigida');
  assert.equal(E.faixaRigidez(null), null);
  assert.equal(E.faixaSwing(308), 'leve');
  assert.equal(E.faixaSwing(320), 'medio');
  assert.equal(E.faixaSwing(325), 'pesado');
});

test('padrão fechado: 16x20 sim, 16x19 não', () => {
  assert.equal(E.fechado({ mains: 16, cross: 20 }), true);
  assert.equal(E.fechado({ mains: 16, cross: 19 }), false);
});

test('dor atual: quadro flexível sobe e quadros rígidos descem', () => {
  const r = rec({ cotovelo: 'dor_atual' }).raquetes;
  const pos = (id) => r.findIndex((x) => x.id === id);
  assert.ok(pos('wilson-clash-100-v3') < pos('babolat-pure-drive-2025'));
  assert.ok(pos('head-gravity-mp-2025') < pos('babolat-pure-aero-98-2023'));
  assert.ok(r[r.length - 1].avisos.length > 0);
});

test('dor atual: poliéster marcado para evitar e nunca fica no topo', () => {
  const c = rec({ cotovelo: 'dor_atual' }).cordas;
  c.filter((x) => x.tipo === 'Poliéster').forEach((x) => assert.equal(x.evitar, true));
  assert.notEqual(c[0].tipo, 'Poliéster');
  assert.ok(['Multifilamento', 'Tripa natural'].includes(c[0].tipo));
});

test('sem cotovelo: fundo agressivo avançado pode preferir poliéster', () => {
  const c = rec({ estilo: 'fundo_agressivo', nivel: 'avancado' }).cordas;
  assert.equal(c[0].tipo, 'Poliéster');
});

test('iniciante: poliéster é penalizado e o topo é um quadro leve', () => {
  const o = rec({ nivel: 'iniciante' });
  assert.equal(o.raquetes[0].swingweight, 'leve');
  assert.ok(o.raquetes[0].score >= o.raquetes[o.raquetes.length - 1].score);
  o.cordas.filter((x) => x.tipo === 'Poliéster').forEach((x) => assert.ok(x.score < 0));
});

test('catálogo: todos os tipos de corda presentes e faixas de tensão coerentes', () => {
  Object.keys(D.tipos).forEach((t) => assert.ok(D.cordas.some((c) => c.tipo === t) || D.hibridos.some((h) => h.componentes.some((c) => c.tipo === t)), 'tipo sem uso: ' + t));
  D.raquetes.forEach((r) => {
    if (r.tensao_lb) {
      assert.ok(r.tensao_lb.min < r.tensao_lb.max, r.id + ' faixa invertida');
      if (r.tensao_lb.otima != null) assert.ok(r.tensao_lb.otima >= r.tensao_lb.min && r.tensao_lb.otima <= r.tensao_lb.max, r.id + ' ótima fora da faixa');
    }
    assert.ok(r.padrao.mains > 0 && r.padrao.cross > 0, r.id + ' padrão');
    assert.ok(r.peso_g > 250 && r.peso_g < 400, r.id + ' peso fora do esperado');
    assert.ok(r.swingweight > 280 && r.swingweight < 360, r.id + ' swingweight fora do esperado');
    assert.ok(r.rigidez > 40 && r.rigidez < 80, r.id + ' rigidez fora do esperado');
  });
  D.cordas.forEach((c) => assert.ok(c.preco_usd > 0, c.id + ' preço'));
});

test('híbridos: dados com fonte, tipos válidos e pelo menos 2 componentes', () => {
  assert.ok(D.hibridos.length >= 10);
  D.hibridos.forEach((h) => {
    assert.ok(/^https:\/\//.test(h.fonte.url), h.id + ' sem fonte');
    assert.equal(h.componentes.length, 2, h.id + ' componentes');
    h.componentes.forEach((c) => { assert.ok(D.tipos[c.tipo], h.id + ' tipo'); assert.ok([null, 'principais', 'cruzadas', 'livre'].includes(c.posicao)); });
    assert.ok(h.preco_usd > 0);
  });
  assert.equal(new Set(D.hibridos.map((h) => h.id)).size, D.hibridos.length);
});

test('híbridos com dor atual: macia nos principais sobe; só poliéster desce e é marcado', () => {
  const h = rec({ cotovelo: 'dor_atual' }).hibridos;
  const pos = (id) => h.findIndex((x) => x.id === id);
  assert.ok(pos('wilson-champions-choice-hybrid-16') < pos('solinco-hyper-g-16l-round-hybrid'));
  assert.ok(h.find((x) => x.id === 'prince-vortex-triad-hybrid').evitar);
  assert.ok(h.find((x) => x.id === 'volkl-v-fuse-hybrid-16').score < h.find((x) => x.id === 'wilson-champions-choice-hybrid-16').score);
  assert.ok(h.find((x) => x.id === 'prince-warrior-hybrid-touch').avisos.length > 0);
});

test('híbridos: orçamento filtra e sugestões genéricas sempre aparecem com fonte', () => {
  const o = rec({ orcamento_usd: 15 });
  assert.ok(o.hibridos.every((x) => x.preco_usd <= 15));
  assert.equal(o.fora_orcamento_hibridos, D.hibridos.filter((x) => x.preco_usd > 15).length);
  ['nao', 'historico', 'dor_atual'].forEach((c) => {
    const s = rec({ cotovelo: c }).sugestoes_hibrido;
    assert.ok(s.length >= 1 && s.every((x) => /^https:\/\//.test(x.fonte.url)));
  });
});

test('marcas incluídas: Volkl, Tecnifibre, Prince e Head Prestige', () => {
  ['Volkl', 'Tecnifibre', 'Prince'].forEach((m) => assert.ok(D.raquetes.some((r) => r.marca === m), m));
  assert.ok(D.raquetes.some((r) => /Prestige/.test(r.modelo)));
});

test('tensão sem valor ótimo usa a faixa inteira para quem não tem queixa', () => {
  const r = D.raquetes.find((x) => x.id === 'head-radical-mp-2025');
  const t = E.sugerirTensao(r, 'nao');
  assert.deepEqual([t.min, t.max], [48, 57]);
});

test('orçamento filtra cordas e informa quantas ficaram de fora', () => {
  const o = rec({ orcamento_usd: 20 });
  assert.ok(o.cordas.every((x) => x.preco_usd <= 20));
  assert.equal(o.fora_orcamento, D.cordas.filter((c) => c.preco_usd > 20).length);
  assert.ok(!o.cordas.some((x) => x.id === 'babolat-vs-touch-16'));
});

test('tensão: com cotovelo usa o terço inferior da faixa; sem cotovelo usa a ótima; sem faixa, nada', () => {
  const sp = D.raquetes.find((r) => r.id === 'head-speed-mp-2024');
  assert.deepEqual([E.sugerirTensao(sp, 'dor_atual').min, E.sugerirTensao(sp, 'dor_atual').max], [48, 51]);
  assert.equal(E.sugerirTensao(sp, 'nao').min, 53);
  assert.equal(E.sugerirTensao(D.raquetes[0], 'dor_atual'), null);
});

test('aviso de evidência limitada só aparece com cotovelo', () => {
  assert.equal(rec({}).avisos.length, 0);
  assert.equal(rec({ cotovelo: 'historico' }).avisos.length, 1);
});

test('perfil inválido gera erro', () => {
  assert.throws(() => rec({ estilo: 'x' }));
  assert.throws(() => rec({ nivel: 'x' }));
  assert.throws(() => rec({ cotovelo: 'x' }));
  assert.throws(() => rec({ orcamento_usd: -5 }));
  assert.throws(() => E.recomendar(null, D));
});

test('Kevlar: híbridos com aramida perdem pontos com cotovelo e são evitados com dor atual', () => {
  const h = rec({ cotovelo: 'dor_atual' }).hibridos;
  ['prince-problend-duraflex-16', 'ashaway-crossfire-ii-16', 'ashaway-crossfire-zx-17'].forEach((id) => {
    const x = h.find((y) => y.id === id);
    assert.equal(x.evitar, true, id); assert.ok(x.score < 0, id);
  });
  assert.equal(rec({ cotovelo: 'historico' }).hibridos.find((y) => y.id === 'prince-problend-duraflex-16').evitar, false);
  assert.notEqual(h[0].tipo.includes('Kevlar'), true);
});

test('Kevlar sem queixa: fundo agressivo avançado ganha ponto; iniciante perde', () => {
  const sc = (o) => rec(o).hibridos.find((y) => y.id === 'prince-problend-duraflex-16').score;
  assert.equal(sc({ estilo: 'fundo_agressivo', nivel: 'avancado' }), 1);
  assert.equal(sc({ nivel: 'iniciante' }), -1);
});

test('posição livre: Duo Feel com dor atual sobe e avisa para pôr a macia nos principais', () => {
  const x = rec({ cotovelo: 'dor_atual' }).hibridos.find((y) => y.id === 'wilson-duo-feel-element-nxt-16');
  assert.equal(x.score, 1); assert.ok(x.avisos[0].includes('qualquer uma'));
});

test('Head Prestige Tour 2023 cadastrada com a ficha da loja', () => {
  const r = D.raquetes.find((x) => x.id === 'head-prestige-tour-2023');
  assert.deepEqual([r.cabeca_pol2, r.peso_g, r.swingweight, r.rigidez, r.balanco_pts_hl, r.balanco_cm], [95, 315, 330, 62, 9, 31.5]);
});
