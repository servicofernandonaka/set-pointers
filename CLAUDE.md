# Set Pointers (raquetes e cordas de tênis)

Site estático em HTML, CSS e JavaScript puro. Sem build, sem npm. Português do Brasil.
Recomenda raquetes e cordas por estilo de jogo, nível, cotovelo (dor/histórico) e orçamento.

## Comandos
- Servir local: `python3 -m http.server 8000`
- Testes: `node --test tests/*.test.js`

## Estrutura (usar grep; não ler arquivos inteiros sem necessidade)
- `js/dados.js`: raquetes, cordas, híbridos (dois tipos de corda), tipos de corda e fontes (dados, não lógica)
- `js/engine.js`: motor de recomendação, sem DOM; limiares em `LIM` (convenção do projeto)
- `js/app.js`: interface; `js/art.js`: ilustrações SVG originais (personagens por estilo, logo, quadra); `index.html`, `css/styles.css`
- Arte: só personagens originais; nunca retratos ou charges de jogadores reais
- `tests/engine.test.js`: inclui teste de integridade dos dados (toda entrada precisa de fonte)

## Regras
- Todo número tem fonte (URL). Sem fonte, o campo fica `null`. Nunca preencher especificação de memória.
- Preços mudam: guardar só como referência, com a data em `consulta`.
- Cotovelo: orientação geral de equipamento, nunca tratamento. Manter o aviso de evidência limitada.
- Mudar regra do motor = atualizar os testes. Rodar os testes antes de concluir.
- Para dados novos use a skill `adicionar-equipamento`.
