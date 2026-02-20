<template>
  <div class="home">
    <!-- Hero card -->
    <div class="hero-card glass-card">
      <div class="badge">Culture générale</div>

      <h1 class="hero-title">
        Testez vos<br />
        <span class="gradient-text">connaissances</span>
      </h1>

      <p class="hero-subtitle">
        50 questions soigneusement sélectionnées à travers la géographie,
        les sciences, l'histoire, les arts et bien plus encore.
      </p>

      <!-- Stats row -->
      <div class="stats-row">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>

      <!-- Categories preview -->
      <div class="categories-row">
        <span
          class="cat-chip"
          v-for="cat in categories"
          :key="cat.name"
          :style="{ '--chip-color': cat.color }"
        >
          {{ cat.icon }} {{ cat.name }}
        </span>
      </div>

      <!-- CTA -->
      <button class="cta-btn" @click="startQuiz">
        <span>Commencer le quiz</span>
        <span class="cta-arrow">→</span>
      </button>
    </div>

    <!-- Floating decorative cards -->
    <div class="deco-cards">
      <div class="deco-card deco-card-1 glass-card-sm">
        <span class="deco-icon">🌍</span>
        <span>Géographie</span>
      </div>
      <div class="deco-card deco-card-2 glass-card-sm">
        <span class="deco-icon">🔬</span>
        <span>Sciences</span>
      </div>
      <div class="deco-card deco-card-3 glass-card-sm">
        <span class="deco-icon">🏛️</span>
        <span>Histoire</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { quizStore } from '../store/quiz.js';

const router = useRouter();

const stats = [
  { value: '50', label: 'Questions' },
  { value: '7', label: 'Catégories' },
  { value: '∞', label: 'Tentatives' },
];

const categories = [
  { name: 'Géographie', icon: '🌍', color: '#2563eb' },
  { name: 'Sciences',   icon: '🔬', color: '#7c3aed' },
  { name: 'Histoire',   icon: '🏛️', color: '#db2777' },
  { name: 'Arts',       icon: '🎨', color: '#f59e0b' },
  { name: 'Sport',      icon: '⚽', color: '#10b981' },
  { name: 'Techno',     icon: '💻', color: '#6366f1' },
];

function startQuiz() {
  quizStore.start();
  router.push('/quiz');
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 90px);
  padding: 24px 16px;
  position: relative;
}

/* ── Glass card mixin ── */
.glass-card {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-card-sm {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

/* ── Hero card ── */
.hero-card {
  width: 100%;
  max-width: 560px;
  padding: 48px 48px 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(37, 99, 235, 0.3));
  border: 1px solid rgba(124, 58, 237, 0.4);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #a78bfa;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.6);
  max-width: 420px;
}

/* ── Stats ── */
.stats-row {
  display: flex;
  gap: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
}

.stat-item {
  flex: 1;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #a78bfa, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* ── Categories ── */
.categories-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.cat-chip {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.cat-chip:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* ── CTA button ── */
.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #7c3aed 0%, #2563eb 60%, #db2777 100%);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s;
  box-shadow: 0 4px 24px rgba(124, 58, 237, 0.45);
  letter-spacing: 0.2px;
  width: 100%;
  justify-content: center;
}

.cta-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 36px rgba(124, 58, 237, 0.55);
}

.cta-btn:active {
  transform: scale(0.98);
}

.cta-arrow {
  font-size: 18px;
  transition: transform 0.2s;
}

.cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}

/* ── Decorative floating cards ── */
.deco-cards {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.deco-card {
  position: absolute;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  animation: float 6s ease-in-out infinite;
}

.deco-card-1 {
  top: 15%;
  left: max(16px, calc(50% - 400px));
  animation-delay: 0s;
}

.deco-card-2 {
  top: 35%;
  right: max(16px, calc(50% - 400px));
  animation-delay: -2s;
}

.deco-card-3 {
  bottom: 20%;
  left: max(16px, calc(50% - 380px));
  animation-delay: -4s;
}

.deco-icon {
  font-size: 20px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

@media (max-width: 640px) {
  .hero-card {
    padding: 32px 24px;
  }

  .deco-cards {
    display: none;
  }
}
</style>
