---
name: adicionar-equipamento
description: Use ao adicionar ou atualizar raquetes ou cordas no site de tênis (dados com fonte, testes e conferência).
---

# Adicionar raquete ou corda

## 1. Coletar com fonte (gasta poucos tokens)
- Peça ao Fernando os modelos. Para cada um, abra a ficha técnica (WebFetch na página da loja ou do fabricante) com um prompt curto: "extraia cabeça, peso, balanço, swingweight, rigidez, viga, padrão". Não leia a página inteira.
- Se a página não trouxer o campo, tente uma segunda fonte; se continuar sem dado, deixe `null`. Nunca preencher de memória.
- Corda: tipo (poliéster, multifilamento, tripa natural, sintética), bitola, preço e fonte. Não inventar rigidez numérica.

## 2. Registrar
- Raquete: objeto em `raquetes` de `js/dados.js` (mesmos campos das existentes). Guardar a rigidez como a fonte a lista e anotar a origem em `nota` se for diferente da escala RA da loja.
- Corda: objeto em `cordas`; o `tipo` precisa existir em `tipos`.
- `id` em minúsculas com hífens e único; `fonte.url` começando com https.
- Atualizar `consulta` quando os preços forem reconsultados.

## 3. Testar
- Rodar `node --test tests/*.test.js`. O teste de integridade barra entrada sem fonte, id repetido e tipo desconhecido.
- Se um modelo novo mudar a ordem esperada nos testes, conferir se a regra do motor continua fazendo sentido antes de ajustar o teste.

## 4. Entregar
- Resumir em 2 linhas: o que entrou, de onde veio cada dado e o resultado dos testes.
