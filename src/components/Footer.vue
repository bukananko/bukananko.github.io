<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <footer
    class="flex justify-between flex-col-reverse md:flex-row gap-4 items-center px-5 lg:px-40 py-5 dark:bg-dark dark:text-white">
    <p class="font-extrabold text-sm">
      &copy; {{ new Date().getFullYear() }} bukananko
    </p>

    <div class="flex gap-5">
      <a href="https://github.com/bukananko" target="_blank">
        <Icon icon="mdi:github" width="35" />
      </a>
      <a
        href="mailto:ankoo890@gmail.com"
        target="_blank"
        class="flex gap-5 items-center">
        <Icon icon="logos:google-gmail" width="35" />
      </a>
    </div>
  </footer>
</template>
