import * as THREE from 'three';
import type { CelestialBody } from '@/constant';

export interface GalaxySystem {
  group: THREE.Group;
  interactiveMeshes: THREE.Mesh[];
  update: (
    cameraDistance: number,
    dt: number,
    simulationTime: number,
    normalizedMouse?: { x: number; y: number },
    isHovered?: boolean,
  ) => void;
  dispose: () => void;
}

export const galacticCoreBody: CelestialBody = {
  id: 'galactic-core',
  name: 'Galactic Nucleus',
  codeName: 'ANDROMEDA / CORE BULGE',
  type: 'phenomenon',
  planetCategory: 'blackhole',
  tagline: 'Supermassive Golden Core Bulge • 220,000 LY Diameter • 1 Trillion Stars',
  orbitRadius: 0,
  orbitSpeed: 0,
  baseRadius: 2800,
  color: '#fbbf24',
  glowColor: 'rgba(251, 191, 36, 0.95)',
  accentColor: '#f59e0b',
  initialAngle: 0,
  icon: 'solar:sun-2-bold',
  lore: 'Jantung gravitasi galaksi spiral raksasa yang menaungi singularitas supermasif "Sagittarius Prime". Dikelilingi oleh tonjolan inti bercahaya emas-krem murni, aliran akresi debu kosmis jingga pijar, dan miliaran bintang purba dalam spiral antarbintang lavender yang membentang seluas 220.000 tahun cahaya. Menjadi jangkar kosmis tempat seluruh portofolio web dan ekosistem proyek berpusat.',
  extraStats: [
    { label: 'Diameter Galaksi', value: '220,000 Tahun Cahaya' },
    { label: 'Jumlah Bintang', value: '1 Triliun Bintang Purba' },
    { label: 'Massa Pusat', value: '4.2 Juta Massa Matahari' },
    { label: 'Kecepatan Rotasi', value: '240 km/s di tepi piringan' },
  ],
};

export const easterTeapotBody: CelestialBody = {
  id: 'easter-teapot',
  name: 'The Sacred Utah Teapot',
  codeName: 'NEWELL / UTAH-1975',
  type: 'phenomenon',
  planetCategory: 'cosmic-artifact',
  tagline: 'The 1975 Computer Graphics Holy Grail • Floating Relic of Martin Newell',
  orbitRadius: 11500,
  orbitSpeed: 0.05,
  baseRadius: 420,
  color: '#fbbf24',
  glowColor: 'rgba(251, 191, 36, 0.95)',
  accentColor: '#f59e0b',
  initialAngle: 1.4,
  icon: 'solar:cup-bold',
  lore: 'Artefak keramik emas legendaris peninggalan Martin Newell tahun 1975 dari University of Utah. Merupakan model 3D parametrik paling bersejarah dalam evolusi grafik komputer dunia. Kini melayang abadi di piringan luar galaksi sebagai monumen suci para 3D programmer dan grafika digital antariksa.',
  extraStats: [
    { label: 'Asal Sejarah', value: 'University of Utah (1975)' },
    { label: 'Penemu', value: 'Martin Newell' },
    { label: 'Material', value: 'Golden Bezier Spline Ceramic' },
    { label: 'Status Reverensi', value: 'Level: Holy 3D Graphics Relic' },
  ],
};

export const easterDontPanicBody: CelestialBody = {
  id: 'easter-dont-panic',
  name: 'Cosmic Monolith "42"',
  codeName: 'GUIDE / DOUGLAS-42',
  type: 'station',
  planetCategory: 'cosmic-artifact',
  tagline: "The Hitchhiker's Guide • Ultimate Answer to Life, Universe & Everything (42)",
  orbitRadius: 13500,
  orbitSpeed: 0.03,
  baseRadius: 480,
  color: '#10b981',
  glowColor: 'rgba(16, 185, 129, 0.95)',
  accentColor: '#059669',
  initialAngle: 3.8,
  icon: 'solar:book-bookmark-bold',
  lore: 'Tablet obsidian antargalaksi berbalut medan starlight neon hijau. Di permukaannya terukir kalimat ramah bercahaya: "DON\'T PANIC" dengan angka "42" berputar di puncaknya. Menjadi jimat keberuntungan yang mengingatkan para web engineer untuk tetap santai saat menghadapi bug produksi dan merge conflict kosmis.',
  extraStats: [
    { label: 'Jawaban Tertinggi', value: '42 (The Ultimate Answer)' },
    { label: 'Protokol Bahaya', value: "Keep Calm & Don't Panic" },
    { label: 'Status Handuk', value: 'Selalu Siap di Dekat Anda' },
    { label: 'Penulis Panduan', value: 'Douglas Adams Protocol' },
  ],
};

export const easterRubberDuckBody: CelestialBody = {
  id: 'easter-rubber-duck',
  name: 'Cosmic Debugging Duck',
  codeName: 'DEBUG / QUACK-PRIME',
  type: 'phenomenon',
  planetCategory: 'cosmic-artifact',
  tagline: 'Supreme Rubber Duck of Infinite Debugging • Zero-G Code Counselor',
  orbitRadius: 15200,
  orbitSpeed: 0.04,
  baseRadius: 450,
  color: '#facc15',
  glowColor: 'rgba(250, 204, 21, 0.95)',
  accentColor: '#eab308',
  initialAngle: 5.2,
  icon: 'solar:chat-round-dots-bold',
  lore: 'Bebek karet emas kosmik raksasa yang melayang di ruang hampa antarbintang di dalam gelembung starlight pelindung. Legenda para coder menyebutkan: cukup ceritakan baris demi baris kodemu ke bebek ini dalam gravitasi nol, maka bug terumit pun akan terpecahkan seketika oleh pencerahan kosmis!',
  extraStats: [
    { label: 'Metode Penanganan', value: 'Rubber Duck Debugging' },
    { label: 'Efektivitas Solusi', value: '100% Solusi Bug Ditemukan' },
    { label: 'Frekuensi Suara', value: 'Kwak Fotonik Kecepatan Cahaya' },
    { label: 'Lisensi Konseling', value: 'Senior Cosmic Code Counselor' },
  ],
};

export const easterRubiksBody: CelestialBody = {
  id: 'easter-rubiks',
  name: "Celestial Rubik's Cube",
  codeName: 'QUANTUM / CUBE-3X3',
  type: 'station',
  planetCategory: 'cosmic-artifact',
  tagline: 'Quantum 3x3 Puzzle Drifting in Deep Space • Multicolored Chromatic Faces',
  orbitRadius: 14000,
  orbitSpeed: 0.05,
  baseRadius: 420,
  color: '#00f0ff',
  glowColor: 'rgba(0, 240, 255, 0.95)',
  accentColor: '#0284c7',
  initialAngle: 2.1,
  icon: 'solar:box-bold',
  lore: 'Kubus Rubik kuantum raksasa 3x3 berbalut kisi titanium gelap dengan facet bercahaya neon enam spektrum kosmis (sian, magenta, emas, zamrud, oranye, dan putih). Lapisan-lapisannya berputar sendiri di ruang hampa untuk menyelesaikan algoritma teka-teki logika semesta.',
  extraStats: [
    { label: 'Kombinasi State', value: '43 Triliun Triliun Posisi' },
    { label: 'Status Algoritma', value: 'Kuantum Self-Solving' },
    { label: 'Dimensi Matriks', value: '3x3x3 Segmented Lattice' },
    { label: 'Tingkat Kesulitan', value: 'Universal Master' },
  ],
};

export const easterInvaderBody: CelestialBody = {
  id: 'easter-invader',
  name: 'Retro Space Invader',
  codeName: 'ARCADE / 8-BIT-SENTINEL',
  type: 'vessel',
  planetCategory: 'cosmic-artifact',
  tagline: '1978 Legendary 8-Bit Alien Sentinel • Pulsing Emerald Pixel Grid',
  orbitRadius: 16000,
  orbitSpeed: 0.035,
  baseRadius: 460,
  color: '#22c55e',
  glowColor: 'rgba(34, 197, 94, 0.95)',
  accentColor: '#16a34a',
  initialAngle: 4.5,
  icon: 'solar:gamepad-bold',
  lore: 'Wahana piksel retro 8-bit legendaris dari era keemasan arcade game 1978. Dibangun dari blok-blok voxel neon zamrud berpendar tinggi dengan antena pemancar gelombang chiptune kosmis. Menjadi maskot abadi para pecinta game retro di belahan luar galaksi.',
  extraStats: [
    { label: 'Era Asal', value: '1978 Space Invaders Arcade' },
    { label: 'Arsitektur Grafis', value: '8-Bit Voxel Monolith' },
    { label: 'Frekuensi Gelombang', value: '8-Bit Chiptune Synth' },
    { label: 'Status Misi', value: 'Eternal Outer Perimeter Patrol' },
  ],
};

export const easterDeloreanBody: CelestialBody = {
  id: 'easter-delorean',
  name: 'Chronos DMC-12 Time Cruiser',
  codeName: 'OUTATIME / 88-MPH',
  type: 'vessel',
  planetCategory: 'cosmic-artifact',
  tagline: 'Legendary Time Cruiser • 1.21 Gigawatt Flux Capacitor • Hover Mode',
  orbitRadius: 17500,
  orbitSpeed: 0.045,
  baseRadius: 440,
  color: '#38bdf8',
  glowColor: 'rgba(56, 189, 248, 0.95)',
  accentColor: '#0284c7',
  initialAngle: 0.9,
  icon: 'solar:wheel-bold',
  lore: 'Wahana penjelajah waktu legendaris dengan bodi baja tahan karat brushed titanium dan reaktor fluks kuantum 1.21 Gigawatt. Melayang bebas melintasi ruang antargalaksi dengan roda hover datar menyala cyan setelah menembus kecepatan 88 mil per jam melintasi linimasa semesta.',
  extraStats: [
    { label: 'Fluks Daya', value: '1.21 Gigawatt Fusion RTG' },
    { label: 'Kecepatan Aktivasi', value: '88 MPH (Tachyon Threshold)' },
    { label: 'Plat Nomor', value: 'CALIFORNIA • OUTATIME' },
    { label: 'Mode Terbang', value: 'Hover Conversion 2015' },
  ],
};

export const easterGameboyBody: CelestialBody = {
  id: 'easter-gameboy',
  name: 'Game Boy Quantum Pocket',
  codeName: 'NINTENDO / DMG-1989',
  type: 'station',
  planetCategory: 'cosmic-artifact',
  tagline: '1989 Iconic 8-Bit Handheld • Dot-Matrix Green Screen & 8-Bit Chiptune',
  orbitRadius: 18500,
  orbitSpeed: 0.038,
  baseRadius: 420,
  color: '#a3e635',
  glowColor: 'rgba(163, 230, 53, 0.95)',
  accentColor: '#65a30d',
  initialAngle: 3.2,
  icon: 'solar:gamepad-minimalistic-bold',
  lore: 'Konsol game genggam kuantum legendaris berlayar monokrom matriks hijau retro 1989. Melayang di ruang gravitasi nol dengan tombol D-pad taktis dan dua tombol aksi magenta. Di slot atasnya terpasang kartrid game holografik abadi yang terus memainkan melodi 8-bit nostalgia.',
  extraStats: [
    { label: 'Processor', value: 'Custom 8-Bit Sharp 4.19 MHz' },
    { label: 'Display Matrix', value: '160x144 Reflexive Dot-Matrix' },
    { label: 'Baterai Daya', value: '4x AA Quantum Solar (Infinite)' },
    { label: 'Rekor Skor', value: 'Tetris 999,999 Max Score' },
  ],
};

export const easterRamenBody: CelestialBody = {
  id: 'easter-ramen',
  name: 'Mangkuk Ramen Kosmik Abadi',
  codeName: 'RAMEN / INFINITE-UMAMI',
  type: 'phenomenon',
  planetCategory: 'cosmic-artifact',
  tagline: 'Legendary Zero-G Tonkotsu Ramen • Floating Broth, Ajitsuke Tamago & Steam',
  orbitRadius: 19500,
  orbitSpeed: 0.042,
  baseRadius: 430,
  color: '#f97316',
  glowColor: 'rgba(249, 115, 22, 0.95)',
  accentColor: '#ea580c',
  initialAngle: 5.7,
  icon: 'solar:cup-bold',
  lore: 'Semangkuk ramen tonkotsu panas mengepul legendaris yang melayang abadi di ruang gravitasi nol antarbintang. Kuah kaldu umami keemasannya tidak pernah dingin dan terus mengepulkan aroma lezat penawar rasa lapar para developer yang coding hingga larut malam di stasiun antariksa.',
  extraStats: [
    { label: 'Suhu Kuah', value: '92°C Abadi (Zero-G Umami)' },
    { label: 'Topping Lengkap', value: 'Chashu, Tamago, Narutomaki & Nori' },
    { label: 'Status Suplai', value: 'Unlimited Late-Night Dev Fuel' },
    { label: 'Efek Konsumsi', value: 'Kenyang Maksimal (HP +100%)' },
  ],
};

export const easterFloppyBody: CelestialBody = {
  id: 'easter-floppy',
  name: 'The Sacred Save Icon (3.5" Diskette)',
  codeName: 'STORAGE / 1.44MB-HD',
  type: 'station',
  planetCategory: 'cosmic-artifact',
  tagline: 'The Legendary Universal Save Icon • 1.44 MB Magnetic High-Density Relic',
  orbitRadius: 21000,
  orbitSpeed: 0.032,
  baseRadius: 400,
  color: '#3b82f6',
  glowColor: 'rgba(59, 130, 246, 0.95)',
  accentColor: '#1d4ed8',
  initialAngle: 1.8,
  icon: 'solar:diskette-bold',
  lore: 'Disket 3.5 inci legendaris berkapasitas 1.44 MB yang kini diabadikan sebagai "Ikon Simpan Universal" di seluruh penjuru semesta digital. Dilengkapi pelat shutter logam perak geser dan label kertas usang bertuliskan "PROYEK_FINAL_v2_BENERAN_FINAL.DAT". Melayang anggun mengingatkan kita pada kebiasaan suci: Selalu Ctrl+S sebelum terlambat!',
  extraStats: [
    { label: 'Kapasitas Simpan', value: '1.44 MB (High Density)' },
    { label: 'Format Sektor', value: 'FAT12 Magnetic Track' },
    { label: 'Proteksi Tulis', value: 'Physical Write-Protect Notch' },
    { label: 'Label Fisik', value: 'BACKUP_FINAL_v2_FIXED.DAT' },
  ],
};


