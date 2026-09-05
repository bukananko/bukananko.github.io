<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { type CelestialBody, solarSystemBodies } from '@/constant';
import { buildConstellationSystem, type ConstellationSystem } from '@/space/builders/constellations';
import { buildGalaxySystem, type GalaxySystem } from '@/space/builders/galaxy';

const props = withDefaults(
  defineProps<{
    orbitSpeedMultiplier?: number;
    selectedBodyId?: string | null;
    isPanelOpen?: boolean;
  }>(),
  {
    orbitSpeedMultiplier: 1,
    selectedBodyId: null,
    isPanelOpen: false,
  },
);

const emit = defineEmits<{
  (e: 'select', body: CelestialBody | null): void;
  (e: 'hover', body: CelestialBody | null): void;
  (e: 'unselect'): void;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Hover & Drag state for cursor UI
const hoveredBody = ref<CelestialBody | null>(null);
const isDragging = ref(false);
const tooltipPos = ref({ x: -1000, y: -1000 });

// Three.js Core
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let raycaster: THREE.Raycaster;
let mouseVector: THREE.Vector2;
let animationFrameId: number | null = null;
let lastTimestamp = 0;
let simulationTime = 0;
let isTabVisible = true;

// Camera smooth animation (Fly-to / Lerp) & Continuous Motion Tracking
const cameraTargetPos = new THREE.Vector3(0, 320, 520);
const controlsTargetPos = new THREE.Vector3(0, 0, 0);
let isCameraAnimating = false;
let activeTrackingId: string | null = null;
const trackingCamOffset = new THREE.Vector3(45, 30, 45);
const lastTrackedBodyPos = new THREE.Vector3();
let currentViewOffsetX = 0;
let currentViewOffsetY = 0;

let flyToStartTime = 0;
const flyToDuration = 750; // 750ms smooth transition, guaranteed completion
const flyToStartCam = new THREE.Vector3();
const flyToStartTarget = new THREE.Vector3();

// 3D Objects Storage
interface Planet3D {
  body: CelestialBody;
  mesh: THREE.Mesh;
  orbitLine: THREE.Line;
  orbitGlowRing: THREE.Mesh;
  orbitMaterialNormal: THREE.LineBasicMaterial;
  orbitMaterialActive: THREE.LineBasicMaterial;
  orbitGlowNormal: THREE.MeshBasicMaterial;
  orbitGlowActive: THREE.MeshBasicMaterial;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  axialSpinSpeed: number;
  ringsMesh?: THREE.Mesh;
  moons?: THREE.Mesh[];
  selectionRing?: THREE.Mesh;
}
const planets3D: Planet3D[] = [];
let sunMesh: THREE.Mesh | null = null;
let sunCorona: THREE.Mesh | null = null;
let constellationSystem: ConstellationSystem | null = null;
let galaxySystem: GalaxySystem | null = null;

// Dynamic Cosmic Particles (Volumetric Space Dust: Inner & Outer System)
let cosmicDustPoints: THREE.Points | null = null;
let galacticStreamPoints: THREE.Points | null = null;
let starFieldPoints: THREE.Points | null = null;
const solarNebulaSprites: THREE.Sprite[] = [];
const dustCount = 7500;
const dustRadii = new Float32Array(dustCount);
const dustAngles = new Float32Array(dustCount);
const dustSpeeds = new Float32Array(dustCount);
const dustYBase = new Float32Array(dustCount);

// Shooting Stars (Meteors / Bintang Jatuh - 6 Channels)
interface ShootingStar {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  active: boolean;
  progress: number;
  speed: number;
  startPos: THREE.Vector3;
  dir: THREE.Vector3;
  length: number;
  cooldown: number;
  material: THREE.LineBasicMaterial;
}
const shootingStars: ShootingStar[] = [];

// Wandering Comet Halley (Icy Wanderer with Soft Ion Tail)
let cometMesh: THREE.Mesh | null = null;
let cometTailPoints: THREE.Points | null = null;
const cometTailCount = 80;
const cometTailHistory: THREE.Vector3[] = [];
const cometBody: CelestialBody = {
  id: 'comet-halley',
  name: 'Comet Halley',
  codeName: 'CMT-1P/HALLEY',
  type: 'project',
  planetCategory: 'ice',
  tagline: 'Deep Space Periodic Icy Wanderer & Cyan Ion Stream',
  orbitRadius: 720,
  orbitSpeed: 0.12,
  baseRadius: 6.5,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.65)',
  accentColor: '#0284c7',
  initialAngle: 0.8,
};

// Outer Kuiper Asteroid Belt (380 Asteroids)
let asteroidBelt: THREE.InstancedMesh | null = null;
const asteroidCount = 380;
const asteroidData: {
  radius: number;
  angle: number;
  speed: number;
  y: number;
  rotSpeed: number;
  scale: number;
}[] = [];

// =========================================================
// DEEP SPACE OBJECTS & PHENOMENA (OUTSIDE PLANETARY ORBITS)
// =========================================================

// 1. UFO / Alien Scout Ship
let ufoGroup: THREE.Group | null = null;
let ufoHitMesh: THREE.Mesh | null = null;
let ufoLightsRing: THREE.Group | null = null;
let ufoTractorBeam: THREE.Mesh | null = null;
const ufoBody: CelestialBody = {
  id: 'ufo-alpha',
  name: 'UFO-Alpha Scout',
  codeName: 'UAP-09/EXO-VOID',
  type: 'vessel',
  planetCategory: 'ufo',
  tagline: 'Extraterrestrial Hyper-Drive Reconnaissance Vessel & Graviton Field',
  orbitRadius: 630,
  orbitSpeed: 0.09,
  baseRadius: 18,
  color: '#10b981',
  glowColor: 'rgba(16, 185, 129, 0.75)',
  accentColor: '#059669',
  initialAngle: 1.6,
  icon: 'solar:ufo-bold',
  lore: 'Wahana nir-awak asal peradaban luar surya. Menggunakan sistem propulsi medan graviton yang mendistorsi ruang-waktu di sekitarnya tanpa menghasilkan emisi panas termal.',
  extraStats: [
    { label: 'Propulsi', value: 'Graviton Warp' },
    { label: 'Sinyal Sub-ruang', value: '433.92 GHz Pulse' },
    { label: 'Asal', value: 'Deep Oort Cloud' },
  ],
};

// 2. Orbital Space Station (Aegis Outpost-1)
let stationGroup: THREE.Group | null = null;
let stationHitMesh: THREE.Mesh | null = null;
let stationHabitatRing: THREE.Group | null = null;
const stationStrobes: THREE.MeshBasicMaterial[] = [];
const stationBody: CelestialBody = {
  id: 'station-aegis',
  name: 'Aegis Outpost-1',
  codeName: 'ISS-AEGIS/ALPHA',
  type: 'station',
  planetCategory: 'station',
  tagline: 'Modular Deep Space Habitat, Gravity Ring & Solar Array Outpost',
  orbitRadius: 560,
  orbitSpeed: 0.065,
  baseRadius: 24,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.75)',
  accentColor: '#0284c7',
  initialAngle: 3.5,
  icon: 'solar:station-minimalistic-bold',
  lore: 'Pangkalan stasiun penelitian orbital berawak di pinggiran sabuk asteroid. Cincin habitat berputar menghasilkan gravitasi sentrifugal buatan bagi awak peneliti.',
  extraStats: [
    { label: 'Kru Aktif', value: '12 Astronaut' },
    { label: 'Gravitasi Tiruan', value: '0.98 G (Spin)' },
    { label: 'Daya Surya', value: '4.2 MegaWatt' },
  ],
};

// 3. Deep Space Exploration Cruiser (Starship Hermes-IV)
let starshipGroup: THREE.Group | null = null;
let starshipHitMesh: THREE.Mesh | null = null;
const starshipPlumes: THREE.Mesh[] = [];
const starshipBody: CelestialBody = {
  id: 'ship-hermes',
  name: 'Starship Hermes-IV',
  codeName: 'EXP-HERMES/MK4',
  type: 'vessel',
  planetCategory: 'ship',
  tagline: 'Interstellar Deep Space Heavy Cruiser & High-Impulse Ion Drive',
  orbitRadius: 740,
  orbitSpeed: 0.11,
  baseRadius: 22,
  color: '#06b6d4',
  glowColor: 'rgba(6, 182, 212, 0.75)',
  accentColor: '#0891b2',
  initialAngle: 5.2,
  icon: 'solar:rocket-2-bold',
  lore: 'Kapal penjelajah antariksa generasi ke-4 yang dilengkapi sepasang mesin ion plasma berdensitas tinggi. Bertugas memetakan anomali antarbintang dan menjaga jalur navigasi kosmik.',
  extraStats: [
    { label: 'Kecepatan Jelajah', value: '0.15 c (Relativistik)' },
    { label: 'Propulsi Reaktor', value: 'Fusion-Ion Thruster' },
    { label: 'Armor Lambung', value: 'Nanotube Titanium' },
  ],
};

// 4. Micro-Singularity Black Hole (Gargantua-X)
let blackHoleGroup: THREE.Group | null = null;
let blackHoleHitMesh: THREE.Mesh | null = null;
let blackHoleAccretion: THREE.Mesh | null = null;
let blackHoleLensing: THREE.Mesh | null = null;
const blackHoleBody: CelestialBody = {
  id: 'singularity-gargantua',
  name: 'Singularity Gargantua-X',
  codeName: 'BH-SINGULARITY/X9',
  type: 'phenomenon',
  planetCategory: 'blackhole',
  tagline: 'Micro-Singularity Anomaly with Swirling Accretion Disk & Gravitational Lensing',
  orbitRadius: 1100,
  orbitSpeed: 0,
  baseRadius: 36,
  color: '#f59e0b',
  glowColor: 'rgba(245, 158, 11, 0.85)',
  accentColor: '#d97706',
  initialAngle: 0,
  icon: 'solar:danger-triangle-bold',
  lore: 'Fenomena lubang hitam mikro purba di tepi terluar cakrawala. Menghasilkan tarikan gravitasi masif yang melengkungkan cahaya starlight di sekitarnya dan memanaskan piringan akresi gas plasma hingga jutaan derajat.',
  extraStats: [
    { label: 'Massa Singularity', value: '4.5 Solar Masses' },
    { label: 'Radius Schwarzchild', value: '22 km' },
    { label: 'Luminositas Akresi', value: '1.2 x 10^38 erg/s' },
  ],
};

// 5. Pulsar / High-Energy Neutron Star (PSR-0950)
let pulsarGroup: THREE.Group | null = null;
let pulsarHitMesh: THREE.Mesh | null = null;
let pulsarJetsGroup: THREE.Group | null = null;
const pulsarBody: CelestialBody = {
  id: 'pulsar-0950',
  name: 'Pulsar PSR-0950',
  codeName: 'PSR-B0950+08',
  type: 'phenomenon',
  planetCategory: 'pulsar',
  tagline: 'High-Velocity Magnetized Neutron Star with Relativistic Plasma Jets',
  orbitRadius: 1150,
  orbitSpeed: 0,
  baseRadius: 28,
  color: '#a855f7',
  glowColor: 'rgba(168, 85, 247, 0.85)',
  accentColor: '#9333ea',
  initialAngle: 0,
  icon: 'solar:bolt-circle-bold',
  lore: 'Sisa supernova berupa bintang neutron yang berputar sangat cepat. Memancarkan sepasang pancaran radiasi plasma relativistik dari kutub magnetnya yang menyapu ruang hampa.',
  extraStats: [
    { label: 'Periode Denyut', value: '0.253 Detik' },
    { label: 'Medan Magnet', value: '10^12 Gauss' },
    { label: 'Densitas Inti', value: '10^14 g/cm³' },
  ],
};

// 6. Deep Space Communications Satellite (Chronos Relay)
let satelliteGroup: THREE.Group | null = null;
let satelliteHitMesh: THREE.Mesh | null = null;
let satelliteBeaconMat: THREE.MeshBasicMaterial | null = null;
const satelliteBody: CelestialBody = {
  id: 'satellite-chronos',
  name: 'Chronos Relay Probe',
  codeName: 'SAT-CHRONOS/07',
  type: 'station',
  planetCategory: 'satellite',
  tagline: 'Autonomous Deep Space Quantum Telemetry & Golden Reflector Array',
  orbitRadius: 490,
  orbitSpeed: 0.08,
  baseRadius: 15,
  color: '#eab308',
  glowColor: 'rgba(234, 179, 8, 0.75)',
  accentColor: '#ca8a04',
  initialAngle: 4.0,
  icon: 'solar:satellite-bold',
  lore: 'Wahana pemancar relai berkecepatan tinggi yang ditempatkan di dekat sabuk asteroid untuk menghubungkan komunikasi antara planet-planet bagian dalam dan wahana penjelajah angkasa luar.',
  extraStats: [
    { label: 'Bandwidth Sinyal', value: '100 Gbps Laser Link' },
    { label: 'Bahan Bakar Nuklir', value: 'Plutonium-238 RTG' },
    { label: 'Waktu Misi', value: '25 Tahun Aktif' },
  ],
};

// 7. Ringed Alien Exoplanet (Kepler-452b)
let exoplanetGroup: THREE.Group | null = null;
let exoplanetHitMesh: THREE.Mesh | null = null;
let exoplanetMesh: THREE.Mesh | null = null;
let exoplanetMoon: THREE.Mesh | null = null;
const exoplanetBody: CelestialBody = {
  id: 'exoplanet-kepler',
  name: 'Kepler-452b Super-Earth',
  codeName: 'EXO-KEPLER/452B',
  type: 'phenomenon',
  planetCategory: 'exoplanet',
  tagline: 'Distant Habitable Super-Earth with Luminescent Rings & Miniature Moon',
  orbitRadius: 820,
  orbitSpeed: 0.072,
  baseRadius: 20,
  color: '#06b6d4',
  glowColor: 'rgba(6, 182, 212, 0.75)',
  accentColor: '#0891b2',
  initialAngle: 2.1,
  icon: 'solar:planet-3-bold',
  lore: 'Eksoplanet batuan raksasa di zona layak huni bintang luar. Memiliki atmosfer kaya nitrogen, lautan dalam bercahaya bioluminesens, cincin es ganda tipis, serta satu satelit alami kecil.',
  extraStats: [
    { label: 'Massa Planet', value: '5.0 Earth Masses' },
    { label: 'Suhu Rata-rata', value: '-8°C s/d +22°C' },
    { label: 'Cincin Es', value: 'Dual Ring System' },
  ],
};

// 8. JWST Deep Space Infrared Observatory
let jwstGroup: THREE.Group | null = null;
let jwstHitMesh: THREE.Mesh | null = null;
const jwstBody: CelestialBody = {
  id: 'observatory-jwst',
  name: 'JWST-X Observatory',
  codeName: 'TELESCOPE-JWST/X',
  type: 'station',
  planetCategory: 'telescope',
  tagline: 'Deep Space Infrared Observatory with Golden Hexagonal Mirror Array',
  orbitRadius: 690,
  orbitSpeed: 0.082,
  baseRadius: 18,
  color: '#f59e0b',
  glowColor: 'rgba(245, 158, 11, 0.75)',
  accentColor: '#d97706',
  initialAngle: 0.5,
  icon: 'solar:telescope-bold',
  lore: 'Observatorium antariksa inframerah kuantum dengan cermin emas bersegmen heksagonal raksasa dan pelindung panas bertingkat lima. Menyingkap galaksi purba pertama sejak awal mula semesta.',
  extraStats: [
    { label: 'Diameter Cermin', value: '6.5 Meter Emas' },
    { label: 'Suhu Operasi', value: '40 Kelvin (-233°C)' },
    { label: 'Panjang Gelombang', value: '0.6 - 28.3 μm IR' },
  ],
};

// 9. Helix Eye Supernova Remnant / Planetary Nebula Core
let helixGroup: THREE.Group | null = null;
let helixHitMesh: THREE.Mesh | null = null;
let helixRings: THREE.Mesh[] = [];
const helixBody: CelestialBody = {
  id: 'nebula-helix',
  name: 'Helix Eye Remnant',
  codeName: 'NGC-7293/HELIX',
  type: 'phenomenon',
  planetCategory: 'nebula-core',
  tagline: 'Stellar Remnant with Multi-Ring Ionized Gas Shells & White Dwarf Core',
  orbitRadius: 1200,
  orbitSpeed: 0,
  baseRadius: 38,
  color: '#ec4899',
  glowColor: 'rgba(236, 72, 153, 0.85)',
  accentColor: '#db2777',
  initialAngle: 0,
  icon: 'solar:eye-bold',
  lore: 'Sisa ledakan lapisan gas bintang yang sekarat. Membentuk cincin silinder gas ionik raksasa berdiameter triliunan kilometer yang berpendar merah-zamrud dengan katai putih panas di pusatnya.',
  extraStats: [
    { label: 'Inti Pusat', value: 'Hot White Dwarf' },
    { label: 'Kecepatan Ekspansi', value: '31 km/detik' },
    { label: 'Suhu Inti', value: '120.000 Kelvin' },
  ],
};

// 10. Titan Alien Mothership (Vanguard Titan)
let mothershipGroup: THREE.Group | null = null;
let mothershipHitMesh: THREE.Mesh | null = null;
let mothershipCoreGlow: THREE.Mesh | null = null;
const mothershipBody: CelestialBody = {
  id: 'mothership-titan',
  name: 'Vanguard Titan Dreadnought',
  codeName: 'CV-TITAN/MOTHERSHIP',
  type: 'vessel',
  planetCategory: 'mothership',
  tagline: 'Colossal Extraterrestrial Flagship with Pulsing Singularity Reactor',
  orbitRadius: 1050,
  orbitSpeed: 0.035,
  baseRadius: 35,
  color: '#c084fc',
  glowColor: 'rgba(192, 132, 252, 0.85)',
  accentColor: '#9333ea',
  initialAngle: 1.2,
  icon: 'solar:shield-star-bold',
  lore: 'Kapal induk antarbintang alien berukuran gigantis dengan lambung hitam bersudut piramidal. Ditenagai oleh reaktor singularitas terkendali yang memancarkan pendaran ungu antarmatra.',
  extraStats: [
    { label: 'Panjang Lambung', value: '3.8 Kilometer' },
    { label: 'Sumber Daya', value: 'Subspace Singularity' },
    { label: 'Armada Kawal', value: '36 Frigate Drones' },
  ],
};

// 11. Crystal Monolith (Xenolith Prime)
let monolithGroup: THREE.Group | null = null;
let monolithHitMesh: THREE.Mesh | null = null;
let monolithGlyphMat: THREE.MeshBasicMaterial | null = null;
const monolithBody: CelestialBody = {
  id: 'monolith-prime',
  name: 'Xenolith Prime Monolith',
  codeName: 'ARTIFACT-1:4:9/VOID',
  type: 'phenomenon',
  planetCategory: 'monolith',
  tagline: 'Mysterious Geometric Obsidian Monolith with Shimmering Quantum Glyphs',
  orbitRadius: 580,
  orbitSpeed: 0.062,
  baseRadius: 14,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.85)',
  accentColor: '#0284c7',
  initialAngle: 4.7,
  icon: 'solar:cube-bold',
  lore: 'Monolit obelisk hitam sempurna dengan rasio dimensi matematis presisi 1:4:9. Permukaannya menyerap 99.9% cahaya namun secara berkala memproyeksikan kode glif kuantum bercahaya.',
  extraStats: [
    { label: 'Proporsi Dimensi', value: '1 : 4 : 9 (Tunggal)' },
    { label: 'Komposisi', value: 'Zero-Porosity Obsidian' },
    { label: 'Usia Artefak', value: '> 3 Miliar Tahun' },
  ],
};

// 12. Interstellar Visitor Asteroid ('Oumuamua)
let oumuamuaGroup: THREE.Group | null = null;
let oumuamuaHitMesh: THREE.Mesh | null = null;
const oumuamuaBody: CelestialBody = {
  id: 'asteroid-oumuamua',
  name: "'Oumuamua Interstellar Scout",
  codeName: '1I/2017-U1/OUMUAMUA',
  type: 'phenomenon',
  planetCategory: 'interstellar-asteroid',
  tagline: 'Hyperbolic Cigar-Shaped Interstellar Visitor with Dynamic Tumbling Spin',
  orbitRadius: 650,
  orbitSpeed: 0.14,
  baseRadius: 12,
  color: '#fb7185',
  glowColor: 'rgba(251, 113, 133, 0.75)',
  accentColor: '#e11d48',
  initialAngle: 3.9,
  icon: 'solar:meteor-bold',
  lore: 'Objek pertama yang terkonfirmasi berasal dari luar tata surya kita. Berbentuk memanjang mirip cerutu dengan rotasi jungkir balik (*tumbling*) dan permukaan merah gelap akibat radiasi kosmik.',
  extraStats: [
    { label: 'Rasio Panjang', value: '10 : 1 (Memanjang)' },
    { label: 'Lintasan', value: 'Hiperbolik Ekstrim' },
    { label: 'Akselerasi Non-Gravitasi', value: 'Outgassing / Light' },
  ],
};

// 13. LightSail Photonic Deep Space Probe
let lightsailGroup: THREE.Group | null = null;
let lightsailHitMesh: THREE.Mesh | null = null;
let lightsailSailMesh: THREE.Mesh | null = null;
const lightsailBody: CelestialBody = {
  id: 'probe-lightsail',
  name: 'LightSail-III Voyager',
  codeName: 'PROBE-SAIL/03',
  type: 'vessel',
  planetCategory: 'solarsail',
  tagline: 'Ultralight Diamond Reflective Photonic Sail Propelled by Pure Sunlight',
  orbitRadius: 460,
  orbitSpeed: 0.095,
  baseRadius: 16,
  color: '#67e8f9',
  glowColor: 'rgba(103, 232, 249, 0.75)',
  accentColor: '#06b6d4',
  initialAngle: 1.0,
  icon: 'solar:wind-bold',
  lore: 'Wahana penjelajah berbasis layar fotonik ultra-ringan berbahan Mylar reflektif. Mendorong dirinya melintasi tata surya murni mengandalkan momentum radiasi foton dari cahaya Matahari.',
  extraStats: [
    { label: 'Luas Layar', value: '32 m² Reflektif' },
    { label: 'Ketebalan Layar', value: '4.5 Mikrometer' },
    { label: 'Konsumsi Bahan Bakar', value: 'Nol (Murni Foton)' },
  ],
};

// 14. Sirius Binary Star System
let binaryGroup: THREE.Group | null = null;
let binaryHitMesh: THREE.Mesh | null = null;
let binaryStarA: THREE.Mesh | null = null;
let binaryStarB: THREE.Mesh | null = null;
let binaryStreamer: THREE.Line | null = null;
const binaryBody: CelestialBody = {
  id: 'binary-sirius',
  name: 'Sirius Gravitational Binary',
  codeName: 'STAR-SYSTEM/SIRIUS-AB',
  type: 'phenomenon',
  planetCategory: 'binary-star',
  tagline: 'Gravitationally Locked Orange Giant & Brilliant Cyan White Dwarf Pair',
  orbitRadius: 1180,
  orbitSpeed: 0,
  baseRadius: 32,
  color: '#f97316',
  glowColor: 'rgba(249, 115, 22, 0.85)',
  accentColor: '#ea580c',
  initialAngle: 0,
  icon: 'solar:sun-2-bold',
  lore: 'Sistem bintang ganda yang saling mengunci secara gravitasi dan mengitari pusat massa bersama (*barycenter*). Terdiri dari bintang raksasa jingga hangat dan katai putih biru cemerlang.',
  extraStats: [
    { label: 'Bintang Utama', value: 'Orange Subgiant' },
    { label: 'Bintang Sekunder', value: 'Cyan White Dwarf' },
    { label: 'Periode Orbit Sistem', value: '50.1 Tahun' },
  ],
};

// 15. Wormhole / Einstein-Rosen Bridge (Vortex Artemis-X)
let wormholeGroup: THREE.Group | null = null;
let wormholeHitMesh: THREE.Mesh | null = null;
let wormholeRings: THREE.Mesh[] = [];
const wormholeBody: CelestialBody = {
  id: 'wormhole-artemis',
  name: 'Wormhole Artemis-X',
  codeName: 'WORMHOLE-ERB/01',
  type: 'phenomenon',
  planetCategory: 'wormhole',
  tagline: 'Swirling Spacetime Gravitational Funnel & Intergalactic Transit Gateway',
  orbitRadius: 1100,
  orbitSpeed: 0,
  baseRadius: 36,
  color: '#c084fc',
  glowColor: 'rgba(192, 132, 252, 0.85)',
  accentColor: '#9333ea',
  initialAngle: 0,
  icon: 'solar:infinity-bold',
  lore: 'Singularitas lorong cacing terowongan ruang-waktu yang menghubungkan sektor tata surya ini dengan galaksi berjarak milyaran tahun cahaya. Memiliki cincin stabilisator plasma kontra-rotasi.',
  extraStats: [
    { label: 'Metrik Geometri', value: 'Traversable Ellis-Bronnikov' },
    { label: 'Fluks Energi Eksotis', value: '-8.4 x 10^22 Joule' },
    { label: 'Destinasi Terhubung', value: 'Sektor Triangulum M33' },
  ],
};

// 16. Hyper-Speed Fighter Interceptor (Valkyrie-X)
let fighterGroup: THREE.Group | null = null;
let fighterHitMesh: THREE.Mesh | null = null;
let fighterPlumes: THREE.Mesh[] = [];
const fighterBody: CelestialBody = {
  id: 'ship-valkyrie',
  name: 'Valkyrie-X Interceptor',
  codeName: 'FIG-VALKYRIE/X',
  type: 'vessel',
  planetCategory: 'starfighter',
  tagline: 'Agile High-G Orbital Patrol Starfighter with Dual Afterburner Plumes',
  orbitRadius: 430,
  orbitSpeed: 0.22,
  baseRadius: 14,
  color: '#f97316',
  glowColor: 'rgba(249, 115, 22, 0.85)',
  accentColor: '#ea580c',
  initialAngle: 2.8,
  icon: 'solar:plain-bold',
  lore: 'Pesawat tempur interseptor berkecepatan hipersonik dengan bodi putih keramik dan aksen oranye terang. Bertugas melakukan patroli pertahanan cepat di sekitar sabuk dalam tata surya.',
  extraStats: [
    { label: 'Akselerasi Maks', value: '35 G (Inertial Damped)' },
    { label: 'Mesin Propulsi', value: 'Twin Turbo-Fusion Plumes' },
    { label: 'Persenjataan', value: 'Dual Plasma Cannons' },
  ],
};

// 17. Cosmic Diamond Shard (Astraea Crystalline Shard)
let crystalGroup: THREE.Group | null = null;
let crystalHitMesh: THREE.Mesh | null = null;
let crystalCoreGlow: THREE.Mesh | null = null;
const crystalBody: CelestialBody = {
  id: 'crystal-astraea',
  name: 'Astraea Cosmic Diamond',
  codeName: 'CRYSTAL-ASTRAEA/09',
  type: 'phenomenon',
  planetCategory: 'crystal',
  tagline: 'Gigantic Floating Faceted Interstellar Diamond with Refractive Energy Lattice',
  orbitRadius: 610,
  orbitSpeed: 0.068,
  baseRadius: 18,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.85)',
  accentColor: '#0284c7',
  initialAngle: 5.8,
  icon: 'solar:diamond-bold',
  lore: 'Pecahan kristal intan kosmik polikristalin raksasa berkilau yang melayang di ruang hampa tanpa bobot. Membiaskan dan memantulkan starlight menjadi prisma spektrum pelangi menyala.',
  extraStats: [
    { label: 'Karat Kristal', value: '10 Triliun Carat' },
    { label: 'Kekerasan Mohs', value: '10.5 (Hyper-Carbon)' },
    { label: 'Refraksi Indeks', value: '2.42 (Cahaya Spektral)' },
  ],
};

// 18. Orbital Cargo Skyhook (Bifrost Skyhook Depot)
let skyhookGroup: THREE.Group | null = null;
let skyhookHitMesh: THREE.Mesh | null = null;
const skyhookBody: CelestialBody = {
  id: 'station-bifrost',
  name: 'Bifrost Skyhook Depot',
  codeName: 'DEPOT-BIFROST/04',
  type: 'station',
  planetCategory: 'cargo-depot',
  tagline: 'Orbital Freight Transfer Platform, Industrial Crane Tower & Multicolored Pods',
  orbitRadius: 520,
  orbitSpeed: 0.076,
  baseRadius: 22,
  color: '#eab308',
  glowColor: 'rgba(234, 179, 8, 0.75)',
  accentColor: '#ca8a04',
  initialAngle: 2.8,
  icon: 'solar:box-minimalistic-bold',
  lore: 'Pusat logistik antariksa geostasioner yang memfasilitasi bongkar-muat kargo antar-planet. Dilengkapi gantri derek berat dan deretan kontainer bertekanan multi-warna.',
  extraStats: [
    { label: 'Kapasitas Kargo', value: '250.000 Metrik Ton' },
    { label: 'Dermaga Tambat', value: '8 Pylon Docking Clamps' },
    { label: 'Modul Penanganan', value: 'Magnetic Rail Gantry' },
  ],
};

// 19. Volcanic Magma Exoplanet (Pyro-Prime)
let magmaGroup: THREE.Group | null = null;
let magmaHitMesh: THREE.Mesh | null = null;
let magmaMesh: THREE.Mesh | null = null;
const magmaBody: CelestialBody = {
  id: 'exoplanet-pyro',
  name: 'Pyro-Prime Molten World',
  codeName: 'EXO-PYRO/MAGMA',
  type: 'phenomenon',
  planetCategory: 'magma-planet',
  tagline: 'Tidally Locked Volcanic Super-Earth with Glowing Magma Calderas',
  orbitRadius: 1120,
  orbitSpeed: 0,
  baseRadius: 28,
  color: '#ef4444',
  glowColor: 'rgba(239, 68, 68, 0.85)',
  accentColor: '#b91c1c',
  initialAngle: 0,
  icon: 'solar:flame-bold',
  lore: 'Eksoplanet vulkanik ekstrem yang terkunci secara gravitasi ke sumber panasnya. Seluruh permukaannya diselimuti sungai lava cair berpendar merah-oranye dan kepulan debu vulkanik pijar.',
  extraStats: [
    { label: 'Suhu Permukaan', value: '1.850°C (Lava Basalt)' },
    { label: 'Aktivitas Vulkanik', value: '1.200 Super-Gunung Berapi' },
    { label: 'Komposisi Kerak', value: 'Molten Iron & Silicates' },
  ],
};

// 20. Extreme Magnetar Anomaly (Magnetar SGR-1806)
let magnetarGroup: THREE.Group | null = null;
let magnetarHitMesh: THREE.Mesh | null = null;
let magnetarArcRings: THREE.Mesh[] = [];
const magnetarBody: CelestialBody = {
  id: 'magnetar-sgr',
  name: 'Magnetar SGR-1806',
  codeName: 'MAGNETAR-SGR/1806-20',
  type: 'phenomenon',
  planetCategory: 'magnetar',
  tagline: 'Cosmic Dynamo with Extreme Magnetic Arcs & High-Energy Gamma Pulses',
  orbitRadius: 1140,
  orbitSpeed: 0,
  baseRadius: 30,
  color: '#06b6d4',
  glowColor: 'rgba(6, 182, 212, 0.85)',
  accentColor: '#0891b2',
  initialAngle: 0,
  icon: 'solar:bolt-bold',
  lore: 'Bintang neutron dengan kekuatan medan magnet paling dahsyat di alam semesta (triliunan kali lebih kuat daripada medan magnet Bumi). Menghasilkan ledakan radiasi sinar gamma berkala.',
  extraStats: [
    { label: 'Kekuatan Medan Magnet', value: '10^15 Gauss' },
    { label: 'Energi Gempa Bintang', value: '10^39 Joule Pulse' },
    { label: 'Gravitasi Permukaan', value: '10^11 G' },
  ],
};

