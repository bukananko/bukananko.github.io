<script setup lang="ts">
import logo from '@/assets/logo.webp';
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
  <nav class="py-3 px-5 lg:px-20 xl:px-40 flex justify-between fixed right-0 left-0 top-0 z-50 mb-10 container mx-auto">
    <a href="#" class="text-xl font-extrabold">
      <img :src="logo" alt="ai" width="40" height="40" loading="lazy" class="hover:scale-125 duration-300 transition-all" />
    </a>

    <ul class="flex justify-center items-center gap-5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-neutral-900/50">
      <li class="hover:text-blue-500 transition-colors font-bold text-neutral-800 dark:text-neutral-200">
        <a href="#skills">Skills</a>
      </li>
      <hr class="h-5 border-l border-neutral-300 dark:border-neutral-700" />
      <li class="hover:text-blue-500 transition-colors font-bold text-neutral-800 dark:text-neutral-200">
        <a href="#projects">Projects</a>
      </li>
    </ul>
    <ThemeToggle />
  </nav>
</template>
