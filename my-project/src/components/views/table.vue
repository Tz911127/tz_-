<template>
    <div class="main">
        <h3>{{head}}</h3>
        <p style="text-align:left">{{tip}}</p>
        <ul class="clear">
            <li>
                <div class="box">
                    <div>{{name}}</div>
                    <span>{{num}}</span>
                    <span></span>
                    <div>
                        <button @click="num += 1">签到</button>
                        <button>签退</button>
                    </div>
                </div>
            </li>
           
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      head: "2018-05-09 环球港项目签到现场",
      tip: "已有成员8人",
      name: "姓名",
      num: 1,
      items: [
          {name :'姓名',}
      ]
    };
  },
  methods: {
    handleChange: function(num) {
      num += 1;
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  background: #f5f8fa;
}
.main {
  padding: 30px 100px;
  width: 960px;
  margin: 0 auto;
}
ul,
ol {
  list-style: none;
}

ul li {
    width: 25%;
    float: left;
    
}
ul li .box {
    background: #fff;
    box-shadow: -2px 2px 2px #888888;
}
.clear:after{
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}
</style>

