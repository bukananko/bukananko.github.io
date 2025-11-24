<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import logo from '@/assets/logo.webp';

const isScroll = ref<boolean>(false);
const isActive = ref<boolean>(false);

const handleBg = () => {
  if (window.scrollY > 20) {
    isScroll.value = true;
  } else {
    isScroll.value = false;
  }
};

window.addEventListener('scroll', handleBg);
</script>

<template>
  <nav class="py-3 px-5 xl:px-40 flex justify-between fixed right-0 left-0 top-0 z-50 mb-10">
    <a href="#" class="text-xl font-extrabold">
      <img :src="logo" alt="ai" width="40" height="40" loading="lazy" class="hover:scale-125 duration-300 transition-all" />
    </a>

    <ul class="hidden md:flex justify-center items-center gap-5 bg-white dark:bg-dark px-4 rounded-full border dark:border-white/20 shadow-md dark:shadow-white/20">
      <li class="hover:text-blue-500">
        <a href="#skills">Skills</a>
      </li>
      <hr class="h-5 border border-gray-200 dark:border-gray-700" />
      <li class="hover:text-blue-500">
        <a href="#projects">Projects</a>
      </li>
    </ul>

    <button type="button" @click="isActive = !isActive" class="md:hidden bg-white dark:shadow-white/20 dark:bg-dark rounded-full p-2 border shadow-md">
      <Icon :icon="isActive ? 'radix-icons:cross-2' : 'solar:hamburger-menu-broken'" width="25" />
    </button>

    <div @click="isActive = !isActive" :class="[isActive ? 'block' : 'hidden', 'absolute top-14 bottom-0 right-0 left-0 min-h-screen']">
      <ul class="absolute right-6 flex flex-col items-center px-10 gap-7 bg-white dark:border-white/20 dark:bg-dark shadow-xl dark:shadow-white/10 py-10 rounded-xl border">
        <li class="hover:text-blue-500">
          <a href="#skills">Skills</a>
        </li>
        <li class="hover:text-blue-500">
          <a href="#projects">Projects</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
