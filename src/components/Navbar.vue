<script setup lang="ts">
import logo from '@/assets/logo.webp';
import { Icon } from '@iconify/vue';

const emit = defineEmits<{
  (e: 'navigate', target: 'sun' | 'skills' | 'projects'): void;
}>();
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 pointer-events-none">
    <div class="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
      <!-- Left: Logo & Telemetry Status -->
      <a
        href="#"
        @click.prevent="emit('navigate', 'sun')"
        class="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:scale-105 transition-all group">
        <img
          :src="logo"
          alt="Anko Logo"
          width="36"
          height="36"
          class="rounded-xl group-hover:rotate-12 transition-transform duration-300" />
      </a>

      <!-- Right: Interaction Hint Badge -->
      <div class="flex items-center gap-2">
        <div
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl cosmic-glass border border-white/10 text-[11px] font-mono text-neutral-400 shadow-lg">
          <Icon icon="solar:cursor-bold" width="14" class="text-cyan-400" />
          <span class="hidden sm:inline"
            >Drag to pan &bull; Scroll to zoom &bull; Click to scan</span
          >
          <span class="sm:hidden">Explore Orbit</span>
        </div>
      </div>
    </div>
  </header>
</template>
