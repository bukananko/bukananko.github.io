<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { contacts } from '@/constant';
</script>

<template>
  <footer class="flex flex-col sm:flex-row justify-between gap-4 items-center px-6 lg:px-20 xl:px-40 py-8 text-neutral-600 dark:text-neutral-400 container mx-auto border-t border-neutral-200/80 dark:border-white/10 text-xs font-mono">
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
      <p class="font-semibold">&copy; 2023 - {{ new Date().getFullYear() }} BUKANANKO // SOLAR OBSERVATORY</p>
    </div>

    <div class="flex gap-4 items-center">
      <a
        v-for="(contact, i) in contacts"
        :key="i"
        :href="contact.href"
        target="_blank"
        class="p-2 rounded-xl cosmic-glass hover:text-cyan-500 dark:hover:text-cyan-400 transition-all hover:scale-110"
        :title="contact.title"
      >
        <Icon :icon="contact.icon" width="20" />
      </a>
    </div>
  </footer>
</template>
