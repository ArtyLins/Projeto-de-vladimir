"use strict";
const guidedActivities = {
  "oscillator": [
    [
      "Prever o movimento",
      "Para y″ = −y, y(0) = 1 e v(0) = 0, preveja (y,v) nos instantes 0, π/2 e π. Carregue o exemplo e compare com o gráfico temporal.",
      "A solução é y = cos(t), v = −sin(t). Os pares são (1,0), (0,−1) e (−1,0). A variável independente aparece como x no módulo de EDO."
    ],
    [
      "Investigar a energia",
      "Calcule E = (y² + v²)/2 em três instantes. O que deveria acontecer com essa energia?",
      "Na solução exata E = 1/2, pois cos²(t) + sin²(t) = 1. Também E′ = yv + v(−y) = 0."
    ],
    [
      "Comparar métodos",
      "Use passo 0,2 e intervalo de 0 a 20. Compare Euler com RK4 e RK45. Explique uma amplitude que cresce numericamente.",
      "Euler explícito multiplica a energia por 1 + h² a cada passo neste oscilador. Esse crescimento é erro numérico. RK4 e RK45 tendem a aproximar melhor a solução; a tolerância do RK45 controla uma estimativa local, não garante erro global."
    ]
  ],
  "damping": [
    [
      "Observar a amplitude",
      "Carregue y″ = −0,4v − y. Descreva como a amplitude muda ao longo do tempo.",
      "O movimento oscila com amplitude decrescente. Para estas condições iniciais, y = exp(−0,2t)[cos(√0,96 t) + (0,2/√0,96)sin(√0,96 t)]."
    ],
    [
      "Comparar amortecimentos",
      "Troque o coeficiente de v por 2 e depois por 3, mantendo o termo −y. Compare as trajetórias.",
      "Para y″ + cv + y = 0: 0 < c < 2 é subamortecido; c = 2 é crítico; c > 2 é superamortecido. Os dois últimos casos não apresentam oscilações periódicas."
    ],
    [
      "Explicar a perda de energia",
      "Derive E = (y² + v²)/2 para c = 0,4. Quando E′ é zero?",
      "E′ = yv + v(−0,4v − y) = −0,4v² ≤ 0. É zero nos instantes com v = 0; isso não torna a energia constante durante todo o movimento."
    ]
  ],
  "forced": [
    [
      "Encontrar zeros instantâneos",
      "No sistema x′ = y, y′ = −x − 0,3y + sin(t), encontre onde o campo zera em t = 0 e t = π/2. Esses pontos formam uma solução de equilíbrio?",
      "O zero instantâneo é (sin(t),0): (0,0) e (1,0). Essa curva não é uma solução do sistema, porque sua primeira coordenada tem derivada cos(t), enquanto x′ = y seria zero."
    ],
    [
      "Comparar condições iniciais",
      "Compare (1,0), (2,0) e (0,1). Descreva o que acontece com as diferenças após o transiente.",
      "A diferença entre duas soluções satisfaz o oscilador homogêneo amortecido. Ela tende a zero; as soluções se aproximam da mesma resposta periódica à força."
    ],
    [
      "Alterar a frequência",
      "Compare sin(t) e sin(2*t) em intervalos suficientemente longos. Qual resposta tem maior amplitude após o transiente?",
      "A amplitude estacionária para sin(ωt) é 1/√[(1−ω²)² + (0,3ω)²]. Para ω = 1 é aproximadamente 3,33; para ω = 2, 0,327. Medidas antes do fim do transiente podem diferir."
    ]
  ],
  "logistic": [
    [
      "Classificar equilíbrios",
      "Para y′ = y(1−y), encontre os equilíbrios e use f′(y) para classificá-los.",
      "Os equilíbrios são 0 e 1. Como f′ = 1−2y, 0 é instável e 1 é assintoticamente estável."
    ],
    [
      "Comparar populações positivas",
      "Simule y(0) = 0,2 e depois y(0) = 2. Compare a direção do movimento.",
      "Entre 0 e 1 a derivada é positiva; acima de 1 ela é negativa. Ambas as soluções positivas tendem a 1."
    ],
    [
      "Explorar o domínio",
      "Compare y(0) = 0 e y(0) = −0,2. Para o segundo caso use um intervalo curto antes de ampliar. Explique uma interrupção do cálculo.",
      "Com y(0) = 0, a solução permanece zero. Para −0,2, y = y₀exp(t)/[1+y₀(exp(t)−1)] diverge em t = ln(6) ≈ 1,792. O cálculo pode parar por limites numéricos; a solução não existe finita para todo t ≥ 0."
    ]
  ],
  "lorenz": [
    [
      "Calcular o vetor inicial",
      "Para σ = 10, ρ = 28, β = 8/3, calcule o vetor de Lorenz no ponto (1,1,1).",
      "x′ = 10(y−x) = 0; y′ = x(28−z)−y = 26; z′ = xy−(8/3)z = −5/3."
    ],
    [
      "Comparar trajetórias próximas",
      "Compare x₀ = 1 e x₀ = 1,0001, mantendo y₀ = z₀ = 1. Salve os gráficos ou CSV e compare nos mesmos tempos físicos.",
      "Trajetórias próximas podem se separar significativamente. RK45 usa passos adaptativos: linhas com o mesmo índice em dois CSV podem ter tempos diferentes. Compare por tempo, com interpolação quando necessário."
    ],
    [
      "Interpretar a tolerância",
      "Reduza a tolerância do RK45. Compare primeiro um intervalo curto e depois um longo. O que pode concluir?",
      "Uma tolerância menor pode melhorar a aproximação em intervalos curtos, mas não garante proximidade a longo prazo em um sistema caótico. As equações são determinísticas; sensibilidade e erro numérico limitam previsões prolongadas."
    ]
  ],
  "pitchfork": [
    [
      "Encontrar os ramos",
      "Para x′ = μx − x³, encontre os equilíbrios quando μ < 0, μ = 0 e μ > 0.",
      "x = 0 existe para todo μ. Para μ > 0 surgem x = ±√μ. Não há outros equilíbrios reais para μ ≤ 0."
    ],
    [
      "Classificar os ramos",
      "Calcule fₓ em cada ramo e compare com as cores do diagrama.",
      "Em x = 0, fₓ = μ: estável para μ < 0 e instável para μ > 0. Em ±√μ, fₓ = −2μ < 0: ambos são estáveis."
    ],
    [
      "Examinar o ponto crítico",
      "Em μ = 0 a derivada é zero. Use a equação completa para determinar o sentido do movimento à direita e à esquerda de 0.",
      "x′ = −x³ aponta para 0 dos dois lados, que é assintoticamente estável. A linearização é inconclusiva. Cinza no diagrama indica essa limitação, não instabilidade."
    ]
  ],
  "saddle": [
    [
      "Examinar dois cortes",
      "Para f = (x²−y²)/4, examine os cortes y = 0 e x = 0. A origem pode ser um máximo ou mínimo?",
      "No primeiro corte f = x²/4 ≥ 0; no segundo f = −y²/4 ≤ 0. Há valores maiores e menores que f(0,0) arbitrariamente perto da origem."
    ],
    [
      "Usar a Hessiana",
      "Calcule o gradiente e a Hessiana na origem. Compare com o painel de cálculo.",
      "∇f = (x/2,−y/2). A Hessiana é diagonal com entradas 1/2 e −1/2, determinante −1/4. A origem é um ponto de sela."
    ],
    [
      "Transformar a superfície",
      "Troque a função por (x²+y²)/4 e depois por −(x²+y²)/4. Classifique a origem em cada caso.",
      "A soma positiva tem Hessiana positiva definida e mínimo estrito. A soma negativa tem Hessiana negativa definida e máximo estrito. Ambas têm gradiente zero na origem."
    ]
  ],
  "integral": [
    [
      "Descrever a região",
      "Desenhe o triângulo de vértices (0,0), (1,0), (0,1). Escreva os limites de integração na ordem dy dx.",
      "0 ≤ x ≤ 1 e 0 ≤ y ≤ 1−x. O limite superior depende de x; não se trata de um retângulo."
    ],
    [
      "Calcular à mão",
      "Calcule a integral dupla de x+y nesse triângulo e compare com o exemplo.",
      "A integral interna é x(1−x)+(1−x)²/2 = (1−x²)/2. Integrando de 0 a 1, o resultado é 1/3."
    ],
    [
      "Inverter a ordem",
      "Use região tipo II: 0 ≤ y ≤ 1 e 0 ≤ x ≤ 1−y. Compare o resultado e as estimativas com n e 2n.",
      "O resultado continua 1/3. Simpson integra exatamente estes polinômios em aritmética exata; pode haver arredondamento. Uma diferença pequena entre n e 2n não é garantia universal de erro pequeno em outras funções."
    ]
  ]
};

