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

  const POS = { principais: 'principais', cruzadas: 'cruzadas', livre: 'posição livre' };
  function cardHibrido(o, i, h) {
    const comps = h.componentes.map((c) => '<li>' + esc(c.descricao) + (c.posicao ? ' <span class="nota">(' + POS[c.posicao] + ')</span>' : ' <span class="nota">(posição não informada)</span>') + '</li>').join('');
    return '<article class="card"><h3>' + esc(o.nome) + '</h3><p class="sub">' + (i === 0 && !o.evitar ? '<span class="tag top">Melhor ajuste</span>' : '') +
      (o.evitar ? '<span class="tag evitar">Evitar com dor atual</span>' : '') + '<span class="tag">' + esc(o.tipo) + '</span><span class="tag">US$ ' + o.preco_usd.toFixed(2).replace('.', ',') + '</span></p>' +
      '<ul>' + comps + '</ul><p class="sub">' + esc(h.nota_loja) + '</p>' +
      (o.motivos.length ? motivos(o.motivos) : '<p class="nota">Sem regra específica para este perfil.</p>') +
      o.avisos.map((a) => '<p class="aviso">' + esc(a) + '</p>').join('') +
      '<p class="src"><a href="' + esc(o.fonte.url) + '" target="_blank" rel="noopener">' + esc(o.fonte.rotulo) + '</a></p></article>';
  }

  /* Paginação: 10 resultados por vez; o botão revela os próximos 10. Volta a 10 quando um filtro muda. */
  const PASSO = 10;
  const mostrar = { raq: PASSO, cor: PASSO };
  function rodapeLista(id, total, n, rotulo) {
    const el = $(id); if (!el) return;
    if (total <= PASSO) { el.innerHTML = ''; return; }
    const vis = Math.min(n, total), falta = total - vis, prox = Math.min(PASSO, falta);
    el.innerHTML = '<p class="nota" role="status">Mostrando ' + vis + ' de ' + total + ' ' + rotulo + '</p>' +
      (falta > 0 ? '<button type="button" class="mais-btn" data-mais="' + (id === '#mais-raq' ? 'raq' : 'cor') + '">Exibir próximos ' + prox + '</button>' : '');
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
    $('#raquetes').innerHTML = rs.length ? rs.slice(0, mostrar.raq).map((o, i) => cardRaquete(o, i, rq[o.id])).join('') : '<p class="nota">Nenhuma raquete desta marca no cadastro.</p>';
    $('#cordas').innerHTML = cs.length ? cs.slice(0, mostrar.cor).map((o, i) => cardCorda(o, i, cd[o.id])).join('') : '<p class="nota">Nenhuma corda cadastrada com esses filtros e este orçamento.</p>';
    rodapeLista('#mais-raq', rs.length, mostrar.raq, 'raquetes');
    rodapeLista('#mais-cor', cs.length, mostrar.cor, 'cordas');
    const hb = Object.fromEntries(Dados.hibridos.map((x) => [x.id, x]));
    $('#h-hib').textContent = 'Híbridos de corda (' + r.hibridos.length + ')';
    $('#sug-hib').innerHTML = r.sugestoes_hibrido.map((s) => '<p class="aviso"><strong>' + esc(s.titulo) + '.</strong> ' + esc(s.texto) + ' <a href="' + esc(s.fonte.url) + '" target="_blank" rel="noopener">' + esc(s.fonte.rotulo) + '</a></p>').join('');
    $('#hibridos').innerHTML = r.hibridos.length ? r.hibridos.map((o, i) => cardHibrido(o, i, hb[o.id])).join('') : '<p class="nota">Nenhum híbrido cadastrado dentro deste orçamento.</p>';
    $('#fora').textContent = r.fora_orcamento ? r.fora_orcamento + ' corda(s) acima do orçamento (preços consultados em ' + Dados.consulta + ').' : 'Preços consultados em ' + Dados.consulta + '; mudam com o tempo.';
  }

  const fm = $('#perfil').marca, ft = $('#perfil').tipo;
  Array.from(new Set(Dados.raquetes.map((x) => x.marca))).sort().forEach((m) => fm.insertAdjacentHTML('beforeend', '<option value="' + esc(m) + '">' + esc(m) + '</option>'));
  Object.keys(Dados.tipos).filter((t) => Dados.cordas.some((c) => c.tipo === t)).forEach((t) => ft.insertAdjacentHTML('beforeend', '<option value="' + esc(t) + '">' + esc(Dados.tipos[t].rotulo) + '</option>'));

  $('#fontes').innerHTML = '<strong>Fontes gerais:</strong> ' + Object.values(Dados.fontes).map((s) => '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.rotulo) + '</a>').join(' · ');
  $('#n-raq').textContent = Dados.raquetes.length; $('#n-cor').textContent = Dados.cordas.length; $('#n-hib').textContent = Dados.hibridos.length; $('#n-data').textContent = Dados.consulta.split('-').reverse().join('/');
  $('#perfil').addEventListener('input', () => { mostrar.raq = PASSO; mostrar.cor = PASSO; render(); });
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('.mais-btn'); if (!b) return;
    const k = b.dataset.mais; mostrar[k] += PASSO; render();
    const novo = document.querySelector('[data-mais="' + k + '"]'); if (novo) novo.focus({ preventScroll: true });
  });
  render();
})();
