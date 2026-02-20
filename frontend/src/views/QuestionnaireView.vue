<template>
  <div class="quiz-page">
    <div class="quiz-container">

      <!-- ── Progress bar ── -->
      <div class="progress-wrap glass-card">
        <div class="progress-header">
          <span class="progress-text">
            Question <strong>{{ current + 1 }}</strong> sur <strong>50</strong>
          </span>
          <div class="progress-right">
            <span class="cat-badge">{{ q.category }}</span>
            <span class="score-inline">
              ✦ {{ quizStore.score }} bonne{{ quizStore.score > 1 ? 's' : '' }}
            </span>
          </div>
        </div>
        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            :style="{ width: ((current + 1) / 50) * 100 + '%' }"
          />
        </div>
      </div>

      <!-- ── Question card ── -->
      <transition name="question-slide" mode="out-in">
        <div class="question-card glass-card" :key="current">
          <p class="question-number">Q{{ current + 1 }}</p>
          <h2 class="question-text">{{ q.question }}</h2>
        </div>
      </transition>

      <!-- ── Options ── -->
      <transition name="question-slide" mode="out-in">
        <div class="options-grid" :key="'opts-' + current">
          <button
            v-for="(option, i) in q.options"
            :key="i"
            class="option-btn"
            :class="getOptionClass(i)"
            @click="selectOption(i)"
            :disabled="answered"
          >
            <span class="option-letter">{{ letters[i] }}</span>
            <span class="option-text">{{ option }}</span>
            <span class="option-icon" v-if="answered">
              <template v-if="i === q.correct">✓</template>
              <template v-else-if="i === selectedOption && i !== q.correct">✗</template>
            </span>
          </button>
        </div>
      </transition>

      <!-- ── Action ── -->
      <div class="action-wrap">
        <button
          class="validate-btn"
          :class="{ 'validate-btn--active': selectedOption !== null || answered }"
          :disabled="selectedOption === null && !answered"
          @click="handleAction"
        >
          <template v-if="!answered">Valider ma réponse</template>
          <template v-else-if="isLast">Voir mes résultats →</template>
          <template v-else>Question suivante →</template>
        </button>

        <transition name="fade">
          <div v-if="answered" class="feedback" :class="feedbackClass">
            <span class="feedback-icon">{{ wasCorrect ? '🎉' : '💡' }}</span>
            <span>
              {{ wasCorrect
                ? 'Bonne réponse !'
                : 'La bonne réponse était : ' + q.options[q.correct] }}
            </span>
          </div>
        </transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { questions } from '../data/questions.js';
import { quizStore } from '../store/quiz.js';

const router = useRouter();
const letters = ['A', 'B', 'C', 'D'];

const selectedOption = ref(null);
const answered      = ref(false);
const wasCorrect    = ref(false);

const current = computed(() => quizStore.currentQuestion);
const q       = computed(() => questions[current.value]);
const isLast  = computed(() => current.value === questions.length - 1);

function selectOption(i) {
  if (answered.value) return;
  selectedOption.value = i;
}

function getOptionClass(i) {
  if (!answered.value) {
    return { 'option-btn--selected': selectedOption.value === i };
  }
  if (i === q.value.correct)                            return 'option-btn--correct';
  if (i === selectedOption.value && i !== q.value.correct) return 'option-btn--wrong';
  return 'option-btn--dim';
}

const feedbackClass = computed(() =>
  wasCorrect.value ? 'feedback--correct' : 'feedback--wrong'
);

function handleAction() {
  if (!answered.value) {
    if (selectedOption.value === null) return;
    quizStore.submitAnswer(current.value, selectedOption.value);
    wasCorrect.value = selectedOption.value === q.value.correct;
    answered.value = true;
  } else {
    if (isLast.value) {
      quizStore.complete();
      router.push('/results');
    } else {
      quizStore.next();
      selectedOption.value = null;
      answered.value = false;
      wasCorrect.value = false;
    }
  }
}
</script>

<style scoped>
/* ── Layout ── */
.quiz-page {
  display: flex;
  justify-content: center;
  padding: 8px 16px;
  min-height: calc(100vh - 90px);
}

.quiz-container {
  width: 100%;
  max-width: 640px;
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
  border-radius: 20px;
  box-shadow: 0 4px 28px rgba(99, 102, 241, 0.07), inset 0 1px 0 rgba(255,255,255,0.9);
}

