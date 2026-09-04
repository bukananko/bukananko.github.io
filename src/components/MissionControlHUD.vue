<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  orbitSpeedMultiplier: number;
}>();

const emit = defineEmits<{
  (e: 'reset-view'): void;
  (e: 'toggle-speed'): void;
  (e: 'zoom-in'): void;
  (e: 'zoom-out'): void;
}>();
</script>

<template>
  <aside
    aria-label="Mission Control HUD"
    class="fixed bottom-5 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
    <!-- Flight Telemetry Sub Controls: Orbit Speed, Recenter, Zoom -->
    <div
      class="pointer-events-auto flex items-center gap-2.5 text-xs font-mono p-1.5 rounded-2xl cosmic-glass border border-white/10 shadow-2xl backdrop-blur-xl">
      <!-- Speed Multiplier -->
      <button
        @click="emit('toggle-speed')"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm"
        title="Cycle Orbit Speed (1x / 2x / Paused)">
        <Icon
          :icon="orbitSpeedMultiplier === 0 ? 'solar:play-bold' : 'solar:stopwatch-bold'"
          width="16"
          class="text-amber-400" />
        <span>{{ orbitSpeedMultiplier === 0 ? 'Paused' : `${orbitSpeedMultiplier}x Orbit` }}</span>
      </button>

      <span class="text-white/15">|</span>

      <!-- Center / Reset View -->
      <button
        @click="emit('reset-view')"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-white/10 text-neutral-200 transition-all shadow-sm"
        title="Recenter Solar View">
        <Icon icon="fluent-mdl2:focus-view" width="16" class="text-cyan-400" />
        <span>Recenter</span>
      </button>

      <span class="text-white/15">|</span>

      <!-- Zoom Controls -->
      <div class="flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <button
          @click="emit('zoom-out')"
          class="p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out">
          <Icon icon="solar:magnifer-zoom-out-linear" width="16" />
        </button>
        <span class="text-neutral-600 text-[10px]">|</span>
        <button
          @click="emit('zoom-in')"
          class="p-1.5 px-2.5 hover:bg-white/10 text-neutral-300 transition-colors"
          title="Zoom In"
          aria-label="Zoom In">
          <Icon icon="solar:magnifer-zoom-in-linear" width="16" />
        </button>
      </div>
    </div>
  </aside>
</template>
