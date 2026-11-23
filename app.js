const viewport = document.querySelector('#viewport');
const formulaInput = document.querySelector('#formula');
const rangeInput = document.querySelector('#range');
const rangeValue = document.querySelector('#range-value');
const plotButton = document.querySelector('#plot-button');
const status = document.querySelector('#status');
const pointCount = document.querySelector('#point-count');
const axisValues = { x: document.querySelector('#axis-x-value'), y: document.querySelector('#axis-y-value'), z: document.querySelector('#axis-z-value') };
const walkState = document.querySelector('#walk-state');
const controlDrawer = document.querySelector('#control-drawer');
const paletteSelect = document.querySelector('#palette-select');
const colorControls = {
  background: document.querySelector('#background-color'),
  grid: document.querySelector('#grid-color'),
  axisX: document.querySelector('#axis-x-color'),
  axisY: document.querySelector('#axis-y-color'),
  axisZ: document.querySelector('#axis-z-color'),
  graph: document.querySelector('#graph-color'),
  graphLow: document.querySelector('#graph-low-color'),
  graphHigh: document.querySelector('#graph-high-color'),
  intersection: document.querySelector('#intersection-color')
};

const palettes = {
  standard: {
    background: '#e8efea', grid: '#b6c8be', axisX: '#df7968', axisY: '#5aa888', axisZ: '#5d9cce', graph: '#76b8a2', graphLow: '#55c8c6', graphHigh: '#ec806c',
    ui: { paper: '#f3f5f2', panel: '#fbfcfa', ink: '#15232b', muted: '#4b5b64', line: '#dce4df', mint: '#c6e9d9', deepMint: '#5aa888' }
  },
  'red-green': {
    background: '#f1f3f4', grid: '#a6a6a6', axisX: '#d55e00', axisY: '#009e73', axisZ: '#0072b2', graph: '#56b4e9', graphLow: '#56b4e9', graphHigh: '#cc79a7',
    ui: { paper: '#f4f4f4', panel: '#ffffff', ink: '#111111', muted: '#555555', line: '#c7c7c7', mint: '#d7eef8', deepMint: '#0072b2' }
  },
  'blue-yellow': {
    background: '#f4f1e8', grid: '#999999', axisX: '#d55e00', axisY: '#009e73', axisZ: '#cc79a7', graph: '#0072b2', graphLow: '#0072b2', graphHigh: '#d55e00',
    ui: { paper: '#f7f5ef', panel: '#ffffff', ink: '#171717', muted: '#555555', line: '#cbc6b8', mint: '#e9e0f1', deepMint: '#6a3d87' }
  },
  'high-contrast': {
    background: '#ffffff', grid: '#555555', axisX: '#b2182b', axisY: '#2166ac', axisZ: '#000000', graph: '#333333', graphLow: '#2166ac', graphHigh: '#b2182b',
    ui: { paper: '#ffffff', panel: '#ffffff', ink: '#000000', muted: '#333333', line: '#777777', mint: '#e5e5e5', deepMint: '#000000' }
  },
  'low-vision': {
    background: '#ffffff', grid: '#777777', axisX: '#b2182b', axisY: '#2166ac', axisZ: '#111111', graph: '#005a9c', graphLow: '#005a9c', graphHigh: '#d55e00',
    ui: { paper: '#ffffff', panel: '#ffffff', ink: '#000000', muted: '#222222', line: '#666666', mint: '#d9eaf7', deepMint: '#005a9c' }
  },
"okabe-ito": {"background": "#eef3f7", "grid": "#9eacb8", "axisX": "#d55e00", "axisY": "#009e73", "axisZ": "#0072b2", "graph": "#0072b2", "graphLow": "#56b4e9", "graphHigh": "#d55e00", "ui": {"paper": "#f4f6f8", "panel": "#ffffff", "ink": "#172330", "muted": "#4b5b6b", "line": "#b8c4cf", "mint": "#dbeaf4", "deepMint": "#005a8c"}},
"cividis": {"background": "#eef3f7", "grid": "#9eacb8", "axisX": "#d55e00", "axisY": "#009e73", "axisZ": "#0072b2", "graph": "#7d7c78", "graphLow": "#00224e", "graphHigh": "#fee838", "gradient": ["#00224e", "#00234f", "#002451", "#002553", "#002554", "#002656", "#002758", "#002859", "#00285b", "#00295d", "#002a5f", "#002a61", "#002b62", "#002c64", "#002c66", "#002d68", "#002e6a", "#002e6c", "#002f6d", "#00306f", "#003070", "#003170", "#003171", "#013271", "#053371", "#083370", "#0c3470", "#0f3570", "#123570", "#143670", "#163770", "#18376f", "#1a386f", "#1c396f", "#1e3a6f", "#203a6f", "#213b6e", "#233c6e", "#243c6e", "#263d6e", "#273e6e", "#293f6e", "#2a3f6d", "#2b406d", "#2d416d", "#2e416d", "#2f426d", "#31436d", "#32436d", "#33446d", "#34456c", "#35456c", "#36466c", "#38476c", "#39486c", "#3a486c", "#3b496c", "#3c4a6c", "#3d4a6c", "#3e4b6c", "#3f4c6c", "#404c6c", "#414d6c", "#424e6c", "#434e6c", "#444f6c", "#45506c", "#46516c", "#47516c", "#48526c", "#49536c", "#4a536c", "#4b546c", "#4c556c", "#4d556c", "#4e566c", "#4f576c", "#50576c", "#51586d", "#52596d", "#535a6d", "#545a6d", "#555b6d", "#555c6d", "#565c6d", "#575d6d", "#585e6d", "#595e6e", "#5a5f6e", "#5b606e", "#5c616e", "#5d616e", "#5e626e", "#5e636f", "#5f636f", "#60646f", "#61656f", "#62656f", "#636670", "#646770", "#656870", "#656870", "#666970", "#676a71", "#686a71", "#696b71", "#6a6c71", "#6b6d72", "#6c6d72", "#6c6e72", "#6d6f72", "#6e6f73", "#6f7073", "#707173", "#717274", "#727274", "#727374", "#737475", "#747475", "#757575", "#767676", "#777776", "#777777", "#787877", "#797977", "#7a7a78", "#7b7a78", "#7c7b78", "#7d7c78", "#7e7c78", "#7e7d78", "#7f7e78", "#807f78", "#817f78", "#828079", "#838179", "#848279", "#858279", "#868379", "#878478", "#888578", "#898578", "#8a8678", "#8b8778", "#8c8878", "#8d8878", "#8e8978", "#8f8a78", "#908b78", "#918b78", "#928c78", "#928d78", "#938e78", "#948e77", "#958f77", "#969077", "#979177", "#989277", "#999277", "#9a9376", "#9b9476", "#9c9576", "#9d9576", "#9e9676", "#9f9775", "#a09875", "#a19975", "#a29975", "#a39a74", "#a49b74", "#a59c74", "#a69c74", "#a79d73", "#a89e73", "#a99f73", "#aaa073", "#aba072", "#aca172", "#ada272", "#aea371", "#afa471", "#b0a571", "#b1a570", "#b3a670", "#b4a76f", "#b5a86f", "#b6a96f", "#b7a96e", "#b8aa6e", "#b9ab6d", "#baac6d", "#bbad6d", "#bcae6c", "#bdae6c", "#beaf6b", "#bfb06b", "#c0b16a", "#c1b26a", "#c2b369", "#c3b369", "#c4b468", "#c5b568", "#c6b667", "#c7b767", "#c8b866", "#c9b965", "#cbb965", "#ccba64", "#cdbb63", "#cebc63", "#cfbd62", "#d0be62", "#d1bf61", "#d2c060", "#d3c05f", "#d4c15f", "#d5c25e", "#d6c35d", "#d7c45c", "#d9c55c", "#dac65b", "#dbc75a", "#dcc859", "#ddc858", "#dec958", "#dfca57", "#e0cb56", "#e1cc55", "#e2cd54", "#e4ce53", "#e5cf52", "#e6d051", "#e7d150", "#e8d24f", "#e9d34e", "#ead34c", "#ebd44b", "#edd54a", "#eed649", "#efd748", "#f0d846", "#f1d945", "#f2da44", "#f3db42", "#f5dc41", "#f6dd3f", "#f7de3e", "#f8df3c", "#f9e03a", "#fbe138", "#fce236", "#fde334", "#fee434", "#fee535", "#fee636", "#fee838"], "ui": {"paper": "#f4f6f8", "panel": "#ffffff", "ink": "#172330", "muted": "#4b5b6b", "line": "#b8c4cf", "mint": "#dbeaf4", "deepMint": "#005a8c"}},
"viridis": {"background": "#eef3f7", "grid": "#9eacb8", "axisX": "#d55e00", "axisY": "#009e73", "axisZ": "#0072b2", "graph": "#21918c", "graphLow": "#440154", "graphHigh": "#fde725", "gradient": ["#440154", "#440256", "#450457", "#450559", "#46075a", "#46085c", "#460a5d", "#460b5e", "#470d60", "#470e61", "#471063", "#471164", "#471365", "#481467", "#481668", "#481769", "#48186a", "#481a6c", "#481b6d", "#481c6e", "#481d6f", "#481f70", "#482071", "#482173", "#482374", "#482475", "#482576", "#482677", "#482878", "#482979", "#472a7a", "#472c7a", "#472d7b", "#472e7c", "#472f7d", "#46307e", "#46327e", "#46337f", "#463480", "#453581", "#453781", "#453882", "#443983", "#443a83", "#443b84", "#433d84", "#433e85", "#423f85", "#424086", "#424186", "#414287", "#414487", "#404588", "#404688", "#3f4788", "#3f4889", "#3e4989", "#3e4a89", "#3e4c8a", "#3d4d8a", "#3d4e8a", "#3c4f8a", "#3c508b", "#3b518b", "#3b528b", "#3a538b", "#3a548c", "#39558c", "#39568c", "#38588c", "#38598c", "#375a8c", "#375b8d", "#365c8d", "#365d8d", "#355e8d", "#355f8d", "#34608d", "#34618d", "#33628d", "#33638d", "#32648e", "#32658e", "#31668e", "#31678e", "#31688e", "#30698e", "#306a8e", "#2f6b8e", "#2f6c8e", "#2e6d8e", "#2e6e8e", "#2e6f8e", "#2d708e", "#2d718e", "#2c718e", "#2c728e", "#2c738e", "#2b748e", "#2b758e", "#2a768e", "#2a778e", "#2a788e", "#29798e", "#297a8e", "#297b8e", "#287c8e", "#287d8e", "#277e8e", "#277f8e", "#27808e", "#26818e", "#26828e", "#26828e", "#25838e", "#25848e", "#25858e", "#24868e", "#24878e", "#23888e", "#23898e", "#238a8d", "#228b8d", "#228c8d", "#228d8d", "#218e8d", "#218f8d", "#21908d", "#21918c", "#20928c", "#20928c", "#20938c", "#1f948c", "#1f958b", "#1f968b", "#1f978b", "#1f988b", "#1f998a", "#1f9a8a", "#1e9b8a", "#1e9c89", "#1e9d89", "#1f9e89", "#1f9f88", "#1fa088", "#1fa188", "#1fa187", "#1fa287", "#20a386", "#20a486", "#21a585", "#21a685", "#22a785", "#22a884", "#23a983", "#24aa83", "#25ab82", "#25ac82", "#26ad81", "#27ad81", "#28ae80", "#29af7f", "#2ab07f", "#2cb17e", "#2db27d", "#2eb37c", "#2fb47c", "#31b57b", "#32b67a", "#34b679", "#35b779", "#37b878", "#38b977", "#3aba76", "#3bbb75", "#3dbc74", "#3fbc73", "#40bd72", "#42be71", "#44bf70", "#46c06f", "#48c16e", "#4ac16d", "#4cc26c", "#4ec36b", "#50c46a", "#52c569", "#54c568", "#56c667", "#58c765", "#5ac864", "#5cc863", "#5ec962", "#60ca60", "#63cb5f", "#65cb5e", "#67cc5c", "#69cd5b", "#6ccd5a", "#6ece58", "#70cf57", "#73d056", "#75d054", "#77d153", "#7ad151", "#7cd250", "#7fd34e", "#81d34d", "#84d44b", "#86d549", "#89d548", "#8bd646", "#8ed645", "#90d743", "#93d741", "#95d840", "#98d83e", "#9bd93c", "#9dd93b", "#a0da39", "#a2da37", "#a5db36", "#a8db34", "#aadc32", "#addc30", "#b0dd2f", "#b2dd2d", "#b5de2b", "#b8de29", "#bade28", "#bddf26", "#c0df25", "#c2df23", "#c5e021", "#c8e020", "#cae11f", "#cde11d", "#d0e11c", "#d2e21b", "#d5e21a", "#d8e219", "#dae319", "#dde318", "#dfe318", "#e2e418", "#e5e419", "#e7e419", "#eae51a", "#ece51b", "#efe51c", "#f1e51d", "#f4e61e", "#f6e620", "#f8e621", "#fbe723", "#fde725"], "ui": {"paper": "#f4f6f8", "panel": "#ffffff", "ink": "#172330", "muted": "#4b5b6b", "line": "#b8c4cf", "mint": "#dbeaf4", "deepMint": "#005a8c"}}
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
camera.position.set(13, 10, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
viewport.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 4;
controls.maxDistance = 40;
controls.target.set(0, 0, 0);
const graphTarget = new THREE.Vector3(0, 0, 0);

const movementKeys = new Set();
const movementClock = new THREE.Clock();
const movementSpeed = 7;
const walkToggle = document.querySelector('#walk-toggle');
let walkingMode = false;
let yaw = 0;
let pitch = 0;

function syncWalkLook() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  yaw = Math.atan2(-direction.x, -direction.z);
  pitch = Math.asin(THREE.MathUtils.clamp(direction.y, -1, 1));
}

function applyWalkLook() {
  camera.rotation.order = 'YXZ';
  camera.rotation.set(pitch, yaw, 0);
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  controls.target.copy(camera.position).add(direction.multiplyScalar(10));
}

function requestWalkPointerLock() {
  if (!walkingMode || window.matchMedia('(pointer: coarse)').matches || !renderer.domElement.requestPointerLock || document.pointerLockElement === renderer.domElement) return;
  const lockRequest = renderer.domElement.requestPointerLock();
  if (lockRequest?.catch) lockRequest.catch(() => {});
}

function setWalkingMode(enabled) {
  walkingMode = enabled;
  walkState.textContent = enabled ? 'ATIVADO' : 'DESATIVADO';
  walkState.style.color = enabled ? 'var(--deep-mint)' : '#9aa8a1';
  controls.enabled = true;
  viewport.classList.toggle('walking-mode', enabled);
  if (enabled) {
    syncWalkLook();
    requestWalkPointerLock();
    status.textContent = 'Modo caminhada ativo · clique no espaço 3D para olhar';
    status.style.color = 'var(--deep-mint)';
  } else {
    movementKeys.clear();
    if (document.pointerLockElement === renderer.domElement) document.exitPointerLock();
    controls.target.copy(graphTarget);
    camera.rotation.order = 'XYZ';
    camera.lookAt(controls.target);
    controls.enabled = true;
    controls.update();
    status.textContent = 'Órbita reativada';
  }
}

function isTyping(event) {
  if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return true;
  if (!(event.target instanceof HTMLInputElement)) return false;
  return ['text', 'number', 'search', 'email', 'url', 'password'].includes(event.target.type);
}

function updateMovement(delta) {
  if (!walkingMode || (!movementKeys.size && !(window.mobileJoystickVec?.x || window.mobileJoystickVec?.y))) return;

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const movement = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();
  right.crossVectors(forward, camera.up).normalize();

  if (movementKeys.has('KeyW')) movement.add(forward);
  if (movementKeys.has('KeyS')) movement.sub(forward);
  if (movementKeys.has('KeyD')) movement.add(right);
  if (movementKeys.has('KeyA')) movement.sub(right);
  if (movementKeys.has('Space')) movement.y += 1;
  if (movementKeys.has('ShiftLeft') || movementKeys.has('ShiftRight')) movement.y -= 1;

  if(window.mobileJoystickVec){movement.addScaledVector(right,window.mobileJoystickVec.x);movement.addScaledVector(forward,-window.mobileJoystickVec.y);}
  if (!movement.lengthSq()) return;
  if(movement.length()>1)movement.normalize();
  movement.multiplyScalar(movementSpeed * delta * (window.getMobileSpeed?.()||1));
  camera.position.add(movement);
  controls.target.add(movement);
}

window.addEventListener('keydown', (event) => {
  if (isTyping(event) || event.defaultPrevented || document.body.classList.contains('cartesian-active')) return;
  if (event.code === 'KeyF') {
    walkToggle.checked = !walkToggle.checked;
    setWalkingMode(walkToggle.checked);
    event.preventDefault();
    return;
  }
  if (walkingMode && ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space', 'ShiftLeft', 'ShiftRight'].includes(event.code)) {
    movementKeys.add(event.code);
    event.preventDefault();
  }
});
window.addEventListener('keyup', (event) => movementKeys.delete(event.code));
window.addEventListener('blur', () => movementKeys.clear());
viewport.addEventListener('click', selectSurfacePoint);
viewport.addEventListener('click', () => {
  requestWalkPointerLock();
});
document.addEventListener('pointerlockchange', () => {
  if (!walkingMode) {if(document.pointerLockElement===renderer.domElement)document.exitPointerLock();return;}
  const lookingFreely = document.pointerLockElement === renderer.domElement;
  controls.enabled = !lookingFreely;
  if (!lookingFreely) {
    controls.target.copy(graphTarget);
    camera.rotation.order = 'XYZ';
    camera.lookAt(controls.target);
    controls.update();
  }
});
document.addEventListener('mousemove', (event) => {
  if (!walkingMode || document.pointerLockElement !== renderer.domElement) return;
  yaw -= event.movementX * 0.002 * (window.getMobileSensitivity?.()||1);
  pitch -= event.movementY * 0.002 * (window.getMobileSensitivity?.()||1);
  pitch = THREE.MathUtils.clamp(pitch, -Math.PI / 2 + 0.05, Math.PI / 2 - 0.05);
  applyWalkLook();
});

const sceneGroup = new THREE.Group();
scene.add(sceneGroup);
const surfaceGroup = new THREE.Group();
const gridGroup = new THREE.Group();
const axesGroup = new THREE.Group();
const axisLabelsGroup = new THREE.Group();
const intersectionGroup = new THREE.Group();
const analysisGroup = new THREE.Group();
sceneGroup.add(surfaceGroup, gridGroup, axesGroup, axisLabelsGroup, intersectionGroup, analysisGroup);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let surfacePointerStart=null,surfaceClickWasDrag=false;
renderer.domElement.addEventListener('pointerdown',event=>{surfacePointerStart=[event.clientX,event.clientY];surfaceClickWasDrag=false;});
renderer.domElement.addEventListener('pointerup',event=>{surfaceClickWasDrag=surfacePointerStart&&Math.hypot(event.clientX-surfacePointerStart[0],event.clientY-surfacePointerStart[1])>5;});
let selectedPoint = null;
let selectedFormula = null;

scene.add(new THREE.HemisphereLight(0xf8fff9, 0xb0c1b8, 1.8));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(7, 15, 10);
scene.add(keyLight);

function resize() {
  const width = viewport.clientWidth;
  const height = viewport.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

function normalizedFormula(formula) {
  return formula
    .toLowerCase()
    .replaceAll('²', '^2')
    .replaceAll('³', '^3')
    .replaceAll('π', 'pi')
    .replaceAll('√', 'sqrt')
    .replaceAll(' ', '')
    .replaceAll('sen', 'sin')
    .replaceAll('^', '**');
}

function compileFormula(formula) {
  const parameters=Object.fromEntries(['a','b','c'].map(name=>[name,Number(document.getElementById(`parameter-${name}`).value)]));
  const fn=compileExpression(formula,['x','y'],parameters);fn.smoothRisk=/\?|\b(piecewise|if|abs|min|max|floor|ceil|sign|sqrt)\s*\(/i.test(formula);return fn;
}

function mathNumber(n,digits=7){return Number.isFinite(n)?Number(n.toPrecision(digits)).toString():String(n);}
function sphereRadius(text){const match=text.trim().match(/^sphere\s*\(\s*((?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)\s*\)$/i);const radius=match?Number(match[1]):NaN;if(!(radius>0&&radius<=1000))throw Error('Use sphere(raio), com raio positivo até 1000.');return radius;}
function graphGradientColor(t,target=new THREE.Color()){
  const palette=palettes[paletteSelect.value],ramp=palette?.gradient;
  t=THREE.MathUtils.clamp(t,0,1);
  if(ramp&&colorControls.graphLow.value===palette.graphLow&&colorControls.graphHigh.value===palette.graphHigh){
    const x=t*(ramp.length-1),i=Math.floor(x);return target.set(ramp[i]).lerp(new THREE.Color(ramp[Math.min(i+1,ramp.length-1)]),x-i);
  }
  return target.set(colorControls.graphLow.value).lerp(new THREE.Color(colorControls.graphHigh.value),t);
}
function surfaceOpacity(){
  const value=Number(document.getElementById('surface-opacity')?.value);
  return THREE.MathUtils.clamp(Number.isFinite(value)?value/100:.84,.2,1);
}
function makeSphere(radius) {
  const geometry = new THREE.SphereGeometry(radius, 48, 32);
  const positions = geometry.attributes.position;
  const colorOn = document.querySelector('#color-toggle').checked;
  const graphColor = new THREE.Color(colorControls.graph.value);
  const low = new THREE.Color(colorControls.graphLow.value);
  const high = new THREE.Color(colorControls.graphHigh.value);
  const colors = [];
  const tint = new THREE.Color();

  for (let i = 0; i < positions.count; i += 1) {
    const amount = (positions.getY(i) + radius) / (radius * 2);
    graphGradientColor(amount,tint);
    colors.push(colorOn ? tint.r : graphColor.r, colorOn ? tint.g : graphColor.g, colorOn ? tint.b : graphColor.b);
  }
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: surfaceOpacity(), depthWrite: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
  const wire = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, depthTest: true, depthWrite: false, transparent: true, opacity: .55 }));
  wire.renderOrder = 2;
  wire.frustumCulled = false;
  clearRenderGroup(surfaceGroup);
  surfaceGroup.add(mesh, wire);
  pointCount.textContent = positions.count.toLocaleString('pt-BR');
}

function makeAdditionalSurface(formulaText, graphIndex = 1) {
  const extent = Number(rangeInput.value);
  const graphPalette = ['#2563eb', '#f59e0b', '#10b981', '#db2777'];
  const distinctColor = new THREE.Color(graphPalette[(graphIndex - 1) % graphPalette.length]);
  const normalizedText = formulaText.trim().toLowerCase();
  if (normalizedText.startsWith('sphere')) {
    const radius = sphereRadius(normalizedText);
    const geometry = new THREE.SphereGeometry(radius, 48, 32);
    const positions = geometry.attributes.position;
    const colorOn = document.querySelector('#color-toggle').checked;
    const graphColor = new THREE.Color(colorControls.graph.value);
    const low = new THREE.Color(colorControls.graphLow.value);
    const high = new THREE.Color(colorControls.graphHigh.value);
    const colors = [];
    const tint = new THREE.Color();
    for (let index = 0; index < positions.count; index += 1) {
      graphGradientColor((positions.getY(index) + radius) / (radius * 2),tint);
      const surfaceColor = colorOn ? tint.clone().lerp(distinctColor, .35) : distinctColor;
      colors.push(surfaceColor.r, surfaceColor.g, surfaceColor.b);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    surfaceGroup.add(
      new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: surfaceOpacity(), depthWrite: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 })),
      new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, depthTest: false, depthWrite: false, transparent: true, opacity: .55 }))
    );
    return;
  }
  const formula = compileFormula(formulaText);
  const segments = 49;
  const geometry = new THREE.PlaneGeometry(extent, extent, segments - 1, segments - 1);
  const positions = geometry.attributes.position;
  const heights = [];
  const validSamples = [];
  let minHeight = Infinity;
  let maxHeight = -Infinity;
  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const sample=Number(formula(x,y));
    let z=sample;
    validSamples.push(Number.isFinite(sample)&&Math.abs(sample)<=5.5);
    if (!Number.isFinite(sample)||Math.abs(sample)>5.5) z=0;
    z = Math.max(-5.5, Math.min(5.5, z));
    positions.setZ(index, z);
    heights.push(z);
    minHeight = Math.min(minHeight, z);
    maxHeight = Math.max(maxHeight, z);
  }
  const originalIndices=geometry.index.array, validIndices=[];
  for(let i=0;i<originalIndices.length;i+=3){const triangle=Array.from(originalIndices.slice(i,i+3));if(triangle.every(index=>validSamples[index]))validIndices.push(...triangle);}
  if(!validIndices.length){geometry.dispose();throw Error('Não há uma superfície real válida no domínio amostrado.');}
  geometry.setIndex(validIndices);
  const colors = [];
  const colorOn = document.querySelector('#color-toggle').checked;
  const graphColor = new THREE.Color(colorControls.graph.value);
  const low = new THREE.Color(colorControls.graphLow.value);
  const high = new THREE.Color(colorControls.graphHigh.value);
  const tint = new THREE.Color();
  heights.forEach((height) => {
    graphGradientColor((height - minHeight) / Math.max(maxHeight - minHeight, .001),tint);
    const surfaceColor = colorOn ? tint.clone().lerp(distinctColor, .35) : distinctColor;
    colors.push(surfaceColor.r, surfaceColor.g, surfaceColor.b);
  });
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: surfaceOpacity(), depthWrite: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.scale.y = -1;
  mesh.userData.formulaText = formulaText;
  mesh.userData.formula = formula;
  const wire = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, depthTest: false, depthWrite: false, transparent: true, opacity: .55 }));
  wire.rotation.x = -Math.PI / 2;
  wire.scale.y = -1;
  wire.renderOrder = 2;
  surfaceGroup.add(mesh, wire);
}

function clearAnalysis() {
  clearRenderGroup(analysisGroup);
  clearCriticalPoints();
  calcUI('summary').textContent='';
  calcUI('readout').textContent='Selecione um ponto ou informe suas coordenadas.';
  selectedPoint = null;
  selectedFormula = null;
  if(typeof hidePointInspector==='function')hidePointInspector();
}