/* ── Progress ── */
.progress-wrap {
  padding: 18px 24px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
  flex-wrap: wrap;
}

.progress-text {
  font-size: 13px;
  color: rgba(30, 27, 75, 0.5);
  font-weight: 500;
}

.progress-text strong {
  color: #1e1b4b;
  font-weight: 700;
}

.progress-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1));
  border: 1px solid rgba(124, 58, 237, 0.2);
  color: #6d28d9;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.score-inline {
  font-size: 13px;
  font-weight: 600;
  color: rgba(30, 27, 75, 0.38);
}

.progress-bar-track {
  height: 5px;
  background: rgba(99, 102, 241, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #3b82f6, #ec4899);
  border-radius: 999px;
  transition: width 0.6s ease;
  opacity: 0.7;
}

/* ── Question card ── */
.question-card {
  padding: 32px 32px 28px;
}

.question-number {
  font-size: 12px;
  font-weight: 700;
  color: rgba(109, 40, 217, 0.6);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.question-text {
  font-size: clamp(1.05rem, 2.5vw, 1.3rem);
  font-weight: 600;
  line-height: 1.5;
  color: #1e1b4b;
}

/* ── Options ── */
.options-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 14px;
  color: rgba(30, 27, 75, 0.75);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s, color 0.2s;
  box-shadow: 0 2px 10px rgba(99, 102, 241, 0.05);
}

.option-btn:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(124, 58, 237, 0.2);
  box-shadow: 0 4px 18px rgba(99, 102, 241, 0.1);
  color: #1e1b4b;
  transform: translateY(-2px);
}

.option-btn:disabled { cursor: default; }

/* Letter bubble */
.option-letter {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.07);
  border: 1px solid rgba(99, 102, 241, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: rgba(30, 27, 75, 0.45);
  transition: background 0.2s, color 0.2s;
}

.option-text { flex: 1; line-height: 1.4; }
.option-icon { flex-shrink: 0; font-size: 16px; font-weight: 700; }

/* ── Option states ── */
.option-btn--selected {
  background: rgba(124, 58, 237, 0.08) !important;
  border-color: rgba(124, 58, 237, 0.35) !important;
  color: #4c1d95 !important;
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1), 0 4px 16px rgba(124,58,237,0.1) !important;
  transform: none !important;
}
.option-btn--selected .option-letter {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(124, 58, 237, 0.3);
  color: #7c3aed;
}

.option-btn--correct {
  background: rgba(16, 185, 129, 0.08) !important;
  border-color: rgba(16, 185, 129, 0.4) !important;
  color: #065f46 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}
.option-btn--correct .option-letter {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.3);
  color: #059669;
}

.option-btn--wrong {
  background: rgba(239, 68, 68, 0.07) !important;
  border-color: rgba(239, 68, 68, 0.35) !important;
  color: #7f1d1d !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;
}
.option-btn--wrong .option-letter {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.25);
  color: #dc2626;
}

.option-btn--dim { opacity: 0.38; }

/* ── Validate button ── */
.action-wrap {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.validate-btn {
  width: 100%;
  padding: 16px 32px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 14px;
  color: rgba(30, 27, 75, 0.3);
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: not-allowed;
  transition: all 0.25s ease;
}

.validate-btn--active {
  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 60%, #ec4899 100%);
  border-color: transparent;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.28);
}
.validate-btn--active:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(124, 58, 237, 0.38);
}
.validate-btn--active:active { transform: scale(0.98); }

/* ── Feedback ── */
.feedback {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.feedback--correct {
  background: rgba(16, 185, 129, 0.07);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #065f46;
}

.feedback--wrong {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #7f1d1d;
}

.feedback-icon { font-size: 18px; flex-shrink: 0; }

/* ── Transitions ── */
.question-slide-enter-active,
.question-slide-leave-active { transition: all 0.3s ease; }
.question-slide-enter-from   { opacity: 0; transform: translateX(24px); }
.question-slide-leave-to     { opacity: 0; transform: translateX(-24px); }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.fade-enter-from   { opacity: 0; transform: translateY(8px); }
.fade-leave-to     { opacity: 0; }

@media (max-width: 480px) {
  .question-card { padding: 24px 20px; }
}
</style>
