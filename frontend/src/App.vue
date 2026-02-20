<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  padding: 16px 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #ddd;
}

nav a {
  color: #42b883;
  text-decoration: none;
  margin-right: 12px;
  font-weight: bold;
}

nav a.router-link-active {
  color: #35495e;
}
</style>
