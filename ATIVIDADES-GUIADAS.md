# Spatial Math 3D — Atividades guiadas

Oito estudos, três etapas por estudo. Registre suas observações antes de conferir as explicações.

## oscillator

### 1. Prever o movimento

Para y″ = −y, y(0) = 1 e v(0) = 0, preveja (y,v) nos instantes 0, π/2 e π. Carregue o exemplo e compare com o gráfico temporal.

**Resposta comentada:** A solução é y = cos(t), v = −sin(t). Os pares são (1,0), (0,−1) e (−1,0). A variável independente aparece como x no módulo de EDO.

### 2. Investigar a energia

Calcule E = (y² + v²)/2 em três instantes. O que deveria acontecer com essa energia?

**Resposta comentada:** Na solução exata E = 1/2, pois cos²(t) + sin²(t) = 1. Também E′ = yv + v(−y) = 0.

### 3. Comparar métodos

Use passo 0,2 e intervalo de 0 a 20. Compare Euler com RK4 e RK45. Explique uma amplitude que cresce numericamente.

**Resposta comentada:** Euler explícito multiplica a energia por 1 + h² a cada passo neste oscilador. Esse crescimento é erro numérico. RK4 e RK45 tendem a aproximar melhor a solução; a tolerância do RK45 controla uma estimativa local, não garante erro global.

## damping

### 1. Observar a amplitude

Carregue y″ = −0,4v − y. Descreva como a amplitude muda ao longo do tempo.

**Resposta comentada:** O movimento oscila com amplitude decrescente. Para estas condições iniciais, y = exp(−0,2t)[cos(√0,96 t) + (0,2/√0,96)sin(√0,96 t)].

### 2. Comparar amortecimentos

Troque o coeficiente de v por 2 e depois por 3, mantendo o termo −y. Compare as trajetórias.

**Resposta comentada:** Para y″ + cv + y = 0: 0 < c < 2 é subamortecido; c = 2 é crítico; c > 2 é superamortecido. Os dois últimos casos não apresentam oscilações periódicas.

### 3. Explicar a perda de energia

Derive E = (y² + v²)/2 para c = 0,4. Quando E′ é zero?

**Resposta comentada:** E′ = yv + v(−0,4v − y) = −0,4v² ≤ 0. É zero nos instantes com v = 0; isso não torna a energia constante durante todo o movimento.

## forced

### 1. Encontrar zeros instantâneos

No sistema x′ = y, y′ = −x − 0,3y + sin(t), encontre onde o campo zera em t = 0 e t = π/2. Esses pontos formam uma solução de equilíbrio?

**Resposta comentada:** O zero instantâneo é (sin(t),0): (0,0) e (1,0). Essa curva não é uma solução do sistema, porque sua primeira coordenada tem derivada cos(t), enquanto x′ = y seria zero.

### 2. Comparar condições iniciais

Compare (1,0), (2,0) e (0,1). Descreva o que acontece com as diferenças após o transiente.

**Resposta comentada:** A diferença entre duas soluções satisfaz o oscilador homogêneo amortecido. Ela tende a zero; as soluções se aproximam da mesma resposta periódica à força.

### 3. Alterar a frequência

Compare sin(t) e sin(2*t) em intervalos suficientemente longos. Qual resposta tem maior amplitude após o transiente?

**Resposta comentada:** A amplitude estacionária para sin(ωt) é 1/√[(1−ω²)² + (0,3ω)²]. Para ω = 1 é aproximadamente 3,33; para ω = 2, 0,327. Medidas antes do fim do transiente podem diferir.

## logistic

### 1. Classificar equilíbrios

Para y′ = y(1−y), encontre os equilíbrios e use f′(y) para classificá-los.

**Resposta comentada:** Os equilíbrios são 0 e 1. Como f′ = 1−2y, 0 é instável e 1 é assintoticamente estável.

### 2. Comparar populações positivas

Simule y(0) = 0,2 e depois y(0) = 2. Compare a direção do movimento.

**Resposta comentada:** Entre 0 e 1 a derivada é positiva; acima de 1 ela é negativa. Ambas as soluções positivas tendem a 1.

### 3. Explorar o domínio

Compare y(0) = 0 e y(0) = −0,2. Para o segundo caso use um intervalo curto antes de ampliar. Explique uma interrupção do cálculo.

