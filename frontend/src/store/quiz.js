import { reactive, computed } from 'vue';
import { questions } from '../data/questions.js';

export const quizStore = reactive({
  status: 'idle',       // 'idle' | 'playing' | 'completed'
  currentQuestion: 0,
  answers: [],          // [{ selected: number, correct: boolean }]
  startTime: null,
  endTime: null,

  get score() {
    return this.answers.filter((a) => a && a.correct).length;
  },

  get percentage() {
    const answered = this.answers.filter(Boolean).length;
    if (answered === 0) return 0;
    return Math.round((this.score / answered) * 100);
  },

  get elapsedSeconds() {
    if (!this.startTime) return 0;
    const end = this.endTime || Date.now();
    return Math.round((end - this.startTime) / 1000);
  },

  get categoryBreakdown() {
    const map = {};
    questions.forEach((q, i) => {
      if (!map[q.category]) {
        map[q.category] = { name: q.category, correct: 0, total: 0 };
      }
      map[q.category].total++;
      if (this.answers[i] && this.answers[i].correct) {
        map[q.category].correct++;
      }
    });
    return Object.values(map).map((cat) => ({
      ...cat,
      percent: Math.round((cat.correct / cat.total) * 100),
    }));
  },

  start() {
    this.status = 'playing';
    this.currentQuestion = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.endTime = null;
  },

  submitAnswer(questionIndex, selectedOption) {
    const correct = questions[questionIndex].correct;
    this.answers[questionIndex] = {
      selected: selectedOption,
      correct: selectedOption === correct,
    };
  },

  next() {
    this.currentQuestion++;
  },

  complete() {
    this.status = 'completed';
    this.endTime = Date.now();
  },

  reset() {
    this.status = 'idle';
    this.currentQuestion = 0;
    this.answers = [];
    this.startTime = null;
    this.endTime = null;
  },
});
