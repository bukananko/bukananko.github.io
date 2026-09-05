import * as THREE from 'three';

export interface RocketGameState {
  speed: number;
  maxSpeed: number;
  throttle: number;
  boostActive: boolean;
  isMuted: boolean;
  nearbyBodyId: string | null;
}

/**
 * Procedural Web Audio Synthesizer for Sci-Fi Spacecraft Engines & Warp Drive
 */
class RocketAudioEngine {
  private ctx: AudioContext | null = null;
  private engineGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineOscSub: OscillatorNode | null = null;
  private engineFilter: BiquadFilterNode | null = null;
  private warpGain: GainNode | null = null;
  private warpOsc: OscillatorNode | null = null;
  private warpFilter: BiquadFilterNode | null = null;
  public isMuted = false;
  private isRunning = false;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported in this environment
      return;
    }

    const ctx = this.ctx;

    // Master Engine Tone (Low hum)
    this.engineGain = ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, ctx.currentTime);

    this.engineFilter = ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(260, ctx.currentTime);

    this.engineOsc = ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(55, ctx.currentTime);

    this.engineOscSub = ctx.createOscillator();
    this.engineOscSub.type = 'sine';
    this.engineOscSub.frequency.setValueAtTime(27.5, ctx.currentTime);

    this.engineOsc.connect(this.engineFilter);
    this.engineOscSub.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(ctx.destination);

    this.engineOsc.start();
    this.engineOscSub.start();

    // Hyperdrive Warp Tone (High harmonic resonant pulse)
    this.warpGain = ctx.createGain();
    this.warpGain.gain.setValueAtTime(0, ctx.currentTime);

    this.warpFilter = ctx.createBiquadFilter();
    this.warpFilter.type = 'bandpass';
    this.warpFilter.frequency.setValueAtTime(750, ctx.currentTime);
    this.warpFilter.Q.setValueAtTime(4.0, ctx.currentTime);

    this.warpOsc = ctx.createOscillator();
    this.warpOsc.type = 'sine';
    this.warpOsc.frequency.setValueAtTime(120, ctx.currentTime);

    this.warpOsc.connect(this.warpFilter);
    this.warpFilter.connect(this.warpGain);
    this.warpGain.connect(ctx.destination);

    this.warpOsc.start();
    this.isRunning = true;
  }

  public update(speedRatio: number, isBoosting: boolean) {
    if (!this.ctx || !this.isRunning || this.isMuted) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;

    // Engine hum modulation based on throttle speed
    if (this.engineGain && this.engineOsc && this.engineFilter) {
      const targetGain = Math.min(0.22, 0.04 + speedRatio * 0.18);
      this.engineGain.gain.setTargetAtTime(targetGain, t, 0.1);
      this.engineOsc.frequency.setTargetAtTime(50 + speedRatio * 90, t, 0.12);
      this.engineFilter.frequency.setTargetAtTime(220 + speedRatio * 450, t, 0.15);
    }

    // Hyperdrive warp sweep modulation
    if (this.warpGain && this.warpOsc && this.warpFilter) {
      if (isBoosting) {
        this.warpGain.gain.setTargetAtTime(0.25, t, 0.18);
        this.warpOsc.frequency.setTargetAtTime(260 + Math.sin(t * 12) * 45, t, 0.1);
        this.warpFilter.frequency.setTargetAtTime(950 + Math.sin(t * 8) * 200, t, 0.1);
      } else {
        this.warpGain.gain.setTargetAtTime(0, t, 0.15);
      }
    }
  }

  public playWarpEngage() {
    if (!this.ctx || this.isMuted) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } catch {
      // Ignore audio glitches
    }
  }

  public stopAll() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.engineGain) this.engineGain.gain.setTargetAtTime(0, t, 0.05);
    if (this.warpGain) this.warpGain.gain.setTargetAtTime(0, t, 0.05);
  }

  public dispose() {
    if (!this.ctx) return;
    try {
      this.stopAll();
      this.ctx.close();
    } catch {
      // Ignore
    }
    this.ctx = null;
    this.isRunning = false;
  }
}

/**
 * High-Performance Spacecraft Flight Simulator & Exploration Game Manager
 */
