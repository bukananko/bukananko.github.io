<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { projectList } from "@/constant";
</script>

<template>
  <section id="projects" class="py-20">
    <h1 class="text-blue-500 font-extrabold text-lg">PROJECTS</h1>
    <p class="text-xl md:text-2xl font-extrabold">
      Each Project is a unique piece of development 🧩
    </p>

    <ul class="space-y-20 mt-10">
      <li
        v-for="(project, i) in projectList"
        :key="i"
        class="flex flex-col md:flex-row gap-10 md:gap-20 md:even:flex-row-reverse">
        <div class="md:w-3/5">
          <img
            :src="project.img"
            :alt="project.title"
            width="500"
            height="500"
            loading="lazy"
            class="aspect-video rounded-md drop-shadow-2xl shadow-xl shadow-black/40 dark:shadow-white/10 object-cover" />
        </div>

        <div class="md:w-2/5 flex flex-col justify-center text-center gap-4">
          <h1 class="text-xl font-extrabold">{{ project.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400">{{ project.desc }}</p>

          <div class="flex justify-center gap-3">
            <Icon
              v-for="(tech, i) in project.techs"
              :icon="tech"
              :key="i"
              width="35" />
          </div>

          <div class="flex gap-5 mt-5 justify-center">
            <a
              :href="project.web"
              target="_blank"
              class="flex gap-1 items-center hover:text-blue-500">
              Live Demo
              <Icon
                icon="heroicons:arrow-top-right-on-square-16-solid"
                width="30" />
            </a>
            <a
              :href="project.github"
              target="_blank"
              class="flex items-center gap-1 hover:text-gray-500">
              Code
              <Icon icon="mdi:github" width="30" />
            </a>
          </div>
          <hr class="border border-black/20 dark:border-white/20" />
        </div>
      </li>
    </ul>
  </section>
</template>
