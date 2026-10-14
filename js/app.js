(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sinal = (n) => (n > 0 ? '+' + n : String(n));
  const RIG = { flexivel: 'Flexível', media: 'Média', rigida: 'Rígida' };
  const SW = { leve: 'Leve', medio: 'Médio', pesado: 'Pesado' };

  function motivos(m) {
    return '<ul>' + m.map((x) => '<li><span class="' + (x.pts > 0 ? 'pos' : 'neg') + '">' + sinal(x.pts) + '</span> ' + esc(x.texto) + ' <span class="nota">(' + esc(x.fonte) + ')</span></li>').join('') + '</ul>';
  }
  function cardRaquete(o, i, r) {
    return '<article class="card"><h3>' + esc(o.nome) + '</h3><p class="sub">' + (i === 0 ? '<span class="tag top">Melhor ajuste</span>' : '') +
      '<span class="tag">Rigidez ' + esc(r.rigidez) + ' (' + RIG[o.rigidez] + ')</span><span class="tag">Swingweight ' + esc(r.swingweight) + ' (' + SW[o.swingweight] + ')</span></p>' +
      '<p class="sub">' + esc(r.cabeca_pol2) + ' pol² · ' + esc(r.peso_g) + ' g · padrão ' + r.padrao.mains + 'x' + r.padrao.cross + (r.balanco_pts_hl != null ? ' · ' + r.balanco_pts_hl + ' pts head-light' : '') + '</p>' +
      (o.motivos.length ? motivos(o.motivos) : '<p class="nota">Sem regra específica para este perfil.</p>') +
      o.avisos.map((a) => '<p class="aviso">' + esc(a) + '</p>').join('') +
      (o.tensao ? '<p class="sub">Tensão: ' + esc(o.tensao.texto) + '</p>' : '<p class="sub">Tensão recomendada: sem faixa documentada neste cadastro.</p>') +
      '<p class="src"><a href="' + esc(o.fonte.url) + '" target="_blank" rel="noopener">' + esc(o.fonte.rotulo) + '</a></p></article>';
  }
  function cardCorda(o, i, c) {
    return '<article class="card"><h3>' + esc(o.nome) + '</h3><p class="sub">' + (i === 0 && !o.evitar ? '<span class="tag top">Melhor ajuste</span>' : '') +
      (o.evitar ? '<span class="tag evitar">Evitar com dor atual</span>' : '') + '<span class="tag">' + esc(o.tipo) + '</span><span class="tag">' + esc(c.bitola) + '</span><span class="tag">US$ ' + o.preco_usd.toFixed(2).replace('.', ',') + '</span></p>' +
      '<p class="sub">' + esc(c.nota_loja) + '</p>' +
      (o.motivos.length ? motivos(o.motivos) : '<p class="nota">Sem regra específica para este perfil.</p>') +
      '<p class="src"><a href="' + esc(o.fonte.url) + '" target="_blank" rel="noopener">' + esc(o.fonte.rotulo) + '</a></p></article>';
  }

  function render() {
    const f = $('#perfil');
    const orc = f.orcamento.value.trim();
    const perfil = { estilo: f.estilo.value, nivel: f.nivel.value, cotovelo: f.cotovelo.value, orcamento_usd: orc ? Number(orc) : null };
    let r;
    try { r = Engine.recomendar(perfil, Dados); } catch (e) { $('#avisos').innerHTML = '<p class="aviso">' + esc(e.message) + '</p>'; return; }
    const rq = Object.fromEntries(Dados.raquetes.map((x) => [x.id, x]));
    const cd = Object.fromEntries(Dados.cordas.map((x) => [x.id, x]));
    $('#avisos').innerHTML = r.avisos.map((a) => '<p class="aviso">' + esc(a) + '</p>').join('');
    const rs = r.raquetes.filter((o) => !f.marca.value || rq[o.id].marca === f.marca.value);
    const cs = r.cordas.filter((o) => !f.tipo.value || cd[o.id].tipo === f.tipo.value);
    $('#h-raq').textContent = 'Raquetes (' + rs.length + ')';
    $('#h-cor').textContent = 'Cordas (' + cs.length + ')';
    $('#raquetes').innerHTML = rs.length ? rs.map((o, i) => cardRaquete(o, i, rq[o.id])).join('') : '<p class="nota">Nenhuma raquete desta marca no cadastro.</p>';
    $('#cordas').innerHTML = cs.length ? cs.map((o, i) => cardCorda(o, i, cd[o.id])).join('') : '<p class="nota">Nenhuma corda cadastrada com esses filtros e este orçamento.</p>';
    $('#fora').textContent = r.fora_orcamento ? r.fora_orcamento + ' corda(s) acima do orçamento (preços consultados em ' + Dados.consulta + ').' : 'Preços consultados em ' + Dados.consulta + '; mudam com o tempo.';
  }

  const fm = $('#perfil').marca, ft = $('#perfil').tipo;
  Array.from(new Set(Dados.raquetes.map((x) => x.marca))).sort().forEach((m) => fm.insertAdjacentHTML('beforeend', '<option value="' + esc(m) + '">' + esc(m) + '</option>'));
  Object.keys(Dados.tipos).forEach((t) => ft.insertAdjacentHTML('beforeend', '<option value="' + esc(t) + '">' + esc(Dados.tipos[t].rotulo) + '</option>'));

  $('#fontes').innerHTML = '<strong>Fontes gerais:</strong> ' + Object.values(Dados.fontes).map((s) => '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.rotulo) + '</a>').join(' · ');
  $('#perfil').addEventListener('input', render);
  render();
})();