// 21. Sentinel Recon Drone Swarm (Sentinel Drone Array)
let droneGroup: THREE.Group | null = null;
let droneHitMesh: THREE.Mesh | null = null;
const droneBody: CelestialBody = {
  id: 'drone-sentinel',
  name: 'Sentinel Drone Swarm',
  codeName: 'DRONE-SWARM/TRIAD',
  type: 'vessel',
  planetCategory: 'drone-swarm',
  tagline: 'Autonomous Triangular Fleet of 3 Coordinated Reconnaissance Drones',
  orbitRadius: 710,
  orbitSpeed: 0.12,
  baseRadius: 15,
  color: '#10b981',
  glowColor: 'rgba(16, 185, 129, 0.75)',
  accentColor: '#059669',
  initialAngle: 1.8,
  icon: 'solar:shield-up-bold',
  lore: 'Tiga wahana pengintai nir-awak otonom yang terbang dalam formasi delta presisi. Menggunakan sensor fotonik inframerah dan radar pemindai untuk memantau keselamatan rute luar angkasa.',
  extraStats: [
    { label: 'Formasi Terbang', value: 'Delta Echelon' },
    { label: 'Koneksi Swarm', value: 'Quantum Entangled Mesh' },
    { label: 'Sensor Optik', value: 'Wide-Band Lidar' },
  ],
};

// 22. Golden Mining Asteroid Outpost (Asteroid Psyche-16)
let psycheGroup: THREE.Group | null = null;
let psycheHitMesh: THREE.Mesh | null = null;
let psycheBeaconMat: THREE.MeshBasicMaterial | null = null;
const psycheBody: CelestialBody = {
  id: 'asteroid-psyche',
  name: 'Psyche-16 Mining Outpost',
  codeName: 'AST-PSYCHE/16-MINING',
  type: 'station',
  planetCategory: 'mining-outpost',
  tagline: 'Heavy-Metal Asteroid Outpost with Automated Robotic Extraction Rig',
  orbitRadius: 540,
  orbitSpeed: 0.088,
  baseRadius: 20,
  color: '#eab308',
  glowColor: 'rgba(234, 179, 8, 0.75)',
  accentColor: '#ca8a04',
  initialAngle: 0.2,
  icon: 'solar:hammer-bold',
  lore: 'Asteroid inti logam masif kaya emas, nikel, dan platinum bernilai ribuan triliun dollar. Dilengkapi rig penambangan robotik otomatis dengan bor termal dan suar peringatan kuning berkedip.',
  extraStats: [
    { label: 'Komposisi Logam', value: '85% Besi, Nikel & Emas' },
    { label: 'Status Penambangan', value: 'Active Excavation' },
    { label: 'Produksi Harian', value: '450 Ton Ore Refinery' },
  ],
};

// 23. Hyperion Dyson Sol-Collector Swarm
let dysonGroup: THREE.Group | null = null;
let dysonHitMesh: THREE.Mesh | null = null;
let dysonRings: THREE.Mesh[] = [];
let dysonCoreMat: THREE.MeshBasicMaterial | null = null;
const dysonBody: CelestialBody = {
  id: 'dyson-hyperion',
  name: 'Hyperion Dyson Sol-Collector',
  codeName: 'MEGASTRUCTURE-DYSON/01',
  type: 'station',
  planetCategory: 'dyson-swarm',
  tagline: 'Type-II Megastructure Solar Ring with Photovoltaic Array & High-Energy Transmitter',
  orbitRadius: 1350,
  orbitSpeed: 0,
  baseRadius: 36,
  color: '#f59e0b',
  glowColor: 'rgba(245, 158, 11, 0.85)',
  accentColor: '#d97706',
  initialAngle: 0,
  icon: 'solar:sun-bold',
  lore: 'Megastruktur purwa-rupa Tipe-II yang dirancang untuk memanen energi radiasi bintang secara nirkabel. Dilengkapi piringan fotovoltaik raksasa dan pemancar gelombang mikro terkonsentrasi untuk mentransmisikan daya ke seluruh koloni luar angkasa.',
  extraStats: [
    { label: 'Daya Panen Foton', value: '3.8 × 10^26 Watts' },
    { label: 'Radius Cincin', value: '72 km Titanium Truss' },
    { label: 'Efisiensi Konversi', value: '99.4% Quantum Lattice' },
  ],
};

// 24. Glacio-7 Diamond Crystal World
let glacioGroup: THREE.Group | null = null;
let glacioHitMesh: THREE.Mesh | null = null;
let glacioCoreMesh: THREE.Mesh | null = null;
let glacioRings: THREE.Mesh[] = [];
let glacioShards: THREE.Mesh[] = [];
const glacioBody: CelestialBody = {
  id: 'exoplanet-glacio',
  name: 'Glacio-7 Diamond Crystal World',
  codeName: 'EXO-GLACIO/DIAMOND-7',
  type: 'phenomenon',
  planetCategory: 'ice-planet',
  tagline: 'Sub-Zero Diamond Planet with Hexagonal Crystalline Crust & Iridescent Ice Rings',
  orbitRadius: 1250,
  orbitSpeed: 0,
  baseRadius: 26,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.85)',
  accentColor: '#0284c7',
  initialAngle: 0,
  icon: 'solar:snowflake-bold',
  lore: 'Planet es ekstrem dengan suhu -218°C di mana karbon murni di bawah tekanan tektonik tinggi telah mengkristal menjadi mantel berlian padat. Cincin gandanya terbentuk dari jutaan kristal es metana yang membiaskan cahaya menjadi spektrum pelangi es yang memukau.',
  extraStats: [
    { label: 'Suhu Permukaan', value: '-218°C Cryogenic' },
    { label: 'Komposisi Mantel', value: '82% Crystalline Diamond' },
    { label: 'Indeks Refraksi', value: '2.42 Diamond Dispersion' },
  ],
};

// 25. Chronos Tachyon Hyper-Gateway
let chronosRiftGroup: THREE.Group | null = null;
let chronosRiftHitMesh: THREE.Mesh | null = null;
let chronosRiftRings: THREE.Mesh[] = [];
let chronosRiftVortex: THREE.Mesh | null = null;
const chronosRiftBody: CelestialBody = {
  id: 'rift-chronos',
  name: 'Chronos Tachyon Hyper-Gateway',
  codeName: 'GATEWAY-CHRONOS/TACHYON',
  type: 'station',
  planetCategory: 'hyper-gateway',
  tagline: 'Ancient Subspace Stargate with Contra-Rotating Quantum Stabilization Rings',
  orbitRadius: 1380,
  orbitSpeed: 0,
  baseRadius: 38,
  color: '#a855f7',
  glowColor: 'rgba(168, 85, 247, 0.85)',
  accentColor: '#7e22ce',
  initialAngle: 0,
  icon: 'solar:infinity-bold',
  lore: 'Gerbang lompatan hiperruang kuno peninggalan peradaban antariksa purba. Memanfaatkan partikel tachyon yang bergerak lebih cepat dari cahaya untuk membuka celah Einstein-Rosen yang menghubungkan galaksi secara instan tanpa distorsi relativitas waktu.',
  extraStats: [
    { label: 'Stabilitas Metrik', value: '99.98% Warp Metric' },
    { label: 'Frekuensi Tachyon', value: '14.28 Terahertz' },
    { label: 'Batas Jangkauan', value: 'Instant Antargalaksi' },
  ],
};

// 26. Zephyrus Monarch Gas Giant
let zephyrusGroup: THREE.Group | null = null;
let zephyrusHitMesh: THREE.Mesh | null = null;
let zephyrusMesh: THREE.Mesh | null = null;
let zephyrusMoons: THREE.Mesh[] = [];
const zephyrusBody: CelestialBody = {
  id: 'exoplanet-zephyrus',
  name: 'Zephyrus Monarch Gas Giant',
  codeName: 'EXO-ZEPHYRUS/MONARCH',
  type: 'phenomenon',
  planetCategory: 'gas-giant',
  tagline: 'Colossal Emerald Gas Giant with Supersonic Atmospheric Storm Belts & Shepherd Moons',
  orbitRadius: 1300,
  orbitSpeed: 0,
  baseRadius: 32,
  color: '#10b981',
  glowColor: 'rgba(16, 185, 129, 0.85)',
  accentColor: '#047857',
  initialAngle: 0,
  icon: 'solar:planet-bold',
  lore: 'Raksasa gas kolosal berukuran 3 kali lebih besar dari Jupiter. Atmosfernya tersusun dari hidrogen, helium, dan metana terionisasi yang menghasilkan pola sabuk awan zamrud yang megah dengan angin badai supersonik berkecepatan 2.450 km/jam.',
  extraStats: [
    { label: 'Diameter Khatulistiwa', value: '142.984 km (Super-Jovian)' },
    { label: 'Kecepatan Badai', value: '2.450 km/jam Supersonik' },
    { label: 'Sistem Satelit', value: '42 Bulan & 2 Shepherd Moons' },
  ],
};

// 27. Ancient Starlight Void Leviathan Fossil
let leviathanGroup: THREE.Group | null = null;
let leviathanHitMesh: THREE.Mesh | null = null;
let leviathanRibs: THREE.Mesh[] = [];
let leviathanHeart: THREE.Mesh | null = null;
const leviathanBody: CelestialBody = {
  id: 'leviathan-void',
  name: 'Ancient Void Leviathan Fossil',
  codeName: 'COSMIC-LEVIATHAN/ANCIENT',
  type: 'phenomenon',
  planetCategory: 'cosmic-organism',
  tagline:
    'Gigantic Biomechanical Starlight Leviathan Skeleton with Luminous Crystal Bones & Pulsing Heart',
  orbitRadius: 1500,
  orbitSpeed: 0,
  baseRadius: 42,
  color: '#00f0ff',
  glowColor: 'rgba(0, 240, 255, 0.85)',
  accentColor: '#0891b2',
  initialAngle: 0,
  icon: 'solar:bone-bold',
  lore: 'Fosil raksasa entitas kosmik purba sepanjang 180 meter yang melayang di kehampaan antarbintang. Tulang-tulang kristal fotoniknya masih memancarkan pendaran bioluminescent cyan-emerald, dengan batu inti jantung tachyon yang terus berdetak pelan.',
  extraStats: [
    { label: 'Panjang Kerangka', value: '180 Meter Fosil' },
    { label: 'Detak Jantung Inti', value: '12 BPM Tachyon Pulse' },
    { label: 'Resonansi Fotonik', value: 'Bioluminescent Cyan' },
  ],
};

// 28. Genesis Elysium Centrifugal Ringworld
let ringworldGroup: THREE.Group | null = null;
let ringworldHitMesh: THREE.Mesh | null = null;
let ringworldMesh: THREE.Mesh | null = null;
const ringworldBody: CelestialBody = {
  id: 'ringworld-elysium',
  name: 'Genesis Elysium Ringworld',
  codeName: 'HABITAT-ELYSIUM/RINGWORLD',
  type: 'station',
  planetCategory: 'ringworld-habitat',
  tagline: 'Artificial Centrifugal Megastructure with Terraformed Biosphere, Oceans & Spire Towers',
  orbitRadius: 1450,
  orbitSpeed: 0,
  baseRadius: 46,
  color: '#22c55e',
  glowColor: 'rgba(34, 197, 94, 0.85)',
  accentColor: '#15803d',
  initialAngle: 0,
  icon: 'solar:globus-bold',
  lore: 'Megastruktur cincin orbital buatan berputar sentrifugal yang menampung biosfer terraform mandiri. Permukaan dalamnya dihiasi lautan biru, daratan zamrud berhutan lebat, dan atmosfer bertekanan buatan yang ditahan dinding pembatas setinggi 20 km.',
  extraStats: [
    { label: 'Keliling Cincin', value: '280 km Diameter' },
    { label: 'Gravitasi Sentrifugal', value: '1.0 G (Earth Equivalent)' },
    { label: 'Kapasitas Populasi', value: '45 Juta Jiwa' },
  ],
};

// 29. Phoenix Protostellar Nursery & Relativistic Jets
let protostarGroup: THREE.Group | null = null;
let protostarHitMesh: THREE.Mesh | null = null;
let protostarJets: THREE.Mesh[] = [];
let protostarDisk: THREE.Mesh | null = null;
const protostarBody: CelestialBody = {
  id: 'protostar-phoenix',
  name: 'Phoenix Protostar & Bipolar Jets',
  codeName: 'PROTOSTAR-PHOENIX/EMBRYO',
  type: 'phenomenon',
  planetCategory: 'protostar',
  tagline:
    'Hyperactive Newborn Protostar with Relativistic Bipolar Plasma Ejection Jets & Accretion Spiral',
  orbitRadius: 1550,
  orbitSpeed: 0,
  baseRadius: 36,
  color: '#f97316',
  glowColor: 'rgba(249, 115, 22, 0.85)',
  accentColor: '#ea580c',
  initialAngle: 0,
  icon: 'solar:flame-bold',
  lore: 'Bintang bayi yang baru lahir di tengah kepompong gas plasma pijar bersuhu jutaan derajat. Dari kedua kutub rotasinya, terpancar dua berkas jet plasma relativistik sepanjang ribuan kilometer yang menyembur ke luar angkasa dengan kecepatan mendekati cahaya.',
  extraStats: [
    { label: 'Kecepatan Jet Polar', value: '0.85 c (Relativistik)' },
    { label: 'Suhu Inti Konveksi', value: '14.000.000 K' },
    { label: 'Fase Evolusi Bintang', value: 'T-Tauri Accretion' },
  ],
};

// 30. Tesseract Prime Hyperdimensional 4D Portal
let tesseractGroup: THREE.Group | null = null;
let tesseractHitMesh: THREE.Mesh | null = null;
let tesseractOuter: THREE.LineSegments | null = null;
let tesseractInner: THREE.LineSegments | null = null;
const tesseractBody: CelestialBody = {
  id: 'artifact-tesseract',
  name: 'Tesseract Prime 4D Hypercube',
  codeName: 'ARTIFACT-TESSERACT/4D',
  type: 'phenomenon',
  planetCategory: 'hyperdimensional',
  tagline:
    '4-Dimensional Quantum Hypercube Projection with Nested Tesseract Rotation & Spatial Rift',
  orbitRadius: 1420,
  orbitSpeed: 0,
  baseRadius: 34,
  color: '#d946ef',
  glowColor: 'rgba(217, 70, 239, 0.85)',
  accentColor: '#c026d3',
  initialAngle: 0,
  icon: 'solar:box-minimalistic-bold',
  lore: 'Artefak geometris 4-dimensi yang memproyeksikan wujud bayangan hiperkubus (Tesseract) ke dalam ruang 3-dimensi kita. Kubus luar dan kubus dalamnya saling berotasi dalam rotasi non-Euclidean yang membiaskan ruang dan waktu di sekitarnya.',
  extraStats: [
    { label: 'Dimensi Metrik', value: '4D Spatial Projection' },
    { label: 'Topologi Ruang', value: 'Non-Euclidean Manifold' },
    { label: 'Fluks Entropi', value: '-0.999 Quantum Inversion' },
  ],
};

// 31. Solaris Vulcan Heavy Asteroid Foundry
let vulcanGroup: THREE.Group | null = null;
let vulcanHitMesh: THREE.Mesh | null = null;
let vulcanCrucible: THREE.Mesh | null = null;
let vulcanCrucibleRings: THREE.Mesh[] = [];
const vulcanBody: CelestialBody = {
  id: 'foundry-vulcan',
  name: 'Solaris Vulcan Asteroid Foundry',
  codeName: 'FORGE-VULCAN/HEAVY-INDUSTRIAL',
  type: 'vessel',
  planetCategory: 'industrial-foundry',
  tagline:
    'Planetary-Scale Asteroid Smelting Foundry with Magnetic Induction Crucible & Heat Radiators',
  orbitRadius: 1480,
  orbitSpeed: 0,
  baseRadius: 40,
  color: '#ea580c',
  glowColor: 'rgba(234, 88, 12, 0.85)',
  accentColor: '#c2410c',
  initialAngle: 0,
  icon: 'solar:fire-bold',
  lore: 'Wahana pabrik peleburan asteroid raksasa berukuran kota. Menggunakan tungku induksi magnetik berkekuatan gigawatt untuk melelehkan asteroid mentah menjadi logam murni superpaduan yang digunakan membangun armada stasiun luar angkasa.',
  extraStats: [
    { label: 'Suhu Peleburan', value: '3.200°C Plasma Crucible' },
    { label: 'Keluaran Baja Logam', value: '12.000 Ton/Siklus' },
    { label: 'Daya Induksi', value: '8.4 Gigawatt Reaktor' },
  ],
};

// 32. Abyssal Dark Matter Crystal Cluster
let geodeGroup: THREE.Group | null = null;
let geodeHitMesh: THREE.Mesh | null = null;
let geodeNeedles: THREE.Mesh[] = [];
let geodeMicroSwarm: THREE.Mesh[] = [];
const geodeBody: CelestialBody = {
  id: 'crystal-geode',
  name: 'Abyssal Dark Matter Crystal Cluster',
  codeName: 'EXO-GEODE/DARK-CRYSTAL',
  type: 'phenomenon',
  planetCategory: 'dark-crystal',
  tagline:
    'Exotic Dark-Matter Crystalline Cluster with Gravitational Microlensing & Prismatic Needles',
  orbitRadius: 1520,
  orbitSpeed: 0,
  baseRadius: 36,
  color: '#8b5cf6',
  glowColor: 'rgba(139, 92, 246, 0.85)',
  accentColor: '#7c3aed',
  initialAngle: 0,
  icon: 'solar:magic-stick-3-bold',
  lore: 'Gugusan kristal materi gelap langka yang mencuat keluar dari asteroid obsidian. Jarum-jarum kristal prisma ungunya membelokkan cahaya bintang di sekitarnya dan memancarkan gelombang gravitasi mikro dengan kilatan pendaran ultraviolet.',
  extraStats: [
    { label: 'Komposisi Kristal', value: 'Stabilized Dark Matter' },
    { label: 'Pendaran Spektrum', value: 'Deep Ultraviolet 254nm' },
    { label: 'Distorsi Lensa', value: 'Microlensing Gravity Field' },
  ],
};

// 33. Crown of the Cosmic King (Mahkota Raja Kosmik)
let crownGroup: THREE.Group | null = null;
let crownHitMesh: THREE.Mesh | null = null;
let crownGems: THREE.Mesh[] = [];
let crownOrbitingGems: THREE.Mesh[] = [];
const crownBody: CelestialBody = {
  id: 'artifact-crown',
  name: 'Crown of the Cosmic King',
  codeName: 'ROYAL-CROWN/IMPERIAL',
  type: 'phenomenon',
  planetCategory: 'royal-artifact',
  tagline: 'Legendary 24K Stellar King Crown with Embedded Rubies, Velvet Dome & Starlight Aura',
  orbitRadius: 1350,
  orbitSpeed: 0,
  baseRadius: 32,
  color: '#eab308',
  glowColor: 'rgba(234, 179, 8, 0.85)',
  accentColor: '#ca8a04',
  initialAngle: 0,
  icon: 'solar:crown-bold',
  lore: 'Mahkota Raja Galaksi kuno yang hilang berabad-abad di kehampaan kosmis. Ditempa dari emas 24 karat murni bintang neutron dan bertatahkan batu permata ruby merah delima serta zamrud kosmik. Konon siapapun yang menemukannya dinobatkan sebagai penguasa kode antariksa tertinggi.',
  extraStats: [
    { label: 'Material Inti', value: 'Emas Murni 24K Bintang Neutron' },
    { label: 'Batu Permata', value: '5 Ruby Merah & Zamrud Kosmik' },
    { label: 'Aura Kerajaan', value: '9.999 Royalty Flux' },
  ],
};

// 34. Motor BeAT Karbu Antariksa (Interstellar BeAT Moped)
let beatGroup: THREE.Group | null = null;
let beatHitMesh: THREE.Mesh | null = null;
let beatWheels: THREE.Mesh[] = [];
let beatThrustFlame: THREE.Mesh | null = null;
const beatBody: CelestialBody = {
  id: 'vessel-beat',
  name: 'Motor BeAT Karbu Antariksa',
  codeName: 'MOPED-BEAT/WARP-110CC',
  type: 'vessel',
  planetCategory: 'interstellar-scooter',
  tagline: 'Legendary Earth Scooter Modified with eSP Warp Drive & Plasma Exhaust Jet',
  orbitRadius: 1280,
  orbitSpeed: 0,
  baseRadius: 28,
  color: '#0284c7',
  glowColor: 'rgba(2, 132, 199, 0.85)',
  accentColor: '#0369a1',
  initialAngle: 0,
  icon: 'solar:wheel-bold',
  lore: 'Motor BeAT Karbu biru legendaris asal Indonesia yang entah bagaimana berhasil menembus atmosfer bumi dan mengembara melintasi tata surya. Dilengkapi bodi Techno Blue Metallic sporty, knalpot racing pendorong plasma biru, dan efisiensi bahan bakar antargalaksi: 1 liter Pertalite cukup untuk menempuh 10.000 tahun cahaya.',
  extraStats: [
    { label: 'Warna Fairing', value: 'Techno Blue Metallic & White' },
    { label: 'Mesin Penggerak', value: '110cc SOHC eSP Warp Core' },
    { label: 'Bahan Bakar', value: 'Pertalite Murni Antariksa' },
    { label: 'Kecepatan Puncak', value: '12.000 c (Melebihi Cahaya)' },
    { label: 'Plat Nomor', value: 'B 4744 ANK (Cosmic Registry)' },
    { label: 'Pemilik', value: '???????????' },
  ],
};

// 35. Cyber Matrix Quantum Laptop (Developer Space Laptop)
let laptopGroup: THREE.Group | null = null;
let laptopHitMesh: THREE.Mesh | null = null;
let laptopScreenMesh: THREE.Mesh | null = null;
let laptopCompanionMouse: THREE.Mesh | null = null;
const laptopBody: CelestialBody = {
  id: 'artifact-laptop',
  name: 'Cyber Matrix Quantum Laptop',
  codeName: 'DEVICE-LAPTOP/QUANTUM-PRO',
  type: 'station',
  planetCategory: 'cybernetic-terminal',
  tagline: 'Zero-Gravity Developer Workstation Running Live Matrix Code & Vite Dev Server',
  orbitRadius: 1320,
  orbitSpeed: 0,
  baseRadius: 26,
  color: '#06b6d4',
  glowColor: 'rgba(6, 182, 212, 0.85)',
  accentColor: '#0891b2',
  initialAngle: 0,
  icon: 'solar:laptop-bold',
  lore: 'Laptop kerja portabel milik web engineer antariksa Anko yang melayang bebas di ruang gravitasi nol. Layar Retina holografiknya masih menyala menjalankan kompilasi TypeScript dan Vite Dev Server dengan 0 error di tengah kehampaan kosmis.',
  extraStats: [
    { label: 'Processor Core', value: 'Quantum M-Core 128-Core 8.4 GHz' },
    { label: 'Status Kompilasi', value: 'Vite Built in 0.04s (0 Errors)' },
    { label: 'Display', value: '16-inch Holographic Liquid Retina' },
    { label: 'Backlight Keyboard', value: 'RGB Cyber Cyan Chroma' },
  ],
};

// 36. Neptunia Prime Ocean World
let neptuniaGroup: THREE.Group | null = null;
let neptuniaHitMesh: THREE.Mesh | null = null;
let neptuniaMesh: THREE.Mesh | null = null;
let neptuniaMoons: THREE.Mesh[] = [];
const neptuniaBody: CelestialBody = {
  id: 'planet-neptunia',
  name: 'Neptunia Prime Ocean World',
  codeName: 'EXO-NEPTUNIA/SAPPHIRE',
  type: 'phenomenon',
  planetCategory: 'gas-giant',
  tagline: 'Deep Sapphire Oceanic Super-Jovian with Massive Iridescent Irradiated Rings',
  orbitRadius: 1460,
  orbitSpeed: 0,
  baseRadius: 40,
  color: '#3b82f6',
  glowColor: 'rgba(59, 130, 246, 0.85)',
  accentColor: '#1d4ed8',
  initialAngle: 0,
  icon: 'solar:planet-bold',
  lore: 'Raksasa samudera biru safir dengan kedalaman laut atmosferik ribuan kilometer. Dikelilingi oleh cincin es raksasa yang membiaskan cahaya bintang menjadi warna pelangi keemasan dan biru laut yang memesona.',
  extraStats: [
    { label: 'Diameter Cincin', value: '320.000 km Iridescent Ring' },
    { label: 'Kedalaman Samudera', value: '18.400 km Super-Fluid' },
    { label: 'Suhu Atmosfer', value: '-145°C Cryogenic Methane' },
  ],
};

// 37. Voyager Prime Interstellar Probe
let voyagerGroup: THREE.Group | null = null;
let voyagerHitMesh: THREE.Mesh | null = null;
let voyagerGoldenRecord: THREE.Mesh | null = null;
let voyagerBeacon: THREE.Mesh | null = null;
const voyagerBody: CelestialBody = {
  id: 'probe-voyager',
  name: 'Voyager Prime Interstellar Probe',
  codeName: 'PROBE-VOYAGER/GOLDEN-RECORD',
  type: 'vessel',
  planetCategory: 'deep-space-probe',
  tagline: 'Pioneer Deep-Space Explorer Carrying The Golden Record & Phonograph Message',
  orbitRadius: 1540,
  orbitSpeed: 0,
  baseRadius: 34,
  color: '#f59e0b',
  glowColor: 'rgba(245, 158, 11, 0.85)',
  accentColor: '#d97706',
  initialAngle: 0,
  icon: 'solar:satellite-bold',
  lore: 'Wahana penjelajah antarbintang legendaris pembawa pesan perdamaian dari Bumi. Di sisinya terpasang Piringan Emas (Golden Record) berlapis emas murni yang berisi salam dalam 55 bahasa manusia dan suara-suara alam semesta.',
  extraStats: [
    { label: 'Piringan Emas', value: 'The Sounds of Earth Phonograph' },
    { label: 'Sumber Tenaga', value: 'Plutonium-238 RTG Generator' },
    { label: 'Jarak Jelajah', value: '24 Miliar Kilometer dari Bumi' },
  ],
};

// 38. Cangkir Kopi Kosmik Tubruk (Infinite Developer Fuel)
let coffeeGroup: THREE.Group | null = null;
let coffeeHitMesh: THREE.Mesh | null = null;
let coffeeDroplets: THREE.Mesh[] = [];
let coffeeSteam: THREE.Mesh[] = [];
const coffeeBody: CelestialBody = {
  id: 'artifact-coffee',
  name: 'Cangkir Kopi Kosmik Tubruk',
  codeName: 'COFFEE-MUG/INFINITE-CAFFEINE',
  type: 'phenomenon',
  planetCategory: 'cosmic-artifact',
  tagline: 'Legendary Zero-G Astronaut Coffee Mug Radiating Infinite Steam & Caffeine Energy',
  orbitRadius: 1300,
  orbitSpeed: 0,
  baseRadius: 24,
  color: '#f59e0b',
  glowColor: 'rgba(245, 158, 11, 0.85)',
  accentColor: '#d97706',
  initialAngle: 0,
  icon: 'solar:cup-bold',
  lore: 'Cangkir kopi tubruk legendaris milik web engineer antariksa Anko yang melayang abadi di ruang gravitasi nol. Cairan kafein kuantumnya tidak pernah dingin dan terus memancarkan aroma kopi segar untuk menyuplai energi lembur coding antargalaksi.',
  extraStats: [
    { label: 'Suhu Kopi', value: '85°C Abadi (Zero-G Steam)' },
    { label: 'Kadar Kafein', value: '99.9% Quantum Espresso' },
    { label: 'Status Suplai', value: 'Unlimited Developer Fuel' },
  ],
};

// 39. Cosmic Stratocaster Electric Guitar (Celestial Rock Guitar)
let guitarGroup: THREE.Group | null = null;
let guitarHitMesh: THREE.Mesh | null = null;
let guitarWaveRings: THREE.Mesh[] = [];
const guitarBody: CelestialBody = {
  id: 'artifact-guitar',
  name: 'Cosmic Stratocaster Guitar',
  codeName: 'GUITAR-STRAT/CELESTIAL-ROCK',
  type: 'phenomenon',
  planetCategory: 'musical-artifact',
  tagline: 'Legendary Electric Guitar Drifting in Deep Space Emitting Cosmic Harmonic Rhythms',
  orbitRadius: 1380,
  orbitSpeed: 0,
  baseRadius: 30,
  color: '#ec4899',
  glowColor: 'rgba(236, 72, 153, 0.85)',
  accentColor: '#db2777',
  initialAngle: 0,
  icon: 'solar:music-note-2-bold',
  lore: 'Gitar listrik legendaris yang mengembara di ruang hampa antarbintang. Senar-senar fotoniknya memetik sendiri harmoni frekuensi kosmik yang menggetarkan nebula di sekitarnya dengan melodi rock antargalaksi.',
  extraStats: [
    { label: 'Tipe Senar', value: '6 Harmonic Tachyon Strings' },
    { label: 'Output Frekuensi', value: '440 Hz Stellar Rock Overdrive' },
    { label: 'Body Finish', value: 'Nebula Sunburst Lacquer' },
  ],
};

// 40. Cosmic Golden Maneki-Neko (Lucky Cat of Prosperity)
let nekoGroup: THREE.Group | null = null;
let nekoHitMesh: THREE.Mesh | null = null;
let nekoWavingArm: THREE.Group | null = null;
let nekoSparkles: THREE.Mesh[] = [];
const nekoBody: CelestialBody = {
  id: 'artifact-neko',
  name: 'Cosmic Golden Maneki-Neko',
  codeName: 'STATUE-NEKO/LUCKY-CAT',
  type: 'station',
  planetCategory: 'prosperity-artifact',
  tagline: '24K Solar Gold Lucky Cat Waving Its Paw to Ward Off Bugs & Bring Good Fortune',
  orbitRadius: 1440,
  orbitSpeed: 0,
  baseRadius: 32,
  color: '#eab308',
  glowColor: 'rgba(234, 179, 8, 0.85)',
  accentColor: '#ca8a04',
  initialAngle: 0,
  icon: 'solar:cat-bold',
  lore: 'Patung kucing pembawa keberuntungan (Maneki-Neko) kosmik raksasa yang ditempa dari emas murni surya. Tangannya terus melambai ritmis di gravitasi nol untuk mengusir bug, menarik rezeki proyek freelance, dan menjaga stabilitas ekosistem antariksa.',
  extraStats: [
    { label: 'Status Lambaian', value: 'Paw Waving Active (Fortune +9999)' },
    { label: 'Kutukan Bug', value: '0% Protected (Bug Repellent)' },
    { label: 'Koin Emas', value: '10.000.000 Ryo Starlight Gold' },
  ],
};

// Pointer / Touch tracking for click vs drag
let isPointerDown = false;
let pointerDownPos = { x: 0, y: 0 };
let pointerDownTime = 0;
let lastSelectTime = 0;

/* =========================================================
   PROCEDURAL IN-MEMORY TEXTURE GENERATORS (0 MB Download!)
   ========================================================= */

// Sun Texture: Hot white spots and convective turbulent flares
const createSunTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#ff4400');
  grad.addColorStop(0.3, '#ffaa00');
  grad.addColorStop(0.5, '#fef08a');
  grad.addColorStop(0.7, '#ffaa00');
  grad.addColorStop(1, '#ff3300');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Surface convection cells
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = Math.random() * 30 + 10;
    const cellGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
    cellGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    cellGrad.addColorStop(0.5, 'rgba(254, 240, 138, 0.25)');
    cellGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = cellGrad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

