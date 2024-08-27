<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { skillList } from "@/constant";
</script>

<template>
  <section id="skills" class="min-h-screen flex flex-col justify-center">
    <h1 class="text-blue-500 font-extrabold text-lg">SKILLS</h1>
    <p class="text-xl md:text-2xl font-extrabold">
      List of the technologies that I've use ⚙️
    </p>

    <div class="flex flex-wrap gap-2 w-full mt-10">
      <div
        v-for="(skill, i) in skillList"
        :key="i"
        class="flex gap-2 items-center py-2 px-3 bg-black/10 dark:bg-white/10 rounded-md w-max hover:bg-black/20 dark:hover:bg-white/20">
        <Icon :icon="skill.icon" width="35" />
        <p>{{ skill.title }}</p>
      </div>
    </div>
  </section>
</template>
