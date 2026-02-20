<template>
  <div class="app-wrapper">
    <!-- ── Background gradient ── -->
    <div class="bg-gradient" />

    <!-- ── Animated liquid blobs ── -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />
    <div class="blob blob-4" />

    <!-- ── Floating navigation ── -->
    <header class="nav-wrap">
      <nav class="floating-nav">
        <div class="nav-logo" @click="goHome">
          <span class="nav-logo-icon">⬡</span>
          <span class="nav-logo-text">QuizMaster</span>
        </div>

        <div class="nav-center" v-if="quizStore.status === 'playing'">
          <div class="nav-progress-pill">
            <div
              class="nav-progress-fill"
              :style="{ width: progressPercent + '%' }"
            />
            <span class="nav-progress-label">
              {{ quizStore.currentQuestion + 1 }} / 50
            </span>
          </div>
        </div>

        <div class="nav-right">
          <template v-if="quizStore.status === 'playing'">
            <div class="nav-score-badge">
              <span class="nav-score-icon">✦</span>
              <span>{{ quizStore.score }}</span>
            </div>
          </template>
          <template v-else-if="quizStore.status === 'completed'">
            <button class="nav-btn" @click="restart">Recommencer</button>
          </template>
          <template v-else>
            <span class="nav-tagline">50 questions · Culture générale</span>
          </template>
        </div>
      </nav>
    </header>

    <!-- ── Page content ── -->
    <main class="page-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { quizStore } from './store/quiz.js';

const router = useRouter();

const progressPercent = computed(
  () => (quizStore.currentQuestion / 50) * 100
);

function goHome() {
  if (quizStore.status !== 'idle') {
    if (confirm('Quitter le quiz ? Votre progression sera perdue.')) {
      quizStore.reset();
      router.push('/');
    }
  } else {
    router.push('/');
  }
}

function restart() {
  quizStore.reset();
  router.push('/');
}
</script>

<style scoped>
/* ── Wrapper ── */
.app-wrapper {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── Background ── */
.bg-gradient {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse at 20% 50%, #12053a 0%, #0a0a1a 60%),
    radial-gradient(ellipse at 80% 10%, #071a3a 0%, transparent 60%);
  background-color: #0a0a1a;
}

/* ── Blobs ── */
.blob {
  position: fixed;
  z-index: 1;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  will-change: border-radius, transform;
}

.blob-1 {
  width: 520px;
  height: 520px;
  top: -120px;
  left: -160px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.55) 0%, transparent 70%);
  animation: morph1 11s ease-in-out infinite;
}

.blob-2 {
  width: 460px;
  height: 460px;
  top: -80px;
  right: -120px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.5) 0%, transparent 70%);
  animation: morph2 14s ease-in-out infinite;
}

.blob-3 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: 20%;
  background: radial-gradient(circle, rgba(219, 39, 119, 0.45) 0%, transparent 70%);
  animation: morph3 9s ease-in-out infinite;
}

.blob-4 {
  width: 350px;
  height: 350px;
  bottom: 10%;
  right: 5%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 70%);
  animation: morph4 12s ease-in-out infinite;
}

@keyframes morph1 {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0); }
  33%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(20px, 15px); }
  66%       { border-radius: 50% 50% 40% 60% / 40% 70% 50% 50%; transform: translate(-10px, 25px); }
}

@keyframes morph2 {
  0%, 100% { border-radius: 40% 60% 60% 40% / 40% 30% 70% 60%; transform: translate(0, 0); }
  50%       { border-radius: 70% 30% 40% 60% / 60% 50% 40% 50%; transform: translate(-25px, 20px); }
}

@keyframes morph3 {
  0%, 100% { border-radius: 55% 45% 35% 65% / 55% 35% 65% 45%; transform: translate(0, 0); }
  40%       { border-radius: 35% 65% 55% 45% / 45% 65% 35% 55%; transform: translate(15px, -20px); }
  80%       { border-radius: 65% 35% 45% 55% / 65% 45% 55% 35%; transform: translate(-20px, 10px); }
}

@keyframes morph4 {
  0%, 100% { border-radius: 50% 50% 50% 50%; transform: translate(0, 0) scale(1); }
  50%       { border-radius: 40% 60% 55% 45% / 45% 55% 60% 40%; transform: translate(-15px, -20px) scale(1.05); }
}

/* ── Navigation ── */
.nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 18px 24px;
  pointer-events: none;
}

.floating-nav {
  pointer-events: all;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  min-width: min(760px, calc(100vw - 48px));
  max-width: 860px;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}

.nav-logo-icon {
  font-size: 20px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
}

/* Center progress */
.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-progress-pill {
  position: relative;
  width: 180px;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #2563eb, #db2777);
  border-radius: 999px;
  transition: width 0.5s ease;
  opacity: 0.7;
}

.nav-progress-label {
  position: relative;
  z-index: 1;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
}

/* Right side */
.nav-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.nav-tagline {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
  white-space: nowrap;
}

.nav-score-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(37, 99, 235, 0.3));
  border: 1px solid rgba(124, 58, 237, 0.4);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
}

.nav-score-icon {
  font-size: 10px;
  color: #a78bfa;
}

.nav-btn {
  padding: 8px 18px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.nav-btn:hover {
  opacity: 0.85;
  transform: scale(1.03);
}

/* ── Main content area ── */
.page-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding-top: 90px;
  padding-bottom: 48px;
}
</style>