function clearRenderGroup(group){const geometries=new Set(),materials=new Set(),textures=new Set();group.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){materials.add(m);if(m.map)textures.add(m.map);}});for(const item of geometries)item.dispose();for(const item of materials)item.dispose();for(const item of textures)item.dispose();group.clear();}
function makeContourLines(formula){
  const extent=Number(rangeInput.value)/2,heights=[];for(let i=0;i<=24;i++)for(let j=0;j<=24;j++){const z=formula(-extent+2*extent*i/24,-extent+2*extent*j/24);if(Number.isFinite(z)&&Math.abs(z)<=5.5)heights.push(z);}if(!heights.length)return;const min=Math.min(...heights),max=Math.max(...heights);if(min===max)return;
  const count=Number(document.getElementById('contour-count').value),points=[];for(let i=1;i<=count;i++){const level=min+(max-min)*i/(count+1),contour=zeroContour((x,y)=>formula(x,y)-level,extent,48);for(const segment of contour.segments)for(const [x,y]of segment)points.push(new THREE.Vector3(x,level,y));}
  if(!points.length)return;const contours=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0xf59e0b,depthTest:false}));contours.userData.layer='contours';contours.renderOrder=4;analysisGroup.add(contours);
}

function updateAnalysis() {
  clearRenderGroup(analysisGroup);
  if (!selectedPoint || !selectedFormula) return;
  const marker = new THREE.Mesh(new THREE.SphereGeometry(.12, 16, 10), new THREE.MeshBasicMaterial({ color: 0xffc107 }));
  marker.userData.layer='markers';marker.position.copy(selectedPoint.world);
  analysisGroup.add(marker);
  let derivatives;
  try {derivatives=surfaceDifferential(selectedFormula,selectedPoint.x,selectedPoint.y,calcSettings().h);}
  catch(e){calcUI('readout').textContent=e.message;if(typeof renderPointInspector==='function')renderPointInspector(null,e.message);return;}
  const dx=derivatives.fx,dy=derivatives.fy;
  const gradient = new THREE.Vector3(dx, 0, dy);
  const normal = new THREE.Vector3(-dx, 1, -dy);
  if (document.querySelectorAll('.analysis-toggle')[0].checked && gradient.lengthSq()) {
    analysisGroup.add(new THREE.ArrowHelper(gradient.normalize(), selectedPoint.world, 1.2, 0x2563eb, .2, .1));
  }
  if (document.querySelectorAll('.analysis-toggle')[1].checked) {
    analysisGroup.add(new THREE.ArrowHelper(normal.normalize(), selectedPoint.world, 1.2, 0xdc2626, .2, .1));
  }
  if (document.querySelectorAll('.analysis-toggle')[2].checked) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: .24, side: THREE.DoubleSide, depthTest: false }));
    plane.position.copy(selectedPoint.world);
    plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.normalize());
    analysisGroup.add(plane);
  }
  if (document.querySelector('#contour-toggle').checked) makeContourLines(selectedFormula);
  updateCalculusInspector();applyLayerVisibility();
}

function selectSurfacePoint(event) {
  if (surfaceClickWasDrag || walkingMode || !document.getElementById('layer-surfaces').checked || event.target !== renderer.domElement) return;
  const bounds = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const targets = surfaceGroup.children.filter((object) => object.isMesh && object.visible && object.material?.wireframe !== true);
  const hit = raycaster.intersectObjects(targets, false)[0];
  if (!hit){if(surfaceGroup.visible&&typeof clearPointSelection==='function')clearPointSelection();return;}
  if (!surfaceGroup.visible) return;
  const text = hit.object.userData.formulaText;
  if (!text || text.trim().toLowerCase().startsWith('sphere')) {status.textContent='A análise exige z=f(x,y).';return;}
  try {
    const f=compileFormula(text),x=hit.point.x,y=hit.point.z,z=f(x,y);
    if(!Number.isFinite(z)||Math.abs(z)>5.5){status.textContent='Ponto no recorte visual: escolha uma altura real entre −5.5 e 5.5.';return;}
    selectedPoint={x,y,world:new THREE.Vector3(x,z,y),formulaText:text};selectedFormula=f;
  }catch(e){status.textContent=e.message;return;}
  updateAnalysis();
  status.textContent = `Ponto selecionado: (${selectedPoint.x.toFixed(2)}, ${selectedPoint.y.toFixed(2)})`;
}

function makeSurface() {
  const extent = Number(rangeInput.value);
  const formulaText = formulaInput.value.trim().toLowerCase();
  if (formulaText.startsWith('sphere')) {
    makeSphere(sphereRadius(formulaText));
    return;
  }
  const formula = compileFormula(formulaInput.value);
  const segments = 49;
  const geometry = new THREE.PlaneGeometry(extent, extent, segments - 1, segments - 1);
  const positions = geometry.attributes.position;
  const heights = [];
  const validSamples = [];
  let maxHeight = -Infinity;
  let minHeight = Infinity;

  for (let i = 0; i < positions.count; i += 1) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const sample=Number(formula(x,y));
    let z=sample;
    validSamples.push(Number.isFinite(sample)&&Math.abs(sample)<=5.5);
    if (!Number.isFinite(sample)||Math.abs(sample)>5.5) z=0;
    z = Math.max(-5.5, Math.min(5.5, z));
    positions.setZ(i, z);
    heights.push(z);
    maxHeight = Math.max(maxHeight, z);
    minHeight = Math.min(minHeight, z);
  }
  geometry.computeVertexNormals();

  const originalIndices=geometry.index.array, validIndices=[];
  for(let i=0;i<originalIndices.length;i+=3){const triangle=Array.from(originalIndices.slice(i,i+3));if(triangle.every(index=>validSamples[index]))validIndices.push(...triangle);}
  if(!validIndices.length){geometry.dispose();throw Error('Não há uma superfície real válida no domínio amostrado.');}
  geometry.setIndex(validIndices);
  const colors = [];
  const colorOn = document.querySelector('#color-toggle').checked;
  const graphColor = new THREE.Color(colorControls.graph.value);
  const low = new THREE.Color(colorControls.graphLow.value);
  const high = new THREE.Color(colorControls.graphHigh.value);
  const tint = new THREE.Color();
  heights.forEach((height) => {
    const amount = (height - minHeight) / Math.max(maxHeight - minHeight, 0.001);
    graphGradientColor(amount,tint);
    colors.push(colorOn ? tint.r : graphColor.r, colorOn ? tint.g : graphColor.g, colorOn ? tint.b : graphColor.b);
  });
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: surfaceOpacity(), depthWrite: false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.scale.y = -1;
  mesh.userData.formulaText = formulaText;
  mesh.userData.formula = formula;
  mesh.position.y = 0;

  const wire = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: false, opacity: 1, depthTest: false, depthWrite: false }));
  wire.rotation.x = -Math.PI / 2;
  wire.scale.y = -1;
  wire.renderOrder = 2;
  wire.frustumCulled = false;

  clearRenderGroup(surfaceGroup);
  surfaceGroup.add(mesh, wire);
  document.querySelectorAll('.graph-input').forEach((input, index) => {
    if (index > 0) makeAdditionalSurface(input.value, index);
  });
  pointCount.textContent = positions.count.toLocaleString('pt-BR');
}

function makeIntersection(){
  clearRenderGroup(intersectionGroup);if(!document.getElementById('intersection-toggle').checked||formulaInput.value.trim().toLowerCase().startsWith('sphere'))return;
  const first=compileFormula(formulaInput.value),second=compileFormula(document.getElementById('intersection-formula').value),extent=Number(rangeInput.value)/2,contour=zeroContour((x,y)=>first(x,y)-second(x,y),extent,60),radius=.018*Number(document.getElementById('intersection-width').value),material=new THREE.MeshBasicMaterial({color:colorControls.intersection.value,depthTest:false}),up=new THREE.Vector3(0,1,0);let count=0;
  for(const segment of contour.segments){const points=segment.map(([x,y])=>{const z=first(x,y);return Number.isFinite(z)&&Math.abs(z)<=5.5?new THREE.Vector3(x,z,y):null;});if(points.some(p=>!p))continue;const [start,end]=points,direction=new THREE.Vector3().subVectors(end,start),length=direction.length();if(!length)continue;const object=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,length,6),material);object.position.copy(start).add(end).multiplyScalar(.5);object.quaternion.setFromUnitVectors(up,direction.normalize());object.renderOrder=3;intersectionGroup.add(object);count++;}
  if(!count)material.dispose();
}

function makeGrid() {
  gridGroup.clear();
  const extent = Number(rangeInput.value);
  const grid = new THREE.GridHelper(extent, extent, 0x78948a, 0xb6c8be);
  const materials = Array.isArray(grid.material) ? grid.material : [grid.material];
  materials.forEach((material) => {
    material.color.set(colorControls.grid.value);
    material.transparent = true;
    material.opacity = .24;
  });
  gridGroup.add(grid);
}

function paintAxisLabel(label,text,color){
  const canvas=label.material.map.image,ctx=canvas.getContext('2d');
  ctx.font=SpatialTypography.canvas(44,600);
  canvas.width=Math.ceil(ctx.measureText(text).width)+32;canvas.height=68;
  ctx.fillStyle=isNightTheme()?'rgba(23,35,48,.96)':'rgba(255,255,255,.94)';ctx.fillRect(0,0,canvas.width,68);
  ctx.strokeStyle=color;ctx.lineWidth=5;ctx.strokeRect(2.5,2.5,canvas.width-5,63);
  ctx.font=SpatialTypography.canvas(44,600);ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=isNightTheme()?'#eef5fa':'#172b32';ctx.fillText(text,canvas.width/2,35);
  label.userData.labelAspect=canvas.width/68;label.material.map.needsUpdate=true;
}
function createAxisLabel(text,color,pixels=28){
  const canvas=document.createElement('canvas');const texture=new THREE.CanvasTexture(canvas);
  const label=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false,depthWrite:false,sizeAttenuation:false}));
  paintAxisLabel(label,text,color);label.userData.axisText=text;label.renderOrder=20;
  label.onBeforeRender=(_renderer,_scene,viewCamera)=>{
    const letter=/^[XYZ]/.test(text);label.material.opacity=document.getElementById(letter?'axis-show-letters':'axis-show-numbers').checked?1:0;
    const height=pixels*Number(document.getElementById('axis-label-size').value)*2*Math.tan(THREE.MathUtils.degToRad(viewCamera.fov/2))/Math.max(1,viewport.clientHeight);
    label.scale.set(height*label.userData.labelAspect,height,1);label.updateMatrixWorld();
  };
  return label;
}
function makeAxes() {
  axesGroup.clear();
  axisLabelsGroup.clear();
  const extent = Number(rangeInput.value) / 2 + 0.4;
  const axisLimit = Math.floor(Number(rangeInput.value) / 2);
  const axisMaterial = (color) => new THREE.LineBasicMaterial({ color, transparent: true, opacity: .82 });
  const axisColors = { x: axisDisplayColor(colorControls.axisX.value), y: axisDisplayColor(colorControls.axisY.value), z: axisDisplayColor(colorControls.axisZ.value) };
  const line = (start, end, color) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(start[0], start[2], start[1]), new THREE.Vector3(end[0], end[2], end[1])]);
    axesGroup.add(new THREE.Line(geometry, axisMaterial(color)));
  };
  const tick = (start, end, color) => line(start, end, color);
  line([-extent, 0, 0], [extent, 0, 0], axisColors.x);
  line([0, -extent, 0], [0, extent, 0], axisColors.y);
  line([0, 0, -extent], [0, 0, extent], axisColors.z);

  const addLabel = (text,color,position) => {
    const label=createAxisLabel(text,color,/^[XYZ]$/.test(text)?28:18);
    label.position.set(position[0],position[2],position[1]);axisLabelsGroup.add(label);
  };
  addLabel('X', axisColors.x, [extent + .4, 0, 0]);
  addLabel('Y', axisColors.y, [0, extent + .4, 0]);
  addLabel('Z', axisColors.z, [0, 0, extent + .4]);
  addLabel('0', semanticColor('#75857d'), [0, 0, 0]);
  for (let value = 1; value <= axisLimit; value += 1) {
    tick([value, -.08, 0], [value, .08, 0], axisColors.x);
    tick([-value, -.08, 0], [-value, .08, 0], axisColors.x);
    tick([-.08, value, 0], [.08, value, 0], axisColors.y);
    tick([-.08, -value, 0], [.08, -value, 0], axisColors.y);
    tick([-.08, 0, value], [.08, 0, value], axisColors.z);
    tick([-.08, 0, -value], [.08, 0, -value], axisColors.z);
    addLabel(String(value), axisColors.x, [value, -.16, 0]);
    addLabel(String(-value), axisColors.x, [-value, -.16, 0]);
    addLabel(String(value), axisColors.y, [-.16, value, 0]);
    addLabel(String(-value), axisColors.y, [-.16, -value, 0]);
    addLabel(String(value), axisColors.z, [-.16, 0, value]);
    addLabel(String(-value), axisColors.z, [-.16, 0, -value]);
  }
}

function updateCameraValues() {
  axisValues.x.textContent = camera.position.x.toFixed(2);
  axisValues.y.textContent = camera.position.z.toFixed(2);
  axisValues.z.textContent = camera.position.y.toFixed(2);
}

function renderPlot() {
  try {
    makeSurface();
    clearAnalysis();
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();
    disposeODE();disposePhase();odeGroup.visible=true;
    makeGrid();
    makeAxes();
    makeIntersection();
    setLabSnapshot({generated:true,kind:'surface',title:'Superfícies explícitas e esferas',summary:`${surfaceGroup.children.filter(o=>o.isMesh&&!o.material?.wireframe).length} gráfico(s). Parâmetros: a=${document.getElementById('parameter-a').value}, b=${document.getElementById('parameter-b').value}, c=${document.getElementById('parameter-c').value}. Alturas explícitas recortadas em ±5.5.`});
    status.textContent = 'Superfície atualizada com sucesso';
    status.style.color = 'var(--deep-mint)';
  } catch (error) {
    status.textContent = error.message || 'Não foi possível interpretar a função';
    status.style.color = 'var(--coral)';
  }
}

function axisDisplayColor(value){return isNightTheme()?'#'+new THREE.Color(value).lerp(new THREE.Color('#ffffff'),.35).getHexString():value;}
function isNightTheme(){return document.documentElement.dataset.theme==='dark';}
function sceneBackgroundColor(){return isNightTheme()?'#101923':colorControls.background.value;}
function updateBackground() {
  viewport.style.background = sceneBackgroundColor();
}

// Semantic colors share one mapping in 3D objects, charts and legends.
const semanticOrigins=new WeakMap(),semanticVertices=new WeakMap();
const semanticSets={
 standard:['#0072b2','#d55e00','#009e73','#8e44ad','#a6761d','#cc79a7','#444444','#b58900'],
 'red-green':['#0072b2','#d55e00','#009e73','#6f4c9b','#8c564b','#cc79a7','#333333','#9c7500'],
 'blue-yellow':['#005a9c','#b22222','#007f5f','#713b80','#7e5030','#b34e7b','#333333','#8a6500'],
 'high-contrast':['#003f8c','#a60000','#005a32','#660080','#683800','#a00060','#111111','#755000'],
 'low-vision':['#004c99','#b02a00','#006b45','#6b238e','#784000','#a52670','#222222','#806000'],
"okabe-ito":["#0072b2", "#d55e00", "#009e73", "#cc79a7", "#e69f00", "#56b4e9", "#000000", "#f0e442"],
"cividis":["#0072b2", "#d55e00", "#009e73", "#cc79a7", "#e69f00", "#56b4e9", "#000000", "#f0e442"],
"viridis":["#0072b2", "#d55e00", "#009e73", "#cc79a7", "#e69f00", "#56b4e9", "#000000", "#f0e442"]
};
function paletteSemanticColor(value){
 const hex=new THREE.Color(value).getHexString(),set=semanticSets[paletteSelect.value]||semanticSets.standard;
 const slots={'0072b2':0,'2563eb':0,'d55e00':1,'dc2626':1,'009e73':2,'10b981':2,'5aa888':2,'009e9e':2,'8e44ad':3,'7c3aed':3,'b68bd1':3,'a6761d':4,'cc79a7':5,'db2777':5,'444444':6,'b58900':7,'f59e0b':7,'ffc107':7};
 if(Object.hasOwn(slots,hex))return set[slots[hex]];
 if(hex==='55c8c6')return colorControls.graphLow.value;if(hex==='ec806c')return colorControls.graphHigh.value;
 if(['000000','111111','15232b','263b38'].includes(hex))return palettes[paletteSelect.value].ui.ink;
 if(['71818a','777777','75857d'].includes(hex))return palettes[paletteSelect.value].ui.muted;
 if(hex==='e0e6e5')return palettes[paletteSelect.value].ui.line;
 if(hex==='ffffff')return palettes[paletteSelect.value].ui.panel;
 return '#'+hex;
}
function semanticColor(value){
 if(!isNightTheme())return paletteSemanticColor(value);
 const hex=new THREE.Color(value).getHexString();
 if(hex==='ffffff')return '#172330';
 if(hex==='e0e6e5')return '#354759';
 if(['000000','111111','15232b','263b38'].includes(hex))return '#edf4fa';
 if(['71818a','777777','75857d'].includes(hex))return '#b4c5d3';
 return '#'+new THREE.Color(paletteSemanticColor(value)).lerp(new THREE.Color('#ffffff'),.25).getHexString();
}
function adaptSemanticElements(){
 for(const group of [surfaceGroup,analysisGroup,criticalGroup,odeGroup,phaseGroup,vectorGroup,paramGroup,paramInspectorGroup,integralGroup,taylorGroup,bifGroup])group.traverse(o=>{
   if(o.userData.paletteAxis){o.material.color.set(axisDisplayColor(colorControls[o.userData.paletteAxis].value));return;}
   if(o.userData.paletteLabel){const {name,extent}=o.userData.paletteLabel;paintAxisLabel(o,`${name}  ${extent}`,axisDisplayColor(colorControls['axis'+name].value));return;}
   for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){if(!m.color||m.vertexColors||m.map)continue;if(!semanticOrigins.has(m))semanticOrigins.set(m,m.color.getHex());m.color.set(semanticColor(semanticOrigins.get(m)));}
   const colors=o.geometry?.attributes.color;if(!colors||![vectorGroup,integralGroup].includes(group))return;
   let base=semanticVertices.get(colors);if(!base){base=Float32Array.from(colors.array);semanticVertices.set(colors,base);}
   const positive=new THREE.Color(0x55c8c6),negative=new THREE.Color(0xec806c),dark=new THREE.Color(0x15232b),low=new THREE.Color(colorControls.graphLow.value),high=new THREE.Color(colorControls.graphHigh.value),ink=new THREE.Color(semanticColor(0x15232b));
   for(let i=0;i<colors.count;i++){
     const v=new THREE.Color().setRGB(base[i*3],base[i*3+1],base[i*3+2]);
     // Preserve signed shading, or the relative intensity of a vector arrow.
     let best=null,error=Infinity;for(const [source,target]of [[positive,low],[negative,high]]){const d=[dark.r-source.r,dark.g-source.g,dark.b-source.b],q=[v.r-source.r,v.g-source.g,v.b-source.b],t=Math.max(0,Math.min(.5,q.reduce((sum,x,k)=>sum+x*d[k],0)/d.reduce((sum,x)=>sum+x*x,0))),sample=source.clone().lerp(dark,t),e=(v.r-sample.r)**2+(v.g-sample.g)**2+(v.b-sample.b)**2;if(e<error){error=e;best=target.clone().lerp(ink,t);}}
     if(group===vectorGroup){const d=[negative.r-positive.r,negative.g-positive.g,negative.b-positive.b],q=[v.r-positive.r,v.g-positive.g,v.b-positive.b],t=Math.max(0,Math.min(1,q.reduce((sum,x,k)=>sum+x*d[k],0)/d.reduce((sum,x)=>sum+x*x,0)));best=graphGradientColor(t);}
     colors.setXYZ(i,best.r,best.g,best.b);
   }colors.needsUpdate=true;
 });
 for(const el of document.querySelectorAll('[data-palette-color]'))el.style.color=semanticColor(el.dataset.paletteColor);
}
function refreshPaletteCharts(){
 if(labSnapshot.kind==='ode')drawODETimeChart(labSnapshot.curves,labSnapshot.second);
 if(['phase','fields'].includes(labSnapshot.kind)){prepareEvolutionChart();drawEvolutionCursor();}
 if(labSnapshot.kind==='bifurcation')drawBifurcationChart(labSnapshot.rows,...labSnapshot.bounds);
 refreshExpandedChart();
}
// Appearance updates never regenerate mathematics or reset the active module.
const paletteVertexWeights=new WeakMap();
function refreshScenePalette(){
  const low=new THREE.Color(colorControls.graphLow.value),high=new THREE.Color(colorControls.graphHigh.value),primary=new THREE.Color(colorControls.graph.value);
  for(const group of [surfaceGroup,paramGroup])group.traverse(object=>{
    const colors=object.geometry?.attributes.color,positions=object.geometry?.attributes.position;if(!colors||!positions||object.material?.wireframe)return;
    let weights=paletteVertexWeights.get(colors);
    if(!weights){
      const height=i=>Math.abs(object.rotation.x)>1?positions.getZ(i):positions.getY(i);
      let min=Infinity,max=-Infinity;for(let i=0;i<positions.count;i++){min=Math.min(min,height(i));max=Math.max(max,height(i));}
      weights=Array.from({length:colors.count},(_,i)=>(height(i)-min)/Math.max(max-min,1e-10));paletteVertexWeights.set(colors,weights);
    }
    const tint=new THREE.Color();for(let i=0;i<colors.count;i++){const t=weights[i];document.querySelector('#color-toggle').checked?graphGradientColor(t,tint):tint.copy(primary);colors.setXYZ(i,tint.r,tint.g,tint.b);}colors.needsUpdate=true;
  });
  gridGroup.traverse(o=>{if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])m.color?.set(colorControls.grid.value);});
  intersectionGroup.traverse(o=>o.material?.color?.set(colorControls.intersection.value));
  // Axes and their labels are appearance-only objects; their reconstruction preserves the scene.
  const axesVisible=axesGroup.visible,labelsVisible=axisLabelsGroup.visible;
  for(const group of [axesGroup,axisLabelsGroup])group.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}});
  makeAxes();axesGroup.visible=axesVisible;axisLabelsGroup.visible=labelsVisible;
  applyLayerVisibility();refreshPaletteCharts();renderer.render(scene,camera);
}

function applyPalette(name) {
  const palette = palettes[name];
  if (!palette) return;
  colorControls.background.value = palette.background;
  colorControls.grid.value = palette.grid;
  colorControls.axisX.value = palette.axisX;
  colorControls.axisY.value = palette.axisY;
  colorControls.axisZ.value = palette.axisZ;
  colorControls.graph.value = palette.graph;
  colorControls.graphLow.value = palette.graphLow;
  colorControls.graphHigh.value = palette.graphHigh;
  document.documentElement.style.setProperty('--paper', palette.ui.paper);
  document.documentElement.style.setProperty('--panel', palette.ui.panel);
  document.documentElement.style.setProperty('--ink', palette.ui.ink);
  document.documentElement.style.setProperty('--muted', palette.ui.muted);
  document.documentElement.style.setProperty('--line', palette.ui.line);
  document.documentElement.style.setProperty('--mint', palette.ui.mint);
  document.documentElement.style.setProperty('--deep-mint', palette.ui.deepMint);
  updateBackground();
  refreshScenePalette();
}

function refreshActiveIntersection(){
  if(labSnapshot.kind!=='surface')return;
  try{makeIntersection();applyLayerVisibility();}catch(error){status.textContent=error.message;}
}
plotButton.addEventListener('click', renderPlot);
formulaInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') renderPlot(); });
rangeInput.addEventListener('input', () => { rangeValue.textContent = rangeInput.value; if(labSnapshot.kind==='surface')renderPlot();else{makeGrid();refreshScenePalette();} });
document.querySelector('#intersection-formula').addEventListener('input', refreshActiveIntersection);
document.querySelector('#intersection-toggle').addEventListener('change', refreshActiveIntersection);
function renumberGraphs() {
  document.querySelectorAll('.graph-row').forEach((row, index) => {
    row.querySelector('.graph-index').textContent = String(index + 1).padStart(2, '0');
  });
}
document.querySelector('#add-graph-button').addEventListener('click', () => {
  const row = document.createElement('div');
  row.className = 'graph-row';
  row.innerHTML = '<span class="graph-index"></span><div class="formula-input"><span>z =</span><input class="graph-input" type="text" value="cos(x) * sin(y)" spellcheck="false" aria-label="Função de gráfico adicional"></div><button class="remove-graph" type="button" aria-label="Remover gráfico">×</button>';
  const input = row.querySelector('.graph-input');
  const removeButton = row.querySelector('.remove-graph');
  input.addEventListener('input', renderPlot);
  removeButton.addEventListener('click', () => { row.remove(); renumberGraphs(); renderPlot(); });
  document.querySelector('#graph-list').appendChild(row);
  renumberGraphs();
  renderPlot();
});
document.querySelectorAll('[data-formula]').forEach((button) => {
  button.addEventListener('click', () => { formulaInput.value = button.dataset.formula; renderPlot(); });
});
document.querySelector('#grid-toggle').addEventListener('change', (event) => { if(!gridGroup.children.length)makeGrid();document.getElementById('layer-grid').checked=event.target.checked;gridGroup.visible=event.target.checked;applyLayerVisibility(); });
document.querySelector('#axes-toggle').addEventListener('change', (event) => { if(!axesGroup.children.length)makeAxes();document.getElementById('layer-axes').checked=event.target.checked;axesGroup.visible=axisLabelsGroup.visible=event.target.checked;applyLayerVisibility(); });
document.querySelector('#color-toggle').addEventListener('change', refreshScenePalette);
colorControls.background.addEventListener('input', updateBackground);
Object.values(colorControls).filter((input) => input !== colorControls.background).forEach((input) => input.addEventListener('input', refreshScenePalette));
document.querySelector('#intersection-width').addEventListener('input', (event) => { document.querySelector('#intersection-width-value').textContent = event.target.value; refreshActiveIntersection(); });
document.querySelector('#surface-opacity').addEventListener('input', (event) => {
  document.querySelector('#surface-opacity-value').textContent=event.target.value+'%';
  surfaceGroup.traverse((object)=>{
    if(!object.isMesh||object.material?.wireframe!==true)for(const material of Array.isArray(object?.material)?object.material:[object?.material].filter(Boolean)){
      material.opacity=surfaceOpacity();material.depthWrite=false;material.needsUpdate=true;
    }
  });
});
paletteSelect.addEventListener('change', (event) => applyPalette(event.target.value));
document.querySelector('#contour-count').addEventListener('input', (event) => { document.querySelector('#contour-count-value').textContent = event.target.value; updateAnalysis(); });
document.querySelectorAll('.analysis-toggle').forEach((toggle) => {
  toggle.addEventListener('change', () => { status.textContent = 'Ferramenta de cálculo atualizada'; updateAnalysis(); });
});
document.querySelector('#show-analysis-button').addEventListener('click', () => {
  document.querySelectorAll('.analysis-toggle').forEach((toggle) => { toggle.checked = true; });
  updateAnalysis();
  status.textContent = 'Todas as ferramentas de cálculo estão visíveis';
});
document.querySelector('#hide-analysis-button').addEventListener('click', () => {
  document.querySelectorAll('.analysis-toggle').forEach((toggle) => { toggle.checked = false; });
  updateAnalysis();
  status.textContent = 'Todas as ferramentas de cálculo estão ocultas';
});
walkToggle.addEventListener('click', () => {
  if (walkToggle.checked) requestWalkPointerLock();
});
walkToggle.addEventListener('change', (event) => setWalkingMode(event.target.checked));

