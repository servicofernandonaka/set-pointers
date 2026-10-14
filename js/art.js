/* Ilustrações originais (SVG inline) do Set Pointers. Personagens inventados; não representam pessoas reais. */
(function () {
  'use strict';

  const BOLA = '#d7f23a', BOLA_LN = '#f6ffd0';

  const bola = (x, y, r) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + BOLA + '" stroke="#9db81c" stroke-width="1"/>' +
    '<path d="M' + (x - r * .8) + ' ' + (y - r * .5) + ' Q' + x + ' ' + y + ' ' + (x - r * .8) + ' ' + (y + r * .5) + ' M' + (x + r * .8) + ' ' + (y - r * .5) + ' Q' + x + ' ' + y + ' ' + (x + r * .8) + ' ' + (y + r * .5) + '" fill="none" stroke="' + BOLA_LN + '" stroke-width="1.2"/>';

  /* Raquete: aro oval + cordas + cabo, girada em torno da mão (hx, hy). */
  const raquete = (hx, hy, ang, cor) =>
    '<g transform="translate(' + hx + ' ' + hy + ') rotate(' + ang + ')">' +
    '<rect x="-2.5" y="-4" width="5" height="22" rx="2.5" fill="#2b2b2b"/>' +
    '<ellipse cx="0" cy="-22" rx="14" ry="19" fill="none" stroke="' + cor + '" stroke-width="3.5"/>' +
    '<path d="M-9-34V-10M-3-40V-4M3-40V-4M9-34V-10M-13-26H13M-13-18H13M-11-33H11M-10-12H10" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/></g>';

  /* Personagem: p = {pele, camisa, short, bone, raq, braco:[hx,hy], ang, extra} */
  function figura(p) {
    const [hx, hy] = p.braco;
    return '<svg viewBox="-14 -26 170 198" role="img" aria-label="' + p.alt + '" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="70" cy="160" rx="42" ry="7" fill="#000" opacity=".12"/>' +
      (p.fundo || '') +
      /* pernas */
      '<path d="M58 112 L50 152 M82 112 L92 152" stroke="' + p.pele + '" stroke-width="9" stroke-linecap="round"/>' +
      '<rect x="44" y="148" width="14" height="8" rx="4" fill="#fff" stroke="#c9d3cf"/><rect x="85" y="148" width="14" height="8" rx="4" fill="#fff" stroke="#c9d3cf"/>' +
      /* corpo */
      '<rect x="48" y="66" width="44" height="50" rx="14" fill="' + p.camisa + '"/>' +
      '<rect x="50" y="104" width="40" height="18" rx="8" fill="' + p.short + '"/>' +
      /* braço de trás e da raquete */
      '<path d="M54 76 L38 96" stroke="' + p.pele + '" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M88 76 L' + hx + ' ' + hy + '" stroke="' + p.pele + '" stroke-width="8" stroke-linecap="round"/>' +
      raquete(hx, hy, p.ang, p.raq) +
      /* cabeça (grande, estilo charge) */
      '<circle cx="70" cy="42" r="24" fill="' + p.pele + '"/>' +
      '<circle cx="62" cy="42" r="3" fill="#222"/><circle cx="79" cy="42" r="3" fill="#222"/>' +
      (p.boca || '<path d="M62 52 Q70 58 78 52" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round"/>') +
      (p.bone || '') + (p.extra || '') + '</svg>';
  }

  const ESTILOS = {
    fundo_agressivo: {
      nome: 'O Bate-Forte', frase: 'Fundo de quadra, topspin pesado, pancada de forehand.',
      svg: figura({ alt: 'Personagem de fundo de quadra preparando uma pancada de forehand', pele: '#e0ac7e', camisa: '#e4572e', short: '#222b3a', raq: '#e4572e',
        braco: [112, 72], ang: 60, boca: '<path d="M63 54 Q70 50 77 54" fill="none" stroke="#222" stroke-width="2.4" stroke-linecap="round"/>',
        bone: '<path d="M46 34 Q70 14 94 34 L94 30 Q70 8 46 30Z" fill="#e4572e"/><rect x="45" y="30" width="50" height="6" rx="3" fill="#fff"/>',
        extra: '<path d="M60 36 L66 40 M80 36 L74 40" stroke="#222" stroke-width="2.4" stroke-linecap="round"/>' + bola(122, 40, 7) })
    },
    fundo_defensivo: {
      nome: 'A Muralha', frase: 'Devolve tudo. Paciência, slice e bola alta no fundo.',
      svg: figura({ alt: 'Personagem defensivo com viseira, devolvendo uma bola baixa', pele: '#8d5a3b', camisa: '#2f6fed', short: '#f2f2f2', raq: '#2f6fed',
        braco: [104, 100], ang: 100,
        bone: '<path d="M45 34 Q70 18 95 34 L108 38 L94 40 Q70 30 46 40Z" fill="#fff" stroke="#c9d3cf"/>',
        extra: '<path d="M96 22 q3 6 0 9 q-3-3 0-9z" fill="#7cc3ff"/>' + bola(124, 128, 7) })
    },
    rede: {
      nome: 'O Voleador', frase: 'Sobe à rede, fecha o ângulo, resolve na meia-quadra.',
      svg: figura({ alt: 'Personagem na rede dando uma voleio', pele: '#f1c9a5', camisa: '#f2c200', short: '#3b2a63', raq: '#3b2a63',
        braco: [100, 52], ang: 20,
        fundo: '<g opacity=".9"><rect x="4" y="108" width="132" height="3" fill="#fff"/><path d="M4 111 V160 M136 111 V160" stroke="#c9d3cf" stroke-width="3"/><path d="M4 114 H136 M4 124 H136 M4 134 H136 M4 144 H136 M4 154 H136 M16 111 V160 M32 111 V160 M48 111 V160 M64 111 V160 M80 111 V160 M96 111 V160 M112 111 V160 M128 111 V160" stroke="#fff" stroke-opacity=".45" stroke-width=".8"/></g>',
        bone: '<path d="M46 32 Q70 6 94 32 Z" fill="#3b2a63"/><rect x="44" y="30" width="52" height="5" rx="2.5" fill="#f2c200"/>',
        extra: bola(120, 28, 7) })
    },
    completo: {
      nome: 'O Completo', frase: 'Saque, fundo e rede. Joga o que o ponto pedir.',
      svg: figura({ alt: 'Personagem sacando, com a bola no ar', pele: '#c68642', camisa: '#1b9e77', short: '#fff', raq: '#1b9e77',
        braco: [104, 22], ang: 30,
        bone: '<path d="M46 34 Q70 12 94 34Z" fill="#1b9e77"/><rect x="44" y="32" width="52" height="5" rx="2.5" fill="#fff"/>',
        extra: bola(42, 20, 7) + '<path d="M42 30 V44" stroke="#9db81c" stroke-dasharray="2 3" stroke-width="1.5"/>' })
    },
  };

  /* Personagens do filtro "Cotovelo". Ilustram a situação; não são orientação clínica. */
  const COTOVELO = {
    nao: {
      nome: 'O Inteiro', frase: 'Sem queixa no cotovelo. Joga solto.',
      svg: figura({ alt: 'Personagem sorridente com o braço levantado, sem queixa', pele: '#f1c9a5', camisa: '#0aa5a0', short: '#223', raq: '#0aa5a0',
        braco: [108, 40], ang: 25,
        bone: '<path d="M46 34 Q70 12 94 34Z" fill="#0aa5a0"/><rect x="44" y="32" width="52" height="5" rx="2.5" fill="#fff"/>',
        boca: '<path d="M60 50 Q70 62 80 50Z" fill="#fff" stroke="#222" stroke-width="2" stroke-linejoin="round"/>',
        extra: '<path d="M20 20 l4 8 M30 14 l2 9" stroke="#f2c200" stroke-width="3" stroke-linecap="round"/>' })
    },
    historico: {
      nome: 'O Precavido', frase: 'Já teve dor. Cuida da tensão e do quadro antes de entrar em quadra.',
      svg: figura({ alt: 'Personagem com faixa no antebraço, olhando a raquete com atenção', pele: '#b07a52', camisa: '#7a5cd6', short: '#f2f2f2', raq: '#7a5cd6',
        braco: [106, 84], ang: 70,
        bone: '<path d="M46 34 Q70 12 94 34Z" fill="#7a5cd6"/><rect x="44" y="32" width="52" height="5" rx="2.5" fill="#fff"/>',
        boca: '<path d="M63 54 H77" stroke="#222" stroke-width="2.4" stroke-linecap="round"/>',
        extra: '<path d="M54 36 L66 38 M86 36 L74 38" stroke="#222" stroke-width="2.4" stroke-linecap="round"/><rect x="92" y="75" width="9" height="12" rx="3" transform="rotate(28 96 81)" fill="#f2c200" stroke="#b58f00"/>' })
    },
    dor_atual: {
      nome: 'O Descanso', frase: 'Dor agora. Prioriza o que é mais amigável ao braço; vale avaliação profissional.',
      svg: figura({ alt: 'Personagem com bolsa de gelo no cotovelo e a raquete baixa, em repouso', pele: '#e0ac7e', camisa: '#5aa0e6', short: '#223', raq: '#5aa0e6',
        braco: [100, 104], ang: 150,
        bone: '<path d="M45 34 Q70 18 95 34 L108 38 L94 40 Q70 30 46 40Z" fill="#fff" stroke="#c9d3cf"/>',
        boca: '<path d="M62 56 Q70 50 78 56" fill="none" stroke="#222" stroke-width="2.2" stroke-linecap="round"/>',
        extra: '<path d="M60 38 L66 36 M80 38 L74 36" stroke="#222" stroke-width="2.4" stroke-linecap="round"/><rect x="88" y="76" width="16" height="14" rx="4" fill="#bfe6ff" stroke="#5aa0e6" stroke-width="2"/><path d="M92 80 h8 M92 85 h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><text x="22" y="30" font-size="14" font-family="Georgia,serif" font-weight="700" fill="#5aa0e6">z z</text>' })
    },
  };

  const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="32" cy="32" r="30" fill="' + BOLA + '" stroke="#9db81c" stroke-width="2"/>' +
    '<path d="M6 20 Q26 32 6 46 M58 18 Q38 32 58 48" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>' +
    '<path d="M24 36 L38 22 M31 22 H38 V29" fill="none" stroke="#1d3b2f" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* Quadra em perspectiva simplificada, usada como pano de fundo do topo. */
  const QUADRA = '<svg viewBox="0 0 800 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="3"><path d="M120 214 L330 20 H470 L680 214 Z"/><path d="M200 214 L355 20 M600 214 L445 20"/><path d="M215 150 H585"/><path d="M400 20 V214"/><path d="M175 92 H625"/></g>' +
    '<path d="M110 92 H690" stroke="#fff" stroke-opacity=".9" stroke-width="4" stroke-dasharray="3 6"/></svg>';

  const ICONE = {
    raquete: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="10" cy="9" rx="6" ry="7.5" transform="rotate(-35 10 9)" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14.5 14.5 L21 21" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    corda: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 3V21M15 3V21M3 9H21M3 15H21" stroke="currentColor" stroke-width="1.4"/></svg>',
    hibrido: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 3V21M15 3V21" stroke="currentColor" stroke-width="2.4"/><path d="M3 9H21M3 15H21" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/></svg>',
  };

  function montar() {
    const el = (s) => document.querySelector(s);
    if (el('#logo')) el('#logo').innerHTML = LOGO;
    if (el('#quadra')) el('#quadra').innerHTML = QUADRA;
    ['raquete', 'corda', 'hibrido'].forEach((k) => { const n = el('#ic-' + k); if (n) n.innerHTML = ICONE[k]; });

    ligar('#estilos', ESTILOS, 'estilo');
    ligar('#cotovelos', COTOVELO, 'cotovelo');
    /* Topo: mostra o personagem do estilo e o do cotovelo escolhidos. */
    const heroi = el('#heroi'); const f = el('#perfil');
    if (heroi && f) {
      const atualizar = () => {
        const a = ESTILOS[f.estilo.value], b = COTOVELO[f.cotovelo.value];
        heroi.innerHTML = (a ? '<span class="h-grande">' + a.svg + '</span>' : '') + (b ? '<span class="h-pequeno">' + b.svg + '</span>' : '');
      };
      f.addEventListener('input', atualizar); f.addEventListener('change', atualizar); atualizar();
    }
  }

  /* Cada botão-personagem escolhe uma opção do <select> de mesmo nome e dispara o recálculo. */
  function ligar(seletor, grupo, campo) {
    const alvo = document.querySelector(seletor); const sel = document.querySelector('#perfil') && document.querySelector('#perfil')[campo];
    if (!alvo || !sel) return;
    alvo.innerHTML = Object.keys(grupo).map((k) => {
      const e = grupo[k];
      return '<button type="button" class="estilo" data-valor="' + k + '" aria-pressed="false"><span class="fig">' + e.svg + '</span><strong>' + e.nome + '</strong><span>' + e.frase + '</span></button>';
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

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
  }
})();
