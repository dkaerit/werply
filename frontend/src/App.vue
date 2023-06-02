<script setup lang="ts">

</script>

<template>
<div>
  <header>
    <a href="#" class="logo">Logo</a>
    <ul id="nav">
      <li><router-link to="/login" class-active="active">Login</router-link></li>
      <li><router-link to="/essentials" class-active="active">Essentials</router-link></li>
    </ul>
  </header>
  <router-view/>
</div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

html:focus-within {
  scroll-behavior: smooth;
}

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  //background: #0c2433;
  background: #0c0f11;
  //background: black;
}

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 6;

  .logo {
    color: #fff;
    font-weight:700;
    text-decoration: none;
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      list-style: none;
      margin-left: 20px;

      a {
        text-decoration: none;
        padding: 6px 15px;
        color: #fff;
        border-radius: 20px;
      }

      a:hover, a.router-link-active.router-link-exact-active {
        background: #fff;
        color: #0c2433;
      }
    }
  }
}

/*
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}*/
</style>