export class RocketGameManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  // Spacecraft 3D Meshes & Visuals
  public rocketGroup: THREE.Group;
  private flameCores: THREE.Mesh[] = [];
  private flameOuters: THREE.Mesh[] = [];
  private shockDiamonds: THREE.Mesh[] = [];
  private reactorCore: THREE.Mesh | null = null;
  private engineLightL: THREE.PointLight;
  private engineLightR: THREE.PointLight;

  // 3D Hyperspace Warp Field System (Attached to Scene)
  public warpFieldGroup: THREE.Group;
  private warpStreaks: THREE.LineSegments;
  private streakPositions: Float32Array;
  private streakVelocities: Float32Array;

  // Spacecraft Physics & Spatial Vectors
  public position = new THREE.Vector3(0, 320, 600);
  public velocity = new THREE.Vector3();
  public forward = new THREE.Vector3(0, 0, -1);
  public up = new THREE.Vector3(0, 1, 0);
  public right = new THREE.Vector3(1, 0, 0);
  private quaternion = new THREE.Quaternion();

  // Angular Orientation (Gimbal-Lock Free & Flip Proof)
  public yaw = 0; // heading rotation around world Y
  public pitch = 0; // vertical inclination clamped to [-1.45, 1.45] rad
  public bankRoll = 0; // persistent manual roll angle (controlled by Q/E)
  private turnBankAngle = 0; // dynamic aerodynamic bank during A/D turns

  // Speed Parameters (UNLIMITED WARP!)
  public currentSpeed = 0;
  public targetSpeed = 0;
  public readonly maxCruiseSpeed = 500; // km/s in cruise
  public readonly maxHyperSpeed = 10000; // km/s in hyperdrive warp
  public isBoosting = false;

  // Orbit Chase Camera
  private chaseCamPos = new THREE.Vector3();
  private chaseTargetPos = new THREE.Vector3();
  public camLookYaw = 0; // Spherical orbit yaw around craft
  public camLookPitch = 0; // Spherical orbit pitch around craft
  public isFlightInputActive = false;

  // State & Controls
  public isActive = false;
  private keys: Record<string, boolean> = {};
  public nearbyBodyId: string | null = null;
  public onStateUpdate?: (state: RocketGameState) => void;
  public onExitRequested?: () => void;

  // Audio Engine
  private audio = new RocketAudioEngine();

  constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    this.scene = scene;
    this.camera = camera;

    // 1. Create Valkyrie-X Quad-Wing Starfighter 3D Model
    const craft = this.createSpaceship3D();
    this.rocketGroup = craft.group;
    this.flameCores = craft.flameCores;
    this.flameOuters = craft.flameOuters;
    this.shockDiamonds = craft.shockDiamonds;
    this.reactorCore = craft.reactorCore;
    this.engineLightL = craft.lightL;
    this.engineLightR = craft.lightR;

    this.rocketGroup.visible = false;
    this.scene.add(this.rocketGroup);

    // 2. Create 3D Hyperspace Warp Field System
    const warp = this.createWarpField3D();
    this.warpFieldGroup = warp.group;
    this.warpStreaks = warp.streaks;
    this.streakPositions = warp.streakPositions;
    this.streakVelocities = warp.streakVelocities;

    this.warpFieldGroup.visible = false;
    this.scene.add(this.warpFieldGroup);
    this.bindControls();
  }

  /**
   * Constructs the Valkyrie-X Quad-Wing Starfighter 3D Spacecraft:
   * A 100% mathematically symmetric aerospace starfighter featuring a sleek faceted fuselage,
   * 4 X-Foil wings deployed in an aggressive 'X' formation with integrated rail cannons and energy blades,
   * a 2x2 matrix of 4 vectoring ion thrusters with flared titanium bells and internal turbine discs,
   * multi-stage plasma exhaust plumes, and an integrated local illumination rig.
   */
  private createSpaceship3D() {
    const group = new THREE.Group();

    // ── 0. INTEGRATED LOCAL SHIP ILLUMINATION RIG ──────────────────────────
    const shipKeyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    shipKeyLight.position.set(16, 24, 18);
    group.add(shipKeyLight);

    const shipRimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    shipRimLight.position.set(-16, -10, 14);
    group.add(shipRimLight);

    const shipFillLight = new THREE.HemisphereLight(0xffffff, 0x0f172a, 1.1);
    group.add(shipFillLight);

    // ── HIGH-TECH SCI-FI MATERIALS ──────────────────────────────────────────
    // Deep Space Stealth Titanium / Gunmetal Composite Hull
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.28,
    });

    // Midnight Cobalt & Electric Cyan Armor Plating
    const armorPlatesMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.6,
      roughness: 0.22,
    });

    // Arctic Ceramic White Markings & Trim (High contrast in deep space!)
    const whiteHighlightMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.3,
      roughness: 0.25,
    });

    // Obsidian Tungsten Carbon Structural Framework
    const darkAlloyMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.95,
      roughness: 0.35,
    });

    // Gunmetal Titanium (Cannons, Thruster Bells & Exhausts)
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.9,
      roughness: 0.22,
      side: THREE.DoubleSide,
    });

    // High-Luminance Electric Cyan Neon Glow Panels
    const glowCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });

    // Pure White-Hot Plasma Glow
    const glowWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Cockpit Glass - Iridescent Iridium Cyan Crystal Glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.88,
      transparent: true,
      opacity: 0.9,
    });

    // ── 1. CENTERLINE FUSELAGE & NEEDLE NOSE (X = 0) ──────────────────────
    // Core lifting body fuselage
    const bodyGeo = new THREE.BoxGeometry(3.0, 1.6, 12.0);
    const body = new THREE.Mesh(bodyGeo, hullMat);
    body.position.set(0, 0.05, 0.0);
    group.add(body);

    // Sharp aerodynamic needle nosecone
    const noseGeo = new THREE.CylinderGeometry(0.1, 1.5, 8.5, 4);
    noseGeo.rotateY(Math.PI / 4);
    noseGeo.rotateX(-Math.PI / 2);
    noseGeo.scale(1.0, 0.55, 1.0);
    const nose = new THREE.Mesh(noseGeo, hullMat);
    nose.position.set(0, 0.05, -10.2);
    group.add(nose);

    // Needle nose tip glow sensor
    const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), glowCyanMat);
    noseTip.position.set(0, 0.05, -14.5);
    group.add(noseTip);

    // Ceramic white dorsal center spine
    const spineGeo = new THREE.BoxGeometry(0.9, 0.28, 15.5);
    const spine = new THREE.Mesh(spineGeo, whiteHighlightMat);
    spine.position.set(0, 0.92, -1.5);
    group.add(spine);

    // Glowing cyan plasma power conduit running along the spine
    const conduitGeo = new THREE.BoxGeometry(0.25, 0.14, 15.0);
    const conduit = new THREE.Mesh(conduitGeo, glowCyanMat);
    conduit.position.set(0, 1.07, -1.5);
    group.add(conduit);

    // Ventral carbon keel underbelly
    const keelGeo = new THREE.BoxGeometry(1.2, 0.35, 11.0);
    const keel = new THREE.Mesh(keelGeo, darkAlloyMat);
    keel.position.set(0, -0.85, -0.5);
    group.add(keel);

    // ── 2. ELEVATED COMMAND COCKPIT & REACTOR (X = 0) ─────────────────────
    const canopyGeo = new THREE.CylinderGeometry(0.55, 1.15, 5.0, 4);
    canopyGeo.rotateY(Math.PI / 4);
    canopyGeo.rotateX(-Math.PI / 2);
    canopyGeo.scale(1.05, 0.65, 1.0);
    const canopy = new THREE.Mesh(canopyGeo, glassMat);
    canopy.position.set(0, 0.95, -3.2);
    group.add(canopy);

    // Titanium roll-cage arch frames
    const archGeo = new THREE.TorusGeometry(0.72, 0.08, 6, 12);
    archGeo.rotateX(Math.PI / 2);
    archGeo.scale(1.05, 1.0, 0.6);
    const arch1 = new THREE.Mesh(archGeo, titaniumMat);
    arch1.position.set(0, 0.9, -3.2);
    const arch2 = new THREE.Mesh(archGeo, titaniumMat);
    arch2.position.set(0, 0.85, -1.5);
    group.add(arch1, arch2);

    // Pilot interior seat & holographic targeting sphere
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.7, 0.8), darkAlloyMat);
    seat.position.set(0, 0.6, -3.0);
    const holoHUD = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), glowCyanMat);
    holoHUD.position.set(0, 0.95, -4.2);
    group.add(seat, holoHUD);

    // Exposed Quantum Flux Arc Reactor at mid-fuselage
    const reactorHousing = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.12, 8, 16), titaniumMat);
    reactorHousing.rotateX(Math.PI / 2);
    reactorHousing.position.set(0, 1.06, 1.0);
    group.add(reactorHousing);

    const reactorCore = new THREE.Mesh(new THREE.SphereGeometry(0.52, 12, 12), glowCyanMat);
    reactorCore.position.set(0, 1.06, 1.0);
    group.add(reactorCore);

    // ── 3. BILATERAL SIDE INTAKES (PERFECTLY SYMMETRIC ±X) ─────────────────
    for (const signX of [-1, 1]) {
      const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.1, 7.0), armorPlatesMat);
      scoop.position.set(signX * 1.75, 0.05, -3.2);
      scoop.rotation.y = signX * -0.06;
      group.add(scoop);

      const vent = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.15), glowCyanMat);
      vent.position.set(signX * 1.75, 0.05, -6.7);
      group.add(vent);
    }

    // ── 4. QUAD X-FOIL WINGS (100% MATHEMATICAL BILATERAL SYMMETRY) ────────
    // Dedicated builder: every child element is placed relative to the wing root,
    // ensuring zero trigonometry desync, zero floating parts, and identical symmetry.
    const createWingAssembly = (isLeft: boolean, isUpper: boolean) => {
      const wingGroup = new THREE.Group();
      const signX = isLeft ? -1 : 1;
      const signY = isUpper ? 1 : -1;

      // Position wing root at fuselage edge
      wingGroup.position.set(signX * 1.5, signY * 0.45, 0.0);

      // Symmetrical rotation:
      // Yaw (sweep back): signX * -0.16
      // Roll (dihedral/anhedral): signX * -signY * 0.35 (~20° X-formation)
      wingGroup.rotation.set(0, signX * -0.16, signX * -signY * 0.35);

      // A. Main Wing Blade
      const mainWing = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.22, 3.2), armorPlatesMat);
      mainWing.position.set(signX * 4.8, 0, 0.4);
      mainWing.rotation.y = signX * -0.12;
      wingGroup.add(mainWing);

      // B. Inner Wing Root Reinforcement
      const rootReinforce = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.35, 4.0), hullMat);
      rootReinforce.position.set(signX * 1.5, 0, 0.2);
      wingGroup.add(rootReinforce);

      // C. High-Contrast Ceramic White Chevron Armor Plate (Firmly on wing top!)
      const chevron = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.28, 1.8), whiteHighlightMat);
      chevron.position.set(signX * 5.0, signY * 0.05, 0.3);
      chevron.rotation.y = signX * -0.12;
      wingGroup.add(chevron);

      // D. Glowing Electric Cyan Leading-Edge Energy Blade
      const blade = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.24, 0.16), glowCyanMat);
      blade.position.set(signX * 4.8, 0, -1.25);
      blade.rotation.y = signX * -0.12;
      wingGroup.add(blade);

      // E. Wingtip Heavy Rail Cannon (Firmly welded to wingtip!)
      const tipX = signX * 9.6;
      const tipZ = 0.4;

      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 6.2, 8), titaniumMat);
      barrel.rotateX(-Math.PI / 2);
      barrel.position.set(tipX, 0, tipZ);
      wingGroup.add(barrel);

      // 3 Cyan Magnetic Accelerator Coils along barrel
      for (const zOff of [-1.8, -0.6, 0.6]) {
        const coil = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 6, 12), glowCyanMat);
        coil.rotateX(Math.PI / 2);
        coil.position.set(tipX, 0, tipZ + zOff);
        wingGroup.add(coil);
      }

      // Blazing White-Hot Muzzle Emitter Tip
      const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), glowWhiteMat);
      muzzle.position.set(tipX, 0, tipZ - 3.2);
      wingGroup.add(muzzle);

      // Wingtip Navigation Strobe (Red on Port/Left, Green on Starboard/Right)
      const strobeColor = isLeft ? 0xff1e38 : 0x00ff88;
      const strobe = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshBasicMaterial({ color: strobeColor }),
      );
      strobe.position.set(tipX, signY * 0.2, tipZ + 2.8);
      wingGroup.add(strobe);

      return wingGroup;
    };

    // Instantiate all 4 X-wings
    group.add(createWingAssembly(false, true));  // Upper-Right (Starboard)
    group.add(createWingAssembly(true, true));   // Upper-Left (Port)
    group.add(createWingAssembly(false, false)); // Lower-Right (Starboard)
    group.add(createWingAssembly(true, false));  // Lower-Left (Port)

    // ── 5. QUAD VECTORING PROPULSION TURBINES (2x2 MATRIX OF 4 ENGINES!) ───
    const engineCoords = [
      { x: 1.45, y: 0.55 },  // Top-Right Engine
      { x: -1.45, y: 0.55 }, // Top-Left Engine
      { x: 1.45, y: -0.45 }, // Bottom-Right Engine
      { x: -1.45, y: -0.45 },// Bottom-Left Engine
    ];

    const flameCores: THREE.Mesh[] = [];
    const flameOuters: THREE.Mesh[] = [];
    const shockDiamonds: THREE.Mesh[] = [];

    // Inner Jet: Pure White-Hot Plasma Beam (Anchored at z=6.6, shooting back along +Z)
    const coreGeo = new THREE.ConeGeometry(0.44, 6.2, 16);
    coreGeo.rotateX(Math.PI / 2);
    coreGeo.translate(0, 0, 3.1);

    // Outer Plume: Electric Cyan Volumetric Plasma Plume
    const outerGeo = new THREE.ConeGeometry(0.85, 9.5, 16);
    outerGeo.rotateX(Math.PI / 2);
    outerGeo.translate(0, 0, 4.75);

    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    for (const ec of engineCoords) {
      // Nacelle cylindrical housing
      const nacelleGeo = new THREE.CylinderGeometry(0.78, 0.72, 4.2, 16);
      nacelleGeo.rotateX(-Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, titaniumMat);
      nacelle.position.set(ec.x, ec.y, 3.8);
      group.add(nacelle);

      // Flared Hollow Titanium Nozzle Bell (openEnded: true!)
      const nozzleGeo = new THREE.CylinderGeometry(0.88, 0.72, 1.6, 16, 1, true);
      nozzleGeo.rotateX(Math.PI / 2);
      const nozzle = new THREE.Mesh(nozzleGeo, titaniumMat);
      nozzle.position.set(ec.x, ec.y, 5.8);
      group.add(nozzle);

      // Glowing Cyan Magnetic Confinement Ring at Nozzle Exit Rim
      const rimGeo = new THREE.TorusGeometry(0.88, 0.06, 8, 20);
      rimGeo.rotateX(Math.PI / 2);
      const rim = new THREE.Mesh(rimGeo, glowCyanMat);
      rim.position.set(ec.x, ec.y, 6.6);
      group.add(rim);

      // Internal Glowing Turbine Injector Disc (Blazing white inside!)
      const turbineGeo = new THREE.CircleGeometry(0.66, 16);
      const turbine = new THREE.Mesh(turbineGeo, glowWhiteMat);
      turbine.position.set(ec.x, ec.y, 5.2);
      group.add(turbine);

      // Dedicated Plasma Exhaust Flames for this Engine
      const core = new THREE.Mesh(coreGeo, glowWhiteMat);
      core.position.set(ec.x, ec.y, 6.6);

      const outer = new THREE.Mesh(outerGeo, outerMat);
      outer.position.set(ec.x, ec.y, 6.6);

      group.add(core, outer);
      flameCores.push(core);
      flameOuters.push(outer);

      // 2 Shock Diamond Rings along the exhaust plume
      for (const zOff of [8.6, 10.8]) {
        const diamondGeo = new THREE.TorusGeometry(0.48, 0.05, 6, 16);
        diamondGeo.rotateX(Math.PI / 2);
        const diamond = new THREE.Mesh(diamondGeo, glowCyanMat);
        diamond.position.set(ec.x, ec.y, zOff);
        group.add(diamond);
        shockDiamonds.push(diamond);
      }
    }

    // High-Intensity Thrust Chamber Point Lights
    const lightL = new THREE.PointLight(0x00f5ff, 6.0, 45);
    lightL.position.set(-1.45, 0.05, 6.5);
    const lightR = new THREE.PointLight(0x00f5ff, 6.0, 45);
    lightR.position.set(1.45, 0.05, 6.5);
    group.add(lightL, lightR);

    return {
      group,
      flameCores,
      flameOuters,
      shockDiamonds,
      reactorCore,
      lightL,
      lightR,
    };
  }

  /**
   * Constructs the 3D Hyperspace Warp Field System:
   * 2,000 relativistic star streaks rushing past camera.
   * Note: Wireframe cylinder tunnels and shockwave rings are eliminated completely,
   * preventing any dark spiderweb artifacts from appearing in front of bright astronomical bodies.
   */
  private createWarpField3D() {
    const group = new THREE.Group();

    // 2,000 Relativistic 3D Star Warp Streaks (Outer to ship so never obscure it)
    const streakCount = 2000;
    const streakPositions = new Float32Array(streakCount * 6);
    const streakVelocities = new Float32Array(streakCount);
    const streakColors = new Float32Array(streakCount * 6);

    for (let i = 0; i < streakCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Circular radial distribution around spaceship
      const radius = 24 + Math.random() * 450;
      const sx = Math.cos(angle) * radius;
      const sy = Math.sin(angle) * radius;
      const sz = -2000 + Math.random() * 2800;
      const length = 120 + Math.random() * 320;

      // Start vertex (head of streak rushing toward camera)
      streakPositions[i * 6] = sx;
      streakPositions[i * 6 + 1] = sy;
      streakPositions[i * 6 + 2] = sz;

      // End vertex (tail of streak)
      streakPositions[i * 6 + 3] = sx;
      streakPositions[i * 6 + 4] = sy;
      streakPositions[i * 6 + 5] = sz + length;

      streakVelocities[i] = 4800 + Math.random() * 3800;

      // Color gradient: Head is bright white, Tail is sapphire cyan
      streakColors[i * 6] = 1.0;
      streakColors[i * 6 + 1] = 1.0;
      streakColors[i * 6 + 2] = 1.0;

      streakColors[i * 6 + 3] = 0.05;
      streakColors[i * 6 + 4] = 0.65;
      streakColors[i * 6 + 5] = 1.0;
    }

    const streakGeo = new THREE.BufferGeometry();
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
    streakGeo.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));

    const streakMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const streaks = new THREE.LineSegments(streakGeo, streakMat);
    group.add(streaks);

    return {
      group,
      streaks,
      streakPositions,
      streakVelocities,
    };
  }

  /**
   * Starts Rocket Pilot Exploration Mode at a given world spawn position
   */
  public start(spawnPos: THREE.Vector3) {
    this.isActive = true;
    this.position.copy(spawnPos);
    this.velocity.set(0, 0, 0);
    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.yaw = 0;
    this.pitch = 0;
    this.bankRoll = 0;
    this.camLookYaw = 0;
    this.camLookPitch = 0;
    this.isBoosting = false;

    this.rocketGroup.position.copy(spawnPos);
    this.rocketGroup.visible = true;
    this.warpFieldGroup.position.copy(spawnPos);
    this.warpFieldGroup.visible = false;

    // Place camera smoothly behind the ship
    this.chaseTargetPos.copy(this.position);
    this.chaseCamPos.copy(this.getIdealCameraPosition());
    this.camera.position.copy(this.chaseCamPos);
    this.camera.lookAt(this.chaseTargetPos);

    this.audio.init();
  }

  /**
   * Stops Rocket Mode and parks the spacecraft
   */
  public stop() {
    this.isActive = false;
    this.currentSpeed = 0;
    this.targetSpeed = 0;
    this.velocity.set(0, 0, 0);
    this.isBoosting = false;
    this.keys = {};
    this.rocketGroup.visible = false;
    this.warpFieldGroup.visible = false;
    this.audio.stopAll();
  }

  /**
   * Main Frame Physics, Control & Camera Loop
   */
  public update(dt: number) {
    if (!this.isActive) return;

    // 1. Process Keyboard & Flight Inputs
    this.processFlightInputs(dt);

    // 2. Compute Direction Vectors from Pitch & Yaw (Gimbal-Lock Free!)
    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);

    // Forward direction: aims along yaw and pitch
    this.forward.set(-sinY * cosP, sinP, -cosY * cosP).normalize();
    // Right direction: perpendicular to forward in world XZ
    this.right.set(cosY, 0, -sinY).normalize();
    // Up direction: perpendicular to right and forward (Y is always up)
    this.up.crossVectors(this.right, this.forward).normalize();

    // 3. Construct Spacecraft Orientation with Continuous Q/E Roll & Aerodynamic Banking
    const totalRoll = this.bankRoll + this.turnBankAngle;
    const rollMat = new THREE.Matrix4().makeRotationAxis(this.forward, totalRoll);
    const rolledRight = this.right.clone().applyMatrix4(rollMat);
    const rolledUp = this.up.clone().applyMatrix4(rollMat);

    // Basis matrix: X = rolledRight, Y = rolledUp, Z = -forward
    const rotMatrix = new THREE.Matrix4().makeBasis(
      rolledRight,
      rolledUp,
      this.forward.clone().negate(),
    );
    this.quaternion.setFromRotationMatrix(rotMatrix);
    this.rocketGroup.quaternion.copy(this.quaternion);

    // 4. Update Velocity & Position
    const speedAlpha = Math.min(1.0, dt * (this.isBoosting ? 5.5 : 3.2));
    this.currentSpeed = THREE.MathUtils.lerp(this.currentSpeed, this.targetSpeed, speedAlpha);

    this.velocity.copy(this.forward).multiplyScalar(this.currentSpeed);
    this.position.addScaledVector(this.velocity, dt);
    this.rocketGroup.position.copy(this.position);

    // 5. Update Thruster Flames & 3D Warp Field System
    this.updateEngineVisuals(dt);

    // 6. Update Orbit Chase Camera
    this.updateCamera(dt);

    // 7. Update Audio Engine
    const speedRatio = Math.min(1.0, Math.abs(this.currentSpeed) / this.maxCruiseSpeed);
    this.audio.update(speedRatio, this.isBoosting);

    // 8. Emit State Update to HUD
    if (this.onStateUpdate) {
      this.onStateUpdate({
        speed: Math.round(Math.abs(this.currentSpeed)),
        maxSpeed: this.maxCruiseSpeed,
        throttle: this.currentSpeed / this.maxCruiseSpeed,
        boostActive: this.isBoosting,
        isMuted: this.audio.isMuted,
        nearbyBodyId: this.nearbyBodyId,
      });
    }
  }

  /**
   * Processes flight inputs with full pitch/dive support, smooth turning, continuous roll (Q/E),
   * and hyperdrive warp boost (cannot be activated when stationary/diem).
   */
  private processFlightInputs(dt: number) {
    // A. Hyperdrive Warp Boost: CANNOT BE ACTIVATED WHEN STATIONARY / DIEM!
    const isWPressed = Boolean(
      this.keys['KeyW'] || this.keys['w'] || this.keys['W'],
    );
    const isStationary = Math.abs(this.currentSpeed) < 8 && !isWPressed;

    const shiftPressed = Boolean(
      this.keys['ShiftLeft'] ||
      this.keys['ShiftRight'] ||
      this.keys['Space'],
    );

    const wantsBoost =
      shiftPressed &&
      !isStationary &&
      !this.keys['KeyX'] &&
      !this.keys['x'] &&
      !this.keys['KeyS'] &&
      !this.keys['s'];

    if (wantsBoost) {
      if (!this.isBoosting) {
        this.audio.playWarpEngage();
      }
      this.isBoosting = true;
    } else {
      this.isBoosting = false;
    }

    // B. Throttle Speed (Forward / Reverse / Airbrake)
    const topSpeed = this.isBoosting ? this.maxHyperSpeed : this.maxCruiseSpeed;

    if (isWPressed) {
      this.targetSpeed = topSpeed;
    } else if (this.keys['KeyS'] || this.keys['s'] || this.keys['S']) {
      // Reverse thruster / retro brake
      this.targetSpeed = -100;
    } else if (this.keys['KeyX'] || this.keys['x'] || this.keys['X']) {
      // Full stop / airbrake
      this.targetSpeed = 0;
    } else {
      // Gentle cruise inertia
      this.targetSpeed *= 0.99;
    }

    // C. Pitch: Nose Down (Dive / Ke Bawah) and Nose Up (Climb / Ke Atas)
    let pitchInput = 0;
    // ArrowDown or KeyK: Pitch DOWN (dive towards ground/bottom!)
    if (this.keys['ArrowDown'] || this.keys['KeyK'] || this.keys['k'] || this.keys['K']) {
      pitchInput -= 1.0;
    }
    // ArrowUp or KeyI: Pitch UP (climb towards sky/top!)
    if (this.keys['ArrowUp'] || this.keys['KeyI'] || this.keys['i'] || this.keys['I']) {
      pitchInput += 1.0;
    }

    if (pitchInput !== 0) {
      this.pitch += pitchInput * 1.65 * dt;
      // Clamp pitch to prevent flipping upside down (jungkir balik)!
      this.pitch = THREE.MathUtils.clamp(this.pitch, -1.45, 1.45);
    }

    // D. Yaw: Turn Left & Right (Smooth continuous heading)
    let yawInput = 0;
    if (this.keys['KeyA'] || this.keys['a'] || this.keys['A'] || this.keys['ArrowLeft']) {
      yawInput += 1.0; // Turn left
    }
    if (this.keys['KeyD'] || this.keys['d'] || this.keys['D'] || this.keys['ArrowRight']) {
      yawInput -= 1.0; // Turn right
    }

    this.yaw += yawInput * 1.45 * dt;

    // E. Continuous Roll (Q / E): Rolls the craft freely around forward axis
    const rollLeft = Boolean(this.keys['KeyQ'] || this.keys['q'] || this.keys['Q']);
    const rollRight = Boolean(this.keys['KeyE'] || this.keys['e'] || this.keys['E']);
    let rollInput = 0;
    if (rollLeft) rollInput -= 1.0;
    if (rollRight) rollInput += 1.0;

    if (rollInput !== 0) {
      this.bankRoll += rollInput * 2.8 * dt;
    }

    // Dynamic aerodynamic bank tilt into turns (A / D)
    const targetTurnBank = -yawInput * 0.45;
    this.turnBankAngle = THREE.MathUtils.lerp(this.turnBankAngle, targetTurnBank, dt * 6.5);

    // Track whether any flight input is active (for camera auto-recentering)
    const hasFlightInput = Boolean(
      isWPressed ||
      this.keys['KeyS'] || this.keys['s'] ||
      this.keys['KeyX'] || this.keys['x'] ||
      this.keys['KeyA'] || this.keys['a'] ||
      this.keys['KeyD'] || this.keys['d'] ||
      this.keys['ArrowLeft'] || this.keys['ArrowRight'] ||
      this.keys['ArrowUp'] || this.keys['ArrowDown'] ||
      rollLeft || rollRight ||
      shiftPressed,
    );
    this.isFlightInputActive = hasFlightInput;
  }

  /**
   * Updates thruster flame scales, reactor core pulse, and the 3D Warp Field System
   */
  private updateEngineVisuals(dt: number) {
    const isForward = this.currentSpeed > 5;
    const speedRatio = Math.max(0.05, Math.abs(this.currentSpeed) / this.maxCruiseSpeed);
    // Even at idle, maintain a glowing flame scale with soft breathing pulse so the craft always looks alive!
    const idlePulse = Math.sin(performance.now() * 0.007) * 0.08;
    const speedScale = this.isBoosting ? 4.2 : isForward ? 0.65 + speedRatio * 1.35 : 0.38 + idlePulse;

    // 1. Quantum Arc Reactor pulsing glow
    if (this.reactorCore) {
      const pulse = 1.0 + Math.sin(performance.now() * 0.008) * 0.12;
      this.reactorCore.scale.set(pulse, pulse, pulse);
    }

    // 2. Dual Fusion Engine Exhaust Flames (Always visible & glowing!)
    for (const fc of this.flameCores) {
      fc.visible = true;
      fc.scale.set(1 + speedScale * 0.18, 1 + speedScale * 0.18, speedScale);
    }
    for (const fo of this.flameOuters) {
      fo.visible = true;
      fo.scale.set(1 + speedScale * 0.25, 1 + speedScale * 0.25, speedScale * 1.15);
    }
    for (const sd of this.shockDiamonds) {
      sd.visible = isForward || this.isBoosting;
      const dScale = 0.85 + Math.sin(performance.now() * 0.015) * 0.25;
      sd.scale.set(dScale, dScale, dScale);
    }

    // Dynamic engine point lights with realistic micro-jitter
    const flicker = 0.88 + Math.random() * 0.24;
    const intensity = (this.isBoosting ? 14 : isForward ? 6.5 : 3.5) * flicker;
    this.engineLightL.intensity = intensity;
    this.engineLightR.intensity = intensity;

    // 3. 3D Hyperspace Warp Field Animation (Streaming Star Streaks only, no spiderweb lattice)
    if (this.isBoosting) {
      this.warpFieldGroup.visible = true;
      this.warpFieldGroup.position.copy(this.position);
      this.warpFieldGroup.quaternion.copy(this.quaternion);

      // Animate 2,000 Relativistic Star Streaks rushing past camera
      const count = this.streakVelocities.length;
      for (let i = 0; i < count; i++) {
        const moveDist = this.streakVelocities[i] * dt;
        this.streakPositions[i * 6 + 2] += moveDist;
        this.streakPositions[i * 6 + 5] += moveDist;

        // When passing behind the craft and camera, respawn far ahead
        if (this.streakPositions[i * 6 + 2] > 450) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 24 + Math.random() * 450;
          const sx = Math.cos(angle) * radius;
          const sy = Math.sin(angle) * radius;
          const sz = -2200 - Math.random() * 800;
          const length = 140 + Math.random() * 320;

          this.streakPositions[i * 6] = sx;
          this.streakPositions[i * 6 + 1] = sy;
          this.streakPositions[i * 6 + 2] = sz;

          this.streakPositions[i * 6 + 3] = sx;
          this.streakPositions[i * 6 + 4] = sy;
          this.streakPositions[i * 6 + 5] = sz + length;
        }
      }
      this.warpStreaks.geometry.attributes.position.needsUpdate = true;
    } else {
      this.warpFieldGroup.visible = false;
    }
  }

  /**
   * Computes the ideal camera position when following the Valkyrie-X Quad-Wing Starfighter.
   * In warp: camera aligns directly along the thrust axis with 0 elevation so the ship is centered at the warp point.
   * In cruise: elevated for a commanding third-person aerospace perspective.
   */
  public getIdealCameraPosition(): THREE.Vector3 {
    const orbitDist = this.isBoosting ? 75 : 76;
    const chaseHeight = this.isBoosting ? 0 : 18;

    const behindShip = this.forward.clone().negate().normalize();
    const yawQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      this.isBoosting ? 0 : this.camLookYaw,
    );
    const yawedDir = behindShip.applyQuaternion(yawQ);
    const worldUp = new THREE.Vector3(0, 1, 0);
    let camRight = new THREE.Vector3().crossVectors(worldUp, yawedDir).normalize();
    if (camRight.lengthSq() < 0.001) camRight.copy(this.right);
    const pitchQ = new THREE.Quaternion().setFromAxisAngle(
      camRight,
      this.isBoosting ? 0 : this.camLookPitch,
    );
    const orbitalDir = yawedDir.applyQuaternion(pitchQ);

    return this.position
      .clone()
      .addScaledVector(orbitalDir, orbitDist)
      .addScaledVector(worldUp, chaseHeight * Math.cos(this.isBoosting ? 0 : this.camLookPitch));
  }

  /**
   * Orbit camera — craft stays at the center of the screen.
   * In warp speed (up to 10,000 km/s), zero camera lag ensures the ship is 100% locked at the exact warp center!
   */
  private updateCamera(dt: number) {
    const targetCamPos = this.getIdealCameraPosition();

    // Look-at target:
    // When boosting: look directly forward through the ship's center with zero vertical offset
    // so the craft is framed EXACTLY at the center of the screen (matching the warp vanishing point)!
    const lookAhead = this.isBoosting ? 60.0 : 8.0;
    const lookUp = this.isBoosting ? 0 : 1.4;

    const desiredTarget = this.position
      .clone()
      .addScaledVector(this.forward, lookAhead)
      .addScaledVector(this.up, lookUp);

    if (this.isBoosting) {
      // Hyperdrive Warp Speed: zero lag locks camera to ship position so it never drifts
      this.chaseCamPos.copy(targetCamPos);
      this.chaseTargetPos.copy(desiredTarget);
      this.camLookYaw = 0;
      this.camLookPitch = 0;
    } else {
      this.chaseTargetPos.lerp(desiredTarget, Math.min(1, dt * 14));
      const lerpSpeed = Math.min(1.0, dt * 8.5);
      this.chaseCamPos.lerp(targetCamPos, lerpSpeed);
    }

    this.camera.position.copy(this.chaseCamPos);
    this.camera.lookAt(this.chaseTargetPos);

    // Dynamic FOV widening during hyperdrive warp speed (dramatic relativistic stretch!)
    const targetFOV = this.isBoosting ? 88 : 50;
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFOV, dt * 4.5);
    this.camera.updateProjectionMatrix();
  }

  /**
   * Apply mouse drag delta — UNLIMITED orbit around rocket with no angle clamping.
   * The offset persists when idle; only recenters when flight controls are pressed.
   */
  public applyMouseLook(dx: number, dy: number, sensitivity = 0.004) {
    // Unlimited yaw rotation — full continuous 360° orbit with no walls/clamping
    this.camLookYaw -= dx * sensitivity;
    // Wrap yaw to [-PI, PI] for numeric stability
    if (this.camLookYaw > Math.PI) this.camLookYaw -= Math.PI * 2;
    if (this.camLookYaw < -Math.PI) this.camLookYaw += Math.PI * 2;

    // Pitch look: orbit above and below rocket (clamped to prevent gimbal flipping)
    this.camLookPitch -= dy * sensitivity;
    this.camLookPitch = THREE.MathUtils.clamp(this.camLookPitch, -1.35, 1.35);
  }

  /**
   * Smoothly recenter camera look-around toward ship center.
   * Called when flight inputs are active.
   */
  public recenterMouseLook(dt: number) {
    const speed = dt * 5.0;
    this.camLookYaw = THREE.MathUtils.lerp(this.camLookYaw, 0, speed);
    this.camLookPitch = THREE.MathUtils.lerp(this.camLookPitch, 0, speed);
  }

  /**
   * Pauses flight speed (holds position) when inspecting a space object
   */
  public pauseFlight() {
    this.targetSpeed = 0;
    this.currentSpeed = 0;
    this.velocity.set(0, 0, 0);
    this.isBoosting = false;
    this.audio.stopAll();
  }

  /**
   * Toggle Audio Sound FX mute
   */
  public toggleMute(): boolean {
    this.audio.isMuted = !this.audio.isMuted;
    if (this.audio.isMuted) {
      this.audio.stopAll();
    }
    return this.audio.isMuted;
  }

  /**
   * Binds keyboard events. Prevents default on arrows/space to avoid browser scroll.
   */
  private bindControls() {
    window.addEventListener('keydown', (e) => {
      if (!this.isActive) return;
      this.keys[e.code] = true;
      if (e.key) {
        this.keys[e.key] = true;
        this.keys[e.key.toLowerCase()] = true;
        this.keys[e.key.toUpperCase()] = true;
      }

      // Prevent browser scroll for arrow keys and spacebar
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      // Mute toggle: M
      if (e.code === 'KeyM' || e.key === 'm' || e.key === 'M') {
        this.toggleMute();
      }
      // Exit flight mode: Escape
      if (e.code === 'Escape') {
        if (this.onExitRequested) {
          this.onExitRequested();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (!this.isActive) return;
      this.keys[e.code] = false;
      if (e.key) {
        this.keys[e.key] = false;
        this.keys[e.key.toLowerCase()] = false;
        this.keys[e.key.toUpperCase()] = false;
      }
    });
  }

  /**
   * Cleanup all resources and audio
   */
  public dispose() {
    this.stop();
    this.audio.dispose();
    this.scene.remove(this.rocketGroup);
    this.scene.remove(this.warpFieldGroup);
  }
}
