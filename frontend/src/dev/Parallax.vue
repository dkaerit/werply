<script setup lang="ts"> 
import { ref, onMounted } from 'vue'

onMounted(() => {
  let capa1 = document.getElementById('capa1');
  let capa2 = document.getElementById('capa2');
  let capa3 = document.getElementById('capa3');
  let btn = document.getElementById('btn');
  let text = document.getElementById('text');

  window.addEventListener('scroll', () => {
    let value = window.scrollY;
    //capa3.style.left = `${value*0.075}px`;
    //capa2.style.top = `${(value*-0.075)}px`;

    //let ml = text.style.marginLeft;
   // text.style.marginLeft = `${950-value*1.075}px`;
    
  });

  setTimeout(() => {
    //text.style.marginLeft = `950px`;
  }, 750);
})

</script>

<template>
  <!--<div>login</div>-->
  <div>
  <div class="dark-screen"></div>
  <section>
    <img src="/src/assets/capa 3.png" id="capa3"/>
    <img src="/src/assets/capa 2.png" id="capa2"/>
    <h2 id="text">We roleplay!</h2>
    <!--<a href="#sec" id="btn">Iniciar sesión</a>-->
    <img src="/src/assets/capa 1.png" id="capa1"/>
  </section>
  <div class="sec" id="sec">
    <h2>Ejemplo de relleno</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br/><br/>Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br/><br/>Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi reprehenderit, 
      debitis doloremque id sunt ut molestiae nobis obcaecati quo rerum illum dolorem, 
      sint error voluptatibus, repellat expedita doloribus necessitatibus cupiditate.</p>
  </div>
  </div>
</template>

<style scoped lang="scss">
  section {
    position: relative;
    width: 100%;
    height: 100vh;
    padding: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100px;
      //background: linear-gradient(to top, #08121a, transparent);
      z-index: 5;
    }

    #text {
      position: absolute;
      color: #fff;
      white-space: nowrap;
      font-size: 7vw;
      z-index: 3;
      transform: translateY(-20px);
      left: -540px;
      transition: 0.45s ease-in-out;
      //font-size: 1.5em;
    }

    #btn {
      text-decoration: none;
      padding: 8px 30px;
      border-radius: 40px;
      background: #fff;
      color: #187062;
      font-size: 1em;
      transform: translate(-30px, 20px);
      font-weight: 500;
      z-index: 3;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      object-fit: cover;
      pointer-events: none;

      &#capa2 {
        height: 126vh;
        //top: -25px;
        transition: 0.05s ease-in;
        z-index: 2;
      }

      &#capa1 {
        transition: 0.051s ease-in;
        z-index: 4;
      }
    }
  }

  .sec {
    position: relative;
    padding: 0px 100px 100px 100px;
    background: #08121a;
    color: #fff;

    h2 {
      font-size: 3.5em;
    }

    p {
      font-size: 1em;
    }
  }
</style>
