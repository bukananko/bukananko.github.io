<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Skills from "./components/Skills.vue";
import Projects from "./components/Projects.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <main class="px-5 xl:px-80 relative">
    <Hero />
    <Skills />
    <Projects />
  </main>
  <Footer />
</template>
