<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

const isDark = ref(false);

const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <button @click="toggleDark" class="flex justify-center items-center gap-5 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-2 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-neutral-900/50" aria-label="Toggle Dark Mode">
    <div class="relative w-6 h-6 overflow-hidden">
      <!-- Sun Icon -->
      <Icon icon="heroicons:sun" class="absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-500 ease-in-out" :class="{ 'translate-y-0 opacity-100 rotate-0': !isDark, 'translate-y-8 opacity-0 rotate-180': isDark }" />
      <!-- Moon Icon -->
      <Icon icon="heroicons:moon" class="absolute inset-0 w-6 h-6 text-blue-500 transition-all duration-500 ease-in-out" :class="{ 'translate-y-0 opacity-100 rotate-0': isDark, '-translate-y-8 opacity-0 -rotate-180': !isDark }" />
    </div>
  </button>
</template>
