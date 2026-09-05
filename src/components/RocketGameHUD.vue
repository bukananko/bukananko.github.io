<template>
  <div class="rocket-hud-root select-none pointer-events-none">
    <!-- CINEMATIC HYPERDRIVE WARP SPEED OVERLAY -->
    <div v-show="state?.boostActive" class="warp-hyperspace-overlay">
      <!-- High-Performance Relativistic Hyperspace Star-Warp Canvas -->
      <canvas ref="warpCanvasRef" class="warp-canvas"></canvas>

      <!-- Radial Hyperspace Vignette & Cyan Energy Pulse -->
      <div class="warp-radial-vignette"></div>
      <div class="warp-chromatic-ring"></div>

      <!-- Initial Hyperspace Engage Light Burst -->
      <div class="warp-engage-flash" :class="{ 'flash-burst': isFlashing }"></div>
    </div>

    <!-- FOOTER HUD BAR (controls guide & speed at bottom) -->
    <footer class="hud-footer pointer-events-auto">
      <!-- Status + Speed (left) -->
       <!-- <div class="footer-status" :class="{ 'in-warp': state?.boostActive }">
        <span class="status-dot" :class="{ warp: state?.boostActive }"></span>
        <span class="status-label">{{ state?.boostActive ? '⚡ WARP SPEED' : '🚀 CRUISE' }}</span>
        <span class="speed-chip" :class="{ 'speed-warp': state?.boostActive }">
          {{ (state?.speed ?? 0).toLocaleString() }}<span class="unit"> KM/S</span>
        </span>
      </div> -->

      <!-- Flight Controls Guide (center) -->
      <div class="footer-controls">
        <div class="ctrl-item"><kbd>W</kbd><span>Maju</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item"><kbd>S</kbd><span>Mundur</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item"><kbd>A/D</kbd><span>Belok</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item"><kbd>↑/↓</kbd><span>Naik/Turun</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item"><kbd>Q/E</kbd><span>Roll</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item highlight-warp">
          <kbd class="warp-key">SHIFT</kbd><span>Warp</span>
        </div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item"><kbd>X</kbd><span>Stop</span></div>
        <div class="ctrl-divider"></div>
        <div class="ctrl-item drag-hint-item">
          <span class="drag-hint">🖱️ Geser = Lihat Bebas · Klik Objek = Inspeksi</span>
        </div>
      </div>

      <!-- Right actions -->
      <div class="footer-actions">
        <button
          class="footer-btn mute-btn"
          :class="{ muted: state?.isMuted }"
          @click="$emit('toggle-mute')"
          :title="state?.isMuted ? 'Unmute [M]' : 'Mute [M]'">
          {{ state?.isMuted ? '🔇' : '🔊' }}
        </button>

        <button
          class="footer-btn exit-btn"
          @click="$emit('exit')"
          title="Keluar Mode Pesawat (ESC)">
          ✕ <span class="exit-label">KELUAR [ESC]</span>
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { RocketGameState } from '@/space/systems/rocketGame';

const props = defineProps<{
  state: RocketGameState | null;
}>();

defineEmits<{
  (e: 'exit'): void;
  (e: 'toggle-mute'): void;
}>();

const warpCanvasRef = ref<HTMLCanvasElement | null>(null);
const isFlashing = ref(false);

interface WarpStar {
  x: number;
  y: number;
  z: number;
  speed: number;
}

let animId: number | null = null;
let stars: WarpStar[] = [];

// Initialize relativistic 3D projected stars
const initStars = () => {
  stars = [];
  const count = 420;
  for (let i = 0; i < count; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2600,
      y: (Math.random() - 0.5) * 2400,
      z: 20 + Math.random() * 1600,
      speed: 50 + Math.random() * 55,
    });
  }
};