// Gas Giant Texture: Horizontal bands with wavy turbulence & storm spot
const createGasGiantTexture = (
  base: string,
  darkBand: string,
  lightBand: string,
): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 256);

  // Wavy horizontal bands
  const bands = 14;
  for (let i = 0; i < bands; i++) {
    const y = (i * 256) / bands;
    const h = 256 / bands;
    ctx.fillStyle = i % 2 === 0 ? darkBand : lightBand;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 16) {
      const wave = Math.sin((x / 512) * Math.PI * 6 + i) * 3;
      ctx.lineTo(x, y + wave);
    }
    ctx.lineTo(512, y + h);
    ctx.lineTo(0, y + h);
    ctx.closePath();
    ctx.fill();
  }

  // Giant storm spot
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.ellipse(320, 160, 45, 22, 0.1, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

// Terrestrial Texture: Continents & white swirling clouds
const createTerrestrialTexture = (ocean: string, land: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, 512, 256);

  // Continents
  ctx.fillStyle = land;
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 200 + 28;
    const r = Math.random() * 45 + 20;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cloud swirls
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let j = 0; j < 12; j++) {
    const cx = Math.random() * 512;
    const cy = Math.random() * 256;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 65, 14, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

// Cyber Matrix Texture: Glowing coordinate grid wireframe
const createCyberTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050c1e';
  ctx.fillRect(0, 0, 512, 256);

  // Latitude and longitude glowing grid
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }
  for (let y = 0; y <= 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Glowing circuit nodes
  ctx.fillStyle = '#ffffff';
  for (let n = 0; n < 30; n++) {
    const nx = Math.floor(Math.random() * 16) * 32;
    const ny = Math.floor(Math.random() * 8) * 32;
    ctx.beginPath();
    ctx.arc(nx, ny, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

// Cryo Ice Texture: Polar caps and glacial ridges
const createIceTexture = (base: string, darkBlue: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = darkBlue;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = base;
  ctx.fillRect(0, 30, 512, 196);

  // Polar caps
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 38);
  ctx.fillRect(0, 218, 512, 38);

  // Glacial fractures
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 256);
    ctx.lineTo(Math.random() * 512, Math.random() * 256);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

// Desert Texture: Terracotta with dunes and crater dots
const createDesertTexture = (base: string, dark: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = dark;
  for (let i = 0; i < 35; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = Math.random() * 12 + 4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

// Ring Texture with Cassini Gap
const createRingTexture = (ringColor: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'transparent');
  grad.addColorStop(0.15, ringColor);
  grad.addColorStop(0.55, ringColor);
  grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.95)'); // Cassini division
  grad.addColorStop(0.62, ringColor);
  grad.addColorStop(0.95, ringColor);
  grad.addColorStop(1, 'transparent');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 32);

  return new THREE.CanvasTexture(canvas);
};

// Radiant Sunburst Corona Flare Sprite (Additive Blending)
const createCoronaSprite = (): THREE.Sprite => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255, 255, 220, 0.95)');
  grad.addColorStop(0.2, 'rgba(255, 180, 20, 0.7)');
  grad.addColorStop(0.5, 'rgba(255, 90, 0, 0.3)');
  grad.addColorStop(0.8, 'rgba(255, 30, 0, 0.08)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(160, 160, 1);
  return sprite;
};

// Deep Space Cosmic Nebula Generator
// Generates ethereal, soft, natural cosmic gas clouds that smoothly fade to 0 at edges.
// Strictly avoids solid backgrounds or high alphas so it NEVER causes whiteout or blinding glow!
const createCosmicNebulaTexture = (hue1: string, hue2: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 512, 512);

  // Soft organic gas puffs centered in the canvas
  const puffs = [
    { ox: 0, oy: 0, r: 180, c: hue1, a: 0.28 },
    { ox: -55, oy: 40, r: 145, c: hue2, a: 0.22 },
    { ox: 60, oy: -35, r: 155, c: hue1, a: 0.2 },
    { ox: -45, oy: -55, r: 130, c: hue2, a: 0.18 },
    { ox: 50, oy: 55, r: 135, c: hue1, a: 0.18 },
    { ox: 0, oy: 75, r: 115, c: hue2, a: 0.15 },
    { ox: -75, oy: 0, r: 110, c: hue1, a: 0.15 },
    { ox: 70, oy: 15, r: 105, c: hue2, a: 0.14 },
    { ox: -25, oy: 60, r: 100, c: hue1, a: 0.14 },
    { ox: 30, oy: -65, r: 95, c: hue2, a: 0.12 },
  ];

  for (const p of puffs) {
    const cx = 256 + p.ox;
    const cy = 256 + p.oy;
    const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, p.r);
    grad.addColorStop(0, p.c.replace(/[\d.]+\)$/, `${p.a})`));
    grad.addColorStop(0.45, p.c.replace(/[\d.]+\)$/, `${(p.a * 0.38).toFixed(2)})`));
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft micro stardust points embedded inside the nebula
  for (let s = 0; s < 38; s++) {
    const sx = 256 + (Math.random() - 0.5) * 260;
    const sy = 256 + (Math.random() - 0.5) * 260;
    const sr = Math.random() * 1.8 + 0.6;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
};

// Landmark Astrophotography 4-Point Cross Diffraction Flare Texture
const createCrossFlareTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 256);

  // Horizontal Spike
  const hGrad = ctx.createLinearGradient(0, 128, 256, 128);
  hGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  hGrad.addColorStop(0.42, 'rgba(56, 189, 248, 0.45)');
  hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  hGrad.addColorStop(0.58, 'rgba(56, 189, 248, 0.45)');
  hGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hGrad;
  ctx.fillRect(0, 126, 256, 4);

  // Vertical Spike
  const vGrad = ctx.createLinearGradient(128, 0, 128, 256);
  vGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vGrad.addColorStop(0.42, 'rgba(56, 189, 248, 0.45)');
  vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  vGrad.addColorStop(0.58, 'rgba(56, 189, 248, 0.45)');
  vGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = vGrad;
  ctx.fillRect(126, 0, 4, 256);

  // Radiant Glowing Core
  const coreGrad = ctx.createRadialGradient(128, 128, 2, 128, 128, 48);
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  coreGrad.addColorStop(0.2, 'rgba(165, 243, 252, 0.75)');
  coreGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.25)');
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(128, 128, 48, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
};

// Photorealistic In-Memory Procedural Starlight & Cosmic Dust Particle Textures
// Produces authentic spherical starlight discs with smooth anti-aliased edges (100% round, 0% square)
// Uses generateMipmaps = false & LinearFilter so particles remain solid, bright, and clearly visible at any camera distance!
let sharedStarlightTexture: THREE.CanvasTexture | null = null;
let sharedCosmicDustTexture: THREE.CanvasTexture | null = null;

const getCircularStarlightTexture = (): THREE.CanvasTexture => {
  if (!sharedStarlightTexture) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 64, 64);

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.55, 'rgba(255, 255, 255, 1.0)'); // Solid brilliant core
    grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.85)'); // Bright aura
    grad.addColorStop(0.96, 'rgba(255, 255, 255, 0.25)'); // Anti-aliased circle edge
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)'); // 0 at corner (no square quad)

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    sharedStarlightTexture = new THREE.CanvasTexture(canvas);
    sharedStarlightTexture.generateMipmaps = false;
    sharedStarlightTexture.minFilter = THREE.LinearFilter;
    sharedStarlightTexture.magFilter = THREE.LinearFilter;
  }
  return sharedStarlightTexture;
};

const getCosmicDustParticleTexture = (): THREE.CanvasTexture => {
  if (!sharedCosmicDustTexture) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 64, 64);

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 1.0)'); // 100% solid circular disc!
    grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.85)'); // Bright starlight halo
    grad.addColorStop(0.98, 'rgba(255, 255, 255, 0.20)'); // Anti-aliased round edge
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)'); // Zero at corners (100% round!)

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    sharedCosmicDustTexture = new THREE.CanvasTexture(canvas);
    sharedCosmicDustTexture.generateMipmaps = false;
    sharedCosmicDustTexture.minFilter = THREE.LinearFilter;
    sharedCosmicDustTexture.magFilter = THREE.LinearFilter;
  }
  return sharedCosmicDustTexture;
};

// Globular Star Cluster Generator (Pleiades / Omega Centauri)
const createStarCluster = (
  count: number,
  center: THREE.Vector3,
  radius: number,
  colors: THREE.Color[],
): THREE.Points => {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colArray = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const r = radius * Math.pow(u, 2);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = center.x + r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = center.y + r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = center.z + r * Math.cos(phi);

    const c = colors[Math.floor(Math.random() * colors.length)];
    colArray[i * 3] = c.r;
    colArray[i * 3 + 1] = c.g;
    colArray[i * 3 + 2] = c.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

  const mat = new THREE.PointsMaterial({
    size: 3.4,
    map: getCircularStarlightTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });

  return new THREE.Points(geo, mat);
};

/* =========================================================
   3D BUILDERS FOR OUTER SPACE PHENOMENA & CRAFT
   ========================================================= */

// 1. UFO / Alien Scout Ship Builder
const buildUFOShip = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere (invisible, generous size for smooth raycast click & hover)
  const hitGeo = new THREE.SphereGeometry(24, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  ufoHitMesh = new THREE.Mesh(hitGeo, hitMat);
  ufoHitMesh.userData = { body: ufoBody };
  group.add(ufoHitMesh);

  // Saucer Lower Hull
  const lowerGeo = new THREE.CylinderGeometry(18, 5, 3.5, 32);
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9, // Gleaming polished platinum chrome!
    metalness: 0.95,
    roughness: 0.15,
  });
  const lowerHull = new THREE.Mesh(lowerGeo, hullMat);
  lowerHull.position.y = -1.5;
  lowerHull.userData = { body: ufoBody };
  group.add(lowerHull);

  // Saucer Upper Hull Rim
  const upperGeo = new THREE.CylinderGeometry(12, 18, 2.5, 32);
  const upperHull = new THREE.Mesh(upperGeo, hullMat);
  upperHull.position.y = 1.2;
  upperHull.userData = { body: ufoBody };
  group.add(upperHull);

  // Central Glowing Energy Rim
  const rimGeo = new THREE.TorusGeometry(18.2, 0.6, 16, 48);
  const rimMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.rotation.x = Math.PI / 2;
  group.add(rimMesh);

  // Glowing Cockpit Dome
  const domeGeo = new THREE.SphereGeometry(7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const domeMat = new THREE.MeshStandardMaterial({
    color: 0x34d399,
    emissive: 0x10b981,
    emissiveIntensity: 0.85,
    metalness: 0.1,
    roughness: 0.1,
    transparent: true,
    opacity: 0.9,
  });
  const dome = new THREE.Mesh(domeGeo, domeMat);
  dome.position.y = 2.4;
  dome.userData = { body: ufoBody };
  group.add(dome);

  // Rotating Perimeter Propulsion Lights
  ufoLightsRing = new THREE.Group();
  const lightGeo = new THREE.SphereGeometry(0.9, 12, 12);
  const lightMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const lightMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  for (let i = 0; i < 8; i++) {
    const lMesh = new THREE.Mesh(lightGeo, i % 2 === 0 ? lightMat1 : lightMat2);
    const ang = (i / 8) * Math.PI * 2;
    lMesh.position.set(Math.cos(ang) * 17.5, 0, Math.sin(ang) * 17.5);
    ufoLightsRing.add(lMesh);
  }
  group.add(ufoLightsRing);

  // Semi-transparent Tractor Beam Cone
  const beamGeo = new THREE.ConeGeometry(22, 50, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  ufoTractorBeam = new THREE.Mesh(beamGeo, beamMat);
  ufoTractorBeam.position.y = -26;
  group.add(ufoTractorBeam);

  return group;
};

// 2. Orbital Space Station Builder (Aegis Outpost-1)
const buildSpaceStation = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(34, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  stationHitMesh = new THREE.Mesh(hitGeo, hitMat);
  stationHitMesh.userData = { body: stationBody };
  group.add(stationHitMesh);

  // Materials
  const stationMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.75,
    roughness: 0.3,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.35,
  });
  const solarMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    emissive: 0x172554,
    metalness: 0.9,
    roughness: 0.2,
  });

  // Central Core Spindle
  const coreGeo = new THREE.CylinderGeometry(4.5, 4.5, 42, 16);
  const coreMesh = new THREE.Mesh(coreGeo, darkMetalMat);
  coreMesh.userData = { body: stationBody };
  group.add(coreMesh);

  // Central Core End Caps
  const capGeo = new THREE.SphereGeometry(5.2, 16, 16);
  const cap1 = new THREE.Mesh(capGeo, stationMat);
  cap1.position.y = 21;
  const cap2 = new THREE.Mesh(capGeo, stationMat);
  cap2.position.y = -21;
  group.add(cap1);
  group.add(cap2);

  // Rotating Habitat Ring Assembly
  stationHabitatRing = new THREE.Group();
  const torusGeo = new THREE.TorusGeometry(26, 2.6, 16, 48);
  const torusMesh = new THREE.Mesh(torusGeo, stationMat);
  torusMesh.rotation.x = Math.PI / 2;
  torusMesh.userData = { body: stationBody };
  stationHabitatRing.add(torusMesh);

  // 4 Habitat Spokes
  const spokeGeo = new THREE.CylinderGeometry(0.8, 0.8, 26, 8);
  for (let s = 0; s < 4; s++) {
    const spoke = new THREE.Mesh(spokeGeo, darkMetalMat);
    spoke.rotation.z = Math.PI / 2;
    spoke.rotation.y = (s * Math.PI) / 2;
    spoke.translateX(13);
    stationHabitatRing.add(spoke);
  }
  group.add(stationHabitatRing);

  // 4 Solar Array Wings
  const panelGeo = new THREE.BoxGeometry(32, 0.6, 8);
  const panelOffsets = [
    { x: 26, y: 14, z: 0 },
    { x: -26, y: 14, z: 0 },
    { x: 26, y: -14, z: 0 },
    { x: -26, y: -14, z: 0 },
  ];
  for (const pos of panelOffsets) {
    const panel = new THREE.Mesh(panelGeo, solarMat);
    panel.position.set(pos.x, pos.y, pos.z);
    group.add(panel);
  }

  // Communication Dish on Angled Boom
  const dishGeo = new THREE.CylinderGeometry(7, 1.5, 3, 24, 1, true);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dish = new THREE.Mesh(dishGeo, dishMat);
  dish.position.set(0, 26, 6);
  dish.rotation.x = Math.PI / 4;
  group.add(dish);

  // Navigation Strobe LEDs
  stationStrobes.length = 0;
  const strobeGeo = new THREE.SphereGeometry(0.8, 8, 8);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const greenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  stationStrobes.push(redMat, greenMat);

  const strobeR = new THREE.Mesh(strobeGeo, redMat);
  strobeR.position.set(42, 14, 0);
  const strobeG = new THREE.Mesh(strobeGeo, greenMat);
  strobeG.position.set(-42, 14, 0);
  group.add(strobeR);
  group.add(strobeG);

  return group;
};

// 3. Deep Space Exploration Cruiser Builder (Starship Hermes-IV)
const buildStarshipCruiser = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(32, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  starshipHitMesh = new THREE.Mesh(hitGeo, hitMat);
  starshipHitMesh.userData = { body: starshipBody };
  group.add(starshipHitMesh);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // Pristine sci-fi ceramic white hull!
    metalness: 0.55,
    roughness: 0.25,
  });
  const darkAlloy = new THREE.MeshStandardMaterial({
    color: 0x0284c7, // Vibrant cobalt space trim!
    metalness: 0.8,
    roughness: 0.2,
  });
  const glowCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  // Main Fuselage (Wedge Arrowhead)
  const bodyGeo = new THREE.BoxGeometry(12, 6, 36);
  const body = new THREE.Mesh(bodyGeo, hullMat);
  body.userData = { body: starshipBody };
  group.add(body);

  // Forward Nose Cone (Tapered Wedge)
  const noseGeo = new THREE.ConeGeometry(7, 18, 4);
  const nose = new THREE.Mesh(noseGeo, hullMat);
  nose.rotation.y = Math.PI / 4;
  nose.rotation.x = Math.PI / 2;
  nose.position.z = 26;
  nose.userData = { body: starshipBody };
  group.add(nose);

  // Command Bridge Island
  const bridgeGeo = new THREE.BoxGeometry(6, 3, 10);
  const bridge = new THREE.Mesh(bridgeGeo, darkAlloy);
  bridge.position.set(0, 4, 2);
  group.add(bridge);

  // Cockpit Visor Glow
  const visorGeo = new THREE.BoxGeometry(5.2, 1.2, 2);
  const visor = new THREE.Mesh(visorGeo, glowCyan);
  visor.position.set(0, 4.2, 6.5);
  group.add(visor);

  // Twin Outrigger Engine Nacelles & Dual Plumes
  starshipPlumes.length = 0;
  const nacelleGeo = new THREE.CylinderGeometry(3.2, 3.2, 28, 16);
  const nacelleOffsets = [-10, 10];
  for (const ox of nacelleOffsets) {
    const nacelle = new THREE.Mesh(nacelleGeo, darkAlloy);
    nacelle.rotation.x = Math.PI / 2;
    nacelle.position.set(ox, 0, -4);
    group.add(nacelle);

    // Connecting Wing Pylon
    const pylonGeo = new THREE.BoxGeometry(5, 1, 12);
    const pylon = new THREE.Mesh(pylonGeo, hullMat);
    pylon.position.set(ox * 0.5, 0, -2);
    group.add(pylon);

    // Engine Ion Exhaust Plume
    const plumeGeo = new THREE.ConeGeometry(2.8, 18, 16, 1, true);
    const plumeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const plume = new THREE.Mesh(plumeGeo, plumeMat);
    plume.rotation.x = -Math.PI / 2;
    plume.position.set(ox, 0, -26);
    group.add(plume);
    starshipPlumes.push(plume);
  }

  return group;
};

// 4. Micro-Singularity Black Hole Builder (Gargantua-X)
const buildBlackHole = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(880, 240, -820);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(65, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  blackHoleHitMesh = new THREE.Mesh(hitGeo, hitMat);
  blackHoleHitMesh.userData = { body: blackHoleBody };
  group.add(blackHoleHitMesh);

  // Event Horizon (Absolute Pitch Black Void)
  const sphereGeo = new THREE.SphereGeometry(22, 32, 32);
  const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const eventHorizon = new THREE.Mesh(sphereGeo, voidMat);
  eventHorizon.userData = { body: blackHoleBody };
  group.add(eventHorizon);

  // Gravitational Photon Sphere
  const photonGeo = new THREE.SphereGeometry(22.8, 32, 32);
  const photonMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
  });
  const photonSphere = new THREE.Mesh(photonGeo, photonMat);
  group.add(photonSphere);

  // Procedural Swirling Accretion Disk Texture
  const accCanvas = document.createElement('canvas');
  accCanvas.width = 512;
  accCanvas.height = 512;
  const ctx = accCanvas.getContext('2d')!;
  ctx.clearRect(0, 0, 512, 512);

  const grad = ctx.createRadialGradient(256, 256, 80, 256, 256, 250);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  grad.addColorStop(0.15, 'rgba(254, 240, 138, 0.85)');
  grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.65)');
  grad.addColorStop(0.7, 'rgba(217, 70, 239, 0.35)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Swirl streaks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  for (let a = 0; a < 36; a++) {
    const angle = (a / 36) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(256, 256, 120 + Math.sin(a) * 40, angle, angle + 0.4);
    ctx.stroke();
  }

  const accTexture = new THREE.CanvasTexture(accCanvas);

  // Main Accretion Disk (Tilted at 35 degrees)
  const diskGeo = new THREE.RingGeometry(25, 78, 64);
  const diskMat = new THREE.MeshBasicMaterial({
    map: accTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  blackHoleAccretion = new THREE.Mesh(diskGeo, diskMat);
  blackHoleAccretion.rotation.x = Math.PI / 2.5;
  blackHoleAccretion.rotation.y = 0.25;
  group.add(blackHoleAccretion);

  // Vertical Lensing Halo (Interstellar curved distortion arc)
  const lensGeo = new THREE.RingGeometry(24, 72, 64);
  const lensMat = new THREE.MeshBasicMaterial({
    map: accTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  blackHoleLensing = new THREE.Mesh(lensGeo, lensMat);
  blackHoleLensing.rotation.y = Math.PI / 2.2;
  group.add(blackHoleLensing);

  return group;
};

// 5. Pulsar / High-Energy Neutron Star Builder (PSR-0950)
const buildPulsar = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-860, 320, 780);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(50, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  pulsarHitMesh = new THREE.Mesh(hitGeo, hitMat);
  pulsarHitMesh.userData = { body: pulsarBody };
  group.add(pulsarHitMesh);

  // Core Neutron Star
  const coreGeo = new THREE.SphereGeometry(12, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.userData = { body: pulsarBody };
  group.add(core);

  // High-Energy Plasma Atmosphere Halo
  const haloGeo = new THREE.SphereGeometry(16, 24, 24);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.5,
    wireframe: true,
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  group.add(halo);

  // Twin Relativistic Plasma Jets (North & South Poles)
  pulsarJetsGroup = new THREE.Group();
  const jetGeo = new THREE.ConeGeometry(12, 160, 24, 1, true);
  const jetMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const jetNorth = new THREE.Mesh(jetGeo, jetMat);
  jetNorth.position.y = 86;
  pulsarJetsGroup.add(jetNorth);

  const jetSouth = new THREE.Mesh(jetGeo, jetMat);
  jetSouth.rotation.x = Math.PI;
  jetSouth.position.y = -86;
  pulsarJetsGroup.add(jetSouth);

  group.add(pulsarJetsGroup);

  return group;
};

// 6. Deep Space Communications Satellite Builder (Chronos Relay)
const buildSatelliteProbe = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(22, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  satelliteHitMesh = new THREE.Mesh(hitGeo, hitMat);
  satelliteHitMesh.userData = { body: satelliteBody };
  group.add(satelliteHitMesh);

  // Parabolic Gold Reflector Dish
  const dishGeo = new THREE.CylinderGeometry(12, 2.5, 4.5, 24, 1, true);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15,
    side: THREE.DoubleSide,
  });
  const dish = new THREE.Mesh(dishGeo, goldMat);
  dish.rotation.x = Math.PI / 2;
  dish.userData = { body: satelliteBody };
  group.add(dish);

  // Central Feed Horn Boom
  const boomGeo = new THREE.CylinderGeometry(0.5, 0.5, 9, 8);
  const boomMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.2,
  });
  const boom = new THREE.Mesh(boomGeo, boomMat);
  boom.rotation.x = Math.PI / 2;
  boom.position.z = 5;
  group.add(boom);

  // Blinking Quantum Beacon LED
  const beaconGeo = new THREE.SphereGeometry(0.9, 12, 12);
  satelliteBeaconMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const beacon = new THREE.Mesh(beaconGeo, satelliteBeaconMat);
  beacon.position.z = 9.8;
  group.add(beacon);

  // Main Electronics Bus
  const busGeo = new THREE.CylinderGeometry(5.5, 5.5, 8, 6);
  const busMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.3,
  });
  const bus = new THREE.Mesh(busGeo, busMat);
  bus.rotation.x = Math.PI / 2;
  bus.position.z = -5.5;
  group.add(bus);

  // RTG Power Boom & Cask
  const rtgGeo = new THREE.CylinderGeometry(0.6, 0.6, 18, 8);
  const rtg = new THREE.Mesh(rtgGeo, boomMat);
  rtg.rotation.z = Math.PI / 2;
  rtg.position.set(0, 0, -6);
  group.add(rtg);

  const caskGeo = new THREE.CylinderGeometry(1.5, 1.5, 4, 8);
  const cask = new THREE.Mesh(caskGeo, busMat);
  cask.position.set(10, 0, -6);
  group.add(cask);

  return group;
};

// 7. Ringed Alien Exoplanet Builder (Kepler-452b)
const buildExoplanetKepler = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(36, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  exoplanetHitMesh = new THREE.Mesh(hitGeo, hitMat);
  exoplanetHitMesh.userData = { body: exoplanetBody };
  group.add(exoplanetHitMesh);

  // Exoplanet Sphere (Bioluminescent Oceans & Clouds)
  const planetGeo = new THREE.SphereGeometry(18, 32, 32);
  const planetMat = new THREE.MeshStandardMaterial({
    map: createTerrestrialTexture('#083344', '#06b6d4'),
    roughness: 0.45,
    metalness: 0.15,
  });
  exoplanetMesh = new THREE.Mesh(planetGeo, planetMat);
  exoplanetMesh.userData = { body: exoplanetBody };
  group.add(exoplanetMesh);

  // Dual Glowing Ice Rings
  const ring1Geo = new THREE.RingGeometry(24, 34, 64);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  group.add(ring1);

  const ring2Geo = new THREE.RingGeometry(37, 45, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x0891b2,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = Math.PI / 3;
  group.add(ring2);

  // Miniature Orbiting Moon
  const moonGeo = new THREE.SphereGeometry(3.5, 16, 16);
  const moonMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  exoplanetMoon = new THREE.Mesh(moonGeo, moonMat);
  group.add(exoplanetMoon);

  return group;
};

// 8. JWST Deep Space Infrared Observatory Builder
const buildJWSTelescope = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(28, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  jwstHitMesh = new THREE.Mesh(hitGeo, hitMat);
  jwstHitMesh.userData = { body: jwstBody };
  group.add(jwstHitMesh);

  // 5-Layer Sunshield Base (Kite Shape)
  const shieldGeo = new THREE.BoxGeometry(32, 0.4, 18);
  const shieldMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.2,
  });
  const shield = new THREE.Mesh(shieldGeo, shieldMat);
  shield.rotation.x = 0.2;
  shield.userData = { body: jwstBody };
  group.add(shield);

  // Golden Hexagonal Primary Mirror Array
  const mirrorGeo = new THREE.CylinderGeometry(11, 11, 1.2, 6);
  const goldMirrorMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.98,
    roughness: 0.1,
  });
  const primaryMirror = new THREE.Mesh(mirrorGeo, goldMirrorMat);
  primaryMirror.rotation.x = Math.PI / 2 + 0.2;
  primaryMirror.position.set(0, 4, -2);
  primaryMirror.userData = { body: jwstBody };
  group.add(primaryMirror);

  // Secondary Mirror Tripod Boom & Reflector
  const boomGeo = new THREE.CylinderGeometry(0.3, 0.3, 14, 6);
  const darkBoomMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.3,
  });
  const tripodAngles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];
  for (const a of tripodAngles) {
    const boom = new THREE.Mesh(boomGeo, darkBoomMat);
    boom.position.set(Math.cos(a) * 6, 7, Math.sin(a) * 6 - 2);
    boom.rotation.x = 0.45;
    boom.rotation.z = Math.sin(a) * 0.4;
    group.add(boom);
  }

  // Small Secondary Mirror
  const secGeo = new THREE.CylinderGeometry(2, 2, 0.5, 6);
  const secMirror = new THREE.Mesh(secGeo, goldMirrorMat);
  secMirror.position.set(0, 12, 4);
  group.add(secMirror);

  return group;
};

// 9. Helix Eye Supernova Remnant / Planetary Nebula Core Builder
const buildHelixEyeNebula = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-920, -260, -720);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(65, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  helixHitMesh = new THREE.Mesh(hitGeo, hitMat);
  helixHitMesh.userData = { body: helixBody };
  group.add(helixHitMesh);

  // Core White Dwarf Star
  const dwarfGeo = new THREE.SphereGeometry(8, 24, 24);
  const dwarfMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const whiteDwarf = new THREE.Mesh(dwarfGeo, dwarfMat);
  whiteDwarf.userData = { body: helixBody };
  group.add(whiteDwarf);

  // Radiant Starlight Corona
  const coronaGeo = new THREE.SphereGeometry(14, 16, 16);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.6,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const corona = new THREE.Mesh(coronaGeo, coronaMat);
  group.add(corona);

  // Concentric Multi-Ring Ionized Gas Shells
  helixRings.length = 0;
  const shellConfigs = [
    { inner: 16, outer: 34, color: 0x06b6d4, opacity: 0.55 },
    { inner: 32, outer: 54, color: 0x10b981, opacity: 0.45 },
    { inner: 52, outer: 80, color: 0xec4899, opacity: 0.4 },
    { inner: 76, outer: 98, color: 0x9333ea, opacity: 0.3 },
  ];

  for (const sc of shellConfigs) {
    const ringGeo = new THREE.RingGeometry(sc.inner, sc.outer, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: sc.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: sc.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    ring.rotation.y = 0.2;
    group.add(ring);
    helixRings.push(ring);
  }

  return group;
};

// 10. Titan Alien Mothership Builder (Vanguard Titan)
const buildTitanMothership = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(450, 350, 850);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(65, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  mothershipHitMesh = new THREE.Mesh(hitGeo, hitMat);
  mothershipHitMesh.userData = { body: mothershipBody };
  group.add(mothershipHitMesh);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0, // Radiant silver titanium dreadnought hull!
    metalness: 0.88,
    roughness: 0.2,
  });

  // Massive Chevron Flagship Hull
  const mainHullGeo = new THREE.ConeGeometry(24, 68, 4);
  const mainHull = new THREE.Mesh(mainHullGeo, hullMat);
  mainHull.rotation.x = Math.PI / 2;
  mainHull.scale.set(1.4, 1.0, 0.4);
  mainHull.userData = { body: mothershipBody };
  group.add(mainHull);

  // Central Subspace Singularity Reactor Core
  const coreGeo = new THREE.SphereGeometry(7.5, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.9,
  });
  mothershipCoreGlow = new THREE.Mesh(coreGeo, coreMat);
  group.add(mothershipCoreGlow);

  // 4 Docked Frigate Escorts on Hull Pylons
  const frigateGeo = new THREE.ConeGeometry(3, 9, 3);
  const frigateOffsets = [
    { x: 18, z: 8 },
    { x: -18, z: 8 },
    { x: 14, z: -14 },
    { x: -14, z: -14 },
  ];
  for (const pos of frigateOffsets) {
    const frigate = new THREE.Mesh(frigateGeo, hullMat);
    frigate.position.set(pos.x, 3, pos.z);
    frigate.rotation.x = Math.PI / 2;
    group.add(frigate);
  }

  return group;
};

// 11. Crystal Monolith Builder (Xenolith Prime)
const buildCrystalMonolith = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(24, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  monolithHitMesh = new THREE.Mesh(hitGeo, hitMat);
  monolithHitMesh.userData = { body: monolithBody };
  group.add(monolithHitMesh);

  // Perfect 1:4:9 Obsidian Slab
  const slabGeo = new THREE.BoxGeometry(4, 16, 36);
  const obsidianMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.98,
    roughness: 0.05,
  });
  const slab = new THREE.Mesh(slabGeo, obsidianMat);
  slab.userData = { body: monolithBody };
  group.add(slab);

  // Glowing Holographic Quantum Glyphs Wireframe
  const glyphGeo = new THREE.BoxGeometry(4.2, 16.2, 36.2);
  monolithGlyphMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
  });
  const glyphs = new THREE.Mesh(glyphGeo, monolithGlyphMat);
  group.add(glyphs);

  return group;
};

// 12. Interstellar Visitor Asteroid ('Oumuamua)
const buildOumuamua = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(22, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  oumuamuaHitMesh = new THREE.Mesh(hitGeo, hitMat);
  oumuamuaHitMesh.userData = { body: oumuamuaBody };
  group.add(oumuamuaHitMesh);

  // Elongated Tumbling Cigar Asteroid
  const rockGeo = new THREE.CylinderGeometry(2.4, 4.2, 28, 8);
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0x9f1239,
    roughness: 0.92,
    metalness: 0.1,
    flatShading: true,
  });
  const rock = new THREE.Mesh(rockGeo, rockMat);
  rock.rotation.z = Math.PI / 4;
  rock.userData = { body: oumuamuaBody };
  group.add(rock);

  return group;
};