const navMessages = {
  tutorials:'Tutorial de uso selecionado',
  function: 'Painel de função selecionado',
  surfaces: 'Controles de superfície selecionados',
  calculus: 'Módulo de cálculo preparado',
  ode: 'EDOs de primeira e segunda ordem · soluções numéricas',
  phase: 'Sistemas de EDOs · plano de fase e estabilidade',
  fields: 'Campos vetoriais 3D · divergente, rotacional e trajetórias',
  parametric: 'Curvas e superfícies paramétricas 3D',
  integrals: 'Integrais duplas, triplas e de linha',
  taylor: 'Taylor · aproximações de ordem 1 a 10',
  bifurcation: 'Bifurcações de equilíbrios escalares',
  examples: 'Atividades guiadas e experiências',
  layers: 'Visibilidade dos objetos da cena',
  appearance: 'Cores e acessibilidade',
  inspector: 'Inspetor da cena selecionado',
  navigation: 'Controles de navegação selecionados'
};
const moduleGroups={sections:'graphics',cartesian:'graphics',accessibility:'tools',tutorials:'tools',function:'graphics',surfaces:'graphics',parametric:'graphics',calculus:'calculus',integrals:'calculus',taylor:'calculus',ode:'dynamics',phase:'dynamics',fields:'dynamics',bifurcation:'dynamics',examples:'tools',layers:'tools',appearance:'tools',inspector:'tools',navigation:'tools'},groupNames={graphics:'Gráficos',calculus:'Cálculo',dynamics:'Dinâmica',tools:'Laboratório'};
function closeModuleCatalog(){document.getElementById('module-catalog').hidden=true;for(const button of document.querySelectorAll('.nav-category'))button.setAttribute('aria-expanded','false');}
function filterModuleCatalog(){const query=document.getElementById('catalog-search').value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(),scope=document.getElementById('catalog-scope').value;let matches=0;
  for(const group of document.querySelectorAll('.catalog-group')){let count=0;for(const button of group.querySelectorAll('.nav-item')){const text=button.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),show=(query?text.includes(query):scope==='all'||group.dataset.group===scope);button.hidden=!show;if(show){count++;matches++;}}group.hidden=count===0;}document.getElementById('catalog-empty').hidden=matches>0;
}
function openModuleCatalog(scope='all'){if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}document.getElementById('catalog-scope').value=scope;document.getElementById('catalog-search').value='';document.getElementById('module-catalog').hidden=false;for(const button of document.querySelectorAll('.nav-category'))button.setAttribute('aria-expanded',String(button.dataset.category===scope));filterModuleCatalog();document.getElementById('module-catalog').scrollTop=0;document.getElementById(matchMedia('(pointer:coarse)').matches?'catalog-close':'catalog-search').focus({preventScroll:true});}
function syncLabNavigation(){const view=document.querySelector('.menu-panel.active')?.dataset.panel||'function',group=moduleGroups[view];document.getElementById('drawer-location').textContent=groupNames[group];for(const button of document.querySelectorAll('.nav-category'))button.classList.toggle('active',button.dataset.category===group);for(const button of document.querySelectorAll('.nav-item')){button.classList.toggle('active',button.dataset.view===view);button.setAttribute('aria-current',button.dataset.view===view?'page':'false');}}
for(const button of document.querySelectorAll('.nav-category'))button.addEventListener('click',()=>{const same=!document.getElementById('module-catalog').hidden&&document.getElementById('catalog-scope').value===button.dataset.category;if(same)closeModuleCatalog();else openModuleCatalog(button.dataset.category);});
document.getElementById('catalog-search').addEventListener('input',filterModuleCatalog);document.getElementById('catalog-scope').addEventListener('change',filterModuleCatalog);
document.getElementById('catalog-close').addEventListener('click',closeModuleCatalog);document.getElementById('drawer-close').addEventListener('click',()=>controlDrawer.classList.remove('open'));document.getElementById('drawer-modules').addEventListener('click',()=>openModuleCatalog());
document.addEventListener('click',event=>{if(!event.target.closest('#module-catalog, .nav-category, #drawer-modules'))closeModuleCatalog();});
window.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.getElementById('chart-dialog').open){if(!document.getElementById('module-catalog').hidden){closeModuleCatalog();event.preventDefault();}else if(!walkingMode){controlDrawer.classList.remove('open');}}if(!event.defaultPrevented&&event.key==='/'&&!isTyping(event)&&!walkingMode){event.preventDefault();openModuleCatalog();}});
for(const item of document.querySelectorAll('.nav-item'))item.addEventListener('click',()=>{openLabPanel(item.dataset.view);status.textContent=navMessages[item.dataset.view]||item.querySelector('strong').textContent;});
document.querySelector('#fullscreen-button').addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});
document.querySelector('#reset-button').addEventListener('click', () => {
  if(sceneHome){camera.position.copy(sceneHome.position);controls.target.copy(sceneHome.target);graphTarget.copy(sceneHome.target);}else{camera.position.set(13,10,15);controls.target.set(0,0,0);}
  camera.lookAt(controls.target);
  controls.update();
});
window.addEventListener('keydown', (event) => { if (!event.defaultPrevented && !document.body.classList.contains('cartesian-active') && !isTyping(event) && event.key.toLowerCase() === 'r') document.querySelector('#reset-button').click(); });

// EDO: coordenadas matemáticas (x,y,z) -> Three.js (x,z,y).
const odeGroup = new THREE.Group();
sceneGroup.add(odeGroup);
const odeUI = id => document.getElementById(`ode-${id}`);
let odeSamples = [], odeMarker = null, odePlaying = false, odeProgress = 0;
function compileODE(text) {
  const fn=compileExpression(text,['x','y']);return(x,y)=>{const value=fn(x,y);if(!Number.isFinite(value))throw Error('A expressão saiu do domínio real ou divergiu.');return value;};
}
function odeStep(f,x,y,h,method) {
  const k1=f(x,y);
  if(method==='euler') return y+h*k1;
  if(method==='heun') return y+h*(k1+f(x+h,y+h*k1))/2;
  const k2=f(x+h/2,y+h*k1/2), k3=f(x+h/2,y+h*k2/2), k4=f(x+h,y+h*k3);
  return y+h*(k1+2*k2+2*k3+k4)/6;
}
function adaptiveOptions(prefix){
  const read=id=>Number(document.getElementById(`${prefix}-${id}`).value),rtol=read('rtol'),atol=read('atol');if(!(rtol>=1e-12&&rtol<=.1&&atol>=1e-14&&atol<=.1))throw Error('Use tolerância relativa entre 1e-12 e 0.1 e absoluta entre 1e-14 e 0.1.');return {rtol,atol};
}
function integrateODE(f,x0,y0,end,h,method,options={}) {
  if(method==='rk45'){const r=adaptiveRK45((t,p)=>[f(t,p[0])],x0,[y0],end,{...options,maxStep:h});return {...r,points:r.points.map(p=>({x:p.t,y:p.state[0]})),stopped:!!r.reason};} 
  const points=[{x:x0,y:y0}]; let x=x0,y=y0, stopped=false;
  const direction=Math.sign(end-x0);
  for(let i=0; direction*(end-x)>1e-12 && i<10000; i++) {
    const step=direction*Math.min(h,Math.abs(end-x));
    try { const next=odeStep(f,x,y,step,method); if(!Number.isFinite(next)||Math.abs(next)>1e6) throw Error('Divergência'); x+=step;y=next;points.push({x,y}); }
    catch { stopped=true;break; }
  }
  return {points,stopped};
}
function integrateSecondODE(f,x0,y0,v0,end,h,method,options={}){
  if(method==='rk45'){const r=adaptiveRK45((t,p)=>[p[1],f(t,...p)],x0,[y0,v0],end,{...options,maxStep:h});return {...r,points:r.points.map(p=>({x:p.t,y:p.state[0],v:p.state[1]})),stopped:!!r.reason};}
  const points=[{x:x0,y:y0,v:v0}],direction=Math.sign(end-x0);let x=x0,y=y0,v=v0,stopped=false;
  const slope=(t,a,b)=>{const acceleration=f(t,a,b);if(!Number.isFinite(acceleration))throw Error('Fora do domínio');return [b,acceleration];};
  for(let i=0;direction*(end-x)>1e-12&&i<10000;i++){
    const d=direction*Math.min(h,Math.abs(end-x));
    try{const k1=slope(x,y,v);let next;
      if(method==='euler')next=[y+d*k1[0],v+d*k1[1]];
      else if(method==='heun'){const k2=slope(x+d,y+d*k1[0],v+d*k1[1]);next=[y+d*(k1[0]+k2[0])/2,v+d*(k1[1]+k2[1])/2];}
      else{const k2=slope(x+d/2,y+d*k1[0]/2,v+d*k1[1]/2),k3=slope(x+d/2,y+d*k2[0]/2,v+d*k2[1]/2),k4=slope(x+d,y+d*k3[0],v+d*k3[1]);next=[0,1].map(j=>(j?v:y)+d*(k1[j]+2*k2[j]+2*k3[j]+k4[j])/6);}
      if(next.some(a=>!Number.isFinite(a)||Math.abs(a)>1e6))throw Error('Divergência');x+=d;[y,v]=next;points.push({x,y,v});
    }catch{stopped=true;break;}
  }return {points,stopped};
}
function showODEOrder(){const second=odeUI('order').value==='2';odeUI('x0-label').textContent=second?'t₀':'x₀';odeUI('min-label').textContent=second?'t mínimo':'x mínimo';odeUI('max-label').textContent=second?'t máximo':'x máximo';odeUI('exact-label').textContent=second?'Expressão de referência y(t), opcional':'Expressão de referência y(x), opcional';odeUI('velocity-label').hidden=!second;odeUI('formula-label').textContent=second?'y″ = f(t, y, v), com v = y′':'dy/dx = f(x, y)';odeUI('field').disabled=second;}
odeUI('order').addEventListener('change',showODEOrder);
document.querySelectorAll('[data-ode-second]').forEach(b=>b.addEventListener('click',()=>{odeUI('order').value='2';showODEOrder();odeUI('formula').value=b.dataset.odeSecond;odeUI('exact').value='';odeUI('x0').value='0';odeUI('y0').value='1';odeUI('v0').value='0';odeUI('min').value='0';odeUI('max').value='20';odeUI('step').value='0.02';}));
function drawODETimeChart(curves,second){
  const canvas=odeUI('time-chart'),ctx=canvas.getContext('2d');canvas.hidden=false;ctx.clearRect(0,0,720,420);ctx.fillStyle=semanticColor('#ffffff');ctx.fillRect(0,0,720,420);
  const series=curves.flatMap(c=>[{points:c.points,key:'y',color:{euler:'#d55e00',heun:'#8e44ad',rk4:'#0072b2',rk45:'#009e73'}[c.method],label:c.method+' y'},...(second?[{points:c.points,key:'v',color:{euler:'#b58900',heun:'#cc79a7',rk4:'#009e73',rk45:'#cc79a7'}[c.method],label:c.method+' v'}]:[])]);
  let xmin=Infinity,xmax=-Infinity,lo=Infinity,hi=-Infinity;for(const curve of curves)for(const p of curve.points){xmin=Math.min(xmin,p.x);xmax=Math.max(xmax,p.x);}for(const item of series)for(const p of item.points){lo=Math.min(lo,p[item.key]);hi=Math.max(hi,p[item.key]);}if(xmin===xmax)xmax=xmin+1;const pad=Math.max((hi-lo)*.08,.1);lo-=pad;hi+=pad;
  const px=x=>66+(x-xmin)/(xmax-xmin)*630,py=y=>350-(y-lo)/(hi-lo)*270;ctx.font=SpatialTypography.canvas(15);
  for(let i=0;i<=4;i++){const y=lo+(hi-lo)*i/4,x=xmin+(xmax-xmin)*i/4;ctx.strokeStyle=semanticColor('#e0e6e5');ctx.beginPath();ctx.moveTo(66,py(y));ctx.lineTo(696,py(y));ctx.stroke();ctx.fillStyle=semanticColor('#263b38');ctx.fillText(y.toPrecision(3),4,py(y)+5);ctx.fillText(x.toPrecision(3),px(x)-16,376);}
  for(const item of series){ctx.strokeStyle=semanticColor(item.color);ctx.lineWidth=2;ctx.beginPath();item.points.forEach((p,i)=>i?ctx.lineTo(px(p.x),py(p[item.key])):ctx.moveTo(px(p.x),py(p[item.key])));ctx.stroke();}
  series.forEach((item,i)=>{ctx.fillStyle=semanticColor(item.color);ctx.fillText(item.label,66+(i%3)*200,26+Math.floor(i/3)*24);});ctx.fillStyle=semanticColor('#263b38');ctx.fillText(second?'tempo t':'x',340,407);odeUI('chart-caption').textContent=second?'Evolução de y(t) e v(t) = y′(t). Ambas usam a mesma escala vertical.':'Evolução de y(x) para os métodos selecionados.';
}
function disposeODE() {
  odeGroup.traverse(o=>{o.geometry?.dispose(); if(o.material) (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});
  odeUI('time-chart').hidden=true;odeUI('chart-caption').textContent='';odeGroup.clear(); odeMarker=null;odeSamples=[];odePlaying=false;
  odeUI('play').textContent='▶ Simular';
}
function odeLine(points,color) {
  if(points.length<2) return;
  const geometry=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(p.x,0.025,p.y)));
  odeGroup.add(new THREE.Line(geometry,new THREE.LineBasicMaterial({color})));
}
function drawODEMarker() {
  if(!odeSamples.length||!odeMarker) return;
  const {a,b,mix:u}=trackFrame(odeSamples,odeProgress,'x');
  const x=a.x+(b.x-a.x)*u,y=a.y+(b.y-a.y)*u;
  odeMarker.position.set(x,.08,y); odeUI('progress').value=odeProgress;
  odeUI('readout').textContent=`x = ${x.toFixed(4)} · y ≈ ${y.toFixed(6)}${a.v!==undefined?' · v ≈ '+(a.v+(b.v-a.v)*u).toFixed(6):''}`;
}
function updateODEAnimation(delta) {
  if(!odePlaying) return;
  odeProgress=Math.min(1,odeProgress+delta*animationSpeed()/10);drawODEMarker();
  if(odeProgress===1) {odePlaying=false;odeUI('play').textContent='▶ Simular';}
}
function solveODE() {
  try {
    const num=id=>{if(!odeUI(id).value.trim()) throw Error('Preencha todos os campos numéricos.'); const n=Number(odeUI(id).value);if(!Number.isFinite(n)) throw Error('Valor numérico inválido.');return n;};
    const x0=num('x0'),y0=num('y0'),min=num('min'),max=num('max'),h=num('step'),yr=num('yrange');
    if(!(min<max&&x0>=min&&x0<=max&&h>=.0001&&yr>0&&yr<=1e4)) throw Error('Use mínimo < máximo, x₀ dentro do intervalo, h ≥ 0.0001 e alcance de y entre 0 e 10000.');
    if((odeUI('method').value!=='rk45'||odeUI('compare').checked)&&Math.ceil((max-min)/h)>10000) throw Error('Limite de 10.000 passos. Aumente h ou reduza o intervalo.');
    const second=odeUI('order').value==='2',v0=second?num('v0'):0;
    const raw=second?compileExpression(odeUI('formula').value.replace(/\bt\b/gi,'x'),['x','y','v']):null;
    const f=second?raw:compileODE(odeUI('formula').value);if(!Number.isFinite(f(x0,y0,v0)))throw Error('A aceleração inicial está fora do domínio real.');
    const exact=odeUI('exact').value.trim()?compileODE(second?odeUI('exact').value.replace(/\bt\b/gi,'x'):odeUI('exact').value):null;
    if(exact && Math.abs(exact(x0,0)-y0)>1e-5*Math.max(1,Math.abs(y0))) throw Error('A solução exata informada não satisfaz a condição inicial.');
    if(second&&exact){const eps=1e-5*Math.max(1,Math.abs(x0)),velocity=(exact(x0+eps,0)-exact(x0-eps,0))/(2*eps);if(!Number.isFinite(velocity)||Math.abs(velocity-v0)>1e-4*Math.max(1,Math.abs(v0)))throw Error('A solução exata informada não satisfaz a velocidade inicial.');}
    const selected=odeUI('method').value, methods=odeUI('compare').checked?[...new Set(['euler','heun','rk4',selected])]:[selected],options=selected==='rk45'?adaptiveOptions('ode'):{};
    const curves=methods.map(method=>{const integrate=end=>second?integrateSecondODE(f,x0,y0,v0,end,h,method,options):integrateODE(f,x0,y0,end,h,method,options);const left=integrate(min),right=integrate(max);return {method,points:[...left.points.slice(1).reverse(),...right.points],stopped:left.stopped||right.stopped,reason:left.reason||right.reason,rejected:(left.rejected||0)+(right.rejected||0)};});
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();
    disposePhase();
    odeGroup.visible=true;
    disposeODE();
    criticalGroup.visible=false;
    surfaceGroup.visible=false;intersectionGroup.visible=false;analysisGroup.visible=false;
    const colors={euler:0xd55e00,heun:0x8e44ad,rk4:0x0072b2,rk45:0x009e73}; const labels={euler:'Euler',heun:'Heun',rk4:'RK4',rk45:'RK45'};
    const report=[];
    for(const curve of curves) {
      odeLine(curve.points,colors[curve.method]);
      let line=`${labels[curve.method]}: ${curve.points.length} pontos`;
      if(exact) {try { const error=Math.max(...curve.points.map(p=>Math.abs(p.y-exact(p.x,0))));line+=` · erro máximo amostrado: ${error.toExponential(3)}`;}catch {line+=' · solução exata fora do domínio';}}
      if(curve.method==='rk45')line+=` · ${curve.rejected} passos rejeitados`;
      if(curve.stopped) line+=' · interrompida: '+(curve.reason||'domínio/divergência');
      report.push(line);
    }
    if(exact) {let segment=[];for(let i=0;i<=400;i++){const x=min+(max-min)*i/400;try{segment.push({x,y:exact(x,0)});}catch{odeLine(segment,0x009e73);segment=[];}}odeLine(segment,0x009e73);}
    if(!second&&odeUI('field').checked) {
      const points=[],length=Math.min((max-min)/22,yr/11)*.7;
      for(let i=0;i<=22;i++) for(let j=0;j<=22;j++) {
        const x=min+(max-min)*i/22,y=-yr+2*yr*j/22;
        try {const slope=f(x,y),norm=Math.hypot(1,slope),dx=length/norm/2,dy=length*(slope/norm)/2;
          points.push(new THREE.Vector3(x-dx,.01,y-dy),new THREE.Vector3(x+dx,.01,y+dy));} catch {}
      }
      odeGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x71818a,transparent:true,opacity:.65})));
    }
    odeSamples=curves.find(c=>c.method===selected).points;
    odeMarker=new THREE.Mesh(new THREE.SphereGeometry(.10,16,12),new THREE.MeshBasicMaterial({color:colors[selected]}));odeGroup.add(odeMarker);
    const initial=new THREE.Mesh(new THREE.SphereGeometry(.08,12,8),new THREE.MeshBasicMaterial({color:0x111111}));initial.position.set(x0,.05,y0);odeGroup.add(initial);
    odeProgress=0;drawODEMarker();
    ['play','reset','progress'].forEach(id=>odeUI(id).disabled=false);
    odeUI('result').textContent=report.join('\n')+'\nA curva pode ultrapassar o alcance do campo. Expressão de referência fornecida pelo usuário; a equação não é verificada simbolicamente.';
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}
    const span=Math.max(max-min,2*yr,4);controls.maxDistance=Math.max(40,span*3);
    controls.target.set((min+max)/2,0,0);graphTarget.copy(controls.target);
    camera.position.set((min+max)/2,span*1.25,span*.05);camera.lookAt(controls.target);controls.update();
    drawODETimeChart(curves,second);
    setLabSnapshot({generated:true,kind:'ode',second,title:(second?'EDO de segunda ordem: ':'EDO: ')+odeUI('formula').value,curves,summary:odeUI('result').textContent});
    status.textContent='EDO resolvida no plano XY · arraste para orbitar';
  } catch(error) {odeUI('result').textContent=error.message;}
}
odeUI('solve').addEventListener('click',solveODE);
odeUI('formula').addEventListener('keydown',e=>{if(e.key==='Enter')solveODE();});
document.querySelectorAll('[data-ode]').forEach(b=>b.addEventListener('click',()=>{odeUI('formula').value=b.dataset.ode;odeUI('exact').value='';odeUI('order').value='1';showODEOrder();}));
odeUI('play').addEventListener('click',()=>{if(odeProgress>=1)odeProgress=0;odePlaying=!odePlaying;odeUI('play').textContent=odePlaying?'⏸ Pausar':'▶ Simular';});
odeUI('reset').addEventListener('click',()=>{odePlaying=false;odeProgress=0;odeUI('play').textContent='▶ Simular';drawODEMarker();});
odeUI('progress').addEventListener('input',()=>{odePlaying=false;odeUI('play').textContent='▶ Simular';odeProgress=Number(odeUI('progress').value);drawODEMarker();});
odeUI('clear').addEventListener('click',()=>{disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();disposePhase();disposeODE();odeGroup.visible=true;surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);odeUI('readout').textContent='EDO removida.';odeUI('result').textContent='';document.querySelector('#reset-button').click();});
plotButton.addEventListener('click',()=>{disposeODE();surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);});

