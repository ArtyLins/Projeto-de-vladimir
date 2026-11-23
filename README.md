# Spatial Math 3D

Spatial Math 3D é um laboratório matemático 3D para navegador, destinado ao estudo de funções, cálculo diferencial e integral, equações diferenciais, campos vetoriais, sistemas dinâmicos e bifurcações.

Este repositório é uma aplicação web estática: não exige instalação de pacotes ou um processo de compilação.

## Documentação

- [Manual do usuário](#manual-de-utilização)
- [Atividades guiadas para estudantes](ATIVIDADES-GUIADAS.md)
- [Arquivo complementar em português](LEIA-ME.txt)
- [Revisão dos casos matemáticos](REVISAO-MATEMATICA.md)
- [Acessibilidade em 2D](REVISAO-2D-ACESSIBILIDADE.md)
- [Uso em computador e celular](REVISAO-PC-CELULAR.md)
- [Validação de tecnologias assistivas](VALIDACAO-TECNOLOGIAS-ASSISTIVAS.md)

## Tecnologias

- **HTML5** — estrutura da interface em `index.html`.
- **CSS3** — temas, layout responsivo, tipografia e estilos de acessibilidade.
- **JavaScript moderno** — aplicação executada diretamente pelo navegador.
- **Canvas 2D** — gráficos cartesianos, gráficos temporais e exportações de imagem.
- **WebGL/Three.js** — cenas 3D, superfícies, trajetórias, vetores e controles de câmera.
- **OrbitControls** — movimento de órbita da câmera.
- **Web Audio API** — recursos sonoros de análise e acessibilidade.
- **Local Storage** — preferências, tema e ajustes lembrados no navegador.
- **JSON, CSV, PNG e WebM/MP4** — formatos de projeto e exportação.

Os scripts de Three.js e seus controles são carregados de `vendor/`. O projeto não usa npm, Node.js ou outro gerenciador de dependências em tempo de execução. O diretório deve ser publicado integralmente para que os arquivos locais de CSS, fontes, scripts, ícones e bibliotecas sejam encontrados.

## Estrutura do projeto

| Caminho | Função |
|---|---|
| `index.html` | Estrutura da página e dos painéis dos módulos |
| `styles.css`, `accessibility.css`, `typography.css` | Estilos gerais, acessibilidade e tipografia |
| `app.js` | Cenas 3D, integração dos módulos e exportações |
| `numerical.js` | RK45, interpolação temporal, curvas de nível e buscas numéricas |
| `cartesian-math.js` | Operações e amostragem usadas pelos gráficos 2D |
| `cartesian.js` | Interface e exportação dos gráficos 2D |
| `activities.js` | Caderno e atividades guiadas |
| `point-inspector.js` | Investigação de pontos na superfície |
| `interface-tools.js` | Ferramentas gerais da interface |
| `accessibility.js`, `advanced-accessibility.js`, `formula-accessibility.js` | Recursos assistivos |
| `mobile-controls.js`, `mobile-enhancements.js`, `mobile-layout.js` | Controles e adaptação móvel |
| `preferences.js`, `theme.js` | Preferências e tema |
| `recording.js` | Gravação da cena |
| `tutorials.js`, `welcome.js` | Ajuda inicial e tutoriais |
| `ATIVIDADES-GUIADAS.md` | Oito estudos com respostas comentadas |

## Instalação

### Pré-requisitos

- Navegador moderno com suporte a JavaScript, Canvas e WebGL.
- Para edição: Git e um editor de texto.
- Nenhuma biblioteca de terceiros precisa ser instalada localmente.

### Obter o projeto

```bash
git clone <URL_DO_REPOSITÓRIO>
cd Projeto-de-vladimir
```

Substitua `<URL_DO_REPOSITÓRIO>` pela URL fornecida pelo seu professor ou pela página do repositório.

### Executar localmente

#### Opção recomendada: servidor HTTP local

Com Python 3:

```bash
python3 -m http.server 8000
```

Com a extensão Live Server no VS Code, abra `index.html` e escolha **Open with Live Server**.

Em seguida, acesse:

```text
http://localhost:8000/
```

Usar um servidor local é recomendado, pois permite que o navegador carregue os scripts, fontes e recursos locais sem restrições próprias da abertura direta de arquivos.

#### Outra opção

Abra `index.html` diretamente no navegador. Funções, preferências e recursos locais podem variar conforme as permissões do navegador.

### Atualizar uma cópia local

```bash
git pull --ff-only
```

Recarregue a página pelo navegador. Em caso de recurso antigo em cache, use a atualização forçada do navegador.

## Arquitetura e módulos matemáticos

A aplicação usa uma interface HTML com módulos independentes registrados pela página. Os scripts compartilham o estado da cena e salvam entradas no navegador. Os cálculos numéricos ficam principalmente em `numerical.js` e nos módulos específicos de gráficos e painel.

### Gráficos e superfícies

- **Gráficos 2D:** até quatro funções de uma variável, tangente em um ponto e integral definida.
- **Funções e gráficos 3D:** superfícies explícitas, esferas e parâmetros.
- **Cortes acessíveis:** curvas de um corte fixo em x ou y, com tabela e som.
- **Domínio e interseções:** extensão do plano XY e curvas entre superfícies.
- **Curvas e superfícies parametrizadas:** visualização de parametrizações.

### Cálculo

- **Derivadas e Hessiana:** gradiente, plano tangente, pontos críticos e classificação por matriz Hessiana.
- **Integrais:** integrais duplas, triplas e de linha com Simpson.
- **Taylor:** aproximações locais de ordem 1 a 10.

### Dinâmica

- **EDOs de primeira e segunda ordem:** Euler, Heun, RK4 e RK45 adaptativo.
- **Sistemas 2D:** trajetórias, nulclinas, campos e comparação de condições iniciais.
- **Campos e sistemas 3D:** divergente, rotacional e trajetórias.
- **Bifurcações:** equilíbrios de uma equação escalar ao variar um parâmetro.

### Laboratório

- Atividades guiadas, camadas, aparência, câmera e animação.
- Acessibilidade, tutoriais e inspeção de projetos.
- Exportação de projeto JSON, dados CSV, imagens PNG e vídeos da cena.

## Limites numéricos

Os cálculos usam amostragem e métodos numéricos. Não provam a existência ou a inexistência global de resultados.

- O RK45 usa uma estimativa incorporada do erro local; não garante erro global.
- Curvas, raízes e pontos críticos são encontrados por busca amostrada.
- Integrais dependem da suavidade da função e do refinamento escolhido.
- Sistemas caóticos podem amplificar pequenas diferenças de condições iniciais.
- Funções por partes devem ser analisadas com cuidado nos pontos de troca de ramo.

Limitações completas estão em [REVISAO-MATEMATICA.md](REVISAO-MATEMATICA.md).

## Publicação

Como o projeto não possui etapa de compilação, o conteúdo pode ser publicado como site estático.

### GitHub Pages

1. Envie a pasta completa para a branch utilizada pelo repositório.
2. Em **Settings > Pages**, escolha **Deploy from a branch**.
3. Selecione a branch e a raiz `/ (root)`.
4. Aguarde a publicação e use a URL fornecida pelo GitHub Pages.

Não publique apenas `index.html`: a página depende dos diretórios locais de scripts, estilos e recursos.

### Atualização da publicação

```bash
git pull --ff-only
git add .
git commit -m "Atualiza Spatial Math 3D"
git push
```

Depois do push, aguarde a conclusão da implantação configurada no repositório. Em GitHub Pages, o novo conteúdo aparece após a publicação da branch.

## Manual de utilização

### Primeiro acesso

1. Abra o Spatial Math 3D no navegador.
2. Ao concluir ou pular a abertura, escolha uma categoria no menu superior.
3. Escolha uma ferramenta na lista **Módulos**.
4. Preencha as expressões, ajuste os limites e selecione o botão de geração ou cálculo.
5. Use o painel de camadas para mostrar ou ocultar objetos da cena.

### Expressões matemáticas

Use `x` e `y` nas superfícies; use `t` no tempo das soluções. Operadores comuns são `+`, `-`, `*`, `/` e `^`. Exemplos:

```text
sin(sqrt(x² + y²))
(x² - y²) / 8
cos(x) * sin(y)
```

Funções disponíveis incluem seno, cosseno, exponencial, logaritmo, raiz quadrada e valor absoluto. Considere os domínios reais: resultados fora do domínio podem ser omitidos ou informar erro.

### Navegação 3D

- Arraste com o botão esquerdo para girar.
- Use a roda do mouse para aproximar ou afastar.
- Clique com o botão direito e arraste para deslocar a cena.
- Em dispositivos de toque, use os gestos indicados pelo tutorial móvel.
- Os atalhos `F`, `R` e `/` podem ser ativados ou desativados no painel de acessibilidade.

### Atividades guiadas

As atividades estão em **Laboratório > Atividades guiadas**. Existem oito estudos:

`oscillator`, `damping`, `forced`, `logistic`, `lorenz`, `pitchfork`, `saddle` e `integral`.

Cada atividade possui três etapas. Leia o enunciado, execute o experimento no módulo correspondente e registre a observação. Consulte a resposta comentada somente após fazer sua previsão. As respostas podem ser exportadas em Markdown pelo painel de projetos.

### Projeto, dados e materiais

1. Abra **Projetos e exportações**.
2. Use **Salvar projeto** para baixar um JSON com as entradas e configurações atuais.
3. Use **Carregar projeto** para restaurar um projeto anterior.
4. Exportar **PNG** captura a cena atual; **CSV** exporta os dados calculados.
5. Use **Gravar** para produzir um vídeo da cena e das animações.

O formato JSON permite continuar um trabalho em outro momento. Gráficos temporais e dados recalculados dependem da expressão e dos parâmetros ainda disponíveis no navegador ou no projeto.

### Acessibilidade

No painel **Acessibilidade** é possível ajustar:

- tamanho de textos, campos e botões;
- redução de movimento;
- contraste;
- atalhos de uma letra;
- descrições textuais, tabelas e leitura dos gráficos.

As configurações são lembradas no navegador por meio do Local Storage.

## Orientação para professores

Antes da aula:

1. Publicar ou iniciar o servidor local.
2. Testar o navegador dos estudantes e o suporte a WebGL.
3. Escolher uma atividade em `ATIVIDADES-GUIADAS.md`.
4. Preparar uma atividade curta de previsão antes da execução.

Durante a aula:

- Peça aos estudantes que registrem hipóteses antes de alterar parâmetros.
- Use as tabelas e descrições para discutir resultados além da imagem.
- Compare resoluções numéricas diferentes apenas mantendo intervalos e condições iniciais equivalentes.
- Diferencie observação experimental numérica de demonstração matemática.
- Incentive a exportação de JSON, CSV ou PNG como evidência da atividade.

Para avaliação, considere respostas sobre conceitos, interpretação dos gráficos, justificativas e comparação entre métodos.

## Validação e manutenção

Não há ferramenta de compilação ou testes automatizados configurada no repositório. Ao alterar JavaScript, HTML ou CSS:

1. Execute um servidor HTTP local.
2. Abra o site em navegador desktop e em modo móvel.
3. Teste o módulo alterado e os módulos próximos.
4. Confirme que os ativos locais continuam carregando.
5. Teste acessibilidade por teclado e descrições textuais.
6. Exporte JSON, CSV e PNG em um fluxo representativo.