function gaussianRandom(mean = 0, stdev = 1): number {
  let u = 1 - Math.random();
  let v = Math.random();
  while (u === 0) u = 1 - Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdev + mean;
}

/**
 * Creates ultra-radiant luminous starlight texture matching constellations.ts.
 * Features an intense starlight cyan halo, 4-point micro-glints, and solid white diamond core.
 */
function createLuminousStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 128, 128);
  const cx = 64;
  const cy = 64;

  // 1. Wide blooming starlight halo (intense outer glow)
  const haloGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 62);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  haloGrad.addColorStop(0.18, 'rgba(125, 211, 252, 0.9)');
  haloGrad.addColorStop(0.42, 'rgba(56, 189, 248, 0.55)');
  haloGrad.addColorStop(0.72, 'rgba(14, 165, 233, 0.22)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 62, 0, Math.PI * 2);
  ctx.fill();

  // 2. Optical 4-point starlight diffraction spikes
  ctx.save();
  const hSpike = ctx.createLinearGradient(0, cy, 128, cy);
  hSpike.addColorStop(0, 'rgba(255, 255, 255, 0)');
  hSpike.addColorStop(0.38, 'rgba(56, 189, 248, 0.6)');
  hSpike.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  hSpike.addColorStop(0.62, 'rgba(56, 189, 248, 0.6)');
  hSpike.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hSpike;
  ctx.fillRect(0, cy - 2, 128, 4);

  const vSpike = ctx.createLinearGradient(cx, 0, cx, 128);
  vSpike.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vSpike.addColorStop(0.38, 'rgba(56, 189, 248, 0.6)');
  vSpike.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  vSpike.addColorStop(0.62, 'rgba(56, 189, 248, 0.6)');
  vSpike.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = vSpike;
  ctx.fillRect(cx - 2, 0, 4, 128);
  ctx.restore();

  // 3. Ultra-bright diamond core bloom
  const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
  coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  coreGrad.addColorStop(0.35, 'rgba(240, 249, 255, 1.0)');
  coreGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.85)');
  coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 20, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates delicate soft gaussian puff texture for volumetric cosmic gas.
 */
function createSoftPuffTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 128, 128);
  const cx = 64;
  const cy = 64;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 62);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.70)');
  grad.addColorStop(0.28, 'rgba(255, 255, 255, 0.45)');
  grad.addColorStop(0.60, 'rgba(255, 255, 255, 0.15)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 62, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Central golden core bloom texture.
 */
function createGoldenCoreTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 128, 128);
  const cx = 64;
  const cy = 64;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 62);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.22, 'rgba(254, 240, 138, 0.95)');
  grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.55)');
  grad.addColorStop(0.85, 'rgba(217, 119, 6, 0.15)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, 62, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Creates 4-point cross diffraction flare texture for astrophotography landmark alpha stars.
 */
function createBigFlareTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 256, 256);
  const cx = 128;
  const cy = 128;

  // Horizontal long ray
  const hRay = ctx.createLinearGradient(0, cy, 256, cy);
  hRay.addColorStop(0, 'rgba(255, 255, 255, 0)');
  hRay.addColorStop(0.35, 'rgba(56, 189, 248, 0.6)');
  hRay.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  hRay.addColorStop(0.65, 'rgba(56, 189, 248, 0.6)');
  hRay.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = hRay;
  ctx.fillRect(0, cy - 2.5, 256, 5);

  // Vertical long ray
  const vRay = ctx.createLinearGradient(cx, 0, cx, 256);
  vRay.addColorStop(0, 'rgba(255, 255, 255, 0)');
  vRay.addColorStop(0.35, 'rgba(56, 189, 248, 0.6)');
  vRay.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
  vRay.addColorStop(0.65, 'rgba(56, 189, 248, 0.6)');
  vRay.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = vRay;
  ctx.fillRect(cx - 2.5, 0, 5, 256);

  // Diagonal minor rays
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);
  const dRay = ctx.createLinearGradient(-90, 0, 90, 0);
  dRay.addColorStop(0, 'rgba(255, 255, 255, 0)');
  dRay.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
  dRay.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = dRay;
  ctx.fillRect(-90, -1.5, 180, 3);
  ctx.rotate(Math.PI / 2);
  ctx.fillRect(-90, -1.5, 180, 3);
  ctx.restore();

  // Core starlight glow
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
  core.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  core.addColorStop(0.28, 'rgba(224, 242, 254, 0.95)');
  core.addColorStop(0.65, 'rgba(56, 189, 248, 0.55)');
  core.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural Holographic Texture Generator for The Hitchhiker's Guide Monolith
 */
function createDontPanicTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#020d0a';
  ctx.fillRect(0, 0, 512, 1024);

  // Border neon frame
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, 472, 984);

  // Header
  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText("★ HITCHHIKER'S GUIDE ★", 256, 120);

  // Divider line
  ctx.fillStyle = '#065f46';
  ctx.fillRect(40, 160, 432, 6);

  // Friendly green glowing letters "DON'T PANIC"
  ctx.fillStyle = '#6ee7b7';
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 28;
  ctx.font = '900 92px sans-serif';
  ctx.fillText("DON'T", 256, 380);
  ctx.fillText('PANIC', 256, 500);
  ctx.shadowBlur = 0;

  // Ultimate Answer "42" Badge
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 130px monospace';
  ctx.fillText('42', 256, 730);

  ctx.fillStyle = '#6ee7b7';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('THE ULTIMATE ANSWER', 256, 820);
  ctx.font = '18px monospace';
  ctx.fillText('DOUGLAS ADAMS PROTOCOL', 256, 870);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural Retro Dot-Matrix Screen Texture Generator for Game Boy Quantum Pocket
 */
function createGameboyScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Retro olive-green LCD background
  ctx.fillStyle = '#84cc16';
  ctx.fillRect(0, 0, 256, 256);

  // Screen dark border
  ctx.strokeStyle = '#3f6212';
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, 236, 236);

  // Battery indicator LED
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(26, 28, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#365314';
  ctx.font = 'bold 10px monospace';
  ctx.fillText('BATTERY', 38, 31);

  // Classic pixel game title
  ctx.fillStyle = '#1a2e05';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NINTENDO', 128, 80);

  ctx.fillStyle = '#365314';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('★ POKEMON ★', 128, 120);
  ctx.fillText('COSMIC EDITION', 128, 142);

  // Cute 8-bit pixel Pikachu / Star sprite in center
  ctx.fillStyle = '#14532d';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('⚡ (•‿•) ⚡', 128, 195);

  ctx.font = '10px monospace';
  ctx.fillText('© 1989 NINTENDO DMG', 128, 226);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural Ramen Bowl Traditional Spiral Rim Texture
 */
function createRamenPatternTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 64);

  // Red traditional meander / spiral Greek key pattern
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 5;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x + 4, 16);
    ctx.lineTo(x + 24, 16);
    ctx.lineTo(x + 24, 48);
    ctx.lineTo(x + 12, 48);
    ctx.lineTo(x + 12, 28);
    ctx.lineTo(x + 18, 28);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Procedural 3.5" Floppy Disk Label Texture Generator
 */
function createFloppyLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Retro off-white paper label
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 256, 256);

  // Top color accent bar (Retro cyan-blue band)
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(0, 0, 256, 36);

  // Brand text on accent bar
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('2HD', 16, 25);
  ctx.textAlign = 'right';
  ctx.font = '12px monospace';
  ctx.fillText('1.44 MB', 240, 24);

  // Ruled notebook lines
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  for (let y = 70; y < 240; y += 32) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(240, y);
    ctx.stroke();
  }

  // Handwritten felt-pen notes
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 15px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('PROYEK_FINAL_v2', 20, 64);
  ctx.fillText('// BENERAN_FINAL.DAT', 20, 96);
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('★ DO NOT OVERWRITE ★', 20, 128);
  ctx.fillStyle = '#475569';
  ctx.font = '11px monospace';
  ctx.fillText('FORMAT: FAT12 / ZERO-G', 20, 160);
  ctx.fillText('CTRL+S SAVES LIVES!', 20, 192);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Builds the 100% 3D Volumetric Particle Galaxy:
 * - ACTIVE SWIRLING PARTICLES: 20,000 stars swirling differentially in real-time around the core!
 * - AUTHENTIC STARFIELD: Replaced rainbow confetti with authentic constellation stars (diamond white, ice blue, solar gold)
 *   with varying magnitudes and radiant Alpha flares matching constellation stars.
 * - CONSTELLATION-STYLE ASTERISMS: Real constellation groupings and asterisms populating all empty areas of deep space.
 * - HOVER FREEZE: When galaxy is hovered, all rotation and particle swirling stops.
 * - Gorgeous golden core bulge, amber dust lanes, lavender/blue spiral arms, and celestial asterisms.
 */
