<template>
  <Transition name="terminal-exit">
    <div
      v-if="visible"
      class="terminal-loading-screen fixed inset-0 z-50 flex items-center justify-center bg-[#05070d] text-emerald-400 font-mono select-none overflow-hidden p-4 sm:p-6"
    >
      <!-- CRT Scanline & Phosphor Vignette Overlays -->
      <div class="crt-scanlines pointer-events-none"></div>
      <div class="crt-vignette pointer-events-none"></div>
      <div class="crt-bloom pointer-events-none"></div>

      <!-- MAIN TERMINAL WINDOW CONTAINER -->
      <div class="terminal-window w-full max-w-3xl h-[85vh] max-h-[640px] flex flex-col bg-[#080c14]/95 border border-emerald-500/30 rounded-lg shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-md overflow-hidden z-10">
        
        <!-- Terminal Header Bar -->
        <header class="flex items-center justify-between px-4 py-2.5 bg-[#0b121e] border-b border-emerald-500/20 text-xs">
          <!-- Window Controls -->
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block shadow-[0_0_6px_rgba(239,68,68,0.6)]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block shadow-[0_0_6px_rgba(245,158,11,0.6)]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_6px_rgba(16,185,129,0.6)]"></span>
            <span class="ml-2 text-emerald-300/60 font-mono text-[11px] hidden sm:inline">
              anko@core-nebula: ~/space/init_kernel.sh
            </span>
          </div>

          <!-- Session Badge -->
          <div class="flex items-center space-x-3 text-[10px] text-emerald-400/70">
            <span class="text-cyan-400/90 font-bold">TTY1</span>
            <span>·</span>
            <span>SECURE BOOT</span>
            <span class="hidden sm:inline">·</span>
            <span class="hidden sm:inline text-emerald-300">BAUD 115200</span>
          </div>
        </header>

        <!-- Terminal Body / Console Output -->
        <div ref="logContainer" class="flex-1 p-4 sm:p-5 overflow-y-auto space-y-1 text-xs sm:text-[13px] leading-relaxed scrollbar-thin">
          
          <!-- ASCII Art Header -->
          <pre class="text-cyan-400/80 font-mono text-[9px] sm:text-[11px] leading-tight mb-3 select-none filter drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
 ██████╗ ██╗   ██╗██╗  ██╗ █████╗ ███╗   ██╗ █████╗ ███╗   ██╗██╗  ██╗ ██████╗ 
 ██╔══██╗██║   ██║██║ ██╔╝██╔══██╗████╗  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔═══██╗
 ██████╔╝██║   ██║█████╔╝ ███████║██╔██╗ ██║███████║██╔██╗ ██║█████╔╝ ██║   ██║
 ██╔══██╗██║   ██║██╔═██╗ ██╔══██║██║╚██╗██║██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║
 ██████╔╝╚██████╔╝██║  ██╗██║  ██║██║ ╚████║██║  ██║██║ ╚████║██║  ██╗╚██████╔╝
 ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ 
          </pre>

          <div class="text-emerald-300/60 text-[11px] pb-2 border-b border-emerald-500/10 mb-2">
            ANKO KERNEL v4.19-ASTRO · ARCH: X86_64 · THREE.JS ACCELERATED
          </div>

          <!-- Streaming Boot Logs -->
          <div v-for="(log, idx) in activeLogs" :key="idx" class="flex items-start space-x-2">
            <span class="text-slate-500 shrink-0 font-mono text-[11px] select-none">
              [{{ log.timestamp }}]
            </span>
            <span
              :class="{
                'text-emerald-400': log.level === 'OK',
                'text-cyan-400': log.level === 'INFO',
                'text-amber-400': log.level === 'WARN',
                'text-white font-bold': log.level === 'SYS',
              }"
              class="font-mono"
            >
              <strong v-if="log.level !== 'SYS'" class="mr-1.5 font-bold">[{{ log.level }}]</strong>
              {{ log.text }}
            </span>
          </div>

          <!-- Dynamic Active Line with Blinking Cursor -->
          <div class="flex items-center space-x-2 pt-1 text-cyan-300">
            <span class="text-slate-500 font-mono text-[11px] select-none">[{{ currentTimestamp }}]</span>
            <span class="font-bold">&gt;&gt;</span>
            <span class="tracking-wide">{{ currentStatusText }}</span>
            <span class="inline-block w-2 h-3.5 bg-emerald-400 cursor-blink ml-1"></span>
          </div>
        </div>

        <!-- Terminal Footer / Progress Status Bar -->
        <footer class="px-4 py-3 bg-[#0a101a] border-t border-emerald-500/20 text-xs flex flex-col space-y-2">
          <!-- ASCII Progress Bar -->
          <div class="flex items-center space-x-3">
            <span class="text-emerald-300/80 font-bold shrink-0 text-[11px]">INITIALIZATION:</span>
            
            <!-- Bracket Progress Bar -->
            <div class="flex-1 font-mono text-[11px] tracking-tight truncate text-emerald-400 flex items-center">
              <span class="text-slate-500 mr-1">[</span>
              <span class="text-cyan-400 select-none">{{ progressBlocks.filled }}</span>
              <span class="text-slate-700 select-none">{{ progressBlocks.empty }}</span>
              <span class="text-slate-500 ml-1">]</span>
            </div>

            <!-- Percentage Indicator -->
            <span class="font-bold text-cyan-300 text-sm w-12 text-right shrink-0">
              {{ Math.round(displayProgress) }}%
            </span>
          </div>

          <!-- Sub Status Metrics Strip -->
          <div class="flex items-center justify-between text-[10px] text-slate-400/80 font-mono pt-1">
            <div class="flex items-center space-x-3">
              <span>THREADS: <strong class="text-emerald-300">16/16</strong></span>
              <span>·</span>
              <span>GPU: <strong class="text-cyan-300">ACTIVE</strong></span>
              <span>·</span>
              <span>SHADERS: <strong class="text-amber-300">WARMED</strong></span>
            </div>
            <div class="text-emerald-400/70 font-mono">
              MEM: 128MB / 1024MB
            </div>
          </div>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = withDefaults(
  defineProps<{
    isLoading: boolean;
    progress?: number;
    message?: string;
  }>(),
  {
    progress: 0,
    message: 'Menginisialisasi Engine Tiga Dimensi & Kamera...',
  },
);

