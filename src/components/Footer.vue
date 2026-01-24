<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { contacts } from '@/constant';
</script>

<template>
  <footer class="flex justify-between flex-col-reverse md:flex-row gap-4 items-center px-5 lg:px-40 py-5 dark:text-white container mx-auto">
    <p class="font-extrabold">&copy; 2023 - {{ new Date().getFullYear() }} bukananko</p>

    <div class="flex gap-5 items-center">
      <a v-for="(contact, i) in contacts" :key="i" :href="contact.href" target="_blank" class="hover:scale-110 transition-all duration-300 tooltip" :data-tip="contact.title">
        <Icon :icon="contact.icon" width="35" />
      </a>
    </div>
  </footer>
</template>
