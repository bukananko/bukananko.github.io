<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { type Project, projects, type Skill, skills } from '@/constant';

// Track which images have been loaded
const loadedImages = ref<Set<number>>(new Set());
const imageRefs = ref<HTMLImageElement[]>([]);

// IntersectionObserver instance
let observer: IntersectionObserver | null = null;

// Setup IntersectionObserver on mount
onMounted(() => {
  // Create observer with optimized options
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const index = parseInt(img.dataset.index || '0');

          // Load the image
          if (!loadedImages.value.has(index)) {
            const actualSrc = img.dataset.src;
            if (actualSrc) {
              img.src = actualSrc;
              loadedImages.value.add(index);

              // Stop observing this image once loaded
              observer?.unobserve(img);
            }
          }
        }
      });
    },
    {
      // Start loading 200px before image enters viewport
      rootMargin: '200px',
      // Trigger when at least 10% of image is visible
      threshold: 0.1,
    },
  );

  // Observe all image elements
  imageRefs.value.forEach((img) => {
    if (img) observer?.observe(img);
  });
});

// Cleanup observer on unmount
onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

// Set ref for each image
const setImageRef = (el: any, index: number) => {
  if (el && el instanceof HTMLImageElement) {
    imageRefs.value[index] = el;
  }
};

const getTechIcons = (project: Project): Skill[] => {
  return project.techs.map((key) => skills.find((skill) => skill.key === key)).filter((skill) => skill !== undefined);
};
</script>

<template>
  <section id="projects" class="py-20 text-center">
    <h1 class="text-blue-500 font-extrabold text-lg tracking-wider">PROJECTS</h1>
    <p class="text-xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">Each Project is a unique piece of development 🧩</p>

    <ul class="space-y-20 mt-10">
      <li v-for="(project, i) in projects" :key="i" :class="i % 2 === 0 ? 'md:grid-cols-[1fr_0.7fr] lg:grid-cols-[1.1fr_0.8fr]' : 'md:grid-cols-[0.7fr_1fr] lg:grid-cols-[0.8fr_1.1fr]'" class="grid place-items-center gap-5 lg:gap-10">
        <div :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'" class="w-full">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img :ref="(el) => setImageRef(el, i)" :data-src="project.img" :data-index="i" :alt="project.title" width="600" height="400" :class="['relative aspect-video rounded-xl shadow-2xl shadow-black/20 dark:shadow-white/5 object-cover transition-all duration-700 w-full', loadedImages.has(i) ? 'opacity-100' : 'opacity-0 blur-lg', i % 2 === 0 ? '' : 'ml-auto']" />
          </div>
        </div>

        <div :class="i % 2 === 0 ? 'md:order-2' : 'md:order-1'" class="text-center grid gap-4 border-b dark:border-b-gray-500 border-b-gray-400 pb-5">
          <h2 class="text-xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight max-md:mt-5">{{ project.title }}</h2>
          <p class="text-neutral-600 dark:text-neutral-400 text-lg">{{ project.desc }}</p>

          <div class="flex items-center justify-center gap-3">
            <div v-for="(tech, i) in getTechIcons(project)" :key="i" class="tooltip rounded-lg shadow-sm" :data-tip="tech?.title">
              <Icon :icon="tech?.icon" width="35" class="hover:scale-125 duration-300 transition-all text-neutral-700 dark:text-neutral-300" />
            </div>
          </div>

          <div class="flex gap-5 mt-2 items-center justify-center">
            <a :href="project.web" target="_blank" class="flex gap-1 items-center font-bold text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
              Live Demo
              <Icon icon="solar:link-linear" width="20" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a :href="project.github" target="_blank" class="flex items-center gap-2 font-bold text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors group">
              Source Code
              <Icon icon="solar:code-bold" width="22" class="group-hover:scale-125 transition-transform" />
            </a>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