const emit = defineEmits<{
  (e: 'finished'): void;
}>();

const visible = ref(true);
const displayProgress = ref(0);
const logContainer = ref<HTMLDivElement | null>(null);

interface BootLog {
  timestamp: string;
  level: 'OK' | 'INFO' | 'WARN' | 'SYS';
  text: string;
  triggerProgress: number;
}

const allBootLogs: BootLog[] = [
  { timestamp: '0.0012', level: 'SYS', text: 'SYSTEM BIOS: POST VALIDATED · ALL CORES NOMINAL', triggerProgress: 5 },
  { timestamp: '0.0381', level: 'INFO', text: 'ALLOCATING HEAP & VIRTUAL MEMORY SPACE (4096 MB)...', triggerProgress: 10 },
  { timestamp: '0.0892', level: 'OK', text: 'WEBGL2 RENDER PIPELINE DETECTED · HARDWARE ACCEL ENABLED', triggerProgress: 18 },
  { timestamp: '0.1450', level: 'INFO', text: 'INITIALIZING THREE.JS SCENE GRAPH & 60 FPS RENDER MATRIX', triggerProgress: 26 },
  { timestamp: '0.2210', level: 'OK', text: 'COMPUTING 20,000 DEEP SPACE STAR PARTICLES (3 SHELL DEPTH)', triggerProgress: 35 },
  { timestamp: '0.3120', level: 'OK', text: 'GENERATING PROCEDURAL VOLUMETRIC SPIRAL GALAXY & CORE', triggerProgress: 44 },
  { timestamp: '0.4280', level: 'INFO', text: 'SYNTHESIZING 9 CELESTIAL PLANETS & ACCENT TEXTURE MAPS', triggerProgress: 53 },
  { timestamp: '0.5190', level: 'OK', text: 'DEPLOYING 380 ASTEROIDS INTO OUTER KUIPER BELT RING', triggerProgress: 62 },
  { timestamp: '0.6340', level: 'INFO', text: 'ASSEMBLING VALKYRIE-X AEROSPACE FLIGHT PHYSICS (6-DOF)', triggerProgress: 72 },
  { timestamp: '0.7810', level: 'OK', text: 'PRE-WARMING GPU SHADERS & 2,000 HYPERSPACE WARP STREAKS', triggerProgress: 82 },
  { timestamp: '0.8920', level: 'OK', text: 'ZERO-LATENCY GPU CACHE PRIMED · NO RUNTIME FREEZE VERIFIED', triggerProgress: 92 },
  { timestamp: '1.0000', level: 'SYS', text: 'BOOT SEQUENCE COMPLETE · ENGAGING CELESTIAL CANVAS INTERFACE', triggerProgress: 98 },
];

