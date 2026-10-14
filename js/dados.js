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
    R('prince-phantom-100x-290-2024', 'Prince', 'Phantom 100X 290 (2024)', 100, 303, 4, 33.02, 317, 59, '22 / 20,5 / 18', 16, 18, { min: 45, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Prince_Phantom_100X_290g_2024_Racket/descpage-PHNX9.html?img=1'),
    R('prince-phantom-100p-310', 'Prince', 'Phantom 100P (310 g)', 100, 326, 6, 32.49, 324, 59, '20,5 / 19,5 / 16,5', 16, 18, { min: 48, max: 58 }, TWE, 'https://www.tenniswarehouse-europe.com/Prince_Phantom_100P_310g_Racket/descpageRCPRINCEH-PHNP1.html'),
    R('prince-ripstick-100-300', 'Prince', 'Ripstick 100 (300 g)', 100, 318, 4, 33.02, 326, 67, '27 / 25,5 / 22', 16, 18, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Prince_Ripstick_100_300g_Racket_/descpage-PRPK30.html?img=1'),
    R('prince-ripstick-100-280', 'Prince', 'Ripstick 100 (280 g)', 100, 295, -1, 34.54, 317, 66, '27 / 25,5 / 22', 16, 18, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Prince_Ripstick_100_280g_Racket_/descpageRCPRINCEH-PRPK28-EN.html', 'Balanço de 1 ponto head-heavy (valor negativo em balanco_pts_hl indica head-heavy).'),
    R('volkl-v-cell-v1-pro', 'Volkl', 'V-Cell V1 Pro', 99, 315, 4, 33.02, 316, 68, '23 / 20 / 23', 16, 19, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Volkl_V-Cell_V1_Pro_Racket/descpage-VCEV1P.html?img=1'),
    R('volkl-v-cell-v1-mp', 'Volkl', 'V-Cell V1 MP', 102, 301, 4, 32.99, 302, 68, '25 / 22 / 28', 16, 19, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Volkl_V-Cell_V1_MP_Racket/descpage-VCEV1M.html?img=5'),
    R('volkl-v-cell-8-300', 'Volkl', 'V-Cell 8 (300 g)', 100, 312, 5, 32.64, 312, 67, '22 / 24 / 22', 16, 18, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Volkl_V-Cell_8_300g_Racket/descpage-VVC8L.html?img=3'),
    R('volkl-vostra-v8-300', 'Volkl', 'Vostra V8 (300 g)', 100, 318, 5, 32.64, 323, 67, '22 / 24 / 22', 16, 18, { min: 50, max: 60 }, TWE, 'https://www.tenniswarehouse-europe.com/Volkl_Vostra_V8_300g_Racket/descpage-VOSV8M.html?img=1'),
    R('tecnifibre-tf40-305-18x20', 'Tecnifibre', 'TF40 305 18x20', 98, 323, 3, 33.32, 330, 64, '22 / 22 / 22', 18, 20, { min: 49, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Tecnifibre_TF40_305g_18x20_Racket/descpage-TF40R2.html?img=1'),
    R('tecnifibre-tf40-290-16x19', 'Tecnifibre', 'TF40 290 16x19', 98, 303, 3, 33.2, 312, 65, '22 / 22 / 22', 16, 19, { min: 49, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Tecnifibre_TF40_290g_16x19_Racket/descpageRCTECNIH-TF40R9-EN.html'),
    R('tecnifibre-tfight-305s', 'Tecnifibre', 'TFight 305S', 98, 320, 6, 32.49, 324, 63, '22,5 / 22,5 / 22,5', 18, 19, { min: 50, max: 55 }, TWE, 'https://www.tenniswarehouse-europe.com/Tecnifibre_TFight_305S_Racket/descpageRCTECNIH-TF305S-EN.html'),
    R('head-prestige-tour-2023', 'Head', 'Prestige Tour 2023', 95, 315, 9, 31.5, 330, 62, '22 / 22 / 22', 16, 19, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Prestige_Tour_2023_Racket/descpageRCHEAD-THPRTR-EN.html'),
    R('head-prestige-mp-2023', 'Head', 'Prestige MP 2023', 99, 326, 3, 33.2, 327, 62, '21,5 / 21,5 / 21,5', 18, 19, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Prestige_MP_2023_Racket/descpageRCHEAD-HPRMP-EN.html'),
    R('head-prestige-mp-l-2023', 'Head', 'Prestige MP L 2023', 99, 318, 6, 32.49, 309, 61, '21,5 / 21,5 / 21,5', 16, 19, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Prestige_MP_L_2023_Racket/descpageRCHEAD-HPRMPL-EN.html'),
    R('head-prestige-pro-2023', 'Head', 'Prestige Pro 2023', 98, 337, 7, 31.98, 324, 58, '20 / 20 / 20', 18, 20, { min: 48, max: 57 }, TWE, 'https://www.tenniswarehouse-europe.com/Head_Prestige_Pro_2023_Racket/descpageRCHEAD-PRPROR-EN.html'),
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

  /* Híbridos: dois tipos de corda no mesmo quadro (um nos principais, outro nas cruzadas).
     "posicao": 'principais' | 'cruzadas' | null (a loja não informa). Só entra o que a ficha informa. */
  const CAT = 'https://www.tennis-warehouse.com/Hybrid_Tennis_String/catpage-HYBRIDS.html';
  const H = (id, marca, modelo, componentes, preco_usd, nota_loja, url, rotulo) =>
    ({ id, marca, modelo, componentes, preco_usd, nota_loja, fonte: { rotulo: rotulo || 'Tennis Warehouse (categoria de híbridos)', url: url || CAT } });
  const comp = (tipo, descricao, posicao) => ({ tipo, descricao, posicao: posicao || null });
  const hibridos = [
    H('wilson-champions-choice-hybrid-16', 'Wilson', "Champion's Choice Hybrid 16",
      [comp('tripa_natural', 'Wilson Natural Gut 16/1,32 mm', 'principais'), comp('poliester', 'Luxilon ALU Power Rough 16L/1,25 mm', 'cruzadas')], 67.5,
      'Tripa natural nos principais (maciez) e poliéster texturizado nas cruzadas (durabilidade, efeito e controle). A loja informa que o conjunto pode ser invertido para mais durabilidade e controle.',
      'https://www.tennis-warehouse.com/Wilson_Champions_Choice_Hybrid_16_String/descpageACWILSON-WCC16.html', 'Tennis Warehouse (ficha)'),
    H('babolat-rpm-blast-17-vs-touch-16', 'Babolat', 'RPM Blast 17 + VS Touch 16',
      [comp('poliester', 'RPM Blast 17/1,25 mm'), comp('tripa_natural', 'VS Touch (tripa natural) 16/1,30 mm')], 49,
      'A loja não informa qual corda vai em cada direção. Preço de uma edição comemorativa dos 150 anos; a categoria lista o mesmo valor.',
      'https://www.tennis-warehouse.com/Babolat_RPM_Blast__Touch_VS_Hybrid_150_Years_String/descpageACBAB-RPMVS150.html', 'Tennis Warehouse (ficha)'),
    H('volkl-v-fuse-hybrid-16', 'Volkl', 'V-Fuse Hybrid 16/1,30',
      [comp('poliester', 'Cyclone (poliéster)', 'principais'), comp('tripa_natural', 'V-Icon (tripa natural)', 'cruzadas')], 29.99,
      'Poliéster nos principais e tripa natural nas cruzadas, conforme a categoria da loja.'),
    H('solinco-tour-bite-17-vanquish-16', 'Solinco', 'Tour Bite 17 + Vanquish 16',
      [comp('poliester', 'Tour Bite 17/1,20 mm'), comp('multifilamento', 'Vanquish 16/1,30 mm')], 13.25,
      'Co-poliéster com multifilamento: controle mantendo uma sensação mais macia (guia de híbridos da loja).'),
    H('wilson-duo-power-alu-power-nxt-power', 'Wilson', 'Duo Power (ALU Power 1,25 + NXT Power 16)',
      [comp('poliester', 'Luxilon ALU Power 1,25 mm'), comp('multifilamento', 'Wilson NXT Power 16')], 25.95, 'A loja lista as duas cordas, sem indicar a posição.'),
    H('prince-problend-duraflex-16', 'Prince', 'ProBlend Duraflex 16/1,30',
      [comp('aramida', 'Kevlar 16/1,30 mm', 'principais'), comp('sintetica', 'Synthetic Gut Duraflex 16/1,30 mm', 'cruzadas')], 12.95,
      'Kevlar nos principais e tripa sintética nas cruzadas, para quem quebra muita corda. A análise da Tennis Warehouse o descreve como o setup mais rígido que testou, de potência muito baixa.',
      'https://www.tennis-warehouse.com/Prince_ProBlend_Duraflex_16_130_String_Gold/descpageACTWABG-PROBL.html', 'Tennis Warehouse (ficha)'),
    H('ashaway-crossfire-ii-16', 'Ashaway', 'Crossfire II 16/1,30',
      [comp('aramida', 'Kevlar trançado com náilon 16/1,30 mm', 'principais'), comp('sintetica', 'Synthetic gut 16/1,30 mm', 'cruzadas')], 14,
      'Kevlar nos principais para durabilidade e tripa sintética nas cruzadas para conforto e controle; indicado pela loja a jogadores de potência, com muito topspin ou que quebram corda.',
      'https://www.tennis-warehouse.com/Ashaway_Crossfire_II_16_130_Kevlar_String/descpageACASH-XFIRE2.html', 'Tennis Warehouse (ficha)'),
    H('ashaway-crossfire-zx-17', 'Ashaway', 'Crossfire ZX 17',
      [comp('aramida', 'Kevlar+ (aramida com PTFE e náilon) 1,25 mm', 'principais'), comp('zyex', 'MonoGut ZX Pro (Zyex) 1,22 mm', 'cruzadas')], 14,
      'Kevlar+ nos principais e Zyex nas cruzadas. A Ashaway recomenda tensão 10 a 15% menor que a de náilon tradicional.',
      'https://www.tennis-warehouse.com/Ashaway_Crossfire_ZX_17_String/descpageACASH-XFIREZX17.html', 'Tennis Warehouse (ficha)'),
    H('wilson-duo-control-4gr-nxt-control-16', 'Wilson', 'Duo Control (Luxilon 4G Rough 1,25 + NXT Control 16)',
      [comp('poliester', 'Luxilon 4G Rough 16L/1,25 mm', 'livre'), comp('multifilamento', 'Wilson NXT Control 16/1,30 mm', 'livre')], 25.95,
      'A loja descreve as duas montagens: a 4G Rough nos principais para mais efeito, ou o inverso para bolas mais chapadas. A Wilson recomenda reduzir a tensão da 4G Rough em pelo menos 10%.',
      'https://www.tennis-warehouse.com/Wilson_Duo_Control_4GR_125__NXT_Control_16_String/descpageACWILSON-DUOC4GNXT.html', 'Tennis Warehouse (ficha)'),
    H('wilson-duo-feel-element-nxt-16', 'Wilson', 'Duo Feel (Luxilon Element 1,25 + NXT 16)',
      [comp('poliester', 'Luxilon Element 1,25 mm', 'livre'), comp('multifilamento', 'Wilson NXT 16/1,30 mm', 'livre')], 25.95,
      'A Wilson informa que qualquer uma das cordas pode ir nos principais e recomenda reduzir a tensão da Element em pelo menos 10%.',
      'https://www.wilson.com/en-us/products/duo-feel-tennis-string-set-rz94973', 'Wilson (ficha)'),
    H('wilson-spin-effect-hybrid', 'Wilson', 'Spin Effect Hybrid',
      [comp('multifilamento', 'Multifilamento macio'), comp('poliester', 'Co-poliéster firme')], 17.95, 'Mistura de multifilamento macio com co-poliéster firme; a loja não informa a posição.'),
    H('wilson-nxt-duo-ii-hybrid-16', 'Wilson', 'NXT Duo II Hybrid 16',
      [comp('poliester', 'Luxilon Adrenaline 16Lg (co-poliéster)', 'livre'), comp('multifilamento', 'Wilson NXT 16', 'livre')], 22.95, 'A loja diz que qualquer uma das duas pode ir nos principais.'),
    H('prince-warrior-hybrid-touch', 'Prince', 'Warrior Hybrid Touch',
      [comp('poliester', 'Co-poliéster'), comp('multifilamento', 'Multifilamento')], 10, 'A loja não informa a posição.'),
    H('head-lynx-spin2-rpet-hybrid', 'Head', 'Lynx Spin2 rPET Hybrid',
      [comp('poliester', 'Poliéster'), comp('poliester', 'Poliéster')], 14.5, 'Combinação poliéster com poliéster, voltada a efeito.'),
    H('solinco-hyper-g-16l-round-hybrid', 'Solinco', 'Hyper-G 16L + Hyper-G Round 16L',
      [comp('poliester', 'Hyper-G 16L (moldada)'), comp('poliester', 'Hyper-G Round 16L (redonda)')], 13.99, 'Combinação poliéster com poliéster.'),
    H('solinco-hyper-mach-bd-hybrid', 'Solinco', 'Hyper-Mach BD Hybrid',
      [comp('poliester', 'Poliéster'), comp('poliester', 'Poliéster')], 14.5, 'Combinação poliéster com poliéster.'),
    H('prince-vortex-triad-hybrid', 'Prince', 'Vortex Triad Hybrid',
      [comp('poliester', 'Poliéster'), comp('poliester', 'Poliéster')], 9.99, 'Combinação toda em poliéster.'),
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
    aramida:        { rotulo: 'Aramida (Kevlar)', classe: 'rigida',
      resumo: 'Muito durável e de baixa potência; a Tennis Warehouse a descreve como o setup mais rígido que testou. Só aparece em híbridos.' },
    zyex:           { rotulo: 'Zyex', classe: 'media',
      resumo: 'Monofilamento da Ashaway descrito como macio; classe intermediária por convenção do projeto. Só aparece em híbridos.' },
    tripa_natural:  { rotulo: 'Tripa natural', classe: 'macia',
      resumo: 'Tipo mais macio, com mais potência e conforto; mantém o conforto mesmo em tensões altas.' },
  };

  const fontes = {
    guia_cordas: { rotulo: 'Tennis Warehouse: Understanding String Stiffness', url: 'https://www.tennis-warehouse.com/Learning_Center/Gear_Guides/Tennis_String/Understanding_String_Stiffness.html' },
    specs: { rotulo: 'Tennis Companion: Racquet specs', url: 'https://tenniscompanion.org/racquet-specs/' },
    tensao_cotovelo: { rotulo: 'Mohandhas et al., Shoulder & Elbow 2016;8(3):184-191', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4950282' },
    revisao_cotovelo: { rotulo: 'De Smedt et al., Br J Sports Med 2007;41(11):816-819', url: 'https://pubmed.ncbi.nlm.nih.gov/17616547/' },
    hibridos_guia: { rotulo: 'Tennis Warehouse: Best Hybrid Strings', url: 'https://www.tennis-warehouse.com/Learning_Center/Gear_Guides/Tennis_String/Best_Hybrid_Strings.html' },
    aramida: { rotulo: 'Tennis Warehouse: análise do Prince ProBlend (Kevlar)', url: 'https://www.tennis-warehouse.com/learning_center/reviews/strings/prince_problend_duraflex.html' },
    hibridos_companion: { rotulo: 'Tennis Companion: Hybrid tennis strings', url: 'https://tenniscompanion.org/hybrid-tennis-strings/' },
  };

  return { consulta: '2026-10-14', raquetes, cordas, hibridos, tipos, fontes };
});
