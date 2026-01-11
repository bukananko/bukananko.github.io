<script setup lang="ts">
import logo from '@/assets/logo.webp';
</script>

<template>
  <nav class="py-3 px-5 lg:px-40 flex justify-between fixed right-0 left-0 top-0 z-50 mb-10 container mx-auto">
    <a href="#" class="text-xl font-extrabold">
      <img :src="logo" alt="ai" width="40" height="40" loading="lazy" class="hover:scale-125 duration-300 transition-all" />
    </a>

    <ul class="flex justify-center items-center gap-5 bg-white dark:bg-dark px-4 rounded-full border dark:border-white/20 shadow-md dark:shadow-white/20">
      <li class="hover:text-blue-500">
        <a href="#skills">Skills</a>
      </li>
      <hr class="h-5 border border-gray-200 dark:border-gray-700" />
      <li class="hover:text-blue-500">
        <a href="#projects">Projects</a>
      </li>
    </ul>
  </nav>
</template>
