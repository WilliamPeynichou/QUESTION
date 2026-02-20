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

      <!-- Categories -->
      <div class="categories-row">
        <span
          class="cat-chip"
          v-for="cat in categories"
          :key="cat.name"
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
  { value: '7',  label: 'Catégories' },
  { value: '∞',  label: 'Tentatives' },
];

const categories = [
  { name: 'Géographie', icon: '🌍' },
  { name: 'Sciences',   icon: '🔬' },
  { name: 'Histoire',   icon: '🏛️' },
  { name: 'Arts',       icon: '🎨' },
  { name: 'Sport',      icon: '⚽' },
  { name: 'Techno',     icon: '💻' },
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

/* ── Glass cards ── */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  box-shadow:
    0 4px 32px rgba(99, 102, 241, 0.07),
    0 1px 0 rgba(255, 255, 255, 0.9) inset;
}

.glass-card-sm {
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(99, 102, 241, 0.06);
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
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1));
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #6d28d9;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  color: #1e1b4b;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: rgba(30, 27, 75, 0.52);
  max-width: 420px;
}

/* ── Stats ── */
.stats-row {
  display: flex;
  width: 100%;
  background: rgba(99, 102, 241, 0.04);
  border: 1px solid rgba(99, 102, 241, 0.1);
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
  border-right: 1px solid rgba(99, 102, 241, 0.08);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(30, 27, 75, 0.4);
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
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(30, 27, 75, 0.65);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.cat-chip:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.2);
  color: #4c1d95;
  transform: translateY(-2px);
}

/* ── CTA ── */
.cta-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 60%, #ec4899 100%);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.28);
  letter-spacing: 0.2px;
  width: 100%;
  justify-content: center;
}

.cta-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 28px rgba(124, 58, 237, 0.38);
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

/* ── Decorative cards ── */
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
  color: rgba(30, 27, 75, 0.6);
  animation: float 6s ease-in-out infinite;
}

.deco-card-1 { top: 15%;    left:  max(16px, calc(50% - 400px)); animation-delay: 0s; }
.deco-card-2 { top: 35%;    right: max(16px, calc(50% - 400px)); animation-delay: -2s; }
.deco-card-3 { bottom: 20%; left:  max(16px, calc(50% - 380px)); animation-delay: -4s; }

.deco-icon { font-size: 20px; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

@media (max-width: 640px) {
  .hero-card  { padding: 32px 24px; }
  .deco-cards { display: none; }
}
</style>
