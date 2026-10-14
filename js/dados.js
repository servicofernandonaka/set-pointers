/* Dados de raquetes e cordas. REGRA: todo número tem fonte; sem fonte, o campo fica null.
   Preços são de uma consulta pontual (campo "consulta") e mudam; use só como referência de faixa.
   "rigidez": valor listado pela loja como "Stiffness" (escala RA); no Gravity MP é o "flex rating" do laboratório TWU. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Dados = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const raquetes = [
    { id: 'wilson-clash-100-v3', marca: 'Wilson', modelo: 'Clash 100 v3',
      cabeca_pol2: 100, peso_g: 312, balanco_pts_hl: 7, balanco_cm: 31.98, swingweight: 308, rigidez: 54,
      viga_mm: '24,5 / 24,5 / 24,5', padrao: { mains: 16, cross: 19 }, tensao_lb: null,
      fonte: { rotulo: 'Tennis Warehouse (ficha técnica)', url: 'https://www.tennis-warehouse.com/Wilson_Clash_100_v3/descpageRCWILSON-CL103VD.html' } },
    { id: 'babolat-pure-drive-2025', marca: 'Babolat', modelo: 'Pure Drive 2025',
      cabeca_pol2: 100, peso_g: 318, balanco_pts_hl: 4, balanco_cm: 32.99, swingweight: 317, rigidez: 69,
      viga_mm: '23 / 26 / 23', padrao: { mains: 16, cross: 19 }, tensao_lb: null,
      fonte: { rotulo: 'Tennis Warehouse Europe (ficha técnica)', url: 'https://www.tenniswarehouse-europe.com/Raquette_Babolat_Pure_Drive_2025/descpage-BPD25R.html?img=1' } },
    { id: 'babolat-pure-aero-98-2023', marca: 'Babolat', modelo: 'Pure Aero 98 (2023)',
      cabeca_pol2: 98, peso_g: 323, balanco_pts_hl: 6, balanco_cm: 32.49, swingweight: 321, rigidez: 66,
      viga_mm: '21 / 23 / 22', padrao: { mains: 16, cross: 20 }, tensao_lb: null,
      fonte: { rotulo: 'Tennis Warehouse (ficha técnica)', url: 'https://www.tennis-warehouse.com/descpageRCBABOLAT-BARO98.html' } },
    { id: 'wilson-pro-staff-97-v14', marca: 'Wilson', modelo: 'Pro Staff 97 v14',
      cabeca_pol2: 97, peso_g: 332, balanco_pts_hl: 7, balanco_cm: 32, swingweight: 325, rigidez: 66,
      viga_mm: '21,5 / 21,5 / 21,5', padrao: { mains: 16, cross: 19 }, tensao_lb: null,
      fonte: { rotulo: 'Tennis Warehouse (ficha técnica)', url: 'https://www.tennis-warehouse.com/descpageRCWILSON-W97V14.html' } },
    { id: 'head-speed-mp-2024', marca: 'Head', modelo: 'Speed MP 2024',
      cabeca_pol2: 100, peso_g: 315, balanco_pts_hl: 4, balanco_cm: 33.02, swingweight: 330, rigidez: 60,
      viga_mm: '23 / 23 / 23', padrao: { mains: 16, cross: 19 }, tensao_lb: { min: 48, max: 57, otima: 53 },
      fonte: { rotulo: 'Tennis Warehouse Europe (ficha) e Tennis Warehouse (faixa de tensão)', url: 'https://www.tenniswarehouse-europe.com/Head_Speed_MP_2024_Racket/descpage-HSPDM.html?img=1' } },
    { id: 'head-gravity-mp-2025', marca: 'Head', modelo: 'Gravity MP 2025',
      cabeca_pol2: 100, peso_g: 312, balanco_pts_hl: null, balanco_cm: 33.48, swingweight: 323, rigidez: 57,
      viga_mm: '22 / 22 / 22', padrao: { mains: 16, cross: 20 }, tensao_lb: null,
      nota: 'Rigidez e swingweight conforme dados do laboratório TWU citados na análise; balanço informado apenas como "head-light".',
      fonte: { rotulo: 'Tennis Warehouse (análise com dados TWU)', url: 'https://www.tennis-warehouse.com/learning_center/racquet_reviews/HGMPGreview.html' } },
  ];

  /* tipo: 'poliester' | 'multifilamento' | 'tripa_natural' | 'sintetica' */
  const cordas = [
    { id: 'luxilon-alu-power-16l', marca: 'Luxilon', modelo: 'ALU Power 16L/1,25', tipo: 'poliester',
      bitola: '16L / 1,25 mm', preco_usd: 16.12, nota_loja: 'Descrita por usuários como rígida; a loja não lista rigidez numérica.',
      fonte: { rotulo: 'Tennis Warehouse (ficha)', url: 'https://www.tennis-warehouse.com/Luxilon_ALU_Power_16L_String/descpageACWILSON-ALUSTR.html' } },
    { id: 'solinco-hyper-g-16', marca: 'Solinco', modelo: 'Hyper-G 16/1,30', tipo: 'poliester',
      bitola: '16 / 1,30 mm', preco_usd: 13.99, nota_loja: 'Co-poliéster monofilamento; a loja a descreve como "médio-firme".',
      fonte: { rotulo: 'Tennis Warehouse (ficha)', url: 'https://www.tennis-warehouse.com/Solinco_Hyper-G_16_String/descpageACSOLINCO-SHG16.html' } },
    { id: 'wilson-nxt-16', marca: 'Wilson', modelo: 'NXT 16/1,30', tipo: 'multifilamento',
      bitola: '16 / 1,30 mm', preco_usd: 23.95, nota_loja: 'Multifilamento de microfibras com poliuretano; a loja a descreve como macia e confortável.',
      fonte: { rotulo: 'Tennis Warehouse (ficha)', url: 'https://www.tennis-warehouse.com/Wilson_NXT_16_String_Natural/descpageACWILSON-NXT16.html' } },
    { id: 'babolat-vs-touch-16', marca: 'Babolat', modelo: 'VS Touch 16/1,30', tipo: 'tripa_natural',
      bitola: '16 / 1,30 mm', preco_usd: 65.0, nota_loja: 'Tripa natural.',
      fonte: { rotulo: 'Tennis Warehouse (ficha)', url: 'https://www.tennis-warehouse.com/Babolat_Touch_VS_Natural_Gut_16_String/descpageACBAB-BNG16.html' } },
  ];

  /* Rigidez por TIPO de corda, conforme o guia da Tennis Warehouse: poliéster é o tipo mais rígido,
     tripa natural o mais macio, multifilamento é macio, sintética fica no meio. */
  const tipos = {
    poliester:      { rotulo: 'Poliéster', classe: 'rigida',
      resumo: 'Mais controle, efeito e durabilidade; menos potência e conforto. Indicada para golpes longos e rápidos.' },
    sintetica:      { rotulo: 'Tripa sintética', classe: 'media',
      resumo: 'Rigidez intermediária; opção econômica para uso geral.' },
    multifilamento: { rotulo: 'Multifilamento', classe: 'macia',
      resumo: 'Macia, imita a tripa natural; boa potência, conforto e sensação, com custo menor.' },
    tripa_natural:  { rotulo: 'Tripa natural', classe: 'macia',
      resumo: 'Tipo mais macio, com mais potência e conforto; mantém o conforto mesmo em tensões altas.' },
  };

  const fontes = {
    guia_cordas: { rotulo: 'Tennis Warehouse: Understanding String Stiffness', url: 'https://www.tennis-warehouse.com/Learning_Center/Gear_Guides/Tennis_String/Understanding_String_Stiffness.html' },
    specs: { rotulo: 'Tennis Companion: Racquet specs', url: 'https://tenniscompanion.org/racquet-specs/' },
    tensao_cotovelo: { rotulo: 'Mohandhas et al., Shoulder & Elbow 2016;8(3):184-191', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4950282' },
    revisao_cotovelo: { rotulo: 'De Smedt et al., Br J Sports Med 2007;41(11):816-819', url: 'https://pubmed.ncbi.nlm.nih.gov/17616547/' },
  };

  return { consulta: '2026-10-14', raquetes, cordas, tipos, fontes };
});
