# Roteiro de avaliação com leitores de tela e pessoas com deficiência visual

Os recursos foram exercitados com automação e inspeção visual. Não houve avaliação manual com NVDA, JAWS, TalkBack ou VoiceOver, nem certificação WCAG. A auditoria automática axe-core não apontou violações nos estados exercitados das quatro abas 2D e do modo leitura. O modo leitura a 400% foi verificado também em largura de 320 pixels CSS, sem transbordamento horizontal do texto. Isso não cobre todas as telas ou combinações de uso.

## Avaliação manual pendente
- Windows: NVDA com Firefox e Chrome; conferir o uso com MathCAT quando aplicável à configuração instalada.
- Android: TalkBack com Chrome, em aparelho físico.
- iPhone/iPad: VoiceOver com Safari, em aparelho físico.
- Pessoas com baixa visão: lupa do sistema, zoom de navegador até 400%, contraste e espaçamento personalizados.

## Tarefas a observar
1. Chegar à acessibilidade pelos links de pular navegação; abrir/fechar menus sem perder o foco.
2. Inserir `x^2-1`, plotar e ler expressão MathML e versão por extenso.
3. Consultar x=2, ouvir y=3 e percorrer pontos com passo 0,25.
4. Saltar entre as raízes −1 e 1 e o mínimo próximo de x=0. Repetir com duas funções para interseções.
5. Ler a descrição aproximada de `1/x` e verificar a indicação de amostras não finitas perto de zero.
6. Ouvir a curva, distinguir sinais de eventos, parar e confirmar que não há áudio depois de sair do painel.
7. Gerar `z=x^2+y`, fixar y=3 e confirmar o corte `z=x^2+3`; consultar x=2, z=7. Retornar ao 3D e confirmar preservação da cena.
8. Usar leitura a 400%, navegação por Tab/Shift+Tab e Esc, sem precisar identificar visualmente a posição dos controles.
9. Avaliar a carga de anúncios: confirmar que são compreensíveis e não se sobrepõem durante a exploração.
10. Reabrir o aplicativo e conferir as preferências, tamanhos e espaçamento.

Registrar navegador, sistema, versão do leitor, dispositivo, tarefa, dificuldade e sugestão. Não coletar diagnósticos ou dados pessoais sem necessidade. Priorizar correções com base nos obstáculos observados.
