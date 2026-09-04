<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { AutoTyperVue } from 'auto-typer-vue3';
import { type CelestialBody, solarSystemBodies, skills, contacts, type Skill } from '@/constant';

const props = defineProps<{
  body: CelestialBody | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', body: CelestialBody): void;
}>();

const heroTitles = [
  'Front-End Developer',
  'Back-End Developer',
  'Full-Stack Developer',
  'Creative Web Engineer',
];

const isExpandedMobile = ref(false);

const toggleExpand = () => {
  isExpandedMobile.value = !isExpandedMobile.value;
};

const close = () => {
  isExpandedMobile.value = false;
  emit('close');
};

// Robust Mobile Drag-to-Dismiss & Expand Gestures
const dragTranslateY = ref(0);
const isDraggingDrawer = ref(false);
const scrollContainerRef = ref<HTMLDivElement | null>(null);
let startY = 0;
let lastMoveY = 0;
let startTimestamp = 0;

const startDrag = (clientY: number) => {
  if (window.innerWidth >= 768) return;
  startY = clientY;
  lastMoveY = clientY;
  startTimestamp = Date.now();
  isDraggingDrawer.value = true;
};

const moveDrag = (clientY: number) => {
  if (!isDraggingDrawer.value) return;
  lastMoveY = clientY;
  const delta = clientY - startY;
  if (delta > 0) {
    // 1-to-1 downward follow
    dragTranslateY.value = delta;
  } else {
    // Upward drag: allow pulling up to expand if not already expanded
    if (!isExpandedMobile.value) {
      dragTranslateY.value = Math.max(-50, delta * 0.4);
    } else {
      dragTranslateY.value = Math.max(-15, delta * 0.1);
    }
  }
};

const endDrag = () => {
  if (!isDraggingDrawer.value) return;
  isDraggingDrawer.value = false;

  const totalDelta = dragTranslateY.value;
  const duration = Date.now() - startTimestamp;
  const velocity = duration > 0 ? (lastMoveY - startY) / duration : 0;

  if (totalDelta < -30) {
    // Swiped up -> Expand to full dossier view (92vh) on mobile!
    isExpandedMobile.value = true;
    dragTranslateY.value = 0;
  } else if (isExpandedMobile.value) {
    // In expanded mode: dragging down collapses to default 72vh
    if (totalDelta > 60 || velocity > 0.35) {
      isExpandedMobile.value = false;
      dragTranslateY.value = 0;
    } else {
      dragTranslateY.value = 0;
    }
  } else {
    // In default 72vh mode: dragging down dismisses
    if (totalDelta > 65 || (velocity > 0.4 && totalDelta > 20)) {
      dragTranslateY.value = window.innerHeight * 0.75;
      setTimeout(() => {
        close();
        dragTranslateY.value = 0;
        isExpandedMobile.value = false;
      }, 180);
    } else {
      dragTranslateY.value = 0;
    }
  }
};

// Pointer Events handlers
const onPointerDown = (e: PointerEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest('button') || target.closest('a')) return;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  startDrag(e.clientY);
};

const onPointerMove = (e: PointerEvent) => {
  if (isDraggingDrawer.value) {
    moveDrag(e.clientY);
  }
};

const onPointerUp = (e: PointerEvent) => {
  if (isDraggingDrawer.value) {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    endDrag();
  }
};

const onPointerCancel = (e: PointerEvent) => {
  if (isDraggingDrawer.value) {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    endDrag();
  }
};

// Touch events fallback for maximum mobile browser compatibility
const onTouchStart = (e: TouchEvent) => {
  const target = e.target as HTMLElement;
  if (target.closest('button') || target.closest('a')) return;
  startDrag(e.touches[0].clientY);
};

const onTouchMove = (e: TouchEvent) => {
  if (!isDraggingDrawer.value) return;
  if (e.cancelable) e.preventDefault();
  moveDrag(e.touches[0].clientY);
};

const onTouchEnd = () => {
  endDrag();
};