// 13. LightSail Photonic Deep Space Probe Builder
const buildLightSail = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(24, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  lightsailHitMesh = new THREE.Mesh(hitGeo, hitMat);
  lightsailHitMesh.userData = { body: lightsailBody };
  group.add(lightsailHitMesh);

  // Giant Diamond Reflective Sail (Rotated 45 degrees)
  const sailGeo = new THREE.PlaneGeometry(26, 26);
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xa5f3fc,
    metalness: 0.96,
    roughness: 0.08,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  lightsailSailMesh = new THREE.Mesh(sailGeo, sailMat);
  lightsailSailMesh.rotation.z = Math.PI / 4;
  lightsailSailMesh.userData = { body: lightsailBody };
  group.add(lightsailSailMesh);

  // 4 Carbon Truss Booms
  const boomGeo = new THREE.CylinderGeometry(0.35, 0.35, 36, 6);
  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.3,
  });
  const boom1 = new THREE.Mesh(boomGeo, carbonMat);
  group.add(boom1);

  const boom2 = new THREE.Mesh(boomGeo, carbonMat);
  boom2.rotation.z = Math.PI / 2;
  group.add(boom2);

  // Central Micro-Satellite Bus
  const busGeo = new THREE.BoxGeometry(3.5, 3.5, 3.5);
  const busMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.9,
    roughness: 0.2,
  });
  const bus = new THREE.Mesh(busGeo, busMat);
  group.add(bus);

  return group;
};

// 14. Sirius Binary Star System Builder
const buildBinaryStars = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-1050, -180, 480);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(60, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  binaryHitMesh = new THREE.Mesh(hitGeo, hitMat);
  binaryHitMesh.userData = { body: binaryBody };
  group.add(binaryHitMesh);

  // Star A: Fiery Orange Giant
  const starAGeo = new THREE.SphereGeometry(18, 32, 32);
  const starAMat = new THREE.MeshBasicMaterial({ map: createSunTexture() });
  binaryStarA = new THREE.Mesh(starAGeo, starAMat);
  binaryStarA.position.set(-24, 0, 0);
  binaryStarA.userData = { body: binaryBody };
  group.add(binaryStarA);

  // Star B: Brilliant Cyan White Dwarf
  const starBGeo = new THREE.SphereGeometry(7, 24, 24);
  const starBMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
  binaryStarB = new THREE.Mesh(starBGeo, starBMat);
  binaryStarB.position.set(32, 0, 0);
  binaryStarB.userData = { body: binaryBody };
  group.add(binaryStarB);

  // Connecting Plasma Streamer Bridge
  const streamPoints = [
    new THREE.Vector3(-14, 0, 0),
    new THREE.Vector3(0, 4, 3),
    new THREE.Vector3(25, 0, 0),
  ];
  const streamGeo = new THREE.BufferGeometry().setFromPoints(streamPoints);
  const streamMat = new THREE.LineBasicMaterial({
    color: 0xfde047,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });
  binaryStreamer = new THREE.Line(streamGeo, streamMat);
  group.add(binaryStreamer);

  return group;
};

// 15. Wormhole / Einstein-Rosen Bridge Builder (Vortex Artemis-X)
const buildWormholeVortex = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-680, 380, -650);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(65, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  wormholeHitMesh = new THREE.Mesh(hitGeo, hitMat);
  wormholeHitMesh.userData = { body: wormholeBody };
  group.add(wormholeHitMesh);

  // Concentric Counter-Rotating Spacetime Funnel Rings
  wormholeRings.length = 0;
  const ringConfigs = [
    { inner: 15, outer: 26, color: 0x38bdf8, opacity: 0.85 },
    { inner: 27, outer: 42, color: 0xa855f7, opacity: 0.7 },
    { inner: 44, outer: 65, color: 0xec4899, opacity: 0.55 },
    { inner: 68, outer: 90, color: 0x06b6d4, opacity: 0.35 },
  ];

  for (const rc of ringConfigs) {
    const rGeo = new THREE.RingGeometry(rc.inner, rc.outer, 64);
    const rMat = new THREE.MeshBasicMaterial({
      color: rc.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: rc.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const rMesh = new THREE.Mesh(rGeo, rMat);
    rMesh.rotation.x = Math.PI / 2.6;
    group.add(rMesh);
    wormholeRings.push(rMesh);
  }

  // Central Event Throat Void
  const throatGeo = new THREE.SphereGeometry(14, 24, 24);
  const throatMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const throat = new THREE.Mesh(throatGeo, throatMat);
  throat.userData = { body: wormholeBody };
  group.add(throat);

  return group;
};

// 16. Hyper-Speed Fighter Interceptor Builder (Valkyrie-X)
const buildValkyrieFighter = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(22, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  fighterHitMesh = new THREE.Mesh(hitGeo, hitMat);
  fighterHitMesh.userData = { body: fighterBody };
  group.add(fighterHitMesh);

  // Materials: Gleaming White & Hazard Orange
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.4,
    roughness: 0.2,
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    metalness: 0.7,
    roughness: 0.25,
  });
  const canopyMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

  // Fuselage Body
  const bodyGeo = new THREE.ConeGeometry(3.5, 22, 4);
  const body = new THREE.Mesh(bodyGeo, whiteMat);
  body.rotation.y = Math.PI / 4;
  body.rotation.x = Math.PI / 2;
  body.userData = { body: fighterBody };
  group.add(body);

  // Cockpit Canopy
  const canopyGeo = new THREE.BoxGeometry(2.4, 1.8, 6);
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.set(0, 1.5, 3);
  group.add(canopy);

  // Swept-Back Delta Wings (Orange)
  const wingGeo = new THREE.BoxGeometry(22, 0.4, 10);
  const wings = new THREE.Mesh(wingGeo, orangeMat);
  wings.position.set(0, 0, -2);
  group.add(wings);

  // Twin Afterburner Exhaust Plumes
  fighterPlumes.length = 0;
  const plumeGeo = new THREE.ConeGeometry(1.8, 14, 12, 1, true);
  const plumeMat = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const pOffsets = [-3.5, 3.5];
  for (const px of pOffsets) {
    const plume = new THREE.Mesh(plumeGeo, plumeMat);
    plume.rotation.x = -Math.PI / 2;
    plume.position.set(px, 0, -16);
    group.add(plume);
    fighterPlumes.push(plume);
  }

  return group;
};

// 17. Cosmic Diamond Shard Builder (Astraea Crystalline Shard)
const buildCosmicCrystal = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(26, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  crystalHitMesh = new THREE.Mesh(hitGeo, hitMat);
  crystalHitMesh.userData = { body: crystalBody };
  group.add(crystalHitMesh);

  // Faceted Interstellar Diamond
  const diamondGeo = new THREE.OctahedronGeometry(16, 1);
  const diamondMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.75,
  });
  const diamond = new THREE.Mesh(diamondGeo, diamondMat);
  diamond.userData = { body: crystalBody };
  group.add(diamond);

  // Shimmering Holographic Lattice Wireframe
  const wireGeo = new THREE.OctahedronGeometry(16.5, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  group.add(wire);

  // Pulsing Core Radiance
  const coreGeo = new THREE.SphereGeometry(6, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });
  crystalCoreGlow = new THREE.Mesh(coreGeo, coreMat);
  group.add(crystalCoreGlow);

  return group;
};

// 18. Orbital Cargo Skyhook Builder (Bifrost Skyhook Depot)
const buildBifrostSkyhook = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(32, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  skyhookHitMesh = new THREE.Mesh(hitGeo, hitMat);
  skyhookHitMesh.userData = { body: skyhookBody };
  group.add(skyhookHitMesh);

  const trussMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.8,
    roughness: 0.3,
  });

  // Central Vertical Tether Spire
  const spireGeo = new THREE.CylinderGeometry(2, 2, 50, 8);
  const spire = new THREE.Mesh(spireGeo, trussMat);
  spire.userData = { body: skyhookBody };
  group.add(spire);

  // Horizontal Gantry Crane Truss
  const gantryGeo = new THREE.BoxGeometry(36, 2, 4);
  const gantry = new THREE.Mesh(gantryGeo, trussMat);
  gantry.position.y = 8;
  group.add(gantry);

  // Multi-colored Pressurized Cargo Containers
  const podColors = [0x38bdf8, 0xf59e0b, 0xef4444, 0x10b981];
  const podGeo = new THREE.BoxGeometry(5, 4, 7);
  for (let p = 0; p < 4; p++) {
    const pMat = new THREE.MeshStandardMaterial({ color: podColors[p], roughness: 0.4 });
    const pod = new THREE.Mesh(podGeo, pMat);
    pod.position.set(-12 + p * 8, 4, p % 2 === 0 ? 3 : -3);
    group.add(pod);
  }

  // Blinking Docking Beacons
  const bGeo = new THREE.SphereGeometry(0.8, 8, 8);
  const bMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const b1 = new THREE.Mesh(bGeo, bMat);
  b1.position.set(18, 9, 0);
  const b2 = new THREE.Mesh(bGeo, bMat);
  b2.position.set(-18, 9, 0);
  group.add(b1);
  group.add(b2);

  return group;
};

// 19. Volcanic Magma Exoplanet Builder (Pyro-Prime)
const buildMagmaExoplanet = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(980, -220, 620);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  magmaHitMesh = new THREE.Mesh(hitGeo, hitMat);
  magmaHitMesh.userData = { body: magmaBody };
  group.add(magmaHitMesh);

  // Procedural Magma Texture
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#1c1917'; // Dark basalt rock
  ctx.fillRect(0, 0, 512, 256);

  // Glowing Lava Rivers & Calderas
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  for (let r = 0; r < 24; r++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * 512, Math.random() * 256);
    ctx.bezierCurveTo(
      Math.random() * 512,
      Math.random() * 256,
      Math.random() * 512,
      Math.random() * 256,
      Math.random() * 512,
      Math.random() * 256,
    );
    ctx.stroke();
  }
  // Yellow hot spots
  ctx.fillStyle = '#fde047';
  for (let h = 0; h < 20; h++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 8 + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const magmaTex = new THREE.CanvasTexture(canvas);
  magmaTex.wrapS = THREE.RepeatWrapping;

  const sphereGeo = new THREE.SphereGeometry(22, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    map: magmaTex,
    emissive: 0x991b1b,
    emissiveIntensity: 0.65,
    roughness: 0.8,
  });
  magmaMesh = new THREE.Mesh(sphereGeo, sphereMat);
  magmaMesh.userData = { body: magmaBody };
  group.add(magmaMesh);

  // Red Thermal Atmosphere Aura
  const auraGeo = new THREE.SphereGeometry(26, 24, 24);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  group.add(aura);

  return group;
};

// 20. Extreme Magnetar Anomaly Builder (Magnetar SGR-1806)
const buildMagnetar = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-520, -360, 920);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  magnetarHitMesh = new THREE.Mesh(hitGeo, hitMat);
  magnetarHitMesh.userData = { body: magnetarBody };
  group.add(magnetarHitMesh);

  // Dense Magnetic Core
  const coreGeo = new THREE.SphereGeometry(10, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.userData = { body: magnetarBody };
  group.add(core);

  // Extreme Toroidal Magnetic Arc Cages
  magnetarArcRings.length = 0;
  const cageRadii = [18, 28, 38];
  const arcColors = [0x00f0ff, 0x38bdf8, 0xa855f7];
  for (let c = 0; c < 3; c++) {
    const tGeo = new THREE.TorusGeometry(cageRadii[c], 0.6, 12, 36);
    const tMat = new THREE.MeshBasicMaterial({
      color: arcColors[c],
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const torus = new THREE.Mesh(tGeo, tMat);
    torus.rotation.x = (c * Math.PI) / 3;
    torus.rotation.y = (c * Math.PI) / 4;
    group.add(torus);
    magnetarArcRings.push(torus);
  }

  return group;
};

// 21. Sentinel Recon Drone Swarm Builder (Sentinel Drone Array)
const buildSentinelDrones = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(26, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  droneHitMesh = new THREE.Mesh(hitGeo, hitMat);
  droneHitMesh.userData = { body: droneBody };
  group.add(droneHitMesh);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.9,
    roughness: 0.2,
  });
  const sensorMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

  // 3 Triangular Formation Drones
  const droneOffsets = [
    { x: 0, y: 0, z: 8 },
    { x: -10, y: 3, z: -8 },
    { x: 10, y: -3, z: -8 },
  ];

  for (const d of droneOffsets) {
    const dGroup = new THREE.Group();
    dGroup.position.set(d.x, d.y, d.z);

    // Delta wing probe
    const pGeo = new THREE.ConeGeometry(3, 8, 3);
    const probe = new THREE.Mesh(pGeo, hullMat);
    probe.rotation.x = Math.PI / 2;
    probe.userData = { body: droneBody };
    dGroup.add(probe);

    // Glowing Sensor Lens Eye
    const eyeGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const eye = new THREE.Mesh(eyeGeo, sensorMat);
    eye.position.set(0, 0, 4.2);
    dGroup.add(eye);

    group.add(dGroup);
  }

  return group;
};

// 22. Golden Mining Asteroid Outpost Builder (Asteroid Psyche-16)
const buildPsycheMiningAsteroid = (): THREE.Group => {
  const group = new THREE.Group();

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(30, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  psycheHitMesh = new THREE.Mesh(hitGeo, hitMat);
  psycheHitMesh.userData = { body: psycheBody };
  group.add(psycheHitMesh);

  // Craggy Metallic Gold Asteroid
  const astGeo = new THREE.DodecahedronGeometry(15, 1);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.25,
    flatShading: true,
  });
  const asteroid = new THREE.Mesh(astGeo, goldMat);
  asteroid.userData = { body: psycheBody };
  group.add(asteroid);

  // Industrial Robotic Refinery Rig Mounted on Surface
  const rigGeo = new THREE.BoxGeometry(8, 6, 8);
  const rigMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.8,
    roughness: 0.3,
  });
  const rig = new THREE.Mesh(rigGeo, rigMat);
  rig.position.set(0, 14, 0);
  group.add(rig);

  // Blinking Amber Mining Warning Beacon
  const bGeo = new THREE.SphereGeometry(1.2, 8, 8);
  psycheBeaconMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const beacon = new THREE.Mesh(bGeo, psycheBeaconMat);
  beacon.position.set(0, 18, 0);
  group.add(beacon);

  return group;
};

// 23. Hyperion Dyson Sol-Collector Swarm Builder
const buildDysonSwarm = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-1050, 480, -880);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  dysonHitMesh = new THREE.Mesh(hitGeo, hitMat);
  dysonHitMesh.userData = { body: dysonBody };
  group.add(dysonHitMesh);

  // Outer Golden Truss Ring
  const ringGeo = new THREE.TorusGeometry(36, 1.2, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.85,
    roughness: 0.25,
  });
  const mainRing = new THREE.Mesh(ringGeo, ringMat);
  mainRing.rotation.x = Math.PI / 2;
  group.add(mainRing);
  dysonRings.push(mainRing);

  // 8 Photovoltaic Solar Sail Panels arranged radially
  const panelGeo = new THREE.BoxGeometry(14, 0.6, 6);
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x78350f,
    emissiveIntensity: 0.4,
  });
  for (let i = 0; i < 8; i++) {
    const pAngle = (i * Math.PI * 2) / 8;
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.set(Math.cos(pAngle) * 36, 0, Math.sin(pAngle) * 36);
    panel.rotation.y = -pAngle;
    group.add(panel);
  }

  // Central Glowing Dynamo Generator Core
  const coreGeo = new THREE.SphereGeometry(10, 24, 24);
  dysonCoreMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const core = new THREE.Mesh(coreGeo, dysonCoreMat);
  core.userData = { body: dysonBody };
  group.add(core);

  // Radiant Golden Corona Ring
  const coronaGeo = new THREE.RingGeometry(11, 16, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const corona = new THREE.Mesh(coronaGeo, coronaMat);
  corona.rotation.x = Math.PI / 2;
  group.add(corona);

  // Vertical Concentrated Energy Transfer Laser Beam
  const beamGeo = new THREE.CylinderGeometry(0.8, 0.8, 90, 16);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  group.add(beam);

  return group;
};

// 24. Glacio-7 Diamond Crystal World Builder
const buildGlacioPlanet = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-950, -420, 680);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(38, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  glacioHitMesh = new THREE.Mesh(hitGeo, hitMat);
  glacioHitMesh.userData = { body: glacioBody };
  group.add(glacioHitMesh);

  // Faceted Diamond Icosahedron Core
  const coreGeo = new THREE.IcosahedronGeometry(20, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.1,
    metalness: 0.6,
    flatShading: true,
  });
  glacioCoreMesh = new THREE.Mesh(coreGeo, coreMat);
  glacioCoreMesh.userData = { body: glacioBody };
  group.add(glacioCoreMesh);

  // Prismatic Atmospheric Shell
  const atmoGeo = new THREE.SphereGeometry(23, 24, 24);
  const atmoMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.28,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const atmo = new THREE.Mesh(atmoGeo, atmoMat);
  group.add(atmo);

  // Concentric Iridescent Ice Crystal Rings
  glacioRings.length = 0;
  const ringGeo1 = new THREE.RingGeometry(28, 38, 48);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  ring1.rotation.y = 0.2;
  group.add(ring1);
  glacioRings.push(ring1);

  const ringGeo2 = new THREE.RingGeometry(41, 48, 48);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = 0.2;
  group.add(ring2);
  glacioRings.push(ring2);

  // 4 Orbiting Tumbling Crystal Shards
  glacioShards.length = 0;
  const shardGeo = new THREE.OctahedronGeometry(2.5, 0);
  const shardMat = new THREE.MeshStandardMaterial({
    color: 0xe0f2fe,
    metalness: 0.8,
    roughness: 0.1,
  });
  for (let s = 0; s < 4; s++) {
    const shard = new THREE.Mesh(shardGeo, shardMat);
    group.add(shard);
    glacioShards.push(shard);
  }

  return group;
};

// 25. Chronos Tachyon Hyper-Gateway Builder
const buildChronosGateway = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(1180, -460, 880);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  chronosRiftHitMesh = new THREE.Mesh(hitGeo, hitMat);
  chronosRiftHitMesh.userData = { body: chronosRiftBody };
  group.add(chronosRiftHitMesh);

  // 3 Concentric Contra-Rotating Rings
  chronosRiftRings.length = 0;
  const ringRadii = [36, 26, 16];
  const ringColors = [0x7c3aed, 0x06b6d4, 0xec4899];

  for (let r = 0; r < 3; r++) {
    const rGeo = new THREE.TorusGeometry(ringRadii[r], 1.2, 16, 48);
    const rMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: ringColors[r],
      emissiveIntensity: 0.6,
    });
    const ringMesh = new THREE.Mesh(rGeo, rMat);
    ringMesh.rotation.x = (r * Math.PI) / 4;
    ringMesh.rotation.y = (r * Math.PI) / 6;
    group.add(ringMesh);
    chronosRiftRings.push(ringMesh);
  }

  // Central Tachyon Vortex Disk
  const vortexGeo = new THREE.CircleGeometry(14, 32);
  const vortexMat = new THREE.MeshBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  chronosRiftVortex = new THREE.Mesh(vortexGeo, vortexMat);
  group.add(chronosRiftVortex);

  // 4 Quantum Pylons mounted around outer perimeter
  const pylonGeo = new THREE.ConeGeometry(2.5, 16, 4);
  const pylonMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.2,
  });
  const tipMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

  for (let p = 0; p < 4; p++) {
    const angle = (p * Math.PI) / 2;
    const pylon = new THREE.Mesh(pylonGeo, pylonMat);
    pylon.position.set(Math.cos(angle) * 42, Math.sin(angle) * 42, 0);
    pylon.rotation.z = angle - Math.PI / 2;
    group.add(pylon);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(1.2, 8, 8), tipMat);
    tip.position.set(Math.cos(angle) * 50, Math.sin(angle) * 50, 0);
    group.add(tip);
  }

  return group;
};

// 26. Zephyrus Monarch Gas Giant Builder
const buildZephyrusGasGiant = (): THREE.Group => {
  const group = new THREE.Group();
  // Repositioned away from Gargantua-X into the far eastern open sector
  group.position.set(1420, 260, 180);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  zephyrusHitMesh = new THREE.Mesh(hitGeo, hitMat);
  zephyrusHitMesh.userData = { body: zephyrusBody };
  group.add(zephyrusHitMesh);

  // Procedural Gas Giant Banded Texture (Emerald, Teal, Azure, Golden Haze)
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const bands = [
    '#064e3b',
    '#047857',
    '#059669',
    '#10b981',
    '#34d399',
    '#0f766e',
    '#14b8a6',
    '#2dd4bf',
    '#0284c7',
    '#0369a1',
    '#065f46',
    '#047857',
    '#10b981',
    '#f59e0b',
    '#064e3b',
  ];
  for (let b = 0; b < bands.length; b++) {
    ctx.fillStyle = bands[b];
    ctx.fillRect(0, (b * 256) / bands.length, 512, 256 / bands.length + 1);
  }

  // Swirling Great Emerald Storm Eye
  ctx.fillStyle = '#6ee7b7';
  ctx.beginPath();
  ctx.ellipse(320, 175, 45, 22, 0.1, 0, Math.PI * 2);
  ctx.fill();

  const zephyrusTex = new THREE.CanvasTexture(canvas);
  zephyrusTex.wrapS = THREE.RepeatWrapping;

  const sphereGeo = new THREE.SphereGeometry(28, 36, 36);
  const sphereMat = new THREE.MeshStandardMaterial({
    map: zephyrusTex,
    roughness: 0.75,
    metalness: 0.15,
  });
  zephyrusMesh = new THREE.Mesh(sphereGeo, sphereMat);
  zephyrusMesh.userData = { body: zephyrusBody };
  group.add(zephyrusMesh);

  // Translucent Planetary Ring
  const ringGeo = new THREE.RingGeometry(38, 62, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x6ee7b7,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.6;
  ring.rotation.y = 0.15;
  group.add(ring);

  // 2 Shepherd Moons
  zephyrusMoons.length = 0;
  const moonMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.8 });
  const moon1 = new THREE.Mesh(new THREE.SphereGeometry(2.0, 12, 12), moonMat);
  const moon2 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 12), moonMat);
  group.add(moon1);
  group.add(moon2);
  zephyrusMoons.push(moon1, moon2);

  return group;
};

// 27. Ancient Starlight Void Leviathan Fossil Builder
const buildVoidLeviathan = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-1400, 520, 350);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(50, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  leviathanHitMesh = new THREE.Mesh(hitGeo, hitMat);
  leviathanHitMesh.userData = { body: leviathanBody };
  group.add(leviathanHitMesh);

  // Bioluminescent Bone Material
  const boneMat = new THREE.MeshStandardMaterial({
    color: 0x67e8f9,
    emissive: 0x0891b2,
    emissiveIntensity: 0.5,
    metalness: 0.3,
    roughness: 0.3,
  });

  // Curved Spinal Vertebra Segment (10 nodes)
  leviathanRibs.length = 0;
  for (let v = 0; v < 10; v++) {
    const zPos = (v - 5) * 12;
    const vertGeo = new THREE.CylinderGeometry(2.5, 3.0, 8, 8);
    const vert = new THREE.Mesh(vertGeo, boneMat);
    vert.position.set(0, Math.sin(v * 0.5) * 4, zPos);
    vert.rotation.x = Math.PI / 2;
    vert.userData = { body: leviathanBody };
    group.add(vert);

    // Left and Right Rib Arches
    const ribGeo = new THREE.TorusGeometry(12 - v * 0.6, 0.9, 8, 24, Math.PI * 0.85);
    const leftRib = new THREE.Mesh(ribGeo, boneMat);
    leftRib.position.set(-4, Math.sin(v * 0.5) * 4, zPos);
    leftRib.rotation.y = Math.PI / 2;
    leftRib.rotation.z = 0.3;
    group.add(leftRib);
    leviathanRibs.push(leftRib);

    const rightRib = new THREE.Mesh(ribGeo, boneMat);
    rightRib.position.set(4, Math.sin(v * 0.5) * 4, zPos);
    rightRib.rotation.y = -Math.PI / 2;
    rightRib.rotation.z = -0.3;
    group.add(rightRib);
    leviathanRibs.push(rightRib);
  }

  // Pulsing Tachyon Heart Core
  const heartGeo = new THREE.DodecahedronGeometry(7, 0);
  const heartMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
  });
  leviathanHeart = new THREE.Mesh(heartGeo, heartMat);
  leviathanHeart.position.set(0, 2, -5);
  leviathanHeart.userData = { body: leviathanBody };
  group.add(leviathanHeart);

  // Heart Pulsing Halo
  const heartHaloGeo = new THREE.SphereGeometry(10, 16, 16);
  const heartHaloMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const heartHalo = new THREE.Mesh(heartHaloGeo, heartHaloMat);
  heartHalo.position.set(0, 2, -5);
  group.add(heartHalo);

  return group;
};

// 28. Genesis Elysium Centrifugal Ringworld Builder
const buildElysiumRingworld = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(850, 480, 1150);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(55, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  ringworldHitMesh = new THREE.Mesh(hitGeo, hitMat);
  ringworldHitMesh.userData = { body: ringworldBody };
  group.add(ringworldHitMesh);

  // Procedural Terraformed Biosphere Texture (Oceans, Emerald Forests, Cloud Wisps)
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Deep Blue Ocean
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(0, 0, 512, 128);

  // Continents and Forest Lands
  ctx.fillStyle = '#16a34a';
  for (let c = 0; c < 16; c++) {
    ctx.beginPath();
    ctx.ellipse(c * 32 + 16, 64, 18, 42, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#22c55e';
  for (let c = 0; c < 12; c++) {
    ctx.beginPath();
    ctx.arc(c * 42 + 20, 64, 15, 0, Math.PI * 2);
    ctx.fill();
  }

  // Atmospheric Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let cl = 0; cl < 20; cl++) {
    ctx.beginPath();
    ctx.ellipse(Math.random() * 512, Math.random() * 128, 25, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  const ringTex = new THREE.CanvasTexture(canvas);
  ringTex.wrapS = THREE.RepeatWrapping;

  // Open Cylindrical Habitat Band (Viewed from inner side!)
  const bandGeo = new THREE.CylinderGeometry(44, 44, 16, 64, 1, true);
  const bandMat = new THREE.MeshStandardMaterial({
    map: ringTex,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.2,
  });
  ringworldMesh = new THREE.Mesh(bandGeo, bandMat);
  ringworldMesh.userData = { body: ringworldBody };
  group.add(ringworldMesh);

  // Outer Structural Retaining Rims
  const rimGeo = new THREE.TorusGeometry(44.2, 1.0, 12, 64);
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.2,
  });
  const rimTop = new THREE.Mesh(rimGeo, rimMat);
  rimTop.rotation.x = Math.PI / 2;
  rimTop.position.y = 8;
  group.add(rimTop);

  const rimBottom = new THREE.Mesh(rimGeo, rimMat);
  rimBottom.rotation.x = Math.PI / 2;
  rimBottom.position.y = -8;
  group.add(rimBottom);

  // 4 Spire Communication Towers on the Rims
  for (let s = 0; s < 4; s++) {
    const sAngle = (s * Math.PI) / 2;
    const spireGeo = new THREE.CylinderGeometry(0.5, 1.2, 14, 8);
    const spireMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.set(Math.cos(sAngle) * 44, 15, Math.sin(sAngle) * 44);
    group.add(spire);

    const beaconGeo = new THREE.SphereGeometry(0.9, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(Math.cos(sAngle) * 44, 22, Math.sin(sAngle) * 44);
    group.add(beacon);
  }

  return group;
};

// 29. Phoenix Protostellar Nursery Builder
const buildProtostarPhoenix = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-1350, -520, -1100);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  protostarHitMesh = new THREE.Mesh(hitGeo, hitMat);
  protostarHitMesh.userData = { body: protostarBody };
  group.add(protostarHitMesh);

  // Boiling Protostellar Core
  const coreGeo = new THREE.SphereGeometry(16, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.userData = { body: protostarBody };
  group.add(core);

  // Hot Plasma Coronal Shell
  const shellGeo = new THREE.SphereGeometry(20, 24, 24);
  const shellMat = new THREE.MeshBasicMaterial({
    color: 0xf97316,
    transparent: true,
    opacity: 0.55,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const shell = new THREE.Mesh(shellGeo, shellMat);
  group.add(shell);

  // Circumstellar Spiral Accretion Disk
  const diskGeo = new THREE.RingGeometry(24, 52, 48);
  const diskMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  protostarDisk = new THREE.Mesh(diskGeo, diskMat);
  protostarDisk.rotation.x = Math.PI / 2.5;
  group.add(protostarDisk);

  // Relativistic Bipolar Ejection Jets (North & South)
  protostarJets.length = 0;
  const jetGeo = new THREE.ConeGeometry(8, 120, 16, 1, true);
  const jetMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const northJet = new THREE.Mesh(jetGeo, jetMat);
  northJet.position.y = 65;
  group.add(northJet);
  protostarJets.push(northJet);

  const southJet = new THREE.Mesh(jetGeo, jetMat);
  southJet.rotation.x = Math.PI;
  southJet.position.y = -65;
  group.add(southJet);
  protostarJets.push(southJet);

  return group;
};

// 30. Tesseract Prime Hyperdimensional 4D Portal Builder
const buildTesseractArtifact = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-650, 580, -1250);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(40, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  tesseractHitMesh = new THREE.Mesh(hitGeo, hitMat);
  tesseractHitMesh.userData = { body: tesseractBody };
  group.add(tesseractHitMesh);

  // Outer Glowing Magenta Cube Frame
  const outerBoxGeo = new THREE.BoxGeometry(30, 30, 30);
  const outerEdges = new THREE.EdgesGeometry(outerBoxGeo);
  const outerMat = new THREE.LineBasicMaterial({
    color: 0xd946ef,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  tesseractOuter = new THREE.LineSegments(outerEdges, outerMat);
  tesseractOuter.userData = { body: tesseractBody };
  group.add(tesseractOuter);

  // Inner Cyan Cube Frame
  const innerBoxGeo = new THREE.BoxGeometry(16, 16, 16);
  const innerEdges = new THREE.EdgesGeometry(innerBoxGeo);
  const innerMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.95,
  });
  tesseractInner = new THREE.LineSegments(innerEdges, innerMat);
  group.add(tesseractInner);

  // 8 Diagonal Hypercube Connecting Lines
  const connPts: THREE.Vector3[] = [];
  const corners = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ];
  for (const c of corners) {
    connPts.push(new THREE.Vector3(c[0] * 15, c[1] * 15, c[2] * 15));
    connPts.push(new THREE.Vector3(c[0] * 8, c[1] * 8, c[2] * 8));
  }
  const connGeo = new THREE.BufferGeometry().setFromPoints(connPts);
  const connMat = new THREE.LineBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.65,
  });
  const connectors = new THREE.LineSegments(connGeo, connMat);
  group.add(connectors);

  // Center Quantum Singularity Core
  const sparkGeo = new THREE.SphereGeometry(3.5, 16, 16);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const spark = new THREE.Mesh(sparkGeo, sparkMat);
  group.add(spark);

  return group;
};

