# Revisão do Spatial Math 3D — 01/10/2026

## Correções adicionais
- Alterar a/b/c fora de uma superfície ativa não gera a função padrão nem troca o módulo atual.
- Limpar EDOs, sistemas, campos, parametrizações, integrais ou Taylor mantém a identificação do estudo coerente com os objetos restantes. Sem uma superfície anterior, a cena passa a vazia.
- Inserir uma fórmula de superfície inválida preserva o gráfico e a seleção anterior.
- Teclas de movimento são capturadas somente na caminhada; campos de seleção recebem seu uso normal pelo teclado.
- Uma solicitação de captura do mouse que termina após sair da caminhada é liberada automaticamente.

## Verificações concluídas
- Núcleo numérico: RK45 contra soluções analíticas, tolerâncias, integração reversa, interpolação temporal, raízes, nulclinas e descontinuidades.
- Cálculo: derivadas, Hessiana, pontos críticos, integrais de regiões triangulares e caixas, coeficientes de Taylor e interpretação de expressões.
- Ferramentas: superfícies explícitas e esferas, EDOs de primeira e segunda ordem, sistemas, campos, curvas, superfícies paramétricas, integrais, Taylor e bifurcações.
- Interface: oito paletas em onze estudos, tema claro/noturno, câmera, camadas, cores por altura e domínio, seleção de pontos e plano tangente.
- Fluxos: oito exemplos guiados, registro de respostas, armazenamento, JSON, CSV, PNG, desfazer/refazer, exclusão de objetos e apresentação.
- Celular: categorias em retrato/paisagem e área reduzida, textos dos menus, rolagem, ausência de teclado automático, joystick/setas, canhotos, limpeza de movimento ao perder foco e controles de caminhada.
- Gravação: vídeos reais gravados e baixados em MP4 nos testes de desktop e celular; arquivos inspecionados com ffprobe.

## Ambiente e limites
Testes executados em Chromium automatizado, com desktop e emulação de toque no celular. Não houve erros de JavaScript nos fluxos aprovados. Os testes não substituem a verificação em um aparelho físico; Safari/iPhone, captura do mouse, orientação automática e disponibilidade de MP4 podem variar conforme o navegador. Não é uma garantia de ausência de todo bug possível.