// Content scroll listener: drag down if scrolled to top
const onContentTouchStart = (e: TouchEvent) => {
  if (window.innerWidth >= 768) return;
  if (scrollContainerRef.value && scrollContainerRef.value.scrollTop <= 0) {
    startDrag(e.touches[0].clientY);
  }
};

const onContentTouchMove = (e: TouchEvent) => {
  if (!isDraggingDrawer.value) return;
  const currentY = e.touches[0].clientY;
  const delta = currentY - startY;
  if (delta > 0 && scrollContainerRef.value && scrollContainerRef.value.scrollTop <= 0) {
    if (e.cancelable) e.preventDefault();
    moveDrag(currentY);
  } else if (delta < 0) {
    isDraggingDrawer.value = false;
    dragTranslateY.value = 0;
  }
};

const onContentTouchEnd = () => {
  endDrag();
};

const drawerTransformStyle = computed(() => {
  const base: Record<string, string> = {
    borderColor: props.body?.color || '#38bdf8',
  };
  if (isDraggingDrawer.value) {
    base.transform = `translateY(${dragTranslateY.value}px)`;
    base.transition = 'none';
  } else if (dragTranslateY.value !== 0) {
    base.transform = `translateY(${dragTranslateY.value}px)`;
    base.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  return base;
});

// Cycle to next / previous celestial body
const allBodies = computed(() => solarSystemBodies);

const currentIndex = computed(() => {
  if (!props.body) return -1;
  return allBodies.value.findIndex((b) => b.id === props.body?.id);
});

const prevBody = computed(() => {
  if (currentIndex.value <= 0) return allBodies.value[allBodies.value.length - 1];
  return allBodies.value[currentIndex.value - 1];
});

const nextBody = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= allBodies.value.length - 1) {
    return allBodies.value[0];
  }
  return allBodies.value[currentIndex.value + 1];
});

const goToPrev = () => {
  if (prevBody.value) emit('select', prevBody.value);
};

const goToNext = () => {
  if (nextBody.value) emit('select', nextBody.value);
};

// Keydown listener for Esc and Arrow keys
const onKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') goToPrev();
  if (e.key === 'ArrowRight') goToNext();
};

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown);
});

// Category helper for skills
const frontendSkills = computed(() =>
  skills.filter((s) => s.category === 'frontend' || !s.category),
);
const backendSkills = computed(() =>
  skills.filter((s) => s.category === 'backend' || s.category === 'database'),
);

