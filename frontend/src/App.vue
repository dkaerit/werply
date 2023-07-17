<script setup lang="ts">

</script>

<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800&display=swap');

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  color-scheme: dark;
  //color: rgba(255, 255, 255, 0.87);
  color:#a8aa9b;
  background-color: #050608; // d) mezcla de a y c
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  display: flex;
  align-items: stretch;
  min-width: 320px;
  min-height: 100vh;
  justify-content: center;
}

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

html {
  &:focus-within { scroll-behavior: smooth; }
} 

button {
  border-radius: 31px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  //font-size: 1em;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  min-width: max-content;
  margin: 8px 0px 8px 0px;
  cursor: pointer;
  
  transition: border-color 0.25s;
  &:hover { border-color: #64eaff; }
  &:focus, &:focus-visible { outline: 4px auto -webkit-focus-ring-color; }
  &.primary { background: rgb(255, 255, 255); color: #000; }
  &.secondary { background: transparent; border-color: rgb(83, 112, 113); color: #fff; }
}

a {
  font-weight: 300;
  color: #64eaff;
  text-decoration: inherit;
  padding: 0px 5px;
  transition: 0.5s;
  &:hover { color: #97edfa; }
}

h1 {
  color: rgb(255 255 255 / 93%);
  line-height: 1.1;
}

hr {
    border-bottom: 1px solid #292929;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
}

</style>
