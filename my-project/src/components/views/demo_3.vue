<template>
  
  <div>
    <div class="logo">
         <div style="padding:6vh;text-align: left;">
           <img src="../../common/img/logo.png" alt="">
         </div>
    </div>
    <div class="icon clearfix">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in imgArray" :key="index">
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="back">
            <button>返回</button>
        </div>
    </div>
</template>
<script>
import about1 from "@/common/img/about1.jpg";
import about2 from "@/common/img/about2.jpg";
import about3 from "@/common/img/about3.jpg";
import about5 from "@/common/img/about5.jpg";
export default {
  data() {
    return {
      imgArray: [
        { url: about1 },
        { url: about2 },
        { url: about3 },
        { url: about5 }
      ]
    };
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: url("../../common/img/bg.jpg") no-repeat center/cover;
  background-attachment: fixed;
}
.block {
  margin: 0 auto;
  width: 600px;
  height: 300px;
  position: absolute;
  left: 300px;
  top: 140px;
}
.block img {
  width: 600px;
  height: 300px;
  border-radius: 30px;
}
.el-carousel {
  border-radius: 30px;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: #333;
  cursor: pointer;
}
.el-carousel__indicator.is-active button {
  background: orangered;
}

.icon {
  width: 600px;
  height: 300px;
  margin: 0 auto;
}
.icon img {
  width: 600px;
  height: 300px;
  border-radius: 30px;
}
.logo {
  height: 20vh;
}
.logo img {
  width: 33vh;
  height: 12vh;
}

.back {
  position: absolute;
  bottom: 3%;
  left: 44%;
  background: url("../../common/img/back_bg.png") no-repeat;
  background-size: contain;

  text-align: center;

  line-height: 35px;
  cursor: pointer;
}
.back button {
  width: 20vh;
  height: 6vh;
  border-radius: 40px;
  font-size: 3vh;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer;
}
.clearfix:after {
  content: "";
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>

