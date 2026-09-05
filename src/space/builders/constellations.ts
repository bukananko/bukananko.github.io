import * as THREE from 'three';

export interface ConstellationDef {
  name: string;
  theta: number; // Azimuth around celestial sphere [0, 2*PI]
  phi: number; // Elevation [-PI/2, PI/2] (North +, South -)
  scale?: number;
  stars: Array<{
    u: number;
    v: number;
    color?: number;
    size?: number;
    hasFlare?: boolean; // Brilliant Alpha supergiant star with large starlight cross-diffraction flare!
  }>;
  lines: Array<[number, number]>;
}

// Exactly 24 iconic, authentic constellations arranged in a non-overlapping spherical grid (ZERO collisions)
export const CONSTELLATIONS: ConstellationDef[] = [
  // ==========================================
  // RING 1: High Northern Sky (Elevation +50° to +75°)
  // ==========================================

  // 1. Ursa Major (Biduk / Big Dipper)
  {
    name: 'Ursa Major',
    theta: 0.6,
    phi: 0.88,
    scale: 0.95,
    stars: [
      { u: 0.08, v: 0.1, color: 0xffffff, size: 1.5, hasFlare: true }, // 0: Dubhe (Alpha)
      { u: 0.08, v: -0.05, color: 0xe0f2fe, size: 1.2 }, // 1: Merak
      { u: -0.05, v: -0.06, color: 0xe0f2fe, size: 1.2 }, // 2: Phecda
      { u: -0.05, v: 0.07, color: 0xe0f2fe, size: 1.1 }, // 3: Megrez
      { u: -0.14, v: 0.12, color: 0xffffff, size: 1.3 }, // 4: Alioth
      { u: -0.22, v: 0.18, color: 0xa5f3fc, size: 1.4, hasFlare: true }, // 5: Mizar
      { u: -0.3, v: 0.22, color: 0x38bdf8, size: 1.3 }, // 6: Alkaid
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Bowl
      [3, 4],
      [4, 5],
      [5, 6], // Handle
    ],
  },

  // 2. Ursa Minor (Little Dipper & Polaris)
  {
    name: 'Ursa Minor',
    theta: 1.6,
    phi: 1.25,
    scale: 0.9,
    stars: [
      { u: -0.16, v: 0.16, color: 0xffffff, size: 1.8, hasFlare: true }, // 0: Polaris (North Star Beacon)
      { u: -0.1, v: 0.1, color: 0xe0f2fe, size: 1.0 }, // 1: Yildun
      { u: -0.05, v: 0.06, color: 0xe0f2fe, size: 1.0 }, // 2: Urodelus
      { u: -0.01, v: 0.02, color: 0xe0f2fe, size: 1.0 }, // 3: Anwar
      { u: 0.06, v: 0.04, color: 0xe0f2fe, size: 1.1 }, // 4: Pherkad
      { u: 0.07, v: -0.04, color: 0xfef08a, size: 1.3 }, // 5: Kochab
      { u: 0.01, v: -0.05, color: 0xe0f2fe, size: 1.0 }, // 6: Ahfa
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3],
    ],
  },

  // 3. Cassiopeia (The Queen 'W')
  {
    name: 'Cassiopeia',
    theta: 2.7,
    phi: 1.02,
    scale: 0.95,
    stars: [
      { u: -0.16, v: 0.07, color: 0xffffff, size: 1.3 }, // 0: Caph
      { u: -0.08, v: -0.05, color: 0xfef08a, size: 1.5, hasFlare: true }, // 1: Schedar (Alpha)
      { u: 0.0, v: 0.05, color: 0x38bdf8, size: 1.5, hasFlare: true }, // 2: Navi
      { u: 0.09, v: -0.04, color: 0xe0f2fe, size: 1.2 }, // 3: Ruchbah
      { u: 0.18, v: 0.08, color: 0xe0f2fe, size: 1.1 }, // 4: Segin
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },

  // 4. Cygnus (The Northern Cross & Deneb)
  {
    name: 'Cygnus',
    theta: 3.9,
    phi: 0.82,
    scale: 1.05,
    stars: [
      { u: 0.0, v: 0.18, color: 0xffffff, size: 1.8, hasFlare: true }, // 0: Deneb (Brilliant Alpha Cross Top)
      { u: 0.0, v: 0.03, color: 0xe0f2fe, size: 1.3 }, // 1: Sadr (Center)
      { u: 0.01, v: -0.18, color: 0xfde047, size: 1.3 }, // 2: Albireo (Golden Double)
      { u: -0.16, v: 0.02, color: 0xe0f2fe, size: 1.2 }, // 3: Gienah (West Wing)
      { u: 0.16, v: 0.05, color: 0x38bdf8, size: 1.2 }, // 4: Fawaris (East Wing)
    ],
    lines: [
      [0, 1],
      [1, 2], // Spine
      [3, 1],
      [1, 4], // Wings
    ],
  },

  // 5. Draco (The Northern Celestial Dragon)
  {
    name: 'Draco',
    theta: 5.2,
    phi: 1.05,
    scale: 0.95,
    stars: [
      { u: 0.12, v: 0.1, color: 0xfef08a, size: 1.4 }, // 0: Eltanin (Head)
      { u: 0.14, v: 0.04, color: 0xe0f2fe, size: 1.2 }, // 1: Rastaban
      { u: 0.08, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 2: Kuma
      { u: 0.06, v: 0.08, color: 0xe0f2fe, size: 1.1 }, // 3: Grumium
      { u: -0.04, v: -0.02, color: 0x38bdf8, size: 1.2 }, // 4: Thuban (Ancient North Pole)
      { u: -0.14, v: -0.08, color: 0xe0f2fe, size: 1.1 }, // 5: Edasich
      { u: -0.22, v: -0.14, color: 0xe0f2fe, size: 1.0 }, // 6: Giausar
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Head Diamond
      [2, 4],
      [4, 5],
      [5, 6], // Dragon Tail Arc
    ],
  },

  // ==========================================
  // RING 2: Mid-Northern Sky (Elevation +15° to +40°)
  // ==========================================

  // 6. Taurus (The Bull & Aldebaran)
  {
    name: 'Taurus',
    theta: 0.3,
    phi: 0.32,
    scale: 1.05,
    stars: [
      { u: -0.06, v: -0.06, color: 0xf97316, size: 1.8, hasFlare: true }, // 0: Aldebaran (Fiery Orange Eye)
      { u: 0.14, v: 0.16, color: 0x38bdf8, size: 1.3 }, // 1: Elnath (North Horn)
      { u: 0.16, v: -0.02, color: 0xe0f2fe, size: 1.2 }, // 2: Tianguan (South Horn)
      { u: -0.02, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 3: Ain
      { u: -0.1, v: -0.02, color: 0xe0f2fe, size: 1.1 }, // 4: Hyadum
    ],
    lines: [
      [0, 4],
      [4, 3],
      [3, 0], // Hyades V
      [3, 1], // Horn North
      [0, 2], // Horn South
    ],
  },

  // 7. Auriga & Perseus (Capella Beacon)
  {
    name: 'Auriga & Perseus',
    theta: 1.1,
    phi: 0.68,
    scale: 1.0,
    stars: [
      { u: -0.12, v: 0.12, color: 0xfef08a, size: 1.8, hasFlare: true }, // 0: Capella (Golden Beacon)
      { u: -0.08, v: 0.2, color: 0xe0f2fe, size: 1.2 }, // 1: Menkalinan
      { u: -0.2, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 2: Mahasim
      { u: -0.15, v: -0.08, color: 0xe0f2fe, size: 1.1 }, // 3: Hassaleh
      { u: 0.08, v: 0.04, color: 0xffffff, size: 1.4, hasFlare: true }, // 4: Mirfak (Perseus Alpha)
      { u: 0.16, v: -0.06, color: 0x38bdf8, size: 1.3 }, // 5: Algol (Demon Star)
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Auriga Quad
      [0, 4],
      [4, 5], // Perseus Arm
    ],
  },

  // 8. Gemini (The Twins - Castor & Pollux)
  {
    name: 'Gemini',
    theta: 2.0,
    phi: 0.45,
    scale: 0.95,
    stars: [
      { u: -0.07, v: 0.16, color: 0xffffff, size: 1.5, hasFlare: true }, // 0: Castor
      { u: 0.06, v: 0.15, color: 0xfbbf24, size: 1.6, hasFlare: true }, // 1: Pollux (Warm Orange Giant)
      { u: -0.1, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 2: Mebsuta
      { u: 0.03, v: 0.01, color: 0xe0f2fe, size: 1.1 }, // 3: Wasat
      { u: -0.13, v: -0.12, color: 0xe0f2fe, size: 1.2 }, // 4: Tejat
      { u: 0.0, v: -0.14, color: 0x38bdf8, size: 1.3 }, // 5: Alhena
    ],
    lines: [
      [0, 1], // Twin Heads
      [0, 2],
      [2, 4], // Castor Body
      [1, 3],
      [3, 5], // Pollux Body
      [2, 3], // Bridge
    ],
  },

  // 9. Boötes (The Herdsman / Kite & Arcturus)
  {
    name: 'Boötes',
    theta: 2.8,
    phi: 0.55,
    scale: 1.05,
    stars: [
      { u: 0.0, v: -0.2, color: 0xfbbf24, size: 1.9, hasFlare: true }, // 0: Arcturus (Radiant Golden Giant)
      { u: -0.1, v: -0.07, color: 0xe0f2fe, size: 1.1 }, // 1: Muphrid
      { u: 0.1, v: -0.04, color: 0xe0f2fe, size: 1.2 }, // 2: Izar
      { u: 0.06, v: 0.12, color: 0xe0f2fe, size: 1.1 }, // 3: Delta
      { u: -0.01, v: 0.2, color: 0xe0f2fe, size: 1.2 }, // 4: Nekkar
      { u: -0.08, v: 0.11, color: 0xe0f2fe, size: 1.1 }, // 5: Seginus
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0], // Kite
    ],
  },

  // 10. Hercules (The Keystone Hero)
  {
    name: 'Hercules',
    theta: 3.6,
    phi: 0.62,
    scale: 0.95,
    stars: [
      { u: -0.07, v: 0.07, color: 0xe0f2fe, size: 1.2 }, // 0: Pi
      { u: 0.07, v: 0.08, color: 0xe0f2fe, size: 1.2 }, // 1: Epsilon
      { u: 0.08, v: -0.06, color: 0x38bdf8, size: 1.3 }, // 2: Zeta
      { u: -0.06, v: -0.07, color: 0xffffff, size: 1.3 }, // 3: Eta
      { u: 0.14, v: -0.18, color: 0xf43f5e, size: 1.4 }, // 4: Rasalgethi
      { u: -0.15, v: -0.16, color: 0xe0f2fe, size: 1.2 }, // 5: Kornephoros
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Keystone
      [2, 4],
      [4, 5],
      [3, 5], // Legs
    ],
  },

  // 11. Lyra (The Harp & Vega)
  {
    name: 'Lyra',
    theta: 4.4,
    phi: 0.68,
    scale: 0.9,
    stars: [
      { u: 0.0, v: 0.14, color: 0x38bdf8, size: 1.9, hasFlare: true }, // 0: Vega (Sapphire Jewel)
      { u: -0.05, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 1: Zeta
      { u: 0.05, v: 0.03, color: 0xe0f2fe, size: 1.1 }, // 2: Epsilon
      { u: -0.04, v: -0.1, color: 0xe0f2fe, size: 1.2 }, // 3: Sheliak
      { u: 0.04, v: -0.09, color: 0xe0f2fe, size: 1.2 }, // 4: Sulafat
    ],
    lines: [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 3],
      [3, 4],
      [4, 2],
    ],
  },

  // 12. Pegasus & Andromeda (Great Square & Chain)
  {
    name: 'Pegasus & Andromeda',
    theta: 5.4,
    phi: 0.45,
    scale: 1.0,
    stars: [
      { u: -0.12, v: -0.12, color: 0xe0f2fe, size: 1.3 }, // 0: Markab
      { u: -0.11, v: 0.12, color: 0xfef08a, size: 1.3 }, // 1: Scheat
      { u: 0.12, v: 0.13, color: 0x38bdf8, size: 1.5, hasFlare: true }, // 2: Alpheratz
      { u: 0.13, v: -0.11, color: 0xffffff, size: 1.2 }, // 3: Algenib
      { u: 0.24, v: 0.22, color: 0xfef08a, size: 1.3 }, // 4: Mirach (Andromeda)
      { u: 0.34, v: 0.3, color: 0xf59e0b, size: 1.4 }, // 5: Almach
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0], // Great Square
      [2, 4],
      [4, 5], // Andromeda Chain
    ],
  },

  // ==========================================
  // RING 3: Mid-Southern Sky (Elevation -10° to -35°)
  // ==========================================

  // 13. Cetus (The Sea Monster)
  {
    name: 'Cetus',
    theta: 0.4,
    phi: -0.22,
    scale: 1.0,
    stars: [
      { u: 0.14, v: 0.12, color: 0xf97316, size: 1.4 }, // 0: Menkar (Jaw)
      { u: 0.08, v: 0.16, color: 0xe0f2fe, size: 1.1 }, // 1: Kaffaljidhma
      { u: 0.02, v: 0.08, color: 0xe0f2fe, size: 1.1 }, // 2: Mira (Red Variable Star)
      { u: -0.08, v: 0.02, color: 0xe0f2fe, size: 1.1 }, // 3: Baten Kaitos
      { u: -0.18, v: -0.06, color: 0xfef08a, size: 1.5, hasFlare: true }, // 4: Diphda (Alpha Cetus Flare)
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0], // Head
      [2, 3],
      [3, 4], // Spine to Tail
    ],
  },

  // 14. Orion (Waluku / The Hunter - King of Constellations)
  {
    name: 'Orion',
    theta: 1.4,
    phi: 0.02,
    scale: 1.15,
    stars: [
      { u: -0.11, v: 0.16, color: 0xf87171, size: 1.9, hasFlare: true }, // 0: Betelgeuse (Red Supergiant Flare)
      { u: 0.11, v: 0.14, color: 0x38bdf8, size: 1.4 }, // 1: Bellatrix
      { u: -0.05, v: 0.01, color: 0x38bdf8, size: 1.3 }, // 2: Alnitak (Belt)
      { u: 0.0, v: 0.0, color: 0xffffff, size: 1.4, hasFlare: true }, // 3: Alnilam (Belt Center)
      { u: 0.05, v: -0.01, color: 0x38bdf8, size: 1.3 }, // 4: Mintaka (Belt)
      { u: -0.1, v: -0.16, color: 0xe0f2fe, size: 1.2 }, // 5: Saiph
      { u: 0.11, v: -0.17, color: 0x38bdf8, size: 1.9, hasFlare: true }, // 6: Rigel (Blue Diamond Flare)
      { u: 0.0, v: 0.22, color: 0xe0f2fe, size: 1.1 }, // 7: Meissa (Head)
    ],
    lines: [
      [0, 7],
      [7, 1], // Head
      [0, 2],
      [1, 4], // Shoulders to Belt
      [2, 3],
      [3, 4], // Orion's Belt
      [2, 5],
      [4, 6], // Belt to Feet
      [5, 6], // Base
    ],
  },

  // 15. Canis Major (Sirius - Brightest Star in the Night Sky)
  {
    name: 'Canis Major',
    theta: 2.1,
    phi: -0.38,
    scale: 1.05,
    stars: [
      { u: 0.0, v: 0.14, color: 0x00f0ff, size: 2.2, hasFlare: true }, // 0: Sirius (Dazzling Rainbow Starlight Flare)
      { u: -0.1, v: 0.1, color: 0xe0f2fe, size: 1.2 }, // 1: Mirzam
      { u: 0.02, v: -0.05, color: 0xfef08a, size: 1.3 }, // 2: Wezen
      { u: -0.07, v: -0.12, color: 0x38bdf8, size: 1.3 }, // 3: Adhara
      { u: 0.09, v: -0.15, color: 0x38bdf8, size: 1.2 }, // 4: Aludra
    ],
    lines: [
      [0, 1],
      [0, 2],
      [2, 3],
      [2, 4],
    ],
  },

  // 16. Leo (The Lion / Singa)
  {
    name: 'Leo',
    theta: 2.9,
    phi: 0.18,
    scale: 1.1,
    stars: [
      { u: 0.1, v: -0.1, color: 0x38bdf8, size: 1.8, hasFlare: true }, // 0: Regulus (Heart of the Lion Flare)
      { u: 0.12, v: 0.04, color: 0xfbbf24, size: 1.4 }, // 1: Algieba
      { u: 0.09, v: 0.12, color: 0xe0f2fe, size: 1.2 }, // 2: Adhafera
      { u: 0.02, v: 0.15, color: 0xe0f2fe, size: 1.1 }, // 3: Rasalas
      { u: -0.07, v: 0.07, color: 0xe0f2fe, size: 1.2 }, // 4: Zosma
      { u: -0.06, v: -0.05, color: 0xe0f2fe, size: 1.2 }, // 5: Chertan
      { u: -0.19, v: 0.01, color: 0x38bdf8, size: 1.4, hasFlare: true }, // 6: Denebola
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3], // Sickle
      [1, 4],
      [4, 6],
      [6, 5],
      [5, 0], // Body & Triangle
    ],
  },

  // 17. Virgo (The Maiden & Spica)
  {
    name: 'Virgo',
    theta: 3.7,
    phi: -0.15,
    scale: 1.05,
    stars: [
      { u: 0.0, v: -0.16, color: 0x38bdf8, size: 1.9, hasFlare: true }, // 0: Spica (Pearl Sapphire Flare)
      { u: 0.07, v: 0.05, color: 0xfef08a, size: 1.3 }, // 1: Porrima
      { u: 0.16, v: 0.14, color: 0xfef08a, size: 1.2 }, // 2: Vindemiatrix
      { u: 0.12, v: -0.04, color: 0xe0f2fe, size: 1.1 }, // 3: Zaniah
      { u: -0.07, v: -0.03, color: 0xe0f2fe, size: 1.2 }, // 4: Heze
    ],
    lines: [
      [0, 4],
      [4, 1],
      [1, 2],
      [1, 3],
      [3, 0],
    ],
  },

  // 18. Scorpius (The Scorpion & Antares)
  {
    name: 'Scorpius',
    theta: 4.5,
    phi: -0.42,
    scale: 1.15,
    stars: [
      { u: 0.07, v: 0.1, color: 0xef4444, size: 2.0, hasFlare: true }, // 0: Antares (Ruby Heart Flare)
      { u: 0.15, v: 0.18, color: 0xe0f2fe, size: 1.2 }, // 1: Graffias
      { u: 0.14, v: 0.12, color: 0x38bdf8, size: 1.3 }, // 2: Dschubba
      { u: 0.02, v: -0.02, color: 0xe0f2fe, size: 1.2 }, // 3: Epsilon
      { u: -0.05, v: -0.12, color: 0xfef08a, size: 1.3 }, // 4: Sargas
      { u: -0.18, v: -0.06, color: 0x38bdf8, size: 1.5, hasFlare: true }, // 5: Shaula (Stinger)
    ],
    lines: [
      [1, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [4, 5], // Curved Hook
    ],
  },

  // 19. Aquila & Sagittarius (Altair & The Teapot)
  {
    name: 'Aquila & Sagittarius',
    theta: 5.3,
    phi: -0.28,
    scale: 1.05,
    stars: [
      { u: 0.0, v: 0.15, color: 0xffffff, size: 1.8, hasFlare: true }, // 0: Altair (Eagle Eye Flare)
      { u: -0.04, v: 0.22, color: 0xfbbf24, size: 1.2 }, // 1: Tarazed
      { u: 0.03, v: 0.09, color: 0xe0f2fe, size: 1.1 }, // 2: Alshain
      { u: -0.04, v: -0.12, color: 0x38bdf8, size: 1.4 }, // 3: Kaus Australis (Teapot)
      { u: -0.06, v: -0.02, color: 0xe0f2fe, size: 1.2 }, // 4: Kaus Media
      { u: 0.08, v: 0.04, color: 0x38bdf8, size: 1.3 }, // 5: Nunki
      { u: 0.07, v: -0.08, color: 0xe0f2fe, size: 1.2 }, // 6: Ascella
    ],
    lines: [
      [1, 0],
      [0, 2], // Shaft of Altair
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3], // Teapot Square
    ],
  },

  // ==========================================
  // RING 4: Deep Southern Sky (Elevation -45° to -70°)
  // ==========================================

  // 20. Phoenix (The Firebird & Ankaa)
  {
    name: 'Phoenix',
    theta: 0.5,
    phi: -0.75,
    scale: 1.0,
    stars: [
      { u: 0.0, v: 0.12, color: 0xf97316, size: 1.6, hasFlare: true }, // 0: Ankaa (Amber Star Flare)
      { u: -0.1, v: -0.05, color: 0xe0f2fe, size: 1.1 }, // 1: Beta
      { u: 0.09, v: -0.07, color: 0xe0f2fe, size: 1.1 }, // 2: Gamma
      { u: 0.01, v: -0.15, color: 0xe0f2fe, size: 1.1 }, // 3: Delta
    ],
    lines: [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0], // Kite Diamond
    ],
  },

  // 21. Eridanus (The Celestial River & Achernar)
  {
    name: 'Eridanus',
    theta: 1.6,
    phi: -0.78,
    scale: 1.1,
    stars: [
      { u: -0.2, v: -0.22, color: 0x38bdf8, size: 1.8, hasFlare: true }, // 0: Achernar (Terminal Sapphire Flare)
      { u: 0.18, v: 0.18, color: 0xe0f2fe, size: 1.2 }, // 1: Cursa
      { u: 0.12, v: 0.08, color: 0xfef08a, size: 1.1 }, // 2: Zaurak
      { u: 0.02, v: 0.01, color: 0xe0f2fe, size: 1.1 }, // 3: Rana
      { u: -0.08, v: -0.1, color: 0xe0f2fe, size: 1.2 }, // 4: Acamar
    ],
    lines: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0], // Serpentine River
    ],
  },

  // 22. Carina & Vela (Canopus & Ship's Keel)
  {
    name: 'Carina & Vela',
    theta: 2.8,
    phi: -0.98,
    scale: 1.15,
    stars: [
      { u: -0.14, v: 0.14, color: 0xffffff, size: 2.1, hasFlare: true }, // 0: Canopus (2nd Brightest Star in the Sky Flare)
      { u: 0.1, v: -0.12, color: 0x38bdf8, size: 1.5, hasFlare: true }, // 1: Miaplacidus
      { u: 0.03, v: 0.06, color: 0xfbbf24, size: 1.3 }, // 2: Avior
      { u: -0.02, v: -0.06, color: 0xe0f2fe, size: 1.2 }, // 3: Aspidiske
      { u: 0.15, v: 0.15, color: 0xe0f2fe, size: 1.2 }, // 4: Alsephina
    ],
    lines: [
      [0, 2],
      [2, 4],
      [0, 3],
      [3, 1],
      [1, 4],
    ],
  },

  // 23. Crux (The Southern Cross / Salib Selatan)
  {
    name: 'Crux',
    theta: 3.9,
    phi: -1.08,
    scale: 0.95,
    stars: [
      { u: 0.0, v: -0.12, color: 0x38bdf8, size: 1.8, hasFlare: true }, // 0: Acrux (Alpha Crucis Flare)
      { u: 0.0, v: 0.12, color: 0xf87171, size: 1.5, hasFlare: true }, // 1: Gacrux (Ruby Giant)
      { u: -0.09, v: 0.02, color: 0x38bdf8, size: 1.5, hasFlare: true }, // 2: Mimosa
      { u: 0.09, v: 0.03, color: 0xe0f2fe, size: 1.3 }, // 3: Imai
      { u: 0.03, v: -0.03, color: 0xfef08a, size: 1.0 }, // 4: Ginan
    ],
    lines: [
      [0, 1], // Long cross axis
      [2, 3], // Transverse axis
    ],
  },

  // 24. Centaurus (Alpha Centauri & Hadar Pointers)
  {
    name: 'Centaurus',
    theta: 5.1,
    phi: -0.85,
    scale: 1.1,
    stars: [
      { u: -0.12, v: -0.08, color: 0xfef08a, size: 1.9, hasFlare: true }, // 0: Rigil Kentaurus (Alpha Centauri Flare)
      { u: -0.05, v: -0.05, color: 0x38bdf8, size: 1.6, hasFlare: true }, // 1: Hadar (Beta Centauri)
      { u: 0.05, v: 0.1, color: 0xe0f2fe, size: 1.2 }, // 2: Menkent
      { u: 0.12, v: -0.02, color: 0xe0f2fe, size: 1.2 }, // 3: Muhlifain
    ],
    lines: [
      [0, 1], // Pointers to Southern Cross
      [1, 2],
      [2, 3],
    ],
  },
];

