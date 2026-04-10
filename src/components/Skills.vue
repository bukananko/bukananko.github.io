<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { skills } from '@/constant';
</script>

<template>
  <section id="skills" class="min-h-screen text-center flex flex-col justify-center py-20">
    <h1 class="text-blue-500 font-extrabold text-lg tracking-wider">SKILLS</h1>
    <p class="text-xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">List of the technologies that I've use ⚙️</p>

    <div class="flex flex-wrap items-center justify-center gap-4 w-full mt-10">
      <div v-for="(skill, i) in skills" :key="i" class="flex gap-3 items-center py-2.5 px-4 bg-neutral-100 dark:bg-neutral-800 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl w-max hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-110 duration-300 transition-all shadow-sm group flex-1 min-w-fit justify-center">
        <Icon :icon="skill.icon" width="30" class="group-hover:scale-110 transition-transform" />
        <p class="font-medium text-neutral-800 dark:text-neutral-200">{{ skill.title }}</p>
      </div>
    </div>
  </section>
</template>
