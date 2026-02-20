<template>
  <div class="results-page">
    <div class="results-container">

      <!-- ── Main score card ── -->
      <div class="score-card glass-card">
        <!-- Ring -->
        <div class="score-ring-wrap">
          <svg class="score-ring" viewBox="0 0 120 120">
            <circle class="ring-bg"   cx="60" cy="60" r="52" />
            <circle
              class="ring-fill"
              cx="60" cy="60" r="52"
              :stroke-dasharray="`${circumference} ${circumference}`"
              :stroke-dashoffset="dashOffset"
              :stroke="ringColor"
            />
          </svg>
          <div class="score-center">
            <span class="score-number">{{ quizStore.score }}</span>
            <span class="score-denom">/50</span>
          </div>
        </div>

        <!-- Grade -->
        <div class="grade-info">
          <h1 class="grade-title">{{ grade.title }}</h1>
          <p class="grade-message">{{ grade.message }}</p>
        </div>

        <!-- Percentage -->
        <div class="pct-badge">{{ quizStore.percentage }}%</div>

        <!-- Time -->
        <div class="time-info">⏱ Terminé en {{ formatTime(quizStore.elapsedSeconds) }}</div>
      </div>

      <!-- ── Category breakdown ── -->
      <div class="breakdown-card glass-card">
        <h2 class="breakdown-title">Par catégorie</h2>
        <div class="breakdown-list">
          <div
            class="cat-row"
            v-for="cat in quizStore.categoryBreakdown"
            :key="cat.name"
          >
            <div class="cat-meta">
              <span class="cat-name">{{ cat.name }}</span>
              <span class="cat-score">{{ cat.correct }}/{{ cat.total }}</span>
            </div>
            <div class="cat-bar-track">
              <div
                class="cat-bar-fill"
                :style="{ width: cat.percent + '%', background: catColor(cat.percent) }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Actions ── -->
      <div class="actions-row">
        <button class="btn-restart" @click="restart">🔄 Recommencer</button>
        <button class="btn-home"    @click="goHome">🏠 Accueil</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { quizStore } from '../store/quiz.js';

const router = useRouter();

const circumference = 2 * Math.PI * 52;

const dashOffset = computed(() => {
  return circumference * (1 - quizStore.percentage / 100);
});

const ringColor = computed(() => {
  const p = quizStore.percentage;
  if (p >= 80) return '#10b981';
  if (p >= 50) return '#3b82f6';
  if (p >= 25) return '#f59e0b';
  return '#ef4444';
});

const grade = computed(() => {
  const p = quizStore.percentage;
  if (p === 100) return { title: 'Parfait ! 🌟',     message: 'Score parfait ! Vous êtes un génie de la culture générale.' };
  if (p >= 85)   return { title: 'Excellent ! 🏆',   message: 'Vous avez une connaissance remarquable sur tous les sujets.' };
  if (p >= 70)   return { title: 'Très bien ! 🎯',   message: 'Beau score ! Vous maîtrisez bien la culture générale.' };
  if (p >= 55)   return { title: 'Bien ! 👍',         message: 'Un bon score. Quelques révisions vous mèneront au sommet.' };
  if (p >= 40)   return { title: 'Passable 📚',       message: 'Des bases solides, mais encore des lacunes à combler.' };
  if (p >= 25)   return { title: 'Insuffisant 💪',   message: 'Courage ! La pratique régulière fera toute la différence.' };
  return           { title: 'À revoir 🌱',            message: 'Ne vous découragez pas ! Chaque tentative est un progrès.' };
});

function catColor(percent) {
  if (percent >= 80) return 'linear-gradient(90deg, #10b981, #34d399)';
  if (percent >= 50) return 'linear-gradient(90deg, #3b82f6, #93c5fd)';
  if (percent >= 25) return 'linear-gradient(90deg, #f59e0b, #fcd34d)';
  return                    'linear-gradient(90deg, #ef4444, #fca5a5)';
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  return m === 0 ? `${s}s` : `${m}min ${s % 60}s`;
}

function restart() {
  quizStore.start();
  router.push('/quiz');
}

function goHome() {
  quizStore.reset();
  router.push('/');
}
</script>

<style scoped>
/* ── Layout ── */
.results-page {
  display: flex;
  justify-content: center;
  padding: 8px 16px 32px;
}

.results-container {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ── Glass card ── */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow: 0 4px 32px rgba(99, 102, 241, 0.07), inset 0 1px 0 rgba(255,255,255,0.9);
}

/* ── Score card ── */
.score-card {
  padding: 40px 36px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

/* Ring */
.score-ring-wrap {
  position: relative;
  width: 140px;
  height: 140px;
}

.score-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(99, 102, 241, 0.08);
  stroke-width: 8;
}

.ring-fill {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease;
  filter: drop-shadow(0 0 6px currentColor);
  opacity: 0.75;
}

.score-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-number {
  font-size: 42px;
  font-weight: 900;
  color: #1e1b4b;
  line-height: 1;
  letter-spacing: -2px;
}

.score-denom {
  font-size: 14px;
  color: rgba(30, 27, 75, 0.38);
  font-weight: 600;
  margin-top: 2px;
}

/* Grade */
.grade-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grade-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e1b4b;
  letter-spacing: -0.5px;
}

.grade-message {
  font-size: 14px;
  color: rgba(30, 27, 75, 0.5);
  line-height: 1.55;
  max-width: 340px;
}

/* Percentage */
.pct-badge {
  padding: 8px 22px;
  background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(59,130,246,0.08));
  border: 1px solid rgba(124, 58, 237, 0.18);
  border-radius: 999px;
  font-size: 20px;
  font-weight: 800;
  color: #4c1d95;
}

/* Time */
.time-info {
  font-size: 13px;
  color: rgba(30, 27, 75, 0.35);
  font-weight: 500;
}

/* ── Breakdown ── */
.breakdown-card {
  padding: 28px 28px 24px;
}

.breakdown-title {
  font-size: 12px;
  font-weight: 700;
  color: rgba(30, 27, 75, 0.45);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.breakdown-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cat-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cat-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.cat-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(30, 27, 75, 0.72);
}

.cat-score {
  font-size: 12px;
  font-weight: 700;
  color: rgba(30, 27, 75, 0.4);
}

.cat-bar-track {
  height: 6px;
  background: rgba(99, 102, 241, 0.07);
  border-radius: 999px;
  overflow: hidden;
}

.cat-bar-fill {
  height: 100%;
  border-radius: 999px;
  opacity: 0.7;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Actions ── */
.actions-row {
  display: flex;
  gap: 12px;
}

.btn-restart,
.btn-home {
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-restart {
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  border: none;
  color: #fff;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.25);
}
.btn-restart:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.32);
}

.btn-home {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.95);
  color: rgba(30, 27, 75, 0.65);
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.btn-home:hover {
  background: rgba(255, 255, 255, 0.88);
  color: #1e1b4b;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
}

@media (max-width: 480px) {
  .score-card    { padding: 32px 20px 28px; }
  .breakdown-card { padding: 24px 20px; }
}
</style>