// Sistemas autônomos 2D: dx/dt=P(x,y), dy/dt=Q(x,y).
const phaseGroup = new THREE.Group();
sceneGroup.add(phaseGroup);
const phaseUI = id => document.getElementById(`phase-${id}`);
let phaseTrack=[],phaseMarker=null,phasePlaying=false,phaseProgress=0;
function systemStep(f,x,y,h,method='rk4') {
  const k1=f(x,y);
  if(method==='euler') return [x+h*k1[0],y+h*k1[1]];
  if(method==='heun') {const k2=f(x+h*k1[0],y+h*k1[1]);return [x+h*(k1[0]+k2[0])/2,y+h*(k1[1]+k2[1])/2];}
  const k2=f(x+h*k1[0]/2,y+h*k1[1]/2),k3=f(x+h*k2[0]/2,y+h*k2[1]/2),k4=f(x+h*k3[0],y+h*k3[1]);
  return [x+h*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6,y+h*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6];
}
function timedSystemStep(f,t,x,y,h,method){
  const k1=f(t,x,y);
  if(method==='euler')return [x+h*k1[0],y+h*k1[1]];
  if(method==='heun'){const k2=f(t+h,x+h*k1[0],y+h*k1[1]);return [x+h*(k1[0]+k2[0])/2,y+h*(k1[1]+k2[1])/2];}
  const k2=f(t+h/2,x+h*k1[0]/2,y+h*k1[1]/2),k3=f(t+h/2,x+h*k2[0]/2,y+h*k2[1]/2),k4=f(t+h,x+h*k3[0],y+h*k3[1]);
  return [x+h*(k1[0]+2*k2[0]+2*k3[0]+k4[0])/6,y+h*(k1[1]+2*k2[1]+2*k3[1]+k4[1])/6];
}
function integrateSystem(f,x,y,duration,h,method,extent,t0=0,timed=false,options={}) {
  if(method==='rk45'){const r=adaptiveRK45((t,p)=>timed?f(t,...p):f(...p),t0,[x,y],t0+duration,{...options,maxStep:h,bound:extent});return {...r,points:r.points.map(p=>({t:p.t,x:p.state[0],y:p.state[1]}))};}
  const points=[{x,y,t:t0}];let t=0,reason='';
  const direction=Math.sign(duration);
  while(direction*(duration-t)>1e-12 && points.length<=10000) {
    const dt=direction*Math.min(h,Math.abs(duration-t));
    try {const next=timed?timedSystemStep(f,t0+t,x,y,dt,method):systemStep(f,x,y,dt,method);
      if(!next.every(Number.isFinite)) {reason='divergência';break;}
      if(Math.max(Math.abs(next[0]),Math.abs(next[1]))>extent) {reason='limite do plano';break;}
      [x,y]=next;t+=dt;points.push({x,y,t:t0+t});
    } catch {reason='fora do domínio real';break;}
  }
  return {points,reason};
}
function systemJacobian(f,x,y) {
  const hx=1e-5*Math.max(1,Math.abs(x)),hy=1e-5*Math.max(1,Math.abs(y));
  const xp=f(x+hx,y),xm=f(x-hx,y),yp=f(x,y+hy),ym=f(x,y-hy);
  return [(xp[0]-xm[0])/(2*hx),(yp[0]-ym[0])/(2*hy),(xp[1]-xm[1])/(2*hx),(yp[1]-ym[1])/(2*hy)];
}
function classifySystem(J){
  const scale=Math.max(...J.map(Math.abs));if(!Number.isFinite(scale))throw Error('Jacobiana não finita.');if(scale===0)return {type:'Não hiperbólico: estabilidade inconclusiva',eigen:'0, 0'};
  const [a,b,c,d]=J.map(v=>v/scale),trace=a+d,det=a*d-b*c,disc=trace*trace-4*det,eps=1e-6;let eigen,type;
  if(disc<0){const real=trace/2,imag=Math.sqrt(-disc)/2;eigen=`${mathNumber(real*scale)} ± ${mathNumber(imag*scale)}i`;type=Math.abs(real)<=eps?'Não hiperbólico: centro na linearização; estabilidade inconclusiva':real<0?'Foco assintoticamente estável':'Foco instável';}
  else{const root=Math.sqrt(disc),l1=(trace+root)/2,l2=(trace-root)/2;eigen=`${mathNumber(l1*scale)}, ${mathNumber(l2*scale)}`;type=Math.abs(l1)<=eps||Math.abs(l2)<=eps?'Não hiperbólico: estabilidade inconclusiva':(l1<0)!==(l2<0)?'Sela (instável)':l1<0&&l2<0?'Nó assintoticamente estável':'Nó instável';}
  return {type,eigen};
}
function findSystemEquilibria(f,extent) {
  const scales=[0,0];for(let i=0;i<=8;i++)for(let j=0;j<=8;j++){try{f(-extent+2*extent*i/8,-extent+2*extent*j/8).forEach((v,k)=>{if(Number.isFinite(v))scales[k]=Math.max(scales[k],Math.abs(v));});}catch{}}
  const normalized=(x,y)=>f(x,y).map((v,k)=>v/(scales[k]||1)),roots=[];
  for(let i=0;i<=10;i++) for(let j=0;j<=10;j++) {
    let x=-extent+2*extent*i/10,y=-extent+2*extent*j/10;
    try {
      for(let k=0;k<40;k++) {
        const v=normalized(x,y);if(Math.hypot(...v)<1e-9) break;
        const [a,b,c,d]=systemJacobian(normalized,x,y),det=a*d-b*c;
        if(!Number.isFinite(det)||Math.abs(det)<1e-12) break;
        const dx=(d*v[0]-b*v[1])/det,dy=(-c*v[0]+a*v[1])/det;
        // Backtracking avoids many Newton steps escaping the domain.
        let accepted=false;
        for(let damping=1;damping>=1/128;damping/=2) {
          const nx=x-damping*dx,ny=y-damping*dy;
          if(Math.abs(nx)>extent*2||Math.abs(ny)>extent*2) continue;
          try {if(Math.hypot(...normalized(nx,ny))<Math.hypot(...v)) {x=nx;y=ny;accepted=true;break;}}catch {}
        }
        if(!accepted) break;
      }
      if(Math.abs(x)<=extent&&Math.abs(y)<=extent&&Math.hypot(...normalized(x,y))<1e-8&&!roots.some(p=>Math.hypot(p.x-x,p.y-y)<1e-4)) {
        const J=systemJacobian(f,x,y);roots.push({x,y,J,...classifySystem(J)});
        if(roots.length>=30) return {roots,capped:true};
      }
    } catch {}
  }
  return {roots,capped:false};
}
function disposePhase() {
  phaseGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});phaseGroup.clear();phaseTrack=[];phaseMarker=null;phasePlaying=false;phaseUI('play').textContent='▶ Simular';
  ['play','reset','progress'].forEach(id=>phaseUI(id).disabled=true);
}
function phaseLine(points,color) {
  if(points.length<2)return;
  phaseGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(p.x,.035,p.y))),new THREE.LineBasicMaterial({color})));
}
function showPhaseFrame() {
  if(!phaseTrack.length||!phaseMarker)return;
  const {a,b,mix}=trackFrame(phaseTrack,phaseProgress);
  const x=a.x+(b.x-a.x)*mix,y=a.y+(b.y-a.y)*mix,t=a.t+(b.t-a.t)*mix;
  phaseMarker.position.set(x,.08,y);phaseUI('progress').value=phaseProgress;phaseUI('readout').textContent=`Trajetória ${Number(phaseUI('active').value)+1} · t = ${t.toFixed(3)} · x = ${x.toFixed(5)} · y = ${y.toFixed(5)}`;
}
function updatePhaseAnimation(delta) {
  if(!phasePlaying)return;phaseProgress=Math.min(1,phaseProgress+delta*animationSpeed()/12);showPhaseFrame();
  if(phaseProgress===1){phasePlaying=false;phaseUI('play').textContent='▶ Simular';}
}
function phaseInitialConditions(x0,y0,extent){
  const lines=phaseUI('initials').value.trim().split(/\n/).filter(line=>line.trim());if(lines.length>6)throw Error('Use no máximo 6 condições adicionais.');
  const initials=[[x0,y0]];for(const line of lines){const fields=line.trim().split(/[,;\s]+/);if(fields.length!==2||fields.some(v=>!Number.isFinite(Number(v))))throw Error('Cada condição deve conter dois números: x₀, y₀ (decimais com ponto).');const p=fields.map(Number);if(p.some(v=>Math.abs(v)>extent))throw Error('Todas as condições devem estar dentro do plano.');initials.push(p);}return initials;
}
function renderPhaseComparison(tracks){
  const box=phaseUI('comparison');box.replaceChildren();if(tracks.length<2)return;const table=document.createElement('table'),head=document.createElement('tr');for(const text of ['Trajetória','(x₀, y₀)','t final','(x final, y final)','Resultado']){const cell=document.createElement('th');cell.textContent=text;head.appendChild(cell);}table.appendChild(head);
  tracks.forEach((r,i)=>{const row=document.createElement('tr'),p=r.points.at(-1);for(const text of [String(i+1),r.initial.map(v=>Number(v.toPrecision(5))).join(', '),Number(p.t.toPrecision(6)),[p.x,p.y].map(v=>Number(v.toPrecision(6))).join(', '),r.reason||'concluída']){const cell=document.createElement('td');cell.textContent=text;row.appendChild(cell);}table.appendChild(row);});box.appendChild(table);
}
function drawPhaseNullclines(ft,extent,time){
  const layer=new THREE.Group();layer.userData.layer='contours';let count=0;
  for(let k=0;k<2;k++){const contour=zeroContour((x,y)=>ft(time,x,y)[k],extent),vertices=contour.segments.flatMap(s=>s.map(p=>new THREE.Vector3(p[0],.045,p[1])));count+=contour.segments.length;layer.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(vertices),new THREE.LineBasicMaterial({color:k===0?0x009e9e:0xd55e00,linewidth:2})));}
  phaseGroup.add(layer);return count;
}
phaseUI('active').addEventListener('change',()=>{
  if(labSnapshot.kind!=='phase'||!labSnapshot.tracks)return;const index=Number(phaseUI('active').value);if(!labSnapshot.tracks[index]){phaseUI('active').value=String(labSnapshot.active||0);phaseUI('result').textContent='Esta condição ainda não foi gerada. Adicione-a e gere novamente.';return;}
  phaseTrack=labSnapshot.tracks[index].points;const initial=phaseGroup.children.find(o=>o.userData.phaseInitial);if(initial)initial.position.set(phaseTrack[0].x,.055,phaseTrack[0].y);phaseMarker.material.color.setHex([0x0072b2,0xd55e00,0x009e73,0x8e44ad,0xa6761d,0xcc79a7,0x444444][index]);semanticOrigins.set(phaseMarker.material,phaseMarker.material.color.getHex());labSnapshot.points=phaseTrack;labSnapshot.active=index;phasePlaying=false;phaseProgress=0;phaseUI('play').textContent='▶ Simular';showPhaseFrame();prepareEvolutionChart();adaptSemanticElements();followLastPoint=null;
});
phaseUI('chart-coordinate').addEventListener('change',()=>{if(labSnapshot.kind==='phase')prepareEvolutionChart();});
function solvePhase() {
  try {
    const read=id=>{const raw=phaseUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha os campos numéricos.');return Number(raw);};
    const x0=read('x0'),y0=read('y0'),duration=read('time'),h=read('step'),extent=read('extent'),method=phaseUI('method').value,t0=read('t0'),fieldTime=read('field-time');
    if(!(extent>=.1&&extent<=1000&&h>=.0001&&Math.abs(duration)>0&&(method==='rk45'||Math.ceil(Math.abs(duration)/h)<=10000)))throw Error('Use alcance entre 0.1 e 1000, h ≥ 0.0001, tempo diferente de zero e até 10.000 passos.');
    if(Math.max(Math.abs(x0),Math.abs(y0))>extent)throw Error('A condição inicial deve estar dentro do plano de fase.');
    if(!Number.isFinite(t0+duration)||t0+duration===t0)throw Error('O intervalo de tempo não é representável. Reduza o tempo inicial ou ajuste a duração.');
    const timed=/\bt\b/i.test(phaseUI('p').value+' '+phaseUI('q').value),P=compileExpression(phaseUI('p').value,['t','x','y']),Q=compileExpression(phaseUI('q').value,['t','x','y']);
    const ft=(t,x,y)=>{const values=[P(t,x,y),Q(t,x,y)];if(!values.every(Number.isFinite))throw Error('Fora do domínio real.');return values;},f=(x,y)=>ft(t0,x,y);ft(t0,x0,y0);
    const options=method==='rk45'?adaptiveOptions('phase'):{},initials=phaseInitialConditions(x0,y0,extent),tracks=initials.map(initial=>({...integrateSystem(ft,...initial,duration,h,method,extent,t0,true,options),initial})),active=Math.min(Number(phaseUI('active').value),tracks.length-1),result=tracks[active];phaseUI('active').value=String(active);
    const equilibria=!timed&&phaseUI('equilibria').checked?findSystemEquilibria(f,extent):{roots:[],capped:false};
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();
    disposePhase();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);odeGroup.visible=false;
    criticalGroup.visible=false;
    phaseGroup.visible=true;surfaceGroup.visible=false;intersectionGroup.visible=false;analysisGroup.visible=false;
    if(phaseUI('field').checked) {
      const points=[],length=extent*.065;
      for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){
        const x=-extent+extent*i/10,y=-extent+extent*j/10;
        try {const [p,q]=ft(fieldTime,x,y),norm=Math.hypot(p,q);if(norm<1e-12)continue;
          const dx=p/norm*length,dy=q/norm*length,ex=x+dx/2,ey=y+dy/2;
          points.push(new THREE.Vector3(x-dx/2,.01,y-dy/2),new THREE.Vector3(ex,.01,ey));
          points.push(new THREE.Vector3(ex,.01,ey),new THREE.Vector3(ex-dx*.35-dy*.2,.01,ey-dy*.35+dx*.2));
          points.push(new THREE.Vector3(ex,.01,ey),new THREE.Vector3(ex-dx*.35+dy*.2,.01,ey-dy*.35-dx*.2));
        }catch{}
      }
      phaseGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x71818a,transparent:true,opacity:.65})));
    }
    if(phaseUI('family').checked)for(let i=0;i<8;i++){
      const angle=i*Math.PI/4,x=Math.cos(angle)*extent*.65,y=Math.sin(angle)*extent*.65;
      try{phaseLine(integrateSystem(ft,x,y,duration,h,method,extent,t0,true,options).points,0xb68bd1);}catch{}
    }
    const compareColors=[0x0072b2,0xd55e00,0x009e73,0x8e44ad,0xa6761d,0xcc79a7,0x444444];tracks.forEach((r,i)=>phaseLine(r.points,compareColors[i]));phaseTrack=result.points;renderPhaseComparison(tracks);
    const contourCount=phaseUI('nullclines').checked?drawPhaseNullclines(ft,extent,fieldTime):0;
    phaseMarker=new THREE.Mesh(new THREE.SphereGeometry(extent*.015,16,12),new THREE.MeshBasicMaterial({color:compareColors[active]}));phaseGroup.add(phaseMarker);
    const initial=new THREE.Mesh(new THREE.SphereGeometry(extent*.012,12,8),new THREE.MeshBasicMaterial({color:0x111111}));initial.userData.phaseInitial=true;initial.position.set(result.initial[0],.055,result.initial[1]);phaseGroup.add(initial);
    for(const root of equilibria.roots){const point=new THREE.Mesh(new THREE.SphereGeometry(extent*.02,12,8),new THREE.MeshBasicMaterial({color:0xd55e00}));point.position.set(root.x,.07,root.y);phaseGroup.add(point);}
    phaseProgress=0;showPhaseFrame();['play','reset','progress'].forEach(id=>phaseUI(id).disabled=false);
    phaseUI('result').textContent=`${result.points.length} pontos · ${method.toUpperCase()}${method==='rk45'?' · '+result.rejected+' passos rejeitados':''}${result.reason?' · interrompida: '+result.reason:''}\n`+(timed?'Sistema dependente do tempo: busca de equilíbrios omitida.':phaseUI('equilibria').checked?`${equilibria.roots.length} equilíbrio(s) encontrado(s) numericamente.`:'Busca de equilíbrios desativada.')+`\nIntervalo: t = ${t0} até ${t0+duration}. Setas: t = ${fieldTime}.\n${tracks.length} condição(ões) comparada(s).${phaseUI('nullclines').checked?' Nulclinas: '+contourCount+' segmentos amostrados.':''}`;
    const container=phaseUI('roots');container.replaceChildren();
    for(const root of equilibria.roots){const card=document.createElement('div');card.className='phase-root';const [a,b,c,d]=root.J;card.textContent=`(${root.x.toFixed(5)}, ${root.y.toFixed(5)})\n${root.type}\nJ = [${mathNumber(a)}, ${mathNumber(b)}; ${mathNumber(c)}, ${mathNumber(d)}]\nλ = ${root.eigen}`;container.appendChild(card);}
    if(equilibria.capped){const note=document.createElement('p');note.textContent='Busca limitada a 30 pontos. Pode haver uma família contínua de equilíbrios.';container.appendChild(note);}
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}
    controls.maxDistance=Math.max(40,extent*6);controls.target.set(0,0,0);graphTarget.copy(controls.target);camera.position.set(0,extent*2.8,extent*.1);camera.lookAt(controls.target);controls.update();setLabSnapshot({generated:true,kind:'phase',title:timed?'Sistema 2D dependente do tempo':'Sistema 2D autônomo',points:result.points,tracks,active,summary:phaseUI('result').textContent});status.textContent='Plano de fase · setas indicam o sentido para t crescente';
  }catch(error){phaseUI('result').textContent=error.message;}
}
phaseUI('solve').addEventListener('click',solvePhase);
phaseUI('play').addEventListener('click',()=>{if(phaseProgress>=1)phaseProgress=0;phasePlaying=!phasePlaying;phaseUI('play').textContent=phasePlaying?'⏸ Pausar':'▶ Simular';});
phaseUI('reset').addEventListener('click',()=>{phasePlaying=false;phaseProgress=0;phaseUI('play').textContent='▶ Simular';showPhaseFrame();});
phaseUI('progress').addEventListener('input',()=>{phasePlaying=false;phaseUI('play').textContent='▶ Simular';phaseProgress=Number(phaseUI('progress').value);showPhaseFrame();});
phaseUI('clear').addEventListener('click',()=>{disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);disposePhase();odeGroup.visible=true;surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;phaseUI('roots').replaceChildren();phaseUI('comparison').replaceChildren();phaseUI('result').textContent='';phaseUI('readout').textContent='Sistema removido.';document.querySelector('#reset-button').click();});
document.querySelectorAll('[data-system]').forEach(b=>b.addEventListener('click',()=>{
  const presets={spiral:['x-y','x+y',1,0,5,6],sink:['-x-y','x-y',3,0,10,5],saddle:['x','-y',.2,2,5,5],center:['y','-x',2,0,12,4],predator:['x*(1-y)','y*(x-1)',1.5,1,15,4],forced:['y','-x-0.3*y+sin(t)',1,0,20,5]};
  const [p,q,x,y,time,extent]=presets[b.dataset.system];phaseUI('p').value=p;phaseUI('q').value=q;phaseUI('x0').value=x;phaseUI('y0').value=y;phaseUI('time').value=time;phaseUI('extent').value=extent;phaseUI('t0').value='0';phaseUI('field-time').value='0';
}));
// Switching mathematical modules pauses and removes the previous dynamic scene.

plotButton.addEventListener('click',()=>{disposePhase();odeGroup.visible=true;});

