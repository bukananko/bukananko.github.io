<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import SolarSystemCanvas from './components/SolarSystemCanvas.vue';
import TelemetryModal from './components/TelemetryModal.vue';
import MissionControlHUD from './components/MissionControlHUD.vue';
import RocketGameHUD from './components/RocketGameHUD.vue';
import { type CelestialBody, solarSystemBodies } from './constant';
import type { RocketGameState } from './space/systems/rocketGame';

const canvasRef = ref<InstanceType<typeof SolarSystemCanvas> | null>(null);
const selectedBody = ref<CelestialBody | null>(null);
const isModalOpen = ref(false);
const orbitSpeedMultiplier = ref(1);

// Rocket Flight Exploration Game State (Desktop Only)
const isRocketMode = ref(false);
const rocketState = ref<RocketGameState | null>(null);

// Toggle Rocket Pilot Exploration Mode
const onToggleRocket = () => {
  if (window.innerWidth < 768) return; // Desktop only

  if (isRocketMode.value) {
    canvasRef.value?.stopRocketMode();
    isRocketMode.value = false;
  } else {
    isModalOpen.value = false;
    selectedBody.value = null;
    canvasRef.value?.startRocketMode();
    isRocketMode.value = true;
  }
};

const onRocketExit = () => {
  isRocketMode.value = false;
};

const onRocketStateUpdate = (state: RocketGameState) => {
  rocketState.value = state;
};

// Global Hotkey for Rocket Mode [R] (Desktop only, when not in text input or modal)
const onGlobalKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'KeyR' && !isModalOpen.value && window.innerWidth >= 768) {
    const target = e.target as HTMLElement | null;
    if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
    onToggleRocket();
  }
};

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onGlobalKeyDown);
});

// Handle body selection from canvas or HUD
const onSelectBody = (body: CelestialBody | null) => {
  selectedBody.value = body;
  if (body) {
    isModalOpen.value = true;
  } else {
    isModalOpen.value = false;
  }
};

// Close telemetry dossier and recenter camera to Sun, or return back to rocket
const onCloseModal = () => {
  isModalOpen.value = false;
  selectedBody.value = null;
  if (isRocketMode.value) {
    canvasRef.value?.returnToRocket();
  } else {
    canvasRef.value?.resetView();
  }
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
    <!-- Navbar Header (Hidden in Rocket Mode for cockpit immersion) -->
    <Navbar v-if="!isRocketMode" @navigate="onNavbarNavigate" />

    <!-- INTERACTIVE SOLAR SYSTEM CANVAS (FULLSCREEN PURE EXPERIENCE) -->
    <main class="fixed inset-0 w-screen h-screen z-0 overflow-hidden">
      <SolarSystemCanvas
        ref="canvasRef"
        :orbit-speed-multiplier="orbitSpeedMultiplier"
        :selected-body-id="selectedBody?.id"
        :is-panel-open="isModalOpen"
        @select="onSelectBody"
        @unselect="onCloseModal"
        @rocket-state="onRocketStateUpdate"
        @rocket-exit="onRocketExit"
      />
    </main>

    <!-- Pure Rocket Game Flight UI Controls (Desktop Only) -->
    <RocketGameHUD
      v-if="isRocketMode"
      class="hidden md:flex"
      :state="rocketState"
      @exit="onToggleRocket"
      @toggle-mute="canvasRef?.toggleRocketMute()"
    />

    <!-- Mission Control Bottom HUD -->
    <MissionControlHUD
      v-if="!isRocketMode"
      :orbit-speed-multiplier="orbitSpeedMultiplier"
      @toggle-rocket="onToggleRocket"
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