// 31. Solaris Vulcan Heavy Asteroid Foundry Builder
const buildVulcanFoundry = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(450, -420, -1200);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(48, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  vulcanHitMesh = new THREE.Mesh(hitGeo, hitMat);
  vulcanHitMesh.userData = { body: vulcanBody };
  group.add(vulcanHitMesh);

  // Heavy Industrial Chassis Booms
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25,
  });
  const boom1 = new THREE.Mesh(new THREE.BoxGeometry(40, 8, 10), hullMat);
  boom1.position.z = 12;
  boom1.userData = { body: vulcanBody };
  group.add(boom1);

  const boom2 = new THREE.Mesh(new THREE.BoxGeometry(40, 8, 10), hullMat);
  boom2.position.z = -12;
  group.add(boom2);

  // Central Magnetic Smelting Crucible (Glowing Molten Core)
  const crucibleGeo = new THREE.SphereGeometry(11, 24, 24);
  const crucibleMat = new THREE.MeshStandardMaterial({
    color: 0xea580c,
    emissive: 0xc2410c,
    emissiveIntensity: 0.8,
    roughness: 0.3,
  });
  vulcanCrucible = new THREE.Mesh(crucibleGeo, crucibleMat);
  group.add(vulcanCrucible);

  // 3 Magnetic Crucible Containment Field Rings
  vulcanCrucibleRings.length = 0;
  for (let r = 0; r < 3; r++) {
    const tGeo = new THREE.TorusGeometry(14 + r * 3, 0.8, 12, 36);
    const tMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const t = new THREE.Mesh(tGeo, tMat);
    t.rotation.x = (r * Math.PI) / 3;
    t.rotation.y = (r * Math.PI) / 4;
    group.add(t);
    vulcanCrucibleRings.push(t);
  }

  // 4 Thermal Radiator Heat-Fins
  const radGeo = new THREE.BoxGeometry(1.5, 20, 8);
  const radMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b,
    emissive: 0x7f1d1d,
    emissiveIntensity: 0.5,
    metalness: 0.7,
  });
  for (let f = 0; f < 4; f++) {
    const fin = new THREE.Mesh(radGeo, radMat);
    fin.position.set((f - 1.5) * 9, 12, 0);
    group.add(fin);
  }

  return group;
};

// 32. Abyssal Dark Matter Crystal Cluster Builder
const buildDarkMatterGeode = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(1500, -320, -650);

  // Hit test sphere
  const hitGeo = new THREE.SphereGeometry(45, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  geodeHitMesh = new THREE.Mesh(hitGeo, hitMat);
  geodeHitMesh.userData = { body: geodeBody };
  group.add(geodeHitMesh);

  // Central Obsidian Asteroid Core
  const astGeo = new THREE.DodecahedronGeometry(16, 1);
  const astMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.2,
    flatShading: true,
  });
  const coreAst = new THREE.Mesh(astGeo, astMat);
  coreAst.userData = { body: geodeBody };
  group.add(coreAst);

  // 8 Giant Prismatic Crystal Needles jutting outward
  geodeNeedles.length = 0;
  const needleGeo = new THREE.ConeGeometry(3.5, 26, 6);
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    emissive: 0x581c87,
    emissiveIntensity: 0.45,
    metalness: 0.8,
    roughness: 0.1,
    flatShading: true,
  });

  const directions = [
    [1, 0.5, 0.5],
    [-1, 0.6, 0.4],
    [0.3, 1, 0.5],
    [-0.4, -1, 0.6],
    [0.5, -0.4, 1],
    [-0.5, 0.3, -1],
    [0.8, -0.8, -0.5],
    [-0.7, 0.7, -0.6],
  ];

  for (const d of directions) {
    const dirVec = new THREE.Vector3(d[0], d[1], d[2]).normalize();
    const needle = new THREE.Mesh(needleGeo, needleMat);
    needle.position.copy(dirVec.clone().multiplyScalar(14));
    needle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
    group.add(needle);
    geodeNeedles.push(needle);
  }

  // 10 Orbiting Micro Crystal Shards
  geodeMicroSwarm.length = 0;
  const shardGeo = new THREE.OctahedronGeometry(1.8, 0);
  const shardMat = new THREE.MeshBasicMaterial({ color: 0xc4b5fd });
  for (let m = 0; m < 10; m++) {
    const shard = new THREE.Mesh(shardGeo, shardMat);
    group.add(shard);
    geodeMicroSwarm.push(shard);
  }

  return group;
};

// 33. Procedural In-Memory Screen & Prop Textures
const createLaptopScreenTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050c1a';
  ctx.fillRect(0, 0, 512, 320);

  // Window header bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 28);
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(16, 14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(32, 14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(48, 14, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '11px monospace';
  ctx.fillText('zsh - anko@quantum-macbook: ~/portfolio-vuejs', 70, 18);

  // Terminal Lines
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('> bun run dev --host', 18, 56);

  ctx.fillStyle = '#a855f7';
  ctx.fillText('  VITE v5.4.20 ready in 42 ms', 18, 82);

  ctx.fillStyle = '#22c55e';
  ctx.fillText('  ➜  Local:   http://localhost:5173/', 18, 108);
  ctx.fillText('  ➜  Network: http://192.168.1.10:5173/', 18, 128);

  ctx.fillStyle = '#f59e0b';
  ctx.fillText('  [SYSTEM] Quantum Core: 128-Core Matrix Active', 18, 160);

  ctx.fillStyle = '#06b6d4';
  ctx.fillText('  [TS-CHECK] vue-tsc --noEmit: 0 ERRORS FOUND ✓', 18, 188);

  ctx.fillStyle = '#ec4899';
  ctx.fillText('  [AGENT] Antigravity 2.0 Pair Programming Online', 18, 216);

  ctx.fillStyle = '#ffffff';
  ctx.fillText('  const dev = { name: "Anko", role: "Full-Stack" };', 18, 248);

  ctx.fillStyle = '#00f0ff';
  ctx.fillText('  console.log("Welcome to Cosmos Portfolio 🚀");', 18, 276);

  ctx.fillStyle = '#22c55e';
  ctx.fillRect(18, 290, 10, 14);

  return new THREE.CanvasTexture(canvas);
};

const createGoldenRecordTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ca8a04';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1;
  for (let r = 15; r < 120; r += 3) {
    ctx.beginPath();
    ctx.arc(128, 128, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(128, 128, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(128, 128, 6, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
};

const createNeptuniaTexture = (): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#0c4a6e');
  grad.addColorStop(0.2, '#0284c7');
  grad.addColorStop(0.4, '#0369a1');
  grad.addColorStop(0.6, '#0ea5e9');
  grad.addColorStop(0.8, '#0369a1');
  grad.addColorStop(1, '#082f49');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = 'rgba(224, 242, 254, 0.45)';
  for (let i = 0; i < 24; i++) {
    const y = Math.random() * 256;
    ctx.beginPath();
    ctx.ellipse(
      Math.random() * 512,
      y,
      Math.random() * 90 + 40,
      Math.random() * 12 + 4,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
};

// 33. Crown of the Cosmic King Builder (Mahkota King)
const buildCosmicCrown = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-350, 320, -180);

  const hitGeo = new THREE.SphereGeometry(32, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  crownHitMesh = new THREE.Mesh(hitGeo, hitMat);
  crownHitMesh.userData = { body: crownBody };
  group.add(crownHitMesh);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 0.95,
    roughness: 0.15,
  });

  const ringGeo = new THREE.CylinderGeometry(18, 19, 6, 32, 1, true);
  const baseRing = new THREE.Mesh(ringGeo, goldMat);
  baseRing.userData = { body: crownBody };
  group.add(baseRing);

  const lowerRim = new THREE.Mesh(new THREE.TorusGeometry(19.2, 0.9, 12, 48), goldMat);
  lowerRim.rotation.x = Math.PI / 2;
  lowerRim.position.y = -3;
  group.add(lowerRim);

  const upperRim = new THREE.Mesh(new THREE.TorusGeometry(18.2, 0.9, 12, 48), goldMat);
  upperRim.rotation.x = Math.PI / 2;
  upperRim.position.y = 3;
  group.add(upperRim);

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x6b21a8,
    roughness: 0.9,
    metalness: 0.1,
  });
  const velvetGeo = new THREE.SphereGeometry(17, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const velvetDome = new THREE.Mesh(velvetGeo, velvetMat);
  velvetDome.position.y = 0;
  group.add(velvetDome);

  crownGems.length = 0;
  const rubyMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0x991b1b,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.2,
  });
  const emeraldMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x065f46,
    emissiveIntensity: 0.6,
    roughness: 0.1,
    metalness: 0.2,
  });

  for (let s = 0; s < 5; s++) {
    const angle = (s * Math.PI * 2) / 5;
    const spireGeo = new THREE.ConeGeometry(3.2, 14, 4);
    const spire = new THREE.Mesh(spireGeo, goldMat);
    spire.position.set(Math.cos(angle) * 18, 9, Math.sin(angle) * 18);
    spire.rotation.y = -angle;
    group.add(spire);

    const tipOrb = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 12), goldMat);
    tipOrb.position.set(Math.cos(angle) * 18, 16.5, Math.sin(angle) * 18);
    group.add(tipOrb);

    const gemGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const gem = new THREE.Mesh(gemGeo, s % 2 === 0 ? rubyMat : emeraldMat);
    gem.position.set(Math.cos(angle) * 19.2, 3, Math.sin(angle) * 19.2);
    group.add(gem);
    crownGems.push(gem);
  }

  const apexCrossV = new THREE.Mesh(new THREE.BoxGeometry(1.2, 6, 1.2), goldMat);
  apexCrossV.position.y = 17;
  group.add(apexCrossV);
  const apexCrossH = new THREE.Mesh(new THREE.BoxGeometry(4, 1.2, 1.2), goldMat);
  apexCrossH.position.y = 18;
  group.add(apexCrossH);

  crownOrbitingGems.length = 0;
  const diamondMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xfef08a,
    emissiveIntensity: 0.7,
    roughness: 0.1,
    metalness: 0.9,
  });
  for (let g = 0; g < 6; g++) {
    const dMesh = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), diamondMat);
    group.add(dMesh);
    crownOrbitingGems.push(dMesh);
  }

  return group;
};

// 34. Motor BeAT Karbu Antariksa Builder
const buildMotorBeat = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(320, 160, 360);

  const hitGeo = new THREE.SphereGeometry(32, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  beatHitMesh = new THREE.Mesh(hitGeo, hitMat);
  beatHitMesh.userData = { body: beatBody };
  group.add(beatHitMesh);

  const fairingBlue = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.85,
    roughness: 0.18,
  });
  const fairingWhite = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.5,
    roughness: 0.3,
  });
  const blackTrim = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.6,
    roughness: 0.5,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.1,
  });

  const spine = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 24), fairingWhite);
  spine.position.set(0, 0, 2);
  spine.userData = { body: beatBody };
  group.add(spine);

  const floorboard = new THREE.Mesh(new THREE.BoxGeometry(10, 1.2, 12), blackTrim);
  floorboard.position.set(0, 1.2, 5);
  group.add(floorboard);

  const frontCowl = new THREE.Mesh(new THREE.BoxGeometry(9, 14, 10), fairingBlue);
  frontCowl.position.set(0, 8, 14);
  frontCowl.rotation.x = -0.3;
  group.add(frontCowl);

  const headlightMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
  const headlight = new THREE.Mesh(new THREE.BoxGeometry(7, 3.5, 2), headlightMat);
  headlight.position.set(0, 8.5, 19.5);
  headlight.rotation.x = -0.3;
  group.add(headlight);

  const beamGeo = new THREE.ConeGeometry(8, 55, 16, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(0, 8, 48);
  group.add(beam);

  const handlebarBar = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 16, 8), chromeMat);
  handlebarBar.rotation.z = Math.PI / 2;
  handlebarBar.position.set(0, 15.5, 13);
  group.add(handlebarBar);

  const gripL = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 4, 8), blackTrim);
  gripL.rotation.z = Math.PI / 2;
  gripL.position.set(-7, 15.5, 13);
  group.add(gripL);

  const gripR = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 4, 8), blackTrim);
  gripR.rotation.z = Math.PI / 2;
  gripR.position.set(7, 15.5, 13);
  group.add(gripR);

  const mirrorGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 12);
  const mirrorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
  const mirrorStemL = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5, 6), chromeMat);
  mirrorStemL.position.set(-6, 18, 12);
  mirrorStemL.rotation.z = -0.3;
  group.add(mirrorStemL);

  const mirrorL = new THREE.Mesh(mirrorGeo, mirrorMat);
  mirrorL.position.set(-7.5, 20.5, 12);
  group.add(mirrorL);

  const mirrorStemR = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 5, 6), chromeMat);
  mirrorStemR.position.set(6, 18, 12);
  mirrorStemR.rotation.z = 0.3;
  group.add(mirrorStemR);

  const mirrorR = new THREE.Mesh(mirrorGeo, mirrorMat);
  mirrorR.position.set(7.5, 20.5, 12);
  group.add(mirrorR);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 18), blackTrim);
  seat.position.set(0, 6, -3);
  seat.rotation.x = -0.05;
  group.add(seat);

  const rearCowl = new THREE.Mesh(new THREE.BoxGeometry(9, 7, 16), fairingBlue);
  rearCowl.position.set(0, 3, -4);
  group.add(rearCowl);

  const tailLight = new THREE.Mesh(
    new THREE.BoxGeometry(6, 3, 2),
    new THREE.MeshBasicMaterial({ color: 0xef4444 }),
  );
  tailLight.position.set(0, 4.5, -12);
  group.add(tailLight);

  // Indonesian Plat Nomor "B 4744 ANK"
  const platCanvas = document.createElement('canvas');
  platCanvas.width = 128;
  platCanvas.height = 64;
  const pctx = platCanvas.getContext('2d')!;
  pctx.fillStyle = '#000000';
  pctx.fillRect(0, 0, 128, 64);
  pctx.strokeStyle = '#ffffff';
  pctx.lineWidth = 4;
  pctx.strokeRect(4, 4, 120, 56);
  pctx.fillStyle = '#ffffff';
  pctx.font = 'bold 20px monospace';
  pctx.fillText('B 4744 ANK', 12, 36);
  pctx.font = '10px monospace';
  pctx.fillText('09 • 29', 42, 52);
  const platTex = new THREE.CanvasTexture(platCanvas);
  const platMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 2.5),
    new THREE.MeshBasicMaterial({ map: platTex }),
  );
  platMesh.position.set(0, 1.5, -13);
  platMesh.rotation.y = Math.PI;
  group.add(platMesh);

  beatWheels.length = 0;
  const wheelGeo = new THREE.TorusGeometry(5.5, 1.8, 12, 24);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });

  const frontWheel = new THREE.Mesh(wheelGeo, tireMat);
  frontWheel.position.set(0, -2, 17);
  group.add(frontWheel);
  beatWheels.push(frontWheel);

  const rearWheel = new THREE.Mesh(wheelGeo, tireMat);
  rearWheel.position.set(0, -2, -13);
  group.add(rearWheel);
  beatWheels.push(rearWheel);

  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 14, 12), blackTrim);
  exhaust.rotation.x = Math.PI / 2.3;
  exhaust.position.set(5.5, -1, -8);
  group.add(exhaust);

  const flameGeo = new THREE.ConeGeometry(2.5, 16, 12, 1, true);
  const flameMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  beatThrustFlame = new THREE.Mesh(flameGeo, flameMat);
  beatThrustFlame.rotation.x = -Math.PI / 2.3;
  beatThrustFlame.position.set(5.5, -3, -20);
  group.add(beatThrustFlame);

  return group;
};

// 35. Cyber Matrix Quantum Laptop Builder (Precision Unibody Model)
const buildCyberLaptop = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-260, 180, 420);

  const hitGeo = new THREE.SphereGeometry(26, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  laptopHitMesh = new THREE.Mesh(hitGeo, hitMat);
  laptopHitMesh.userData = { body: laptopBody };
  group.add(laptopHitMesh);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c8d6,
    metalness: 0.85,
    roughness: 0.25,
  });
  const darkCaseMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.6,
    roughness: 0.5,
  });

  // Base Chassis (Bottom Case)
  const baseChassis = new THREE.Mesh(new THREE.BoxGeometry(24, 1.0, 16), silverMat);
  baseChassis.userData = { body: laptopBody };
  group.add(baseChassis);

  // Recessed Keyboard Tray on Base
  const kbWell = new THREE.Mesh(new THREE.BoxGeometry(21, 0.1, 8.5), darkCaseMat);
  kbWell.position.set(0, 0.52, -2.5);
  group.add(kbWell);

  // Keyboard Individual Backlit Keys
  const kbMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.45,
    roughness: 0.3,
  });
  for (let r = 0; r < 5; r++) {
    for (let k = 0; k < 12; k++) {
      const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.2, 1.3), kbMat);
      keyMesh.position.set((k - 5.5) * 1.65, 0.62, -5.5 + r * 1.55);
      group.add(keyMesh);
    }
  }

  // Glass Trackpad
  const trackpadMat = new THREE.MeshStandardMaterial({
    color: 0xa0aec0,
    metalness: 0.7,
    roughness: 0.2,
  });
  const trackpad = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.08, 5.0), trackpadMat);
  trackpad.position.set(0, 0.52, 4.2);
  group.add(trackpad);

  // Cylindrical Hinge Bar
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 22, 16), silverMat);
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.5, -8);
  group.add(hinge);

  // Hinged Display Lid Group
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.5, -8);
  lidGroup.rotation.x = -Math.PI * 0.62;

  const lidBox = new THREE.Mesh(new THREE.BoxGeometry(24, 16, 0.7), silverMat);
  lidBox.position.set(0, 8, -0.35);
  lidGroup.add(lidBox);

  // Outer Glowing Logo on Back Lid
  const logo = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff }),
  );
  logo.scale.set(1, 1, 0.2);
  logo.position.set(0, 8, -0.72);
  lidGroup.add(logo);

  // Display Screen Bezel
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x050811, roughness: 0.8 });
  const screenBezel = new THREE.Mesh(new THREE.BoxGeometry(23.2, 15.2, 0.05), bezelMat);
  screenBezel.position.set(0, 8, 0.02);
  lidGroup.add(screenBezel);

  // Active Holographic Code Screen
  const screenTex = createLaptopScreenTexture();
  const screenGeo = new THREE.PlaneGeometry(22, 14);
  const screenMat = new THREE.MeshBasicMaterial({
    map: screenTex,
  });
  laptopScreenMesh = new THREE.Mesh(screenGeo, screenMat);
  laptopScreenMesh.position.set(0, 8, 0.06);
  laptopScreenMesh.userData = { body: laptopBody };
  lidGroup.add(laptopScreenMesh);

  group.add(lidGroup);

  // Zero-G Orbiting Wireless Mouse
  const mouseGeo = new THREE.BoxGeometry(3.0, 1.4, 5.0);
  const mouseMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.3,
  });
  laptopCompanionMouse = new THREE.Mesh(mouseGeo, mouseMat);
  laptopCompanionMouse.position.set(16, 3, 4);
  group.add(laptopCompanionMouse);

  // Floating USB Quantum Drive
  const usbGeo = new THREE.BoxGeometry(1.2, 0.5, 3.2);
  const usbMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.4,
  });
  const usb = new THREE.Mesh(usbGeo, usbMat);
  usb.position.set(-16, 4, -2);
  usb.rotation.set(0.4, 0.6, 0.2);
  group.add(usb);

  return group;
};

// 36. Neptunia Prime Ocean World Builder
const buildNeptuniaOceanWorld = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-1100, -380, 950);

  const hitGeo = new THREE.SphereGeometry(50, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  neptuniaHitMesh = new THREE.Mesh(hitGeo, hitMat);
  neptuniaHitMesh.userData = { body: neptuniaBody };
  group.add(neptuniaHitMesh);

  const sphereGeo = new THREE.SphereGeometry(30, 36, 36);
  const sphereMat = new THREE.MeshStandardMaterial({
    map: createNeptuniaTexture(),
    roughness: 0.4,
    metalness: 0.1,
  });
  neptuniaMesh = new THREE.Mesh(sphereGeo, sphereMat);
  neptuniaMesh.userData = { body: neptuniaBody };
  group.add(neptuniaMesh);

  const ringGeo = new THREE.RingGeometry(42, 86, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.3;
  ring.rotation.y = 0.2;
  group.add(ring);

  neptuniaMoons.length = 0;
  const moonMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.8 });
  const moon1 = new THREE.Mesh(new THREE.SphereGeometry(2.0, 12, 12), moonMat);
  const moon2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 12, 12), moonMat);
  group.add(moon1);
  group.add(moon2);
  neptuniaMoons.push(moon1, moon2);

  return group;
};

// 37. Voyager Prime Interstellar Probe Builder
const buildVoyagerProbe = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(1250, 520, -420);

  const hitGeo = new THREE.SphereGeometry(38, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  voyagerHitMesh = new THREE.Mesh(hitGeo, hitMat);
  voyagerHitMesh.userData = { body: voyagerBody };
  group.add(voyagerHitMesh);

  const dishGeo = new THREE.CylinderGeometry(0.5, 18, 5, 32, 1, true);
  const dishMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.4,
    metalness: 0.2,
  });
  const dish = new THREE.Mesh(dishGeo, dishMat);
  dish.rotation.x = Math.PI / 2;
  dish.userData = { body: voyagerBody };
  group.add(dish);

  const feedGeo = new THREE.ConeGeometry(1.5, 8, 8);
  const feedMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
  const feed = new THREE.Mesh(feedGeo, feedMat);
  feed.rotation.x = -Math.PI / 2;
  feed.position.z = 8;
  group.add(feed);

  const busGeo = new THREE.CylinderGeometry(7, 7, 6, 10);
  const busMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.3,
  });
  const bus = new THREE.Mesh(busGeo, busMat);
  bus.position.z = -5;
  group.add(bus);

  const goldRecGeo = new THREE.CylinderGeometry(5.5, 5.5, 0.5, 24);
  const goldRecMat = new THREE.MeshStandardMaterial({
    map: createGoldenRecordTexture(),
    metalness: 0.95,
    roughness: 0.15,
  });
  voyagerGoldenRecord = new THREE.Mesh(goldRecGeo, goldRecMat);
  voyagerGoldenRecord.rotation.z = Math.PI / 2;
  voyagerGoldenRecord.position.set(7.5, 0, -5);
  group.add(voyagerGoldenRecord);

  const boomMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
  const magBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 38, 6), boomMat);
  magBoom.rotation.z = Math.PI / 3;
  magBoom.position.set(-18, 10, -5);
  group.add(magBoom);

  const rtgBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 18, 6), boomMat);
  rtgBoom.rotation.z = -Math.PI / 2.5;
  rtgBoom.position.set(10, -8, -5);
  group.add(rtgBoom);

  for (let r = 0; r < 3; r++) {
    const rtgCell = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 4, 10),
      new THREE.MeshStandardMaterial({ color: 0x334155 }),
    );
    rtgCell.position.set(12 + r * 3.5, -12, -5);
    group.add(rtgCell);
  }

  const beaconGeo = new THREE.SphereGeometry(1.0, 8, 8);
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  voyagerBeacon = new THREE.Mesh(beaconGeo, beaconMat);
  voyagerBeacon.position.set(0, 0, 12);
  group.add(voyagerBeacon);

  return group;
};

// 38. Cangkir Kopi Kosmik Tubruk Builder (Mug of Infinite Caffeine)
const buildCosmicCoffee = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-180, 240, -320);

  const hitGeo = new THREE.SphereGeometry(22, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  coffeeHitMesh = new THREE.Mesh(hitGeo, hitMat);
  coffeeHitMesh.userData = { body: coffeeBody };
  group.add(coffeeHitMesh);

  // Ceramic Mug Body
  const mugMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.15,
    metalness: 0.1,
  });
  const outerMug = new THREE.Mesh(new THREE.CylinderGeometry(8, 7, 14, 32, 1, true), mugMat);
  outerMug.userData = { body: coffeeBody };
  group.add(outerMug);

  const mugBase = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 1, 32), mugMat);
  mugBase.position.y = -6.5;
  group.add(mugBase);

  // Mug Handle
  const handleGeo = new THREE.TorusGeometry(4.2, 1.1, 12, 24, Math.PI);
  const handle = new THREE.Mesh(handleGeo, mugMat);
  handle.position.set(7.5, 0, 0);
  handle.rotation.z = -Math.PI / 2;
  group.add(handle);

  // Coffee Liquid Surface with Stardust Spiral
  const coffeeLiquidMat = new THREE.MeshStandardMaterial({
    color: 0x2b1810,
    roughness: 0.25,
    metalness: 0.1,
  });
  const coffeeSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(7.6, 7.6, 0.5, 32),
    coffeeLiquidMat,
  );
  coffeeSurface.position.y = 5.2;
  group.add(coffeeSurface);

  // Floating Zero-G Coffee Droplets
  coffeeDroplets.length = 0;
  const dropMat = new THREE.MeshStandardMaterial({
    color: 0x78350f,
    emissive: 0x451a03,
    emissiveIntensity: 0.4,
    roughness: 0.1,
  });
  for (let d = 0; d < 5; d++) {
    const drop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), dropMat);
    const dAngle = (d * Math.PI * 2) / 5;
    drop.position.set(Math.cos(dAngle) * 4.5, 9 + d * 1.5, Math.sin(dAngle) * 4.5);
    group.add(drop);
    coffeeDroplets.push(drop);
  }

  // Glowing Steam Vapor Rings
  coffeeSteam.length = 0;
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  for (let s = 0; s < 3; s++) {
    const steamRing = new THREE.Mesh(new THREE.TorusGeometry(3.5 + s * 1.5, 0.4, 8, 24), steamMat);
    steamRing.rotation.x = Math.PI / 2;
    steamRing.position.y = 12 + s * 3.5;
    group.add(steamRing);
    coffeeSteam.push(steamRing);
  }

  return group;
};

// 39. Cosmic Stratocaster Electric Guitar Builder
const buildCosmicGuitar = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(550, -220, 280);

  const hitGeo = new THREE.SphereGeometry(30, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  guitarHitMesh = new THREE.Mesh(hitGeo, hitMat);
  guitarHitMesh.userData = { body: guitarBody };
  group.add(guitarHitMesh);

  // Stratocaster Body (Double Cutaway)
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    emissive: 0x831843,
    emissiveIntensity: 0.4,
    metalness: 0.7,
    roughness: 0.2,
  });
  const gBodyMain = new THREE.Mesh(new THREE.BoxGeometry(16, 3.2, 22), bodyMat);
  gBodyMain.userData = { body: guitarBody };
  group.add(gBodyMain);

  // Upper and Lower Horns
  const hornUpper = new THREE.Mesh(new THREE.ConeGeometry(2.5, 9, 8), bodyMat);
  hornUpper.rotation.z = 0.3;
  hornUpper.position.set(-6.5, 0, 13);
  group.add(hornUpper);

  const hornLower = new THREE.Mesh(new THREE.ConeGeometry(2.2, 7, 8), bodyMat);
  hornLower.rotation.z = -0.3;
  hornLower.position.set(6.5, 0, 12);
  group.add(hornLower);

  // Pearl White Pickguard
  const pickguardMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
  const pickguard = new THREE.Mesh(new THREE.BoxGeometry(11, 0.2, 14), pickguardMat);
  pickguard.position.set(-1, 1.7, 1);
  group.add(pickguard);

  // Pickups & Chrome Bridge
  const pickupMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
  for (let p = 0; p < 3; p++) {
    const pickup = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.4, 1.6), pickupMat);
    pickup.position.set(0, 1.9, -1 + p * 3.5);
    group.add(pickup);
  }

  // Chrome Bridge
  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.6, 2.5),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95 }),
  );
  bridge.position.set(0, 1.9, -6);
  group.add(bridge);

  // Maple Neck
  const neckMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.4 });
  const neck = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 32), neckMat);
  neck.position.set(0, 0.8, 20);
  group.add(neck);

  // Headstock & Tuning Pegs
  const headstock = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.2, 8), neckMat);
  headstock.position.set(0.6, 0.8, 38);
  headstock.rotation.y = 0.15;
  group.add(headstock);

  // 6 Glowing Starlight Tachyon Strings
  const strMat = new THREE.LineBasicMaterial({ color: 0x38bdf8 });
  const strPts: THREE.Vector3[] = [];
  for (let s = 0; s < 6; s++) {
    const xOff = (s - 2.5) * 0.35;
    strPts.push(new THREE.Vector3(xOff, 2.0, -6));
    strPts.push(new THREE.Vector3(xOff, 1.6, 36));
  }
  const strGeo = new THREE.BufferGeometry().setFromPoints(strPts);
  const strings = new THREE.LineSegments(strGeo, strMat);
  group.add(strings);

  // Soundwave Shockwave Resonance Rings
  guitarWaveRings.length = 0;
  const waveMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    transparent: true,
    opacity: 0.45,
    wireframe: true,
    blending: THREE.AdditiveBlending,
  });
  for (let w = 0; w < 3; w++) {
    const waveRing = new THREE.Mesh(new THREE.RingGeometry(14 + w * 6, 15 + w * 6, 32), waveMat);
    waveRing.rotation.x = Math.PI / 2;
    group.add(waveRing);
    guitarWaveRings.push(waveRing);
  }

  return group;
};