// Diferenciação numérica central para superfícies explícitas z=f(x,y).
function surfaceDifferential(f,x,y,h=.001){
  if(f.smoothRisk)checkSmoothNeighborhood(f,x,y,h);
  let magnitude=0;const value=(a,b)=>{const z=Number(f(a,b));if(!Number.isFinite(z))throw Error('A vizinhança do ponto está fora do domínio real.');magnitude=Math.max(magnitude,Math.abs(z));return z;},z=value(x,y);
  const at=step=>{const xp=value(x+step,y),xm=value(x-step,y),yp=value(x,y+step),ym=value(x,y-step);return {fx:(xp-xm)/(2*step),fy:(yp-ym)/(2*step),fxx:(xp-2*z+xm)/(step*step),fyy:(yp-2*z+ym)/(step*step),fxy:(value(x+step,y+step)-value(x+step,y-step)-value(x-step,y+step)+value(x-step,y-step))/(4*step*step)};};
  const coarse=at(h),fine=at(h/2),result={z};for(const key of ['fx','fy','fxx','fxy','fyy'])result[key]=fine[key]+(fine[key]-coarse[key])/3;
  result.gradientError=Math.max(Math.abs(fine.fx-coarse.fx),Math.abs(fine.fy-coarse.fy))/3+16*Number.EPSILON*magnitude/h;
  result.hessianError=Math.max(...['fxx','fxy','fyy'].map(key=>Math.abs(fine[key]-coarse[key])))/3+64*Number.EPSILON*magnitude/(h*h);
  if(Object.values(result).some(v=>!Number.isFinite(v)))throw Error('Derivadas excederam a precisão numérica. Ajuste o passo ou a função.');return {...result,norm:Math.hypot(result.fx,result.fy)};
}
function classifyCritical(d){
  const scale=Math.max(Math.abs(d.fxx),Math.abs(d.fxy),Math.abs(d.fyy));if(!Number.isFinite(scale)||scale===0)return 'Teste da Hessiana inconclusivo';
  const a=d.fxx/scale,b=d.fxy/scale,c=d.fyy/scale,trace=a+c,delta=Math.hypot(a-c,2*b),l1=(trace+delta)/2,l2=(trace-delta)/2,tolerance=Math.max(1e-5,4*(d.hessianError||0)/scale);
  if(Math.abs(l1)<=tolerance||Math.abs(l2)<=tolerance)return 'Teste da Hessiana inconclusivo';return l1>0&&l2>0?'Mínimo local':l1<0&&l2<0?'Máximo local':'Ponto de sela';
}
function findSurfaceCritical(f,extent,h){
  const scales=[0,0];for(let i=0;i<=6;i++)for(let j=0;j<=6;j++){try{const d=surfaceDifferential(f,-extent+2*extent*i/6,-extent+2*extent*j/6,h);scales[0]=Math.max(scales[0],Math.abs(d.fx));scales[1]=Math.max(scales[1],Math.abs(d.fy));}catch{}}
  const residual=d=>Math.hypot(d.fx/(scales[0]||1),d.fy/(scales[1]||1)),roots=[];
  for(let i=0;i<=12;i++)for(let j=0;j<=12;j++){
    let x=-extent+2*extent*i/12,y=-extent+2*extent*j/12;
    try{for(let k=0;k<60;k++){
      const d=surfaceDifferential(f,x,y,h),r=residual(d);if(r<1e-11)break;
      const sx=scales[0]||1,sy=scales[1]||1,a=d.fxx/sx,b=d.fxy/sx,c=d.fxy/sy,e=d.fyy/sy,det=a*e-b*c,hs=Math.max(Math.abs(a),Math.abs(b),Math.abs(c),Math.abs(e));if(!Number.isFinite(det)||Math.abs(det)<1e-12*hs*hs)break;
      const fx=d.fx/sx,fy=d.fy/sy,dx=(e*fx-b*fy)/det,dy=(-c*fx+a*fy)/det;let accepted=false;
      for(let damping=1;damping>=1/128;damping/=2){const nx=x-damping*dx,ny=y-damping*dy;if(Math.abs(nx)>extent||Math.abs(ny)>extent)continue;try{if(residual(surfaceDifferential(f,nx,ny,h))<r){x=nx;y=ny;accepted=true;break;}}catch{}}if(!accepted)break;
    }
    const d=surfaceDifferential(f,x,y,h);if(residual(d)<1e-8&&Math.abs(x)<=extent&&Math.abs(y)<=extent&&!roots.some(p=>Math.hypot(p.x-x,p.y-y)<Math.max(1e-4,h*2))){roots.push({x,y,...d,type:classifyCritical(d)});if(roots.length>=30)return {roots,capped:true};}
    }catch{}
  }return {roots,capped:false};
}
const calcUI=id=>document.getElementById(`calc-${id}`);
const criticalGroup=new THREE.Group();sceneGroup.add(criticalGroup);
function clearCriticalPoints() {
  criticalGroup.visible=true;
  criticalGroup.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});criticalGroup.clear();calcUI('roots').replaceChildren();
}
function calcSettings() {
  const ids=['h','ux','uy'];const values=ids.map(id=>{const raw=calcUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha o passo e as componentes da direção.');return Number(raw);});
  const [h,ux,uy]=values;if(h<.00001||h>.1)throw Error('Use passo de derivação entre 0.00001 e 0.1.');
  const length=Math.hypot(ux,uy);if(!length)throw Error('A direção deve ser um vetor não nulo.');return {h,ux:ux/length,uy:uy/length};
}
function updateCalculusInspector() {
  if(!selectedPoint||!selectedFormula){calcUI('readout').textContent='Selecione um ponto ou informe suas coordenadas.';return;}
  try {
    const {h,ux,uy}=calcSettings(),{x,y}=selectedPoint,d=surfaceDifferential(selectedFormula,x,y,h),directional=d.fx*ux+d.fy*uy;
    const fmt=mathNumber;
    const plane=`z − (${fmt(d.z)}) = (${fmt(d.fx)})(x − (${fmt(x)})) + (${fmt(d.fy)})(y − (${fmt(y)}))`;
    calcUI('readout').textContent=`P = (${fmt(x)}, ${fmt(y)}, ${fmt(d.z)})\nf(x,y) = ${selectedPoint.formulaText||formulaInput.value}\n∂f/∂x ≈ ${fmt(d.fx)}\n∂f/∂y ≈ ${fmt(d.fy)}\n∇f ≈ (${fmt(d.fx)}, ${fmt(d.fy)})\n||∇f|| ≈ ${fmt(d.norm)}\nu = (${fmt(ux)}, ${fmt(uy)})\nDᵤf ≈ ${fmt(directional)}\n\nHessiana ≈\n[ ${fmt(d.fxx)}, ${fmt(d.fxy)} ]\n[ ${fmt(d.fxy)}, ${fmt(d.fyy)} ]\n\nPlano tangente:\n${plane}\n\n${d.norm>8*d.gradientError?'Gradiente resolvido como não nulo nesta precisão.':'Gradiente compatível com zero nesta precisão: '+classifyCritical(d)}\n\nConsistência entre h e h/2 (indicador, sem garantia de erro):\nGradiente: ${fmt(d.gradientError)}\nHessiana: ${fmt(d.hessianError)}${selectedFormula.smoothRisk?'\n\nExpressão com possível quebra de suavidade. A checagem local por amostragem não prova diferenciabilidade.':''}`;
    calcUI('x').value=fmt(x);calcUI('y').value=fmt(y);
    if(calcUI('direction').checked)analysisGroup.add(new THREE.ArrowHelper(new THREE.Vector3(ux,0,uy),selectedPoint.world,1.5,0x7c3aed,.22,.12));
    if(typeof renderPointInspector==='function')renderPointInspector(d);
  }catch(error){calcUI('readout').textContent=error.message;if(typeof renderPointInspector==='function')renderPointInspector(null,error.message);}
}
function selectCalculatedPoint(x,y,text=formulaInput.value) {
  if(text.trim().toLowerCase().startsWith('sphere'))throw Error('Este módulo exige uma superfície explícita z=f(x,y).');
  const f=compileFormula(text),z=f(x,y);if(!Number.isFinite(z)||Math.abs(z)>5.5)throw Error('A altura real ultrapassa o recorte visual ±5.5. Escolha outro ponto ou outra função.');
  disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();
  criticalGroup.visible=true;
  selectedFormula=f;selectedPoint={x,y,world:new THREE.Vector3(x,z,y),formulaText:text};
  disposePhase();disposeODE();odeGroup.visible=true;surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;
  updateAnalysis();
}
calcUI('select').addEventListener('click',()=>{try{const x=Number(calcUI('x').value),y=Number(calcUI('y').value);if(!calcUI('x').value.trim()||!calcUI('y').value.trim()||![x,y].every(Number.isFinite))throw Error('Informe x e y válidos.');if(Math.max(Math.abs(x),Math.abs(y))>Number(rangeInput.value)/2)throw Error('O ponto deve estar dentro do domínio exibido.');selectCalculatedPoint(x,y);}catch(e){calcUI('readout').textContent=e.message;}});
['h','ux','uy','direction'].forEach(id=>calcUI(id).addEventListener('change',updateAnalysis));
calcUI('search').addEventListener('click',()=>{
  try {
    const {h}=calcSettings(),text=formulaInput.value;if(text.trim().toLowerCase().startsWith('sphere'))throw Error('A busca exige z=f(x,y).');
    const f=compileFormula(text),{roots,capped}=findSurfaceCritical(f,Number(rangeInput.value)/2,h);clearCriticalPoints();
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();
    disposePhase();disposeODE();odeGroup.visible=true;surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;
    const degenerate=roots.filter(root=>root.type==='Teste da Hessiana inconclusivo');
    const regular=roots.filter(root=>root.type!=='Teste da Hessiana inconclusivo');
    calcUI('summary').textContent=`${regular.length} candidato(s) com Hessiana não degenerada · ${degenerate.length} candidato(s) com teste inconclusivo.${capped?' Busca interrompida no limite de 30 candidatos; a lista é parcial.':''}`;
    let degenerateContainer=null;
    if(degenerate.length){
      const note=document.createElement('p');note.className='analysis-hint';
      note.textContent=degenerate.length>1?'Vários candidatos têm Hessiana degenerada ou quase degenerada. Eles podem pertencer a curvas de pontos críticos, como os anéis de sin(sqrt(x²+y²)). O teste de segunda ordem não determina a classificação. Esses candidatos foram agrupados e não recebem esferas no gráfico.':'A Hessiana deste candidato é degenerada ou quase degenerada. O teste de segunda ordem não determina a classificação; isso não é um erro de cálculo.';
      calcUI('roots').appendChild(note);
      const details=document.createElement('details');details.className='critical-details';const summary=document.createElement('summary');summary.textContent=`Ver ${degenerate.length} candidato(s) com teste inconclusivo`;details.appendChild(summary);degenerateContainer=document.createElement('div');details.appendChild(degenerateContainer);calcUI('roots').appendChild(details);
    }
    for(const root of [...regular,...degenerate]){
      const card=document.createElement('button');card.className='phase-root critical-card';card.type='button';card.textContent=`(${root.x.toFixed(5)}, ${root.y.toFixed(5)})\nz = ${root.z.toFixed(5)} · ${root.type}${Math.abs(root.z)>5.5?' · fora do recorte visual':''}`;
      card.addEventListener('click',()=>{try{selectCalculatedPoint(root.x,root.y,text);}catch(e){calcUI('readout').textContent=e.message;}});
      (root.type==='Teste da Hessiana inconclusivo'?degenerateContainer:calcUI('roots')).appendChild(card);
      if(Math.abs(root.z)<=5.5&&root.type!=='Teste da Hessiana inconclusivo'){
        const colors={'Mínimo local':0x009e73,'Máximo local':0xd55e00,'Ponto de sela':0x7c3aed};
        const mesh=new THREE.Mesh(new THREE.SphereGeometry(.10,16,12),new THREE.MeshBasicMaterial({color:colors[root.type],depthTest:false}));mesh.renderOrder=10;mesh.position.set(root.x,root.z,root.y);criticalGroup.add(mesh);
      }
    }
  }catch(e){calcUI('summary').textContent=e.message;}
});
calcUI('search').addEventListener('click',applyLayerVisibility);
calcUI('clear').addEventListener('click',()=>{clearCriticalPoints();calcUI('summary').textContent='';});

// Campos autônomos 3D, em coordenadas matemáticas (x,y,z).
function compileField3D(text) {
  const fn=compileExpression(text,['x','y','z']);return(...p)=>{const value=fn(...p);if(!Number.isFinite(value))throw Error('O campo saiu do domínio real ou divergiu.');return value;};
}
function fieldRK4(f,position,h) {
  const at=(v,k,s)=>v.map((value,i)=>value+s*k[i]);
  const k1=f(...position),k2=f(...at(position,k1,h/2)),k3=f(...at(position,k2,h/2)),k4=f(...at(position,k3,h));
  return position.map((v,i)=>v+h*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6);
}
function integrateField3D(f,initial,end,h,extent,method='rk4',options={}) {
  if(method==='rk45'){const r=adaptiveRK45((t,p)=>f(...p),0,initial,end,{...options,maxStep:h,bound:extent,limit:20000});return {...r,points:r.points.map(p=>({t:p.t,p:p.state}))};}
  let p=[...initial],t=0,reason='';const points=[{p:[...p],t}],direction=Math.sign(end);
  while(direction*(end-t)>1e-12&&points.length<=20000) {
    const step=direction*Math.min(h,Math.abs(end-t));
    try{const next=fieldRK4(f,p,step);if(!next.every(Number.isFinite)){reason='divergência';break;}
      if(next.some(v=>Math.abs(v)>extent)){reason='saída do cubo de visualização';break;}
      p=next;t+=step;points.push({p:[...p],t});
    }catch{reason='fora do domínio real';break;}
  }
  return {points,reason};
}
function fieldDifferential3D(f,p,h=.001) {
  const J=[[],[],[]];
  for(let j=0;j<3;j++){const a=[...p],b=[...p];a[j]+=h;b[j]-=h;const va=f(...a),vb=f(...b);for(let i=0;i<3;i++)J[i][j]=(va[i]-vb[i])/(2*h);}
  return {value:f(...p),divergence:J[0][0]+J[1][1]+J[2][2],curl:[J[2][1]-J[1][2],J[0][2]-J[2][0],J[1][0]-J[0][1]],J};
}
const fieldUI=id=>document.getElementById(`field-${id}`);
const vectorGroup=new THREE.Group();sceneGroup.add(vectorGroup);
let fieldTrack=[],fieldMarker=null,fieldCurve=null,fieldPlaying=false,fieldProgress=0,activeField=null,activeFieldExtent=5;
const fieldWorld=p=>new THREE.Vector3(p[0],p[2],p[1]);
function disposeVectorField() {
  vectorGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map?.dispose();m.dispose();});});
  vectorGroup.clear();fieldTrack=[];fieldMarker=null;fieldCurve=null;fieldPlaying=false;activeField=null;fieldUI('play').textContent='▶ Simular';
  ['play','reset','progress'].forEach(id=>fieldUI(id).disabled=true);
}
function restoreSurfaceLayers() {
  surfaceGroup.visible=true;intersectionGroup.visible=true;analysisGroup.visible=true;criticalGroup.visible=true;
  gridGroup.visible=document.querySelector('#grid-toggle').checked;axesGroup.visible=document.querySelector('#axes-toggle').checked;axisLabelsGroup.visible=axesGroup.visible;
  const hasSurface=surfaceGroup.children.some(o=>o.isMesh&&!o.material?.wireframe);
  setLabSnapshot(hasSurface?{generated:true,kind:'surface',title:'Superfícies',summary:'Cena de superfícies restaurada. Alturas explícitas recortadas em ±5.5.'}:{kind:'empty',title:'Nenhum gráfico gerado',summary:'Escolha uma ferramenta para começar.'});
}
function readFieldNumber(id) {
  const raw=fieldUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha todos os campos numéricos.');return Number(raw);
}
function fieldFunctionFromInputs() {
  const functions=['p','q','r'].map(id=>compileField3D(fieldUI(id).value));return (x,y,z)=>functions.map(f=>f(x,y,z));
}
function addFieldReference(extent,target=vectorGroup) {
  const geometry=new THREE.EdgesGeometry(new THREE.BoxGeometry(2*extent,2*extent,2*extent));
  const cube=new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0x71818a,transparent:true,opacity:.2}));cube.userData.layer='axes';target.add(cube);
  const axes=[['X',[extent,0,0],colorControls.axisX.value],['Y',[0,extent,0],colorControls.axisY.value],['Z',[0,0,extent],colorControls.axisZ.value]];
  for(const [name,p,color]of axes){
    const axis=new THREE.Line(new THREE.BufferGeometry().setFromPoints([fieldWorld(p.map(v=>-v)),fieldWorld(p)]),new THREE.LineBasicMaterial({color,transparent:true,opacity:.5}));axis.userData.layer='axes';axis.userData.paletteAxis='axis'+name;target.add(axis);
    const label=createAxisLabel(`${name}  ${extent}`,color,28);label.userData.layer='axes';label.userData.paletteLabel={name,extent};label.position.copy(fieldWorld(p));target.add(label);
  }
}
function addFieldArrows(f,extent,count) {
  const samples=[];let skipped=0,maxNorm=0;
  for(let i=0;i<count;i++)for(let j=0;j<count;j++)for(let k=0;k<count;k++){
    const p=[i,j,k].map(n=>-extent+2*extent*n/(count-1));
    try{const v=f(...p),norm=Math.hypot(...v);if(!norm){skipped++;continue;}maxNorm=Math.max(maxNorm,norm);samples.push({p,v,norm});}catch{skipped++;}
  }
  const points=[],colors=[],length=2*extent/(count-1)*.55;
  for(const {p,v,norm}of samples){
    const center=fieldWorld(p),dir=fieldWorld(v.map(x=>x/norm)),start=center.clone().addScaledVector(dir,-length/2),end=center.clone().addScaledVector(dir,length/2);
    const helper=Math.abs(dir.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),side=new THREE.Vector3().crossVectors(dir,helper).normalize();
    const tail=end.clone().addScaledVector(dir,-length*.32),a=tail.clone().addScaledVector(side,length*.15),b=tail.clone().addScaledVector(side,-length*.15);
    points.push(start,end,end.clone(),a,end.clone(),b);
    const ratio=maxNorm?Math.log1p(norm)/Math.log1p(maxNorm):0;
    const color=new THREE.Color(0x55c8c6).lerp(new THREE.Color(0xec806c),ratio);for(let n=0;n<6;n++)colors.push(color.r,color.g,color.b);
  }
  const geometry=new THREE.BufferGeometry().setFromPoints(points);geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  vectorGroup.add(new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.65})));
  return {count:samples.length,skipped,maxNorm,samples};
}
function inspectField() {
  try{
    const f=activeField||fieldFunctionFromInputs(),p=['ix','iy','iz'].map(readFieldNumber),h=readFieldNumber('dh');
    if(h<.00001||h>.1)throw Error('Use passo de derivação entre 0.00001 e 0.1.');
    const result=fieldDifferential3D(f,p,h),fmt=n=>Math.abs(n)<1e-9?'0':Number(n.toPrecision(7)).toString();
    fieldUI('inspector').textContent=`P = (${p.map(fmt).join(', ')})\nF(P) = (${result.value.map(fmt).join(', ')})\n||F(P)|| = ${fmt(Math.hypot(...result.value))}\n\ndiv F ≈ ${fmt(result.divergence)}\nrot F ≈ (${result.curl.map(fmt).join(', ')})\n\n${activeField?'Valores do campo atualmente desenhado. Gere novamente após editar as equações.':'Valores das equações informadas.'}`;
  }catch(e){fieldUI('inspector').textContent=e.message;}
}
function drawFieldFrame() {
  if(!fieldTrack.length||!fieldMarker)return;
  const {a,b,mix,index:i}=trackFrame(fieldTrack,fieldProgress);
  const p=a.p.map((v,n)=>v+(b.p[n]-v)*mix),t=a.t+(b.t-a.t)*mix;fieldMarker.position.copy(fieldWorld(p));fieldUI('progress').value=fieldProgress;
  if(fieldCurve)fieldCurve.geometry.setDrawRange(0,Math.min(fieldTrack.length,Math.max(2,i+1)));
  fieldUI('readout').textContent=`t = ${t.toFixed(3)}\nx = ${p[0].toFixed(5)} · y = ${p[1].toFixed(5)} · z = ${p[2].toFixed(5)}`;
}
function updateFieldAnimation(delta) {
  if(!fieldPlaying)return;fieldProgress=Math.min(1,fieldProgress+delta*animationSpeed()/12);drawFieldFrame();
  if(fieldProgress===1){fieldPlaying=false;fieldUI('play').textContent='▶ Simular';}
}
function generateVectorField() {
  try{
    const method=fieldUI('method').value,options=method==='rk45'?adaptiveOptions('field'):{},extent=readFieldNumber('extent'),count=readFieldNumber('density'),h=readFieldNumber('step'),time=readFieldNumber('time'),initial=['x0','y0','z0'].map(readFieldNumber);
    if(extent<.1||extent>1000||!Number.isInteger(count)||count<3||count>9)throw Error('Use alcance entre 0.1 e 1000 e densidade inteira entre 3 e 9.');
    if(h<.0001||time===0||(method!=='rk45'&&Math.ceil(Math.abs(time)/h)>20000))throw Error('Use h ≥ 0.0001, tempo não nulo e no máximo 20.000 passos.');
    if(initial.some(v=>Math.abs(v)>extent))throw Error('A condição inicial deve estar dentro do cubo.');
    const f=fieldFunctionFromInputs();f(...initial);
    const result=fieldUI('trajectory').checked?integrateField3D(f,initial,time,h,extent,method,options):{points:[],reason:''};
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();disposePhase();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);
    activeField=f;activeFieldExtent=extent;vectorGroup.visible=true;surfaceGroup.visible=false;intersectionGroup.visible=false;analysisGroup.visible=false;criticalGroup.visible=false;gridGroup.visible=false;axesGroup.visible=false;axisLabelsGroup.visible=false;
    addFieldReference(extent);const arrows=fieldUI('arrows').checked?addFieldArrows(f,extent,count):{count:0,skipped:0,maxNorm:0};
    if(result.points.length){
      fieldTrack=result.points;fieldCurve=new THREE.Line(new THREE.BufferGeometry().setFromPoints(fieldTrack.map(point=>fieldWorld(point.p))),new THREE.LineBasicMaterial({color:0x0072b2}));vectorGroup.add(fieldCurve);
      fieldMarker=new THREE.Mesh(new THREE.SphereGeometry(extent*.009,16,12),new THREE.MeshBasicMaterial({color:0xd55e00}));vectorGroup.add(fieldMarker);
      const start=new THREE.Mesh(new THREE.SphereGeometry(extent*.007,12,8),new THREE.MeshBasicMaterial({color:0x111111}));start.position.copy(fieldWorld(initial));vectorGroup.add(start);
      fieldProgress=0;drawFieldFrame();fieldCurve.geometry.setDrawRange(0,fieldTrack.length);
      ['play','reset','progress'].forEach(id=>fieldUI(id).disabled=false);
    }else{fieldUI('readout').textContent='Trajetória desativada.';}
    fieldUI('result').textContent=`${arrows.count} vetores desenhados${arrows.skipped?' · '+arrows.skipped+' amostras nulas ou fora do domínio':''}.\n${result.points.length} pontos na trajetória ${method.toUpperCase()}${method==='rk45'?' · '+(result.rejected||0)+' passos rejeitados':''}${result.reason?' · interrompida: '+result.reason:''}.\n${arrows.count?'Cor: intensidade relativa em escala logarítmica; máximo amostrado = '+arrows.maxNorm.toPrecision(5)+'.':''}`;
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}
    controls.maxDistance=Math.max(40,extent*8);
    let center=new THREE.Vector3(0,0,0),span=extent*2;
    if(!fieldUI('arrows').checked&&fieldTrack.length>1){
      const minima=[Infinity,Infinity,Infinity],maxima=[-Infinity,-Infinity,-Infinity];
      for(const point of fieldTrack)point.p.forEach((value,i)=>{minima[i]=Math.min(minima[i],value);maxima[i]=Math.max(maxima[i],value);});
      center=fieldWorld(minima.map((value,i)=>(value+maxima[i])/2));span=Math.max(1,...minima.map((value,i)=>maxima[i]-value));
    }
    controls.target.copy(center);graphTarget.copy(center);camera.position.copy(center).add(new THREE.Vector3(span*1.25,span,span*1.25));camera.lookAt(controls.target);controls.update();
    inspectField();setLabSnapshot({generated:true,kind:'fields',title:'Campo vetorial 3D',points:result.points,samples:arrows.samples||[],summary:fieldUI('result').textContent});status.textContent='Campo vetorial 3D · trajetória integrada por '+method.toUpperCase();
  }catch(e){fieldUI('result').textContent=e.message;}
}
fieldUI('generate').addEventListener('click',generateVectorField);
fieldUI('inspect').addEventListener('click',inspectField);
fieldUI('play').addEventListener('click',()=>{if(fieldProgress>=1)fieldProgress=0;fieldPlaying=!fieldPlaying;fieldUI('play').textContent=fieldPlaying?'⏸ Pausar':'▶ Simular';drawFieldFrame();});
fieldUI('reset').addEventListener('click',()=>{fieldPlaying=false;fieldProgress=0;fieldUI('play').textContent='▶ Simular';drawFieldFrame();});
fieldUI('progress').addEventListener('input',()=>{fieldPlaying=false;fieldUI('play').textContent='▶ Simular';fieldProgress=Number(fieldUI('progress').value);drawFieldFrame();});
fieldUI('clear').addEventListener('click',()=>{disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();restoreSurfaceLayers();fieldUI('result').textContent='';fieldUI('readout').textContent='Campo removido.';fieldUI('inspector').textContent='';document.querySelector('#reset-button').click();});
document.querySelectorAll('[data-field-preset]').forEach(button=>button.addEventListener('click',()=>{
  const presets={rotation:['-y','x','0',2,0,0,5,12,.02,true],source:['x','y','z',.5,.5,.5,5,4,.02,true],sink:['-x','-y','-z',3,2,1,5,6,.02,true],helix:['-y','x','0.4',2,0,0,5,10,.02,true],lorenz:['10*(y-x)','x*(28-z)-y','x*y-(8/3)*z',1,1,1,60,40,.005,false]};
  const [p,q,r,x,y,z,extent,time,h,arrows]=presets[button.dataset.fieldPreset];
  for(const [id,value]of Object.entries({p,q,r,x0:x,y0:y,z0:z,extent,time,step:h,ix:x,iy:y,iz:z}))fieldUI(id).value=value;
  fieldUI('arrows').checked=arrows;fieldUI('trajectory').checked=true;
}));

function compileParametric(text,variables) {
  const fn=compileExpression(text,variables);return(...p)=>{const value=fn(...p);if(!Number.isFinite(value))throw Error('Parametrização fora do domínio real.');if(Math.abs(value)>10000)throw Error('Coordenada acima do limite visual de 10000.');return value;};
}
function sampleParametricCurve(f,min,max,n) {
  const segments=[];let current=[],length=0,invalid=0;
  for(let i=0;i<=n;i++){
    const t=min+(max-min)*i/n;
    try{const p=f(t);if(current.length){const previous=current.at(-1).p;length+=Math.hypot(...p.map((value,j)=>value-previous[j]));}current.push({p,t});}
    catch{invalid++;if(current.length)segments.push(current);current=[];}
  }
  if(current.length)segments.push(current);
  return {segments,length,invalid};
}
function cross3(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function parametricSurfaceData(f,umin,umax,vmin,vmax,n) {
  const points=[],indices=[];let area=0,invalid=0;
  for(let i=0;i<=n;i++)for(let j=0;j<=n;j++){
    try{points.push(f(umin+(umax-umin)*i/n,vmin+(vmax-vmin)*j/n));}catch{points.push(null);invalid++;}
  }
  const triangle=(a,b,c)=>{if(!points[a]||!points[b]||!points[c])return;const ab=points[b].map((v,i)=>v-points[a][i]),ac=points[c].map((v,i)=>v-points[a][i]);const size=Math.hypot(...cross3(ab,ac))/2;if(size<1e-15)return;indices.push(a,b,c);area+=size;};
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const a=i*(n+1)+j,b=(i+1)*(n+1)+j;triangle(a,b,a+1);triangle(b,b+1,a+1);}
  return {points,indices,area,invalid};
}
function parametricCurveTangent(f,t,h=.0001) {const a=f(t+h),b=f(t-h);return a.map((v,i)=>(v-b[i])/(2*h));}
function parametricSurfaceDifferential(f,u,v,h=.0001) {
  const ua=f(u+h,v),ub=f(u-h,v),va=f(u,v+h),vb=f(u,v-h);
  const ru=ua.map((x,i)=>(x-ub[i])/(2*h)),rv=va.map((x,i)=>(x-vb[i])/(2*h));return {ru,rv,normal:cross3(ru,rv)};
}
const paramUI=id=>document.getElementById(`param-${id}`);
const paramGroup=new THREE.Group();sceneGroup.add(paramGroup);
const paramInspectorGroup=new THREE.Group();paramGroup.add(paramInspectorGroup);
let paramActive=null,paramSamples=[],paramMarker=null,paramPlaying=false,paramProgress=0;
function disposeParametric() {
  paramGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map?.dispose();m.dispose();});});paramGroup.clear();paramInspectorGroup.clear();paramGroup.add(paramInspectorGroup);paramActive=null;paramSamples=[];paramMarker=null;paramPlaying=false;
  paramUI('play').textContent='▶ Simular';['play','reset','progress'].forEach(id=>paramUI(id).disabled=true);
}
function paramNumber(id) {const raw=paramUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha todos os campos numéricos.');return Number(raw);}
function paramFunction() {const vars=paramUI('mode').value==='curve'?['t']:['u','v'],components=['x','y','z'].map(id=>compileParametric(paramUI(id).value,vars));return (...args)=>components.map(f=>f(...args));}
function showParamMode() {
  const curve=paramUI('mode').value==='curve';document.querySelectorAll('[data-param-mode]').forEach(el=>el.hidden=el.dataset.paramMode!==(curve?'curve':'surface'));
  paramUI('hint').textContent=curve?'Curva r(t) = (x(t), y(t), z(t)). Use o parâmetro t.':'Superfície r(u,v) = (x(u,v), y(u,v), z(u,v)). Use os parâmetros u e v.';
}
function inspectParametric() {
  try{
    if(!paramActive)throw Error('Gere a parametrização antes de inspecionar.');
    if(paramActive.mode!==paramUI('mode').value)throw Error('Gere novamente o gráfico para inspecionar o tipo de parametrização selecionado.');
    const fmt=n=>Math.abs(n)<1e-8?'0':Number(n.toPrecision(7)).toString();let point,vector,lines;
    if(paramActive.mode==='curve'){
      const t=paramNumber('it');if(t<paramActive.min||t>paramActive.max)throw Error('O parâmetro t deve estar dentro do intervalo desenhado.');point=paramActive.f(t);vector=parametricCurveTangent(paramActive.f,t);const norm=Math.hypot(...vector);lines=`t = ${fmt(t)}\nr(t) = (${point.map(fmt).join(', ')})\nr′(t) ≈ (${vector.map(fmt).join(', ')})\n||r′(t)|| ≈ ${fmt(norm)}\n${norm<1e-8?'Tangente não definida: velocidade aproximadamente nula.':'Tangente unitária ≈ ('+vector.map(v=>fmt(v/norm)).join(', ')+')'}`;
    }else{
      const u=paramNumber('iu'),v=paramNumber('iv');if(u<paramActive.umin||u>paramActive.umax||v<paramActive.vmin||v>paramActive.vmax)throw Error('u e v devem estar dentro dos intervalos desenhados.');
      point=paramActive.f(u,v);const d=parametricSurfaceDifferential(paramActive.f,u,v);vector=d.normal;const norm=Math.hypot(...vector);lines=`(u,v) = (${fmt(u)}, ${fmt(v)})\nr(u,v) = (${point.map(fmt).join(', ')})\nrᵤ ≈ (${d.ru.map(fmt).join(', ')})\nrᵥ ≈ (${d.rv.map(fmt).join(', ')})\nrᵤ × rᵥ ≈ (${vector.map(fmt).join(', ')})\n${norm<1e-8?'Parametrização singular: normal não definida neste ponto.':'Normal unitária ≈ ('+vector.map(x=>fmt(x/norm)).join(', ')+')'}`;
    }
    paramInspectorGroup.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});paramInspectorGroup.clear();const origin=fieldWorld(point),size=paramActive.scale;
    const marker=new THREE.Mesh(new THREE.SphereGeometry(size*.012,16,12),new THREE.MeshBasicMaterial({color:0x7c3aed}));marker.position.copy(origin);paramInspectorGroup.add(marker);
    if(Math.hypot(...vector)>1e-8)paramInspectorGroup.add(new THREE.ArrowHelper(fieldWorld(vector).normalize(),origin,size*.2,0x7c3aed,size*.04,size*.02));
    paramUI('inspector').textContent=lines+'\n\nValores da parametrização desenhada. Gere novamente após editar as expressões.';applyLayerVisibility();
  }catch(e){paramUI('inspector').textContent=e.message;}
}
function drawParamFrame() {
  if(!paramSamples.length||!paramMarker)return;const u=paramProgress*(paramSamples.length-1),i=Math.floor(u),a=paramSamples[i],b=paramSamples[Math.min(i+1,paramSamples.length-1)],mix=u-i;
  const p=a.p.map((v,n)=>v+(b.p[n]-v)*mix),t=a.t+(b.t-a.t)*mix;paramMarker.position.copy(fieldWorld(p));paramUI('progress').value=paramProgress;paramUI('readout').textContent=`t = ${t.toFixed(4)}\nx = ${p[0].toFixed(5)} · y = ${p[1].toFixed(5)} · z = ${p[2].toFixed(5)}`;
}
function updateParametricAnimation(delta) {if(!paramPlaying)return;paramProgress=Math.min(1,paramProgress+delta*animationSpeed()/12);drawParamFrame();if(paramProgress===1){paramPlaying=false;paramUI('play').textContent='▶ Simular';}}
function generateParametric() {
  try{
    const mode=paramUI('mode').value,n=paramNumber('samples'),f=paramFunction();if(!Number.isInteger(n)||n<8||n>(mode==='curve'?5000:120))throw Error(mode==='curve'?'Use de 8 a 5000 segmentos.':'Use de 8 a 120 divisões por parâmetro.');
    let data,settings;
    if(mode==='curve'){const min=paramNumber('tmin'),max=paramNumber('tmax');if(min>=max)throw Error('Use t mínimo < t máximo.');data=sampleParametricCurve(f,min,max,n);if(!data.segments.some(s=>s.length>1))throw Error('Não há um trecho válido de curva neste intervalo.');settings={mode,f,min,max};}
    else{const umin=paramNumber('umin'),umax=paramNumber('umax'),vmin=paramNumber('vmin'),vmax=paramNumber('vmax');if(umin>=umax||vmin>=vmax)throw Error('Use mínimo < máximo nos intervalos de u e v.');data=parametricSurfaceData(f,umin,umax,vmin,vmax,n);if(!data.indices.length)throw Error('Não há uma superfície regular válida neste domínio.');settings={mode,f,umin,umax,vmin,vmax};}
    const all=mode==='curve'?data.segments.flat().map(s=>s.p):data.points.filter(Boolean),minima=[Infinity,Infinity,Infinity],maxima=[-Infinity,-Infinity,-Infinity];
    for(const p of all)p.forEach((v,i)=>{minima[i]=Math.min(minima[i],v);maxima[i]=Math.max(maxima[i],v);});const scale=Math.max(1,...minima.map((v,i)=>maxima[i]-v));
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();disposePhase();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);paramActive={...settings,scale};
    surfaceGroup.visible=false;analysisGroup.visible=false;intersectionGroup.visible=false;criticalGroup.visible=false;gridGroup.visible=false;axesGroup.visible=false;axisLabelsGroup.visible=false;paramGroup.visible=true;
    const extent=Math.max(1,...minima.map(Math.abs),...maxima.map(Math.abs))*1.1;addFieldReference(extent,paramGroup);
    if(mode==='curve'){
      for(const segment of data.segments){if(segment.length>1)paramGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(segment.map(s=>fieldWorld(s.p))),new THREE.LineBasicMaterial({color:0x0072b2})));}
      paramUI('result').textContent=`Comprimento aproximado ≈ ${data.length.toPrecision(7)}\n${n} segmentos de amostragem.${data.invalid?' '+data.invalid+' amostras inválidas: trechos interrompidos, sem ligar as lacunas.':''}`;
      if(data.invalid===0){paramSamples=data.segments[0];paramMarker=new THREE.Mesh(new THREE.SphereGeometry(scale*.012,16,12),new THREE.MeshBasicMaterial({color:0xd55e00}));paramGroup.add(paramMarker);paramProgress=0;drawParamFrame();['play','reset','progress'].forEach(id=>paramUI(id).disabled=false);}else paramUI('readout').textContent='Animação desativada: a curva contém lacunas de domínio.';
    }else{
      const geometry=new THREE.BufferGeometry(),positions=[],colors=[],low=new THREE.Color(colorControls.graphLow.value),high=new THREE.Color(colorControls.graphHigh.value);
      for(const p of data.points){const v=p||[0,0,0];positions.push(v[0],v[2],v[1]);const ratio=(v[2]-minima[2])/Math.max(maxima[2]-minima[2],1e-10),color=document.querySelector('#color-toggle').checked?graphGradientColor(ratio):new THREE.Color(colorControls.graph.value);colors.push(color.r,color.g,color.b);}
      geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(data.indices);geometry.computeVertexNormals();
      paramGroup.add(new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.88})));
      if(paramUI('wire').checked)paramGroup.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:0x15232b,wireframe:true,transparent:true,opacity:.18,depthWrite:false})));
      paramUI('result').textContent=`Área aproximada ≈ ${data.area.toPrecision(7)}\n${data.indices.length/3} triângulos válidos.${data.invalid?' '+data.invalid+' amostras inválidas; os triângulos adjacentes foram omitidos.':''}\nA área conta multiplicidades se a parametrização cobrir a mesma região mais de uma vez.`;paramUI('readout').textContent='Use o inspetor para ver o vetor normal.';
    }
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}const center=fieldWorld(minima.map((v,i)=>(v+maxima[i])/2));controls.maxDistance=Math.max(40,scale*8);controls.target.copy(center);graphTarget.copy(center);camera.position.copy(center).add(new THREE.Vector3(scale*1.25,scale,scale*1.25));camera.lookAt(center);controls.update();setLabSnapshot(mode==='curve'?{generated:true,kind:'curve',title:'Curva paramétrica',segments:data.segments,summary:paramUI('result').textContent}:{generated:true,kind:'paramSurface',title:'Superfície paramétrica',points:data.points,n,...settings,summary:paramUI('result').textContent});status.textContent=mode==='curve'?'Curva paramétrica 3D desenhada':'Superfície paramétrica 3D desenhada';paramUI('inspector').textContent='Informe o parâmetro e clique em Inspecionar.';
  }catch(e){paramUI('result').textContent=e.message;}
}
paramUI('mode').addEventListener('change',()=>{paramUI('samples').value=paramUI('mode').value==='curve'?600:50;showParamMode();});
paramUI('generate').addEventListener('click',generateParametric);paramUI('inspect').addEventListener('click',inspectParametric);
paramUI('play').addEventListener('click',()=>{if(paramProgress>=1)paramProgress=0;paramPlaying=!paramPlaying;paramUI('play').textContent=paramPlaying?'⏸ Pausar':'▶ Simular';drawParamFrame();});
paramUI('reset').addEventListener('click',()=>{paramPlaying=false;paramProgress=0;paramUI('play').textContent='▶ Simular';drawParamFrame();});
paramUI('progress').addEventListener('input',()=>{paramPlaying=false;paramUI('play').textContent='▶ Simular';paramProgress=Number(paramUI('progress').value);drawParamFrame();});
paramUI('clear').addEventListener('click',()=>{disposeTaylor();disposeIntegral();disposeParametric();restoreSurfaceLayers();paramUI('result').textContent='';paramUI('inspector').textContent='';paramUI('readout').textContent='Parametrização removida.';document.querySelector('#reset-button').click();});
document.querySelectorAll('[data-param-preset]').forEach(button=>button.addEventListener('click',()=>{
  const presets={helix:['curve','2*cos(t)','2*sin(t)','t/3',0,6*Math.PI,600],circle:['curve','3*cos(t)','3*sin(t)','0',0,2*Math.PI,600],sphere:['surface','3*sin(u)*cos(v)','3*sin(u)*sin(v)','3*cos(u)',0,Math.PI,60],torus:['surface','(3+cos(u))*cos(v)','(3+cos(u))*sin(v)','sin(u)',0,2*Math.PI,60],saddle:['surface','u','v','(u^2-v^2)/4',-3,3,50]};
  const [mode,x,y,z,min,max,n]=presets[button.dataset.paramPreset];paramUI('mode').value=mode;for(const [id,value]of Object.entries({x,y,z,samples:n,tmin:min,tmax:max,umin:min,umax:max,vmin:mode==='surface'&&button.dataset.paramPreset==='saddle'?-3:0,vmax:mode==='surface'&&button.dataset.paramPreset==='saddle'?3:2*Math.PI,it:(min+max)/2,iu:(min+max)/2,iv:mode==='surface'&&button.dataset.paramPreset==='saddle'?0:Math.PI}))paramUI(id).value=value;showParamMode();
}));
showParamMode();