const renderWarp = () => {
  const canvas = warpCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h * 0.5; // Vanishing point aligned with flight perspective
  const fov = Math.min(w, h) * 0.85;

  // Clear canvas completely every frame so the 3D scene & spaceship are 100% visible!
  ctx.clearRect(0, 0, w, h);

  // Relativistic Streaming Star Beams (Passing cleanly around the ship with NO circles)
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    s.z -= s.speed;

    // Respawn when star passes camera plane
    if (s.z <= 12) {
      s.x = (Math.random() - 0.5) * 2600;
      s.y = (Math.random() - 0.5) * 2400;
      s.z = 1400 + Math.random() * 300;
      s.speed = 50 + Math.random() * 55;
      continue;
    }

    // Don't draw streaks in the immediate center where the ship is
    if (Math.hypot(s.x, s.y) < 180) {
      continue;
    }

    // Head of streak (current projected position)
    const kCurr = fov / s.z;
    const hx = cx + s.x * kCurr;
    const hy = cy + s.y * kCurr;

    // Tail of streak (previous projected position)
    const tailZ = s.z + s.speed * 3.2;
    const kTail = fov / tailZ;
    const tx = cx + s.x * kTail;
    const ty = cy + s.y * kTail;

    // Skip if completely off screen
    if (hx < -80 || hx > w + 80 || hy < -80 || hy > h + 80) {
      s.z = 1400 + Math.random() * 200;
      continue;
    }

    // Dynamic proximity luminance
    const depthRatio = Math.max(0, Math.min(1, 1 - s.z / 1500));
    const alpha = Math.min(0.95, 0.2 + depthRatio * 0.75);
    const strokeWidth = Math.max(1.4, depthRatio * 3.4);

    // Relativistic laser streak gradient
    const grad = ctx.createLinearGradient(tx, ty, hx, hy);
    grad.addColorStop(0, 'rgba(2, 132, 199, 0)');
    grad.addColorStop(0.35, `rgba(56, 189, 248, ${alpha * 0.75})`);
    grad.addColorStop(0.8, `rgba(0, 245, 255, ${alpha})`);
    grad.addColorStop(1, `rgba(255, 255, 255, ${Math.min(1, alpha + 0.2)})`);

    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(hx, hy);
    ctx.strokeStyle = grad;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  animId = requestAnimationFrame(renderWarp);
};

const resizeCanvas = () => {
  if (!warpCanvasRef.value) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  warpCanvasRef.value.width = window.innerWidth * dpr;
  warpCanvasRef.value.height = window.innerHeight * dpr;
};

watch(
  () => props.state?.boostActive,
  (isWarping) => {
    if (isWarping) {
      // Trigger subtle explosive hyperspace entry flash
      isFlashing.value = true;
      setTimeout(() => {
        isFlashing.value = false;
      }, 140);

      resizeCanvas();
      initStars();
      if (!animId) {
        animId = requestAnimationFrame(renderWarp);
      }
    } else {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      // Clear canvas cleanly
      if (warpCanvasRef.value) {
        const ctx = warpCanvasRef.value.getContext('2d');
        ctx?.clearRect(0, 0, warpCanvasRef.value.width, warpCanvasRef.value.height);
      }
    }
  },
);

onMounted(() => {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  initStars();
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (animId) cancelAnimationFrame(animId);
});
</script>

<style scoped>
.rocket-hud-root {
  position: absolute;
  inset: 0;
  z-index: 150;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  overflow: hidden;
  font-family:
    'Space Grotesk',
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  color: #e2e8f0;
  pointer-events: none;
}

/* =========================================================
   CINEMATIC HYPERDRIVE WARP SPEED OVERLAY
   ========================================================= */
.warp-hyperspace-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.warp-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen;
}

/* Outer radial cyan energy vignette (only subtle edge glow, keeping ship crystal clear) */
.warp-radial-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 68%,
    rgba(0, 240, 255, 0.08) 88%,
    rgba(2, 6, 23, 0.32) 100%
  );
  mix-blend-mode: screen;
  pointer-events: none;
}

/* Edge chromatic glow */
.warp-chromatic-ring {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 120px rgba(0, 240, 255, 0.28);
  pointer-events: none;
}

/* Initial Hyperspace Engage Light Burst Flash */
.warp-engage-flash {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.65),
    rgba(0, 240, 255, 0.3) 50%,
    transparent 75%
  );
  opacity: 0;
  transition: opacity 0.14s ease-out;
  pointer-events: none;
  mix-blend-mode: screen;
}
.warp-engage-flash.flash-burst {
  opacity: 1;
}

@keyframes warpPulse {
  0% {
    transform: scale(0.98);
    opacity: 0.85;
  }
  100% {
    transform: scale(1.02);
    opacity: 1;
  }
}
@keyframes warpGlow {
  0% {
    opacity: 0.65;
  }
  100% {
    opacity: 1;
  }
}

