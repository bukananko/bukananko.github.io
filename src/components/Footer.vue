<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { contacts } from '@/constant';
</script>

<template>
  <footer class="flex justify-between flex-col-reverse md:flex-row gap-2 items-center px-5 lg:px-20 xl:px-40 py-5 text-neutral-600 dark:text-neutral-400 container mx-auto">
    <p class="font-bold">&copy; 2023 - {{ new Date().getFullYear() }} bukananko</p>

    <div class="flex gap-6 items-center">
      <a v-for="(contact, i) in contacts" :key="i" :href="contact.href" target="_blank" class="hover:scale-125 transition-all duration-300 tooltip text-neutral-500 hover:text-blue-500 dark:text-neutral-500 dark:hover:text-blue-400" :data-tip="contact.title">
        <Icon :icon="contact.icon" width="30" />
      </a>
    </div>
  </footer>
</template>