// Quadratura composta de Simpson; o refinamento indica sensibilidade à malha.
function simpsonIntegral(f,a,b,n) {
  if(!Number.isInteger(n)||n<2||n%2)throw Error('Simpson exige um número par de subdivisões.');
  if(![a,b].every(Number.isFinite))throw Error('Limites de integração não finitos.');if(a===b)return 0;
  const h=(b-a)/n;let sum=0;
  for(let i=0;i<=n;i++){const value=f(a+i*h);if(typeof value!=='number'||!Number.isFinite(value))throw Error('Integrando fora do domínio real ou valor não finito.');sum+=value*(i===0||i===n?1:i%2?4:2);}
  const result=sum*h/3;if(!Number.isFinite(result))throw Error('Integral excedeu o limite numérico.');return result;
}
function integrateDoubleRegion(f,a,b,lower,upper,type,n) {
  return simpsonIntegral(outer=>{const lo=lower(outer),hi=upper(outer);if(!Number.isFinite(lo)||!Number.isFinite(hi)||lo>hi)throw Error('Os limites internos devem ser reais e inferior ≤ superior em toda a região.');return simpsonIntegral(inner=>type==='II'?f(inner,outer):f(outer,inner),lo,hi,n);},a,b,n);
}
function integrateTripleBox(f,bounds,n) {
  const [[a,b],[c,d],[e,g]]=bounds;return simpsonIntegral(x=>simpsonIntegral(y=>simpsonIntegral(z=>f(x,y,z),e,g,n),c,d,n),a,b,n);
}
function integrateParametricLine(f,curve,a,b,n,kind) {
  const h=Math.max(1e-6,Math.abs(b-a)*1e-5);
  return simpsonIntegral(t=>{const p=curve(t),tangent=parametricCurveTangent(curve,t,h),value=f(...p);return kind==='scalar'?value*Math.hypot(...tangent):value.reduce((sum,v,i)=>sum+v*tangent[i],0);},a,b,n);
}
const intUI=id=>document.getElementById(`int-${id}`);
const integralGroup=new THREE.Group();sceneGroup.add(integralGroup);
function disposeIntegral() {integralGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map?.dispose();m.dispose();});});integralGroup.clear();}
function intNumber(id) {const raw=intUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha todos os campos numéricos.');return Number(raw);}
function showIntegralMode() {
  const mode=intUI('mode').value;document.querySelectorAll('[data-int-mode]').forEach(el=>el.hidden=el.dataset.intMode!==mode);
  const type=intUI('region').value,outer=type==='II'?'y':'x',inner=type==='II'?'x':'y';intUI('outer-label').textContent=`Intervalo externo de ${outer}`;intUI('lower-label').textContent=`${inner} inferior${type==='rectangle'?' (constante)':`, função de ${outer}`}`;intUI('upper-label').textContent=`${inner} superior${type==='rectangle'?' (constante)':`, função de ${outer}`}`;
  const lineKind=intUI('line-kind').value;document.querySelectorAll('[data-line-kind]').forEach(el=>el.hidden=el.dataset.lineKind!==lineKind);
}
function integralFieldFunction(ids) {const components=ids.map(id=>compileField3D(intUI(id).value));return(...p)=>components.map(f=>f(...p));}
function addIntegralMesh(points,indices,opacity=.75) {
  const geometry=new THREE.BufferGeometry(),positions=[],colors=[];
  for(const p of points){positions.push(p[0],p[2],p[1]);const color=new THREE.Color(p[2]>=0?0x55c8c6:0xec806c);colors.push(color.r,color.g,color.b);}
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();integralGroup.add(new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity,depthWrite:false})));
}
function doubleIntegralVisual(f,a,b,lower,upper,type) {
  const points=[],indices=[],n=20;
  for(let i=0;i<=n;i++)for(let j=0;j<=n;j++){
    const outer=a+(b-a)*i/n,lo=lower(outer),hi=upper(outer);if(lo>hi)throw Error('Limites internos invertidos na região.');const inner=lo+(hi-lo)*j/n,x=type==='II'?inner:outer,y=type==='II'?outer:inner;points.push([x,y,f(x,y)]);
  }
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){const p=i*(n+1)+j,q=(i+1)*(n+1)+j;indices.push(p,q,p+1,q,q+1,p+1);}
  addIntegralMesh(points,indices,.6);addIntegralMesh(points.map(p=>[p[0],p[1],0]),indices,.25);
  const grid=8;
  for(let i=0;i<grid;i++)for(let j=0;j<grid;j++){
    const outer=a+(b-a)*(i+.5)/grid,lo=lower(outer),hi=upper(outer),inner=lo+(hi-lo)*(j+.5)/grid,x=type==='II'?inner:outer,y=type==='II'?outer:inner,z=f(x,y),du=(b-a)/grid,dv=(hi-lo)/grid;
    if(Math.abs(z)<1e-10||dv<1e-10)continue;
    const geometry=new THREE.BoxGeometry((type==='II'?dv:du)*.85,Math.abs(z),(type==='II'?du:dv)*.85),box=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({color:z>=0?0x55c8c6:0xec806c,transparent:true,opacity:.18,depthWrite:false}));box.position.copy(fieldWorld([x,y,z/2]));integralGroup.add(box);
  }
  return [...points,...points.map(p=>[p[0],p[1],0])];
}
function tripleIntegralVisual(f,bounds) {
  const center=bounds.map(([a,b])=>(a+b)/2),sizes=bounds.map(([a,b])=>b-a),geometry=new THREE.BoxGeometry(sizes[0],sizes[2],sizes[1]),edges=new THREE.EdgesGeometry(geometry);geometry.dispose();const outline=new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0x0072b2}));outline.position.copy(fieldWorld(center));integralGroup.add(outline);
  let maxAbs=0;const samples=[],n=5;
  for(let i=0;i<n;i++)for(let j=0;j<n;j++)for(let k=0;k<n;k++){const p=[i,j,k].map((v,axis)=>bounds[axis][0]+sizes[axis]*(v+.5)/n),value=f(...p);maxAbs=Math.max(maxAbs,Math.abs(value));samples.push({p,value});}
  const positions=[],colors=[];
  for(const {p,value}of samples){positions.push(p[0],p[2],p[1]);const base=new THREE.Color(value<0?0xec806c:0x55c8c6);base.lerp(new THREE.Color(0x15232b),maxAbs?Math.abs(value)/maxAbs*.5:0);colors.push(base.r,base.g,base.b);}
  const buffer=new THREE.BufferGeometry();buffer.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));buffer.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));integralGroup.add(new THREE.Points(buffer,new THREE.PointsMaterial({vertexColors:true,size:Math.max(...sizes)*.035,sizeAttenuation:true})));
  const corners=[];for(let i=0;i<8;i++)corners.push(bounds.map(([a,b],axis)=>(i>>axis)&1?b:a));return corners;
}
function lineIntegralVisual(curve,f,a,b,kind) {
  const {segments,invalid}=sampleParametricCurve(curve,a,b,400);if(invalid)throw Error('A curva apresenta amostras fora do domínio; esta quadratura não trata integrais impróprias.');const points=segments[0].map(s=>s.p);integralGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(fieldWorld)),new THREE.LineBasicMaterial({color:0x0072b2})));
  const range=Math.max(1,...[0,1,2].map(axis=>Math.max(...points.map(p=>p[axis]))-Math.min(...points.map(p=>p[axis]))));
  if(kind==='vector')for(let i=0;i<points.length;i+=25){const value=f(...points[i]),norm=Math.hypot(...value);if(norm>1e-10)integralGroup.add(new THREE.ArrowHelper(fieldWorld(value).normalize(),fieldWorld(points[i]),range*.1,0x5aa888,range*.02,range*.01));}
  const t=(a+b)/2,p=curve(t),tangent=parametricCurveTangent(curve,t);if(Math.hypot(...tangent)>1e-10)integralGroup.add(new THREE.ArrowHelper(fieldWorld(tangent).normalize(),fieldWorld(p),range*.16,0xd55e00,range*.03,range*.015));return points;
}
function calculateIntegral() {
  try{
    const mode=intUI('mode').value,n=intNumber('n'),limit=mode==='triple'?24:mode==='double'?100:2000;
    if(!Number.isInteger(n)||n<4||n%2||n>limit)throw Error(`Use um número par de subdivisões entre 4 e ${limit}.`);
    let coarse,fine,visual,title,description;
    if(mode==='double'){
      const f=compileODE(intUI('f').value),a=intNumber('a'),b=intNumber('b'),type=intUI('region').value;if(a>=b)throw Error('Use limite externo inferior < superior.');
      const loText=intUI('lower').value,hiText=intUI('upper').value;
      if(type==='rectangle'&&[loText,hiText].some(text=>(normalizedFormula(text).match(/[a-z]+/g)||[]).some(name=>name==='x'||name==='y')))throw Error('Na região retangular, os limites internos devem ser constantes.');
      if(type!=='rectangle'&&[loText,hiText].some(text=>(normalizedFormula(text).match(/[a-z]+/g)||[]).includes(type==='II'?'x':'y')))throw Error(type==='II'?'Os limites internos de x devem depender apenas de y.':'Os limites internos de y devem depender apenas de x.');
      const lo=compileODE(loText),hi=compileODE(hiText),lower=o=>type==='II'?lo(0,o):lo(o,0),upper=o=>type==='II'?hi(0,o):hi(o,0);
      const check=(x,y)=>{const v=Number(f(x,y));if(!Number.isFinite(v))throw Error('Integrando fora do domínio real.');return v;};
      coarse=integrateDoubleRegion(check,a,b,lower,upper,type,n);fine=integrateDoubleRegion(check,a,b,lower,upper,type,2*n);visual=()=>doubleIntegralVisual(check,a,b,lower,upper,type);title='Integral dupla';description='Superfície e região no plano z=0. As duas cores da legenda distinguem f≥0 e f<0. As colunas ilustram o sinal, não são a quadratura usada.';
    }else if(mode==='triple'){
      const f=compileField3D(intUI('f3').value),bounds=[['xmin','xmax'],['ymin','ymax'],['zmin','zmax']].map(ids=>ids.map(intNumber));if(bounds.some(([a,b])=>a>=b))throw Error('Use mínimo < máximo em cada eixo.');
      coarse=integrateTripleBox(f,bounds,n);fine=integrateTripleBox(f,bounds,2*n);visual=()=>tripleIntegralVisual(f,bounds);title='Integral tripla';description='Caixa de integração e 125 amostras do integrando. As duas cores da legenda distinguem valores positivos e negativos. As amostras visuais não são a quadratura usada.';
    }else{
      const components=['cx','cy','cz'].map(id=>compileParametric(intUI(id).value,['t'])),curve=t=>components.map(f=>f(t)),a=intNumber('tmin'),b=intNumber('tmax'),kind=intUI('line-kind').value;
      if(a>=b)throw Error('Use t mínimo < t máximo. Para inverter a orientação, altere a parametrização.');
      const f=kind==='scalar'?compileField3D(intUI('line-f').value):integralFieldFunction(['p','q','r']);
      coarse=integrateParametricLine(f,curve,a,b,n,kind);fine=integrateParametricLine(f,curve,a,b,2*n,kind);visual=()=>lineIntegralVisual(curve,f,a,b,kind);title=kind==='scalar'?'Integral de linha escalar ∫C f ds':'Integral de linha vetorial ∫C F·dr';description='Curva e seta de orientação identificadas na legenda. '+(kind==='vector'?'As setas do campo têm comprimento normalizado.':'A orientação não altera a integral escalar em ds.');
    }
    // Stage the visualization; errors keep the previous mathematical scene intact.
    const oldChildren=[...integralGroup.children];let points;
    try{points=visual();if(points.some(p=>p.some(v=>!Number.isFinite(v)||Math.abs(v)>10000)))throw Error('A visualização exige coordenadas reais entre −10000 e 10000. Reduza o domínio ou a escala do integrando.');}catch(e){for(const child of [...integralGroup.children])if(!oldChildren.includes(child)){child.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});integralGroup.remove(child);}throw e;}
    for(const child of oldChildren){child.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map?.dispose();m.dispose();});});integralGroup.remove(child);}
    disposeParametric();disposeVectorField();disposePhase();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);
    surfaceGroup.visible=false;analysisGroup.visible=false;intersectionGroup.visible=false;criticalGroup.visible=false;gridGroup.visible=false;axesGroup.visible=false;axisLabelsGroup.visible=false;integralGroup.visible=true;
    const minima=[Infinity,Infinity,Infinity],maxima=[-Infinity,-Infinity,-Infinity];for(const p of points)p.forEach((v,i)=>{minima[i]=Math.min(minima[i],v);maxima[i]=Math.max(maxima[i],v);});const scale=Math.max(1,...minima.map((v,i)=>maxima[i]-v)),extent=Math.max(1,...minima.map(Math.abs),...maxima.map(Math.abs))*1.1;
    addFieldReference(extent,integralGroup);if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}const center=fieldWorld(minima.map((v,i)=>(v+maxima[i])/2));controls.maxDistance=Math.max(40,scale*8);controls.target.copy(center);graphTarget.copy(center);camera.position.copy(center).add(new THREE.Vector3(scale*1.25,scale,scale*1.25));camera.lookAt(center);controls.update();
    intUI('result').textContent=`${title}\n\nResultado com ${n} subdivisões ≈ ${coarse.toPrecision(10)}\nResultado com ${2*n} subdivisões ≈ ${fine.toPrecision(10)}\nDiferença entre resoluções = ${Math.abs(fine-coarse).toExponential(4)}\n\nSimpson composto. A diferença é um indicador de refinamento, não uma garantia de erro.\n\n${description}`;setLabSnapshot({generated:true,kind:'integral',title,n,coarse,fine,summary:intUI('result').textContent});status.textContent='Integral calculada e região desenhada';
  }catch(e){intUI('result').textContent=e.message;}
}
intUI('mode').addEventListener('change',()=>{intUI('n').value=20;showIntegralMode();});intUI('region').addEventListener('change',showIntegralMode);intUI('line-kind').addEventListener('change',showIntegralMode);intUI('calculate').addEventListener('click',calculateIntegral);
intUI('clear').addEventListener('click',()=>{disposeTaylor();disposeIntegral();restoreSurfaceLayers();intUI('result').textContent='';document.querySelector('#reset-button').click();});
document.querySelectorAll('[data-integral-preset]').forEach(button=>button.addEventListener('click',()=>{
  const preset=button.dataset.integralPreset;
  if(preset==='rectangle'){intUI('mode').value='double';intUI('region').value='rectangle';for(const [id,v]of Object.entries({f:'x^2+y^2',a:0,b:1,lower:'0',upper:'1',n:20}))intUI(id).value=v;}
  if(preset==='triangle'){intUI('mode').value='double';intUI('region').value='I';for(const [id,v]of Object.entries({f:'x+y',a:0,b:1,lower:'0',upper:'1-x',n:20}))intUI(id).value=v;}
  if(preset==='typeII'){intUI('mode').value='double';intUI('region').value='II';for(const [id,v]of Object.entries({f:'x+y',a:0,b:1,lower:'0',upper:'1-y',n:20}))intUI(id).value=v;}
  if(preset==='box'){intUI('mode').value='triple';for(const [id,v]of Object.entries({f3:'x+y+z',xmin:0,xmax:1,ymin:0,ymax:1,zmin:0,zmax:1,n:12}))intUI(id).value=v;}
  if(preset==='length'||preset==='circulation'){intUI('mode').value='line';intUI('line-kind').value=preset==='length'?'scalar':'vector';for(const [id,v]of Object.entries({cx:'cos(t)',cy:'sin(t)',cz:'0',tmin:0,tmax:2*Math.PI,'line-f':'1',p:'-y',q:'x',r:'0',n:100}))intUI(id).value=v;}
  showIntegralMode();
}));showIntegralMode();

