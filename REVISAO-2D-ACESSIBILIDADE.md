# Gráficos 2D e acessibilidade — 17/10/2026

## Arquivos e integração
- `cartesian-math.js`: amostragem, continuidade visual, busca numérica de raízes, extremos suaves, derivada e integral com Simpson/refinamentos. Sem eval e sem dependências novas.
- `cartesian.js`: plano cartesiano Canvas 2D, quatro funções, estilos/marcadores, pan/zoom por mouse/toque/teclado, análise, tabela, PNG/CSV, áudio opcional com Web Audio e integração ao formato JSON existente. Preserva a cena 3D.
- `accessibility.js` e `accessibility.css`: ampliação até 200%, foco, fluxo por teclado, nomes acessíveis, anúncios de resultados, alternativas textuais, contraste e redução de movimentos. Preferências locais separadas.
- `index.html`: módulos e atalhos novos; tutoriais; rótulos explícitos; tabela HTML com cabeçalhos; regiões de resultados; atalhos de teclado para pular navegação.
- Ajustes de integração em `app.js`, `welcome.js`, `mobile-enhancements.js` e `styles.css`.

## Verificação
`tests/cartesian-math.cjs`: raízes cruzadas e tangenciais, funções de escala pequena, rejeição de polos/saltos, ponto não suave, derivadas, extremos, integrais com sinal/refinamento e segmentação.

`tests/cartesian-accessibility.cjs`: menu por interação real, duas funções, dados textuais/tabela, teclado, tangente/integral, projeto JSON, PNG/CSV, início/parada real de áudio, consulta de ponto, ampliação 200%, preferências após recarga, contraste, redução de movimentos, retorno ao 3D, câmera por teclado, foco das boas-vindas, paisagem/retrato em celular emulado.

`tests/full-review.cjs`: regressão dos exemplos e módulos existentes, paletas/temas, projetos/CSV, limpar cena, domínio/parâmetros, seleção de ponto, controles e gravação de vídeo no computador/celular emulado.

Auditoria axe-core nos estados de gráfico 2D e painel de acessibilidade em tamanho padrão; correções de contraste dos textos e controles novos. Essa auditoria cobre apenas os estados exercitados e não demonstra conformidade integral do aplicativo.

Os testes de interface usam Playwright. Configure PLAYWRIGHT_MODULE (se necessário), CHROMIUM_MODULE (adaptador com .default.args e .default.executablePath) e LAB_TEST_URL para a URL do aplicativo. As duas rotinas numéricas podem ser executadas diretamente com Node.

## Limites e próximos testes
- Não houve avaliação manual com leitores de tela nem teste em telefone físico ou com pessoas cegas/com baixa visão.
- Propriedades numéricas são aproximações; singularidades, pontos angulosos e oscilações rápidas exigem análise independente.
- Sem gravação de áudio junto ao vídeo: gravação existente continua capturando exclusivamente a cena 3D. O gráfico 2D oferece PNG e CSV próprios.
- No áudio, a altura do tom é normalizada aos valores amostrados de cada função. Não compara escalas de funções diferentes.
- Os arquivos são locais e não acrescentam servidor, rastreamento nem envio de fórmulas.


## Revisão da disposição da interface 2D
Gráfico com altura flexível, informações em painel lateral e abas Resumo/Análise/Dados/Som. Painel recolhível; oculto inicialmente em telas menores/celular. Recolher e reabrir preservam funções, janela e cálculos. Ao sair da aba Som ou recolher o painel, o áudio é interrompido. Exportações ficam em Dados. Testes `cartesian-sidebar.cjs` verificam dimensões, expansão, abas por teclado, tabela, áudio e ampliação 200% no computador e celular emulado. A regressão `cartesian-accessibility.cjs` foi adaptada às abas e passou em ambos os ambientes.

## Recursos avançados de acessibilidade
- Árvore sintática do interpretador numérico compartilhada com `formula-accessibility.js`: apresentação MathML e leitura por extenso, sem interpretar HTML de entrada.
- `advanced-accessibility.js`: navegação por passo, salto a pontos importantes, sinais sonoros opcionais, cortes de superfícies explícitas e modo de leitura a até 400%, com persistência dos novos ajustes.
- `CartesianMath.behavior`: descrição por amostragem de intervalos e lacunas; não é uma prova de propriedades.
- Cortes são gerados a partir da árvore da função já compilada da superfície: mantém os parâmetros usados na plotagem. A cena original é preservada e a correspondência de eixos é descrita. Sem cortes automáticos de esferas/parametrizações.
- `tests/advanced-accessibility.cjs`: exploração, teclado, raízes/extremos/interseções, MathML e texto, leitura 400%, dois sentidos de corte, parâmetros fixados, estado 3D, JSON, preferências e áudio no computador/celular emulado.
- Testes numéricos incluem descrição amostrada de parábola, constante, polo e região sem valor real. Regressões abrangem os módulos 3D e gravação existentes.
- Roteiro de validação manual pendente em `VALIDACAO-TECNOLOGIAS-ASSISTIVAS.md`.


## Padronização tipográfica
`typography.css` centraliza família e hierarquia. O token legado `--mono` passa a apontar para a mesma família da interface; uso explícito de DM Mono removido. `typography.js` oferece a fonte dos contextos Canvas e redesenha rótulos após o carregamento das fontes locais. Os pesos Space Grotesk 400/500/600/700 permanecem locais; MathML conserva renderização matemática própria.

`tests/typography.cjs` verifica os 19 painéis, disponibilidade dos pesos, fonte dos rótulos 3D e Canvas 2D, layouts de computador/celular, ampliação 200%, leitura 400% e navegação em retrato. Inspeção visual de cálculo/Hessiana e gráficos 2D. A revisão dos módulos e gravação existente continua coberta por `full-review.cjs`.
