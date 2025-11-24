<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import { projectList } from '@/constant';

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
</script>

<template>
  <section id="projects" class="py-20">
    <h1 class="text-blue-500 font-extrabold text-lg">PROJECTS</h1>
    <p class="text-xl md:text-2xl font-extrabold">Each Project is a unique piece of development 🧩</p>

    <ul class="space-y-20 mt-10">
      <li v-for="(project, i) in projectList" :key="i" class="flex flex-col md:flex-row gap-10 md:gap-20 md:even:flex-row-reverse">
        <div class="md:w-3/5">
          <img :ref="(el) => setImageRef(el, i)" :data-src="project.img" :data-index="i" :alt="project.title" width="500" height="500" :class="['aspect-video rounded-md drop-shadow-2xl shadow-xl shadow-black/40 dark:shadow-white/10 object-cover transition-opacity duration-500', loadedImages.has(i) ? 'opacity-100' : 'opacity-0 blur-sm']" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
        </div>

        <div class="md:w-2/5 flex flex-col justify-center text-center gap-4">
          <h1 class="text-xl font-extrabold">{{ project.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400">{{ project.desc }}</p>

          <div class="flex justify-center gap-3">
            <Icon v-for="(tech, i) in project.techs" :icon="tech" :key="i" width="35" class="hover:scale-125 duration-300 transition-all" />
          </div>

          <div class="flex gap-5 mt-5 justify-center">
            <a :href="project.web" target="_blank" class="flex gap-1 items-center hover:text-blue-500">
              Live Demo
              <Icon icon="heroicons:arrow-top-right-on-square-16-solid" width="30" />
            </a>
            <a :href="project.github" target="_blank" class="flex items-center gap-1 hover:text-gray-500">
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