// Séries truncadas: o coeficiente k é f^(k)(centro)/k!, sem diferenças finitas de ordem alta.
function parseTaylorExpression(text) {
  const expression=normalizedFormula(text).replaceAll('**','^'),tokens=[];let position=0;
  while(position<expression.length){const rest=expression.slice(position),number=rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/),name=rest.match(/^[a-z]+/);
    if(number){tokens.push({type:'number',value:Number(number[0])});position+=number[0].length;}
    else if(name){tokens.push({type:'name',value:name[0]});position+=name[0].length;}
    else if('+-*/^()'.includes(rest[0])){tokens.push({type:rest[0]});position++;}else throw Error('Use x, constantes e funções matemáticas; multiplicação requer *.');
  }
  let index=0;const peek=()=>tokens[index]?.type,eat=type=>{if(peek()!==type)throw Error('Expressão incompleta ou parênteses inválidos.');return tokens[index++];};
  function primary(){if(peek()==='number')return {kind:'constant',value:eat('number').value};if(peek()==='('){eat('(');const node=sum();eat(')');return node;}
    if(peek()==='name'){const name=eat('name').value;if(name==='x')return{kind:'variable'};if(name==='pi'||name==='e')return{kind:'constant',value:name==='pi'?Math.PI:Math.E};const valid=['sin','cos','tan','exp','log','ln','sqrt','asin','acos','atan','sinh','cosh','tanh','abs'];if(!valid.includes(name))throw Error(`Taylor não suporta: ${name}`);eat('(');const arg=sum();eat(')');return{kind:'function',name,arg};}throw Error('Esperava um número, x ou uma função.');}
  function power(){let node=primary();if(peek()==='^'){eat('^');node={kind:'binary',op:'^',left:node,right:unary()};}return node;}
  function unary(){if(peek()==='+'||peek()==='-'){const op=tokens[index++].type;return{kind:'unary',op,arg:unary()};}return power();}
  function product(){let node=unary();while(peek()==='*'||peek()==='/'){const op=tokens[index++].type;node={kind:'binary',op,left:node,right:unary()};}return node;}
  function sum(){let node=product();while(peek()==='+'||peek()==='-'){const op=tokens[index++].type;node={kind:'binary',op,left:node,right:product()};}return node;}
  if(!tokens.length)throw Error('Informe uma função de x.');const root=sum();if(index!==tokens.length)throw Error('Use * para multiplicar; verifique o final da expressão.');return root;
}
function evaluateTaylorJet(root,center,n) {
  const constant=value=>{const a=Array(n+1).fill(0);a[0]=value;return a;},scale=(a,s)=>a.map(v=>v*s),add=(a,b,s=1)=>a.map((v,i)=>v+s*b[i]);
  const mul=(a,b)=>a.map((v,k)=>{let sum=0;for(let j=0;j<=k;j++)sum+=a[j]*b[k-j];return sum;});
  function inverse(a){if(a[0]===0)throw Error('O centro é um polo ou ponto de divisão por zero.');const b=constant(1/a[0]);for(let k=1;k<=n;k++){let sum=0;for(let j=1;j<=k;j++)sum+=a[j]*b[k-j];b[k]=-sum/a[0];}return b;}
  const derivative=a=>a.map((v,i)=>i<n?(i+1)*a[i+1]:0),integrate=(a,initial)=>a.map((v,i)=>i?a[i-1]/i:initial);
  function exp(a){const b=constant(Math.exp(a[0]));for(let k=1;k<=n;k++){let sum=0;for(let j=1;j<=k;j++)sum+=j*a[j]*b[k-j];b[k]=sum/k;}return b;}
  function log(a){if(a[0]<=0)throw Error('log/ln exige um centro com argumento positivo.');return integrate(mul(derivative(a),inverse(a)),Math.log(a[0]));}
  function sincos(a){const s=constant(Math.sin(a[0])),c=constant(Math.cos(a[0]));for(let k=1;k<=n;k++){let ss=0,cc=0;for(let j=1;j<=k;j++){ss+=j*a[j]*c[k-j];cc-=j*a[j]*s[k-j];}s[k]=ss/k;c[k]=cc/k;}return{s,c};}
  function power(a,b){if(b.slice(1).every(v=>v===0)&&Number.isInteger(b[0])&&Math.abs(b[0])<=1000){let exponent=Math.abs(b[0]),base=a,result=constant(1);while(exponent){if(exponent%2)result=mul(result,base);exponent=Math.floor(exponent/2);if(exponent)base=mul(base,base);}return b[0]<0?inverse(result):result;}return exp(mul(b,log(a)));}
  function fn(name,a){if(name==='exp')return exp(a);if(name==='log'||name==='ln')return log(a);if(name==='sqrt')return power(a,constant(.5));
    if(['sin','cos','tan'].includes(name)){const {s,c}=sincos(a);if(name==='tan'&&Math.abs(c[0])<1e-12)throw Error('O centro está em um polo de tan ou muito próximo dele.');return name==='sin'?s:name==='cos'?c:mul(s,inverse(c));}
    if(['sinh','cosh','tanh'].includes(name)){const p=exp(a),m=exp(scale(a,-1)),s=scale(add(p,m,-1),.5),c=scale(add(p,m),.5);return name==='sinh'?s:name==='cosh'?c:mul(s,inverse(c));}
    if(name==='abs'){if(a[0]===0)throw Error('abs no argumento zero não é suportado para expansão de Taylor.');return scale(a,Math.sign(a[0]));}
    if(name==='atan')return integrate(mul(derivative(a),inverse(add(constant(1),mul(a,a)))),Math.atan(a[0]));
    if(name==='asin'||name==='acos'){if(Math.abs(a[0])>=1)throw Error('asin/acos exige argumento estritamente entre −1 e 1 no centro.');const denominator=power(add(constant(1),mul(a,a),-1),constant(-.5));return integrate(scale(mul(derivative(a),denominator),name==='acos'?-1:1),name==='acos'?Math.acos(a[0]):Math.asin(a[0]));}
    throw Error('Função não suportada.');
  }
  function visit(node){if(node.kind==='constant')return constant(node.value);if(node.kind==='variable'){const a=constant(center);if(n)a[1]=1;return a;}if(node.kind==='unary')return scale(visit(node.arg),node.op==='-'?-1:1);if(node.kind==='function')return fn(node.name,visit(node.arg));const a=visit(node.left),b=visit(node.right);return node.op==='+'?add(a,b):node.op==='-'?add(a,b,-1):node.op==='*'?mul(a,b):node.op==='/'?mul(a,inverse(b)):power(a,b);}
  const coefficients=visit(root);if(!coefficients.every(Number.isFinite))throw Error('A expansão não tem coeficientes reais finitos nesse centro.');return coefficients;
}
function evaluateTaylorPolynomial(coefficients,center,x) {let value=0;for(let k=coefficients.length-1;k>=0;k--)value=value*(x-center)+coefficients[k];return value;}
const taylorUI=id=>document.getElementById(`taylor-${id}`),taylorGroup=new THREE.Group();sceneGroup.add(taylorGroup);
function disposeTaylor(){taylorGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{m.map?.dispose();m.dispose();});});taylorGroup.clear();}
function taylorNumber(id){const raw=taylorUI(id).value;if(!raw.trim()||!Number.isFinite(Number(raw)))throw Error('Preencha todos os campos numéricos.');return Number(raw);}
function formatTaylorPolynomial(coefficients,center){const term=center===0?'x':`(x − (${Number(center.toPrecision(6))}))`,parts=[];for(let k=0;k<coefficients.length;k++){const c=coefficients[k];if(c===0)continue;const magnitude=Number(Math.abs(c).toPrecision(7));parts.push(`${parts.length?(c<0?' − ':' + '):(c<0?'−':'')}${magnitude}${k?'·'+term+(k>1?'^'+k:''):''}`);}return parts.join('')||'0';}
function plotTaylor(){
  try{
    const center=taylorNumber('center'),min=taylorNumber('min'),max=taylorNumber('max'),order=taylorNumber('order');if(!Number.isInteger(order)||order<1||order>10||min>=max||center<min||center>max)throw Error('Use ordem de 1 a 10, mínimo < máximo e centro dentro do intervalo.');
    const root=parseTaylorExpression(taylorUI('formula').value),coefficients=evaluateTaylorJet(root,center,order),original=x=>evaluateTaylorJet(root,x,0)[0];
    const originalSegments=[],polynomialSegments=[],points=[];let currentOriginal=[],currentPolynomial=[],maxError=0,errorPoints=0,omitted=0;
    for(let i=0;i<=800;i++){const x=min+(max-min)*i/800,p=evaluateTaylorPolynomial(coefficients,center,x);let value;
      try{value=original(x);}catch{value=NaN;}
      if(Number.isFinite(value)&&Number.isFinite(p)){maxError=Math.max(maxError,Math.abs(value-p));errorPoints++;}
      if(Number.isFinite(value)&&Math.abs(value)<=10000){const q=[x,value,0];currentOriginal.push(q);points.push(q);}else{if(currentOriginal.length)originalSegments.push(currentOriginal);currentOriginal=[];omitted++;}
      if(Number.isFinite(p)&&Math.abs(p)<=10000){const q=[x,p,0];currentPolynomial.push(q);points.push(q);}else{if(currentPolynomial.length)polynomialSegments.push(currentPolynomial);currentPolynomial=[];omitted++;}
    }
    if(currentOriginal.length)originalSegments.push(currentOriginal);if(currentPolynomial.length)polynomialSegments.push(currentPolynomial);if(points.length<2)throw Error('Não há curvas visíveis neste intervalo.');
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();disposePhase();disposeODE();['play','reset','progress'].forEach(id=>odeUI(id).disabled=true);
    surfaceGroup.visible=false;analysisGroup.visible=false;intersectionGroup.visible=false;criticalGroup.visible=false;gridGroup.visible=false;axesGroup.visible=false;axisLabelsGroup.visible=false;
    for(const [segments,color]of [[originalSegments,0x0072b2],[polynomialSegments,0xd55e00]])for(const segment of segments)if(segment.length>1)taylorGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(segment.map(fieldWorld)),new THREE.LineBasicMaterial({color})));
    const z=coefficients[0],marker=new THREE.Mesh(new THREE.SphereGeometry(Math.max(1,max-min)*.012,16,12),new THREE.MeshBasicMaterial({color:0x7c3aed}));marker.position.copy(fieldWorld([center,z,0]));taylorGroup.add(marker);
    const minima=[min,Infinity,0],maxima=[max,-Infinity,0];for(const p of points){minima[1]=Math.min(minima[1],p[1]);maxima[1]=Math.max(maxima[1],p[1]);}const span=Math.max(1,max-min,maxima[1]-minima[1]),target=fieldWorld([(min+max)/2,(minima[1]+maxima[1])/2,0]);
    addFieldReference(Math.max(1,Math.abs(min),Math.abs(max),Math.abs(minima[1]),Math.abs(maxima[1]))*1.05,taylorGroup);
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}controls.maxDistance=Math.max(40,span*8);controls.target.copy(target);graphTarget.copy(target);camera.position.copy(target).add(new THREE.Vector3(0,span*1.7,span*.05));camera.lookAt(target);controls.update();
    taylorUI('result').textContent=`T${order}(x) ≈ ${formatTaylorPolynomial(coefficients,center)}\n\nCentro = ${center}\nErro absoluto máximo nos ${errorPoints} pontos comparáveis ≈ ${maxError.toExponential(5)}${omitted?'\n'+omitted+' amostras de curvas omitidas por domínio ou limite visual ±10000.':''}\n\nO erro é amostrado no intervalo escolhido; não é uma cota garantida. A expansão é local e pode falhar longe do centro.`;
    const table=taylorUI('coefficients');table.replaceChildren();let factorial=1;for(let k=0;k<coefficients.length;k++){if(k)factorial*=k;const row=document.createElement('tr');for(const value of [k,Number(coefficients[k].toPrecision(9)),Number((coefficients[k]*factorial).toPrecision(9))]){const cell=document.createElement('td');cell.textContent=value;row.appendChild(cell);}table.appendChild(row);}setLabSnapshot({generated:true,kind:'taylor',title:'Taylor: '+taylorUI('formula').value,coefficients,center,min,max,original,summary:taylorUI('result').textContent});status.textContent='Taylor: função e aproximação identificadas na legenda';
  }catch(e){taylorUI('result').textContent=e.message;}
}
taylorUI('plot').addEventListener('click',plotTaylor);
taylorUI('order').addEventListener('input',()=>{taylorUI('order-value').textContent=taylorUI('order').value;plotTaylor();});
taylorUI('clear').addEventListener('click',()=>{disposeTaylor();restoreSurfaceLayers();taylorUI('result').textContent='';taylorUI('coefficients').replaceChildren();document.querySelector('#reset-button').click();});
document.querySelectorAll('[data-taylor-preset]').forEach(button=>button.addEventListener('click',()=>{const examples={sin:['sin(x)',0,-4,4],exp:['exp(x)',0,-2,2],log:['ln(x)',1,.2,2],geometric:['1/(1-x)',0,-.8,.8]};const [formula,center,min,max]=examples[button.dataset.taylorPreset];for(const[id,value]of Object.entries({formula,center,min,max}))taylorUI(id).value=value;}));
let parameterFrame=0;
for(const name of ['a','b','c'])document.getElementById(`parameter-${name}`).addEventListener('input',event=>{
  document.getElementById(`parameter-${name}-value`).textContent=Number(event.target.value).toFixed(1);if(parameterFrame)cancelAnimationFrame(parameterFrame);parameterFrame=requestAnimationFrame(()=>{parameterFrame=0;if(labSnapshot.kind==='surface')renderPlot();});
});

// Interpretador restrito: operadores, funções matemáticas e ramos avaliados sob demanda.
function compileExpression(text,variables,constants={}) {
  const source=normalizedFormula(text).replaceAll('**','^').replaceAll('−','-'),tokens=[];let position=0;
  while(position<source.length){const rest=source.slice(position),number=rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/),name=rest.match(/^[a-z]+/),op=rest.match(/^(<=|>=|==|!=|&&|\|\||[+*/^()?:,<>!\-])/);
    if(number){tokens.push({type:'number',value:Number(number[0])});position+=number[0].length;}else if(name){tokens.push({type:'name',value:name[0]});position+=name[0].length;}else if(op){tokens.push({type:op[0]});position+=op[0].length;}else throw Error('Caractere inválido na expressão. Use operadores e funções matemáticas.');
    if(tokens.length>1000)throw Error('Expressão muito longa.');
  }
  let index=0;const peek=()=>tokens[index]?.type,eat=t=>{if(peek()!==t)throw Error(`Esperava ${t}; verifique a expressão.`);return tokens[index++];};
  const mathFunctions=new Set(['sin','cos','tan','sqrt','abs','exp','log','ln','asin','acos','atan','atan2','sinh','cosh','tanh','floor','ceil','sign','min','max','pow']);
  function primary(){if(peek()==='number')return {kind:'number',value:eat('number').value};if(peek()==='('){eat('(');const node=conditional();eat(')');return node;}
    if(peek()==='name'){const name=eat('name').value;if(peek()!=='('){if(name==='pi'||name==='e')return {kind:'number',value:name==='pi'?Math.PI:Math.E};if(Object.hasOwn(constants,name))return {kind:'number',value:constants[name]};if(variables.includes(name))return {kind:'variable',index:variables.indexOf(name)};throw Error(`Nome não reconhecido: ${name}`);}
      if(!mathFunctions.has(name)&&!['piecewise','if'].includes(name))throw Error(`Função não reconhecida: ${name}`);eat('(');const args=[];if(peek()!==')'){args.push(conditional());while(peek()===','){eat(',');args.push(conditional());}}eat(')');
      if(['piecewise','if'].includes(name)){if(args.length!==3)throw Error('piecewise exige condição, valor verdadeiro e valor falso.');return {kind:'conditional',condition:args[0],yes:args[1],no:args[2]};}
      const arity=['atan2','pow'].includes(name)?2:['min','max'].includes(name)?null:1;if(arity===null?args.length<2:args.length!==arity)throw Error(`Quantidade inválida de argumentos em ${name}.`);return {kind:'function',name,fn:name==='ln'?Math.log:Math[name],args};
    }throw Error('Esperava um número, variável ou função.');}
  function power(){let node=primary();if(peek()==='^'){eat('^');node={kind:'binary',op:'^',left:node,right:unary()};}return node;}
  function unary(){if(['+','-','!'].includes(peek())){const op=tokens[index++].type;return {kind:'unary',op,arg:unary()};}return power();}
  function level(next,ops){let node=next();while(ops.includes(peek())){const op=tokens[index++].type;node={kind:'binary',op,left:node,right:next()};}return node;}
  const product=()=>level(unary,['*','/']),sum=()=>level(product,['+','-']),comparison=()=>level(sum,['<','>','<=','>=']),equality=()=>level(comparison,['==','!=']),and=()=>level(equality,['&&']),or=()=>level(and,['||']);
  function conditional(){const node=or();if(peek()!=='?')return node;eat('?');const yes=conditional();eat(':');return {kind:'conditional',condition:node,yes,no:conditional()};}
  if(!tokens.length)throw Error('Informe uma expressão.');const root=conditional();if(index!==tokens.length)throw Error('Use * para multiplicar e verifique o final da expressão.');
  function evaluate(node,args){if(node.kind==='number')return node.value;if(node.kind==='variable')return args[node.index];if(node.kind==='function')return node.fn(...node.args.map(arg=>evaluate(arg,args)));if(node.kind==='conditional')return evaluate(node.condition,args)?evaluate(node.yes,args):evaluate(node.no,args);if(node.kind==='unary'){const value=evaluate(node.arg,args);return node.op==='-'?-value:node.op==='!'?!value:+value;}
    const a=evaluate(node.left,args);if(node.op==='&&')return a&&evaluate(node.right,args);if(node.op==='||')return a||evaluate(node.right,args);const b=evaluate(node.right,args);switch(node.op){case '+':return a+b;case '-':return a-b;case '*':return a*b;case '/':return a/b;case '^':return a**b;case '<':return a<b;case '>':return a>b;case '<=':return a<=b;case '>=':return a>=b;case '==':return a===b;case '!=':return a!==b;}throw Error('Operador inválido.');}
  const compiled=(...args)=>Number(evaluate(root,args));compiled.ast=root;compiled.variables=variables;return compiled;
}

let sceneHome=null;
let labSnapshot={kind:'empty',title:'Nenhum gráfico gerado',summary:'Escolha uma ferramenta para começar.'};
function setLabSnapshot(data){labSnapshot=data;if(data.kind!=='surface'&&typeof hidePointInspector==='function')hidePointInspector();sceneHome={position:camera.position.clone(),target:controls.target.clone()};followLastPoint=null;if(data.kind!=='bifurcation')disposeBifurcation();prepareEvolutionChart();refreshLabInspector();applyLayerVisibility();refreshChartButtons();}
let evolutionChart=null,evolutionElapsed=0;
function prepareEvolutionChart(){
  for(const id of ['phase-time-chart','field-time-chart'])document.getElementById(id).hidden=true;
  evolutionChart=null;const s=labSnapshot,button=document.getElementById('lab-export-time');button.disabled=true;
  if(!['phase','fields'].includes(s.kind)||!s.points?.length){button.disabled=s.kind!=='ode';return;}
  const points=s.points.map(p=>({t:p.t,values:s.kind==='phase'?[p.x,p.y]:p.p})),canvas=document.getElementById(s.kind==='phase'?'phase-time-chart':'field-time-chart'),base=document.createElement('canvas');base.width=720;base.height=420;canvas.hidden=false;
  const ctx=base.getContext('2d'),colors=['#0072b2','#d55e00','#009e73','#8e44ad','#a6761d','#cc79a7','#444444'],coordinate=s.kind==='phase'?phaseUI('chart-coordinate').value:'state';
  const series=coordinate==='state'?points[0].values.map((_,k)=>({color:colors[k],label:['x(t)','y(t)','z(t)'][k],points:points.map(p=>({t:p.t,v:p.values[k]}))})):(s.tracks||[{points:s.points}]).map((r,i)=>({color:colors[i],label:`${i+1}: ${coordinate}(t)`,points:r.points.map(p=>({t:p.t,v:p[coordinate]}))}));
  let lo=Infinity,hi=-Infinity,tmin=Infinity,tmax=-Infinity;for(const item of series)for(const p of item.points){tmin=Math.min(tmin,p.t);tmax=Math.max(tmax,p.t);lo=Math.min(lo,p.v);hi=Math.max(hi,p.v);}
  const pad=Math.max((hi-lo)*.08,.1);lo-=pad;hi+=pad;if(tmin===tmax)tmax=tmin+1;
  const px=t=>72+(t-tmin)/(tmax-tmin)*618,py=v=>350-(v-lo)/(hi-lo)*250;
  ctx.fillStyle=semanticColor('#ffffff');ctx.fillRect(0,0,720,420);ctx.font=SpatialTypography.canvas(15);
  for(let i=0;i<=4;i++){const t=tmin+(tmax-tmin)*i/4,v=lo+(hi-lo)*i/4;ctx.strokeStyle=semanticColor('#e0e6e5');ctx.beginPath();ctx.moveTo(72,py(v));ctx.lineTo(690,py(v));ctx.stroke();ctx.fillStyle=semanticColor('#263b38');ctx.fillText(v.toPrecision(3),3,py(v)+5);ctx.fillText(t.toPrecision(3),px(t)-18,377);}
  series.forEach((item,k)=>{ctx.strokeStyle=semanticColor(item.color);ctx.lineWidth=2;ctx.beginPath();item.points.forEach((p,i)=>i?ctx.lineTo(px(p.t),py(p.v)):ctx.moveTo(px(p.t),py(p.v)));ctx.stroke();ctx.fillStyle=semanticColor(item.color);ctx.fillText(item.label,80+(k%3)*190,27+Math.floor(k/3)*23);});
  ctx.fillStyle=semanticColor('#263b38');ctx.fillText('tempo t · coordenadas na mesma escala',150,408);
  evolutionChart={kind:s.kind,canvas,base,points,px,py,colors,series,coordinate};button.disabled=false;drawEvolutionCursor();
}
function drawEvolutionCursor(){
  const chart=evolutionChart;if(!chart)return;const progress=chart.kind==='phase'?phaseProgress:fieldProgress,{a,b,mix,time:t}=trackFrame(chart.points,progress),ctx=chart.canvas.getContext('2d');
  ctx.drawImage(chart.base,0,0);ctx.strokeStyle=semanticColor('#263b38');ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(chart.px(t),60);ctx.lineTo(chart.px(t),350);ctx.stroke();ctx.setLineDash([]);
  chart.series.forEach(item=>{if(t<Math.min(item.points[0].t,item.points.at(-1).t)||t>Math.max(item.points[0].t,item.points.at(-1).t))return;const frame=trackFrame(item.points,(t-item.points[0].t)/(item.points.at(-1).t-item.points[0].t||1));ctx.fillStyle=semanticColor(item.color);ctx.beginPath();ctx.arc(chart.px(t),chart.py(frame.a.v+(frame.b.v-frame.a.v)*frame.mix),5,0,2*Math.PI);ctx.fill();});ctx.fillStyle=semanticColor('#263b38');ctx.font=SpatialTypography.canvas(15);ctx.fillText('t = '+t.toPrecision(5),500,28);
}
document.getElementById('lab-export-time').addEventListener('click',()=>{
  const canvas=labSnapshot.kind==='ode'?odeUI('time-chart'):evolutionChart?.canvas;if(!canvas||canvas.hidden)return;drawEvolutionCursor();canvas.toBlob(blob=>{if(blob){downloadLabFile(blob,'spatial-math-3d-tempo.png');document.getElementById('lab-export-status').textContent='Gráfico temporal exportado em PNG.';}},'image/png');
});
function refreshLabInspector(){
  const names={surface:'Superfícies',ode:'EDO de primeira ordem',phase:'Sistema 2D',fields:'Campo 3D',curve:'Curva paramétrica',paramSurface:'Superfície paramétrica',integral:'Integral numérica',taylor:'Taylor'};
  const box=document.getElementById('lab-inspector-summary');box.textContent=`GRÁFICO ATUAL\n${labSnapshot.title||names[labSnapshot.kind]}\n\n${labSnapshot.summary||'Use uma das abas para gerar um gráfico.'}\n\nCâmera (x,y,z) = (${camera.position.x.toFixed(3)}, ${camera.position.z.toFixed(3)}, ${camera.position.y.toFixed(3)})\n\n${selectedPoint&&surfaceGroup.visible?'Ponto selecionado = ('+[selectedPoint.x,selectedPoint.y,selectedPoint.world.y].map(v=>v.toFixed(5)).join(', ')+')':'Nenhum ponto de superfície selecionado.'}`;
  const point=document.getElementById('lab-inspector-point');point.textContent=selectedPoint&&surfaceGroup.visible?calcUI('readout').textContent:'';
}
function csvCell(value){const text=String(value??'');return '"'+text.replaceAll('"','""')+'"';}
function downloadLabFile(blob,name){const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
function exportLabPNG(){try{renderer.render(scene,camera);const canvas=document.createElement('canvas');canvas.width=renderer.domElement.width;canvas.height=renderer.domElement.height;const ctx=canvas.getContext('2d');ctx.fillStyle=sceneBackgroundColor();ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(renderer.domElement,0,0);canvas.toBlob(blob=>{if(!blob){document.getElementById('lab-export-status').textContent='Não foi possível gerar a imagem.';return;}downloadLabFile(blob,'spatial-math-3d-grafico.png');document.getElementById('lab-export-status').textContent='PNG exportado com a câmera atual, sem o menu.';},'image/png');}catch(e){document.getElementById('lab-export-status').textContent=e.message;}}
function labCSVData(){const s=labSnapshot;let headers,rows=[];
  if(s.kind==='surface'){
    headers=['grafico','x','y','z_real','z_exibido'];sceneGroup.updateMatrixWorld(true);const meshes=surfaceGroup.children.filter(o=>o.isMesh&&!o.material?.wireframe);
    meshes.forEach((mesh,index)=>{const positions=mesh.geometry.attributes.position,used=mesh.geometry.index?new Set(mesh.geometry.index.array):new Set(Array.from({length:positions.count},(_,i)=>i));for(const i of used){const point=new THREE.Vector3().fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);const z=mesh.userData.formula?mesh.userData.formula(point.x,point.z):point.y;if(Number.isFinite(z))rows.push([index+1,point.x,point.z,z,point.y]);}});
  }else if(s.kind==='ode'){headers=s.second?['metodo','t','y','v']:['metodo','x','y','z'];for(const curve of s.curves)for(const p of curve.points)rows.push([curve.method,p.x,p.y,s.second?p.v:0]);}
  else if(s.kind==='phase'){headers=['trajetoria','t','x','y','z'];(s.tracks||[{points:s.points}]).forEach((r,i)=>r.points.forEach(p=>rows.push([i+1,p.t,p.x,p.y,0])));}
  else if(s.kind==='fields'){if(s.points.length){headers=['t','x','y','z'];rows=s.points.map(p=>[p.t,...p.p]);}else{headers=['x','y','z','P','Q','R'];rows=s.samples.map(p=>[...p.p,...p.v]);}}
  else if(s.kind==='curve'){headers=['trecho','t','x','y','z'];s.segments.forEach((segment,i)=>segment.forEach(p=>rows.push([i+1,p.t,...p.p])));}
  else if(s.kind==='paramSurface'){headers=['u','v','x','y','z'];s.points.forEach((p,index)=>{if(p)rows.push([s.umin+(s.umax-s.umin)*Math.floor(index/(s.n+1))/s.n,s.vmin+(s.vmax-s.vmin)*(index%(s.n+1))/s.n,...p]);});}
  else if(s.kind==='bifurcation'){headers=['mu','equilibrio_x','derivada_fx','estabilidade'];rows=s.rows.map(r=>[r.mu,r.x,r.slope,r.stability]);}
  else if(s.kind==='integral'){headers=['subdivisoes_por_variavel','resultado'];rows=[[s.n,s.coarse],[2*s.n,s.fine]];}
  else if(s.kind==='taylor'){headers=['x','f','Taylor','erro_absoluto'];for(let i=0;i<=800;i++){const x=s.min+(s.max-s.min)*i/800,t=evaluateTaylorPolynomial(s.coefficients,s.center,x);let value;try{value=s.original(x);}catch{value=NaN;}rows.push([x,Number.isFinite(value)?value:'',Number.isFinite(t)?t:'',Number.isFinite(value)&&Number.isFinite(t)?Math.abs(value-t):'']);}}
  if(!rows.length)throw Error('Não há dados amostrados para exportar. Gere um gráfico ou habilite vetores/ trajetória.');
  if(rows.length>100000)throw Error('A exportação supera 100.000 linhas. Reduza a resolução ou a quantidade de gráficos.');return {headers,rows};
}
function exportLabCSV(){try{const {headers,rows}=labCSVData(),text='\uFEFF'+[headers,...rows].map(row=>row.map(csvCell).join(';')).join('\r\n');downloadLabFile(new Blob([text],{type:'text/csv;charset=utf-8'}),'spatial-math-3d-dados.csv');document.getElementById('lab-export-status').textContent=`CSV exportado: ${rows.length} linhas. Decimais com ponto; separador ponto e vírgula.`;}catch(e){document.getElementById('lab-export-status').textContent=e.message;}}
document.getElementById('lab-refresh-inspector').addEventListener('click',refreshLabInspector);
document.getElementById('lab-export-png').addEventListener('click',exportLabPNG);
document.getElementById('lab-export-csv').addEventListener('click',exportLabCSV);
document.querySelector('[data-view="inspector"]').addEventListener('click',refreshLabInspector);