// 40. Cosmic Golden Maneki-Neko Builder (Lucky Cat of Prosperity)
const buildCosmicLuckyCat = (): THREE.Group => {
  const group = new THREE.Group();
  group.position.set(-850, 360, 480);

  const hitGeo = new THREE.SphereGeometry(32, 16, 16);
  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  nekoHitMesh = new THREE.Mesh(hitGeo, hitMat);
  nekoHitMesh.userData = { body: nekoBody };
  group.add(nekoHitMesh);

  // 24K Solar Gold Metallic Material
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.95,
    roughness: 0.12,
  });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const greenMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });

  // Plump Body Sphere
  const bodyMesh = new THREE.Mesh(new THREE.SphereGeometry(12, 24, 24), goldMat);
  bodyMesh.scale.set(1.0, 1.25, 0.95);
  bodyMesh.position.y = 8;
  bodyMesh.userData = { body: nekoBody };
  group.add(bodyMesh);

  // Head Sphere
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(9.5, 24, 24), goldMat);
  headMesh.position.set(0, 22, 1);
  group.add(headMesh);

  // Triangular Ears
  for (let e = -1; e <= 1; e += 2) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(3.0, 5.5, 4), goldMat);
    ear.position.set(e * 5.5, 30, 1);
    ear.rotation.z = -e * 0.3;
    group.add(ear);

    // Red inner ear pad
    const innerEar = new THREE.Mesh(new THREE.ConeGeometry(1.8, 4.0, 4), redMat);
    innerEar.position.set(e * 5.5, 29.5, 2);
    innerEar.rotation.z = -e * 0.3;
    group.add(innerEar);
  }

  // --- 3D MANEKI-NEKO FACIAL FEATURES (MUKA KUCING IMUT LENGKAP) ---
  const faceGroup = new THREE.Group();
  faceGroup.position.set(0, 22, 1);

  const blackFeatureMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.2,
    metalness: 0.3,
  });
  const whiteFeatureMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
  });
  const pinkCheekMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    roughness: 0.4,
  });
  const redNoseMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.2,
  });

  // 1. White Muzzle Pads (Pipi Moncong Putih Kucing)
  for (let s = -1; s <= 1; s += 2) {
    const muzzlePad = new THREE.Mesh(new THREE.SphereGeometry(2.6, 16, 16), whiteFeatureMat);
    muzzlePad.scale.set(1.15, 0.85, 0.6);
    muzzlePad.position.set(s * 1.8, -1.6, 9.0);
    muzzlePad.rotation.y = s * 0.2;
    faceGroup.add(muzzlePad);
  }

  // 2. Cute Nose (Hidung Segitiga Mungil Merah)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), redNoseMat);
  nose.scale.set(1.1, 0.8, 0.6);
  nose.position.set(0, -0.6, 9.8);
  faceGroup.add(nose);

  // 3. Cute Smiling Mouth Line ('w' shape)
  for (let s = -1; s <= 1; s += 2) {
    const lip = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.2, 8, 16, Math.PI * 0.85),
      blackFeatureMat,
    );
    lip.rotation.x = Math.PI;
    lip.rotation.y = s * 0.2;
    lip.rotation.z = s * -0.15;
    lip.position.set(s * 1.1, -2.2, 9.5);
    faceGroup.add(lip);
  }

  // Cute Little Tongue Peek
  const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.8, 12, 12), pinkCheekMat);
  tongue.scale.set(0.9, 0.6, 0.4);
  tongue.position.set(0, -2.6, 9.4);
  faceGroup.add(tongue);

  // 4. Expressive Eyes (Sepasang Mata Kucing 3D yang Hidup & Berpendar)
  for (let s = -1; s <= 1; s += 2) {
    const eyeGroup = new THREE.Group();
    eyeGroup.position.set(s * 3.8, 1.8, 8.8);
    eyeGroup.rotation.y = s * 0.35;
    eyeGroup.rotation.x = -0.1;

    // Sclera (White eye background)
    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(2.0, 16, 16), whiteFeatureMat);
    eyeWhite.scale.set(1.05, 0.9, 0.3);
    eyeGroup.add(eyeWhite);

    // Large Glossy Black Pupil
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), blackFeatureMat);
    pupil.scale.set(0.95, 1.05, 0.35);
    pupil.position.set(0, 0, 0.25);
    eyeGroup.add(pupil);

    // Cute Anime Sparkle Dots (Catchlights)
    const spark1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    spark1.position.set(-s * 0.4, 0.45, 0.6);
    eyeGroup.add(spark1);

    const spark2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    spark2.position.set(s * 0.4, -0.35, 0.6);
    eyeGroup.add(spark2);

    // Eyeliner / Eyelashes (Cat-Eye wing)
    const eyeliner = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.24, 8, 16, Math.PI * 0.75),
      blackFeatureMat,
    );
    eyeliner.rotation.z = s > 0 ? 0.35 : Math.PI - 0.35;
    eyeliner.position.set(0, 0.4, 0.4);
    eyeGroup.add(eyeliner);

    faceGroup.add(eyeGroup);
  }

  // 5. Pink Rosy Blush Cheeks (Pipi Merona Imut)
  for (let s = -1; s <= 1; s += 2) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), pinkCheekMat);
    cheek.scale.set(1.2, 0.7, 0.3);
    cheek.position.set(s * 6.0, -0.6, 7.6);
    cheek.rotation.y = s * 0.65;
    faceGroup.add(cheek);
  }

  // 6. Whiskers (Kumis Kucing - 3 di kiri, 3 di kanan)
  const whiskerGeo = new THREE.CylinderGeometry(0.12, 0.12, 6.5, 6);
  for (let s = -1; s <= 1; s += 2) {
    const angles = [0.22, 0, -0.22];
    angles.forEach((ang, idx) => {
      const whisker = new THREE.Mesh(whiskerGeo, blackFeatureMat);
      whisker.rotation.z = Math.PI / 2 + s * ang;
      whisker.rotation.y = s * 0.45;
      whisker.position.set(s * 6.5, -0.8 + (idx - 1) * 1.1, 7.8);
      faceGroup.add(whisker);
    });
  }

  // 7. Forehead Auspicious Starlight Jewel
  const foreheadGem = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), redNoseMat);
  foreheadGem.position.set(0, 5.2, 8.4);
  foreheadGem.rotation.z = Math.PI / 4;
  faceGroup.add(foreheadGem);

  group.add(faceGroup);

  // Red Collar & Golden Jingle Bell
  const collar = new THREE.Mesh(new THREE.TorusGeometry(8, 0.9, 12, 32), redMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.set(0, 15, 1);
  group.add(collar);

  const bell = new THREE.Mesh(new THREE.SphereGeometry(2.0, 16, 16), goldMat);
  bell.position.set(0, 13.5, 8.5);
  group.add(bell);

  // Green Decorative Bib
  const bib = new THREE.Mesh(
    new THREE.CylinderGeometry(4.5, 7, 1.5, 16, 1, false, 0, Math.PI),
    greenMat,
  );
  bib.rotation.x = -Math.PI / 3;
  bib.position.set(0, 11, 7.5);
  group.add(bib);

  // Left Arm Holding Giant Gold Koban Coin (千万両 Senman Ryo)
  const kobanGroup = new THREE.Group();
  kobanGroup.position.set(-8.5, 10, 6.5);
  kobanGroup.rotation.z = 0.2;

  const kobanGeo = new THREE.BoxGeometry(6.5, 12, 1.6);
  const koban = new THREE.Mesh(kobanGeo, goldMat);
  kobanGroup.add(koban);

  // Koban Calligraphy Kanji Marks (千万両 - Ten Million Ryo)
  const kobanMarkMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b,
    roughness: 0.3,
  });
  for (let k = 0; k < 3; k++) {
    const mark = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.0, 1.9), kobanMarkMat);
    mark.position.set(0, (k - 1) * 3.4, 0);
    kobanGroup.add(mark);
  }
  group.add(kobanGroup);

  // Animated Right Arm (Waving Paw of Fortune)
  nekoWavingArm = new THREE.Group();
  nekoWavingArm.position.set(9.5, 14, 3);

  const armMesh = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 10, 16), goldMat);
  armMesh.position.set(0, 5, 0);
  nekoWavingArm.add(armMesh);

  const pawMesh = new THREE.Mesh(new THREE.SphereGeometry(2.6, 16, 16), goldMat);
  pawMesh.position.set(0, 10, 0);
  nekoWavingArm.add(pawMesh);

  group.add(nekoWavingArm);

  // Orbiting Golden Coin Sparks
  nekoSparkles.length = 0;
  for (let c = 0; c < 6; c++) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.4, 16), goldMat);
    group.add(coin);
    nekoSparkles.push(coin);
  }

  return group;
};

/* =========================================================
   SCENE SETUP & MESH CREATION
   ========================================================= */

