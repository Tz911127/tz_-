<template>
  <section>
	  <el-button type='text' @click="open">上传素材</el-button>

	  <el-form :inline = true :model = 'filters'>
		  <!-- <el-form-item>
		  	<el-select v-model="filters.name" placeholder="请选择" @change='getScreen'>
    			<el-option
      				v-for="item in activeMaterials"
      				:key="item.activityId"
      				:label="item.activityType"
      				:value="item.activityId"
					  >
      			</el-option>
  			</el-select>
        </el-form-item> -->
        <el-form-item style="float:right">
				  <el-button type="primary" @click="getScreen">查询</el-button>
			  </el-form-item>
				<el-form-item style="float:right">
					<el-input v-model="filters.name" placeholder="素材名称"></el-input>
			  </el-form-item>
			  
	  	
	  </el-form>
	  
    
    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="close">
      <!-- :rules="createForm" -->
      <el-form :model = 'createForm'  ref="createForm" >
        <el-form-item prop="activityId">
            <el-select v-model="createForm.activityId" placeholder="请选择活动" @change="selectId" clearable class="activity">
    			    <el-option
      				v-for="item in items"
      				:key="item.activityId"
      				:label="item.activityType"
      				:value="item.activityId"
					    >
      			</el-option>
  			</el-select>
        </el-form-item>
        <el-form-item>
            <el-upload
                ref="upload"
                class="upload-demo"
                style="display:inline-block"
                action="http://192.168.1.146:9000/activityMaterial/picture"
                :on-success="handlePictureCardPreview"
                :file-list="fileList"
                :show-file-list = false
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                multiple>
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
        </el-form-item>
        
        <el-form-item>
        <el-table style="width: 100%" :data="imgData" highlight-current-row>
              <el-table-column prop="fileOriginName" label="文件名称" width="200px" sortable></el-table-column>
              <el-table-column prop="fileNewName" label="上传后名称" width="200px" sortable></el-table-column>
              <el-table-column prop="fileSize" label="文件大小" width="200px" sortable></el-table-column>
              <el-table-column label="操作" min-width="120px">
                <template slot-scope="scope">
              <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, imgData)">删除</el-button>
            </template>
              </el-table-column>
        </el-table>
        </el-form-item> 
        <el-form-item >
            <el-button type="primary" @click="createData('createForm')">确定</el-button>
            <el-button @click.native="resetCreateForm('createForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 列表 -->
		<el-table :data = 'activeMaterials' highlight-current-row style="100%">
			<el-table-column prop="logo" label="素材" width="200px">
				<template slot-scope="scope"   >
					<img :src="scope.row.activityMaterialImgPath" @click="select(scope.$index, scope.row)" style="cursor:pointer"  width="40" height="40" class="head_pic"/>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="imgPath" alt="">
          </el-dialog>
				</template>
			</el-table-column>
			<el-table-column prop="activityMaterialName" label="素材名称" width="200px" sortable></el-table-column>
      <el-table-column prop="activityType" label="素材类型" width="200px" sortable></el-table-column>
			<el-table-column label="操作" min-width="300px">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogEditVisible">
                <el-form :model="createForm" label-width="100px" class="demo-ruleForm" >
                  <el-form-item label="素材名称" prop="activityMaterialName">
                    <el-input v-model="createForm.activityMaterialName"></el-input>
                  </el-form-item> 
                  <el-form-item label="素材类型" prop="activityType">
                    <el-select v-model="createForm.activityId" placeholder="请选择活动" @change="selectId">
    		            	    <el-option
      	            			v-for="item in items"
      	            			:key="item.activityId"
      	            			:label="item.activityType"
      	            			:value="item.activityId"
				            	    >
      	            		</el-option>
  			            </el-select>
                  </el-form-item>
                  <el-form-item >
                      <el-button  type="primary" @click="updateData('createForm')">确定</el-button>
			                <el-button @click.native="resetForm('createForm')">取消</el-button>
                  </el-form-item>
                </el-form>
            </el-dialog>
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
  getActiveMaterialPage,
  removeActivepage,
  addActiveMaterial,
  editActivepage,
  getActiveSelect
} from "../../api/api";
export default {
  data() {
    return {
      createForm: {
        // activityId: ""
      },
      newCreateForm: {
        // activityId: ""
      },
      fileDatas: [],
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogStatus: "",
      textMap: {
        updata: "编辑",
        create: "上传素材"
      },
      activeMaterials: [],
      options: [],
      items: [],
      operation: "",
      value: "",
      page: 1,
      pageNum: 1,
      pageSize: 10,
      filters: {
        type: "",
        name: ""
      },
      total: 0,
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      selectIndex: undefined,
      imgData: [],
      activeArr: [],
      activityId: 0,
      imgPath: ""
    };
  },
  methods: {
    open() {
      (this.dialogFormVisible = true), (this.dialogStatus = "create");
    },
    close() {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
      this.createForm = Object.assign({}, this.newCreateForm);
      this.imgData = [];
    },
    getScreen() {
      let para = {
        page: this.page,
        // type: this.filters.type,
        // name: this.filters.name,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        activityMaterialName: this.filters.name
      };
      getActiveMaterialPage(para).then(res => {
        this.activeMaterials = res.data.data.list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
        this.pageNum = res.data.data.pageNum;
      });
      getActiveSelect(para).then(res => {
        this.items = res.data.data;
      });
    },
    handleCurrentChange(val) {
      this.pageNum = parseInt(val);
      this.getScreen();
    },
    handleSizeChange() {},
    handleDel(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.activityMaterialId };
        removeActivepage(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getScreen();
        });
      });
    },

    handleEdit(index, row) {
      this.dialogEditVisible = true;
      (this.dialogStatus = "updata"),
        (this.createForm = Object.assign({}, row));
    },

    updateData(createForm) {
      let para = Object.assign({}, this.createForm);
      editActivepage(para).then(res => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        // this.$refs["createForm"].resetFields();
        this.createForm = Object.assign({}, this.newCreateForm);
        this.dialogEditVisible = false;
        this.getScreen();
      });
    },
    handleChange(file, fileList) {},
    createData(createForm) {
      if (this.imgData.length == 0) {
        this.$confirm(`请上传图片`);
      } else {
        if (this.activityId == "") {
          this.$confirm("请选择活动");
        } else {
          this.$refs[createForm].validate(valid => {
            if (valid) {
              for (let i = 0; i < this.imgData.length; i++) {
                let screens = {};
                screens.activityMaterialImgName = this.imgData[i].fileNewName;
                screens.activityMaterialImgPath = this.imgData[i].filePath;
                screens.activityMaterialName = this.imgData[i].fileOriginName;
                screens.activityMaterialSize = this.imgData[i].fileSize;
                screens.activityId = this.activityId;
                this.activeArr.push(screens);
              }

              let para = Object.assign([], this.activeArr);
              addActiveMaterial(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.imgData = [];
                this.activeArr = [];
                this.createForm = Object.assign({}, this.newCreateForm);
                this.dialogFormVisible = false;
                this.getScreen();
              });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      }
    },
    handlePicturePreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      alert(1);
    },
    handleRemove(file, fileList) {
      // console.log(file.url, fileList);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt2M;
    },
    handlePictureCardPreview(response, file, fileList) {
      this.imgData.push(response.data);
    },
    select(index, row) {
      this.dialogVisible = true;
      this.imgPath = row.activityMaterialImgPath;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    selectId() {
      this.activityId = this.createForm.activityId;
    },
    resetForm(createForm) {
      this.imgData = [];
      this.$refs.upload.clearFiles();
      this.dialogEditVisible = false;
      this.createForm = Object.assign({}, this.newCreateForm);
    },
    resetCreateForm(createForm) {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
      this.createForm = Object.assign({}, this.newCreateForm);
      this.imgData = [];
    }
  },
  mounted() {
    this.getScreen();
  }
};
</script>
<style>
.activity::before {
  position: relative;
  left: -10px;
  top: 40px;
  content: "*";
  color: #ff4949;
  margin-right: 4px;
}
</style>

