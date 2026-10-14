/* Ilustrações originais (SVG inline) do Set Pointers: silhuetas de atletas, desenho técnico de raquete, quadra.
   Figuras genéricas e anônimas; não representam pessoas reais. */
(function () {
  'use strict';

  const f1 = (n) => Math.round(n * 10) / 10;

  /* Cápsula cônica entre dois pontos: base das silhuetas (membros e tronco). */
  function cap(a, b, w1, w2) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const p = [[a[0] + nx * w1 / 2, a[1] + ny * w1 / 2], [b[0] + nx * w2 / 2, b[1] + ny * w2 / 2], [b[0] - nx * w2 / 2, b[1] - ny * w2 / 2], [a[0] - nx * w1 / 2, a[1] - ny * w1 / 2]];
    return '<path d="M' + p.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L') + 'Z"/><circle cx="' + f1(a[0]) + '" cy="' + f1(a[1]) + '" r="' + f1(w1 / 2) + '"/><circle cx="' + f1(b[0]) + '" cy="' + f1(b[1]) + '" r="' + f1(w2 / 2) + '"/>';
  }

  const bola = (x, y, r) => '<g class="bola"><circle cx="' + x + '" cy="' + y + '" r="' + r + '"/><path d="M' + f1(x - r * .85) + ' ' + f1(y - r * .45) + ' Q' + x + ' ' + y + ' ' + f1(x - r * .85) + ' ' + f1(y + r * .45) + ' M' + f1(x + r * .85) + ' ' + f1(y - r * .45) + ' Q' + x + ' ' + y + ' ' + f1(x + r * .85) + ' ' + f1(y + r * .45) + '" fill="none" stroke-width="1.3"/></g>';

  /* Raquete em linha, presa à mão; ang 0 = apontando para cima. */
  function raquete(h, ang) {
    let c = '';
    for (let i = -3; i <= 3; i++) c += 'M' + i * 4 + ' -53V-5';
    for (let j = 0; j < 7; j++) c += 'M-12 ' + (-48 + j * 7) + 'H12';
    return '<g transform="translate(' + h[0] + ' ' + h[1] + ') rotate(' + ang + ')" class="raq">' +
      '<rect x="-2.6" y="-4" width="5.2" height="24" rx="2.4" class="cabo"/>' +
      '<path d="M-3 -4 L-9 -22 M3 -4 L9 -22" fill="none" stroke-width="2.4"/>' +
      '<ellipse cx="0" cy="-34" rx="15" ry="21" fill="none" stroke-width="3.4"/>' +
      '<path d="' + c + '" fill="none" stroke-width=".7" opacity=".6"/></g>';
  }

  /* Silhueta: p = {head, sh, hip, near:[cotovelo,mão], far:[cotovelo,mão], nearLeg:[joelho,pé], farLeg:[joelho,pé], ang, ball, dir, extra} */
  function atleta(p, alt) {
    const d = p.dir || 1;
    const braco = (s, a, op) => '<g opacity="' + op + '">' + cap(s, a[0], 13, 10) + cap(a[0], a[1], 9.5, 6.5) + '<circle cx="' + a[1][0] + '" cy="' + a[1][1] + '" r="5"/></g>';
    const perna = (q, l, op) => '<g opacity="' + op + '">' + cap(p.hip, l[0], 19, 12) + cap(l[0], l[1], 11.5, 7) + cap([l[1][0], l[1][1] - 3], [l[1][0] + 13 * d, l[1][1] - 1], 7.5, 6) + '</g>';
    return '<svg viewBox="0 0 200 270" role="img" aria-label="' + alt + '" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="104" cy="258" rx="62" ry="5" class="chao"/>' +
      (p.fundo || '') +
      '<g class="corpo">' +
      perna(p.hip, p.farLeg, .55) + braco(p.sh, p.far, .55) +
      cap(p.hip, p.sh, 24, 33) + cap(p.sh, p.head, 8, 8) + '<circle cx="' + p.head[0] + '" cy="' + p.head[1] + '" r="12"/>' +
      perna(p.hip, p.nearLeg, 1) + braco(p.sh, p.near, 1) + '</g>' +
      raquete(p.near[1], p.ang) + (p.ball ? bola(p.ball[0], p.ball[1], 6.5) : '') + '</svg>';
  }

  const REDE = '<g class="rede"><path d="M180 150 V256 M196 150 V256" stroke-width="2.4"/><path d="M180 150 H196" stroke-width="3"/><path d="M180 162 H196 M180 174 H196 M180 186 H196 M180 198 H196 M180 210 H196 M180 222 H196 M180 234 H196 M180 246 H196 M188 150 V256" stroke-width=".8"/></g>';

  const ESTILOS = {
    fundo_agressivo: {
      nome: 'Fundo agressivo', frase: 'Topspin pesado e pancada de forehand desde o fundo da quadra.',
      svg: atleta({ head: [104, 48], sh: [104, 84], hip: [100, 152], near: [[78, 110], [56, 102]], far: [[128, 106], [148, 92]], nearLeg: [[84, 206], [66, 254]], farLeg: [[124, 202], [142, 254]], ang: -38, ball: [172, 76] }, 'Silhueta de jogador preparando um forehand')
    },
    fundo_defensivo: {
      nome: 'Fundo defensivo', frase: 'Devolve tudo: slice, bola alta e paciência no fundo.',
      svg: atleta({ head: [88, 92], sh: [96, 124], hip: [120, 176], near: [[72, 146], [50, 168]], far: [[118, 138], [136, 126]], nearLeg: [[74, 212], [48, 254]], farLeg: [[148, 214], [174, 254]], ang: -98, ball: [24, 214] }, 'Silhueta de jogador em avanço devolvendo uma bola baixa')
    },
    rede: {
      nome: 'Jogo de rede', frase: 'Sobe, fecha o ângulo e resolve o ponto na meia-quadra.',
      svg: atleta({ head: [96, 64], sh: [98, 96], hip: [96, 158], near: [[122, 114], [148, 102]], far: [[78, 116], [94, 132]], nearLeg: [[122, 206], [142, 254]], farLeg: [[74, 206], [56, 254]], ang: 78, ball: [168, 66], fundo: REDE }, 'Silhueta de jogador na rede executando uma voleio')
    },
    completo: {
      nome: 'Completo', frase: 'Saque, fundo e rede. Joga o que o ponto pede.',
      svg: atleta({ head: [102, 58], sh: [104, 94], hip: [102, 158], near: [[136, 88], [142, 52]], far: [[84, 62], [76, 26]], nearLeg: [[112, 210], [118, 254]], farLeg: [[92, 208], [86, 254]], ang: 18, ball: [72, 8] }, 'Silhueta de jogador no momento do saque')
    },
  };

  /* Cotovelo: braço em corte (úmero, cotovelo, antebraço). Ilustra a situação; não é orientação clínica. */
  function braco(tipo, alt) {
    const E = [96, 140], arco = (r, a1, a2) => { const t = (a) => [f1(E[0] + r * Math.cos(a * Math.PI / 180)), f1(E[1] + r * Math.sin(a * Math.PI / 180))]; const p1 = t(a1), p2 = t(a2); return 'M' + p1[0] + ' ' + p1[1] + ' A' + r + ' ' + r + ' 0 0 1 ' + p2[0] + ' ' + p2[1]; };
    const base = '<g class="corpo">' + cap([34, 44], E, 34, 25) + cap(E, [172, 98], 24, 16) + '<circle cx="178" cy="94" r="11"/></g>';
    const anel = '<circle cx="' + E[0] + '" cy="' + E[1] + '" r="19" fill="none" stroke-width="2.6"' + (tipo === 'nao' ? ' class="ok" stroke-dasharray="3 5"' : tipo === 'dor_atual' ? ' class="dor"' : ' class="ok"') + '/>';
    let extra = '';
    if (tipo === 'historico') extra = '<path d="M117 135 L131 160" class="faixa" stroke-width="14" fill="none"/><path d="M117 135 L131 160" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-dasharray="3 4" fill="none"/>';
    if (tipo === 'dor_atual') extra = '<g class="dor" fill="none" stroke-linecap="round" stroke-width="3.4"><path d="' + arco(34, 105, 175) + '"/><path d="' + arco(46, 110, 172) + '" opacity=".6"/><path d="' + arco(58, 115, 170) + '" opacity=".3"/></g>';
    return '<svg viewBox="0 0 200 200" role="img" aria-label="' + alt + '" xmlns="http://www.w3.org/2000/svg">' + base + anel + extra + '</svg>';
  }

  const COTOVELO = {
    nao: { nome: 'Sem queixa', frase: 'Cotovelo tranquilo. Joga solto.', svg: braco('nao', 'Braço em corte sem destaque, cotovelo sem queixa') },
    historico: { nome: 'Já tive dor', frase: 'Cuida da tensão e do quadro antes de entrar em quadra.', svg: braco('historico', 'Braço em corte com faixa abaixo do cotovelo') },
    dor_atual: { nome: 'Dor atual', frase: 'Prioriza o que é mais amigável ao braço; vale avaliação profissional.', svg: braco('dor_atual', 'Braço em corte com marcas de dor no cotovelo') },
  };

  const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g class="bola"><circle cx="32" cy="32" r="29"/><path d="M5 20 Q27 32 5 46 M59 18 Q37 32 59 48" fill="none" stroke-width="3"/></g></svg>';

  /* Quadra em perspectiva, em linhas finas. */
  const QUADRA = '<svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="1.6"><path d="M180 420 L470 40 H730 L1020 420 Z"/><path d="M300 420 L520 40 M900 420 L680 40"/><path d="M262 250 H938"/><path d="M600 40 V420"/><path d="M215 330 H985" opacity=".6"/></g><path d="M430 92 H770" stroke="currentColor" stroke-width="3" stroke-dasharray="2 6"/></svg>';

  /* Desenho técnico: Head Prestige Tour 2023, com as medidas listadas pela loja (dados.js). */
  function raqueteTecnica() {
    let c = '';
    for (let i = 0; i < 16; i++) c += 'M' + f1(104 + i * 10.2) + ' 60V280';
    for (let j = 0; j < 19; j++) c += 'M96 ' + f1(66 + j * 11.5) + 'H264';
    const rot = (n, x, y, t) => '<text x="' + x + '" y="' + y + '" class="tx">' + t + '</text>';
    return '<svg viewBox="0 0 440 560" role="img" aria-label="Desenho técnico de uma raquete com as medidas da Head Prestige Tour 2023" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><clipPath id="cp-cordas"><ellipse cx="180" cy="170" rx="82" ry="106"/></clipPath></defs>' +
      '<g class="rq-tec">' +
      '<ellipse cx="180" cy="170" rx="90" ry="114" fill="none" class="aro" stroke-width="11"/>' +
      '<ellipse cx="180" cy="170" rx="84" ry="108" fill="none" stroke-width="1" opacity=".5"/>' +
      '<g clip-path="url(#cp-cordas)"><path d="' + c + '" fill="none" stroke-width=".9" opacity=".75" transform="translate(-4 -2)"/></g>' +
      '<path d="M127 258 Q150 300 171 340 M233 258 Q210 300 189 340" fill="none" class="aro" stroke-width="9" stroke-linecap="round"/>' +
      '<path d="M141 284 Q180 300 219 284" fill="none" stroke-width="3"/>' +
      '<rect x="168" y="334" width="24" height="150" rx="5" class="cabo-t"/>' +
      '<path d="M168 344 l24 -10 M168 360 l24 -10 M168 376 l24 -10 M168 392 l24 -10 M168 408 l24 -10 M168 424 l24 -10 M168 440 l24 -10 M168 456 l24 -10 M168 472 l24 -10" stroke-width="1.6" opacity=".55"/>' +
      '<rect x="164" y="482" width="32" height="14" rx="4" class="aro"/></g>' +
      /* anotações */
      '<g class="anot" fill="none" stroke-width="1"><path d="M262 92 L312 66 H420"/><path d="M180 170 L330 170 H420" /><path d="M90 170 L40 210 H8" opacity="0"/><path d="M270 250 L330 250 H420"/><path d="M192 410 L330 410 H420"/><path d="M127 120 L84 96 H20"/></g>' +
      '<g class="anot-pt"><circle cx="262" cy="92" r="3.5"/><circle cx="180" cy="170" r="3.5"/><circle cx="270" cy="250" r="3.5"/><circle cx="192" cy="410" r="3.5"/><circle cx="127" cy="120" r="3.5"/></g>' +
      '<g class="rot"><text x="420" y="60" text-anchor="end" class="t1">95 pol²</text><text x="420" y="82" text-anchor="end" class="t2">cabeça</text>' +
      '<text x="420" y="164" text-anchor="end" class="t1">16 × 19</text><text x="420" y="186" text-anchor="end" class="t2">padrão de cordas</text>' +
      '<text x="420" y="244" text-anchor="end" class="t1">330</text><text x="420" y="266" text-anchor="end" class="t2">swingweight</text>' +
      '<text x="420" y="404" text-anchor="end" class="t1">31,5 cm</text><text x="420" y="426" text-anchor="end" class="t2">balanço, 9 pts head-light</text>' +
      '<text x="20" y="90" class="t1">RA 62</text><text x="20" y="112" class="t2">rigidez</text></g>' +
      '<text x="420" y="540" text-anchor="end" class="t2">Head Prestige Tour 2023 · dados da loja</text></svg>';
  }

  const ICONE = {
    raquete: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="10" cy="9" rx="6" ry="7.5" transform="rotate(-35 10 9)" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M14.5 14.5 L21 21" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    corda: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 3V21M15 3V21M3 9H21M3 15H21" stroke="currentColor" stroke-width="1.2"/></svg>',
    hibrido: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 3V21M15 3V21" stroke="currentColor" stroke-width="2.4"/><path d="M3 9H21M3 15H21" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/></svg>',
  };

  function ligar(seletor, grupo, campo) {
    const alvo = document.querySelector(seletor); const sel = document.querySelector('#perfil') && document.querySelector('#perfil')[campo];
    if (!alvo || !sel) return;
    alvo.innerHTML = Object.keys(grupo).map((k) => {
      const e = grupo[k];
      return '<button type="button" class="estilo" data-valor="' + k + '" aria-pressed="false"><span class="fig">' + e.svg + '</span><strong>' + e.nome + '</strong><span class="frase">' + e.frase + '</span></button>';
    }).join('');
    const marcar = () => alvo.querySelectorAll('.estilo').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.valor === sel.value)));
    alvo.addEventListener('click', (ev) => {
      const b = ev.target.closest('.estilo'); if (!b) return;
      sel.value = b.dataset.valor; marcar();
      sel.dispatchEvent(new Event('input', { bubbles: true }));
    });
    sel.addEventListener('change', marcar);
    marcar();
  }

  function montar() {
    const el = (s) => document.querySelector(s);
    if (el('#logo')) el('#logo').innerHTML = LOGO;
    if (el('#quadra')) el('#quadra').innerHTML = QUADRA;
    if (el('#hero-arte')) el('#hero-arte').innerHTML = raqueteTecnica();
    ['raquete', 'corda', 'hibrido'].forEach((k) => { const n = el('#ic-' + k); if (n) n.innerHTML = ICONE[k]; });
    ligar('#estilos', ESTILOS, 'estilo');
    ligar('#cotovelos', COTOVELO, 'cotovelo');
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
  }
})();
