# Raquetes e cordas de tênis

Site estático (HTML, CSS e JavaScript puro) que ordena raquetes e cordas por estilo de jogo, nível, cotovelo (dor ou histórico) e orçamento.
Cada especificação tem fonte; sem fonte, o campo fica vazio. Não trata nem diagnostica lesão.

- Abrir: `python3 -m http.server 8000` e acessar http://localhost:8000
- Testes: `node --test tests/*.test.js`
- Dados atuais: 43 raquetes (Wilson, Head, Babolat, Prince, Yonex, Volkl, Tecnifibre, Dunlop), 20 cordas e 17 híbridos de corda; preços consultados em 14/10/2026
- Limiares do motor (por exemplo, rigidez a partir de 65 = rígida) são convenção do projeto, não norma.

Evidência sobre cotovelo: um estudo de laboratório de nível III mostra menor aceleração no cotovelo com tensão mais baixa (Mohandhas et al., Shoulder & Elbow 2016); não há evidência direta sobre rigidez do quadro ou tipo de corda.