const getTechSkill = (techKey: string): Skill | undefined => {
  return skills.find((s) => s.key === techKey);
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full md:translate-y-0 md:translate-x-full opacity-0"
    enter-to-class="translate-y-0 md:translate-x-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 md:translate-x-0 opacity-100"
    leave-to-class="translate-y-full md:translate-y-0 md:translate-x-full opacity-0">
    <div
      v-if="isOpen && body"
      class="pointer-events-none fixed inset-0 z-50 flex flex-col justify-end md:justify-stretch md:items-end">
      <!-- Backdrop overlay (no blur, completely sharp 3D preview, non-blocking) -->
      <div class="pointer-events-none fixed inset-0 bg-transparent transition-opacity -z-10" />

      <!-- Telemetry Drawer (Desktop Right Sidebar / Mobile Bottom Sheet) -->
      <aside
        aria-label="Telemetry HUD Dossier"
        class="pointer-events-auto relative w-full md:w-[480px] lg:w-[520px] xl:w-[560px] flex flex-col bg-[#030712]/95 md:bg-[#030712]/90 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-white/15 rounded-t-3xl md:rounded-none shadow-[0_-20px_60px_rgba(0,0,0,0.85)] md:shadow-[-25px_0_60px_rgba(0,0,0,0.9)] overflow-hidden transition-[height,max-height] duration-300 ease-out"
        :class="[
          isExpandedMobile
            ? 'h-[92vh] max-h-[94vh] md:h-full md:max-h-full'
            : 'h-[70vh] max-h-[72vh] md:h-full md:max-h-full',
        ]"
        :style="drawerTransformStyle">
        <!-- Mobile Drag Handle Bar with Touch & Pointer Listeners -->
        <div
          class="w-full flex flex-col items-center pt-2 pb-1.5 md:hidden cursor-grab active:cursor-grabbing touch-none select-none"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerCancel"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          @click="toggleExpand">
          <div class="w-12 h-1.5 rounded-full bg-white/40 active:bg-cyan-400 transition-colors" />
          <span class="text-[9px] font-mono tracking-widest text-neutral-400 mt-1 uppercase">
            {{
              isExpandedMobile ? 'Swipe down to collapse' : 'Swipe down to close • Tap to expand'
            }}
          </span>
        </div>

        <!-- Top HUD Header (2-tier layout: Tier 1 Badge & Actions, Tier 2 Full-Width Title) -->
        <div
          class="px-4 py-2.5 md:px-6 md:py-3.5 border-b border-white/10 flex flex-col gap-1.5 shrink-0 bg-white/[0.02] select-none">
          <!-- Row 1: Telemetry Code Classification & Action Buttons -->
          <div class="flex items-center justify-between gap-2">
            <div
              class="text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-cyan-400/90 flex items-center gap-1.5 min-w-0 truncate">
              <span
                class="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0"></span>
              <span class="truncate"
                >{{
                  body.type === 'vessel' || body.type === 'station' || body.type === 'phenomenon'
                    ? 'DEEP SPACE'
                    : 'PLANETARY'
                }}
                // {{ body.codeName }}</span
              >
            </div>

            <!-- Header Quick Action Controls -->
            <div class="flex items-center gap-1.5 md:gap-2 shrink-0">
              <!-- Prev / Next quick jumps -->
              <button
                @click="goToPrev"
                @pointerdown.stop
                @touchstart.stop
                class="p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                title="Previous Celestial Body (Arrow Left)">
                <Icon icon="solar:arrow-left-linear" class="w-4 h-4 md:w-4.5 md:h-4.5" />
              </button>
              <button
                @click="goToNext"
                @pointerdown.stop
                @touchstart.stop
                class="p-1.5 md:p-2 rounded-xl border border-white/10 hover:bg-white/10 active:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                title="Next Celestial Body (Arrow Right)">
                <Icon icon="solar:arrow-right-linear" class="w-4 h-4 md:w-4.5 md:h-4.5" />
              </button>
              <!-- Expand / Collapse Button (Mobile Only) -->
              <button
                @click="toggleExpand"
                @pointerdown.stop
                @touchstart.stop
                class="md:hidden p-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors"
                :title="isExpandedMobile ? 'Collapse to half view' : 'Expand to full view'">
                <Icon
                  :icon="
                    isExpandedMobile
                      ? 'solar:minimize-square-minimalistic-linear'
                      : 'solar:maximize-square-minimalistic-linear'
                  "
                  class="w-4 h-4" />
              </button>
              <!-- Close Button -->
              <button
                @click="close"
                @pointerdown.stop
                @touchstart.stop
                class="p-1.5 md:p-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-red-500/20 text-white hover:text-red-300 transition-colors"
                title="Close Telemetry (Esc)">
                <Icon icon="solar:close-circle-bold" class="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          <!-- Row 2: Full-Width Title (Guaranteed 100% visible, never cut off or cramped) -->
          <div class="flex items-center gap-2.5 min-w-0 pt-0.5">
            <span
              class="w-3.5 h-3.5 rounded-full animate-pulse shadow-sm shrink-0"
              :style="{ backgroundColor: body.color, boxShadow: `0 0 12px ${body.color}` }"></span>
            <h2
              class="text-base md:text-2xl font-black text-white leading-tight tracking-tight break-words">
              {{ body.name }}
            </h2>
          </div>
        </div>

        <!-- Scrollable Telemetry Dossier Body -->
        <div
          ref="scrollContainerRef"
          class="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar overscroll-contain"
          @touchstart="onContentTouchStart"
          @touchmove="onContentTouchMove"
          @touchend="onContentTouchEnd"
          @touchcancel="onContentTouchEnd">
          <!-- BODY TYPE 1: THE SUN (SOL-ANKO PROFILE) -->
          <div v-if="body.type === 'star'" class="space-y-6">
            <div class="flex flex-col sm:flex-row items-center gap-6">
              <div
                class="relative w-24 h-24 rounded-full p-1 border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center justify-center bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 shrink-0 animate-pulse">
                <span class="text-4xl">☀️</span>
              </div>
              <div class="text-center sm:text-left space-y-2">
                <div
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  CORE STELLAR NURSERY // SOL-ANKO
                </div>
                <h3 class="text-2xl font-bold text-neutral-100">
                  Hi, I'm <span class="text-amber-400">Anko</span>
                </h3>
                <div class="text-sm md:text-base font-bold text-neutral-300">
                  <AutoTyperVue
                    class="bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
                    componentTag="span"
                    :text="heroTitles" />
                </div>
              </div>
            </div>

            <p class="text-neutral-300 leading-relaxed text-sm md:text-base">
              Pusat gravitasi dari seluruh ekosistem proyek dan keahlian digital ini. Menyinari dan
              menggerakkan setiap karya dengan perpaduan performa tinggi, animasi dinamis, serta
              estetika visual modern.
            </p>

            <!-- Transmission Channels (Contacts) -->
            <div>
              <h4
                class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Transmission Channels // Direct Comm Link
              </h4>
              <div class="flex flex-wrap gap-2.5">
                <a
                  v-for="(contact, i) in contacts"
                  :key="i"
                  :href="contact.href"
                  target="_blank"
                  class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-105 shadow-sm">
                  <Icon :icon="contact.icon" width="20" />
                  <span>{{ contact.title }}</span>
                  <Icon icon="solar:arrow-right-up-linear" width="16" class="text-neutral-400" />
                </a>
              </div>
            </div>

            <div
              class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Icon icon="solar:shield-check-bold" width="24" class="text-emerald-400" />
                <div>
                  <div class="text-xs font-mono text-neutral-400">STATUS OPERASIONAL</div>
                  <div class="text-sm font-bold text-emerald-400">
                    Available for Freelance & Full-Time
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- BODY TYPE 2: SKILLS GALAXY -->
          <div v-else-if="body.type === 'skills'" class="space-y-6">
            <p class="text-neutral-300 leading-relaxed text-sm md:text-base">
              {{ body.tagline }}
            </p>

            <!-- Frontend Modules -->
            <div>
              <div
                class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Orbital Frontend Systems
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <div
                  v-for="(skill, i) in frontendSkills"
                  :key="i"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-cyan-400 transition-colors shadow-sm">
                  <Icon :icon="skill.icon" width="18" />
                  <span class="text-neutral-200">{{ skill.title }}</span>
                </div>
              </div>
            </div>

            <!-- Backend & Database Modules -->
            <div>
              <div
                class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3">
                Core Backend & Storage Arrays
              </div>
              <div class="grid grid-cols-2 gap-2.5">
                <div
                  v-for="(skill, i) in backendSkills"
                  :key="i"
                  class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold bg-white/5 border border-white/10 hover:border-purple-400 transition-colors shadow-sm">
                  <Icon :icon="skill.icon" width="18" />
                  <span class="text-neutral-200">{{ skill.title }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- BODY TYPE 3: PLANET PROJECT -->
          <div v-else-if="body.projectData" class="space-y-6">
            <!-- Project Banner Image -->
            <div
              class="relative group overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <img
                :src="body.projectData.img"
                :alt="body.projectData.title"
                class="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <div class="font-mono text-xs text-white/90">STATUS: EXPLORED & OPERATIONAL</div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-neutral-300 leading-relaxed text-sm md:text-base">
              {{ body.projectData.desc }}
            </p>

            <!-- Tech Stack Modules -->
            <div>
              <div
                class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Deployed Propulsion Stacks
              </div>
              <div class="flex flex-wrap gap-2">
                <template v-for="techKey in body.projectData.techs" :key="techKey">
                  <span
                    v-if="getTechSkill(techKey)"
                    class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white/10 border border-white/10 text-neutral-200">
                    <Icon :icon="getTechSkill(techKey)!.icon" width="16" />
                    {{ getTechSkill(techKey)!.title }}
                  </span>
                </template>
              </div>
            </div>

            <!-- Action Links -->
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                :href="body.projectData.web"
                target="_blank"
                class="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]">
                <Icon icon="solar:rocket-bold" width="18" />
                Launch Mission (Live Demo)
              </a>
              <a
                :href="body.projectData.github"
                target="_blank"
                class="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all hover:scale-[1.02]">
                <Icon icon="solar:code-bold" width="18" />
                Source Code
              </a>
            </div>
          </div>

          <!-- BODY TYPE 4: DEEP SPACE ARTIFACT / CELESTIAL PHENOMENON -->
          <div v-else class="space-y-6">
            <div class="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div class="flex items-center flex-wrap justify-between mb-3 gap-2">
                <div
                  class="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  <span class="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  {{ (body.type || 'DEEP SPACE').toUpperCase() }} TELEMETRY FEED
                </div>
                <div
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  <Icon :icon="body.icon || 'solar:telescope-bold'" width="14" />
                  <span>{{ body.codeName }}</span>
                </div>
              </div>
              <p class="text-neutral-200 text-sm md:text-base leading-relaxed font-medium">
                {{ body.tagline }}
              </p>
              <p
                v-if="body.lore"
                class="text-neutral-300 text-xs md:text-sm mt-3 leading-relaxed border-t border-white/10 pt-3">
                {{ body.lore }}
              </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <template v-if="body.extraStats && body.extraStats.length > 0">
                <div
                  v-for="(stat, idx) in body.extraStats"
                  :key="idx"
                  class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-neutral-300 text-[10px] uppercase tracking-wider">
                    {{ stat.label }}
                  </div>
                  <div class="text-cyan-300 font-bold text-xs md:text-sm mt-0.5 wrap-anywhere">
                    {{ stat.value }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-neutral-500 text-[10px] uppercase tracking-wider">
                    Orbital Radius
                  </div>
                  <div class="text-cyan-300 font-bold text-xs md:text-sm mt-0.5">
                    {{ body.orbitRadius }} AU
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-neutral-500 text-[10px] uppercase tracking-wider">
                    Telemetry Signal
                  </div>
                  <div class="text-emerald-400 font-bold text-xs md:text-sm mt-0.5">
                    1420.405 MHz
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div class="text-neutral-500 text-[10px] uppercase tracking-wider">Status</div>
                  <div class="text-cyan-300 font-bold text-xs md:text-sm mt-0.5">Operational</div>
                </div>
              </template>
            </div>

            <div
              class="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 flex items-start gap-3">
              <Icon icon="solar:radar-bold" width="20" class="text-cyan-400 shrink-0 mt-0.5" />
              <p class="text-neutral-300 text-xs leading-relaxed font-mono">
                Sensor navigasi mengonfirmasi posisi stabil di luar bidang orbit tata surya utama.
                Terhubung dengan jaringan starlight relay.
              </p>
            </div>
          </div>
        </div>

        <!-- Target Lock Status Footer (Desktop Full / Mobile Integrated in Header) -->
        <div
          class="hidden md:flex p-3.5 md:p-4 border-t border-white/10 bg-black/40 items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span
              class="text-cyan-300 font-semibold uppercase tracking-wider text-[11px] md:text-xs"
              >3D TARGET LOCK // ACTIVE TRACKING</span
            >
          </div>
          <div class="text-[10px] md:text-[11px] text-neutral-500">ESC / Tap 3D to Unfollow</div>
        </div>
      </aside>
    </div>
  </Transition>
</template>