/* =========================================================
   FOOTER HUD BAR (BOTTOM)
   ========================================================= */
.hud-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.8rem;
  gap: 0.65rem;
  background: linear-gradient(to top, rgba(2, 6, 23, 0.98) 60%, transparent);
  z-index: 5;
}

/* Status pill (speed + status on left) */
.footer-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(8, 16, 38, 0.92);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 10px;
  padding: 0.45rem 0.75rem;
  backdrop-filter: blur(14px);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.15);
  transition: all 0.25s ease;
  flex-shrink: 0;
}
.footer-status.in-warp {
  border-color: #00f0ff;
  box-shadow: 0 0 28px rgba(0, 240, 255, 0.4);
  background: rgba(6, 24, 60, 0.94);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00f0ff;
  box-shadow: 0 0 10px #00f0ff;
  animation: dotPulse 1.4s infinite ease-in-out;
  flex-shrink: 0;
}
.status-dot.warp {
  background: #38bdf8;
  box-shadow: 0 0 16px #38bdf8;
  animation: dotWarp 0.22s infinite ease-in-out;
}

.status-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #e0f2fe;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.speed-chip {
  background: rgba(0, 240, 255, 0.14);
  border: 1px solid rgba(0, 240, 255, 0.4);
  padding: 0.12rem 0.52rem;
  border-radius: 6px;
  color: #00f0ff;
  font-variant-numeric: tabular-nums;
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
  transition: all 0.2s ease;
}
.speed-chip.speed-warp {
  background: rgba(0, 240, 255, 0.28);
  border-color: #00f0ff;
  box-shadow: 0 0 14px rgba(0, 240, 255, 0.5);
  color: #ffffff;
}
.speed-chip .unit {
  font-size: 0.58rem;
  color: #94a3b8;
}

@keyframes dotPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.8);
  }
}
@keyframes dotWarp {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}

/* Controls inline list */
.footer-controls {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  flex-wrap: nowrap;
  padding: 0.45rem 0.65rem;
  background: rgba(8, 16, 38, 0.9);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 10px;
  backdrop-filter: blur(14px);
  flex: 1;
  overflow: hidden;
}

.ctrl-item {
  display: flex;
  align-items: center;
  gap: 0.28rem;
  font-size: 0.65rem;
  color: #cbd5e1;
  white-space: nowrap;
}

.ctrl-item.highlight-warp {
  color: #fde047;
}
.ctrl-item.drag-hint-item {
  color: #cbd5e1;
}

.drag-hint {
  font-size: 0.62rem;
  color: #cbd5e1;
  font-style: italic;
  white-space: nowrap;
}

kbd {
  background: rgba(30, 41, 59, 0.92);
  border: 1px solid rgba(56, 189, 248, 0.45);
  color: #38bdf8;
  font-weight: 700;
  font-size: 0.58rem;
  padding: 0.08rem 0.32rem;
  border-radius: 4px;
  font-family: inherit;
  min-width: 18px;
  text-align: center;
  display: inline-block;
}

kbd.warp-key {
  background: rgba(234, 179, 8, 0.2);
  border-color: #facc15;
  color: #fde047;
}

.ctrl-divider {
  width: 1px;
  height: 11px;
  background: rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

/* Right actions */
.footer-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.42rem 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.73rem;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.18s ease;
  font-family: inherit;
  white-space: nowrap;
}

.mute-btn {
  background: rgba(30, 41, 59, 0.85);
  border-color: rgba(255, 255, 255, 0.18);
  color: #e2e8f0;
  font-size: 0.9rem;
  padding: 0.42rem 0.6rem;
}
.mute-btn:hover {
  background: rgba(51, 65, 85, 0.9);
  border-color: #38bdf8;
}
.mute-btn.muted {
  border-color: rgba(239, 68, 68, 0.5);
  color: #fca5a5;
}

.exit-btn {
  background: rgba(239, 68, 68, 0.18);
  border-color: rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  letter-spacing: 0.04em;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.2);
}
.exit-btn:hover {
  background: rgba(239, 68, 68, 0.38);
  color: #ffffff;
  border-color: #ef4444;
}

.exit-label {
  font-size: 0.68rem;
}
</style>
