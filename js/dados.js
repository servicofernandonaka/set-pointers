/* Dados de raquetes e cordas. REGRA: todo número tem fonte; sem fonte, o campo fica null.
   Preços são de uma consulta pontual (campo "consulta"), como listados pela loja (embalagem de ~12 m / 40 ft); mudam com o tempo.
   "rigidez": valor listado pela loja como "Stiffness" (escala RA); no Gravity MP é o "flex rating" do laboratório TWU.
   "tensao_lb": faixa recomendada pela loja; quando a loja lista só em kg, foi convertida (tensao_nota). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Dados = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const TW = 'Tennis Warehouse (ficha técnica)';
  const TWE = 'Tennis Warehouse Europe (ficha técnica)';
  const KG = 'Faixa listada em kg e convertida para lb.';
  /* R(marca, modelo, cabeca, peso_g, pts_hl, cm, swingweight, rigidez, viga, mains, cross, tensao, fonteRotulo, url, nota) */
  const R = (id, marca, modelo, cabeca_pol2, peso_g, balanco_pts_hl, balanco_cm, swingweight, rigidez, viga_mm, mains, cross, tensao_lb, rotulo, url, nota, tensao_nota) => {
    const o = { id, marca, modelo, cabeca_pol2, peso_g, balanco_pts_hl, balanco_cm, swingweight, rigidez, viga_mm,
      padrao: { mains, cross }, tensao_lb, fonte: { rotulo, url } };
    if (nota) o.nota = nota;
    if (tensao_nota) o.tensao_nota = tensao_nota;
    return o;
  };

  const raquetes = [
    R('wilson-clash-100-v3', 'Wilson', 'Clash 100 v3', 100, 312, 7, 31.98, 308, 54, '24,5 / 24,5 / 24,5', 16, 19, null, TW, 'https://www.tennis-warehouse.com/Wilson_Clash_100_v3/descpageRCWILSON-CL103VD.html'),
    R('wilson-clash-100l-v3', 'Wilson', 'Clash 100L v3', 100, 295, 6, 32.49, 301, 54, '24,5 / 24,5 / 24,5', 16, 19, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Wilson_Clash_100L_V30_Racket/descpage-WC10L3.html?img=1'),
    R('wilson-clash-100-pro-v3', 'Wilson', 'Clash 100 Pro v3', 100, 323, 7, 31.98, 327, 57, '24,5 / 24,5 / 24,5', 16, 20, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Raquette_Wilson_Clash_100_Pro_V3_0/descpageRCWILSON-WC1V3P-FR.html'),
    R('wilson-blade-98-16x19-v9', 'Wilson', 'Blade 98 16x19 v9', 98, 323, 4, 33.02, 324, 62, '21 / 21 / 21', 16, 19, { min: 50, max: 60, otima: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Wilson_Blade_98_16x19_v9/descpageRCWILSON-WB9816.html', 'Tensão ótima (55 lb) conforme a página da Tennis Warehouse (EUA).'),
    R('wilson-blade-98-16x19-v10', 'Wilson', 'Blade 98 16x19 v10', 98, 323, 4, 33, 322, 61, '21,5 / 21,5 / 20,5', 16, 19, { min: 49, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Wilson_Blade_98_16x19_v10_Racket/descpage-WB9810.html?img=1', null, KG),
    R('wilson-blade-100-v10', 'Wilson', 'Blade 100 v10', 100, 318, 4, 33, 319, 61, '22 / 22 / 22', 16, 19, { min: 49, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Wilson_Blade_100_v10_Racket/descpageRCWILSON-WB1001-EN.html?vat=IE', null, KG),
    R('wilson-pro-staff-97-v14', 'Wilson', 'Pro Staff 97 v14', 97, 332, 7, 32, 325, 66, '21,5 / 21,5 / 21,5', 16, 19, null, TW, 'https://www.tennis-warehouse.com/descpageRCWILSON-W97V14.html'),
    R('wilson-ultra-100-v4', 'Wilson', 'Ultra 100 v4', 100, 318, 4, 33.02, 317, 70, '24 / 26,5 / 24,5', 16, 19, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/descpageRCWILSON-WU10V4-EN.html'),
    R('wilson-ultra-100l-v5', 'Wilson', 'Ultra 100L v5', 100, 295, 4, 32.99, 310, 64, '24 / 26,5 / 24,5', 16, 19, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Wilson_Ultra_100L_V5_Racket/descpage-WU10L5.html?img=3'),
    R('babolat-pure-drive-2025', 'Babolat', 'Pure Drive 2025', 100, 318, 4, 32.99, 317, 69, '23 / 26 / 23', 16, 19, null, TWE, 'https://www.tenniswarehouse-europe.com/Raquette_Babolat_Pure_Drive_2025/descpage-BPD25R.html?img=1'),
    R('babolat-pure-drive-team-2025', 'Babolat', 'Pure Drive Team 2025', 100, 301, 5, 32.64, 308, 69, '23 / 26 / 23', 16, 19, { min: 44, max: 53 }, TWE, 'https://www.tenniswarehouse-europe.com/Babolat_Pure_Drive_Team_2025_Racket_/descpage-BRPTR.html?img=1'),
    R('babolat-pure-aero-2023', 'Babolat', 'Pure Aero 2023', 100, 318, 4, 32.99, 318, 66, '23 / 26 / 23', 16, 19, { min: 50, max: 59 }, TW, 'https://www.tennis-warehouse.com/descpageRCBABOLAT-BARO.html'),
    R('babolat-pure-aero-98-2023', 'Babolat', 'Pure Aero 98 (2023)', 98, 323, 6, 32.49, 321, 66, '21 / 23 / 22', 16, 20, null, TW, 'https://www.tennis-warehouse.com/descpageRCBABOLAT-BARO98.html'),
    R('babolat-pure-strike-98-16x19-2025', 'Babolat', 'Pure Strike 98 16x19 (2025)', 98, 323, 4, 33.02, 330, 64, '21 / 23 / 21', 16, 19, { min: 46, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Babolat_Pure_Strike_16x19_2025_Racket/descpage-PS9816.html?img=3', null, KG),
    R('head-speed-mp-2024', 'Head', 'Speed MP 2024', 100, 315, 4, 33.02, 330, 60, '23 / 23 / 23', 16, 19, { min: 48, max: 57, otima: 53 }, 'Tennis Warehouse Europe (ficha) e Tennis Warehouse (faixa de tensão)', 'https://www.tenniswarehouse-europe.com/Head_Speed_MP_2024_Racket/descpage-HSPDM.html?img=1'),
    R('head-speed-pro-2024', 'Head', 'Speed Pro 2024', 100, 329, 6, 32.51, 333, 60, '23 / 23 / 23', 18, 20, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Speed_Pro_2024_Racket/descpage-HSPDP.html?img=1'),
    R('head-gravity-mp-2025', 'Head', 'Gravity MP 2025', 100, 312, null, 33.48, 323, 57, '22 / 22 / 22', 16, 20, null, 'Tennis Warehouse (análise com dados TWU)', 'https://www.tennis-warehouse.com/learning_center/racquet_reviews/HGMPGreview.html', 'Rigidez e swingweight conforme dados do laboratório TWU citados na análise; balanço informado apenas como "head-light".'),
    R('head-radical-mp-2025', 'Head', 'Radical MP 2025', 98, 318, 4, 33.02, 323, 66, '20 / 23 / 21', 16, 19, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Radical_MP_2025_Racket/descpage-HRMP.html?img=1'),
    R('head-extreme-mp-2024', 'Head', 'Extreme MP 2024', 100, 318, 4, 32.99, 323, 66, '23 / 26 / 21', 16, 19, { min: 52, max: 62 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Extreme_MP_2024_Racket/descpage-HREM24.html?img=1'),
    R('head-boom-mp-neon-2025', 'Head', 'Boom MP Neon 2025 (já encordoada)', 100, 312, 6, 32.49, 317, 62, '23 / 24 / 22', 16, 19, { min: 49, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Boom_MP_Neon_2025_Racket_strung/descpage-HBMPNR.html?img=1', 'Versão vendida já encordoada.', KG),
    R('yonex-ezone-98-305', 'Yonex', 'EZONE 98 (305 g)', 98, 323, 6, 32.49, 320, 63, '23,8 / 24,5 / 19,5', 16, 19, { min: 45, max: 60, otima: 53 }, TWE, 'https://www.tenniswarehouse-europe.com/Yonex_EZONE_98_305g_Blast_Blue_Racket/descpage-EZ98BB.html?img=1', 'Tensão ótima (53 lb) conforme a página da Tennis Warehouse (EUA).'),
    R('yonex-ezone-100-300', 'Yonex', 'EZONE 100 (300 g)', 100, 318, 4, 33.02, 315, 68, '24,5 / 26,5 / 23', 16, 19, { min: 44, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Yonex_EZONE_100_300g_Espresso_Racket/descpageRCYONEX-EZ10EB-EN.html', 'A loja lista a cabeça só em cm² (645); equivale a 100 pol².', KG),
    R('yonex-ezone-100l-285', 'Yonex', 'EZONE 100L (285 g)', 100, 301, 3, 33.48, 310, 67, '24,5 / 26,5 / 23', 16, 19, { min: 40, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Yonex_EZONE_100L_285g_Blast_Blue_Racket/descpage-EZ1LBB.html?img=1'),
    R('yonex-vcore-98-305', 'Yonex', 'VCORE 98 (305 g)', 98, 323, 6, 32.49, 321, 63, '23 / 23,5 / 22', 16, 19, { min: 45, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Yonex_VCORE_98_Ruby_Red_305g_Racket/descpage-YVC986.html?img=1'),
    R('dunlop-cx-200-305', 'Dunlop', 'CX 200 (305 g)', 98, 320, 7, 32.08, 308, 64, '21,5 / 21,5 / 21,5', 16, 19, { min: 45, max: 65 }, TWE, 'https://www.tenniswarehouse-europe.com/descpageRCDUNHGER-DCX2S-EN.html'),
    R('dunlop-sx300-300-2025', 'Dunlop', 'SX 300 (300 g, 2025)', 100, 318, 4, 33.02, 318, 69, '23 / 26 / 23', 16, 19, { min: 45, max: 65 }, TWE, 'https://www.tenniswarehouse-europe.com/Dunlop_SX300_300g_2025_Racket/descpage-DSX3R.html?img=1'),
    R('tecnifibre-tf40-305-16x19', 'Tecnifibre', 'TF40 305 16x19', 98, 320, 3, 33.2, 320, 64, '22 / 22 / 22', 16, 19, { min: 49, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Raquette_Tecnifibre_TF40_305g_16x19/descpage-TF40R1.html?img=1'),
    R('prince-phantom-100x-305-2024', 'Prince', 'Phantom 100X 305 (2024)', 100, 323, 6, 32.49, 320, 59, '22 / 20,5 / 18', 16, 18, { min: 45, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Prince_Phantom_100X_305g_2024_Racket/descpage-PHNX5.html?img=1'),
  ];

  /* tipo: 'poliester' | 'multifilamento' | 'tripa_natural' | 'sintetica' */
  const C = (id, marca, modelo, tipo, bitola, preco_usd, nota_loja, url) => ({ id, marca, modelo, tipo, bitola, preco_usd, nota_loja, fonte: { rotulo: 'Tennis Warehouse (ficha)', url } });
  const cordas = [
    C('luxilon-alu-power-16l', 'Luxilon', 'ALU Power 16L/1,25', 'poliester', '16L / 1,25 mm', 16.12, 'Descrita por usuários como rígida; a loja não lista rigidez numérica.', 'https://www.tennis-warehouse.com/Luxilon_ALU_Power_16L_String/descpageACWILSON-ALUSTR.html'),
    C('luxilon-4g-16l', 'Luxilon', '4G 16L/1,25', 'poliester', '16L / 1,25 mm', 21.5, 'Co-polímero monofilamento; a loja a descreve como firme, voltada a controle e efeito. Avaliações de usuários divergem sobre o conforto.', 'https://www.tennis-warehouse.com/Luxilon_4G_16L_125_String/descpageACWILSON-LUX4G125.html'),
    C('solinco-hyper-g-16', 'Solinco', 'Hyper-G 16/1,30', 'poliester', '16 / 1,30 mm', 13.99, 'Co-poliéster monofilamento; a loja a descreve como "médio-firme".', 'https://www.tennis-warehouse.com/Solinco_Hyper-G_16_String/descpageACSOLINCO-SHG16.html'),
    C('solinco-tour-bite-16', 'Solinco', 'Tour Bite 16/1,30', 'poliester', '16 / 1,30 mm', 13.99, 'Co-poliéster moldado; a loja a descreve como firme, com pouca potência, feita para efeito e precisão.', 'https://www.tennis-warehouse.com/Solinco_Tour_Bite_16_130_String/descpageACSOLINCO-STB16.html'),
    C('babolat-rpm-blast-16', 'Babolat', 'RPM Blast 16/1,30', 'poliester', '16 / 1,30 mm', 22, 'Co-poliéster monofilamento; a loja a descreve como firme e durável.', 'https://www.tennis-warehouse.com/Babolat_RPM_Blast_16_String/descpageACBAB-BRPMB16.html'),
    C('tecnifibre-razor-code-16', 'Tecnifibre', 'Razor Code 16/1,30', 'poliester', '16 / 1,30 mm', 19.95, 'Co-poliéster; a loja a descreve como firme e durável, com aditivos para melhorar a sensação.', 'https://www.tennis-warehouse.com/descpage-TFRC16B.html'),
    C('yonex-poly-tour-pro-16l-125', 'Yonex', 'Poly Tour Pro 16L/1,25', 'poliester', '16L / 1,25 mm', 23, 'Co-poliéster; a loja a descreve como um poliéster de toque mais macio e muito amigável ao efeito.', 'https://www.tennis-warehouse.com/Yonex_POLYTOUR_PRO_16L_125_String/descpageACYONEX-YPTP125.html'),
    C('head-hawk-17', 'Head', 'Hawk 17/1,25', 'poliester', '17 / 1,25 mm', 16, 'Co-poliéster; a loja a descreve como firme, porém mais macia e confortável que poliésteres de controle típicos.', 'https://www.tennis-warehouse.com/Head_Hawk_17_125_Strings/descpageACHEAD-HAWK17.html'),
    C('wilson-revolve-spin-16', 'Wilson', 'Revolve Spin 16/1,30', 'poliester', '16 / 1,30 mm', 13.95, 'Co-poliéster moldado; a loja a descreve como de baixa potência e voltada a controle e efeito.', 'https://www.tennis-warehouse.com/Wilson_Revolve_Spin_16_130_String/descpageACWILSON-WRS16.html'),
    C('wilson-nxt-16', 'Wilson', 'NXT 16/1,30', 'multifilamento', '16 / 1,30 mm', 23.95, 'Multifilamento de microfibras com poliuretano; a loja a descreve como macia e confortável.', 'https://www.tennis-warehouse.com/Wilson_NXT_16_String_Natural/descpageACWILSON-NXT16.html'),
    C('wilson-sensation-16', 'Wilson', 'Sensation 16/1,30', 'multifilamento', '16 / 1,30 mm', 13.95, 'Multifilamento; a loja a descreve como macia, confortável e com forte amortecimento de vibração.', 'https://www.tennis-warehouse.com/Wilson_Sensation_16_130_String/descpageACWILSON-SEN16.html'),
    C('tecnifibre-x-one-biphase-16', 'Tecnifibre', 'X-One Biphase 16/1,30', 'multifilamento', '16 / 1,30 mm', 23.95, 'Multifilamento com fibras revestidas de poliuretano; a loja a descreve como muito confortável para o braço.', 'https://www.tennis-warehouse.com/Tecnifibre_X-One_Biphase_16_130_String_/descpageACTFUSA-X116.html'),
    C('tecnifibre-multifeel-16', 'Tecnifibre', 'Multifeel 16/1,30', 'multifilamento', '16 / 1,30 mm', 13.95, 'Multifilamento; a loja a descreve como macia e a recomenda para jogo amigável ao braço e para suavizar quadros rígidos.', 'https://www.tennis-warehouse.com/Tecnifibre_Multifeel_16_130_String_Natural/descpageACTFUSA-MF16.html'),
    C('babolat-xcel-16', 'Babolat', 'Xcel 16/1,30', 'multifilamento', '16 / 1,30 mm', 22, 'Multifilamento; a loja a descreve como confortável e macia para o braço.', 'https://www.tennis-warehouse.com/Babolat_Xcel_16_String/descpageACBAB-BXCL16.html'),
    C('head-velocity-mlt-16', 'Head', 'Velocity MLT 16/1,30', 'multifilamento', '16 / 1,30 mm', 11, 'Multifilamento; a loja a descreve como confortável, porém mais firme e voltada a controle que a média dos multifilamentos.', 'https://www.tennis-warehouse.com/Head_Velocity_MLT_16_130_String/descpageACHEAD-VMLT16.html'),
    C('prince-premier-touch-16', 'Prince', 'Premier Touch 16/1,30', 'multifilamento', '16 / 1,30 mm', 13.95, 'Multifilamento de fitas de polipropileno; a loja a descreve como muito macia, com sensação abafada.', 'https://www.tennis-warehouse.com/Prince_Premier_Touch_16_130_String/descpageACTWABG-PPT16.html'),
    C('babolat-vs-touch-16', 'Babolat', 'VS Touch 16/1,30', 'tripa_natural', '16 / 1,30 mm', 65, 'Tripa natural.', 'https://www.tennis-warehouse.com/Babolat_Touch_VS_Natural_Gut_16_String/descpageACBAB-BNG16.html'),
    C('wilson-natural-gut-16', 'Wilson', 'Natural Gut 16/1,30', 'tripa_natural', '16 / 1,30 mm', 67.5, 'Tripa natural de serosa bovina; a loja diz que é um pouco mais firme que a tripa típica, mas ainda muito confortável.', 'https://www.tennis-warehouse.com/Wilson_Natural_Gut_16_String/descpageACWILSON-WNATY16.html'),
    C('prince-synthetic-gut-duraflex-16', 'Prince', 'Synthetic Gut Duraflex 16/1,30', 'sintetica', '16 / 1,30 mm', 4.76, 'Tripa sintética com núcleo sólido; a loja a descreve como confortável, porém menos macia e viva que um multifilamento. Preço em promoção na consulta.', 'https://www.tennis-warehouse.com/Prince_Synthetic_Gut_16_Duraflex_String/descpageACTWABG-S16.html'),
    C('gamma-synthetic-gut-16', 'Gamma', 'Synthetic Gut 16/1,30', 'sintetica', '16 / 1,30 mm', 4.99, 'Tripa sintética de náilon; a loja a descreve como opção equilibrada entre jogabilidade e durabilidade.', 'https://www.tennis-warehouse.com/Gamma_Synthetic_Gut_16_130_String/descpageACGAMMA-G16.html'),
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
