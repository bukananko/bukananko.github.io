<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { type Project, projects, type Skill, skills, solarSystemBodies } from '@/constant';

const loadedImages = ref<Set<number>>(new Set());
const imageRefs = ref<HTMLImageElement[]>([]);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const index = parseInt(img.dataset.index || '0');

          if (!loadedImages.value.has(index)) {
            const actualSrc = img.dataset.src;
            if (actualSrc) {
              img.src = actualSrc;
              loadedImages.value.add(index);
              observer?.unobserve(img);
            }
          }
        }
      });
    },
    {
      rootMargin: '200px',
      threshold: 0.1,
    },
  );

  imageRefs.value.forEach((img) => {
    if (img) observer?.observe(img);
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

const setImageRef = (el: any, index: number) => {
  if (el && el instanceof HTMLImageElement) {
    imageRefs.value[index] = el;
  }
};

const getTechIcons = (project: Project): Skill[] => {
  return project.techs
    .map((key) => skills.find((skill) => skill.key === key))
    .filter((skill): skill is Skill => skill !== undefined);
};

const getProjectPlanet = (index: number) => {
  // Planetary missions are from index 2 onwards in solarSystemBodies
  return solarSystemBodies[index + 2] || solarSystemBodies[2];
};
</script>

<template>
  <section id="projects" class="py-20 text-center">
    <div class="space-y-3 mb-12">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold cosmic-glass text-purple-600 dark:text-purple-400 border border-purple-500/30">
        <Icon icon="solar:planet-3-bold" width="16" />
        PLANETARY MISSIONS // EXPLORED WORLDS
      </div>
      <h2 class="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
        Interstellar Works & Expeditions 🧩
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
        Each project represents an engineered planetary biosphere with unique challenges and
        technological feats.
      </p>
    </div>

    <ul class="space-y-16">
      <li
        v-for="(project, i) in projects"
        :key="i"
        class="grid place-items-center gap-8 lg:gap-12 p-6 md:p-8 rounded-3xl cosmic-card"
        :class="i % 2 === 0 ? 'md:grid-cols-[1.1fr_0.9fr]' : 'md:grid-cols-[0.9fr_1.1fr]'">
        <!-- Project Preview Image -->
        <div :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'" class="w-full">
          <div
            class="relative group overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-white/10 shadow-xl">
            <div
              class="absolute -inset-1 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition duration-500"
              :style="{ backgroundColor: getProjectPlanet(i).color }"></div>
            <img
              :ref="(el) => setImageRef(el, i)"
              :data-src="project.img"
              :data-index="i"
              :alt="project.title"
              width="600"
              height="400"
              :class="[
                'relative aspect-video rounded-2xl object-cover transition-all duration-700 w-full group-hover:scale-105',
                loadedImages.has(i) ? 'opacity-100' : 'opacity-0 blur-lg',
              ]" />
          </div>
        </div>

        <!-- Project Details -->
        <div :class="i % 2 === 0 ? 'md:order-2' : 'md:order-1'" class="text-left w-full space-y-4">
          <div class="flex items-center gap-2">
            <span
              class="w-3 h-3 rounded-full shrink-0"
              :style="{
                backgroundColor: getProjectPlanet(i).color,
                boxShadow: `0 0 10px ${getProjectPlanet(i).color}`,
              }"></span>
            <span
              class="text-xs font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              MISSION // {{ getProjectPlanet(i).codeName }}
            </span>
          </div>

          <h3 class="text-2xl font-black text-neutral-900 dark:text-white">
            {{ project.title }}
          </h3>

          <p class="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
            {{ project.desc }}
          </p>

          <!-- Tech Badges -->
          <div class="flex flex-wrap items-center gap-2 pt-1">
            <div
              v-for="(tech, tIdx) in getTechIcons(project)"
              :key="tIdx"
              class="tooltip flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-neutral-200"
              :data-tip="tech.title">
              <Icon :icon="tech.icon" width="16" />
              <span>{{ tech.title }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-4 pt-3">
            <a
              :href="project.web"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-105">
              <span>Launch Mission</span>
              <Icon icon="solar:rocket-bold" width="16" />
            </a>
            <a
              :href="project.github"
              target="_blank"
              class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm cosmic-glass border border-neutral-300 dark:border-white/15 text-neutral-800 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-all hover:scale-105">
              <span>Source Code</span>
              <Icon icon="solar:code-bold" width="16" />
            </a>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
