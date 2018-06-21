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
	  
    
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- :show-file-list = false -->
      <el-form :model="createForm" ref="createForm">
          <el-upload
        class="upload-demo"
        style="display:inline-block"
        action="http://192.168.1.103:9000/screensaverMaterial/picture"
        :on-success="handleChange"
        :file-list="fileList"
        :show-file-list = false
        multiple>
        <el-button size="small" type="primary">点击上传</el-button>
        
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <el-select v-model="operation" clearable placeholder="请选择" @change='getScreen'>
    			<el-option
      				v-for="item in items"
      				:key="item.value"
      				:label="item.label"
      				:value="item.value"
					  >
      			</el-option>
  			</el-select>
      <el-form-item>
        <el-table :data = 'imgData' highlight-current-row style="100%">
          <el-table-column prop="fileOriginName" label="文件名称" sortable width="200px"></el-table-column>
          <el-table-column prop="fileNewName" label="上传后的名称" sortable width="200px"></el-table-column>
          <el-table-column prop="fileSize" label="文件大小" sortable width="200px"></el-table-column>
          <el-table-column label="操作" min-width="120px">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, imgData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item >
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">确定</el-button>
			      <el-button @click.native="dialogFormVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
      
    </el-dialog>
    <!-- 列表 -->
		<el-table :data = 'activeMaterials' highlight-current-row style="100%">
			<el-table-column prop="logo" label="素材" width="200px" >
				<template slot-scope="scope">
					<img :src="scope.row.screensaverMaterialImgPath" @click="select(scope.$index, scope.row)" width="40" height="40" class="head_pic"/>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ImgPath">
          </el-dialog>
				</template>
			</el-table-column>
			<el-table-column prop="screensaverMaterialName" label="素材名称" width="200px" sortable></el-table-column>
      <el-table-column prop="screensaverMaterialType" label="素材类型" width="200px" sortable></el-table-column>
			<el-table-column label="操作" min-width="300px">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogEditVisible">
                <el-form :model="createForm" label-width="100px" class="demo-ruleForm" >
                  <el-form-item label="活动名称" prop="screensaverMaterialName">
                    <el-input v-model="createForm.screensaverMaterialName"></el-input>
                  </el-form-item> 
                  <el-form-item label="活动类型" prop="screensaverMaterialType">
                    <el-tag>{{createForm.screensaverMaterialType}}</el-tag>
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
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize'  layout="total, sizes, prev, pager, next, jumper" :total="total">
    	</el-pagination>
		</el-col>
  </section>
</template>
<script>
import {
  getScreenPage,
  removeScreenpage,
  addScreenMaterial,
  editScreen
} from "../../api/api";
export default {
  data() {
    return {
      createForm: {},
      dialogFormVisible: false,
      dialogEditVisible: false,
      dialogStatus: "",
      textMap: {
        updata: "edit",
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
      imgData: [],
      screensArr: [],
      showImg:false,
      ImgPath:''
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
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getScreenPage(para).then(res => {
        this.activeMaterials = res.data.data.list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
        this.pageNum = res.data.data.pageNum;
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
        let para = { id: row.screensaverMaterialId };
        removeScreenpage(para).then(res => {
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
      this.dialogStatus = "updata";
      this.createForm = Object.assign({}, row);
    },
    handleChange(response, file, fileList) {
      console.log(response.data);
      this.imgData.push(response.data);
      console.log(this.imgData);
    },
    createData(createForm) {
      console.log(this.imgData);
      this.$refs[createForm].validate(valid => {
        if (valid) {
          // this.$confirm("确认提交吗？", "提示", {}).then(() => {

          for (let i = 0; i < this.imgData.length; i++) {
            console.log(this.imgData[i].fileNewName);
            let screens = {};
            screens.screensaverMaterialImgName = this.imgData[i].fileNewName;
            screens.screensaverMaterialImgPath = this.imgData[i].filePath;
            screens.screensaverMaterialName = this.imgData[i].fileOriginName;
            screens.screensaverMaterialSize = this.imgData[i].fileSize;
            screens.screensaverMaterialType = this.imgData[i].imageOrientation;
            this.screensArr.push(screens);
          }
          let para = Object.assign([], this.screensArr);
          addScreenMaterial(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getScreen();
          });
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateData(createForm) {
      let para = Object.assign({}, this.createForm);
      editScreen(para).then(res => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        // this.$refs["createForm"].resetFields();
        this.dialogEditVisible = false;
        this.getScreen();
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    select(index,row) {
      console.log(row.screensaverMaterialImgPath)
      this.ImgPath = row.screensaverMaterialImgPath;
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.getScreen();
  }
};
</script>