export interface ConstellationSystem {
  linesMesh: THREE.LineSegments;
  starsPoints: THREE.Points;
  flaresGroup: THREE.Group;
  update: (simulationTime: number) => void;
  dispose: () => void;
}

/**
 * Creates an ultra-radiant, luminous starlight texture with blooming glowing halo and sparkling 4-point glint.
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
 * Creates 4-point cross diffraction flare for landmark alpha stars.
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

  // Core glow
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
 * Builds the rich, luminous, non-overlapping 3D celestial constellation network.
 * Features 24 authentic constellations, bright shining stars, and big alpha flares!
 */
export function buildConstellationSystem(
  _starlightTexture: THREE.Texture,
  celestialRadius: number = 3850,
): ConstellationSystem {
  const linePositions: number[] = [];
  const starPositions: number[] = [];
  const starColors: number[] = [];

  const starTexture = createLuminousStarTexture();
  const flareTexture = createBigFlareTexture();
  const flaresGroup = new THREE.Group();
  const flareSprites: Array<{ sprite: THREE.Sprite; baseOpacity: number; phase: number }> = [];

  const defaultStarColor = new THREE.Color(0xdbeafe);

  for (const c of CONSTELLATIONS) {
    const cosPhi = Math.cos(c.phi);
    const sinPhi = Math.sin(c.phi);
    const cosTheta = Math.cos(c.theta);
    const sinTheta = Math.sin(c.theta);

    // Center direction unit vector on celestial sphere
    const cx = cosPhi * sinTheta;
    const cy = sinPhi;
    const cz = cosPhi * cosTheta;

    // Orthogonal local tangent vectors U (horizontal) and V (vertical)
    const ux = cosTheta;
    const uy = 0;
    const uz = -sinTheta;

    const vx = -sinPhi * sinTheta;
    const vy = cosPhi;
    const vz = -sinPhi * cosTheta;

    const scale = c.scale ?? 1.0;
    const star3DPoints: THREE.Vector3[] = [];

    for (let i = 0; i < c.stars.length; i++) {
      const s = c.stars[i];
      const uAngle = s.u * scale;
      const vAngle = s.v * scale;

      // Project onto sphere
      let dx = cx + uAngle * ux + vAngle * vx;
      let dy = cy + uAngle * uy + vAngle * vy;
      let dz = cz + uAngle * uz + vAngle * vz;
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      dx /= len;
      dy /= len;
      dz /= len;

      const px = dx * celestialRadius;
      const py = dy * celestialRadius;
      const pz = dz * celestialRadius;

      const pt = new THREE.Vector3(px, py, pz);
      star3DPoints.push(pt);

      starPositions.push(px, py, pz);

      const col = s.color !== undefined ? new THREE.Color(s.color) : defaultStarColor;
      starColors.push(col.r, col.g, col.b);

      // Add large radiant diffraction flare for major Alpha stars!
      if (s.hasFlare) {
        const flareMat = new THREE.SpriteMaterial({
          map: flareTexture,
          color: col,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const flareSpr = new THREE.Sprite(flareMat);
        // Position slightly in front of the star point so flare doesn't z-fight
        flareSpr.position.set(dx * (celestialRadius - 30), dy * (celestialRadius - 30), dz * (celestialRadius - 30));
        const flareSize = (s.size ?? 1.2) * 240; // 300 to 520 units wide flare!
        flareSpr.scale.set(flareSize, flareSize, 1);
        flareSpr.renderOrder = 2;
        flaresGroup.add(flareSpr);
        flareSprites.push({
          sprite: flareSpr,
          baseOpacity: 0.95,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // Connect line segments
    for (const [startIdx, endIdx] of c.lines) {
      if (star3DPoints[startIdx] && star3DPoints[endIdx]) {
        const p1 = star3DPoints[startIdx];
        const p2 = star3DPoints[endIdx];
        linePositions.push(p1.x, p1.y, p1.z);
        linePositions.push(p2.x, p2.y, p2.z);
      }
    }
  }

  // 1. Unified LineSegments: CRISP, HIGH-VISIBILITY Starlight Cyan (Solid & Beautiful!)
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x38bdf8, // Electric cyan starlight as in reference image
    transparent: true,
    opacity: 0.78, // High visibility, clear & vivid!
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
  linesMesh.renderOrder = 0;

  // 2. Highly Luminous, Shining Star Points (Size 85.0: Bold, glowing jewel stars!)
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 85.0, // High-impact blooming star points!
    map: starTexture,
    vertexColors: true,
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const starsPoints = new THREE.Points(starGeo, starMat);
  starsPoints.renderOrder = 1;

  // Animation updater for sparkling starlight breathing & scintillation
  const update = (simulationTime: number) => {
    // Subtle line breathing
    const linePulse = 0.74 + Math.sin(simulationTime * 1.5) * 0.08;
    lineMat.opacity = linePulse;

    // Twinkling stars
    const starPulse = 0.94 + Math.sin(simulationTime * 2.2) * 0.06;
    starMat.opacity = starPulse;

    // Scintillation on Alpha star flares
    for (const f of flareSprites) {
      f.sprite.material.opacity = f.baseOpacity * (0.88 + Math.sin(simulationTime * 2.6 + f.phase) * 0.12);
    }
  };

  const dispose = () => {
    lineGeo.dispose();
    lineMat.dispose();
    starGeo.dispose();
    starMat.dispose();
    starTexture.dispose();
    flareTexture.dispose();
    for (const f of flareSprites) {
      f.sprite.material.dispose();
    }
  };

  return {
    linesMesh,
    starsPoints,
    flaresGroup,
    update,
    dispose,
  };
}
