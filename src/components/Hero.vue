<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { AutoTyperVue } from 'auto-typer-vue3';
import { contacts } from '@/constant';

const text = ['Front-End Developer', 'Back-End Developer', 'Full-Stack Developer', 'Creative Web Engineer'];
</script>

<template>
  <section id="hero" class="flex flex-col text-center justify-center min-h-screen py-24">
    <div class="md:flex">
      <div class="flex-1 mt-3 md:mt-0 flex flex-col justify-center items-center gap-6">
        <!-- Cosmic Core Badge -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold cosmic-glass border border-amber-500/30 text-amber-500 dark:text-amber-400 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          SOL-ANKO // CENTRAL GRAVITATIONAL CORE
        </div>

        <h1 class="font-extrabold text-3xl md:text-6xl text-neutral-900 dark:text-white tracking-tight">
          Hi, I'm <span class="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">Anko</span>
          <br />
          <AutoTyperVue class="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent cursor border-r dark:border-r-white border-r-black" componentTag="span" :text="text" />
        </h1>

        <p class="text-neutral-700 max-w-2xl text-balance dark:text-neutral-300 leading-relaxed md:text-lg">
          Navigating modern web engineering through scalable architecture, dynamic user interfaces, and interactive creative systems. I build high-performance applications with Vue, React, Next.js, Svelte, and TypeScript.
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-2">
          <a
            v-for="(contact, i) in contacts"
            :key="i"
            :href="contact.href"
            target="_blank"
            class="flex gap-2.5 items-center px-4 py-2.5 cosmic-glass border border-neutral-200/90 dark:border-white/10 rounded-xl hover:scale-105 duration-300 transition-all shadow-md group"
          >
            <Icon :icon="contact.icon" width="24" class="group-hover:scale-110 transition-transform" />
            <span class="font-bold text-sm text-neutral-800 dark:text-neutral-200">{{ contact.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
