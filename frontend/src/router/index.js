import { createRouter, createWebHistory } from 'vue-router';
import { quizStore } from '../store/quiz.js';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuestionnaireView.vue'),
    beforeEnter: (to, from, next) => {
      if (quizStore.status !== 'playing') {
        next({ name: 'home' });
      } else {
        next();
      }
    },
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../views/ResultsView.vue'),
    beforeEnter: (to, from, next) => {
      if (quizStore.status !== 'completed') {
        next({ name: 'home' });
      } else {
        next();
      }
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