const initThreeScene = () => {
  if (!containerRef.value || !canvasRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  // 1. Scene & Camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02040a);

  camera = new THREE.PerspectiveCamera(50, width / height, 1, 180000);
  camera.position.set(0, 260, 420);

  // 2. Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3. OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 15; // Close inspection without clipping
  controls.maxDistance = 48000; // Deep cosmic zoom out: voyage from planets to the whole galaxy!
  controls.maxPolarAngle = Math.PI * 0.95;

  // Interruption listener: cancel camera fly-to instantly whenever user drags, touches, or scrolls
  controls.addEventListener('start', () => {
    isCameraAnimating = false;
  });

  // 4. Lighting (Ample ambient + point light + directional fill so all planets shine)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.45);
  dirLight.position.set(0, 300, 200);
  scene.add(dirLight);

  const sunLight = new THREE.PointLight(0xfff5ea, 5.0, 4500, 0.35);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // 5A. Deep Space 3D Multi-Layered Starfield (20,000 Stars in Multi-Depth Shells)
  const starCount = 20000;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const starPalette = [
    new THREE.Color(0xffffff), // pure brilliant white
    new THREE.Color(0xe0f2fe), // starlight ice blue
    new THREE.Color(0xfef08a), // warm solar yellow
    new THREE.Color(0xa5f3fc), // electric cyan
    new THREE.Color(0xd8b4fe), // lavender violet
    new THREE.Color(0xf472b6), // cosmic pink
    new THREE.Color(0x38bdf8), // sapphire blue
    new THREE.Color(0xfbbf24), // amber gold
    new THREE.Color(0xf87171), // red dwarf crimson
  ];

  for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    // Multi-shell depth distribution for rich volumetric cosmic depth
    let dist: number;
    if (i < 5000) {
      dist = Math.random() * 800 + 1000; // mid-field stars
    } else if (i < 13000) {
      dist = Math.random() * 1200 + 1800; // deep field stars
    } else {
      dist = Math.random() * 1600 + 3000; // ultra-distant cosmic background
    }

    starPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
    starPositions[i * 3 + 2] = dist * Math.cos(phi);

    const c = starPalette[Math.floor(Math.random() * starPalette.length)];
    starColors[i * 3] = c.r;
    starColors[i * 3 + 1] = c.g;
    starColors[i * 3 + 2] = c.b;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 3.4,
    map: getCircularStarlightTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.98,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  starFieldPoints = new THREE.Points(starGeo, starMat);
  scene.add(starFieldPoints);

  // 5A-Constellations: 3D Constellation Sphere Network (Populating all empty areas of deep space)
  constellationSystem = buildConstellationSystem(getCircularStarlightTexture(), 3850);
  scene.add(constellationSystem.linesMesh);
  scene.add(constellationSystem.starsPoints);
  scene.add(constellationSystem.flaresGroup);

  // 5A-Galaxy: Volumetric 3D Spiral Galaxy & Deep Cosmic Zoom
  galaxySystem = buildGalaxySystem();
  scene.add(galaxySystem.group);

  // 5A-Cross: Landmark Astrophotography 4-Point Diffraction Flare Supergiants (14 Major Stars)
  const crossStarPositions = [
    [-1250, 750, -1050],
    [-1700, 320, -1350],
    [-1450, -580, 980],
    [-980, -720, 1350],
    [1350, 820, -950],
    [1800, 380, -1450],
    [1420, -620, 1150],
    [1750, -260, 1600],
    [-720, 1050, -1400],
    [720, -920, 1380],
    [-1550, 120, 920],
    [1550, 180, -820],
    [0, 1450, -1100],
    [0, -1350, 1100],
  ];

  const crossTex = createCrossFlareTexture();
  for (const cp of crossStarPositions) {
    const sMat = new THREE.SpriteMaterial({
      map: crossTex,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const spr = new THREE.Sprite(sMat);
    spr.position.set(cp[0], cp[1], cp[2]);
    const sz = Math.random() * 40 + 60;
    spr.scale.set(sz, sz, 1);
    scene.add(spr);
  }

  // 5B. Dynamic Floating Cosmic Dust Swarm (7500 Particles)
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  const dustColors = new Float32Array(dustCount * 3);

  const dustPalette = [
    new THREE.Color(0x00f0ff), // electric cyber cyan
    new THREE.Color(0xffb703), // solar amber gold
    new THREE.Color(0xffffff), // pure diamond starlight
    new THREE.Color(0x38bdf8), // sapphire sky blue
    new THREE.Color(0xfcd34d), // warm star yellow
    new THREE.Color(0xe0f2fe), // starlight ice blue
    new THREE.Color(0xbae6fd), // pale cyan
  ];

  for (let i = 0; i < dustCount; i++) {
    let r: number;
    let y: number;

    if (i < 2500) {
      r = Math.random() * 680 + 35;
      y = (Math.random() - 0.5) * 100;
    } else {
      r = Math.random() * 1650 + 680;
      y = (Math.random() - 0.5) * 650;
    }
    const a = Math.random() * Math.PI * 2;

    dustPositions[i * 3] = Math.cos(a) * r;
    dustPositions[i * 3 + 1] = y;
    dustPositions[i * 3 + 2] = Math.sin(a) * r;

    const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];
    dustColors[i * 3] = c.r;
    dustColors[i * 3 + 1] = c.g;
    dustColors[i * 3 + 2] = c.b;

    dustRadii[i] = r;
    dustAngles[i] = a;
    dustYBase[i] = y;
    dustSpeeds[i] = (Math.random() * 0.08 + 0.02) * (Math.random() > 0.45 ? 1 : -1);
  }

  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

  const dustMat = new THREE.PointsMaterial({
    size: 4.6,
    map: getCosmicDustParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.96,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  cosmicDustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(cosmicDustPoints);

  // 5B-Galactic: Luminous Galactic Plane / Milky Way Stardust River (9500 Particles)
  const galacticGeo = new THREE.BufferGeometry();
  const galacticCount = 9500;
  const galacticPositions = new Float32Array(galacticCount * 3);
  const galacticColors = new Float32Array(galacticCount * 3);

  const galacticPalette = [
    new THREE.Color(0x00f0ff), // cyan cosmic ray
    new THREE.Color(0x38bdf8), // azure starlight
    new THREE.Color(0xffd166), // golden core dust
    new THREE.Color(0xffffff), // brilliant star
    new THREE.Color(0xe0f2fe), // ice blue
    new THREE.Color(0xdbeafe), // pale starlight
  ];

  const galAngle = Math.PI * 0.22;
  const cosG = Math.cos(galAngle);
  const sinG = Math.sin(galAngle);

  for (let i = 0; i < galacticCount; i++) {
    const t = (Math.random() - 0.5) * 5800;
    const width = (Math.random() - 0.5) * (Math.random() - 0.5) * 1250;
    const thickness = (Math.random() - 0.5) * (Math.random() - 0.5) * 550;

    const lx = t;
    const ly = thickness;
    const lz = width;

    const gx = lx * cosG - lz * sinG;
    const gy = ly + Math.sin(t * 0.0011) * 140;
    const gz = lx * sinG + lz * cosG;

    galacticPositions[i * 3] = gx;
    galacticPositions[i * 3 + 1] = gy;
    galacticPositions[i * 3 + 2] = gz;

    const c = galacticPalette[Math.floor(Math.random() * galacticPalette.length)];
    galacticColors[i * 3] = c.r;
    galacticColors[i * 3 + 1] = c.g;
    galacticColors[i * 3 + 2] = c.b;
  }

  galacticGeo.setAttribute('position', new THREE.BufferAttribute(galacticPositions, 3));
  galacticGeo.setAttribute('color', new THREE.BufferAttribute(galacticColors, 3));

  const galacticMat = new THREE.PointsMaterial({
    size: 4.2,
    map: getCosmicDustParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  galacticStreamPoints = new THREE.Points(galacticGeo, galacticMat);
  scene.add(galacticStreamPoints);

  // 5C. Deep Space Volumetric Cosmic Nebulae (10 Sector-Covering Celestial Clouds)
  const nebulaConfigs = [
    // 1. Carina Violet Bloom (Top-Left Void)
    {
      c1: 'rgba(147, 51, 234, 1)',
      c2: 'rgba(219, 39, 119, 1)',
      pos: [-1600, 650, -1100],
      scale: 2450,
      opacity: 0.44,
    },
    // 2. Cygnus Veil Ribbon (Far Top-Left)
    {
      c1: 'rgba(6, 182, 212, 1)',
      c2: 'rgba(59, 130, 246, 1)',
      pos: [-1950, -150, -1450],
      scale: 2350,
      opacity: 0.4,
    },
    // 3. Emerald Abyss Lagoon (Bottom-Left Void)
    {
      c1: 'rgba(16, 185, 129, 1)',
      c2: 'rgba(15, 118, 110, 1)',
      pos: [-1450, -620, 1100],
      scale: 2450,
      opacity: 0.42,
    },
    // 4. Phoenix Molten Core (Far Bottom-Left)
    {
      c1: 'rgba(245, 158, 11, 1)',
      c2: 'rgba(239, 68, 68, 1)',
      pos: [-1750, -320, 650],
      scale: 2250,
      opacity: 0.38,
    },
    // 5. Orion Cosmic Cradle (Top-Right Void)
    {
      c1: 'rgba(6, 182, 212, 1)',
      c2: 'rgba(56, 189, 248, 1)',
      pos: [1550, 680, -1200],
      scale: 2500,
      opacity: 0.44,
    },
    // 6. Andromeda Mystic Glow (Far Top-Right)
    {
      c1: 'rgba(168, 85, 247, 1)',
      c2: 'rgba(244, 114, 182, 1)',
      pos: [1950, 220, -1550],
      scale: 2380,
      opacity: 0.4,
    },
    // 7. Rosette Heart Nebula (Bottom-Right Void)
    {
      c1: 'rgba(244, 63, 94, 1)',
      c2: 'rgba(251, 146, 60, 1)',
      pos: [1500, -640, 1250],
      scale: 2550,
      opacity: 0.42,
    },
    // 8. Pillars of Creation Gold Rift (Far Bottom-Right)
    {
      c1: 'rgba(217, 119, 6, 1)',
      c2: 'rgba(180, 83, 9, 1)',
      pos: [1850, -180, 1650],
      scale: 2300,
      opacity: 0.4,
    },
    // 9. North Star Celestial Crown (High Zenith)
    {
      c1: 'rgba(99, 102, 241, 1)',
      c2: 'rgba(56, 189, 248, 1)',
      pos: [0, 1650, -450],
      scale: 2650,
      opacity: 0.38,
    },
    // 10. Void Abyss Rift (Deep Nadir)
    {
      c1: 'rgba(126, 34, 206, 1)',
      c2: 'rgba(13, 148, 136, 1)',
      pos: [0, -1550, 450],
      scale: 2650,
      opacity: 0.38,
    },
  ];

  for (const neb of nebulaConfigs) {
    const nebMat = new THREE.SpriteMaterial({
      map: createCosmicNebulaTexture(neb.c1, neb.c2),
      transparent: true,
      opacity: neb.opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebSprite = new THREE.Sprite(nebMat);
    nebSprite.position.set(neb.pos[0], neb.pos[1], neb.pos[2]);
    nebSprite.scale.set(neb.scale, neb.scale, 1);
    nebSprite.userData = { baseOpacity: neb.opacity };
    scene.add(nebSprite);
    solarNebulaSprites.push(nebSprite);
  }

  // 5D. Globular Star Clusters (Omega Centauri & Pleiades)
  const clusterPleiades = createStarCluster(700, new THREE.Vector3(1250, 420, -1150), 220, [
    new THREE.Color(0x00f0ff),
    new THREE.Color(0x38bdf8),
    new THREE.Color(0xffffff),
    new THREE.Color(0xa5f3fc),
  ]);
  scene.add(clusterPleiades);

  const clusterCentauri = createStarCluster(650, new THREE.Vector3(-1300, -380, 1000), 200, [
    new THREE.Color(0xf59e0b),
    new THREE.Color(0xfbbf24),
    new THREE.Color(0xfef08a),
    new THREE.Color(0xffffff),
  ]);
  scene.add(clusterCentauri);

  // 5E. Shooting Stars Shower (6 Channels / Multi-Colored Meteors)
  shootingStars.length = 0;
  const sColors = [0x00f0ff, 0xf472b6, 0xfef08a, 0xa5f3fc, 0xd8b4fe, 0x34d399];
  for (let s = 0; s < 6; s++) {
    const sGeo = new THREE.BufferGeometry();
    const sPositions = new Float32Array(6);
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPositions, 3));
    const sMat = new THREE.LineBasicMaterial({
      color: sColors[s % sColors.length],
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const sLine = new THREE.Line(sGeo, sMat);
    scene.add(sLine);

    shootingStars.push({
      line: sLine,
      geometry: sGeo,
      active: false,
      progress: 0,
      speed: 1.4 + Math.random() * 0.9,
      startPos: new THREE.Vector3(),
      dir: new THREE.Vector3(),
      length: 160 + Math.random() * 90,
      cooldown: Math.random() * 2.2 + s * 0.8,
      material: sMat,
    });
  }

  // 5F. Outer Kuiper Asteroid Belt (380 Asteroids)
  const astGeo = new THREE.DodecahedronGeometry(1.2, 1);
  const astMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.88,
    metalness: 0.1,
    flatShading: true,
  });
  asteroidBelt = new THREE.InstancedMesh(astGeo, astMat, asteroidCount);
  asteroidData.length = 0;

  const dummy = new THREE.Object3D();
  for (let a = 0; a < asteroidCount; a++) {
    const radius = Math.random() * 300 + 610; // 610 to 910
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 85;
    const speed = (Math.random() * 0.04 + 0.02) * (Math.random() > 0.5 ? 1 : 0.9);
    const rotSpeed = Math.random() * 0.02 + 0.01;
    const scale = Math.random() * 3.6 + 1.6;

    dummy.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);
    dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    dummy.updateMatrix();
    asteroidBelt.setMatrixAt(a, dummy.matrix);

    asteroidData.push({ radius, angle, speed, y, rotSpeed, scale });
  }
  asteroidBelt.instanceMatrix.needsUpdate = true;
  scene.add(asteroidBelt);

  // 5G. Wandering Periodic Comet Halley (With 80-Particle Cyan Ion Stream)
  const cometGeo = new THREE.SphereGeometry(6.5, 24, 24);
  const cometMat = new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.85,
    roughness: 0.3,
  });
  cometMesh = new THREE.Mesh(cometGeo, cometMat);
  cometMesh.userData = { body: cometBody };
  scene.add(cometMesh);

  // Comet Aura Glow
  const cometAuraGeo = new THREE.SphereGeometry(10.5, 16, 16);
  const cometAuraMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.45,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const cometAura = new THREE.Mesh(cometAuraGeo, cometAuraMat);
  cometMesh.add(cometAura);

  // Comet Trailing Particle Tail
  const tailGeo = new THREE.BufferGeometry();
  const tailPositions = new Float32Array(cometTailCount * 3);
  const tailColors = new Float32Array(cometTailCount * 3);
  const tailPalette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xa5f3fc),
    new THREE.Color(0x38bdf8),
    new THREE.Color(0x818cf8),
  ];
  for (let t = 0; t < cometTailCount; t++) {
    tailPositions[t * 3] = 0;
    tailPositions[t * 3 + 1] = 0;
    tailPositions[t * 3 + 2] = 0;
    const c = tailPalette[t % tailPalette.length];
    tailColors[t * 3] = c.r;
    tailColors[t * 3 + 1] = c.g;
    tailColors[t * 3 + 2] = c.b;
  }
  tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
  tailGeo.setAttribute('color', new THREE.BufferAttribute(tailColors, 3));
  const tailMat = new THREE.PointsMaterial({
    size: 4.8,
    map: getCosmicDustParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  cometTailPoints = new THREE.Points(tailGeo, tailMat);
  scene.add(cometTailPoints);

  // 5H. UFO / Alien Scout Ship
  ufoGroup = buildUFOShip();
  scene.add(ufoGroup);

  // 5I. Modular Space Station (Aegis Outpost-1)
  stationGroup = buildSpaceStation();
  scene.add(stationGroup);

  // 5J. Deep Space Exploration Cruiser (Starship Hermes-IV)
  starshipGroup = buildStarshipCruiser();
  scene.add(starshipGroup);

  // 5K. Micro-Singularity Black Hole (Gargantua-X)
  blackHoleGroup = buildBlackHole();
  scene.add(blackHoleGroup);

  // 5L. High-Energy Pulsar (PSR-0950)
  pulsarGroup = buildPulsar();
  scene.add(pulsarGroup);

  // 5M. Deep Space Communications Satellite (Chronos Relay)
  satelliteGroup = buildSatelliteProbe();
  scene.add(satelliteGroup);

  // 5N. Ringed Alien Exoplanet (Kepler-452b)
  exoplanetGroup = buildExoplanetKepler();
  scene.add(exoplanetGroup);

  // 5O. JWST Deep Space Infrared Observatory
  jwstGroup = buildJWSTelescope();
  scene.add(jwstGroup);

  // 5P. Helix Eye Supernova Remnant / Planetary Nebula Core
  helixGroup = buildHelixEyeNebula();
  scene.add(helixGroup);

  // 5Q. Titan Alien Mothership (Vanguard Titan)
  mothershipGroup = buildTitanMothership();
  scene.add(mothershipGroup);

  // 5R. Crystal Monolith (Xenolith Prime)
  monolithGroup = buildCrystalMonolith();
  scene.add(monolithGroup);

  // 5S. Interstellar Visitor Asteroid ('Oumuamua)
  oumuamuaGroup = buildOumuamua();
  scene.add(oumuamuaGroup);

  // 5T. LightSail Photonic Deep Space Probe
  lightsailGroup = buildLightSail();
  scene.add(lightsailGroup);

  // 5U. Sirius Binary Star System
  binaryGroup = buildBinaryStars();
  scene.add(binaryGroup);

  // 5V. Wormhole Vortex Artemis-X
  wormholeGroup = buildWormholeVortex();
  scene.add(wormholeGroup);

  // 5W. Valkyrie-X Starfighter Interceptor
  fighterGroup = buildValkyrieFighter();
  scene.add(fighterGroup);

  // 5X. Astraea Cosmic Diamond
  crystalGroup = buildCosmicCrystal();
  scene.add(crystalGroup);

  // 5Y. Bifrost Skyhook Freight Depot
  skyhookGroup = buildBifrostSkyhook();
  scene.add(skyhookGroup);

  // 5Z. Pyro-Prime Volcanic World
  magmaGroup = buildMagmaExoplanet();
  scene.add(magmaGroup);

  // 5AA. Magnetar SGR-1806
  magnetarGroup = buildMagnetar();
  scene.add(magnetarGroup);

  // 5AB. Sentinel Recon Drone Array
  droneGroup = buildSentinelDrones();
  scene.add(droneGroup);

  // 5AC. Psyche-16 Mining Outpost Asteroid
  psycheGroup = buildPsycheMiningAsteroid();
  scene.add(psycheGroup);

  // 5AD. Hyperion Dyson Sol-Collector Swarm
  dysonGroup = buildDysonSwarm();
  scene.add(dysonGroup);

  // 5AE. Glacio-7 Diamond Crystal World
  glacioGroup = buildGlacioPlanet();
  scene.add(glacioGroup);

  // 5AF. Chronos Tachyon Hyper-Gateway
  chronosRiftGroup = buildChronosGateway();
  scene.add(chronosRiftGroup);

  // 5AG. Zephyrus Monarch Gas Giant
  zephyrusGroup = buildZephyrusGasGiant();
  scene.add(zephyrusGroup);

  // 5AH. Ancient Starlight Void Leviathan Fossil
  leviathanGroup = buildVoidLeviathan();
  scene.add(leviathanGroup);

  // 5AI. Genesis Elysium Centrifugal Ringworld
  ringworldGroup = buildElysiumRingworld();
  scene.add(ringworldGroup);

  // 5AJ. Phoenix Protostellar Nursery
  protostarGroup = buildProtostarPhoenix();
  scene.add(protostarGroup);

  // 5AK. Tesseract Prime Hyperdimensional 4D Portal
  tesseractGroup = buildTesseractArtifact();
  scene.add(tesseractGroup);

  // 5AL. Solaris Vulcan Heavy Asteroid Foundry
  vulcanGroup = buildVulcanFoundry();
  scene.add(vulcanGroup);

  // 5AM. Abyssal Dark Matter Crystal Cluster
  geodeGroup = buildDarkMatterGeode();
  scene.add(geodeGroup);

  // 5AN. Crown of the Cosmic King (Mahkota King)
  crownGroup = buildCosmicCrown();
  scene.add(crownGroup);

  // 5AO. Motor BeAT Karbu Antariksa
  beatGroup = buildMotorBeat();
  scene.add(beatGroup);

  // 5AP. Cyber Matrix Quantum Laptop
  laptopGroup = buildCyberLaptop();
  scene.add(laptopGroup);

  // 5AQ. Neptunia Prime Ocean World
  neptuniaGroup = buildNeptuniaOceanWorld();
  scene.add(neptuniaGroup);

  // 5AR. Voyager Prime Interstellar Probe
  voyagerGroup = buildVoyagerProbe();
  scene.add(voyagerGroup);

  // 5AS. Cangkir Kopi Kosmik Tubruk
  coffeeGroup = buildCosmicCoffee();
  scene.add(coffeeGroup);

  // 5AT. Cosmic Stratocaster Electric Guitar
  guitarGroup = buildCosmicGuitar();
  scene.add(guitarGroup);

  // 5AU. Cosmic Golden Maneki-Neko Lucky Cat
  nekoGroup = buildCosmicLuckyCat();
  scene.add(nekoGroup);

  // 6. The Sun (Sol Anko)
  const sunGeo = new THREE.SphereGeometry(38, 48, 48);
  const sunMat = new THREE.MeshBasicMaterial({
    map: createSunTexture(),
  });
  sunMesh = new THREE.Mesh(sunGeo, sunMat);
  sunMesh.userData = { body: solarSystemBodies[0] };
  scene.add(sunMesh);

  // Radiant Sunburst Corona Flare Sprite
  const sunCoronaSprite = createCoronaSprite();
  sunMesh.add(sunCoronaSprite);

  // Pulsing Coronal Halo
  const coronaGeo = new THREE.SphereGeometry(42, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.45,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  sunCorona = new THREE.Mesh(coronaGeo, coronaMat);
  scene.add(sunCorona);

  // 7. Celestial Bodies (Planets & Orbit Lines)
  planets3D.length = 0;

  for (const body of solarSystemBodies) {
    if (body.orbitRadius === 0) continue;

    const bodyColor = new THREE.Color(body.color);

    // A. 3D Glowing Orbit Ring Mesh (Default: visible soft starlight glow; Hovered/Selected: body.color!)
    const orbitWidth = 1.2;
    const ringGeo = new THREE.RingGeometry(
      body.orbitRadius - orbitWidth * 0.5,
      body.orbitRadius + orbitWidth * 0.5,
      128,
    );
    // Normal: Clearly visible soft starlight glow
    const orbitGlowNormal = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.10,
      blending: THREE.AdditiveBlending,
    });
    // Active/Hover: Highlight in planet's signature vibrant color!
    const orbitGlowActive = new THREE.MeshBasicMaterial({
      color: bodyColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const orbitGlowRing = new THREE.Mesh(ringGeo, orbitGlowNormal);
    orbitGlowRing.rotation.x = Math.PI / 2; // Flat on X-Z plane
    scene.add(orbitGlowRing);

    // Sharp Core Center Line (Default: bright visible starlight grey; Active/Hover: body.color)
    const pointsCount = 128;
    const orbitPoints: THREE.Vector3[] = [];
    for (let p = 0; p <= pointsCount; p++) {
      const theta = (p / pointsCount) * Math.PI * 2;
      orbitPoints.push(
        new THREE.Vector3(
          Math.cos(theta) * body.orbitRadius,
          0,
          Math.sin(theta) * body.orbitRadius,
        ),
      );
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const matNormal = new THREE.LineBasicMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.30,
    });
    const matActive = new THREE.LineBasicMaterial({
      color: bodyColor,
      transparent: true,
      opacity: 1.0,
    });

    const orbitLine = new THREE.Line(orbitGeo, matNormal);
    scene.add(orbitLine);

    // B. Texture selection based on category
    let planetTexture: THREE.CanvasTexture;
    if (body.planetCategory === 'gas-giant') {
      planetTexture = createGasGiantTexture(body.color, body.accentColor, '#fef08a');
    } else if (body.planetCategory === 'terrestrial') {
      planetTexture = createTerrestrialTexture(body.accentColor, body.color);
    } else if (body.planetCategory === 'cyber') {
      planetTexture = createCyberTexture();
    } else if (body.planetCategory === 'ice') {
      planetTexture = createIceTexture(body.color, body.accentColor);
    } else if (body.planetCategory === 'desert') {
      planetTexture = createDesertTexture(body.color, body.accentColor);
    } else {
      planetTexture = createGasGiantTexture(body.color, body.accentColor, '#ffffff');
    }

    // C. Planet Mesh (Scaled up for maximum visibility & detail!)
    const pRadius = body.baseRadius * 1.35;
    const pGeo = new THREE.SphereGeometry(pRadius, 36, 36);
    const pMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.5,
      metalness: 0.12,
      emissive: bodyColor,
      emissiveIntensity: 0.26, // Self-luminous so night side is always colorful & visible!
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.userData = { body };
    scene.add(pMesh);

    // Atmospheric Glow Halo around planet
    const glowGeo = new THREE.SphereGeometry(pRadius * 1.14, 28, 28);
    const glowMat = new THREE.MeshBasicMaterial({
      color: bodyColor,
      transparent: true,
      opacity: 0.26,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    pMesh.add(glowMesh);

    // Axial tilt
    pMesh.rotation.z = 0.28;

    // D. 3D Rings (if applicable)
    let ringsMesh: THREE.Mesh | undefined;
    if (body.hasRings) {
      const ringGeo = new THREE.RingGeometry(pRadius * 1.35, pRadius * 2.35, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        map: createRingTexture(body.ringsColor || body.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88,
        roughness: 0.7,
        emissive: new THREE.Color(body.ringsColor || body.color),
        emissiveIntensity: 0.2,
      });
      ringsMesh = new THREE.Mesh(ringGeo, ringMat);
      ringsMesh.rotation.x = Math.PI / 2;
      pMesh.add(ringsMesh);
    }

    // E. Skills Planet Orbiting Moons
    const moons: THREE.Mesh[] = [];
    if (body.type === 'skills') {
      const moonGeo = new THREE.SphereGeometry(2.8, 16, 16);
      const moonMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      for (let m = 0; m < 3; m++) {
        const moon = new THREE.Mesh(moonGeo, moonMat);
        scene.add(moon);
        moons.push(moon);
      }
    }

    // F. Selection Indicator Ring (Targeting Reticle)
    const selRingGeo = new THREE.RingGeometry(pRadius * 1.3, pRadius * 1.45, 36);
    const selRingMat = new THREE.MeshBasicMaterial({
      color: bodyColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    const selectionRing = new THREE.Mesh(selRingGeo, selRingMat);
    selectionRing.rotation.x = Math.PI / 2;
    pMesh.add(selectionRing);

    planets3D.push({
      body,
      mesh: pMesh,
      orbitLine,
      orbitGlowRing,
      orbitMaterialNormal: matNormal,
      orbitMaterialActive: matActive,
      orbitGlowNormal,
      orbitGlowActive,
      orbitRadius: body.orbitRadius,
      orbitSpeed: body.orbitSpeed,
      initialAngle: body.initialAngle,
      axialSpinSpeed: 0.5 + Math.random() * 0.5,
      ringsMesh,
      moons,
      selectionRing,
    });
  }

  // 8. Raycaster & Coordinates
  raycaster = new THREE.Raycaster();
  mouseVector = new THREE.Vector2(-1000, -1000);
};

/* =========================================================
   ANIMATION & RENDER LOOP
   ========================================================= */

const isGalaxyObject = (bodyId: string | null | undefined): boolean => {
  if (!bodyId) return false;
  if (bodyId === 'galactic-core') return true;
  if (
    bodyId === 'easter-teapot' ||
    bodyId === 'easter-dont-panic' ||
    bodyId === 'easter-rubber-duck' ||
    bodyId === 'easter-rubiks' ||
    bodyId === 'easter-invader' ||
    bodyId === 'easter-delorean' ||
    bodyId === 'easter-gameboy' ||
    bodyId === 'easter-ramen' ||
    bodyId === 'easter-floppy'
  ) {
    return true;
  }
  return Boolean(
    galaxySystem?.interactiveMeshes.some(
      (m) => m.name === bodyId || (m.userData && m.userData.body && m.userData.body.id === bodyId),
    ),
  );
};

const renderLoop = (timestamp: number) => {
  if (lastTimestamp === 0) lastTimestamp = timestamp;
  const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
  lastTimestamp = timestamp;

  if (isTabVisible) {
    simulationTime += dt;
  }

  // Distance LOD measurement from the cosmic origin (0, 0, 0)
  const cosmicDist = camera ? camera.position.length() : 0;
  const isGalaxyFocus =
    isGalaxyObject(activeTrackingId) || isGalaxyObject(props.selectedBodyId);
  // When actively focusing on galaxy core or galactic easter eggs, galaxy is ALWAYS at full brilliance (>= 15000)
  const galaxyLODDist = isGalaxyFocus ? 26000 : cosmicDist;

  // A0. Constellation Network Subtle Stellar Pulse & Zoom Distance LOD (Hidden in galaxy view)
  if (constellationSystem) {
    constellationSystem.update(simulationTime, isGalaxyFocus ? 10000 : cosmicDist);
  }

  // A0-Galaxy. 3D Spiral Galaxy Dynamic Rotation & Distance LOD
  if (galaxySystem && camera) {
    const normMouse =
      mouseVector && mouseVector.x > -500 ? { x: mouseVector.x, y: mouseVector.y } : undefined;
    galaxySystem.update(galaxyLODDist, dt, simulationTime, normMouse);
  }

  // Smooth Distance LOD: Fade out solar system cosmic dust, old stardust river, starfield & nebulae on zoom out (D = 2800 -> 5200)
  const solarFade = isGalaxyFocus ? 0 : Math.max(0, Math.min(1.0, 1.0 - (cosmicDist - 2800) / 2400));
  const isSolarActive = solarFade > 0.005;

  if (cosmicDustPoints) {
    cosmicDustPoints.visible = isSolarActive;
    (cosmicDustPoints.material as THREE.PointsMaterial).opacity = 0.96 * solarFade;
  }
  if (galacticStreamPoints) {
    galacticStreamPoints.visible = isSolarActive;
    (galacticStreamPoints.material as THREE.PointsMaterial).opacity = 0.92 * solarFade;
  }
  if (starFieldPoints) {
    starFieldPoints.visible = isSolarActive;
    (starFieldPoints.material as THREE.PointsMaterial).opacity = 0.98 * solarFade;
  }
  for (let n = 0; n < solarNebulaSprites.length; n++) {
    const neb = solarNebulaSprites[n];
    neb.visible = isSolarActive;
    neb.material.opacity = ((neb.userData.baseOpacity as number) || 0.4) * solarFade;
  }

  // A. Sun Animation
  if (sunMesh && sunCorona) {
    sunMesh.rotation.y += 0.003;
    const pulse = 1 + Math.sin(simulationTime * 2.5) * 0.04;
    sunCorona.scale.set(pulse, pulse, pulse);
  }

  // B. Dynamic Cosmic Particles Orbiting & Undulating (Inner & Outer Volumetric Field)
  if (cosmicDustPoints) {
    const pos = cosmicDustPoints.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < dustCount; i++) {
      dustAngles[i] += dustSpeeds[i] * dt * 0.5;
      const r = dustRadii[i];
      const a = dustAngles[i];
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = dustYBase[i] + Math.sin(simulationTime * 1.4 + i) * 6;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    cosmicDustPoints.geometry.attributes.position.needsUpdate = true;
  }

  // C. Shooting Stars (Meteors / Bintang Jatuh) Animation
  for (const star of shootingStars) {
    if (!star.active) {
      star.cooldown -= dt;
      if (star.cooldown <= 0) {
        star.active = true;
        star.progress = 0;
        star.speed = 1.3 + Math.random() * 0.9;
        star.length = 160 + Math.random() * 100;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.35 + 0.1;
        const dist = 900 + Math.random() * 450;
        star.startPos.set(
          dist * Math.sin(phi) * Math.cos(theta),
          Math.random() * 350 + 250,
          dist * Math.cos(phi),
        );

        star.dir
          .set(
            (Math.random() - 0.5) * 1.6,
            -(Math.random() * 0.8 + 0.4),
            (Math.random() - 0.5) * 1.6,
          )
          .normalize();
      }
    } else {
      star.progress += star.speed * dt;
      const totalDist = 950;
      const headDist = star.progress * totalDist;
      const tailDist = Math.max(0, headDist - star.length);

      const head = star.startPos.clone().addScaledVector(star.dir, headDist);
      const tail = star.startPos.clone().addScaledVector(star.dir, tailDist);

      const pos = star.geometry.attributes.position.array as Float32Array;
      pos[0] = tail.x;
      pos[1] = tail.y;
      pos[2] = tail.z;
      pos[3] = head.x;
      pos[4] = head.y;
      pos[5] = head.z;
      star.geometry.attributes.position.needsUpdate = true;

      if (star.progress < 0.25) {
        star.material.opacity = star.progress / 0.25;
      } else if (star.progress > 0.7) {
        star.material.opacity = (1 - star.progress) / 0.3;
      } else {
        star.material.opacity = 0.95;
      }

      if (star.progress >= 1) {
        star.active = false;
        star.material.opacity = 0;
        star.cooldown = Math.random() * 4 + 1.5;
      }
    }
  }

  // D. Kuiper Asteroid Belt Slow Cosmic Orbit
  if (asteroidBelt) {
    const dummy = new THREE.Object3D();
    for (let a = 0; a < asteroidCount; a++) {
      const ast = asteroidData[a];
      ast.angle += ast.speed * dt * 0.2 * props.orbitSpeedMultiplier;
      dummy.position.set(
        Math.cos(ast.angle) * ast.radius,
        ast.y + Math.sin(simulationTime * 0.5 + a) * 3,
        Math.sin(ast.angle) * ast.radius,
      );
      dummy.scale.set(ast.scale, ast.scale, ast.scale);
      dummy.rotation.y += ast.rotSpeed;
      dummy.updateMatrix();
      asteroidBelt.setMatrixAt(a, dummy.matrix);
    }
    asteroidBelt.instanceMatrix.needsUpdate = true;
  }

  // E. Wandering Comet Halley Along Inclined Path with Streaming Ion Tail
  if (cometMesh && cometTailPoints) {
    const cAngle = simulationTime * 0.12 * props.orbitSpeedMultiplier + 0.8;
    const cx = Math.cos(cAngle) * 720;
    const cz = Math.sin(cAngle) * 540;
    const cy = Math.sin(cAngle * 1.5) * 95;
    cometMesh.position.set(cx, cy, cz);
    cometMesh.rotation.y += dt * 0.8;

    cometTailHistory.unshift(new THREE.Vector3(cx, cy, cz));
    if (cometTailHistory.length > cometTailCount) {
      cometTailHistory.pop();
    }
    const tailPos = cometTailPoints.geometry.attributes.position.array as Float32Array;
    for (let t = 0; t < cometTailHistory.length; t++) {
      const p = cometTailHistory[t];
      const spread = (t / cometTailCount) * 10;
      tailPos[t * 3] = p.x + (Math.random() - 0.5) * spread;
      tailPos[t * 3 + 1] = p.y + (Math.random() - 0.5) * spread;
      tailPos[t * 3 + 2] = p.z + (Math.random() - 0.5) * spread;
    }
    cometTailPoints.geometry.attributes.position.needsUpdate = true;
  }

  // G. Planet Orbital Revolution & Axial Self-Spin
  for (const p of planets3D) {
    const angle =
      p.initialAngle + simulationTime * p.orbitSpeed * 0.32 * props.orbitSpeedMultiplier;
    const px = Math.cos(angle) * p.orbitRadius;
    const pz = Math.sin(angle) * p.orbitRadius;

    p.mesh.position.set(px, 0, pz);
    p.mesh.rotation.y += p.axialSpinSpeed * dt;

    // Animate Moons around Skills planet
    if (p.moons && p.moons.length > 0) {
      for (let m = 0; m < p.moons.length; m++) {
        const mAngle = simulationTime * 1.8 + (m * (Math.PI * 2)) / p.moons.length;
        const mDist = p.body.baseRadius * 1.35 * 1.9;
        p.moons[m].position.set(
          px + Math.cos(mAngle) * mDist,
          Math.sin(mAngle * 0.8) * 4,
          pz + Math.sin(mAngle) * mDist,
        );
      }
    }

    // Update Orbit Line & Glow Ring Material (Light Grey by default, Highlighted in color when active/hovered!)
    const isTargeted = props.selectedBodyId === p.body.id || hoveredBody.value?.id === p.body.id;
    p.orbitLine.material = isTargeted ? p.orbitMaterialActive : p.orbitMaterialNormal;
    p.orbitGlowRing.material = isTargeted ? p.orbitGlowActive : p.orbitGlowNormal;

    // Selection reticle opacity & rotation
    if (p.selectionRing) {
      (p.selectionRing.material as THREE.MeshBasicMaterial).opacity = isTargeted ? 0.95 : 0;
      if (isTargeted) {
        p.selectionRing.rotation.z += 0.02;
      }
    }
  }

  // H. Animate Deep Space Objects & Phenomena
  // 1. UFO / Alien Scout Ship (Bobbing, dynamic tilt, orbital roam, pulsing beam)
  if (ufoGroup) {
    const ufoAngle =
      ufoBody.initialAngle +
      simulationTime * ufoBody.orbitSpeed * 0.28 * props.orbitSpeedMultiplier;
    const ux = Math.cos(ufoAngle) * ufoBody.orbitRadius;
    const uz = Math.sin(ufoAngle) * ufoBody.orbitRadius;
    const uy = 45 + Math.sin(simulationTime * 2.2) * 6;
    ufoGroup.position.set(ux, uy, uz);
    ufoGroup.rotation.y += dt * 0.5;
    ufoGroup.rotation.z = Math.sin(simulationTime * 1.6) * 0.12;
    ufoGroup.rotation.x = Math.cos(simulationTime * 1.4) * 0.08;

    if (ufoLightsRing) {
      ufoLightsRing.rotation.y += dt * 3.5;
    }
    if (ufoTractorBeam) {
      (ufoTractorBeam.material as THREE.MeshBasicMaterial).opacity =
        0.16 + Math.sin(simulationTime * 3.5) * 0.07;
    }
  }

  // 2. Modular Space Station (Aegis Outpost-1: Rotating habitat ring, orbit, blinking strobe LEDs)
  if (stationGroup) {
    const stAngle =
      stationBody.initialAngle +
      simulationTime * stationBody.orbitSpeed * 0.25 * props.orbitSpeedMultiplier;
    const sx = Math.cos(stAngle) * stationBody.orbitRadius;
    const sz = Math.sin(stAngle) * stationBody.orbitRadius;
    stationGroup.position.set(sx, -28, sz);
    stationGroup.rotation.y += dt * 0.08;

    if (stationHabitatRing) {
      stationHabitatRing.rotation.z += dt * 0.6;
    }
    const strobeState = Math.sin(simulationTime * 4.5) > 0.2;
    for (const mat of stationStrobes) {
      mat.opacity = strobeState ? 1.0 : 0.2;
    }
  }

  // 3. Starship Hermes-IV Cruiser (Forward cruising, banking tilt, pulsing ion plume)
  if (starshipGroup) {
    const shipAngle =
      starshipBody.initialAngle +
      simulationTime * starshipBody.orbitSpeed * 0.3 * props.orbitSpeedMultiplier;
    const hx = Math.cos(shipAngle) * starshipBody.orbitRadius;
    const hz = Math.sin(shipAngle) * starshipBody.orbitRadius;
    starshipGroup.position.set(hx, 62 + Math.sin(simulationTime * 0.8) * 8, hz);
    starshipGroup.rotation.y = -shipAngle + Math.PI / 2;
    starshipGroup.rotation.z = Math.sin(simulationTime * 1.2) * 0.05;

    for (let pIdx = 0; pIdx < starshipPlumes.length; pIdx++) {
      const scaleY = 1.0 + Math.sin(simulationTime * 10 + pIdx) * 0.18;
      starshipPlumes[pIdx].scale.set(1.0, scaleY, 1.0);
    }
  }

  // 4. Micro-Singularity Black Hole (Swirling accretion disk & lensing distortion)
  if (blackHoleGroup) {
    if (blackHoleAccretion) {
      blackHoleAccretion.rotation.z += dt * 0.22;
    }
    if (blackHoleLensing) {
      blackHoleLensing.rotation.z -= dt * 0.12;
    }
  }

  // 5. Pulsar PSR-0950 (Rapid rotation & flaring relativistic jets)
  if (pulsarGroup) {
    pulsarGroup.rotation.y += dt * 4.2;
    pulsarGroup.rotation.x = Math.sin(simulationTime * 1.5) * 0.15;
    if (pulsarJetsGroup) {
      const jetScale = 1.0 + Math.sin(simulationTime * 12) * 0.12;
      pulsarJetsGroup.scale.set(jetScale, 1.0, jetScale);
    }
  }

  // 6. Deep Space Communications Satellite (Orbital drift & blinking beacon)
  if (satelliteGroup) {
    const satAngle =
      satelliteBody.initialAngle +
      simulationTime * satelliteBody.orbitSpeed * 0.32 * props.orbitSpeedMultiplier;
    const cx = Math.cos(satAngle) * satelliteBody.orbitRadius;
    const cz = Math.sin(satAngle) * satelliteBody.orbitRadius;
    satelliteGroup.position.set(cx, -42 + Math.sin(simulationTime * 1.1) * 4, cz);
    satelliteGroup.rotation.y += dt * 0.15;
    satelliteGroup.rotation.x = Math.sin(simulationTime * 0.9) * 0.08;

    if (satelliteBeaconMat) {
      satelliteBeaconMat.opacity = 0.3 + Math.abs(Math.sin(simulationTime * 3.8)) * 0.7;
    }
  }

  // 7. Ringed Alien Exoplanet (Kepler-452b: axial spin, orbital motion, orbiting moon)
  if (exoplanetGroup) {
    const exoAngle =
      exoplanetBody.initialAngle +
      simulationTime * exoplanetBody.orbitSpeed * 0.28 * props.orbitSpeedMultiplier;
    const exX = Math.cos(exoAngle) * exoplanetBody.orbitRadius;
    const exZ = Math.sin(exoAngle) * exoplanetBody.orbitRadius;
    exoplanetGroup.position.set(exX, 75 + Math.sin(simulationTime * 0.7) * 8, exZ);
    if (exoplanetMesh) {
      exoplanetMesh.rotation.y += dt * 0.4;
    }
    if (exoplanetMoon) {
      const moonAngle = simulationTime * 1.8;
      exoplanetMoon.position.set(
        Math.cos(moonAngle) * 32,
        Math.sin(moonAngle * 0.6) * 6,
        Math.sin(moonAngle) * 32,
      );
    }
  }

  // 8. JWST Deep Space Observatory (Slow outer orbit, sunshield orientation)
  if (jwstGroup) {
    const jwstAngle =
      jwstBody.initialAngle +
      simulationTime * jwstBody.orbitSpeed * 0.3 * props.orbitSpeedMultiplier;
    const jx = Math.cos(jwstAngle) * jwstBody.orbitRadius;
    const jz = Math.sin(jwstAngle) * jwstBody.orbitRadius;
    jwstGroup.position.set(jx, -55 + Math.sin(simulationTime * 0.9) * 5, jz);
    jwstGroup.rotation.y = -jwstAngle;
  }

  // 9. Helix Eye Supernova Remnant (Slow multi-ring pulsation & drift)
  if (helixGroup) {
    for (let h = 0; h < helixRings.length; h++) {
      helixRings[h].rotation.z += dt * (0.04 + h * 0.02) * (h % 2 === 0 ? 1 : -1);
    }
  }

  // 10. Titan Alien Mothership (Slow majestic drift, pulsing reactor core)
  if (mothershipGroup) {
    const motherAngle =
      mothershipBody.initialAngle +
      simulationTime * mothershipBody.orbitSpeed * 0.2 * props.orbitSpeedMultiplier;
    const mx = Math.cos(motherAngle) * mothershipBody.orbitRadius;
    const mz = Math.sin(motherAngle) * mothershipBody.orbitRadius;
    mothershipGroup.position.set(mx, 320 + Math.sin(simulationTime * 0.5) * 12, mz);
    mothershipGroup.rotation.y = -motherAngle + Math.PI / 2;

    if (mothershipCoreGlow) {
      const coreScale = 1.0 + Math.sin(simulationTime * 5.0) * 0.15;
      mothershipCoreGlow.scale.set(coreScale, coreScale, coreScale);
    }
  }

  // 11. Crystal Monolith (Slow ominous rotation, holographic glyph flicker)
  if (monolithGroup) {
    const monoAngle =
      monolithBody.initialAngle +
      simulationTime * monolithBody.orbitSpeed * 0.3 * props.orbitSpeedMultiplier;
    const monX = Math.cos(monoAngle) * monolithBody.orbitRadius;
    const monZ = Math.sin(monoAngle) * monolithBody.orbitRadius;
    monolithGroup.position.set(monX, 90 + Math.sin(simulationTime * 1.3) * 6, monZ);
    monolithGroup.rotation.y += dt * 0.3;
    monolithGroup.rotation.x = Math.sin(simulationTime * 0.8) * 0.08;

    if (monolithGlyphMat) {
      monolithGlyphMat.opacity = 0.35 + Math.sin(simulationTime * 6.0) * 0.2;
    }
  }

  // 12. Interstellar Visitor Asteroid ('Oumuamua dynamic end-over-end tumbling)
  if (oumuamuaGroup) {
    const ouAngle =
      oumuamuaBody.initialAngle +
      simulationTime * oumuamuaBody.orbitSpeed * 0.35 * props.orbitSpeedMultiplier;
    const oux = Math.cos(ouAngle) * oumuamuaBody.orbitRadius;
    const ouz = Math.sin(ouAngle) * oumuamuaBody.orbitRadius;
    oumuamuaGroup.position.set(oux, -65 + Math.sin(simulationTime * 1.5) * 10, ouz);
    oumuamuaGroup.rotation.x += dt * 1.2;
    oumuamuaGroup.rotation.y += dt * 0.8;
    oumuamuaGroup.rotation.z += dt * 0.5;
  }

  // 13. LightSail Photonic Probe (Gentle wave-glint oscillation)
  if (lightsailGroup) {
    const sailAngle =
      lightsailBody.initialAngle +
      simulationTime * lightsailBody.orbitSpeed * 0.32 * props.orbitSpeedMultiplier;
    const sx = Math.cos(sailAngle) * lightsailBody.orbitRadius;
    const sz = Math.sin(sailAngle) * lightsailBody.orbitRadius;
    lightsailGroup.position.set(sx, 35 + Math.sin(simulationTime * 1.2) * 5, sz);
    lightsailGroup.rotation.y = -sailAngle + Math.PI / 4;
    lightsailGroup.rotation.z = Math.sin(simulationTime * 1.6) * 0.1;
  }

  // 14. Sirius Binary Star System (Mutual barycenter orbit & plasma streamer animation)
  if (binaryGroup) {
    const binAngle = simulationTime * 0.6;
    if (binaryStarA) {
      binaryStarA.position.set(Math.cos(binAngle) * 22, 0, Math.sin(binAngle) * 22);
      binaryStarA.rotation.y += dt * 0.5;
    }
    if (binaryStarB) {
      binaryStarB.position.set(-Math.cos(binAngle) * 30, 0, -Math.sin(binAngle) * 30);
      binaryStarB.rotation.y += dt * 1.2;
    }
    if (binaryStreamer && binaryStarA && binaryStarB) {
      const pts = [
        binaryStarA.position.clone(),
        new THREE.Vector3(0, Math.sin(binAngle * 2) * 4, 0),
        binaryStarB.position.clone(),
      ];
      binaryStreamer.geometry.setFromPoints(pts);
    }
  }

  // 15. Wormhole Vortex Artemis-X (Counter-rotating spacetime distortion rings)
  if (wormholeGroup) {
    for (let r = 0; r < wormholeRings.length; r++) {
      wormholeRings[r].rotation.z += dt * (0.35 + r * 0.15) * (r % 2 === 0 ? 1 : -1);
    }
  }

  // 16. Valkyrie-X Interceptor Starfighter (High-speed patrol orbit, banking turn & plume pulse)
  if (fighterGroup) {
    const fAngle =
      fighterBody.initialAngle +
      simulationTime * fighterBody.orbitSpeed * 0.45 * props.orbitSpeedMultiplier;
    const fx = Math.cos(fAngle) * fighterBody.orbitRadius;
    const fz = Math.sin(fAngle) * fighterBody.orbitRadius;
    fighterGroup.position.set(fx, 40 + Math.sin(simulationTime * 2.2) * 6, fz);
    fighterGroup.rotation.y = -fAngle + Math.PI / 2;
    fighterGroup.rotation.z = Math.sin(simulationTime * 2.8) * 0.22;

    for (let p = 0; p < fighterPlumes.length; p++) {
      const pScale = 1.0 + Math.sin(simulationTime * 18 + p) * 0.28;
      fighterPlumes[p].scale.set(1.0, pScale, 1.0);
    }
  }

  // 17. Astraea Cosmic Diamond (Interstellar faceted gem slow tumble & core refraction)
  if (crystalGroup) {
    const cAngle =
      crystalBody.initialAngle +
      simulationTime * crystalBody.orbitSpeed * 0.3 * props.orbitSpeedMultiplier;
    const cx = Math.cos(cAngle) * crystalBody.orbitRadius;
    const cz = Math.sin(cAngle) * crystalBody.orbitRadius;
    crystalGroup.position.set(cx, -45 + Math.sin(simulationTime * 1.2) * 6, cz);
    crystalGroup.rotation.y += dt * 0.45;
    crystalGroup.rotation.x += dt * 0.25;

    if (crystalCoreGlow) {
      const cPulse = 1.0 + Math.sin(simulationTime * 4.0) * 0.2;
      crystalCoreGlow.scale.set(cPulse, cPulse, cPulse);
    }
  }

  // 18. Bifrost Skyhook Depot (Orbital freight transfer platform drift)
  if (skyhookGroup) {
    const skAngle =
      skyhookBody.initialAngle +
      simulationTime * skyhookBody.orbitSpeed * 0.28 * props.orbitSpeedMultiplier;
    const skx = Math.cos(skAngle) * skyhookBody.orbitRadius;
    const skz = Math.sin(skAngle) * skyhookBody.orbitRadius;
    skyhookGroup.position.set(skx, 50 + Math.sin(simulationTime * 0.9) * 4, skz);
    skyhookGroup.rotation.y += dt * 0.12;
  }

  // 19. Pyro-Prime Volcanic Magma World (Axial rotation & glowing crust)
  if (magmaMesh) {
    magmaMesh.rotation.y += dt * 0.2;
  }

  // 20. Magnetar SGR-1806 (High-speed toroidal magnetic arc cage spinning)
  if (magnetarGroup) {
    magnetarGroup.rotation.z += dt * 0.3;
    for (let c = 0; c < magnetarArcRings.length; c++) {
      magnetarArcRings[c].rotation.x += dt * (2.2 + c * 0.8);
      magnetarArcRings[c].rotation.y += dt * (1.6 + c * 0.5);
    }
  }

  // 21. Sentinel Recon Drone Swarm (Delta wing formation cruising)
  if (droneGroup) {
    const drAngle =
      droneBody.initialAngle +
      simulationTime * droneBody.orbitSpeed * 0.34 * props.orbitSpeedMultiplier;
    const drx = Math.cos(drAngle) * droneBody.orbitRadius;
    const drz = Math.sin(drAngle) * droneBody.orbitRadius;
    droneGroup.position.set(drx, -30 + Math.sin(simulationTime * 1.5) * 5, drz);
    droneGroup.rotation.y = -drAngle + Math.PI / 2;
    droneGroup.rotation.z = Math.sin(simulationTime * 1.8) * 0.12;
  }

  // 22. Psyche-16 Mining Outpost Asteroid (Tumble & flashing beacon)
  if (psycheGroup) {
    const psAngle =
      psycheBody.initialAngle +
      simulationTime * psycheBody.orbitSpeed * 0.25 * props.orbitSpeedMultiplier;
    const psx = Math.cos(psAngle) * psycheBody.orbitRadius;
    const psz = Math.sin(psAngle) * psycheBody.orbitRadius;
    psycheGroup.position.set(psx, -15 + Math.sin(simulationTime * 0.8) * 4, psz);
    psycheGroup.rotation.y += dt * 0.18;
    psycheGroup.rotation.z = Math.sin(simulationTime * 0.6) * 0.08;

    if (psycheBeaconMat) {
      psycheBeaconMat.opacity = Math.sin(simulationTime * 5.5) > 0 ? 1.0 : 0.15;
    }
  }

  // 23. Hyperion Dyson Sol-Collector Swarm (Slow majestic ring rotation & core pulse)
  if (dysonGroup) {
    dysonGroup.rotation.y += dt * 0.15;
    if (dysonCoreMat) {
      const dPulse = 0.85 + Math.sin(simulationTime * 4.2) * 0.25;
      dysonCoreMat.color.setRGB(1.0, 0.95 * dPulse, 0.8 * dPulse);
    }
  }

  // 24. Glacio-7 Diamond Crystal World (Faceted tumble & orbiting shards)
  if (glacioGroup) {
    if (glacioCoreMesh) {
      glacioCoreMesh.rotation.y += dt * 0.25;
      glacioCoreMesh.rotation.x += dt * 0.12;
    }
    for (let s = 0; s < glacioShards.length; s++) {
      const sAngle = simulationTime * (0.6 + s * 0.2) + s * (Math.PI / 2);
      const sDist = 34 + s * 3;
      glacioShards[s].position.set(
        Math.cos(sAngle) * sDist,
        Math.sin(simulationTime * 2 + s) * 4,
        Math.sin(sAngle) * sDist,
      );
      glacioShards[s].rotation.x += dt * 1.5;
      glacioShards[s].rotation.y += dt * 2.0;
    }
  }

  // 25. Chronos Tachyon Hyper-Gateway (Contra-rotating runic rings & vortex spin)
  if (chronosRiftGroup) {
    for (let r = 0; r < chronosRiftRings.length; r++) {
      chronosRiftRings[r].rotation.z += dt * (0.45 + r * 0.25) * (r % 2 === 0 ? 1 : -1);
      chronosRiftRings[r].rotation.x += dt * 0.15;
    }
    if (chronosRiftVortex) {
      chronosRiftVortex.rotation.z -= dt * 1.8;
    }
  }

  // 26. Zephyrus Monarch Gas Giant (Axial rotation & shepherd moons orbit)
  if (zephyrusGroup) {
    if (zephyrusMesh) {
      zephyrusMesh.rotation.y += dt * 0.18;
    }
    for (let m = 0; m < zephyrusMoons.length; m++) {
      const mAngle = simulationTime * (0.35 + m * 0.15) + m * Math.PI;
      const mDist = 48 + m * 10;
      zephyrusMoons[m].position.set(
        Math.cos(mAngle) * mDist,
        Math.sin(mAngle * 0.2) * 1.5,
        Math.sin(mAngle) * mDist,
      );
    }
  }

  // 27. Ancient Starlight Void Leviathan Fossil (Spinal wave & pulsing tachyon heart)
  if (leviathanGroup) {
    leviathanGroup.rotation.y += dt * 0.08;
    for (let r = 0; r < leviathanRibs.length; r++) {
      leviathanRibs[r].rotation.x = Math.sin(simulationTime * 1.6 + r * 0.3) * 0.14;
    }
    if (leviathanHeart) {
      const hPulse = 1.0 + Math.sin(simulationTime * 3.8) * 0.22;
      leviathanHeart.scale.set(hPulse, hPulse, hPulse);
    }
  }

  // 28. Genesis Elysium Centrifugal Ringworld (Centrifugal spinning biosphere)
  if (ringworldGroup) {
    ringworldGroup.rotation.y += dt * 0.05;
    if (ringworldMesh) {
      ringworldMesh.rotation.y += dt * 0.12;
    }
  }

  // 29. Phoenix Protostellar Nursery (Accretion disk rotation & relativistic jet pulse)
  if (protostarGroup) {
    if (protostarDisk) {
      protostarDisk.rotation.z += dt * 0.65;
    }
    for (let j = 0; j < protostarJets.length; j++) {
      const jScale = 1.0 + Math.sin(simulationTime * 14 + j) * 0.16;
      protostarJets[j].scale.set(jScale, 1.0, jScale);
    }
  }

  // 30. Tesseract Prime Hyperdimensional 4D Portal (4D nested counter-rotation & breathing)
  if (tesseractGroup) {
    if (tesseractOuter) {
      tesseractOuter.rotation.x += dt * 0.32;
      tesseractOuter.rotation.y += dt * 0.42;
    }
    if (tesseractInner) {
      tesseractInner.rotation.x -= dt * 0.48;
      tesseractInner.rotation.z += dt * 0.38;
      const tScale = 1.0 + Math.sin(simulationTime * 2.8) * 0.22;
      tesseractInner.scale.set(tScale, tScale, tScale);
    }
  }

  // 31. Solaris Vulcan Heavy Asteroid Foundry (Crucible containment spin)
  if (vulcanGroup) {
    vulcanGroup.rotation.y += dt * 0.06;
    for (let cr = 0; cr < vulcanCrucibleRings.length; cr++) {
      vulcanCrucibleRings[cr].rotation.x += dt * (1.6 + cr * 0.5);
      vulcanCrucibleRings[cr].rotation.y += dt * (1.1 + cr * 0.3);
    }
    if (vulcanCrucible) {
      const cHeat = 1.0 + Math.sin(simulationTime * 6) * 0.08;
      vulcanCrucible.scale.set(cHeat, cHeat, cHeat);
    }
  }

  // 32. Abyssal Dark Matter Crystal Cluster (Cluster tumble & micro-crystal swarm)
  if (geodeGroup) {
    geodeGroup.rotation.y += dt * 0.15;
    geodeGroup.rotation.z += dt * 0.08;
    for (let ms = 0; ms < geodeMicroSwarm.length; ms++) {
      const msAngle = simulationTime * (0.45 + ms * 0.1) + ms * (Math.PI / 5);
      const msDist = 28 + ms * 1.4;
      geodeMicroSwarm[ms].position.set(
        Math.cos(msAngle) * msDist,
        Math.sin(simulationTime * 1.8 + ms) * 5,
        Math.sin(msAngle) * msDist,
      );
      geodeMicroSwarm[ms].rotation.x += dt * 1.8;
      geodeMicroSwarm[ms].rotation.y += dt * 2.2;
    }
  }

  // 33. Crown of the Cosmic King (Royal bobbing & floating gem orbits)
  if (crownGroup) {
    crownGroup.rotation.y += dt * 0.25;
    crownGroup.position.y = 320 + Math.sin(simulationTime * 1.5) * 6;
    for (let g = 0; g < crownOrbitingGems.length; g++) {
      const gAngle = simulationTime * 0.8 + (g * Math.PI * 2) / 6;
      crownOrbitingGems[g].position.set(
        Math.cos(gAngle) * 26,
        Math.sin(simulationTime * 2.0 + g) * 4,
        Math.sin(gAngle) * 26,
      );
      crownOrbitingGems[g].rotation.x += dt * 1.5;
      crownOrbitingGems[g].rotation.y += dt * 2.0;
    }
  }

  // 34. Motor BeAT Karbu Antariksa (Banking sway, wheel spin & plasma exhaust pulse)
  if (beatGroup) {
    beatGroup.rotation.z = Math.sin(simulationTime * 2.0) * 0.08;
    for (let w = 0; w < beatWheels.length; w++) {
      beatWheels[w].rotation.x += dt * 8.0;
    }
    if (beatThrustFlame) {
      const fScale = 1.0 + Math.sin(simulationTime * 16.0) * 0.25;
      beatThrustFlame.scale.set(fScale, 1.0 + Math.cos(simulationTime * 18.0) * 0.3, fScale);
    }
  }

  // 35. Cyber Matrix Quantum Laptop (Zero-g floating drift & companion mouse orbit)
  if (laptopGroup) {
    laptopGroup.rotation.y += dt * 0.15;
    laptopGroup.rotation.x = Math.sin(simulationTime * 0.8) * 0.12;
    if (laptopCompanionMouse) {
      const mAngle = simulationTime * 0.6;
      laptopCompanionMouse.position.set(
        Math.cos(mAngle) * 20,
        Math.sin(simulationTime * 1.2) * 5,
        Math.sin(mAngle) * 16,
      );
      laptopCompanionMouse.rotation.y += dt * 0.8;
    }
  }

  // 36. Neptunia Prime Ocean World (Axial rotation & moon orbits)
  if (neptuniaGroup) {
    if (neptuniaMesh) neptuniaMesh.rotation.y += dt * 0.12;
    for (let m = 0; m < neptuniaMoons.length; m++) {
      const nmAngle = simulationTime * (0.4 + m * 0.2) + m * Math.PI;
      neptuniaMoons[m].position.set(
        Math.cos(nmAngle) * (56 + m * 14),
        0,
        Math.sin(nmAngle) * (56 + m * 14),
      );
    }
  }

  // 37. Voyager Prime Interstellar Probe (Slow drift & beacon blink)
  if (voyagerGroup) {
    voyagerGroup.rotation.y += dt * 0.05;
    if (voyagerGoldenRecord) voyagerGoldenRecord.rotation.y += dt * 0.4;
    if (voyagerBeacon) voyagerBeacon.visible = Math.sin(simulationTime * 5.0) > 0;
  }

  // 38. Cangkir Kopi Kosmik Tubruk (Gentle bobbing, droplet zero-g float & steam swirl)
  if (coffeeGroup) {
    coffeeGroup.rotation.y += dt * 0.12;
    coffeeGroup.position.y = 240 + Math.sin(simulationTime * 1.6) * 5;
    for (let d = 0; d < coffeeDroplets.length; d++) {
      coffeeDroplets[d].position.y = 9 + d * 1.5 + Math.sin(simulationTime * 3.0 + d * 0.8) * 2;
    }
    for (let s = 0; s < coffeeSteam.length; s++) {
      coffeeSteam[s].rotation.z += dt * (0.4 + s * 0.2);
    }
  }

  // 39. Cosmic Stratocaster Electric Guitar (Rock roll & musical wave pulses)
  if (guitarGroup) {
    guitarGroup.rotation.y += dt * 0.18;
    guitarGroup.rotation.z = Math.sin(simulationTime * 1.4) * 0.15;
    for (let w = 0; w < guitarWaveRings.length; w++) {
      const wScale = 1.0 + ((simulationTime * 2.0 + w * 0.8) % 2.5);
      guitarWaveRings[w].scale.set(wScale, wScale, 1.0);
    }
  }

  // 40. Cosmic Golden Maneki-Neko Lucky Cat (Waving paw of fortune & sparkling gold coin orbits)
  if (nekoGroup) {
    nekoGroup.rotation.y += dt * 0.08;
    if (nekoWavingArm) {
      nekoWavingArm.rotation.z = Math.sin(simulationTime * 5.0) * 0.32;
    }
    for (let sp = 0; sp < nekoSparkles.length; sp++) {
      const spAngle = simulationTime * 0.9 + (sp * Math.PI * 2) / 6;
      nekoSparkles[sp].position.set(
        Math.cos(spAngle) * 26,
        Math.sin(simulationTime * 2.2 + sp) * 4,
        Math.sin(spAngle) * 26,
      );
      nekoSparkles[sp].rotation.y += dt * 2.5;
    }
  }

  // Galactic Stardust River (Subtle cosmic wave drift)
  if (galacticStreamPoints) {
    galacticStreamPoints.rotation.y += dt * 0.012;
  }

  // 1. Smooth Viewport Asymmetric Framing (Desktop left, Mobile top)
  // Uses Three.js camera.setViewOffset so controls.target stays 100% on the object itself!
  // This completely eliminates any centrifugal / gyroscopic spinning when dragging to inspect!
  const containerW = containerRef.value ? containerRef.value.clientWidth : window.innerWidth;
  const containerH = containerRef.value ? containerRef.value.clientHeight : window.innerHeight;
  const isMobile = containerW < 768;

  let targetViewOffsetX = 0;
  let targetViewOffsetY = 0;

  if (props.isPanelOpen && activeTrackingId) {
    if (isMobile) {
      // Mobile: bottom sheet open -> shift view window downwards so object appears in top open area
      targetViewOffsetY = containerH * 0.28;
    } else {
      // Desktop: right drawer open -> shift view window to the right so object appears in left open area
      const drawerW = Math.min(540, containerW * 0.34);
      targetViewOffsetX = drawerW * 0.5;
    }
  }

  currentViewOffsetX += (targetViewOffsetX - currentViewOffsetX) * 0.08;
  currentViewOffsetY += (targetViewOffsetY - currentViewOffsetY) * 0.08;

  if (Math.abs(currentViewOffsetX) > 0.4 || Math.abs(currentViewOffsetY) > 0.4) {
    camera.setViewOffset(
      containerW,
      containerH,
      currentViewOffsetX,
      currentViewOffsetY,
      containerW,
      containerH,
    );
  } else if (camera.view && camera.view.enabled) {
    camera.clearViewOffset();
  }

  // 2. Camera Fly-To Smooth Animation & Real-Time Dynamic Object Tracking
  if (activeTrackingId) {
    const livePos = getBodyCurrentPosition(activeTrackingId);
    if (livePos) {
      if (isCameraAnimating) {
        const elapsed = performance.now() - flyToStartTime;
        const progress = Math.min(1, elapsed / flyToDuration);
        const ease = 1 - Math.pow(1 - progress, 3); // Smooth cubic ease-out

        const currentTargetCam = livePos.clone().add(trackingCamOffset);
        camera.position.lerpVectors(flyToStartCam, currentTargetCam, ease);
        controls.target.lerpVectors(flyToStartTarget, livePos, ease);

        if (progress >= 1) {
          isCameraAnimating = false;
        }
      } else {
        // Continuous Real-Time Motion Tracking: follow object's orbital / flight velocity
        // Moves BOTH target and camera by the exact same delta vector.
        // This guarantees the object stays locked in view while user's custom zoom distance & drag angle are 100% preserved!
        const bodyDelta = livePos.clone().sub(lastTrackedBodyPos);
        controls.target.add(bodyDelta);
        camera.position.add(bodyDelta);
      }

      lastTrackedBodyPos.copy(livePos);
    }
  } else if (isCameraAnimating) {
    const elapsed = performance.now() - flyToStartTime;
    const progress = Math.min(1, elapsed / flyToDuration);
    const ease = 1 - Math.pow(1 - progress, 3);

    camera.position.lerpVectors(flyToStartCam, cameraTargetPos, ease);
    controls.target.lerpVectors(flyToStartTarget, controlsTargetPos, ease);

    if (progress >= 1) {
      isCameraAnimating = false;
    }
  }

  controls.update();
  renderer.render(scene, camera);

  animationFrameId = requestAnimationFrame(renderLoop);
};

/* =========================================================
   CAMERA & HUD ACTIONS (EXPOSED)
   ========================================================= */

const getBodyCurrentPosition = (
  bodyId: string,
  out = new THREE.Vector3(),
): THREE.Vector3 | null => {
  if (bodyId === 'sun' || !bodyId) {
    return out.set(0, 0, 0);
  }
  const p = planets3D.find((item) => item.body.id === bodyId);
  if (p) return out.copy(p.mesh.position);

  if (bodyId === cometBody.id && cometMesh) return out.copy(cometMesh.position);
  if (bodyId === ufoBody.id && ufoGroup) return out.copy(ufoGroup.position);
  if (bodyId === stationBody.id && stationGroup) return out.copy(stationGroup.position);
  if (bodyId === starshipBody.id && starshipGroup) return out.copy(starshipGroup.position);
  if (bodyId === blackHoleBody.id && blackHoleGroup) return out.copy(blackHoleGroup.position);
  if (bodyId === pulsarBody.id && pulsarGroup) return out.copy(pulsarGroup.position);
  if (bodyId === satelliteBody.id && satelliteGroup) return out.copy(satelliteGroup.position);
  if (bodyId === exoplanetBody.id && exoplanetGroup) return out.copy(exoplanetGroup.position);
  if (bodyId === jwstBody.id && jwstGroup) return out.copy(jwstGroup.position);
  if (bodyId === helixBody.id && helixGroup) return out.copy(helixGroup.position);
  if (bodyId === mothershipBody.id && mothershipGroup) return out.copy(mothershipGroup.position);
  if (bodyId === monolithBody.id && monolithGroup) return out.copy(monolithGroup.position);
  if (bodyId === oumuamuaBody.id && oumuamuaGroup) return out.copy(oumuamuaGroup.position);
  if (bodyId === lightsailBody.id && lightsailGroup) return out.copy(lightsailGroup.position);
  if (bodyId === binaryBody.id && binaryGroup) return out.copy(binaryGroup.position);
  if (bodyId === wormholeBody.id && wormholeGroup) return out.copy(wormholeGroup.position);
  if (bodyId === fighterBody.id && fighterGroup) return out.copy(fighterGroup.position);
  if (bodyId === crystalBody.id && crystalGroup) return out.copy(crystalGroup.position);
  if (bodyId === skyhookBody.id && skyhookGroup) return out.copy(skyhookGroup.position);
  if (bodyId === magmaBody.id && magmaGroup) return out.copy(magmaGroup.position);
  if (bodyId === magnetarBody.id && magnetarGroup) return out.copy(magnetarGroup.position);
  if (bodyId === droneBody.id && droneGroup) return out.copy(droneGroup.position);
  if (bodyId === psycheBody.id && psycheGroup) return out.copy(psycheGroup.position);
  if (bodyId === dysonBody.id && dysonGroup) return out.copy(dysonGroup.position);
  if (bodyId === glacioBody.id && glacioGroup) return out.copy(glacioGroup.position);
  if (bodyId === chronosRiftBody.id && chronosRiftGroup) return out.copy(chronosRiftGroup.position);
  if (bodyId === zephyrusBody.id && zephyrusGroup) return out.copy(zephyrusGroup.position);
  if (bodyId === leviathanBody.id && leviathanGroup) return out.copy(leviathanGroup.position);
  if (bodyId === ringworldBody.id && ringworldGroup) return out.copy(ringworldGroup.position);
  if (bodyId === protostarBody.id && protostarGroup) return out.copy(protostarGroup.position);
  if (bodyId === tesseractBody.id && tesseractGroup) return out.copy(tesseractGroup.position);
  if (bodyId === vulcanBody.id && vulcanGroup) return out.copy(vulcanGroup.position);
  if (bodyId === geodeBody.id && geodeGroup) return out.copy(geodeGroup.position);
  if (bodyId === crownBody.id && crownGroup) return out.copy(crownGroup.position);
  if (bodyId === beatBody.id && beatGroup) return out.copy(beatGroup.position);
  if (bodyId === laptopBody.id && laptopGroup) return out.copy(laptopGroup.position);
  if (bodyId === neptuniaBody.id && neptuniaGroup) return out.copy(neptuniaGroup.position);
  if (bodyId === voyagerBody.id && voyagerGroup) return out.copy(voyagerGroup.position);
  if (bodyId === coffeeBody.id && coffeeGroup) return out.copy(coffeeGroup.position);
  if (bodyId === guitarBody.id && guitarGroup) return out.copy(guitarGroup.position);
  if (bodyId === nekoBody.id && nekoGroup) return out.copy(nekoGroup.position);
  if (bodyId === 'galactic-core') return out.set(0, 0, 0);

  // Dynamic galaxy interactive mesh lookup (e.g. Galactic Easter Eggs)
  const gMesh = galaxySystem?.interactiveMeshes.find(
    (m) => m.name === bodyId || (m.userData && m.userData.body && m.userData.body.id === bodyId),
  );
  if (gMesh) {
    gMesh.updateWorldMatrix(true, false);
    gMesh.getWorldPosition(out);
    return out;
  }

  return null;
};

const getBodyCameraOffset = (bodyId: string): THREE.Vector3 => {
  const isMobile = window.innerWidth < 768;
  // Scale by 2.35x on mobile portrait to compensate for narrower horizontal field of view
  const mobileScale = isMobile ? 2.35 : 1.0;

  const p = planets3D.find((item) => item.body.id === bodyId);
  if (p) {
    const pRadius = p.body.baseRadius * 1.35;
    // Comfortable, cinematic wide framing (leaves ample breathing room on desktop and mobile)
    return new THREE.Vector3(pRadius * 5.8, pRadius * 3.4, pRadius * 6.2).multiplyScalar(
      mobileScale,
    );
  }

  let base: THREE.Vector3;
  switch (bodyId) {
    case 'galactic-core':
      base = new THREE.Vector3(0, 15000, 22000);
      break;
    case 'easter-teapot':
      base = new THREE.Vector3(750, 480, 950);
      break;
    case 'easter-dont-panic':
      base = new THREE.Vector3(850, 520, 1100);
      break;
    case 'easter-rubber-duck':
      base = new THREE.Vector3(800, 500, 1000);
      break;
    case 'easter-rubiks':
      base = new THREE.Vector3(780, 480, 960);
      break;
    case 'easter-invader':
      base = new THREE.Vector3(850, 500, 1050);
      break;
    case 'easter-delorean':
      base = new THREE.Vector3(820, 480, 1050);
      break;
    case 'easter-gameboy':
      base = new THREE.Vector3(750, 450, 950);
      break;
    case 'easter-ramen':
      base = new THREE.Vector3(760, 480, 960);
      break;
    case 'easter-floppy':
      base = new THREE.Vector3(720, 420, 900);
      break;
    case 'comet-halley':
      base = new THREE.Vector3(120, 60, 130);
      break;
    case 'ufo-alpha':
      base = new THREE.Vector3(145, 75, 150);
      break;
    case 'station-aegis':
      base = new THREE.Vector3(200, 100, 200);
      break;
    case 'ship-hermes':
      base = new THREE.Vector3(175, 90, 175);
      break;
    case 'black-hole-gargantua':
      base = new THREE.Vector3(320, 150, 340);
      break;
    case 'pulsar-0950':
      base = new THREE.Vector3(250, 120, 260);
      break;
    case 'satellite-chronos':
      base = new THREE.Vector3(135, 70, 140);
      break;
    case 'exoplanet-kepler':
      base = new THREE.Vector3(200, 95, 210);
      break;
    case 'observatory-jwst':
      base = new THREE.Vector3(150, 75, 155);
      break;
    case 'nebula-helix':
      base = new THREE.Vector3(330, 150, 350);
      break;
    case 'mothership-titan':
      base = new THREE.Vector3(300, 135, 310);
      break;
    case 'monolith-prime':
      base = new THREE.Vector3(135, 70, 140);
      break;
    case 'asteroid-oumuamua':
      base = new THREE.Vector3(125, 65, 130);
      break;
    case 'probe-lightsail':
      base = new THREE.Vector3(140, 75, 145);
      break;
    case 'binary-sirius':
      base = new THREE.Vector3(310, 140, 330);
      break;
    case 'wormhole-artemis':
      base = new THREE.Vector3(290, 130, 300);
      break;
    case 'ship-valkyrie':
      base = new THREE.Vector3(130, 65, 135);
      break;
    case 'crystal-astraea':
      base = new THREE.Vector3(140, 75, 150);
      break;
    case 'station-bifrost':
      base = new THREE.Vector3(200, 100, 210);
      break;
    case 'planet-pyro':
      base = new THREE.Vector3(230, 110, 240);
      break;
    case 'magnetar-sgr':
      base = new THREE.Vector3(230, 110, 240);
      break;
    case 'drones-sentinel':
      base = new THREE.Vector3(145, 75, 155);
      break;
    case 'asteroid-psyche':
      base = new THREE.Vector3(170, 85, 180);
      break;
    case 'dyson-hyperion':
      base = new THREE.Vector3(260, 120, 270);
      break;
    case 'exoplanet-glacio':
      base = new THREE.Vector3(220, 105, 230);
      break;
    case 'rift-chronos':
      base = new THREE.Vector3(250, 120, 260);
      break;
    case 'exoplanet-zephyrus':
      base = new THREE.Vector3(280, 130, 290);
      break;
    case 'leviathan-void':
      base = new THREE.Vector3(280, 130, 290);
      break;
    case 'ringworld-elysium':
      base = new THREE.Vector3(320, 150, 330);
      break;
    case 'protostar-phoenix':
      base = new THREE.Vector3(270, 120, 280);
      break;
    case 'artifact-tesseract':
      base = new THREE.Vector3(220, 105, 230);
      break;
    case 'foundry-vulcan':
      base = new THREE.Vector3(260, 120, 270);
      break;
    case 'crystal-geode':
      base = new THREE.Vector3(240, 115, 250);
      break;
    case 'artifact-crown':
      base = new THREE.Vector3(180, 90, 190);
      break;
    case 'vessel-beat':
      base = new THREE.Vector3(190, 95, 200);
      break;
    case 'artifact-laptop':
      base = new THREE.Vector3(180, 85, 190);
      break;
    case 'planet-neptunia':
      base = new THREE.Vector3(260, 120, 270);
      break;
    case 'probe-voyager':
      base = new THREE.Vector3(200, 100, 210);
      break;
    case 'artifact-coffee':
      base = new THREE.Vector3(140, 70, 150);
      break;
    case 'artifact-guitar':
      base = new THREE.Vector3(190, 95, 200);
      break;
    case 'artifact-neko':
      base = new THREE.Vector3(200, 100, 210);
      break;
    default:
      base = new THREE.Vector3(160, 80, 165);
      break;
  }
  return base.multiplyScalar(mobileScale);
};

const focusOnBody = (bodyId: string | null) => {
  if (!bodyId || bodyId === 'sun') {
    activeTrackingId = null;
    cameraTargetPos.set(0, 320, 520);
    controlsTargetPos.set(0, 0, 0);
    flyToStartCam.copy(camera.position);
    flyToStartTarget.copy(controls.target);
    flyToStartTime = performance.now();
    isCameraAnimating = true;
    return;
  }

  const livePos = getBodyCurrentPosition(bodyId);
  if (!livePos) return;

  activeTrackingId = bodyId;
  trackingCamOffset.copy(getBodyCameraOffset(bodyId));
  lastTrackedBodyPos.copy(livePos);

  controlsTargetPos.copy(livePos);
  cameraTargetPos.copy(livePos).add(trackingCamOffset);
  flyToStartCam.copy(camera.position);
  flyToStartTarget.copy(controls.target);
  flyToStartTime = performance.now();
  isCameraAnimating = true;
};

const resetView = () => {
  const wasInGalaxy =
    (camera && camera.position.length() > 5500) ||
    isGalaxyObject(activeTrackingId) ||
    isGalaxyObject(props.selectedBodyId);

  activeTrackingId = null;
  if (wasInGalaxy) {
    cameraTargetPos.set(0, 15000, 22000);
    controlsTargetPos.set(0, 0, 0);
  } else {
    cameraTargetPos.set(0, 320, 520);
    controlsTargetPos.set(0, 0, 0);
  }
  flyToStartCam.copy(camera.position);
  flyToStartTarget.copy(controls.target);
  flyToStartTime = performance.now();
  isCameraAnimating = true;
};

const zoomIn = () => {
  isCameraAnimating = false;
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const dist = camera.position.distanceTo(controls ? controls.target : new THREE.Vector3(0, 0, 0));
  const step = Math.max(80, dist * 0.22);
  camera.position.addScaledVector(dir, step);
};

const zoomOut = () => {
  isCameraAnimating = false;
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  const dist = camera.position.distanceTo(controls ? controls.target : new THREE.Vector3(0, 0, 0));
  const step = Math.max(80, dist * 0.25);
  camera.position.addScaledVector(dir, -step);
};

defineExpose({
  resetView,
  focusOnBody,
  zoomIn,
  zoomOut,
});

/* =========================================================
   RAYCASTING & INTERACTION (HOVER & CLICK DETECTION)
   ========================================================= */

const getIntersectedBody = (clientX: number, clientY: number): CelestialBody | null => {
  if (!containerRef.value) return null;
  const rect = containerRef.value.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;

  mouseVector.set(x, y);
  raycaster.setFromCamera(mouseVector, camera);

  // Target all planets, Sun, Comet Halley, and deep space objects
  const targets: THREE.Object3D[] = [];
  if (sunMesh) targets.push(sunMesh);
  if (cometMesh) targets.push(cometMesh);
  if (ufoHitMesh) targets.push(ufoHitMesh);
  if (stationHitMesh) targets.push(stationHitMesh);
  if (starshipHitMesh) targets.push(starshipHitMesh);
  if (blackHoleHitMesh) targets.push(blackHoleHitMesh);
  if (pulsarHitMesh) targets.push(pulsarHitMesh);
  if (satelliteHitMesh) targets.push(satelliteHitMesh);
  if (exoplanetHitMesh) targets.push(exoplanetHitMesh);
  if (jwstHitMesh) targets.push(jwstHitMesh);
  if (helixHitMesh) targets.push(helixHitMesh);
  if (mothershipHitMesh) targets.push(mothershipHitMesh);
  if (monolithHitMesh) targets.push(monolithHitMesh);
  if (oumuamuaHitMesh) targets.push(oumuamuaHitMesh);
  if (lightsailHitMesh) targets.push(lightsailHitMesh);
  if (binaryHitMesh) targets.push(binaryHitMesh);
  if (wormholeHitMesh) targets.push(wormholeHitMesh);
  if (fighterHitMesh) targets.push(fighterHitMesh);
  if (crystalHitMesh) targets.push(crystalHitMesh);
  if (skyhookHitMesh) targets.push(skyhookHitMesh);
  if (magmaHitMesh) targets.push(magmaHitMesh);
  if (magnetarHitMesh) targets.push(magnetarHitMesh);
  if (droneHitMesh) targets.push(droneHitMesh);
  if (psycheHitMesh) targets.push(psycheHitMesh);
  if (dysonHitMesh) targets.push(dysonHitMesh);
  if (glacioHitMesh) targets.push(glacioHitMesh);
  if (chronosRiftHitMesh) targets.push(chronosRiftHitMesh);
  if (zephyrusHitMesh) targets.push(zephyrusHitMesh);
  if (leviathanHitMesh) targets.push(leviathanHitMesh);
  if (ringworldHitMesh) targets.push(ringworldHitMesh);
  if (protostarHitMesh) targets.push(protostarHitMesh);
  if (tesseractHitMesh) targets.push(tesseractHitMesh);
  if (vulcanHitMesh) targets.push(vulcanHitMesh);
  if (geodeHitMesh) targets.push(geodeHitMesh);
  if (crownHitMesh) targets.push(crownHitMesh);
  if (beatHitMesh) targets.push(beatHitMesh);
  if (laptopHitMesh) targets.push(laptopHitMesh);
  if (neptuniaHitMesh) targets.push(neptuniaHitMesh);
  if (voyagerHitMesh) targets.push(voyagerHitMesh);
  if (coffeeHitMesh) targets.push(coffeeHitMesh);
  if (guitarHitMesh) targets.push(guitarHitMesh);
  if (nekoHitMesh) targets.push(nekoHitMesh);
  for (const p of planets3D) {
    targets.push(p.mesh);
  }
  if (galaxySystem) {
    const camDist = camera
      ? camera.position.distanceTo(controls ? controls.target : new THREE.Vector3(0, 0, 0))
      : 0;
    // Only check galaxy interactive meshes when galaxy is actually visible in galaxy view (camDist >= 5200)
    // When inside the solar system, empty clicks must NEVER trigger the galaxy!
    if (camDist >= 5200) {
      for (const m of galaxySystem.interactiveMeshes) {
        targets.push(m);
      }
    }
  }

  const intersects = raycaster.intersectObjects(targets, false);
  if (intersects.length > 0) {
    return (intersects[0].object.userData.body as CelestialBody) || null;
  }
  return null;
};

const triggerSelect = (body: CelestialBody) => {
  const now = Date.now();
  if (now - lastSelectTime < 350) return;
  lastSelectTime = now;

  focusOnBody(body.id);
  emit('select', body);
};

const triggerUnselect = () => {
  const now = Date.now();
  if (now - lastSelectTime < 250) return;
  lastSelectTime = now;
  hoveredBody.value = null;

  const wasInGalaxy =
    (camera && camera.position.length() > 5500) ||
    isGalaxyObject(activeTrackingId) ||
    isGalaxyObject(props.selectedBodyId);

  emit('select', null);
  emit('unselect');

  // When clicking anywhere on empty space from a galaxy object, center smoothly to the whole galaxy!
  if (wasInGalaxy) {
    activeTrackingId = null;
    cameraTargetPos.set(0, 15000, 22000);
    controlsTargetPos.set(0, 0, 0);
    flyToStartCam.copy(camera.position);
    flyToStartTarget.copy(controls.target);
    flyToStartTime = performance.now();
    isCameraAnimating = true;
  }
};

const onPointerDown = (e: PointerEvent) => {
  isPointerDown = true;
  pointerDownPos = { x: e.clientX, y: e.clientY };
  pointerDownTime = Date.now();
  isDragging.value = false;
  // If user touches or presses canvas, immediately unlock full manual camera control
  isCameraAnimating = false;
};

const onPointerMove = (e: PointerEvent) => {
  tooltipPos.value = { x: e.clientX, y: e.clientY };

  if (isPointerDown) {
    if (Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 6) {
      isDragging.value = true;
      hoveredBody.value = null;
    }
  } else {
    isDragging.value = false;
    const hit = getIntersectedBody(e.clientX, e.clientY);
    if (hoveredBody.value?.id !== hit?.id) {
      hoveredBody.value = hit;
      emit('hover', hit);
    }
  }
};

const onPointerUp = (e: PointerEvent) => {
  const distMoved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
  const timeElapsed = Date.now() - pointerDownTime;

  // Minimal movement = Tap / Click on 3D planet
  if (distMoved < 10 && timeElapsed < 550) {
    const hit = getIntersectedBody(e.clientX, e.clientY);
    if (hit) {
      triggerSelect(hit);
    } else {
      triggerUnselect();
    }
  }

  isPointerDown = false;
  isDragging.value = false;
};

const onPointerLeave = () => {
  isPointerDown = false;
  hoveredBody.value = null;
  isDragging.value = false;
  emit('hover', null);
};

const onResize = () => {
  if (!containerRef.value || !renderer || !camera) return;
  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  camera.aspect = width / height;
  if (Math.abs(currentViewOffsetX) > 0.4 || Math.abs(currentViewOffsetY) > 0.4) {
    camera.setViewOffset(width, height, currentViewOffsetX, currentViewOffsetY, width, height);
  } else {
    camera.updateProjectionMatrix();
  }
  renderer.setSize(width, height);
};

const onVisibilityChange = () => {
  isTabVisible = !document.hidden;
};

onMounted(() => {
  initThreeScene();
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);
  animationFrameId = requestAnimationFrame(renderLoop);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', onResize);
  document.removeEventListener('visibilitychange', onVisibilityChange);

  // Clean up Three.js memory
  controls?.dispose();
  renderer?.dispose();
  constellationSystem?.dispose();
  galaxySystem?.dispose();
});

watch(
  () => props.selectedBodyId,
  (newId, oldId) => {
    if (newId) {
      focusOnBody(newId);
    } else {
      const wasInGalaxy =
        isGalaxyObject(oldId) ||
        isGalaxyObject(activeTrackingId) ||
        (camera && camera.position.length() > 5500);
      if (wasInGalaxy) {
        activeTrackingId = null;
        cameraTargetPos.set(0, 15000, 22000);
        controlsTargetPos.set(0, 0, 0);
        flyToStartCam.copy(camera.position);
        flyToStartTarget.copy(controls.target);
        flyToStartTime = performance.now();
        isCameraAnimating = true;
      }
    }
  },
);
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden select-none bg-[#02040a] touch-none"
    :class="[isDragging ? 'cursor-grabbing' : hoveredBody ? '!cursor-pointer' : 'cursor-grab']"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerLeave">
    <canvas
      ref="canvasRef"
      class="block w-full h-full touch-none"
      :class="hoveredBody ? '!cursor-pointer' : ''" />

    <!-- Planet Hover HUD Title Badge (Appears when hovering on any planet or Sun) -->
    <transition name="fade">
      <div
        v-if="hoveredBody"
        class="pointer-events-none fixed z-40 transform -translate-x-1/2 -translate-y-full px-3.5 py-2 rounded-xl backdrop-blur-md border shadow-2xl transition-all duration-75 bg-[#020614]/90 text-white"
        :style="{
          left: `${tooltipPos.x}px`,
          top: `${tooltipPos.y - 14}px`,
          borderColor: hoveredBody.color,
          boxShadow: `0 0 24px ${hoveredBody.color}40`,
        }">
        <div class="flex items-center gap-2 font-bold text-sm tracking-wide">
          <span
            class="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
            :style="{
              backgroundColor: hoveredBody.color,
              boxShadow: `0 0 10px ${hoveredBody.color}`,
            }"></span>
          <span class="font-sans font-semibold text-white">{{ hoveredBody.name }}</span>
          <span
            class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/75">
            {{ hoveredBody.codeName }}
          </span>
        </div>
        <div class="text-[11px] text-cyan-300/90 mt-0.5 font-sans">
          {{ hoveredBody.tagline }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -90%) scale(0.95);
}
</style>
