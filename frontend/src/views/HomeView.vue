<template>
  <div class="home">
    <h1>Bienvenue</h1>
    <p>Application Vue.js + Express</p>
    <button @click="fetchHello" :disabled="loading">
      {{ loading ? 'Chargement...' : 'Appeler l\'API' }}
    </button>
    <p v-if="message" class="message">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const message = ref('');
const error = ref('');
const loading = ref(false);

async function fetchHello() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await axios.get('/api/hello');
    message.value = data.message;
  } catch (e) {
    error.value = 'Erreur lors de la connexion au serveur.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px;
}

h1 {
  font-size: 2rem;
  color: #42b883;
  margin-bottom: 12px;
}

button {
  margin-top: 20px;
  padding: 10px 24px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 16px;
  color: #35495e;
  font-size: 1.1rem;
}

.error {
  margin-top: 16px;
  color: #e74c3c;
}
</style>
