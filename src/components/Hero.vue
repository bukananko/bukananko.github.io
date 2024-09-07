<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <section class="flex flex-col justify-center min-h-screen">
    <div class="md:flex">
      <div class="flex-1 mt-3 md:mt-0 flex flex-col justify-center gap-5">
        <h1 class="font-extrabold text-3xl md:text-5xl">
          Hi, I'm Anko
          <br />
          <span
            class="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Front-End Developer
          </span>
        </h1>

        <p class="text-gray-500 dark:text-gray-400 mr-10">
          I'm interested with the modern web development. I build app using on
          demand technologies such as Vue JS, React JS, Next JS and Tailwind
          CSS. Feel free to contact me :)
        </p>

        <div class="flex flex-wrap gap-5 md:gap-10">
          <a
            href="mailto:ankoo890@gmail.com"
            target="_blank"
            class="flex gap-2 items-center group py-2 px-3 bg-black/10 dark:bg-white/10 rounded-md w-max hover:bg-black/20 dark:hover:bg-white/20">
            <Icon icon="logos:google-gmail" width="35" />
            <p class="font-extrabold">Email</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
