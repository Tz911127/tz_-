<template>
  <div class="box">
    <div class="block">
    <el-carousel>
      <el-carousel-item v-for="(item,index) in imgArray" :key="index">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>
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
}
body {
  background: url("../../common/img/bg.jpg") no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  position: relative;
}
.block {
  margin: 0 auto;
  background: url("../../common/img/all_bg.png") no-repeat;
  background-size: contain;
  width: 617px;
  height: 327px;
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
.el-carousel__container {
  margin-left: 12px;
  margin-top: 8px;
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
</style>

