# Revisão matemática — versão 14

A revisão conferiu implementações e resultados contra casos conhecidos. Esses testes não constituem uma demonstração de correção para todas as funções aceitas.

## Correções

| Área | Problema observado | Comportamento revisado |
|---|---|---|
| Esferas | O raio era multiplicado pela extensão da cena. | `sphere(3)` mantém raio 3 quando a extensão muda; entradas inválidas são rejeitadas. |
| Exemplo triangular | A explicação descrevia outra região e outro resultado. | A região carregada é `0 ≤ x ≤ 1`, `0 ≤ y ≤ 1−x`; para `x+y`, a integral vale `1/3`. |
| Equilíbrios 2D | Tolerâncias absolutas podiam aceitar um campo pequeno e não nulo como zero. | O resíduo é normalizado por componente a partir de amostras do campo. Um campo constante `1e-12` não gera falsos equilíbrios nos testes. |
| Pontos críticos | Funções pequenas podiam ser tratadas como constantes. | A busca normaliza as componentes do gradiente. A função `1e-12*x` não gera candidatos nos testes; `1e-12*(x²+y²)` mantém seu mínimo na origem. |
| Estabilidade | Produtos e discriminantes podiam exceder ou perder a escala numérica. | A Jacobiana é normalizada antes de calcular autovalores; a exibição preserva valores pequenos. |
| Hessiana | O resultado usava apenas um passo de diferenças finitas. | São comparados `h` e `h/2`, com extrapolação para funções suaves e um indicador de consistência. A classificação fica inconclusiva quando os autovalores não se distinguem desse indicador. |
| Curvas de nível e interseções | Cruzamentos lineares podiam atravessar polos e a vizinhança inválida podia impedir todas as curvas. | Usa-se busca amostrada com refinamento do cruzamento e verificação do resíduo. Regiões inválidas e interseções fora do recorte visual são omitidas. |
| Taylor | Coeficientes menores que `1e-13` eram omitidos da expressão exibida. | Coeficientes finitos e não nulos permanecem na expressão, inclusive em notação científica. |
| Simpson | Intervalos de comprimento zero avaliavam desnecessariamente o integrando. | A integral em um intervalo de comprimento zero retorna zero; limites não finitos são rejeitados. |

## Casos verificados

- RK45: exponencial, oscilador, sistema dependente do tempo e hélice; tolerâncias, rejeição de passos e integração reversa.
- Gradiente e Hessiana de uma forma quadrática com termo misto; sela, mínimo e Hessiana degenerada.
- Equilíbrios e pontos críticos sob escalas pequenas; autovalores de matrizes com escalas muito grandes e muito pequenas.
- Simpson em polinômios, região triangular e caixa tridimensional.
- Coeficientes de Taylor de seno, exponencial e série geométrica.
- Precedência de potências e avaliação seletiva de funções por partes.
- Nulclinas, resíduos de cruzamentos e descarte de alguns cruzamentos de polos.
- Projetos JSON, gráficos temporais, exportações, exemplos, camadas, navegação e abertura offline.

## Limitações importantes

Todas as buscas de raízes e curvas são amostradas. Podem perder soluções, ramos estreitos ou famílias contínuas. A normalização melhora o comportamento sob mudanças de escala, mas não elimina cancelamento, arredondamento ou singularidades. Os limiares de estabilidade são numéricos; casos não hiperbólicos exigem análise adicional.

O indicador entre `h` e `h/2` não é uma cota de erro. A extrapolação pressupõe suavidade local. A checagem para funções por partes pode detectar algumas quebras, sem provar diferenciabilidade. Um passo inadequado ou uma função com escala extrema ainda pode produzir resultados não resolvidos.

As tolerâncias do RK45 controlam uma estimativa do erro local, sem garantir erro global. O método é explícito e pode ser inadequado para problemas rígidos. Marcadores são interpolados linearmente entre amostras. A expressão de referência de uma EDO é fornecida pelo usuário; o programa verifica as condições iniciais, sem provar que ela satisfaz a equação.

As superfícies explícitas continuam recortadas em altura ±5.5. A interseção é calculada entre as funções reais e só é exibida no alcance visual. Malhas de superfície ainda podem deixar de perceber descontinuidades entre amostras. Uma função constante possui uma região inteira como conjunto de nível; isso não é representado como uma única curva.

A diferença entre duas resoluções de Simpson indica sensibilidade ao refinamento; não garante erro. A quadratura exige valores finitos nas amostras, e integrais impróprias não recebem tratamento específico. O módulo de bifurcações cobre equilíbrios escalares suaves e não inclui ciclos periódicos ou bifurcações de sistemas 2D/3D.
