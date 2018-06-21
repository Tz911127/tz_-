<template>
  <div>
    <div class="img">
         <div style="padding:6vh;text-align: left;">
           <img src="../../common/img/logo.png" alt="">
         </div>
       </div>
     <div class="icon clearfix">
        <div class="a1"></div>
    </div>
    <div class="back">
            <button>返回</button>
        </div>
    </div>
</template>
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
.icon {
  width: 49%;
  height: 50vh;
  margin: 0 auto;
}
.img {
  height: 20vh;
}
.img img {
  width: 33vh;
  height: 12vh;
}
.a1 {
  margin-left: 12px;
  margin-top: 8px;
  background: url("../../common/img/a1.png") no-repeat;
  background-size: contain;
  width: 600px;
  height: 300px;
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
  content: '';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
.clearfix {
  zoom: 1;
}
</style>