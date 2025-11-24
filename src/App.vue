<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import Footer from './components/Footer.vue';
import lightbg from './assets/lightbg.svg';
import darkbg from './assets/darkbg.svg';

const bgLoaded = ref(false);

onMounted(() => {
  // Lazy load background after a short delay or on scroll
  const loadBackground = () => {
    bgLoaded.value = true;
    window.removeEventListener('scroll', loadBackground);
  };

  // Load background after 500ms or on first scroll
  setTimeout(() => {
    bgLoaded.value = true;
  }, 500);

  window.addEventListener('scroll', loadBackground, { once: true, passive: true });
});
</script>

<template>
  <img v-if="bgLoaded" :src="lightbg" alt="doodle" class="fixed inset-0 w-full h-full object-cover scale-[300%] origin-center md:scale-[200%] lg:scale-100 -z-10 dark:hidden" loading="lazy" />
  <img v-if="bgLoaded" :src="darkbg" alt="doodle" class="fixed inset-0 w-full h-full object-cover scale-[300%] origin-center md:scale-[200%] lg:scale-100 -z-10 hidden dark:block" loading="lazy" />

  <Navbar />
  <main class="px-5 xl:px-80 relative">
    <Hero />
    <Skills />
    <Projects />
  </main>
  <Footer />
</template>
