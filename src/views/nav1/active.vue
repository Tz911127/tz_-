<template>
	<section>
		<el-button type="text" @click="open">添加活动</el-button>
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :model="createForm" label-width="80px" :rules="editFormRules" ref="createForm" style="width:300px">
				<el-form-item prop = 'activityType' label="活动类型" >
					<el-input v-model="createForm.activityType" placeholder="例：品牌活动"></el-input>
				</el-form-item>
				<el-form-item  prop = 'logo' label="活动LOGO">
					<el-upload  
             ref="upload"
             class="avatar-uploader"
             action='http://192.168.1.103:9000/activity/logo'
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <el-button @click.native = "resetForm('createForm')" >取消</el-button>
			 <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">添加啊</el-button>
        <el-button v-else type="primary" @click="updateData('createForm')">修改啊</el-button>
			</div>
		</el-dialog>
		<!-- 列表 -->
		<el-table :data = 'actives' highlight-current-row style="100%">
			<el-table-column prop="activityLogo" label="活动LOGO" width="300px">
				<template slot-scope="scope">
					<img :src='scope.row.activityLogo' width="40" height="40" class="head_pic"/>
				</template>
			</el-table-column>
			<el-table-column prop="activityType" label="活动类型" width="300px" sortable>
			</el-table-column>
			<el-table-column label="操作" min-width="300px">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
import {
  getActivePage,
  removeActive,
  addActive,
  editActive
} from "../../api/api";
import { base }from "@/utils/common.js"
export default {
  data() {
    return {
      base: base,
      createForm: {
        id: "0",
        activityType: "",
        // logo: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        edit: "编辑活动",
        create: "添加活动"
      },
      actives: [],
      total: 0,
      page: 1,
      pageNum: 1,
      pageSize:10,
      filters: {
        type: ""
      },
      imageUrl: "",
      editFormRules: {
        activityType: [{ required: true, message: "请输入商铺名称", trigger: "blur" }]
      },
      // token:''
    };
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    getActives() {
      
      let para = {
        token:this.token,
        page: this.page,
        type: this.filters.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      getActivePage(para).then(res => {
        this.pageNum = res.data.data.pageNum;
        this.actives = res.data.data.list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
        console.log(res.data.data)
      });

    },
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          this.createForm.id = parseInt(Math.random() * 100).toString();
            let para = Object.assign({}, this.createForm);
            addActive(para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["createForm"].resetFields();
              this.$refs["upload"].clearFiles();
              this.dialogFormVisible = false;
              this.getActives();
              console.log(para);
            });
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          this.$refs.createForm.validate(valid => {
            this.$confirm("确定提交？", "提示", {}).then(() => {
              let para = Object.assign({}, this.createForm);
              editActive(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.dialogFormVisible = false;
                this.getActives();
              });
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(createForm){
      this.dialogFormVisible=false;
      this.$refs.upload.clearFiles(); 
      this.$refs[createForm].resetFields();
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "edit";
      this.createForm = Object.assign({}, row);
    },
    handleDel(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.activityId };
        removeActive(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getActives();
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getActives();
    },
    handleAvatarSuccess(res, file) {
      this.createForm.activityLogo = res.data.filePath;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    }
  },
  mounted() {
    this.getActives();
    
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


