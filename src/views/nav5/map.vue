<template>
   <section>
     <el-button type="text" @click="open">添加地图</el-button>
     <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
       <el-form :model="createForm" ref="createForm" :rules="rules" label-width="80px" style="100%"> 
         <el-form-item label="地图名称" prop="mapName">
           <el-input v-model="createForm.mapName"></el-input>
         </el-form-item>
         <el-form-item  label="选择楼层" prop="floorId">
           <el-select  v-model="createForm.floorId" placeholder="请选择">
             <el-option v-for="floor in floorData" :key="floor.floorId" :label="floor.floorId" :value="floor.floorId"></el-option>
           </el-select>
           <!-- <el-input v-else v-model="createForm.floorId"></el-input> -->
         </el-form-item>
         <el-form-item label="上传地图" prop="upMap">
           <el-upload
             class="avatar-uploader"
             action="http://192.168.1.103:9000/map/picture"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
         </el-form-item>
         <el-form-item>
           <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">确定</el-button>
           <el-button v-else type="primary" @click="updateData('createForm')">修改</el-button>
           <el-button @click.native="resetForm('createForm')">取消</el-button>
         </el-form-item>
       </el-form>
     </el-dialog>

     <!-- 列表 -->
     <el-table :data = "maps">
       <el-table-column label = "地图名称" prop="mapName" sortable></el-table-column>
       <el-table-column label = "地图使用楼层" prop="floorName" sortable></el-table-column>
       <el-table-column label = "操作">
         <template slot-scope="scope">
           <el-button size="small" @click="handleEdit(scope.$index,scope.row)" >修改</el-button>
           <el-button size="small" @click="handChange" >编辑地图</el-button>
           <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total">
    	</el-pagination>
		</el-col>
   </section>
</template>
<script>
import { getMapPage, getFloorPage, addMap, removeMap, editMap } from "../../api/api";
export default {
  data() {
    return {
      createForm: {
        mapName: "",
        floorId: "",
        mapImgPath: ""
      },
      maps: [],
      dialogStatus: "",
      dialogFormVisible: false,
      textMap: {
        create: "添加地图",
        edit: "编辑"
      },
      floorData: [],
      floorValue: "",
      imageUrl: "",
      rules: {
        mapName: [{ required: true, message: "请输入名称", trigger: "blur" }]
        // floorId: [{required: true,message:'请选择楼层',trigger: 'blur'}],
        // upMap:[{required: true,message:'请上传地图', trigger: 'blur'}]
      },
      page: 1,
      pageSize: 10,
      total: 0,
      pageNum: 1
    };
  },

  methods: {
    open() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    getMapData() {
      let para = {
        page: this.page,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getMapPage(para).then(res => {
        this.pageNum = res.data.data.pageNum;
        this.maps = res.data.data.list;
        this.total = res.data.data.total;
        // this.pageSize = res.data.data.pageSize;
      });
      getFloorPage().then(res => {
        this.floorData = res.data.data.list;
      });
    },

    handleAvatarSuccess(res, file) {
      console.log(res.data.filePath);
      this.createForm.mapImgPath = res.data.filePath;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          let para = Object.assign({}, this.createForm);
          addMap(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getMapData();
            console.log(para);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.mapId };
        removeMap(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getMapData();
        });
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "edit";
      this.createForm = Object.assign({}, row);
    },
    updateData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          this.$refs.createForm.validate(valid => {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = Object.assign({}, this.createForm);
              editMap(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.dialogFormVisible = false;
                this.getMapData();
              });
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = parseInt(val);
      this.getMapData();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = parseInt(val);
      this.getMapData();
    },
    handChange(){
      window.open('http://www.baidu.com','_blank');
    }
  },
  mounted() {
    this.getMapData();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>