function showAdaptiveSettings(){for(const prefix of ['ode','phase','field'])document.getElementById(prefix+'-adaptive').hidden=document.getElementById(prefix+'-method').value!=='rk45';}
for(const prefix of ['ode','phase','field'])document.getElementById(prefix+'-method').addEventListener('change',showAdaptiveSettings);
// Layer controls retain module visibility; only their drawable children are filtered.
function applyLayerVisibility(){
  const enabled=name=>document.getElementById('layer-'+name).checked;
  const visit=(object,fallback)=>{const type=object.userData.layer||fallback;if(object.userData.layer){object.visible=enabled(type);return;}if(object.isMesh||object.isLine||object.isPoints||object.isSprite)object.visible=enabled(type);for(const child of object.children)visit(child,type);};
  for(const [group,type]of [[surfaceGroup,'surfaces'],[gridGroup,'grid'],[axesGroup,'axes'],[axisLabelsGroup,'axes'],[intersectionGroup,'contours'],[analysisGroup,'analysis'],[criticalGroup,'markers'],[bifGroup,'markers']])for(const child of group.children)visit(child,type);
  for(const group of [odeGroup,phaseGroup,vectorGroup,paramGroup,integralGroup,taylorGroup])for(const child of group.children){const fallback=child.isMesh?(group===paramGroup&&paramActive?.mode==='surface'||group===integralGroup?'surfaces':'markers'):child.isLineSegments?(group===odeGroup||group===phaseGroup||group===vectorGroup?'vectors':'paths'):'paths';visit(child,fallback);}
  for(const child of paramInspectorGroup.children)visit(child,'analysis');
  adaptSemanticElements();
}
for(const input of document.querySelectorAll('[id^="layer-"]'))input.addEventListener('change',applyLayerVisibility);
document.getElementById('layers-show').addEventListener('click',()=>{for(const input of document.querySelectorAll('[id^="layer-"]'))input.checked=true;for(const id of ['grid-toggle','axes-toggle']){const input=document.getElementById(id);input.checked=true;input.dispatchEvent(new Event('change'));}applyLayerVisibility();});
// Static example guide stays visible after returning from the generated module.
const exampleGuides={
  oscillator:'OSCILADOR\ny″ = −y, y(0)=1 e v(0)=0.\nObserve a alternância entre posição e velocidade. A solução é y=cos(t), v=−sin(t).\nExperimente comparar Euler com RK4 e RK45. A energia E=(y²+v²)/2 é constante na solução exata; diferenças numéricas podem acumular ao longo do tempo.',
  damping:'AMORTECIMENTO\ny″ = −0.4v−y.\nObserve a amplitude diminuir. A energia E=(y²+v²)/2 satisfaz E′=−0.4v² ≤ 0 na solução exata.\nExperimente substituir 0.4 por 2 ou 3 e comparar o retorno ao equilíbrio.',
  forced:'FORÇA PERIÓDICA\nx′=y, y′=−x−0.3y+sin(t).\nAs setas são uma fotografia do campo no instante escolhido; o movimento integrado usa t variável.\nCompare as condições iniciais no gráfico temporal e aumente a duração. Com amortecimento, os efeitos das condições iniciais tendem a diminuir.\nExperimente mudar a frequência para sin(2*t).',
  logistic:'CRESCIMENTO LOGÍSTICO\ny′=y(1−y).\nPara y₀ positivo, observe a aproximação de y=1. Os equilíbrios são y=0 e y=1; nesta equação, o primeiro é instável e o segundo estável.\nMude y₀ para 0.2 e depois 2 e compare o sentido de aproximação.',
  lorenz:'LORENZ\nσ=10, ρ=28 e β=8/3.\nObserve a trajetória no espaço e x(t), y(t), z(t). O comportamento é sensível às condições iniciais.\nSalve o resultado em CSV, gere outra trajetória com x₀=1.0001 e compare. A tolerância local do RK45 não garante que trajetórias caóticas permaneçam próximas por tempos longos.',
  pitchfork:'FORQUILHA\nx′=μx−x³.\nPara μ<0, x=0 é estável. Para μ>0, x=0 é instável e surgem equilíbrios estáveis ±√μ.\nEm μ=0, a derivada é zero e a classificação pela linearização é inconclusiva.\nAumente a amostragem perto de μ=0 para observar os ramos; o diagrama é uma busca numérica.',
  saddle:'HESSIANA E SELA\nf(x,y)=(x²−y²)/4.\nNa origem, ∇f=0 e a Hessiana tem autovalores de sinais opostos.\nObserve que a superfície sobe em uma direção e desce em outra. Selecione outros pontos para comparar o gradiente e o plano tangente.',
  integral:'REGIÃO TRIANGULAR\n0≤x≤1 e 0≤y≤1−x, com integrando x+y.\nA integral exata vale 1/3. O limite superior interno depende da variável externa x.\nCompare os resultados com n e 2n subdivisões. A diferença entre eles indica refinamento, sem garantir o erro.'
};
function openLabPanel(view){if(typeof hideWelcome==='function')hideWelcome();const panel=document.querySelector(`[data-panel="${view}"]`);if(!panel)return;document.querySelectorAll('.menu-panel').forEach(el=>el.classList.toggle('active',el===panel));controlDrawer.classList.add('open');controlDrawer.scrollTop=0;closeModuleCatalog();syncLabNavigation();}
function loadGuidedExample(){
  const choice=document.getElementById('example-choice').value;document.getElementById('example-guide').textContent=exampleGuides[choice];
  const set=(id,value)=>{const el=document.getElementById(id);if(el.type==='checkbox')el.checked=value;else el.value=String(value);};
  // Examples start with every layer visible and predictable comparison settings.
  for(const input of document.querySelectorAll('[id^="layer-"]'))input.checked=true;
  let view;
  if(['oscillator','damping','logistic'].includes(choice)){
    set('ode-order',choice==='logistic'?'1':'2');set('ode-formula',choice==='oscillator'?'-y':choice==='damping'?'-0.4*v-y':'y*(1-y)');set('ode-x0',0);set('ode-y0',choice==='logistic'?.2:1);set('ode-v0',0);set('ode-min',0);set('ode-max',choice==='logistic'?10:20);set('ode-step',.2);set('ode-yrange',2);set('ode-method','rk45');set('ode-compare',false);set('ode-exact',choice==='oscillator'?'cos(x)':'');showODEOrder();showAdaptiveSettings();solveODE();view='ode';
  }else if(choice==='forced'){
    document.querySelector('[data-system="forced"]').click();set('phase-step',.2);set('phase-method','rk45');set('phase-initials','2, 0\n0, 1');set('phase-active',0);set('phase-chart-coordinate','x');set('phase-nullclines',true);set('phase-field',true);set('phase-family',false);showAdaptiveSettings();solvePhase();view='phase';
  }else if(choice==='lorenz'){
    document.querySelector('[data-field-preset="lorenz"]').click();set('field-method','rk45');set('field-step',.05);set('field-trajectory',true);showAdaptiveSettings();generateVectorField();view='fields';
  }else if(choice==='pitchfork'){
    set('bif-formula','mu*x-x^3');set('bif-min',-2);set('bif-max',2);set('bif-xmin',-3);set('bif-xmax',3);set('bif-count',80);generateBifurcation();view='bifurcation';
  }else if(choice==='saddle'){
    formulaInput.value='(x^2-y^2)/4';for(const row of [...document.querySelectorAll('.graph-row')].slice(1))row.remove();renumberGraphs();renderPlot();set('calc-h',.001);selectCalculatedPoint(0,0);view='calculus';
  }else{
    document.querySelector('[data-integral-preset="triangle"]').click();set('int-f','x+y');calculateIntegral();view='integrals';
  }
  openLabPanel(view);status.textContent='Exemplo carregado. Use Retomar atividade para registrar suas observações.';applyLayerVisibility();
}
document.getElementById('example-load').addEventListener('click',loadGuidedExample);
document.getElementById('example-choice').addEventListener('change',event=>document.getElementById('example-guide').textContent=exampleGuides[event.target.value]);
document.getElementById('example-guide').textContent=exampleGuides.oscillator;

const bifUI=id=>document.getElementById('bif-'+id),bifGroup=new THREE.Group();sceneGroup.add(bifGroup);
function disposeBifurcation(){bifGroup.traverse(o=>{o.geometry?.dispose();if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());});bifGroup.clear();bifGroup.visible=false;}
function bifurcationData(f,min,max,xmin,xmax,n){
  const rows=[];let continua=0;
  for(let i=0;i<=n;i++){const mu=min+(max-min)*i/n,fn=x=>f(x,mu),samples=Array.from({length:17},(_,j)=>{try{return fn(xmin+(xmax-xmin)*j/16);}catch{return NaN;}});if(samples.every(v=>v===0)){continua++;continue;}
    const scale=Math.max(...samples.filter(Number.isFinite).map(Math.abs),Number.MIN_VALUE),roots=scalarEquilibria(x=>fn(x)/scale,xmin,xmax);
    for(const x of roots){const h=1e-5*Math.max(1,Math.abs(x));let slope;try{slope=(fn(x+h)-fn(x-h))/(2*h);}catch{continue;}if(!Number.isFinite(slope))continue;const tolerance=1e-5*Math.max(1,scale/(xmax-xmin)),stability=Math.abs(slope)<=tolerance?'inconclusivo':slope<0?'estavel':'instavel';rows.push({mu,x,slope,stability});}
  }return {rows,continua};
}
function drawBifurcationChart(rows,min,max,xmin,xmax){
    const colors={estavel:'#0072b2',instavel:'#d55e00',inconclusivo:'#777777'},canvas=bifUI('chart'),ctx=canvas.getContext('2d'),px=mu=>72+(mu-min)/(max-min)*618,py=x=>350-(x-xmin)/(xmax-xmin)*270;canvas.hidden=false;ctx.fillStyle=semanticColor('#fff');ctx.fillRect(0,0,720,420);ctx.font=SpatialTypography.canvas(15);
    for(let i=0;i<=4;i++){const mu=min+(max-min)*i/4,x=xmin+(xmax-xmin)*i/4;ctx.strokeStyle=semanticColor('#e0e6e5');ctx.beginPath();ctx.moveTo(72,py(x));ctx.lineTo(690,py(x));ctx.stroke();ctx.fillStyle=semanticColor('#263b38');ctx.fillText(x.toPrecision(3),3,py(x)+5);ctx.fillText(mu.toPrecision(3),px(mu)-15,377);}
    for(const [i,key]of Object.keys(colors).entries()){ctx.fillStyle=semanticColor(colors[key]);ctx.fillText({estavel:'Estável',instavel:'Instável',inconclusivo:'Inconclusivo'}[key],80+i*190,28);}
    for(const row of rows){ctx.fillStyle=semanticColor(colors[row.stability]);ctx.beginPath();ctx.arc(px(row.mu),py(row.x),2.5,0,Math.PI*2);ctx.fill();}ctx.fillStyle=semanticColor('#263b38');ctx.fillText('parâmetro μ · eixo vertical: equilíbrio x*',160,409);
}
function generateBifurcation(){
  try{
    const read=id=>{const el=bifUI(id);if(!el.value.trim()||!Number.isFinite(Number(el.value)))throw Error('Preencha os limites numéricos.');return Number(el.value);},min=read('min'),max=read('max'),xmin=read('xmin'),xmax=read('xmax'),n=read('count');
    if(!(min<max&&xmin<xmax&&Number.isInteger(n)&&n>=10&&n<=160&&Math.max(...[min,max,xmin,xmax].map(Math.abs))<=10000))throw Error('Use intervalos crescentes, limites até ±10000 e 10 a 160 intervalos de μ.');
    const f=compileExpression(bifUI('formula').value,['x','mu']),data=bifurcationData(f,min,max,xmin,xmax,n);if(!data.rows.length&&!data.continua)throw Error('Nenhum equilíbrio encontrado no domínio amostrado. Verifique a equação e amplie os limites.');
    disposeTaylor();disposeIntegral();disposeParametric();disposeVectorField();disposePhase();disposeODE();restoreSurfaceLayers();disposeBifurcation();
    surfaceGroup.visible=false;intersectionGroup.visible=false;analysisGroup.visible=false;criticalGroup.visible=false;bifGroup.visible=true;gridGroup.visible=false;axesGroup.visible=false;axisLabelsGroup.visible=false;
    drawBifurcationChart(data.rows,min,max,xmin,xmax);
    for(const [key,color]of Object.entries({estavel:'#0072b2',instavel:'#d55e00',inconclusivo:'#777777'})){const points=data.rows.filter(r=>r.stability===key).map(r=>new THREE.Vector3(r.mu,.035,r.x));bifGroup.add(new THREE.Points(new THREE.BufferGeometry().setFromPoints(points),new THREE.PointsMaterial({color,size:Math.max(max-min,xmax-xmin)*.009})));}
    const reference=new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(min,0,xmin),new THREE.Vector3(max,0,xmin),new THREE.Vector3(min,0,xmin),new THREE.Vector3(min,0,xmax)]),new THREE.LineBasicMaterial({color:0x71818a}));reference.userData.layer='axes';bifGroup.add(reference);
    bifUI('export').disabled=false;bifUI('result').textContent=`${data.rows.length} equilíbrios amostrados em ${n+1} valores de μ.${data.continua?' '+data.continua+' valor(es) com campo nulo em todas as amostras: possível contínuo de equilíbrios, omitido do diagrama.':''}\nBusca parcial; refine o intervalo perto das mudanças de estabilidade.`;
    if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}const span=Math.max(max-min,xmax-xmin,4);controls.maxDistance=Math.max(40,span*4);controls.target.set((min+max)/2,0,(xmin+xmax)/2);graphTarget.copy(controls.target);camera.position.copy(controls.target).add(new THREE.Vector3(0,span*1.3,.01));camera.lookAt(controls.target);controls.update();setLabSnapshot({generated:true,kind:'bifurcation',bounds:[min,max,xmin,xmax],title:'Bifurcação: '+bifUI('formula').value,rows:data.rows,summary:bifUI('result').textContent});status.textContent='Diagrama: eixo horizontal μ, vertical x*';
  }catch(e){bifUI('result').textContent=e.message;}
}
bifUI('generate').addEventListener('click',generateBifurcation);
for(const button of document.querySelectorAll('[data-bif]'))button.addEventListener('click',()=>bifUI('formula').value=button.dataset.bif);
bifUI('export').addEventListener('click',()=>{if(bifUI('chart').hidden)return;bifUI('chart').toBlob(blob=>{if(blob)downloadLabFile(blob,'spatial-math-3d-bifurcacao.png');},'image/png');});

let expandedChartSource=null;
function refreshChartButtons(){for(const button of document.querySelectorAll('[data-chart]'))button.hidden=document.getElementById(button.dataset.chart).hidden;}
function refreshExpandedChart(){if(!document.getElementById('chart-dialog').open||!expandedChartSource)return;if(expandedChartSource.hidden){document.getElementById('chart-dialog').close();return;}const canvas=document.getElementById('chart-expanded');canvas.width=expandedChartSource.width;canvas.height=expandedChartSource.height;canvas.getContext('2d').drawImage(expandedChartSource,0,0);}
for(const button of document.querySelectorAll('[data-chart]'))button.addEventListener('click',()=>{expandedChartSource=document.getElementById(button.dataset.chart);if(expandedChartSource.hidden)return;document.getElementById('chart-dialog').showModal();refreshExpandedChart();});
document.getElementById('chart-close').addEventListener('click',()=>document.getElementById('chart-dialog').close());
// Projetos locais: entradas e configurações declarativas, sem código executável ou arquivos externos.
const projectUI=id=>document.getElementById(`project-${id}`);
const projectKinds=['empty','bifurcation','surface','ode','phase','fields','curve','paramSurface','integral','taylor'];
function projectInputElements(){return [...document.querySelectorAll('.menu-panel input[id], .menu-panel select[id], .menu-panel textarea[id]')].filter(el=>el.type!=='file'&&!el.id.startsWith('project-')&&!el.id.startsWith('activity-')&&!el.id.startsWith('tutorial-')&&el.id!=='cut-source');}
const projectInputDefaults=new Map(projectInputElements().map(el=>[el.id,el.type==='checkbox'?el.checked:el.value]));
function captureProject(){
  const inputs={};for(const el of projectInputElements())inputs[el.id]=el.type==='checkbox'?el.checked:el.value;
  let kind=labSnapshot.kind;if(['curve','paramSurface'].includes(kind))kind=paramUI('mode').value==='curve'?'curve':'paramSurface';
  return {format:'spatial-math-3d',version:1,createdAt:new Date().toISOString(),activeKind:kind,inputs,activities:typeof exportActivityState==='function'?exportActivityState():undefined,graphs:[...document.querySelectorAll('.graph-input')].map(el=>el.value),camera:{position:[camera.position.x,camera.position.z,camera.position.y],target:[controls.target.x,controls.target.z,controls.target.y]},selectedPoint:kind==='surface'&&selectedPoint?{x:selectedPoint.x,y:selectedPoint.y,formula:selectedPoint.formulaText||formulaInput.value}:null};
}
function validateProject(project){
  if(!project||!['lab-edo-3d','spatial-math-3d'].includes(project.format)||project.version!==1||!projectKinds.includes(project.activeKind))throw Error('Formato de projeto não reconhecido. Use um JSON exportado pelo Spatial Math 3D.');
  if(!Array.isArray(project.graphs)||!project.graphs.length||project.graphs.length>50||project.graphs.some(x=>typeof x!=='string'||x.length>2000))throw Error('A lista de gráficos deve conter entre 1 e 50 expressões de até 2000 caracteres.');
  if(!project.inputs||Array.isArray(project.inputs)||typeof project.inputs!=='object')throw Error('Configurações ausentes ou inválidas.');
  const elements=new Map(projectInputElements().map(el=>[el.id,el]));
  for(const [id,value]of Object.entries(project.inputs)){
    const el=elements.get(id);if(!el)throw Error(`Configuração desconhecida: ${id}`);
    if(el.type==='checkbox'){if(typeof value!=='boolean')throw Error(`Valor inválido em ${id}.`);continue;}
    if(typeof value!=='string'||value.length>2000)throw Error(`Valor inválido em ${id}.`);
    if(el.tagName==='SELECT'&&![...el.options].some(o=>o.value===value))throw Error(`Opção inválida em ${id}.`);
    if(['number','range'].includes(el.type)&&value.trim()){
      const n=Number(value);if(!Number.isFinite(n)||(el.min!==''&&n<Number(el.min))||(el.max!==''&&n>Number(el.max)))throw Error(`Valor numérico fora do intervalo em ${id}.`);
    }
    if(el.type==='color'&&!/^#[0-9a-f]{6}$/i.test(value))throw Error(`Cor inválida em ${id}.`);
  }
  for(const key of ['position','target'])if(!Array.isArray(project.camera?.[key])||project.camera[key].length!==3||project.camera[key].some(v=>typeof v!=='number'||!Number.isFinite(v)||Math.abs(v)>1000000))throw Error('Câmera inválida.');
  if(Math.hypot(...project.camera.position.map((v,i)=>v-project.camera.target[i]))<.1)throw Error('A câmera não pode coincidir com o ponto observado.');
  if(project.selectedPoint!==null&&project.selectedPoint!==undefined){const p=project.selectedPoint;if(!Number.isFinite(p.x)||!Number.isFinite(p.y)||typeof p.formula!=='string'||p.formula.length>2000)throw Error('Ponto selecionado inválido.');}
  if(project.activities!==undefined)validateActivityState(project.activities);
  return project;
}
function appendProjectGraph(text){
  const row=document.createElement('div');row.className='graph-row';row.innerHTML='<span class="graph-index"></span><div class="formula-input"><span>z =</span><input class="graph-input" type="text" spellcheck="false" aria-label="Função de gráfico adicional"></div><button class="remove-graph" type="button" aria-label="Remover gráfico">×</button>';
  const input=row.querySelector('input');input.value=text;input.addEventListener('input',renderPlot);row.querySelector('button').addEventListener('click',()=>{row.remove();renumberGraphs();renderPlot();});document.getElementById('graph-list').appendChild(row);
}
function regenerateProjectKind(kind){
  const funcs={bifurcation:generateBifurcation,surface:renderPlot,ode:solveODE,phase:solvePhase,fields:generateVectorField,curve:generateParametric,paramSurface:generateParametric,integral:calculateIntegral,taylor:plotTaylor};
  const previous=labSnapshot;funcs[kind]();if(labSnapshot===previous||labSnapshot.kind!==kind){const output={bifurcation:bifUI('result'),surface:status,ode:odeUI('result'),phase:phaseUI('result'),fields:fieldUI('result'),curve:paramUI('result'),paramSurface:paramUI('result'),integral:intUI('result'),taylor:taylorUI('result')}[kind];throw Error(output.textContent||'Não foi possível reconstruir o gráfico do projeto.');}
}
function applyProject(project){
  if(parameterFrame){cancelAnimationFrame(parameterFrame);parameterFrame=0;}
  if(walkingMode){walkToggle.checked=false;setWalkingMode(false);}odePlaying=false;phasePlaying=false;fieldPlaying=false;paramPlaying=false;followLastPoint=null;
  for(const el of projectInputElements()){const value=Object.hasOwn(project.inputs,el.id)?project.inputs[el.id]:projectInputDefaults.get(el.id);if(el.type==='checkbox')el.checked=value;else el.value=value;}
  for(const row of [...document.querySelectorAll('.graph-row')].slice(1))row.remove();formulaInput.value=project.graphs[0];project.graphs.slice(1).forEach(appendProjectGraph);renumberGraphs();
  const palette=palettes[paletteSelect.value];if(palette)for(const [key,value]of Object.entries(palette.ui)){const cssName={deepMint:'deep-mint'}[key]||key;document.documentElement.style.setProperty('--'+cssName,value);}
  rangeValue.textContent=rangeInput.value;document.getElementById('contour-count-value').textContent=document.getElementById('contour-count').value;document.getElementById('intersection-width-value').textContent=document.getElementById('intersection-width').value;
  for(const name of ['a','b','c'])document.getElementById(`parameter-${name}-value`).textContent=Number(document.getElementById(`parameter-${name}`).value).toFixed(1);taylorUI('order-value').textContent=taylorUI('order').value;
  document.getElementById('animation-speed-value').textContent=Number(document.getElementById('animation-speed').value).toFixed(2)+'×';showParamMode();showIntegralMode();showODEOrder();showAdaptiveSettings();document.getElementById('example-guide').textContent=exampleGuides[document.getElementById('example-choice').value];updateBackground();
  if(project.activeKind==='empty')initializeEmptyScene();else{regenerateProjectKind('surface');if(project.activeKind!=='surface')regenerateProjectKind(project.activeKind);}
  if(project.activeKind==='surface'&&project.selectedPoint){const p=project.selectedPoint;selectCalculatedPoint(p.x,p.y,p.formula);}
  const state={ode:[odeUI('progress'),value=>{odeProgress=value;drawODEMarker();}],phase:[phaseUI('progress'),value=>{phaseProgress=value;showPhaseFrame();}],fields:[fieldUI('progress'),value=>{fieldProgress=value;drawFieldFrame();}],curve:[paramUI('progress'),value=>{paramProgress=value;drawParamFrame();}]}[project.activeKind];
  if(state&&!state[0].disabled){const value=Number(project.inputs[state[0].id]??0);state[0].value=value;state[1](value);}
  camera.position.copy(fieldWorld(project.camera.position));controls.target.copy(fieldWorld(project.camera.target));graphTarget.copy(controls.target);const distance=camera.position.distanceTo(controls.target);controls.minDistance=Math.min(4,distance*.5);controls.maxDistance=Math.max(40,controls.maxDistance,distance*1.1);camera.lookAt(controls.target);controls.update();
  const view={empty:'function',bifurcation:'bifurcation',surface:'function',ode:'ode',phase:'phase',fields:'fields',curve:'parametric',paramSurface:'parametric',integral:'integrals',taylor:'taylor'}[project.activeKind];
  sceneHome={position:camera.position.clone(),target:controls.target.clone()};openLabPanel(view);refreshLabInspector();if(project.activities!==undefined)applyActivityState(project.activities);else if(typeof activityState!=='undefined'){activityState.selected=document.getElementById('example-choice').value;saveActivityState();renderActivity();}
}
function saveProject(){try{const project=captureProject();validateProject(project);downloadLabFile(new Blob([JSON.stringify(project,null,2)],{type:'application/json'}),'spatial-math-3d-projeto.json');projectUI('status').textContent='Projeto JSON exportado. O arquivo salva as entradas atuais e recalcula o módulo ao carregar.';}catch(e){projectUI('status').textContent=e.message;}}
async function loadProjectFile(file){
  if(!file)return;const previous=captureProject();
  try{if(file.size>1024*1024)throw Error('O projeto deve ter no máximo 1 MB.');const project=validateProject(JSON.parse(await file.text()));
    try{applyProject(project);}catch(error){try{applyProject(previous);}catch{}throw error;}
    projectUI('status').textContent='Projeto carregado. A animação começa pausada; use Simular para continuar.';status.textContent='Projeto JSON carregado com sucesso';
  }catch(e){projectUI('status').textContent='Não foi possível carregar: '+e.message;openLabPanel('inspector');projectUI('status').scrollIntoView({block:'nearest'});}
}
projectUI('save').addEventListener('click',saveProject);projectUI('load').addEventListener('click',()=>projectUI('file').click());projectUI('file').addEventListener('change',async event=>{await loadProjectFile(event.target.files[0]);event.target.value='';});
// A câmera acompanha deslocamentos do marcador, preservando a distância de órbita.
let followLastPoint=null;
function animationSpeed(){return Number(document.getElementById('animation-speed').value)||1;}
function activeAnimatedMarker(){const kind=labSnapshot.kind;if(kind==='ode'&&odeGroup.visible)return odeMarker;if(kind==='phase'&&phaseGroup.visible)return phaseMarker;if(kind==='fields'&&vectorGroup.visible)return fieldMarker;if(kind==='curve'&&paramGroup.visible)return paramMarker;return null;}
function updateFollowCamera(){
  const enabled=document.getElementById('animation-follow').checked,marker=activeAnimatedMarker();
  if(!enabled||walkingMode||!marker){followLastPoint=null;return;}
  const point=marker.position.clone();if(!followLastPoint){controls.target.copy(point);camera.lookAt(point);graphTarget.copy(point);followLastPoint=point;return;}
  const shift=point.clone().sub(followLastPoint);camera.position.add(shift);controls.target.add(shift);graphTarget.copy(controls.target);followLastPoint.copy(point);
}
document.getElementById('animation-speed').addEventListener('input',event=>{document.getElementById('animation-speed-value').textContent=Number(event.target.value).toFixed(2)+'×';});
document.getElementById('animation-follow').addEventListener('change',()=>{followLastPoint=null;updateFollowCamera();});

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(movementClock.getDelta(), 0.05);
  updateMovement(delta);
  updateODEAnimation(delta);
  updatePhaseAnimation(delta);
  updateFieldAnimation(delta);
  updateParametricAnimation(delta);
  evolutionElapsed+=delta;if(evolutionElapsed>=.1){evolutionElapsed=0;if(evolutionChart?.canvas.offsetParent)drawEvolutionCursor();refreshExpandedChart();}
  updateFollowCamera();
  controls.update();
  updateCameraValues();
  if(typeof drawMobileCompass==='function')drawMobileCompass();
  renderer.render(scene, camera);
  if(typeof drawRecordingFrame==='function')drawRecordingFrame();
}
function initializeEmptyScene(){
  disposeODE();disposePhase();disposeVectorField();disposeParametric();disposeIntegral();disposeTaylor();disposeBifurcation();clearAnalysis();
  for(const group of [surfaceGroup,gridGroup,axesGroup,axisLabelsGroup,intersectionGroup,criticalGroup]){
    group.traverse(o=>{o.geometry?.dispose();for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){m.map?.dispose();m.dispose();}});group.clear();group.visible=false;
  }
  makeGrid();makeAxes();gridGroup.visible=document.getElementById('grid-toggle').checked;axesGroup.visible=axisLabelsGroup.visible=document.getElementById('axes-toggle').checked;applyLayerVisibility();
  labSnapshot={kind:'empty',title:'Nenhum gráfico gerado',summary:'Escolha uma ferramenta e gere seu primeiro gráfico.'};
  document.getElementById('point-count').textContent='0';status.textContent='Escolha uma ferramenta para começar.';refreshLabInspector();prepareEvolutionChart();refreshChartButtons();
}
updateBackground();
initializeEmptyScene();
syncLabNavigation();showODEOrder();
controlDrawer.classList.remove('open');
for(const button of document.querySelectorAll('.nav-category,.nav-item')){button.classList.remove('active');button.removeAttribute('aria-current');}
animate();
