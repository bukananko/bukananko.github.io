<script setup lang="ts">
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import SolarSystemCanvas from './components/SolarSystemCanvas.vue';
import TelemetryModal from './components/TelemetryModal.vue';
import MissionControlHUD from './components/MissionControlHUD.vue';
import { type CelestialBody, solarSystemBodies } from './constant';

const canvasRef = ref<InstanceType<typeof SolarSystemCanvas> | null>(null);
const selectedBody = ref<CelestialBody | null>(null);
const isModalOpen = ref(false);
const orbitSpeedMultiplier = ref(1);

// Handle body selection from canvas or HUD
const onSelectBody = (body: CelestialBody | null) => {
  selectedBody.value = body;
  if (body) {
    isModalOpen.value = true;
  } else {
    isModalOpen.value = false;
  }
};

// Close telemetry dossier and recenter camera to Sun
const onCloseModal = () => {
  isModalOpen.value = false;
  selectedBody.value = null;
  canvasRef.value?.resetView();
};

// Recenter canvas camera
const onResetView = () => {
  selectedBody.value = null;
  canvasRef.value?.resetView();
};

const onZoomIn = () => {
  canvasRef.value?.zoomIn();
};

const onZoomOut = () => {
  canvasRef.value?.zoomOut();
};

// Cycle orbit speeds: 1x -> 2x -> 0x (pause) -> 1x
const onToggleSpeed = () => {
  if (orbitSpeedMultiplier.value === 1) {
    orbitSpeedMultiplier.value = 2;
  } else if (orbitSpeedMultiplier.value === 2) {
    orbitSpeedMultiplier.value = 0;
  } else {
    orbitSpeedMultiplier.value = 1;
  }
};

// Navbar quick navigation
const onNavbarNavigate = (target: 'sun' | 'skills' | 'projects') => {
  if (target === 'sun') {
    const sun = solarSystemBodies.find((b) => b.id === 'sun');
    if (sun) onSelectBody(sun);
  } else if (target === 'skills') {
    const skillsPlanet = solarSystemBodies.find((b) => b.id === 'skills');
    if (skillsPlanet) onSelectBody(skillsPlanet);
  } else if (target === 'projects') {
    const firstProject = solarSystemBodies.find((b) => b.type === 'project');
    if (firstProject) onSelectBody(firstProject);
  }
};
</script>

<template>
  <div class="relative w-full h-screen font-mono text-white overflow-hidden bg-[#02040a] select-none">
    <!-- Navbar Header -->
    <Navbar @navigate="onNavbarNavigate" />

    <!-- INTERACTIVE SOLAR SYSTEM CANVAS (FULLSCREEN PURE EXPERIENCE) -->
    <main class="fixed inset-0 w-screen h-screen z-0 overflow-hidden">
      <SolarSystemCanvas
        ref="canvasRef"
        :orbit-speed-multiplier="orbitSpeedMultiplier"
        :selected-body-id="selectedBody?.id"
        :is-panel-open="isModalOpen"
        @select="onSelectBody"
        @unselect="onCloseModal"
      />
    </main>

    <!-- Mission Control Bottom HUD -->
    <MissionControlHUD
      :orbit-speed-multiplier="orbitSpeedMultiplier"
      @reset-view="onResetView"
      @toggle-speed="onToggleSpeed"
      @zoom-in="onZoomIn"
      @zoom-out="onZoomOut"
    />

    <!-- Telemetry Modal / Mission Dossier -->
    <TelemetryModal
      :body="selectedBody"
      :is-open="isModalOpen"
      @close="onCloseModal"
      @select="onSelectBody"
    />
  </div>
</template>
