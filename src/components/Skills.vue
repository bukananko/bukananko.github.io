<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { skills } from '@/constant';

const frontendSkills = computed(() =>
  skills.filter((s) => s.category === 'frontend' || !s.category),
);
const backendSkills = computed(() =>
  skills.filter((s) => s.category === 'backend' || s.category === 'database'),
);
</script>

<template>
  <section id="skills" class="min-h-screen text-center flex flex-col justify-center py-20">
    <div class="space-y-3">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold cosmic-glass text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
        <Icon icon="solar:planet-2-bold" width="16" />
        PLANETARY KNOWLEDGE CORE // ORB-SKILLS
      </div>
      <h2 class="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
        Engineering Propulsion Matrix ⚙️
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
        Orbital distribution of modern technologies and tools employed across missions.
      </p>
    </div>

    <!-- Inner Orbit: Frontend -->
    <div class="mt-12 text-left">
      <div
        class="flex items-center gap-2 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4 px-2">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
        Inner Orbit // Frontend Architecture
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          v-for="(skill, i) in frontendSkills"
          :key="i"
          class="flex items-center gap-3 p-3 rounded-2xl cosmic-card group cursor-default">
          <div
            class="p-2 rounded-xl bg-neutral-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
            <Icon :icon="skill.icon" width="26" />
          </div>
          <span
            class="font-bold text-xs md:text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
            {{ skill.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Outer Orbit: Backend & Database -->
    <div class="mt-8 text-left">
      <div
        class="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4 px-2">
        <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
        Outer Orbit // Backend & Distributed Stores
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          v-for="(skill, i) in backendSkills"
          :key="i"
          class="flex items-center gap-3 p-3 rounded-2xl cosmic-card group cursor-default">
          <div
            class="p-2 rounded-xl bg-neutral-100 dark:bg-white/5 group-hover:scale-110 transition-transform">
            <Icon :icon="skill.icon" width="26" />
          </div>
          <span
            class="font-bold text-xs md:text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
            {{ skill.title }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
