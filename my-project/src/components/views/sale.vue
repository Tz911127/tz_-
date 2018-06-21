
<template>
        
       <div>
          <div class="logo">
            <div style="padding:6vh;text-align: left;">
          </div>
          </div>
       
        <div class="row clearfix">
                <el-row :gutter="10">
                  <el-col :span="12"><router-link to = '/marketactions'><img src="../../common/img/dpcx.png" alt=""><p>商品活动</p></router-link>
                    </el-col>
                  <el-col :span="12"><router-link to="/brandactions"><img src="../../common/img/schd.png" alt=""><p>品牌促销</p></router-link></el-col>
                </el-row>
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
.logo {
  height: 30vh;
}

.row {
  width: 70%;
  margin: auto;
}
.row img {
  width: 35%;
  cursor: pointer;
}
.row p {
  font-size: 3vh;
  /* margin-top: 3vh; */
  color: #fff;
  cursor: pointer;
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
 