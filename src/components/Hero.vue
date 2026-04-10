<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AutoTyperVue } from 'auto-typer-vue3';
import { contacts } from '@/constant';

const text = ['Front-End Developer', 'Back-End Developer', 'Full-Stack Developer?', 'Web Developer?', 'Software Developer?'];
</script>

<template>
  <section class="flex flex-col text-center justify-center min-h-screen">
    <div class="md:flex">
      <div class="flex-1 mt-3 md:mt-0 flex flex-col justify-center gap-5">
        <h1 class="font-extrabold text-3xl md:text-5xl text-neutral-900 dark:text-white">
          Hi, I'm Anko
          <br />
          <AutoTyperVue class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent cursor border-r dark:border-r-white border-r-black" componentTag="span" :text="text" />
        </h1>

        <p class="text-neutral-600 text-balance dark:text-neutral-400 leading-relaxed md:text-lg">I'm interested with the modern web development. I build app using on demand technologies such as Vue JS, React JS, Next JS, Svelte/Kit and Tailwind CSS. Feel free to contact me :)</p>

        <div class="flex flex-wrap items-center justify-center gap-5 mt-4">
          <a v-for="(contact, i) in contacts" :key="i" :href="contact.href" target="_blank" class="flex gap-2 items-center group py-2.5 px-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl w-max hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 duration-300 transition-all shadow-sm">
            <Icon :icon="contact.icon" width="28" class="text-neutral-700 dark:text-neutral-300 transition-colors" />
            <p class="font-bold text-neutral-800 dark:text-neutral-200 transition-colors">{{ contact.title }}</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