**Resposta comentada:** Com y(0) = 0, a solução permanece zero. Para −0,2, y = y₀exp(t)/[1+y₀(exp(t)−1)] diverge em t = ln(6) ≈ 1,792. O cálculo pode parar por limites numéricos; a solução não existe finita para todo t ≥ 0.

## lorenz

### 1. Calcular o vetor inicial

Para σ = 10, ρ = 28, β = 8/3, calcule o vetor de Lorenz no ponto (1,1,1).

**Resposta comentada:** x′ = 10(y−x) = 0; y′ = x(28−z)−y = 26; z′ = xy−(8/3)z = −5/3.

### 2. Comparar trajetórias próximas

Compare x₀ = 1 e x₀ = 1,0001, mantendo y₀ = z₀ = 1. Salve os gráficos ou CSV e compare nos mesmos tempos físicos.

**Resposta comentada:** Trajetórias próximas podem se separar significativamente. RK45 usa passos adaptativos: linhas com o mesmo índice em dois CSV podem ter tempos diferentes. Compare por tempo, com interpolação quando necessário.

### 3. Interpretar a tolerância

Reduza a tolerância do RK45. Compare primeiro um intervalo curto e depois um longo. O que pode concluir?

**Resposta comentada:** Uma tolerância menor pode melhorar a aproximação em intervalos curtos, mas não garante proximidade a longo prazo em um sistema caótico. As equações são determinísticas; sensibilidade e erro numérico limitam previsões prolongadas.

## pitchfork

### 1. Encontrar os ramos

Para x′ = μx − x³, encontre os equilíbrios quando μ < 0, μ = 0 e μ > 0.

**Resposta comentada:** x = 0 existe para todo μ. Para μ > 0 surgem x = ±√μ. Não há outros equilíbrios reais para μ ≤ 0.

### 2. Classificar os ramos

Calcule fₓ em cada ramo e compare com as cores do diagrama.

**Resposta comentada:** Em x = 0, fₓ = μ: estável para μ < 0 e instável para μ > 0. Em ±√μ, fₓ = −2μ < 0: ambos são estáveis.

### 3. Examinar o ponto crítico

Em μ = 0 a derivada é zero. Use a equação completa para determinar o sentido do movimento à direita e à esquerda de 0.

**Resposta comentada:** x′ = −x³ aponta para 0 dos dois lados, que é assintoticamente estável. A linearização é inconclusiva. Cinza no diagrama indica essa limitação, não instabilidade.

## saddle

### 1. Examinar dois cortes

Para f = (x²−y²)/4, examine os cortes y = 0 e x = 0. A origem pode ser um máximo ou mínimo?

**Resposta comentada:** No primeiro corte f = x²/4 ≥ 0; no segundo f = −y²/4 ≤ 0. Há valores maiores e menores que f(0,0) arbitrariamente perto da origem.

### 2. Usar a Hessiana

Calcule o gradiente e a Hessiana na origem. Compare com o painel de cálculo.

**Resposta comentada:** ∇f = (x/2,−y/2). A Hessiana é diagonal com entradas 1/2 e −1/2, determinante −1/4. A origem é um ponto de sela.

### 3. Transformar a superfície

Troque a função por (x²+y²)/4 e depois por −(x²+y²)/4. Classifique a origem em cada caso.

**Resposta comentada:** A soma positiva tem Hessiana positiva definida e mínimo estrito. A soma negativa tem Hessiana negativa definida e máximo estrito. Ambas têm gradiente zero na origem.

## integral

### 1. Descrever a região

Desenhe o triângulo de vértices (0,0), (1,0), (0,1). Escreva os limites de integração na ordem dy dx.

**Resposta comentada:** 0 ≤ x ≤ 1 e 0 ≤ y ≤ 1−x. O limite superior depende de x; não se trata de um retângulo.

### 2. Calcular à mão

Calcule a integral dupla de x+y nesse triângulo e compare com o exemplo.

**Resposta comentada:** A integral interna é x(1−x)+(1−x)²/2 = (1−x²)/2. Integrando de 0 a 1, o resultado é 1/3.

### 3. Inverter a ordem

Use região tipo II: 0 ≤ y ≤ 1 e 0 ≤ x ≤ 1−y. Compare o resultado e as estimativas com n e 2n.

**Resposta comentada:** O resultado continua 1/3. Simpson integra exatamente estes polinômios em aritmética exata; pode haver arredondamento. Uma diferença pequena entre n e 2n não é garantia universal de erro pequeno em outras funções.

