<template>
   <section>
     <el-button type="text" @click="open">添加地图</el-button>
     <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="close">
       <el-form :model="createForm" ref="createForm" :rules="rules" label-width="80px" style="width:300px"> 
         <el-form-item label="地图名称" prop="mapName">
           <el-input v-model="createForm.mapName"></el-input>
         </el-form-item>
         <el-form-item  label="选择楼层" prop="floorId">
           <el-select  v-model="createForm.floorId" placeholder="请选择">
             <el-option v-for="floor in floorData" :key="floor.floorId" :label="floor.floorName" :value="floor.floorId"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="上传地图" prop="mapImgPath">
           <el-upload
             ref="upload"
             class="avatar-uploader"
             action="http://192.168.1.146:9000/map/picture"
             :show-file-list="false"
             :file-list="fileList"
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
           <el-button size="small" @click="handChange(scope.$index,scope.row)" >编辑地图</el-button>
           <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>    
		</el-col>
   </section>
</template>
<script>
import {
  getMapPage,
  getFloorPage,
  addMap,
  removeMap,
  editMap
} from "../../api/api";
export default {
  data() {
    return {
      createForm: {
        mapName: "",
        floorId: "",
        mapImgPath: ""
      },
      newCreateForm: {
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
        mapName: [{ required: true, message: "请输入名称", trigger: "blur" }],
        floorId: [
          {
            type: "number",
            required: true,
            message: "请选择楼层",
            trigger: "blur"
          }
        ],
        mapImgPath: [
          { required: true, message: "请上传地图", trigger: "change" }
        ]
      },
      pageSize: 10,
      total: 0,
      pageNum: 1,
      fileList: []
    };
  },

  methods: {
    open() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    close() {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
      this.fileList = [];
      this.imageUrl = "";
      this.createForm = Object.assign({}, this.newCreateForm);
    },
    getMapData() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getMapPage(para).then(res => {
        this.maps = res.data.data.list;
        this.total = res.data.data.total;
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
      // this.$refs[formName].resetFields();
      this.createForm = Object.assign({}, this.newCreateForm);
      this.$refs.upload.clearFiles();
      this.dialogFormVisible = false;
      this.imageUrl = "";
    },
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          let para = Object.assign({}, this.createForm);
          addMap(para).then(res => {
            if (res.data.code == 30002) {
              this.$confirm("楼层重复");
            } else {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["createForm"].resetFields();
              this.$refs.upload.clearFiles();
              this.dialogFormVisible = false;
              this.imageUrl = "";
              this.getMapData();
            }
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
      this.imageUrl = row.mapImgPath;
    },
    updateData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          this.$refs.createForm.validate(valid => {
            // this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = Object.assign({}, this.createForm);
              editMap(para).then(res => {
                if (res.data.code == 30002) {
                  this.$confirm("楼层重复");
                } else {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["createForm"].resetFields();
                  this.dialogFormVisible = false;
                  this.imageUrl = "";
                  this.getMapData();
                }
              // });
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.getMapData();
    },
    handleCurrentChange(val) {
      this.pageNum = parseInt(val);
      this.getMapData();
    },
    handChange(index,row) {
      window.open("/world-project/nav.html?floor=" + row.floorId, "_blank");
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