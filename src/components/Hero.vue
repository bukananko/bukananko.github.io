<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AutoTyperVue } from 'auto-typer-vue3';

const text = ['Front-End Developer', 'Back-End Developer', 'Full-Stack Developer?', 'Web Developer?', 'Software Developer?'];
</script>

<template>
  <section class="flex flex-col justify-center min-h-screen">
    <div class="md:flex">
      <div class="flex-1 mt-3 md:mt-0 flex flex-col justify-center gap-5">
        <h1 class="font-extrabold text-3xl md:text-5xl">
          Hi, I'm Anko
          <br />
          <AutoTyperVue class="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent cursor border-r dark:border-r-white border-r-black" componentTag="span" :text="text" />
        </h1>

        <p class="text-gray-500 dark:text-gray-400 mr-10">I'm interested with the modern web development. I build app using on demand technologies such as Vue JS, React JS, Next JS, Svelte/Kit and Tailwind CSS. Feel free to contact me :)</p>

        <div class="flex flex-wrap gap-5">
          <a href="mailto:ankoo890@gmail.com" target="_blank" class="flex gap-2 items-center group py-2 px-3 bg-black/5 dark:bg-white/10 rounded-md w-max hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 duration-300 transition-all">
            <Icon icon="logos:google-gmail" width="35" />
            <p class="font-extrabold">Email</p>
          </a>
          <a href="https://wa.me/6285183311414" target="_blank" class="flex gap-2 items-center group py-2 px-3 bg-black/5 dark:bg-white/10 rounded-md w-max hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 duration-300 transition-all">
            <Icon icon="ic:baseline-whatsapp" width="35" class="text-green-500" />
            <p class="font-extrabold">WhatsApp</p>
          </a>
          <a href="https://linkedin.com/in/angkomj" target="_blank" class="flex gap-2 items-center group py-2 px-3 bg-black/5 dark:bg-white/10 rounded-md w-max hover:bg-black/10 dark:hover:bg-white/15 hover:scale-105 duration-300 transition-all">
            <Icon icon="uil:linkedin" width="35" class="text-blue-500" />
            <p class="font-extrabold">LinkedIn</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