const activityUI = id => document.getElementById('activity-'+id);
const activityStorageKey = 'spatial-math-3d-activities-v1';
function emptyActivityState(){return {version:1,selected:'oscillator',records:Object.fromEntries(Object.keys(guidedActivities).map(key=>[key,{responses:['','',''],done:[false,false,false],step:0}]))};}
function validateActivityState(value){
  if(!value||value.version!==1||!Object.hasOwn(guidedActivities,value.selected)||!value.records||Object.keys(value.records).length!==8)throw Error('Atividades salvas inválidas.');
  const result=emptyActivityState();result.selected=value.selected;
  for(const key of Object.keys(guidedActivities)){const r=value.records[key];if(!r||!Number.isInteger(r.step)||r.step<0||r.step>2||!Array.isArray(r.responses)||r.responses.length!==3||r.responses.some(x=>typeof x!=='string'||x.length>4000)||!Array.isArray(r.done)||r.done.length!==3||r.done.some((x,i)=>typeof x!=='boolean'||(x&&!r.responses[i].trim())))throw Error('Respostas de atividade inválidas.');result.records[key]={responses:[...r.responses],done:[...r.done],step:r.step};}return result;
}
let activityState=emptyActivityState(),activityPersistent=true;
try{const raw=localStorage.getItem(activityStorageKey);if(raw)activityState=validateActivityState(JSON.parse(raw));}catch(e){activityPersistent=false;}
function saveActivityState(){try{localStorage.setItem(activityStorageKey,JSON.stringify(activityState));activityPersistent=true;}catch(e){activityPersistent=false;}activityUI('storage').textContent=activityPersistent?'Respostas salvas neste navegador. Exporte o projeto JSON para guardar uma cópia.':'Respostas disponíveis nesta sessão. Exporte o projeto JSON para guardar uma cópia.';}
function exportActivityState(){return validateActivityState(activityState);}
function applyActivityState(value){activityState=validateActivityState(value);document.getElementById('example-choice').value=activityState.selected;document.getElementById('example-guide').textContent=exampleGuides[activityState.selected];saveActivityState();renderActivity();}
function renderActivity(){
  const r=activityState.records[activityState.selected],step=guidedActivities[activityState.selected][r.step];
  activityUI('step').textContent=`Etapa ${r.step+1} de 3 · ${step[0]}`;activityUI('prompt').textContent=step[1];activityUI('answer').textContent=step[2];activityUI('response').value=r.responses[r.step];activityUI('solution').open=false;
  activityUI('previous').disabled=r.step===0;activityUI('next').disabled=r.step===2;activityUI('status').textContent=r.done[r.step]?'Resposta registrada. Confira a explicação e revise se precisar.':'Escreva sua observação e registre a etapa. Não há correção automática.';
  updateActivityProgress();
}
function updateActivityProgress(){const r=activityState.records[activityState.selected],count=r.done.filter(Boolean).length,total=Object.values(activityState.records).reduce((s,r)=>s+r.done.filter(Boolean).length,0);activityUI('progress').value=count;activityUI('progress-text').textContent=`${count}/3 etapas registradas · ${total}/24 no conjunto`;}
activityUI('response').addEventListener('input',()=>{const r=activityState.records[activityState.selected];r.responses[r.step]=activityUI('response').value;r.done[r.step]=false;activityUI('status').textContent='Resposta editada. Registre novamente quando terminar.';updateActivityProgress();saveActivityState();});
activityUI('register').addEventListener('click',()=>{const r=activityState.records[activityState.selected];if(!r.responses[r.step].trim()){activityUI('status').textContent='Escreva uma resposta antes de registrar a etapa.';activityUI('response').focus();return;}r.done[r.step]=true;saveActivityState();updateActivityProgress();activityUI('status').textContent='Resposta registrada por você. Confira a explicação e revise se precisar.';});
for(const [id,delta] of [['previous',-1],['next',1]])activityUI(id).addEventListener('click',()=>{const r=activityState.records[activityState.selected];r.step=Math.max(0,Math.min(2,r.step+delta));saveActivityState();renderActivity();});
activityUI('reset').addEventListener('click',()=>{const r=activityState.records[activityState.selected];r.done=[false,false,false];r.step=0;saveActivityState();renderActivity();activityUI('status').textContent='Progresso reiniciado. Suas respostas foram preservadas para revisão.';});
document.getElementById('example-choice').addEventListener('change',event=>{activityState.selected=event.target.value;saveActivityState();renderActivity();});
document.getElementById('example-load').addEventListener('click',()=>{document.getElementById('activity-return').hidden=false;});
document.getElementById('activity-return').addEventListener('click',()=>openLabPanel('examples'));
activityUI('export').addEventListener('click',()=>{let text='# Spatial Math 3D — Caderno de atividades\n\n';for(const [key,steps] of Object.entries(guidedActivities)){const label=[...document.getElementById('example-choice').options].find(o=>o.value===key).textContent;text+='## '+label+'\n\n';steps.forEach((step,i)=>{const r=activityState.records[key];text+=`### ${i+1}. ${step[0]}\n\n${step[1]}\n\nResposta: ${r.responses[i]||'(não respondida)'}\n\nEtapa registrada: ${r.done[i]?'sim':'não'}\n\nExplicação: ${step[2]}\n\n`;});}downloadLabFile(new Blob([text],{type:'text/markdown;charset=utf-8'}),'spatial-math-3d-atividades.md');});
document.getElementById('example-choice').value=activityState.selected;document.getElementById('example-guide').textContent=exampleGuides[activityState.selected];renderActivity();saveActivityState();
