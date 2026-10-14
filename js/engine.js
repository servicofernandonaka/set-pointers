/* Motor de recomendação (sem DOM). Entrada: perfil do jogador + dados. Saída: listas ordenadas com motivos e fontes.
   Limiares abaixo são CONVENÇÃO DO PROJETO (não normas); as fontes só dão a direção qualitativa. Revisar com a literatura. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Engine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const LIM = { RIGIDA: 65, FLEXIVEL: 57, SW_LEVE: 315, SW_PESADO: 325, FECHADO: 36 };
  const ESTILOS = ['fundo_agressivo', 'fundo_defensivo', 'completo', 'rede'];
  const NIVEIS = ['iniciante', 'intermediario', 'avancado'];
  const COTOVELO = ['nao', 'historico', 'dor_atual'];

  const faixaRigidez = (ra) => (ra == null ? null : ra >= LIM.RIGIDA ? 'rigida' : ra <= LIM.FLEXIVEL ? 'flexivel' : 'media');
  const faixaSwing = (sw) => (sw == null ? null : sw >= LIM.SW_PESADO ? 'pesado' : sw <= LIM.SW_LEVE ? 'leve' : 'medio');
  const totalCordas = (p) => p.mains + p.cross;
  const fechado = (p) => totalCordas(p) >= LIM.FECHADO; // 16x20 = 36 (fechado); 16x19 = 35 (aberto), critério do Tennis Companion

  function validar(p) {
    if (!p || typeof p !== 'object') throw new Error('Perfil ausente');
    if (!ESTILOS.includes(p.estilo)) throw new Error('Estilo inválido: ' + p.estilo);
    if (!NIVEIS.includes(p.nivel)) throw new Error('Nível inválido: ' + p.nivel);
    if (!COTOVELO.includes(p.cotovelo)) throw new Error('Cotovelo inválido: ' + p.cotovelo);
    if (p.orcamento_usd != null && !(typeof p.orcamento_usd === 'number' && p.orcamento_usd > 0)) throw new Error('Orçamento inválido');
  }

  /* Faixa de tensão: só quando a raquete tem faixa documentada. Com cotovelo, sugere o terço inferior da faixa (convenção). */
  function sugerirTensao(r, cotovelo) {
    const t = r.tensao_lb;
    if (!t) return null;
    if (cotovelo === 'nao') {
      return t.otima != null
        ? { min: t.otima, max: t.otima, texto: 'Tensão ótima indicada pela loja: ' + t.otima + ' lb (faixa ' + t.min + ' a ' + t.max + ' lb)' }
        : { min: t.min, max: t.max, texto: 'Faixa indicada pela loja: ' + t.min + ' a ' + t.max + ' lb' };
    }
    const teto = Math.round(t.min + (t.max - t.min) / 3);
    return { min: t.min, max: teto, texto: 'Parte inferior da faixa (' + t.min + ' a ' + teto + ' lb, dentro de ' + t.min + ' a ' + t.max + ' lb)' };
  }

  function pontuarRaquete(r, p, F) {
    let s = 0; const motivos = []; const avisos = [];
    const rig = faixaRigidez(r.rigidez), sw = faixaSwing(r.swingweight);
    const add = (pts, texto, fonte) => { s += pts; motivos.push({ pts, texto, fonte: fonte || 'convenção do projeto' }); };

    if (p.cotovelo !== 'nao') {
      const k = p.cotovelo === 'dor_atual' ? 3 : 2;
      if (rig === 'flexivel') add(k, 'Quadro flexível (rigidez ' + r.rigidez + '): costuma transmitir menos impacto ao braço.', F.specs.rotulo);
      else if (rig === 'rigida') { add(-k, 'Quadro rígido (rigidez ' + r.rigidez + '): tende a transmitir mais impacto ao braço.', F.specs.rotulo); avisos.push('Rigidez alta para quem tem queixa no cotovelo.'); }
      if (sw === 'pesado') add(-1, 'Swingweight alto (' + r.swingweight + '): quadro pesado demais também pode sobrecarregar.', F.specs.rotulo);
    }
    if (p.nivel === 'iniciante') add(sw === 'leve' ? 2 : sw === 'medio' ? 1 : -2, 'Iniciante: quadros mais fáceis de manobrar (swingweight ' + r.swingweight + ').');
    if (p.nivel === 'intermediario' && sw === 'medio') add(1, 'Nível intermediário: swingweight médio (' + r.swingweight + ').');
    if (p.nivel === 'avancado' && sw === 'pesado') add(1, 'Avançado: swingweight alto dá estabilidade (' + r.swingweight + ').', F.specs.rotulo);

    if (p.estilo === 'fundo_agressivo') {
      if (fechado(r.padrao)) add(1, 'Fundo agressivo: padrão fechado (' + r.padrao.mains + 'x' + r.padrao.cross + ') favorece controle.', F.specs.rotulo);
      if (sw !== 'leve') add(1, 'Fundo agressivo: mais massa na cabeça ajuda a estabilidade.', F.specs.rotulo);
    } else if (p.estilo === 'fundo_defensivo') {
      if (!fechado(r.padrao)) add(1, 'Fundo defensivo: padrão aberto (' + r.padrao.mains + 'x' + r.padrao.cross + ') favorece potência e efeito.', F.specs.rotulo);
    } else if (p.estilo === 'rede') {
      if (sw !== 'pesado') add(1, 'Jogo de rede: quadro mais manobrável (swingweight ' + r.swingweight + ').', F.specs.rotulo);
    }
    return { id: r.id, nome: r.marca + ' ' + r.modelo, score: s, motivos, avisos, rigidez: rig, swingweight: sw, tensao: sugerirTensao(r, p.cotovelo), fonte: r.fonte };
  }

  function pontuarCorda(c, p, T, F) {
    let s = 0; const motivos = []; const avisos = [];
    const tipo = T[c.tipo]; const add = (pts, texto, fonte) => { s += pts; motivos.push({ pts, texto, fonte: fonte || 'convenção do projeto' }); };
    if (p.cotovelo !== 'nao') {
      const k = p.cotovelo === 'dor_atual' ? 3 : 2;
      if (tipo.classe === 'macia') add(k, tipo.rotulo + ': tipo macio, em geral mais confortável para o braço.', F.guia_cordas.rotulo);
      else if (tipo.classe === 'rigida') { add(-(k + 1), 'Poliéster: tipo mais rígido; pode ser desconfortável para o braço.', F.guia_cordas.rotulo); avisos.push('Evitar com dor atual no cotovelo.'); }
    } else {
      if (tipo.classe === 'rigida' && p.estilo === 'fundo_agressivo' && p.nivel !== 'iniciante') add(1, 'Golpes longos e rápidos: poliéster dá controle, efeito e durabilidade.', F.guia_cordas.rotulo);
      if (tipo.classe === 'rigida' && p.nivel === 'iniciante') add(-1, 'Iniciante: poliéster pode ser rígido demais para quem tem golpes mais lentos.', F.guia_cordas.rotulo);
    }
    return { id: c.id, nome: c.marca + ' ' + c.modelo, tipo: tipo.rotulo, preco_usd: c.preco_usd, score: s, motivos, avisos, evitar: p.cotovelo === 'dor_atual' && tipo.classe === 'rigida', fonte: c.fonte };
  }

  const ordenar = (a, b) => b.score - a.score || a.nome.localeCompare(b.nome, 'pt-BR');

  function recomendar(perfil, D) {
    validar(perfil);
    const raquetes = D.raquetes.map((r) => pontuarRaquete(r, perfil, D.fontes)).sort(ordenar);
    let cordas = D.cordas;
    let foraOrcamento = 0;
    if (perfil.orcamento_usd != null) {
      cordas = cordas.filter((c) => c.preco_usd != null && c.preco_usd <= perfil.orcamento_usd);
      foraOrcamento = D.cordas.length - cordas.length;
    }
    const cordasP = cordas.map((c) => pontuarCorda(c, perfil, D.tipos, D.fontes)).sort(ordenar);
    const avisos = [];
    if (perfil.cotovelo !== 'nao') {
      avisos.push('Orientação geral de equipamento, não tratamento. A evidência é limitada: há um estudo de laboratório (nível III) mostrando menor aceleração no cotovelo com tensão mais baixa; não há evidência direta sobre rigidez do quadro ou tipo de corda. Dor persistente exige avaliação médica ou fisioterápica.');
    }
    return { raquetes, cordas: cordasP, fora_orcamento: foraOrcamento, avisos };
  }

  return { LIM, ESTILOS, NIVEIS, COTOVELO, faixaRigidez, faixaSwing, fechado, sugerirTensao, recomendar };
});
