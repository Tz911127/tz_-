<template>
  <section>
	  <el-button type='text' @click="open">上传素材</el-button>

	  <el-form :inline = true :model = 'filters'>
		  <el-form-item>
		  	<el-select v-model="filters.name" clearable placeholder="请选择" @change='getScreen'>
    			<el-option
      				v-for="item in options"
      				:key="item.value"
      				:label="item.label"
      				:value="item.value"
					  >
      			</el-option>
  			</el-select>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商铺名称"></el-input>
			  </el-form-item>
			  <el-form-item>
				  <el-button type="primary" @click="getScreen">查询</el-button>
			  </el-form-item>
	  	</el-form-item>
	  </el-form>
	  
    
    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model = 'createForm'  ref="createForm">
        <el-form-item>
            <el-select v-model="operation" clearable placeholder="请选择" @change="selectId">
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
                class="upload-demo"
                style="display:inline-block"
                action="http://192.168.1.103:9000/activityMaterial/picture"
                :on-success="handlePictureCardPreview"
                :file-list="fileList"
                :show-file-list = false
                :on-remove="handleRemove"
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
            <el-button @click.native="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 列表 -->
		<el-table :data = 'activeMaterials' highlight-current-row style="100%">
			<el-table-column prop="logo" label="素材" width="200px">
				<template slot-scope="scope"   >
					<img :src="scope.row.activityMaterialImgPath" @click="select(scope.$index, scope.row)"  width="40" height="40" class="head_pic"/>
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
                  <el-form-item label="活动名称" prop="activityMaterialName">
                    <el-input v-model="createForm.activityMaterialName"></el-input>
                  </el-form-item> 
                  <el-form-item label="活动类型" prop="activityType">
                    <el-tag>{{createForm.activityType}}</el-tag>
                  </el-form-item>
                  <el-form-item >
                      <el-button  type="primary" @click="updateData('createForm')">确定</el-button>
			                <el-button @click.native="dialogEditVisible=false">取消</el-button>
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
      createForm: {},
      fileDatas: [],
      dialogFormVisible: false,
      dialogEditVisible:false,
      dialogStatus: "",
      textMap: {
        updata: "编辑",
        create: "上传素材"
      },
      activeMaterials: [],
      options: [
        {
          value: "A",
          label: "素材类型"
        },
        {
          value: "B",
          label: "商城活动"
        },
        {
          value: "C",
          label: "品牌活动"
        }
      ],
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
      imgPath:''
    };
  },
  methods: {
    open() {
      (this.dialogFormVisible = true), (this.dialogStatus = "create");
    },
    getScreen() {
      let para = {
        page: this.page,
        type: this.filters.type,
        name: this.filters.name,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      getActiveMaterialPage(para).then(res => {
        this.activeMaterials = res.data.data.list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
        this.pageNum = res.data.data.pageNum;
        console.log(res);
      });
      getActiveSelect(para).then(res => {
        console.log(res);
        this.items = res.data.data;
        console.log(this.items);
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
      (this.dialogStatus = "updata"), (this.createForm = Object.assign({}, row));
      console.log(this.createForm)
    },

    updateData(createForm) {
      // this.$refs[createForm].validate(valid => {
        // if (valid) {
        //   this.$refs.createForm.validate(valid => {
        //     this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = Object.assign({}, this.createForm);
              editActivepage(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                // this.$refs["createForm"].resetFields();
                this.dialogEditVisible = false;
                this.getScreen();
              });
        //     });
        //   });
        // } else {
        //   console.log("error submit!!");
        //   return false;
        // }
      // });
    },
    handleChange(file, fileList) {},
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          // this.$confirm("确认提交吗？", "提示", {}).then(() => {
          for (let i = 0; i < this.imgData.length; i++) {
            console.log(this.imgData[i]);
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
            this.dialogFormVisible = false;
            this.getScreen();
          });
          // });
        }
        // else {
        //   console.log("error submit!!");
        //   return false;
        // }
      });
    },
    handlePicturePreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      alert(1);
    },
    handleRemove(file, fileList) {
      console.log(file.url, fileList);
    },
    handlePictureCardPreview(response, file, fileList) {
      this.imgData.push(response.data);
      console.log(this.imgData);
    },
    select(index,row) {
      this.dialogVisible = true;
      this.imgPath =row.activityMaterialImgPath
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    selectId(vId) {
      let obj = {};
      obj = this.items.find(item => {
        return item.activityId === vId;
      });
      console.log(obj.activityType, obj.activityId);
      this.activityId = obj.activityId;
    }
  },
  mounted() {
    this.getScreen();
  }
};
</script>
<style>
img {
  transition: all 0.5s linear;
  transform: scale(0.5);
}
.big {
  transform: scale(2);
}
</style>