export function buildGalaxySystem(): GalaxySystem {
  const group = new THREE.Group();
  group.name = 'True3DAndromedaGalaxySystem';

  const interactiveMeshes: THREE.Mesh[] = [];

  const luminousStarTex = createLuminousStarTexture();
  const softPuffTex = createSoftPuffTexture();
  const coreGoldenTex = createGoldenCoreTexture();
  const flareStarTex = createBigFlareTexture();

  // Authentic astronomical star color palette matching constellation styling:
  // Predominantly diamond white and starlight ice blue with rare solar beacon gold (NO rainbow noise!)
  const authenticStarPalette = [
    new THREE.Color(0xffffff), // Diamond white (Alpha supergiant)
    new THREE.Color(0xffffff), // Diamond white
    new THREE.Color(0xf8fafc), // Pure starlight white
    new THREE.Color(0xe0f2fe), // Starlight ice blue (Class B)
    new THREE.Color(0xdbeafe), // Pale starlight blue (Class A)
    new THREE.Color(0xa5f3fc), // Radiant cyan starlight
    new THREE.Color(0xbae6fd), // Soft cyan
    new THREE.Color(0xfef08a), // Solar cream / yellow beacon (Class G)
    new THREE.Color(0xfde047), // Solar gold
  ];

  const discGroup = new THREE.Group();
  discGroup.name = 'GalacticDiscGroup';

  /* =========================================================
     1. LAYER 1: TIGHT GOLDEN-AMBER CORE BULGE (24,000 STARS)
     ========================================================= */
  const coreStarCount = 24000;
  const coreGeo = new THREE.BufferGeometry();
  const corePos = new Float32Array(coreStarCount * 3);
  const coreColors = new Float32Array(coreStarCount * 3);

  const coreRadius = 2400;
  for (let i = 0; i < coreStarCount; i++) {
    const u = Math.pow(Math.random(), 2.2);
    const r = coreRadius * u;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;

    const barStretch = 1.25;
    const x = r * Math.cos(phi) * Math.cos(theta) * barStretch;
    const y = r * Math.cos(phi) * Math.sin(theta);
    const z = r * Math.sin(phi) * 0.60;

    corePos[i * 3] = x;
    corePos[i * 3 + 1] = y;
    corePos[i * 3 + 2] = z;

    const t = r / coreRadius;
    if (t < 0.25) {
      coreColors[i * 3] = 1.0;
      coreColors[i * 3 + 1] = 1.0;
      coreColors[i * 3 + 2] = 0.95;
    } else if (t < 0.65) {
      const k = (t - 0.25) / 0.40;
      coreColors[i * 3] = 1.0;
      coreColors[i * 3 + 1] = 0.92 - k * 0.15;
      coreColors[i * 3 + 2] = 0.65 - k * 0.45;
    } else {
      const k = (t - 0.65) / 0.35;
      coreColors[i * 3] = 0.96;
      coreColors[i * 3 + 1] = 0.72 - k * 0.15;
      coreColors[i * 3 + 2] = 0.20;
    }
  }

  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
  coreGeo.setAttribute('color', new THREE.BufferAttribute(coreColors, 3));

  const coreMat = new THREE.PointsMaterial({
    size: 62.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const corePoints = new THREE.Points(coreGeo, coreMat);
  corePoints.renderOrder = 2;
  discGroup.add(corePoints);

  const coreSpriteMat = new THREE.SpriteMaterial({
    map: coreGoldenTex,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const coreSprite = new THREE.Sprite(coreSpriteMat);
  coreSprite.scale.set(7800, 5000, 1);
  coreSprite.renderOrder = 0;
  discGroup.add(coreSprite);

  /* =========================================================
     2. LAYER 2: RICH VOLUMETRIC GAS CLOUDS (14,000 PUFFS)
     ========================================================= */
  const puffCount = 14000;
  const puffGeo = new THREE.BufferGeometry();
  const puffPos = new Float32Array(puffCount * 3);
  const puffColors = new Float32Array(puffCount * 3);

  const minDiskR = 2000;
  const maxDiskR = 21500;
  const armOffsets = [0, Math.PI, Math.PI * 0.48, Math.PI * 1.48];

  for (let i = 0; i < puffCount; i++) {
    const u = Math.pow(Math.random(), 0.85);
    const r = minDiskR + (maxDiskR - minDiskR) * u;

    const armBase = armOffsets[i % armOffsets.length];
    const spiralAngle = armBase + 3.30 * Math.log(r / minDiskR);
    const dispersion = gaussianRandom(0, 0.16 * (1 + (r / maxDiskR) * 0.5));
    const theta = spiralAngle + dispersion;

    const z = gaussianRandom(0, 240 + 320 * (r / maxDiskR));

    puffPos[i * 3] = r * Math.cos(theta);
    puffPos[i * 3 + 1] = r * Math.sin(theta);
    puffPos[i * 3 + 2] = z;

    const norm = (r - minDiskR) / (maxDiskR - minDiskR);

    if (norm < 0.28) {
      const t = norm / 0.28;
      puffColors[i * 3] = 0.95;
      puffColors[i * 3 + 1] = 0.62 - t * 0.12;
      puffColors[i * 3 + 2] = 0.15 + t * 0.25;
    } else if (norm < 0.65) {
      const t = (norm - 0.28) / 0.37;
      puffColors[i * 3] = 0.76 - t * 0.35;
      puffColors[i * 3 + 1] = 0.52 + t * 0.10;
      puffColors[i * 3 + 2] = 0.88 + t * 0.08;
    } else {
      const t = (norm - 0.65) / 0.35;
      puffColors[i * 3] = 0.28 - t * 0.15;
      puffColors[i * 3 + 1] = 0.52 + t * 0.18;
      puffColors[i * 3 + 2] = 0.95;
    }
  }

  puffGeo.setAttribute('position', new THREE.BufferAttribute(puffPos, 3));
  puffGeo.setAttribute('color', new THREE.BufferAttribute(puffColors, 3));

  const puffMat = new THREE.PointsMaterial({
    size: 920.0,
    map: softPuffTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const puffPoints = new THREE.Points(puffGeo, puffMat);
  puffPoints.renderOrder = 1;
  discGroup.add(puffPoints);

  /* =========================================================
     3. LAYER 3: EMBEDDED SPIRAL DISK STARS (80,000 STARS)
     ========================================================= */
  const diskStarCount = 80000;
  const diskGeo = new THREE.BufferGeometry();
  const diskPos = new Float32Array(diskStarCount * 3);
  const diskColors = new Float32Array(diskStarCount * 3);

  for (let i = 0; i < diskStarCount; i++) {
    const u = Math.pow(Math.random(), 0.88);
    const r = minDiskR + (maxDiskR - minDiskR) * u;

    const armBase = armOffsets[i % armOffsets.length];
    const spiralAngle = armBase + 3.30 * Math.log(r / minDiskR);
    const dispersion = gaussianRandom(0, 0.14 * (1 + (r / maxDiskR) * 0.55));
    const theta = spiralAngle + dispersion;

    const z = gaussianRandom(0, 180 + 380 * (r / maxDiskR));

    diskPos[i * 3] = r * Math.cos(theta);
    diskPos[i * 3 + 1] = r * Math.sin(theta);
    diskPos[i * 3 + 2] = z;

    const norm = (r - minDiskR) / (maxDiskR - minDiskR);

    if (norm < 0.28) {
      const t = norm / 0.28;
      diskColors[i * 3] = 0.98;
      diskColors[i * 3 + 1] = 0.72 - t * 0.12;
      diskColors[i * 3 + 2] = 0.25 + t * 0.35;
    } else if (norm < 0.65) {
      const t = (norm - 0.28) / 0.37;
      diskColors[i * 3] = 0.82 - t * 0.35;
      diskColors[i * 3 + 1] = 0.65 + t * 0.10;
      diskColors[i * 3 + 2] = 0.95;
    } else {
      const t = (norm - 0.65) / 0.35;
      diskColors[i * 3] = 0.42 - t * 0.20;
      diskColors[i * 3 + 1] = 0.68 + t * 0.18;
      diskColors[i * 3 + 2] = 1.0;
    }

    const dice = Math.random();
    if (dice < 0.20) {
      diskColors[i * 3] = 1.0;
      diskColors[i * 3 + 1] = 1.0;
      diskColors[i * 3 + 2] = 1.0;
    } else if (dice < 0.30) {
      diskColors[i * 3] = 1.0;
      diskColors[i * 3 + 1] = 0.78;
      diskColors[i * 3 + 2] = 0.25;
    }
  }

  diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
  diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

  const diskMat = new THREE.PointsMaterial({
    size: 54.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const diskPoints = new THREE.Points(diskGeo, diskMat);
  diskPoints.renderOrder = 3;
  discGroup.add(diskPoints);

  /* =========================================================
     4. LAYER 4: ACTIVE DYNAMIC SWIRLING STREAM (24,000 PARTICLES)
     Stars actively orbiting and flowing around the galactic center
     with differential rotation in real-time!
     ========================================================= */
  const swirlCount = 24000;
  const swirlGeo = new THREE.BufferGeometry();
  const swirlPos = new Float32Array(swirlCount * 3);
  const swirlColors = new Float32Array(swirlCount * 3);

  const swirlRadii = new Float32Array(swirlCount);
  const swirlAngles = new Float32Array(swirlCount);
  const swirlBaseZ = new Float32Array(swirlCount);
  const swirlSpeeds = new Float32Array(swirlCount);

  for (let i = 0; i < swirlCount; i++) {
    const u = Math.pow(Math.random(), 0.85);
    const r = minDiskR + (maxDiskR - minDiskR) * u;
    const armBase = armOffsets[i % armOffsets.length];
    const theta = armBase + 3.30 * Math.log(r / minDiskR) + gaussianRandom(0, 0.18);
    const z = gaussianRandom(0, 220 + 360 * (r / maxDiskR));

    swirlRadii[i] = r;
    swirlAngles[i] = theta;
    swirlBaseZ[i] = z;
    // Differential orbital speed: inner stars orbit faster, dynamic swirling spiral stream!
    swirlSpeeds[i] = 0.032 * (1.0 + 8500.0 / (r + 1400.0));

    swirlPos[i * 3] = r * Math.cos(theta);
    swirlPos[i * 3 + 1] = r * Math.sin(theta);
    swirlPos[i * 3 + 2] = z;

    const norm = (r - minDiskR) / (maxDiskR - minDiskR);
    if (norm < 0.3) {
      swirlColors[i * 3] = 1.0;
      swirlColors[i * 3 + 1] = 0.85;
      swirlColors[i * 3 + 2] = 0.45;
    } else if (norm < 0.65) {
      swirlColors[i * 3] = 0.88;
      swirlColors[i * 3 + 1] = 0.76;
      swirlColors[i * 3 + 2] = 1.0;
    } else {
      swirlColors[i * 3] = 0.65;
      swirlColors[i * 3 + 1] = 0.85;
      swirlColors[i * 3 + 2] = 1.0;
    }
  }

  swirlGeo.setAttribute('position', new THREE.BufferAttribute(swirlPos, 3));
  swirlGeo.setAttribute('color', new THREE.BufferAttribute(swirlColors, 3));

  const swirlMat = new THREE.PointsMaterial({
    size: 60.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const swirlPoints = new THREE.Points(swirlGeo, swirlMat);
  swirlPoints.renderOrder = 4;
  discGroup.add(swirlPoints);

  /* =========================================================
     5. INTERACTIVE HITBOX (GALACTIC CORE NUCLEUS)
     ========================================================= */
  const coreHitMat = new THREE.MeshBasicMaterial({ visible: false });

  const coreHitGeo = new THREE.SphereGeometry(2800, 16, 16);
  const coreHitMesh = new THREE.Mesh(coreHitGeo, coreHitMat);
  coreHitMesh.name = 'galactic-core';
  coreHitMesh.userData = { body: galacticCoreBody };
  discGroup.add(coreHitMesh);
  interactiveMeshes.push(coreHitMesh);

  discGroup.rotation.x = -Math.PI * 0.32; // ~58° inclination
  discGroup.rotation.y = Math.PI * 0.08;
  discGroup.rotation.z = -Math.PI * 0.18;
  group.add(discGroup);

  /* =========================================================
     6. GALACTIC VIEW EASTER EGGS (UNIQUE DEEP SPACE ARTIFACTS)
     - The Sacred Utah Teapot Prime (1975 Martin Newell Graphics Holy Grail)
     - Cosmic Monolith "42" (The Hitchhiker's Guide To The Galaxy)
     - Cosmic Debugging Rubber Duck (Supreme Zero-G Code Counselor)
     ========================================================= */
  const easterEggsGroup = new THREE.Group();
  easterEggsGroup.name = 'GalacticEasterEggs';

  // 6A. The Sacred Utah Teapot Prime (1975 Martin Newell Graphics Holy Grail)
  const teapotGroup = new THREE.Group();
  teapotGroup.position.set(9500, 3200, -3200);

  const teapotMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.18,
    emissive: 0xb45309,
    emissiveIntensity: 0.35,
  });

  const teapotBodyGeo = new THREE.SphereGeometry(180, 24, 24);
  const teapotBodyMesh = new THREE.Mesh(teapotBodyGeo, teapotMat);
  teapotBodyMesh.scale.set(1.3, 0.95, 1.3);
  teapotGroup.add(teapotBodyMesh);

  const teapotSpoutGeo = new THREE.CylinderGeometry(24, 46, 170, 16);
  const teapotSpout = new THREE.Mesh(teapotSpoutGeo, teapotMat);
  teapotSpout.position.set(-165, 45, 0);
  teapotSpout.rotation.z = -Math.PI * 0.3;
  teapotGroup.add(teapotSpout);

  const teapotHandleGeo = new THREE.TorusGeometry(110, 20, 12, 24, Math.PI);
  const teapotHandle = new THREE.Mesh(teapotHandleGeo, teapotMat);
  teapotHandle.position.set(155, 20, 0);
  teapotHandle.rotation.y = Math.PI / 2;
  teapotGroup.add(teapotHandle);

  const teapotLidGeo = new THREE.CylinderGeometry(95, 125, 26, 24);
  const teapotLid = new THREE.Mesh(teapotLidGeo, teapotMat);
  teapotLid.position.set(0, 160, 0);
  teapotGroup.add(teapotLid);

  const teapotKnobGeo = new THREE.SphereGeometry(32, 16, 16);
  const teapotKnob = new THREE.Mesh(teapotKnobGeo, teapotMat);
  teapotKnob.position.set(0, 192, 0);
  teapotGroup.add(teapotKnob);

  const teapotAuraGeo = new THREE.SphereGeometry(380, 20, 20);
  const teapotAuraMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.32,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const teapotAura = new THREE.Mesh(teapotAuraGeo, teapotAuraMat);
  teapotGroup.add(teapotAura);

  const teapotRingGeo = new THREE.TorusGeometry(260, 5, 8, 32);
  const teapotRingMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  const teapotSparkleRing = new THREE.Mesh(teapotRingGeo, teapotRingMat);
  teapotSparkleRing.rotation.x = Math.PI / 2;
  teapotSparkleRing.position.y = 210;
  teapotGroup.add(teapotSparkleRing);

  const teapotHitGeo = new THREE.SphereGeometry(520, 16, 16);
  const teapotHitMesh = new THREE.Mesh(teapotHitGeo, coreHitMat);
  teapotHitMesh.name = 'easter-teapot';
  teapotHitMesh.userData = { body: easterTeapotBody };
  teapotGroup.add(teapotHitMesh);
  interactiveMeshes.push(teapotHitMesh);

  easterEggsGroup.add(teapotGroup);

  // 6B. Cosmic Monolith "42" (The Hitchhiker's Guide To The Galaxy)
  const monolithGroup = new THREE.Group();
  monolithGroup.position.set(-9600, 5800, -6200);

  const monolithSlabGeo = new THREE.BoxGeometry(420, 840, 75);
  const monolithSlabMat = new THREE.MeshStandardMaterial({
    color: 0x050a10,
    roughness: 0.25,
    metalness: 0.9,
  });
  const monolithSlab = new THREE.Mesh(monolithSlabGeo, monolithSlabMat);
  monolithGroup.add(monolithSlab);

  const monolithFrameGeo = new THREE.BoxGeometry(436, 856, 78);
  const monolithFrameMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const monolithFrame = new THREE.Mesh(monolithFrameGeo, monolithFrameMat);
  monolithGroup.add(monolithFrame);

  const dontPanicTex = createDontPanicTexture();
  const monolithScreenGeo = new THREE.PlaneGeometry(390, 790);
  const monolithScreenMat = new THREE.MeshBasicMaterial({ map: dontPanicTex });
  const monolithScreen = new THREE.Mesh(monolithScreenGeo, monolithScreenMat);
  monolithScreen.position.set(0, 0, 39);
  monolithGroup.add(monolithScreen);

  const monolithHaloGeo = new THREE.TorusGeometry(150, 8, 12, 32);
  const monolithHaloMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
  });
  const monolithHaloRing = new THREE.Mesh(monolithHaloGeo, monolithHaloMat);
  monolithHaloRing.position.set(0, 560, 0);
  monolithGroup.add(monolithHaloRing);

  const monolithGemGeo = new THREE.OctahedronGeometry(55, 0);
  const monolithGemMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
  const monolithGem = new THREE.Mesh(monolithGemGeo, monolithGemMat);
  monolithGem.position.set(0, 560, 0);
  monolithGroup.add(monolithGem);

  const monolithHitGeo = new THREE.SphereGeometry(620, 16, 16);
  const monolithHitMesh = new THREE.Mesh(monolithHitGeo, coreHitMat);
  monolithHitMesh.name = 'easter-dont-panic';
  monolithHitMesh.userData = { body: easterDontPanicBody };
  monolithGroup.add(monolithHitMesh);
  interactiveMeshes.push(monolithHitMesh);

  easterEggsGroup.add(monolithGroup);

  // 6C. Cosmic Debugging Rubber Duck (Supreme Zero-G Code Counselor)
  const duckGroup = new THREE.Group();
  duckGroup.position.set(9200, -4200, 7400);

  const duckYellowMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.35,
    metalness: 0.1,
    emissive: 0xca8a04,
    emissiveIntensity: 0.35,
  });

  const duckBodyGeo = new THREE.SphereGeometry(220, 24, 24);
  const duckBody = new THREE.Mesh(duckBodyGeo, duckYellowMat);
  duckBody.scale.set(1.35, 1.0, 1.25);
  duckGroup.add(duckBody);

  const duckTailGeo = new THREE.ConeGeometry(65, 110, 16);
  const duckTail = new THREE.Mesh(duckTailGeo, duckYellowMat);
  duckTail.position.set(0, 75, -230);
  duckTail.rotation.x = -Math.PI * 0.35;
  duckGroup.add(duckTail);

  const duckHeadGeo = new THREE.SphereGeometry(140, 24, 24);
  const duckHead = new THREE.Mesh(duckHeadGeo, duckYellowMat);
  duckHead.position.set(0, 185, 135);
  duckGroup.add(duckHead);

  const duckBeakGeo = new THREE.BoxGeometry(110, 42, 110);
  const duckBeakMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
  const duckBeak = new THREE.Mesh(duckBeakGeo, duckBeakMat);
  duckBeak.position.set(0, 165, 275);
  duckGroup.add(duckBeak);

  // Duck Eyes (Expressive, prominent cartoon eyes with white sclera, pupils & catchlights!)
  const duckEyeWhiteGeo = new THREE.SphereGeometry(32, 16, 16);
  const duckEyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const eyeWhiteL = new THREE.Mesh(duckEyeWhiteGeo, duckEyeWhiteMat);
  eyeWhiteL.position.set(-56, 224, 218);
  const eyeWhiteR = new THREE.Mesh(duckEyeWhiteGeo, duckEyeWhiteMat);
  eyeWhiteR.position.set(56, 224, 218);
  duckGroup.add(eyeWhiteL, eyeWhiteR);

  const duckPupilGeo = new THREE.SphereGeometry(18, 16, 16);
  const duckPupilMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const pupilL = new THREE.Mesh(duckPupilGeo, duckPupilMat);
  pupilL.position.set(-56, 224, 238);
  const pupilR = new THREE.Mesh(duckPupilGeo, duckPupilMat);
  pupilR.position.set(56, 224, 238);
  duckGroup.add(pupilL, pupilR);

  const duckGlintGeo = new THREE.SphereGeometry(8, 12, 12);
  const duckGlintMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const glint1L = new THREE.Mesh(duckGlintGeo, duckGlintMat);
  glint1L.position.set(-50, 230, 248);
  const glint1R = new THREE.Mesh(duckGlintGeo, duckGlintMat);
  glint1R.position.set(62, 230, 248);
  duckGroup.add(glint1L, glint1R);

  const duckGlint2Geo = new THREE.SphereGeometry(4, 8, 8);
  const glint2L = new THREE.Mesh(duckGlint2Geo, duckGlintMat);
  glint2L.position.set(-61, 218, 246);
  const glint2R = new THREE.Mesh(duckGlint2Geo, duckGlintMat);
  glint2R.position.set(51, 218, 246);
  duckGroup.add(glint2L, glint2R);

  const duckBubbleGeo = new THREE.SphereGeometry(440, 24, 24);
  const duckBubbleMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.22,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
  });
  const duckBubble = new THREE.Mesh(duckBubbleGeo, duckBubbleMat);
  duckGroup.add(duckBubble);

  const duckHaloGeo = new THREE.TorusGeometry(320, 8, 12, 32);
  const duckHaloMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });
  const duckHaloRing = new THREE.Mesh(duckHaloGeo, duckHaloMat);
  duckHaloRing.rotation.x = Math.PI / 2.3;
  duckGroup.add(duckHaloRing);

  const duckHitGeo = new THREE.SphereGeometry(580, 16, 16);
  const duckHitMesh = new THREE.Mesh(duckHitGeo, coreHitMat);
  duckHitMesh.name = 'easter-rubber-duck';
  duckHitMesh.userData = { body: easterRubberDuckBody };
  duckGroup.add(duckHitMesh);
  interactiveMeshes.push(duckHitMesh);

  easterEggsGroup.add(duckGroup);

  // 6D. The Celestial Rubik's Quantum Cube (3x3 Multicolored Puzzle)
  const rubiksGroup = new THREE.Group();
  rubiksGroup.position.set(-7800, -3600, 8400);

  const rubiksCoreGeo = new THREE.BoxGeometry(340, 340, 340);
  const rubiksCoreMat = new THREE.MeshStandardMaterial({
    color: 0x090d16,
    metalness: 0.85,
    roughness: 0.3,
  });
  const rubiksCore = new THREE.Mesh(rubiksCoreGeo, rubiksCoreMat);
  rubiksGroup.add(rubiksCore);

  // 6 Chromatic Faces with Neon Glowing Insets
  const faceColors = [
    { color: 0x00f0ff, pos: [0, 0, 172], rot: [0, 0, 0] }, // Front: Cyan
    { color: 0xec4899, pos: [0, 0, -172], rot: [0, Math.PI, 0] }, // Back: Magenta
    { color: 0xfacc15, pos: [0, 172, 0], rot: [-Math.PI / 2, 0, 0] }, // Top: Yellow
    { color: 0x10b981, pos: [0, -172, 0], rot: [Math.PI / 2, 0, 0] }, // Bottom: Green
    { color: 0xf97316, pos: [-172, 0, 0], rot: [0, -Math.PI / 2, 0] }, // Left: Orange
    { color: 0xffffff, pos: [172, 0, 0], rot: [0, Math.PI / 2, 0] }, // Right: White
  ];

  const rubiksTileGeo = new THREE.BoxGeometry(96, 96, 6);
  const rubiksTileMaterials: THREE.MeshStandardMaterial[] = [];

  for (const fc of faceColors) {
    const fMat = new THREE.MeshStandardMaterial({
      color: fc.color,
      emissive: fc.color,
      emissiveIntensity: 0.55,
      roughness: 0.2,
      metalness: 0.5,
    });
    rubiksTileMaterials.push(fMat);

    const faceGroup = new THREE.Group();
    faceGroup.position.set(fc.pos[0], fc.pos[1], fc.pos[2]);
    faceGroup.rotation.set(fc.rot[0], fc.rot[1], fc.rot[2]);

    for (let rx = -1; rx <= 1; rx++) {
      for (let ry = -1; ry <= 1; ry++) {
        const tile = new THREE.Mesh(rubiksTileGeo, fMat);
        tile.position.set(rx * 105, ry * 105, 0);
        faceGroup.add(tile);
      }
    }
    rubiksGroup.add(faceGroup);
  }

  const rubiksQuantumGeo = new THREE.TorusGeometry(320, 8, 12, 32);
  const rubiksQuantumMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  });
  const rubiksQuantumRing = new THREE.Mesh(rubiksQuantumGeo, rubiksQuantumMat);
  rubiksGroup.add(rubiksQuantumRing);

  const rubiksHitGeo = new THREE.SphereGeometry(580, 16, 16);
  const rubiksHitMesh = new THREE.Mesh(rubiksHitGeo, coreHitMat);
  rubiksHitMesh.name = 'easter-rubiks';
  rubiksHitMesh.userData = { body: easterRubiksBody };
  rubiksGroup.add(rubiksHitMesh);
  interactiveMeshes.push(rubiksHitMesh);

  easterEggsGroup.add(rubiksGroup);

  // 6E. The Retro Space Invader Sentinel (1978 Arcade Alien Pixel Matrix)
  const invaderGroup = new THREE.Group();
  invaderGroup.position.set(-11000, 2400, 6500);

  const invaderPixels = [
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0],
  ];

  let totalActivePixels = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 11; c++) {
      if (invaderPixels[r][c] === 1) totalActivePixels++;
    }
  }

  const voxelSize = 48;
  const invaderBoxGeo = new THREE.BoxGeometry(voxelSize * 0.92, voxelSize * 0.92, voxelSize * 0.92);
  const invaderVoxelMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x15803d,
    emissiveIntensity: 0.65,
    roughness: 0.25,
    metalness: 0.3,
  });

  const invaderInstanced = new THREE.InstancedMesh(invaderBoxGeo, invaderVoxelMat, totalActivePixels);
  const dummyMatrix = new THREE.Matrix4();
  let vIdx = 0;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 11; c++) {
      if (invaderPixels[r][c] === 1) {
        const vx = (c - 5) * voxelSize;
        const vy = (3.5 - r) * voxelSize;
        dummyMatrix.setPosition(vx, vy, 0);
        invaderInstanced.setMatrixAt(vIdx++, dummyMatrix);
      }
    }
  }
  invaderInstanced.instanceMatrix.needsUpdate = true;
  invaderGroup.add(invaderInstanced);

  // Invader Glowing Red/White Eyes
  const invaderEyeGeo = new THREE.BoxGeometry(voxelSize * 0.95, voxelSize * 0.95, voxelSize * 1.05);
  const invaderEyeMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
  const inEyeL = new THREE.Mesh(invaderEyeGeo, invaderEyeMat);
  inEyeL.position.set((-5 + 3) * voxelSize, (3.5 - 3) * voxelSize, 0);
  const inEyeR = new THREE.Mesh(invaderEyeGeo, invaderEyeMat);
  inEyeR.position.set((-5 + 7) * voxelSize, (3.5 - 3) * voxelSize, 0);
  invaderGroup.add(inEyeL, inEyeR);

  // Antenna Pulsing Beacons
  const antennaGeo = new THREE.SphereGeometry(28, 16, 16);
  const antennaMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const antL = new THREE.Mesh(antennaGeo, antennaMat);
  antL.position.set((-5 + 2) * voxelSize, (3.5 - 0) * voxelSize + 20, 0);
  const antR = new THREE.Mesh(antennaGeo, antennaMat);
  antR.position.set((-5 + 8) * voxelSize, (3.5 - 0) * voxelSize + 20, 0);
  invaderGroup.add(antL, antR);

  const invaderHitGeo = new THREE.SphereGeometry(580, 16, 16);
  const invaderHitMesh = new THREE.Mesh(invaderHitGeo, coreHitMat);
  invaderHitMesh.name = 'easter-invader';
  invaderHitMesh.userData = { body: easterInvaderBody };
  invaderGroup.add(invaderHitMesh);
  interactiveMeshes.push(invaderHitMesh);

  easterEggsGroup.add(invaderGroup);

  // 6F. Chronos DMC-12 Time Cruiser (1985 Legendary Time Machine, Hover Mode)
  const deloreanGroup = new THREE.Group();
  deloreanGroup.position.set(6500, 4800, 8500);

  const deloreanBodyMat = new THREE.MeshStandardMaterial({
    color: 0xc8d0db,
    metalness: 0.92,
    roughness: 0.22,
  });
  const deloreanDarkMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.7,
    metalness: 0.4,
  });
  const deloreanGlassMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.2,
    roughness: 0.1,
    metalness: 0.9,
  });
  const deloreanFluxMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.95,
  });

  const deloreanChassisGeo = new THREE.BoxGeometry(260, 40, 520);
  const deloreanChassis = new THREE.Mesh(deloreanChassisGeo, deloreanBodyMat);
  deloreanGroup.add(deloreanChassis);

  const deloreanHoodGeo = new THREE.BoxGeometry(250, 24, 200);
  const deloreanHood = new THREE.Mesh(deloreanHoodGeo, deloreanBodyMat);
  deloreanHood.position.set(0, -6, 260);
  deloreanHood.rotation.x = 0.08;
  deloreanGroup.add(deloreanHood);

  const deloreanCabinGeo = new THREE.BoxGeometry(210, 48, 220);
  const deloreanCabin = new THREE.Mesh(deloreanCabinGeo, deloreanDarkMat);
  deloreanCabin.position.set(0, 36, 10);
  deloreanGroup.add(deloreanCabin);

  const deloreanWindshieldGeo = new THREE.BoxGeometry(196, 42, 40);
  const deloreanWindshield = new THREE.Mesh(deloreanWindshieldGeo, deloreanGlassMat);
  deloreanWindshield.position.set(0, 34, 115);
  deloreanWindshield.rotation.x = -0.45;
  deloreanGroup.add(deloreanWindshield);

  const deloreanDeckGeo = new THREE.BoxGeometry(200, 32, 170);
  const deloreanDeck = new THREE.Mesh(deloreanDeckGeo, deloreanBodyMat);
  deloreanDeck.position.set(0, 26, -170);
  deloreanGroup.add(deloreanDeck);

  const deloreanExhaustGeo = new THREE.BoxGeometry(50, 36, 60);
  const delExhaustL = new THREE.Mesh(deloreanExhaustGeo, deloreanDarkMat);
  delExhaustL.position.set(-68, 16, -260);
  const delExhaustR = new THREE.Mesh(deloreanExhaustGeo, deloreanDarkMat);
  delExhaustR.position.set(68, 16, -260);
  deloreanGroup.add(delExhaustL, delExhaustR);

  const deloreanFusionGeo = new THREE.CylinderGeometry(15, 18, 48, 16);
  const deloreanFusionMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
  const deloreanFusion = new THREE.Mesh(deloreanFusionGeo, deloreanFusionMat);
  deloreanFusion.position.set(0, 56, -150);
  deloreanGroup.add(deloreanFusion);

  const deloreanFluxBarGeo = new THREE.BoxGeometry(120, 16, 12);
  const deloreanFluxBar = new THREE.Mesh(deloreanFluxBarGeo, deloreanFluxMat);
  deloreanFluxBar.position.set(0, 38, -60);
  deloreanGroup.add(deloreanFluxBar);

  const deloreanHeadlightGeo = new THREE.BoxGeometry(40, 14, 8);
  const deloreanHeadlightMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
  const delHeadL = new THREE.Mesh(deloreanHeadlightGeo, deloreanHeadlightMat);
  delHeadL.position.set(-85, -4, 362);
  const delHeadR = new THREE.Mesh(deloreanHeadlightGeo, deloreanHeadlightMat);
  delHeadR.position.set(85, -4, 362);
  deloreanGroup.add(delHeadL, delHeadR);

  const deloreanWheelHubGeo = new THREE.CylinderGeometry(44, 44, 22, 16);
  const deloreanWheelRingGeo = new THREE.TorusGeometry(46, 7, 8, 24);
  const deloreanWheelPositions = [
    [-138, -14, 170],
    [138, -14, 170],
    [-138, -14, -160],
    [138, -14, -160],
  ];

  const deloreanWheelRings: THREE.Mesh[] = [];
  for (const [wx, wy, wz] of deloreanWheelPositions) {
    const hub = new THREE.Mesh(deloreanWheelHubGeo, deloreanDarkMat);
    hub.position.set(wx, wy, wz);
    hub.rotation.x = Math.PI / 2;
    deloreanGroup.add(hub);

    const pRing = new THREE.Mesh(deloreanWheelRingGeo, deloreanFluxMat);
    pRing.position.set(wx, wy, wz);
    pRing.rotation.x = Math.PI / 2;
    deloreanGroup.add(pRing);
    deloreanWheelRings.push(pRing);
  }

  const deloreanHitGeo = new THREE.SphereGeometry(620, 16, 16);
  const deloreanHitMesh = new THREE.Mesh(deloreanHitGeo, coreHitMat);
  deloreanHitMesh.name = 'easter-delorean';
  deloreanHitMesh.userData = { body: easterDeloreanBody };
  deloreanGroup.add(deloreanHitMesh);
  interactiveMeshes.push(deloreanHitMesh);

  easterEggsGroup.add(deloreanGroup);

  // 6G. Game Boy Quantum Pocket (Iconic 1989 8-Bit Retro Handheld)
  const gameboyGroup = new THREE.Group();
  gameboyGroup.position.set(-8800, -4500, -6800);

  const gameboyShellMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.65,
    metalness: 0.15,
  });
  const gameboyBezelMat = new THREE.MeshStandardMaterial({
    color: 0x374151,
    roughness: 0.25,
    metalness: 0.4,
  });
  const gameboyControlMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.4,
  });
  const gameboyButtonMat = new THREE.MeshStandardMaterial({
    color: 0xbe185d,
    emissive: 0x9d174d,
    emissiveIntensity: 0.25,
    roughness: 0.3,
  });

  const gameboyBodyGeo = new THREE.BoxGeometry(260, 420, 54);
  const gameboyBodyMesh = new THREE.Mesh(gameboyBodyGeo, gameboyShellMat);
  gameboyGroup.add(gameboyBodyMesh);

  const gameboyBezelGeo = new THREE.BoxGeometry(220, 185, 8);
  const gameboyBezelMesh = new THREE.Mesh(gameboyBezelGeo, gameboyBezelMat);
  gameboyBezelMesh.position.set(0, 80, 25);
  gameboyGroup.add(gameboyBezelMesh);

  const gameboyBatteryGeo = new THREE.SphereGeometry(6, 12, 12);
  const gameboyBatteryMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const gameboyBatteryMesh = new THREE.Mesh(gameboyBatteryGeo, gameboyBatteryMat);
  gameboyBatteryMesh.position.set(-90, 88, 30);
  gameboyGroup.add(gameboyBatteryMesh);

  const gameboyScreenTex = createGameboyScreenTexture();
  const gameboyScreenGeo = new THREE.PlaneGeometry(150, 135);
  const gameboyScreenMat = new THREE.MeshBasicMaterial({
    map: gameboyScreenTex,
    side: THREE.FrontSide,
  });
  const gameboyScreenMesh = new THREE.Mesh(gameboyScreenGeo, gameboyScreenMat);
  gameboyScreenMesh.position.set(6, 80, 30);
  gameboyGroup.add(gameboyScreenMesh);

  const dpadHorizGeo = new THREE.BoxGeometry(68, 22, 14);
  const dpadVertGeo = new THREE.BoxGeometry(22, 68, 14);
  const dpadHoriz = new THREE.Mesh(dpadHorizGeo, gameboyControlMat);
  const dpadVert = new THREE.Mesh(dpadVertGeo, gameboyControlMat);
  const dpadGroup = new THREE.Group();
  dpadGroup.add(dpadHoriz, dpadVert);
  dpadGroup.position.set(-65, -80, 27);
  gameboyGroup.add(dpadGroup);

  const gameboyBtnGeo = new THREE.CylinderGeometry(15, 15, 14, 16);
  const gameboyBtnB = new THREE.Mesh(gameboyBtnGeo, gameboyButtonMat);
  gameboyBtnB.rotation.x = Math.PI / 2;
  gameboyBtnB.position.set(46, -92, 27);
  const gameboyBtnA = new THREE.Mesh(gameboyBtnGeo, gameboyButtonMat);
  gameboyBtnA.rotation.x = Math.PI / 2;
  gameboyBtnA.position.set(82, -68, 27);
  gameboyGroup.add(gameboyBtnA, gameboyBtnB);

  const gameboyPillGeo = new THREE.BoxGeometry(30, 8, 8);
  const gameboySelectBtn = new THREE.Mesh(gameboyPillGeo, gameboyControlMat);
  gameboySelectBtn.position.set(-22, -155, 27);
  gameboySelectBtn.rotation.z = -0.45;
  const gameboyStartBtn = new THREE.Mesh(gameboyPillGeo, gameboyControlMat);
  gameboyStartBtn.position.set(22, -155, 27);
  gameboyStartBtn.rotation.z = -0.45;
  gameboyGroup.add(gameboySelectBtn, gameboyStartBtn);

  const gameboyCartridgeGeo = new THREE.BoxGeometry(210, 90, 32);
  const gameboyCartridgeMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.8,
    roughness: 0.25,
  });
  const gameboyCartridgeMesh = new THREE.Mesh(gameboyCartridgeGeo, gameboyCartridgeMat);
  gameboyCartridgeMesh.position.set(0, 225, -5);
  gameboyGroup.add(gameboyCartridgeMesh);

  const gameboyHaloGeo = new THREE.TorusGeometry(320, 6, 8, 32);
  const gameboyHaloMat = new THREE.MeshBasicMaterial({
    color: 0xa3e635,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const gameboyHaloRing = new THREE.Mesh(gameboyHaloGeo, gameboyHaloMat);
  gameboyGroup.add(gameboyHaloRing);

  const gameboyHitGeo = new THREE.SphereGeometry(560, 16, 16);
  const gameboyHitMesh = new THREE.Mesh(gameboyHitGeo, coreHitMat);
  gameboyHitMesh.name = 'easter-gameboy';
  gameboyHitMesh.userData = { body: easterGameboyBody };
  gameboyGroup.add(gameboyHitMesh);
  interactiveMeshes.push(gameboyHitMesh);

  easterEggsGroup.add(gameboyGroup);

  // 6H. Mangkuk Ramen Kosmik Abadi (Zero-G Tonkotsu Ramen with Toppings & Steam)
  const ramenGroup = new THREE.Group();
  ramenGroup.position.set(4800, -5200, -9200);

  const ramenCeramicMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.18,
    metalness: 0.08,
  });

  const ramenBowlGeo = new THREE.CylinderGeometry(260, 130, 170, 32, 1, true);
  const ramenBowlMesh = new THREE.Mesh(ramenBowlGeo, ramenCeramicMat);
  ramenGroup.add(ramenBowlMesh);

  const ramenBowlFootGeo = new THREE.CylinderGeometry(130, 120, 20, 32);
  const ramenBowlFoot = new THREE.Mesh(ramenBowlFootGeo, ramenCeramicMat);
  ramenBowlFoot.position.set(0, -95, 0);
  ramenGroup.add(ramenBowlFoot);

  const ramenRimTex = createRamenPatternTexture();
  const ramenRimGeo = new THREE.TorusGeometry(260, 12, 12, 32);
  const ramenRimMat = new THREE.MeshBasicMaterial({ map: ramenRimTex });
  const ramenRimMesh = new THREE.Mesh(ramenRimGeo, ramenRimMat);
  ramenRimMesh.rotation.x = Math.PI / 2;
  ramenRimMesh.position.set(0, 85, 0);
  ramenGroup.add(ramenRimMesh);

  const ramenSoupGeo = new THREE.CylinderGeometry(250, 250, 6, 32);
  const ramenSoupMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.45,
    roughness: 0.2,
    metalness: 0.1,
  });
  const ramenSoupMesh = new THREE.Mesh(ramenSoupGeo, ramenSoupMat);
  ramenSoupMesh.position.set(0, 65, 0);
  ramenGroup.add(ramenSoupMesh);

  const ramenEggWhiteGeo = new THREE.SphereGeometry(34, 16, 16);
  const ramenEggWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  const ramenYolkGeo = new THREE.SphereGeometry(20, 16, 16);
  const ramenYolkMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xea580c,
    emissiveIntensity: 0.6,
  });

  const ramenEggGroup1 = new THREE.Group();
  const ramenEggW1 = new THREE.Mesh(ramenEggWhiteGeo, ramenEggWhiteMat);
  const ramenYolk1 = new THREE.Mesh(ramenYolkGeo, ramenYolkMat);
  ramenEggW1.scale.set(1, 0.45, 1.3);
  ramenYolk1.scale.set(1, 0.5, 1);
  ramenYolk1.position.set(0, 4, 0);
  ramenEggGroup1.add(ramenEggW1, ramenYolk1);
  ramenEggGroup1.position.set(-90, 72, -40);
  ramenEggGroup1.rotation.y = 0.5;

  const ramenEggGroup2 = new THREE.Group();
  const ramenEggW2 = new THREE.Mesh(ramenEggWhiteGeo, ramenEggWhiteMat);
  const ramenYolk2 = new THREE.Mesh(ramenYolkGeo, ramenYolkMat);
  ramenEggW2.scale.set(1, 0.45, 1.3);
  ramenYolk2.scale.set(1, 0.5, 1);
  ramenYolk2.position.set(0, 4, 0);
  ramenEggGroup2.add(ramenEggW2, ramenYolk2);
  ramenEggGroup2.position.set(-115, 72, 30);
  ramenEggGroup2.rotation.y = -0.3;

  ramenGroup.add(ramenEggGroup1, ramenEggGroup2);

  const ramenNarutoGeo = new THREE.CylinderGeometry(34, 34, 8, 16);
  const ramenNarutoMat = new THREE.MeshStandardMaterial({ color: 0xfff1f2, roughness: 0.3 });
  const ramenNarutoMesh = new THREE.Mesh(ramenNarutoGeo, ramenNarutoMat);
  ramenNarutoMesh.position.set(80, 70, -60);
  ramenNarutoMesh.rotation.x = 0.1;

  const ramenNarutoCoreGeo = new THREE.TorusGeometry(16, 4, 8, 16);
  const ramenNarutoCoreMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
  const ramenNarutoCore = new THREE.Mesh(ramenNarutoCoreGeo, ramenNarutoCoreMat);
  ramenNarutoCore.rotation.x = Math.PI / 2;
  ramenNarutoCore.position.set(80, 75, -60);
  ramenGroup.add(ramenNarutoMesh, ramenNarutoCore);

  const ramenNoriGeo = new THREE.BoxGeometry(85, 110, 4);
  const ramenNoriMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.8 });
  const ramenNoriMesh = new THREE.Mesh(ramenNoriGeo, ramenNoriMat);
  ramenNoriMesh.position.set(0, 115, -190);
  ramenNoriMesh.rotation.x = -0.35;
  ramenGroup.add(ramenNoriMesh);

  const ramenChopstickGeo = new THREE.CylinderGeometry(4, 7, 340, 12);
  const ramenChopstickMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 });
  const ramenStick1 = new THREE.Mesh(ramenChopstickGeo, ramenChopstickMat);
  ramenStick1.position.set(60, 200, 40);
  ramenStick1.rotation.z = -1.1;
  ramenStick1.rotation.x = 0.3;
  const ramenStick2 = new THREE.Mesh(ramenChopstickGeo, ramenChopstickMat);
  ramenStick2.position.set(65, 215, 60);
  ramenStick2.rotation.z = -1.1;
  ramenStick2.rotation.x = 0.3;
  ramenGroup.add(ramenStick1, ramenStick2);

  const ramenNoodleGeo = new THREE.TorusGeometry(42, 6, 8, 24);
  const ramenNoodleMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    roughness: 0.3,
    emissive: 0xeab308,
    emissiveIntensity: 0.2,
  });
  const ramenNoodleMesh = new THREE.Mesh(ramenNoodleGeo, ramenNoodleMat);
  ramenNoodleMesh.position.set(60, 185, 50);
  ramenNoodleMesh.rotation.y = 0.8;
  ramenGroup.add(ramenNoodleMesh);

  const ramenSteamGeo = new THREE.TorusGeometry(180, 5, 8, 32);
  const ramenSteamMat = new THREE.MeshBasicMaterial({
    color: 0xffedd5,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
  });
  const ramenSteamRing = new THREE.Mesh(ramenSteamGeo, ramenSteamMat);
  ramenSteamRing.rotation.x = Math.PI / 2;
  ramenSteamRing.position.set(0, 140, 0);
  ramenGroup.add(ramenSteamRing);

  const ramenHitGeo = new THREE.SphereGeometry(580, 16, 16);
  const ramenHitMesh = new THREE.Mesh(ramenHitGeo, coreHitMat);
  ramenHitMesh.name = 'easter-ramen';
  ramenHitMesh.userData = { body: easterRamenBody };
  ramenGroup.add(ramenHitMesh);
  interactiveMeshes.push(ramenHitMesh);

  easterEggsGroup.add(ramenGroup);

  // 6I. The Sacred Save Icon (3.5" High-Density Floppy Diskette)
  const floppyGroup = new THREE.Group();
  floppyGroup.position.set(-5200, 6200, -8400);

  const floppyShellMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.55,
    metalness: 0.15,
  });
  const floppyShutterMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.25,
    metalness: 0.88,
  });
  const floppyDiskMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.3,
    metalness: 0.7,
  });

  const floppyBodyGeo = new THREE.BoxGeometry(320, 330, 22);
  const floppyBodyMesh = new THREE.Mesh(floppyBodyGeo, floppyShellMat);
  floppyGroup.add(floppyBodyMesh);

  const floppyShutterGeo = new THREE.BoxGeometry(200, 140, 25);
  const floppyShutterMesh = new THREE.Mesh(floppyShutterGeo, floppyShutterMat);
  floppyShutterMesh.position.set(-15, 95, 0);
  floppyGroup.add(floppyShutterMesh);

  const floppyHoleGeo = new THREE.BoxGeometry(36, 95, 27);
  const floppyHoleMesh = new THREE.Mesh(floppyHoleGeo, floppyDiskMat);
  floppyHoleMesh.position.set(-45, 95, 0);
  floppyGroup.add(floppyHoleMesh);

  const floppyLabelTex = createFloppyLabelTexture();
  const floppyLabelGeo = new THREE.PlaneGeometry(230, 175);
  const floppyLabelMat = new THREE.MeshBasicMaterial({
    map: floppyLabelTex,
    side: THREE.FrontSide,
  });
  const floppyLabelMesh = new THREE.Mesh(floppyLabelGeo, floppyLabelMat);
  floppyLabelMesh.position.set(0, -58, 12);
  floppyGroup.add(floppyLabelMesh);

  const floppyNotchGeo = new THREE.BoxGeometry(24, 24, 26);
  const floppyNotchMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
  const floppyNotchMesh = new THREE.Mesh(floppyNotchGeo, floppyNotchMat);
  floppyNotchMesh.position.set(140, -145, 0);
  floppyGroup.add(floppyNotchMesh);

  const floppyRingGeo = new THREE.TorusGeometry(280, 5, 8, 32);
  const floppyRingMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.75,
  });
  const floppyDataRing = new THREE.Mesh(floppyRingGeo, floppyRingMat);
  floppyGroup.add(floppyDataRing);

  const floppyHitGeo = new THREE.SphereGeometry(560, 16, 16);
  const floppyHitMesh = new THREE.Mesh(floppyHitGeo, coreHitMat);
  floppyHitMesh.name = 'easter-floppy';
  floppyHitMesh.userData = { body: easterFloppyBody };
  floppyGroup.add(floppyHitMesh);
  interactiveMeshes.push(floppyHitMesh);

  easterEggsGroup.add(floppyGroup);

  group.add(easterEggsGroup);

  /* =========================================================
     7. CONSTELLATION-STYLE ASTERISMS POPULATING ALL EMPTY SPACE
     Authentic constellation star groupings and iconic asterisms
     matching constellations.ts, with prominent 4-point Alpha flares!
     ========================================================= */
  interface DeepSpaceAsterism {
    name: string;
    theta: number; // Azimuth [0, 2*PI]
    phi: number; // Elevation [-PI/2, PI/2]
    radius: number; // Distance shell [25000, 48000]
    scale: number; // Pattern span [2200, 3800]
    stars: Array<{
      u: number;
      v: number;
      color?: number;
      hasFlare?: boolean;
    }>;
  }

  const DEEP_ASTERISMS: DeepSpaceAsterism[] = [
    // 1. Ursa Major (Big Dipper) - Top Northern Sky
    {
      name: 'Ursa Major',
      theta: 0.5,
      phi: 0.82,
      radius: 36000,
      scale: 3200,
      stars: [
        { u: 0.15, v: 0.16, color: 0xffffff, hasFlare: true }, // Dubhe (Alpha)
        { u: 0.14, v: -0.08, color: 0xe0f2fe }, // Merak
        { u: -0.06, v: -0.10, color: 0xe0f2fe }, // Phecda
        { u: -0.06, v: 0.12, color: 0xe0f2fe }, // Megrez
        { u: -0.22, v: 0.18, color: 0xffffff }, // Alioth
        { u: -0.34, v: 0.26, color: 0xa5f3fc, hasFlare: true }, // Mizar
        { u: -0.46, v: 0.32, color: 0x38bdf8 }, // Alkaid
      ],
    },
    // 2. Cygnus (Northern Cross) - Upper Left Void
    {
      name: 'Cygnus Cross',
      theta: 3.8,
      phi: 0.78,
      radius: 38000,
      scale: 3000,
      stars: [
        { u: 0.0, v: 0.30, color: 0xffffff, hasFlare: true }, // Deneb
        { u: 0.0, v: 0.05, color: 0xe0f2fe }, // Sadr
        { u: 0.02, v: -0.28, color: 0xfde047 }, // Albireo
        { u: -0.25, v: 0.04, color: 0xe0f2fe }, // Gienah
        { u: 0.25, v: 0.08, color: 0x38bdf8, hasFlare: true }, // Fawaris
      ],
    },
    // 3. Cassiopeia (The 'W') - Upper Right Void
    {
      name: 'Cassiopeia',
      theta: 2.5,
      phi: 0.95,
      radius: 35000,
      scale: 2900,
      stars: [
        { u: -0.25, v: 0.12, color: 0xffffff }, // Caph
        { u: -0.12, v: -0.10, color: 0xfef08a, hasFlare: true }, // Schedar
        { u: 0.0, v: 0.08, color: 0x38bdf8, hasFlare: true }, // Navi
        { u: 0.15, v: -0.08, color: 0xe0f2fe }, // Ruchbah
        { u: 0.28, v: 0.14, color: 0xe0f2fe }, // Segin
      ],
    },
    // 4. Orion (The Hunter) - Bottom Right Void
    {
      name: 'Orion Hunter',
      theta: 5.6,
      phi: -0.38,
      radius: 37000,
      scale: 3400,
      stars: [
        { u: -0.20, v: 0.28, color: 0xfef08a, hasFlare: true }, // Betelgeuse
        { u: 0.22, v: -0.26, color: 0x38bdf8, hasFlare: true }, // Rigel
        { u: 0.18, v: 0.24, color: 0xe0f2fe }, // Bellatrix
        { u: -0.16, v: -0.28, color: 0xe0f2fe }, // Saiph
        { u: -0.08, v: 0.0, color: 0xffffff }, // Alnitak
        { u: 0.0, v: 0.02, color: 0xffffff }, // Alnilam
        { u: 0.08, v: 0.04, color: 0xffffff }, // Mintaka
      ],
    },
    // 5. Crux (Southern Cross) - Deep Southern Void
    {
      name: 'Southern Cross',
      theta: 1.4,
      phi: -0.92,
      radius: 34000,
      scale: 2600,
      stars: [
        { u: 0.0, v: -0.28, color: 0xffffff, hasFlare: true }, // Acrux
        { u: 0.0, v: 0.24, color: 0xfef08a, hasFlare: true }, // Gacrux
        { u: -0.20, v: 0.02, color: 0x38bdf8 }, // Mimosa
        { u: 0.18, v: 0.04, color: 0xe0f2fe }, // Imai
      ],
    },
    // 6. Corona Borealis (Northern Crown) - Upper Mid Sky
    {
      name: 'Northern Crown',
      theta: 4.8,
      phi: 0.52,
      radius: 39000,
      scale: 2600,
      stars: [
        { u: -0.26, v: -0.10, color: 0xe0f2fe },
        { u: -0.16, v: 0.02, color: 0xe0f2fe },
        { u: 0.0, v: 0.12, color: 0xffffff, hasFlare: true }, // Alphecca (Alpha)
        { u: 0.16, v: 0.04, color: 0xe0f2fe },
        { u: 0.26, v: -0.08, color: 0xe0f2fe },
      ],
    },
    // 7. Taurus (Hyades V & Aldebaran) - Left Void
    {
      name: 'Taurus Bull',
      theta: 0.2,
      phi: 0.25,
      radius: 36000,
      scale: 3000,
      stars: [
        { u: -0.12, v: -0.12, color: 0xfef08a, hasFlare: true }, // Aldebaran
        { u: 0.22, v: 0.25, color: 0x38bdf8 }, // Elnath
        { u: 0.25, v: -0.04, color: 0xe0f2fe }, // Tianguan
        { u: -0.04, v: 0.04, color: 0xe0f2fe }, // Ain
        { u: -0.18, v: -0.04, color: 0xe0f2fe }, // Hyadum
      ],
    },
    // 8. Pegasus (The Great Square) - Far Right Void
    {
      name: 'Great Square of Pegasus',
      theta: 3.1,
      phi: 0.28,
      radius: 41000,
      scale: 3400,
      stars: [
        { u: -0.24, v: 0.22, color: 0xffffff, hasFlare: true }, // Alpheratz
        { u: 0.24, v: 0.22, color: 0xe0f2fe }, // Scheat
        { u: 0.24, v: -0.22, color: 0xffffff, hasFlare: true }, // Markab
        { u: -0.24, v: -0.22, color: 0x38bdf8 }, // Algenib
      ],
    },
    // 9. Scorpius (The Scorpion Tail) - Bottom Left Void
    {
      name: 'Scorpius',
      theta: 2.2,
      phi: -0.42,
      radius: 35000,
      scale: 3400,
      stars: [
        { u: -0.22, v: 0.20, color: 0xfef08a, hasFlare: true }, // Antares
        { u: -0.28, v: 0.26, color: 0xe0f2fe }, // Graffias
        { u: -0.24, v: 0.12, color: 0xe0f2fe }, // Dschubba
        { u: -0.10, v: 0.0, color: 0xe0f2fe }, // Sargas
        { u: 0.04, v: -0.16, color: 0xe0f2fe }, // Shaula
        { u: 0.14, v: -0.12, color: 0x38bdf8, hasFlare: true }, // Lesath
      ],
    },
    // 10. Sagittarius (The Teapot) - Far Bottom Void
    {
      name: 'Sagittarius Teapot',
      theta: 3.4,
      phi: -0.52,
      radius: 38000,
      scale: 3200,
      stars: [
        { u: -0.18, v: 0.12, color: 0xe0f2fe }, // Kaus Borealis
        { u: -0.22, v: -0.16, color: 0xffffff, hasFlare: true }, // Kaus Media
        { u: -0.06, v: -0.22, color: 0xe0f2fe }, // Kaus Australis
        { u: 0.14, v: -0.18, color: 0xe0f2fe }, // Ascella
        { u: 0.18, v: 0.08, color: 0x38bdf8, hasFlare: true }, // Nunki
        { u: 0.0, v: 0.18, color: 0xe0f2fe }, // Alnasl
      ],
    },
    // 11. Lyra (Vega Diamond) - High Northern Void
    {
      name: 'Lyra',
      theta: 4.3,
      phi: 0.65,
      radius: 37000,
      scale: 2400,
      stars: [
        { u: 0.0, v: 0.22, color: 0xffffff, hasFlare: true }, // Vega (Blazing Beacon)
        { u: -0.12, v: 0.04, color: 0xe0f2fe }, // Sheliak
        { u: 0.12, v: 0.04, color: 0xe0f2fe }, // Sulafat
        { u: -0.06, v: -0.18, color: 0x38bdf8 }, // Delta
        { u: 0.06, v: -0.18, color: 0xe0f2fe }, // Zeta
      ],
    },
    // 12. Bootes (The Kite & Arcturus) - Far Mid Void
    {
      name: 'Bootes Kite',
      theta: 1.8,
      phi: 0.44,
      radius: 39000,
      scale: 3100,
      stars: [
        { u: 0.0, v: -0.28, color: 0xfef08a, hasFlare: true }, // Arcturus
        { u: -0.16, v: -0.10, color: 0xe0f2fe }, // Muphrid
        { u: 0.16, v: -0.06, color: 0xe0f2fe }, // Izar
        { u: 0.10, v: 0.18, color: 0xe0f2fe }, // Delta
        { u: -0.02, v: 0.30, color: 0x38bdf8 }, // Nekkar
        { u: -0.14, v: 0.16, color: 0xe0f2fe }, // Seginus
      ],
    },
    // 13. Centaurus & Alpha Centauri Pointer - Low South
    {
      name: 'Centaurus',
      theta: 0.8,
      phi: -0.75,
      radius: 36000,
      scale: 3200,
      stars: [
        { u: 0.24, v: -0.12, color: 0xffffff, hasFlare: true }, // Rigil Kentaurus (Alpha)
        { u: 0.08, v: -0.10, color: 0x38bdf8, hasFlare: true }, // Hadar (Beta)
        { u: -0.12, v: 0.14, color: 0xe0f2fe }, // Menkent
        { u: -0.24, v: -0.02, color: 0xe0f2fe }, // Muhlifain
      ],
    },
    // 14. Gemini (The Twins) - Mid Sky
    {
      name: 'Gemini Twins',
      theta: 5.1,
      phi: 0.36,
      radius: 38000,
      scale: 3000,
      stars: [
        { u: -0.12, v: 0.24, color: 0xffffff, hasFlare: true }, // Castor
        { u: 0.10, v: 0.22, color: 0xfef08a, hasFlare: true }, // Pollux
        { u: -0.14, v: 0.02, color: 0xe0f2fe }, // Mebsuta
        { u: 0.06, v: 0.02, color: 0xe0f2fe }, // Wasat
        { u: -0.18, v: -0.20, color: 0xe0f2fe }, // Tejat
        { u: 0.02, v: -0.22, color: 0x38bdf8 }, // Alhena
      ],
    },
    // 15. Canis Major (The Great Dog & Sirius) - Bottom East
    {
      name: 'Canis Major',
      theta: 4.6,
      phi: -0.28,
      radius: 34000,
      scale: 2800,
      stars: [
        { u: 0.0, v: 0.22, color: 0xffffff, hasFlare: true }, // Sirius (Blinding Alpha Supergiant)
        { u: -0.18, v: 0.04, color: 0x38bdf8, hasFlare: true }, // Mirzam
        { u: -0.10, v: -0.22, color: 0xe0f2fe }, // Wezen
        { u: 0.12, v: -0.26, color: 0xe0f2fe }, // Adhara
        { u: -0.02, v: -0.34, color: 0xe0f2fe }, // Aludra
      ],
    },
    // 16. Auriga & Capella - High Sector
    {
      name: 'Auriga Pentagon',
      theta: 1.1,
      phi: 0.68,
      radius: 37000,
      scale: 2900,
      stars: [
        { u: -0.18, v: 0.18, color: 0xfef08a, hasFlare: true }, // Capella
        { u: -0.12, v: 0.30, color: 0xe0f2fe }, // Menkalinan
        { u: -0.28, v: 0.04, color: 0xe0f2fe }, // Mahasim
        { u: -0.22, v: -0.12, color: 0xe0f2fe }, // Hassaleh
        { u: 0.12, v: 0.06, color: 0xffffff, hasFlare: true }, // Mirfak
      ],
    },
    // 17. Draco Tail & Head - Far North
    {
      name: 'Draco',
      theta: 6.0,
      phi: 0.88,
      radius: 40000,
      scale: 3300,
      stars: [
        { u: 0.18, v: 0.16, color: 0xfef08a, hasFlare: true }, // Eltanin
        { u: 0.20, v: 0.06, color: 0xe0f2fe }, // Rastaban
        { u: 0.12, v: 0.02, color: 0xe0f2fe }, // Kuma
        { u: -0.06, v: -0.04, color: 0x38bdf8 }, // Thuban
        { u: -0.20, v: -0.14, color: 0xe0f2fe }, // Edasich
      ],
    },
    // 18. Andromeda Great Chain - Horizon Vista
    {
      name: 'Andromeda Chain',
      theta: 2.8,
      phi: 0.18,
      radius: 42000,
      scale: 3400,
      stars: [
        { u: -0.28, v: 0.18, color: 0xffffff, hasFlare: true }, // Alpheratz
        { u: -0.08, v: 0.08, color: 0xfef08a }, // Mirach
        { u: 0.18, v: -0.04, color: 0x38bdf8, hasFlare: true }, // Almach
        { u: 0.32, v: -0.12, color: 0xe0f2fe },
      ],
    },
    // 19. Delphinus (The Dolphin) - Delicate Compact Gem
    {
      name: 'Delphinus',
      theta: 4.1,
      phi: 0.22,
      radius: 36000,
      scale: 1800,
      stars: [
        { u: 0.0, v: 0.14, color: 0xffffff, hasFlare: true }, // Rotanev
        { u: -0.12, v: 0.0, color: 0xe0f2fe }, // Sualocin
        { u: 0.12, v: 0.0, color: 0x38bdf8 },
        { u: 0.0, v: -0.14, color: 0xe0f2fe },
        { u: -0.18, v: -0.28, color: 0xe0f2fe }, // Tail
      ],
    },
    // 20. Carina (Canopus Anchor) - South Polar Crown
    {
      name: 'Carina Canopus',
      theta: 2.6,
      phi: -0.85,
      radius: 35000,
      scale: 3000,
      stars: [
        { u: 0.0, v: 0.22, color: 0xffffff, hasFlare: true }, // Canopus (Blazing Alpha Supergiant)
        { u: -0.20, v: -0.04, color: 0x38bdf8 }, // Miaplacidus
        { u: 0.18, v: -0.08, color: 0xe0f2fe }, // Avior
        { u: 0.06, v: -0.24, color: 0xe0f2fe }, // Aspidiske
      ],
    },
    // 21. Hercules Keystone - Top Center
    {
      name: 'Hercules Keystone',
      theta: 3.5,
      phi: 0.58,
      radius: 39000,
      scale: 2700,
      stars: [
        { u: -0.12, v: 0.12, color: 0xe0f2fe }, // Pi
        { u: 0.12, v: 0.14, color: 0xe0f2fe }, // Epsilon
        { u: 0.08, v: -0.14, color: 0xffffff, hasFlare: true }, // Zeta
        { u: -0.14, v: -0.12, color: 0x38bdf8 }, // Kornephoros
      ],
    },
    // 22. Aquila (The Eagle & Altair) - Mid West
    {
      name: 'Aquila Eagle',
      theta: 4.5,
      phi: 0.12,
      radius: 37000,
      scale: 2800,
      stars: [
        { u: 0.0, v: 0.02, color: 0xffffff, hasFlare: true }, // Altair
        { u: -0.08, v: 0.14, color: 0xe0f2fe }, // Tarazed
        { u: 0.08, v: -0.12, color: 0xe0f2fe }, // Alshain
        { u: -0.22, v: -0.08, color: 0x38bdf8 }, // Deneb el Okab
        { u: 0.24, v: 0.10, color: 0xe0f2fe },
      ],
    },
    // 23. Aries (The Ram) - High Northwest
    {
      name: 'Aries Ram',
      theta: 0.9,
      phi: 0.35,
      radius: 41000,
      scale: 2200,
      stars: [
        { u: -0.16, v: 0.12, color: 0xfef08a, hasFlare: true }, // Hamal
        { u: 0.04, v: 0.02, color: 0xffffff }, // Sheratan
        { u: 0.18, v: -0.08, color: 0x38bdf8 }, // Mesarthim
      ],
    },
    // 24. Phoenix (The Firebird) - Far Deep South
    {
      name: 'Phoenix',
      theta: 5.9,
      phi: -0.72,
      radius: 36000,
      scale: 3000,
      stars: [
        { u: 0.0, v: 0.24, color: 0xfef08a, hasFlare: true }, // Ankaa (Alpha)
        { u: -0.20, v: 0.06, color: 0xe0f2fe },
        { u: 0.20, v: 0.08, color: 0x38bdf8 },
        { u: -0.10, v: -0.20, color: 0xe0f2fe },
        { u: 0.10, v: -0.22, color: 0xffffff },
      ],
    },
  ];

  const flareStarsGroup = new THREE.Group();
  flareStarsGroup.name = 'ConstellationFlareStars';

  const flareStarSprites: Array<{
    sprite: THREE.Sprite;
    baseScale: number;
    baseOpacity: number;
    phase: number;
    speed: number;
  }> = [];

  // Buffer for all asterism stars
  let totalAsterismStars = 0;
  for (const ast of DEEP_ASTERISMS) {
    totalAsterismStars += ast.stars.length;
  }

  const asterismGeo = new THREE.BufferGeometry();
  const asterismPositions = new Float32Array(totalAsterismStars * 3);
  const asterismColors = new Float32Array(totalAsterismStars * 3);

  let starWriteIdx = 0;
  for (const ast of DEEP_ASTERISMS) {
    const cosPhi = Math.cos(ast.phi);
    const sinPhi = Math.sin(ast.phi);
    const cosTheta = Math.cos(ast.theta);
    const sinTheta = Math.sin(ast.theta);

    // Center anchor vector on celestial sphere
    const cx = ast.radius * cosPhi * sinTheta;
    const cy = ast.radius * sinPhi;
    const cz = ast.radius * cosPhi * cosTheta;

    // Tangent orthogonal vectors U (horizontal) & V (vertical)
    const ux = cosTheta;
    const uy = 0;
    const uz = -sinTheta;

    const vx = -sinPhi * sinTheta;
    const vy = cosPhi;
    const vz = -sinPhi * cosTheta;

    for (const s of ast.stars) {
      const px = cx + (ux * s.u + vx * s.v) * ast.scale;
      const py = cy + (uy * s.u + vy * s.v) * ast.scale;
      const pz = cz + (uz * s.u + vz * s.v) * ast.scale;

      asterismPositions[starWriteIdx * 3] = px;
      asterismPositions[starWriteIdx * 3 + 1] = py;
      asterismPositions[starWriteIdx * 3 + 2] = pz;

      const c = s.color ? new THREE.Color(s.color) : new THREE.Color(0xffffff);
      asterismColors[starWriteIdx * 3] = c.r;
      asterismColors[starWriteIdx * 3 + 1] = c.g;
      asterismColors[starWriteIdx * 3 + 2] = c.b;

      // If star is a designated Alpha supergiant, spawn a radiant 4-point cross diffraction flare!
      if (s.hasFlare) {
        const fMat = new THREE.SpriteMaterial({
          map: flareStarTex,
          color: c,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const spr = new THREE.Sprite(fMat);
        spr.position.set(px, py, pz);

        const baseScale = Math.random() * 600 + 1750; // 1,750 - 2,350 majestic scale
        spr.scale.set(baseScale, baseScale, 1);
        spr.renderOrder = 5;

        flareStarsGroup.add(spr);
        flareStarSprites.push({
          sprite: spr,
          baseScale,
          baseOpacity: 0.96,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 2.0 + 1.2,
        });
      }

      starWriteIdx++;
    }
  }

  asterismGeo.setAttribute('position', new THREE.BufferAttribute(asterismPositions, 3));
  asterismGeo.setAttribute('color', new THREE.BufferAttribute(asterismColors, 3));

  const asterismMat = new THREE.PointsMaterial({
    size: 76.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const asterismPoints = new THREE.Points(asterismGeo, asterismMat);
  asterismPoints.renderOrder = 3;
  group.add(asterismPoints);

  // Extra Ambient Alpha Cross Flare Stars scattered across the entire celestial sphere (180 Brilliant Flares)
  const ambientFlareCount = 180;
  for (let i = 0; i < ambientFlareCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const r = 24000 + Math.random() * 32000;
    const px = r * Math.cos(phi) * Math.sin(theta);
    const py = r * Math.sin(phi);
    const pz = r * Math.cos(phi) * Math.cos(theta);

    const c = authenticStarPalette[Math.floor(Math.random() * authenticStarPalette.length)];
    const fMat = new THREE.SpriteMaterial({
      map: flareStarTex,
      color: c,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const spr = new THREE.Sprite(fMat);
    spr.position.set(px, py, pz);

    const baseScale = Math.random() * 1100 + 1350; // 1,350 - 2,450 majestic scale
    spr.scale.set(baseScale, baseScale, 1);
    spr.renderOrder = 5;

    flareStarsGroup.add(spr);
    flareStarSprites.push({
      sprite: spr,
      baseScale,
      baseOpacity: 0.92 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 2.0 + 1.0,
    });
  }

  group.add(flareStarsGroup);

  /* =========================================================
     8. OPEN STAR CLUSTERS (36 RICH CELESTIAL CLUSTERS)
     Scattered across empty celestial pockets for breathtaking cosmic depth
     ========================================================= */
  const clusterCount = 36;
  const starsPerCluster = 40;
  const totalClusterStars = clusterCount * starsPerCluster;

  const clusterGeo = new THREE.BufferGeometry();
  const clusterPositions = new Float32Array(totalClusterStars * 3);
  const clusterColors = new Float32Array(totalClusterStars * 3);

  const clusterCenters = [
    { theta: 0.35, phi: 0.42, r: 35000 }, // Pleiades near Taurus
    { theta: 1.75, phi: 0.72, r: 37000 }, // Perseus Double Cluster
    { theta: 3.15, phi: 0.48, r: 39000 }, // Praesepe / Beehive Cluster
    { theta: 4.85, phi: -0.35, r: 36000 }, // Ptolemy Cluster
    { theta: 2.15, phi: -0.65, r: 34000 }, // Jewel Box Cluster
    { theta: 5.45, phi: 0.55, r: 41000 }, // Coma Star Cluster
    { theta: 0.95, phi: -0.52, r: 38000 }, // Southern Pleiades
    { theta: 3.95, phi: -0.42, r: 36000 }, // Wild Duck Cluster
    { theta: 2.75, phi: 0.82, r: 40000 }, // Alpha Persei Cluster
    { theta: 4.45, phi: 0.38, r: 37000 }, // Hercules Globular M13
    { theta: 5.85, phi: -0.22, r: 35000 }, // Butterfly Cluster
    { theta: 1.35, phi: 0.22, r: 42000 }, // Hyades Open Cluster
    { theta: 3.65, phi: 0.62, r: 38000 }, // Cygnus OB2 Association
    { theta: 0.65, phi: -0.78, r: 35000 }, // Omega Centauri
    { theta: 2.45, phi: -0.28, r: 39000 }, // Carina Cluster
    { theta: 4.15, phi: 0.65, r: 37000 }, // Sagittarius Globular
    { theta: 5.15, phi: -0.62, r: 36000 }, // Centaurus A Field
    { theta: 1.15, phi: 0.85, r: 40000 }, // Cassiopeia Rich Cluster
    { theta: 3.45, phi: -0.15, r: 38000 }, // Scutum Cloud Cluster
    { theta: 6.05, phi: 0.35, r: 35000 }, // Pegasus Cluster
    // Extra clusters populating every celestial quadrant
    { theta: 0.15, phi: -0.25, r: 37000 },
    { theta: 1.55, phi: -0.45, r: 39000 },
    { theta: 2.95, phi: -0.75, r: 36000 },
    { theta: 4.65, phi: 0.75, r: 41000 },
    { theta: 5.25, phi: -0.15, r: 38000 },
    { theta: 0.75, phi: 0.65, r: 42000 },
    { theta: 2.35, phi: 0.35, r: 37000 },
    { theta: 3.85, phi: 0.15, r: 39000 },
    { theta: 4.25, phi: -0.55, r: 35000 },
    { theta: 5.65, phi: -0.70, r: 38000 },
    { theta: 1.95, phi: 0.10, r: 43000 },
    { theta: 3.35, phi: 0.70, r: 36000 },
    { theta: 4.95, phi: 0.20, r: 40000 },
    { theta: 6.15, phi: -0.45, r: 37000 },
    { theta: 0.45, phi: -0.60, r: 41000 },
    { theta: 2.65, phi: -0.40, r: 38000 },
  ];

  let cWriteIdx = 0;
  for (let c = 0; c < clusterCount; c++) {
    const cc = clusterCenters[c];
    const cosPhi = Math.cos(cc.phi);
    const sinPhi = Math.sin(cc.phi);
    const cosTheta = Math.cos(cc.theta);
    const sinTheta = Math.sin(cc.theta);

    const cx = cc.r * cosPhi * sinTheta;
    const cy = cc.r * sinPhi;
    const cz = cc.r * cosPhi * cosTheta;

    for (let s = 0; s < starsPerCluster; s++) {
      const spread = 980;
      const px = cx + gaussianRandom(0, spread);
      const py = cy + gaussianRandom(0, spread);
      const pz = cz + gaussianRandom(0, spread);

      clusterPositions[cWriteIdx * 3] = px;
      clusterPositions[cWriteIdx * 3 + 1] = py;
      clusterPositions[cWriteIdx * 3 + 2] = pz;

      const col =
        Math.random() < 0.65
          ? new THREE.Color(0xffffff)
          : Math.random() < 0.85
            ? new THREE.Color(0xe0f2fe)
            : new THREE.Color(0xa5f3fc);

      clusterColors[cWriteIdx * 3] = col.r;
      clusterColors[cWriteIdx * 3 + 1] = col.g;
      clusterColors[cWriteIdx * 3 + 2] = col.b;

      cWriteIdx++;
    }
  }

  clusterGeo.setAttribute('position', new THREE.BufferAttribute(clusterPositions, 3));
  clusterGeo.setAttribute('color', new THREE.BufferAttribute(clusterColors, 3));

  const clusterMat = new THREE.PointsMaterial({
    size: 78.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const clusterPoints = new THREE.Points(clusterGeo, clusterMat);
  clusterPoints.renderOrder = 2;
  group.add(clusterPoints);

  /* =========================================================
     9. DENSE, RADIANT CELESTIAL STARRY SKY
     Multi-shell celestial stellar panorama filling the entire galaxy view:
     - 9A. Fine Pinpoint Stars (140,000)
     - 9B. Medium Radiant Stars (42,000)
     - 9C. Macro Supergiant Brilliant Stars (16,000)
     ========================================================= */
  // 9A. Fine Pinpoint Stars (140,000)
  const fieldStarCount = 140000;
  const fieldStarGeo = new THREE.BufferGeometry();
  const fieldStarPos = new Float32Array(fieldStarCount * 3);
  const fieldStarColors = new Float32Array(fieldStarCount * 3);

  for (let i = 0; i < fieldStarCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const dist = 19000 + Math.random() * 41000; // Spherical multi-shell [19000, 60000]

    fieldStarPos[i * 3] = dist * Math.cos(phi) * Math.sin(theta);
    fieldStarPos[i * 3 + 1] = dist * Math.sin(phi);
    fieldStarPos[i * 3 + 2] = dist * Math.cos(phi) * Math.cos(theta);

    const col = authenticStarPalette[Math.floor(Math.random() * authenticStarPalette.length)];
    const brightness = 0.75 + Math.random() * 0.25;
    fieldStarColors[i * 3] = col.r * brightness;
    fieldStarColors[i * 3 + 1] = col.g * brightness;
    fieldStarColors[i * 3 + 2] = col.b * brightness;
  }

  fieldStarGeo.setAttribute('position', new THREE.BufferAttribute(fieldStarPos, 3));
  fieldStarGeo.setAttribute('color', new THREE.BufferAttribute(fieldStarColors, 3));

  const fieldStarMat = new THREE.PointsMaterial({
    size: 42.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const fieldStarPoints = new THREE.Points(fieldStarGeo, fieldStarMat);
  fieldStarPoints.renderOrder = 1;
  group.add(fieldStarPoints);

  // 9B. Medium Radiant Stars (42,000) - prominent stellar layer
  const medStarCount = 42000;
  const medStarGeo = new THREE.BufferGeometry();
  const medStarPos = new Float32Array(medStarCount * 3);
  const medStarColors = new Float32Array(medStarCount * 3);

  for (let i = 0; i < medStarCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const dist = 20000 + Math.random() * 38000; // [20000, 58000]

    medStarPos[i * 3] = dist * Math.cos(phi) * Math.sin(theta);
    medStarPos[i * 3 + 1] = dist * Math.sin(phi);
    medStarPos[i * 3 + 2] = dist * Math.cos(phi) * Math.cos(theta);

    const col = authenticStarPalette[Math.floor(Math.random() * authenticStarPalette.length)];
    const brightness = 0.85 + Math.random() * 0.15;
    medStarColors[i * 3] = col.r * brightness;
    medStarColors[i * 3 + 1] = col.g * brightness;
    medStarColors[i * 3 + 2] = col.b * brightness;
  }

  medStarGeo.setAttribute('position', new THREE.BufferAttribute(medStarPos, 3));
  medStarGeo.setAttribute('color', new THREE.BufferAttribute(medStarColors, 3));

  const medStarMat = new THREE.PointsMaterial({
    size: 72.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const medStarPoints = new THREE.Points(medStarGeo, medStarMat);
  medStarPoints.renderOrder = 2;
  group.add(medStarPoints);

  // 9C. Macro Supergiant Brilliant Stars (16,000) - bright foreground & midground jewels
  const macroStarCount = 16000;
  const macroStarGeo = new THREE.BufferGeometry();
  const macroStarPos = new Float32Array(macroStarCount * 3);
  const macroStarColors = new Float32Array(macroStarCount * 3);

  for (let i = 0; i < macroStarCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.asin(Math.random() * 2 - 1);
    const dist = 19000 + Math.random() * 37000; // [19000, 56000]

    macroStarPos[i * 3] = dist * Math.cos(phi) * Math.sin(theta);
    macroStarPos[i * 3 + 1] = dist * Math.sin(phi);
    macroStarPos[i * 3 + 2] = dist * Math.cos(phi) * Math.cos(theta);

    const col = authenticStarPalette[Math.floor(Math.random() * authenticStarPalette.length)];
    const brightness = 0.90 + Math.random() * 0.10;
    macroStarColors[i * 3] = col.r * brightness;
    macroStarColors[i * 3 + 1] = col.g * brightness;
    macroStarColors[i * 3 + 2] = col.b * brightness;
  }

  macroStarGeo.setAttribute('position', new THREE.BufferAttribute(macroStarPos, 3));
  macroStarGeo.setAttribute('color', new THREE.BufferAttribute(macroStarColors, 3));

  const macroStarMat = new THREE.PointsMaterial({
    size: 110.0,
    map: luminousStarTex,
    vertexColors: true,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const macroStarPoints = new THREE.Points(macroStarGeo, macroStarMat);
  macroStarPoints.renderOrder = 3;
  group.add(macroStarPoints);

  /* =========================================================
     10. DYNAMIC SPIRAL ROTATION & DISTANCE LOD
     ========================================================= */
  const baseRotX = discGroup.rotation.x;
  const baseRotY = discGroup.rotation.y;

  const update = (
    cameraDistance: number,
    dt: number,
    simulationTime: number,
    _normalizedMouse?: { x: number; y: number },
  ) => {
    // A. Distance LOD:
    // When inside solar system (cameraDistance <= 5500): galaxy is completely hidden!
    // Zooming out into deep cosmic space (cameraDistance > 5500): blossoms into full view by 14000
    let galaxyAlpha = 0;
    if (cameraDistance > 5500) {
      galaxyAlpha = Math.min(1.0, (cameraDistance - 5500) / 8500);
    }

    const isVisible = galaxyAlpha > 0.001;
    group.visible = isVisible;
    if (!isVisible) return;

    // B. Real-Time Swirling Spiral Particle Stream (Continuously orbits & swirls!)
    const swirlPositions = swirlGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < swirlCount; i++) {
      swirlAngles[i] -= swirlSpeeds[i] * dt;
      const a = swirlAngles[i];
      const r = swirlRadii[i];
      swirlPositions[i * 3] = r * Math.cos(a);
      swirlPositions[i * 3 + 1] = r * Math.sin(a);
      swirlPositions[i * 3 + 2] = swirlBaseZ[i] + Math.sin(simulationTime * 1.5 + i * 0.2) * 15;
    }
    swirlGeo.attributes.position.needsUpdate = true;

    // C. Continuous smooth 3D galactic rotation of disk & core (Fixed inclination, NO mouse tilt / wobble!)
    discGroup.rotation.x = baseRotX;
    discGroup.rotation.y = baseRotY;
    discGroup.rotation.z -= dt * 0.009;
    corePoints.rotation.z -= dt * 0.014; // Core rotates slightly faster
    flareStarsGroup.rotation.y += dt * 0.0015;

    coreMat.opacity = galaxyAlpha * (0.98 + Math.sin(simulationTime * 2.0) * 0.02);
    coreSpriteMat.opacity = galaxyAlpha * 0.98;
    puffMat.opacity = galaxyAlpha * 0.22; // Enhanced rich luminous gas puffs & dust lanes
    diskMat.opacity = galaxyAlpha * 0.98;
    swirlMat.opacity = galaxyAlpha * 0.98;
    asterismMat.opacity = galaxyAlpha * 1.0;
    clusterMat.opacity = galaxyAlpha * 0.98;
    macroStarMat.opacity = galaxyAlpha * 0.98;
    medStarMat.opacity = galaxyAlpha * 0.98;
    fieldStarMat.opacity = galaxyAlpha * 0.95;

    // D. Scintillation / Twinkle of the landmark Alpha cross flare stars
    for (let i = 0; i < flareStarSprites.length; i++) {
      const f = flareStarSprites[i];
      const twinkle = Math.sin(simulationTime * f.speed + f.phase);
      f.sprite.material.opacity = galaxyAlpha * f.baseOpacity * (0.85 + twinkle * 0.15);
      const scaleMultiplier = 1.0 + twinkle * 0.08;
      f.sprite.scale.set(f.baseScale * scaleMultiplier, f.baseScale * scaleMultiplier, 1);
    }

    // E. Galactic Easter Eggs: Zero-G gentle rotation & floating
    teapotGroup.rotation.y += dt * 0.45;
    teapotGroup.rotation.x = Math.sin(simulationTime * 1.2) * 0.12;
    teapotSparkleRing.rotation.z += dt * 0.8;

    monolithGroup.rotation.y += dt * 0.18;
    monolithGroup.position.y = 5800 + Math.sin(simulationTime * 1.0) * 45;
    monolithHaloRing.rotation.z += dt * 1.2;
    monolithGem.rotation.x += dt * 1.5;
    monolithGem.rotation.y += dt * 1.8;

    duckGroup.rotation.y += dt * 0.32;
    duckGroup.position.y = -4200 + Math.sin(simulationTime * 1.4) * 45;
    duckHaloRing.rotation.z -= dt * 0.6;

    rubiksGroup.rotation.x += dt * 0.35;
    rubiksGroup.rotation.y += dt * 0.45;
    rubiksQuantumRing.rotation.z += dt * 1.1;

    invaderGroup.rotation.y = Math.sin(simulationTime * 0.8) * 0.25;
    invaderGroup.position.y = 2400 + Math.sin(simulationTime * 1.6) * 35;

    // DeLorean gentle hover cruise & wheel plasma spin
    deloreanGroup.rotation.y += dt * 0.25;
    deloreanGroup.rotation.z = Math.sin(simulationTime * 1.5) * 0.08;
    deloreanGroup.position.y = 4800 + Math.sin(simulationTime * 1.3) * 40;
    for (const r of deloreanWheelRings) {
      r.rotation.z += dt * 3.5;
    }

    // Game Boy floating 8-bit rotation & halo
    gameboyGroup.rotation.y += dt * 0.28;
    gameboyGroup.rotation.x = Math.sin(simulationTime * 1.1) * 0.12;
    gameboyGroup.position.y = -4500 + Math.sin(simulationTime * 1.4) * 35;
    gameboyHaloRing.rotation.z += dt * 0.9;

    // Ramen bowl gentle zero-g float & steam swirl
    ramenGroup.rotation.y += dt * 0.22;
    ramenGroup.position.y = -5200 + Math.sin(simulationTime * 1.2) * 35;
    ramenSteamRing.rotation.z += dt * 0.6;
    ramenSteamRing.scale.setScalar(1.0 + Math.sin(simulationTime * 2.0) * 0.06);

    // Floppy disk quantum spin & data ring
    floppyGroup.rotation.y += dt * 0.3;
    floppyGroup.rotation.x = Math.sin(simulationTime * 0.9) * 0.1;
    floppyGroup.position.y = 6200 + Math.sin(simulationTime * 1.5) * 35;
    floppyDataRing.rotation.z -= dt * 1.2;
  };

  const dispose = () => {
    coreGeo.dispose();
    coreMat.dispose();
    coreSpriteMat.dispose();
    coreGoldenTex.dispose();
    diskGeo.dispose();
    diskMat.dispose();
    puffGeo.dispose();
    puffMat.dispose();
    swirlGeo.dispose();
    swirlMat.dispose();
    coreHitGeo.dispose();
    coreHitMat.dispose();

    // Easter egg disposals
    teapotBodyGeo.dispose();
    teapotSpoutGeo.dispose();
    teapotHandleGeo.dispose();
    teapotLidGeo.dispose();
    teapotKnobGeo.dispose();
    teapotAuraGeo.dispose();
    teapotRingGeo.dispose();
    teapotHitGeo.dispose();
    teapotMat.dispose();
    teapotAuraMat.dispose();
    teapotRingMat.dispose();

    monolithSlabGeo.dispose();
    monolithFrameGeo.dispose();
    monolithScreenGeo.dispose();
    monolithHaloGeo.dispose();
    monolithGemGeo.dispose();
    monolithHitGeo.dispose();
    monolithSlabMat.dispose();
    monolithFrameMat.dispose();
    monolithScreenMat.dispose();
    monolithHaloMat.dispose();
    monolithGemMat.dispose();
    dontPanicTex.dispose();

    duckBodyGeo.dispose();
    duckTailGeo.dispose();
    duckHeadGeo.dispose();
    duckBeakGeo.dispose();
    duckEyeWhiteGeo.dispose();
    duckPupilGeo.dispose();
    duckGlintGeo.dispose();
    duckGlint2Geo.dispose();
    duckBubbleGeo.dispose();
    duckHaloGeo.dispose();
    duckHitGeo.dispose();
    duckYellowMat.dispose();
    duckBeakMat.dispose();
    duckEyeWhiteMat.dispose();
    duckPupilMat.dispose();
    duckGlintMat.dispose();
    duckBubbleMat.dispose();
    duckHaloMat.dispose();

    rubiksCoreGeo.dispose();
    rubiksTileGeo.dispose();
    rubiksQuantumGeo.dispose();
    rubiksHitGeo.dispose();
    rubiksCoreMat.dispose();
    rubiksQuantumMat.dispose();
    for (const m of rubiksTileMaterials) m.dispose();

    invaderBoxGeo.dispose();
    invaderEyeGeo.dispose();
    antennaGeo.dispose();
    invaderHitGeo.dispose();
    invaderVoxelMat.dispose();
    invaderEyeMat.dispose();
    antennaMat.dispose();

    deloreanChassisGeo.dispose();
    deloreanHoodGeo.dispose();
    deloreanCabinGeo.dispose();
    deloreanWindshieldGeo.dispose();
    deloreanDeckGeo.dispose();
    deloreanExhaustGeo.dispose();
    deloreanFusionGeo.dispose();
    deloreanFluxBarGeo.dispose();
    deloreanHeadlightGeo.dispose();
    deloreanWheelHubGeo.dispose();
    deloreanWheelRingGeo.dispose();
    deloreanHitGeo.dispose();
    deloreanBodyMat.dispose();
    deloreanDarkMat.dispose();
    deloreanGlassMat.dispose();
    deloreanFluxMat.dispose();
    deloreanFusionMat.dispose();
    deloreanHeadlightMat.dispose();

    gameboyBodyGeo.dispose();
    gameboyBezelGeo.dispose();
    gameboyBatteryGeo.dispose();
    gameboyScreenGeo.dispose();
    dpadHorizGeo.dispose();
    dpadVertGeo.dispose();
    gameboyBtnGeo.dispose();
    gameboyPillGeo.dispose();
    gameboyCartridgeGeo.dispose();
    gameboyHaloGeo.dispose();
    gameboyHitGeo.dispose();
    gameboyShellMat.dispose();
    gameboyBezelMat.dispose();
    gameboyBatteryMat.dispose();
    gameboyScreenTex.dispose();
    gameboyScreenMat.dispose();
    gameboyControlMat.dispose();
    gameboyButtonMat.dispose();
    gameboyCartridgeMat.dispose();
    gameboyHaloMat.dispose();

    ramenBowlGeo.dispose();
    ramenBowlFootGeo.dispose();
    ramenRimGeo.dispose();
    ramenSoupGeo.dispose();
    ramenEggWhiteGeo.dispose();
    ramenYolkGeo.dispose();
    ramenNarutoGeo.dispose();
    ramenNarutoCoreGeo.dispose();
    ramenNoriGeo.dispose();
    ramenChopstickGeo.dispose();
    ramenNoodleGeo.dispose();
    ramenSteamGeo.dispose();
    ramenHitGeo.dispose();
    ramenCeramicMat.dispose();
    ramenRimTex.dispose();
    ramenRimMat.dispose();
    ramenSoupMat.dispose();
    ramenEggWhiteMat.dispose();
    ramenYolkMat.dispose();
    ramenNarutoMat.dispose();
    ramenNarutoCoreMat.dispose();
    ramenNoriMat.dispose();
    ramenChopstickMat.dispose();
    ramenNoodleMat.dispose();
    ramenSteamMat.dispose();

    floppyBodyGeo.dispose();
    floppyShutterGeo.dispose();
    floppyHoleGeo.dispose();
    floppyLabelGeo.dispose();
    floppyNotchGeo.dispose();
    floppyRingGeo.dispose();
    floppyHitGeo.dispose();
    floppyShellMat.dispose();
    floppyShutterMat.dispose();
    floppyDiskMat.dispose();
    floppyLabelTex.dispose();
    floppyLabelMat.dispose();
    floppyNotchMat.dispose();
    floppyRingMat.dispose();

    luminousStarTex.dispose();
    softPuffTex.dispose();
    flareStarTex.dispose();
    asterismGeo.dispose();
    asterismMat.dispose();
    clusterGeo.dispose();
    clusterMat.dispose();
    macroStarGeo.dispose();
    macroStarMat.dispose();
    medStarGeo.dispose();
    medStarMat.dispose();
    fieldStarGeo.dispose();
    fieldStarMat.dispose();
    for (const f of flareStarSprites) {
      f.sprite.material.dispose();
    }
  };

  return {
    group,
    interactiveMeshes,
    update,
    dispose,
  };
}
