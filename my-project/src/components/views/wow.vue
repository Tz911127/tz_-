<template>
 <el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple">
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框1"></el-checkbox>
        <el-checkbox label="复选框2"></el-checkbox>
      </el-checkbox-group>
    </div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple-light">
        <div class="block">
          <span class="demonstration">默认 click 触发子菜单</span>
          <el-cascader :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
        </div>
        <div class="block">
        <span class="demonstration">默认 click 触发子菜单</span>
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
        </div>
    </div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
    <div class="grid-content bg-purple">
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <i class="el-icon-success"></i>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
  </el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    <div class="grid-content bg-purple-light">
      <div>
        <el-button round>圆形按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </div>
    </div>
  </el-col>
</el-row>


</template>


<script>
export default {
  data() {
    return {
      radio: 1,
      checkList: ["选中且禁用", "复选框 A"],
      options: [
        {
          value: "shejiyuanze",
          label: "设计原则",
          children: [
            {
              value: "yizhi",
              label: "一致"
            },
            {
              value: "fankui",
              label: "反馈"
            },
            {
              value: "xiaolv",
              label: "效率"
            },
            {
              value: "kekong",
              label: "可控"
            }
          ]
        }
      ],
      selectedOptions:[]
    };
  },
  methods:{
    handleChange(value){
      console.log(value);
      
    }
  }
};
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>