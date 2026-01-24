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
    }
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
  <section id="projects" class="py-20">
    <h1 class="text-blue-500 font-extrabold text-lg">PROJECTS</h1>
    <p class="text-xl md:text-2xl font-extrabold">Each Project is a unique piece of development 🧩</p>

    <ul class="space-y-20 mt-10">
      <li v-for="(project, i) in projects" :key="i" :class="i % 2 === 0 ? 'md:grid-cols-[1fr_0.7fr]' : 'md:grid-cols-[0.7fr_1fr]'" class="grid place-items-center gap-10">
        <div :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'">
          <img :ref="(el) => setImageRef(el, i)" :data-src="project.img" :data-index="i" :alt="project.title" width="500" height="500" :class="['aspect-video rounded-xl drop-shadow-2xl shadow-xl shadow-black/40 dark:shadow-white/10 object-cover transition-opacity duration-500 w-full', loadedImages.has(i) ? 'opacity-100' : 'opacity-0 blur-sm', i % 2 === 0 ? '' : 'ml-auto']" style="background: #000" />
        </div>

        <div :class="i % 2 === 0 ? 'md:order-2' : 'md:order-1'" class="text-center grid gap-4">
          <h1 class="text-xl font-extrabold">{{ project.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400">{{ project.desc }}</p>

          <div class="flex items-center justify-center gap-3">
            <div v-for="(tech, i) in getTechIcons(project)" :key="i" class="tooltip" :data-tip="tech?.title">
              <Icon :icon="tech?.icon" width="35" class="hover:scale-125 duration-300 transition-all" />
            </div>
          </div>

          <div class="flex gap-5 mt-7 items-center justify-center">
            <a :href="project.web" target="_blank" class="flex gap-1 items-center hover:text-blue-500">
              Live Demo
              <Icon icon="ci:external-link" width="25" />
            </a>
            <a :href="project.github" target="_blank" class="flex items-center gap-1 hover:text-gray-500">
              Code
              <Icon icon="mdi:github" width="25" />
            </a>
          </div>
          <hr class="border border-black/20 dark:border-white/20" />
        </div>
      </li>
    </ul>
  </section>
</template>