const activeLogs = ref<BootLog[]>([]);

const currentStatusText = computed(() => {
  if (displayProgress.value >= 100) return 'READY · STARTING ORBITAL NAVIGATION';
  return props.message || 'INITIALIZING SYSTEMS...';
});

const currentTimestamp = computed(() => {
  const sec = (displayProgress.value / 100).toFixed(4);
  return sec;
});

// ASCII Progress Blocks Generator (e.g. [████████········])
const progressBlocks = computed(() => {
  const totalChars = 32;
  const filledCount = Math.min(totalChars, Math.max(0, Math.floor((displayProgress.value / 100) * totalChars)));
  const emptyCount = totalChars - filledCount;

  return {
    filled: '█'.repeat(filledCount),
    empty: '·'.repeat(emptyCount),
  };
});

const scrollToBottom = () => {
  nextTick(() => {
    if (logContainer.value) {
      logContainer.value.scrollTop = logContainer.value.scrollHeight;
    }
  });
};

const checkAndPushLogs = (prog: number) => {
  for (const log of allBootLogs) {
    if (prog >= log.triggerProgress && !activeLogs.value.includes(log)) {
      activeLogs.value.push(log);
      scrollToBottom();
    }
  }
};

let progressInterval: number | null = null;

// Smoothly interpolate progress toward props.progress
watch(
  () => props.progress,
  (newVal) => {
    if (newVal > displayProgress.value) {
      const step = () => {
        if (displayProgress.value < newVal) {
          displayProgress.value = Math.min(newVal, displayProgress.value + 2.5);
          checkAndPushLogs(displayProgress.value);
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  },
);

watch(
  () => props.isLoading,
  (loading) => {
    if (!loading) {
      displayProgress.value = 100;
      checkAndPushLogs(100);

      if (progressInterval !== null) {
        clearInterval(progressInterval);
        progressInterval = null;
      }

      // Smooth terminal power-off transition delay
      setTimeout(() => {
        visible.value = false;
        emit('finished');
      }, 600);
    }
  },
);

onMounted(() => {
  // Push initial boot lines immediately
  checkAndPushLogs(5);

  // Progressive simulated timer
  progressInterval = window.setInterval(() => {
    if (props.isLoading && displayProgress.value < 85) {
      displayProgress.value += 1.3;
      checkAndPushLogs(displayProgress.value);
    }
  }, 40);
});

onUnmounted(() => {
  if (progressInterval !== null) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
});
</script>

<style scoped>
/* ── TERMINAL EXIT TRANSITION (CRT POWER-DOWN COLLAPSE) ──────── */
.terminal-exit-leave-active {
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), filter 0.55s ease-out;
}
.terminal-exit-leave-to {
  opacity: 0;
  transform: scale(0.96);
  filter: brightness(1.8) contrast(1.4);
}

/* ── CRT SCANLINES OVERLAY ───────────────────────────────────── */
.crt-scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.38) 50%
  );
  background-size: 100% 4px;
  z-index: 20;
  pointer-events: none;
  opacity: 0.7;
}

/* ── CRT RADIAL VIGNETTE ─────────────────────────────────────── */
.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 45%,
    rgba(0, 0, 0, 0.6) 80%,
    rgba(0, 0, 0, 0.95) 100%
  );
  z-index: 21;
  pointer-events: none;
}

/* ── CRT PHOSPHOR GLOW BLOOM ─────────────────────────────────── */
.crt-bloom {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(16, 185, 129, 0.06) 0%,
    transparent 70%
  );
  z-index: 15;
  pointer-events: none;
}

/* ── CURSOR BLINK ANIMATION ──────────────────────────────────── */
.cursor-blink {
  animation: cursorBlink 0.8s step-start infinite;
}
@keyframes cursorBlink {
  50% { opacity: 0; }
}

/* ── CUSTOM THIN SCROLLBAR ───────────────────────────────────── */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(8, 12, 20, 0.8);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 2px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.6);
}
</style>
