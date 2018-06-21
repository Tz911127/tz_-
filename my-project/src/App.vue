<template>
  <div id="app">
   
    <!-- <img src="./common/img/bg.jpg"> -->
    
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: "top"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  line-height: 60px;
  /* margin-top: 60px; */
  
}
</style>
