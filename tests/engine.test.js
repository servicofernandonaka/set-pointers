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

test('iniciante: poliéster é penalizado e quadro leve sobe', () => {
  const o = rec({ nivel: 'iniciante' });
  assert.equal(o.raquetes[0].id, 'wilson-clash-100-v3');
  assert.ok(o.cordas.find((x) => x.tipo === 'Poliéster').score < 0);
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
