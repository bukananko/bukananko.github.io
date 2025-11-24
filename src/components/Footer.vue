<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <footer class="flex justify-between flex-col-reverse md:flex-row gap-4 items-center px-5 lg:px-40 py-5 dark:text-white">
    <p class="font-extrabold">&copy; {{ new Date().getFullYear() }} bukananko</p>

    <div class="flex gap-5 items-center">
      <a href="https://github.com/bukananko" target="_blank" class="hover:scale-125 transition-all duration-300">
        <Icon icon="mdi:github" width="35" />
      </a>

      <a href="mailto:ankoo890@gmail.com" target="_blank" class="hover:scale-125 transition-all duration-300">
        <Icon icon="logos:google-gmail" width="35" />
      </a>

      <a href="https://wa.me/6285183311414" target="_blank" class="hover:scale-125 transition-all duration-300">
        <Icon icon="ic:baseline-whatsapp" width="35" class="text-green-500" />
      </a>
    </div>
  </footer>
</template>
