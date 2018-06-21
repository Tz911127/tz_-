<template>
  <section>
    <el-button type="text" @click="open">添加屏保</el-button>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="createForm" ref="createForm" :rules="rules" class="demo-form-inline">
        <el-form-item label="屏保名称" prop="screensaverProgramName" style="margin-right:1px">
          <el-input v-model="createForm.screensaverProgramName" placeholder="屏保名称"></el-input>
        </el-form-item>
      <!-- <el-form-item label="素材类型" style="margin-right:1px"> -->
       
      <!-- <el-select v-model="createForm.type" clearable placeholder="素材类型">
    			    <el-option
      				v-for="item in items"
      				:key="item.screensaverMaterialId"
      				:label="item.screensaverMaterialType"
      				:value="item.screensaverMaterialId"
					    >
      			</el-option>
  			</el-select> -->
  <!-- </el-form-item> -->
  <el-form-item>
    <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">确定</el-button>
    <el-button v-else type="primary" @click="updateData('createForm')">修改</el-button>
    <el-button type="primary" @click.native="dialogFormVisible=false">取消</el-button>
     
  </el-form-item>
     <el-form-item v-if="dialogStatus=='create'">

       <el-checkbox-group v-model="checkedBox" @change="handleCheckedChange">
        <el-checkbox v-for="(item,index) in items" :label="item" :key="index" >
          <img :src="item.screensaverMaterialImgPath" width="100" height="100" class="head_pic">
          </el-checkbox>
      </el-checkbox-group>

     </el-form-item>
</el-form>
    </el-dialog>
  <!-- 列表 -->
    <el-table :data="shops" highlight-current-row style="width: 100%;">
      <el-table-column prop='screensaverProgramName' label="屏保节目名称" width="200px" auto-complete="off" sortable> </el-table-column>
      <el-table-column prop='screensaverMaterialAmount' label="素材数量" width="200px"  sortable>
        <template slot-scope="scope">
        <div style="cursor:pointer"  @click="screensNum(scope.$index, scope.row)">{{ scope.row.screensaverMaterialAmount }}</div>
        <el-dialog :title="textNum[dialogN]" :visible.sync="dialogNum">
            <div v-for="(screensaver,index) in screensavers" :key="index" style="display:inline-block">
              <img :src="screensaver.screensaverMaterialImgPath" width="200" height="200"  class="head_pic">
            </div>
        </el-dialog>
      </template>
      </el-table-column>
      <el-table-column prop='screensaverPublishedAmount' label="发布终端数" width="200px" sortable>
        <template slot-scope="scope">
        <div style="cursor:pointer"  @click="screensPublish(scope.$index, scope.row)">{{ scope.row.screensaverPublishedAmount }}</div>
         <el-dialog :title="textNum[dialogP]" :visible.sync="dialogPub">
             <el-table @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%" tooltip-effect="dark" :data = "pubTableData">
             <el-table-column prop='terminalName' width="120" label="终端名称" sortable></el-table-column>
             <el-table-column prop='terminalType' width="120" label="终端类型" sortable></el-table-column>
             <el-table-column prop='floorName' width="120" label="所属楼层" sortable></el-table-column>
             <el-table-column prop='terminalLocation' width="120" label="终端位置" sortable></el-table-column>
             <el-table-column prop='isTerminalOnline' min-width="120" label="终端状态" sortable></el-table-column>
         </el-table>
          </el-dialog>
      </template>
      </el-table-column>
      <el-table-column prop='addScreensaverTime' label="创建日期" width="200px" sortable></el-table-column>
      <el-table-column label="操作" min-width=180px>
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" @click="handleIssue(scope.$index, scope.row)">发布</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    <!-- 发布 -->
    <el-dialog :title="textIssue[dialog]" :visible.sync="dialogForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="楼层">
            <el-select v-model="formInline.floor" placeholder="楼层">
              <el-option label="1F" value="1F"></el-option>
              <el-option label="2F" value="2F"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="终端类型">
        <el-select v-model="formInline.type" placeholder="类型">
          <el-option label="横屏" value="横屏"></el-option>
          <el-option label="竖屏" value="竖屏"></el-option>
        </el-select>
        </el-form-item>

      </el-form>
      <el-table @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%" tooltip-effect="dark" :data = "tableData">
        <el-table-column type="selection" width="55" sortable></el-table-column>
        <el-table-column prop='terminalName' width="120" label="终端名称" sortable></el-table-column>
        <el-table-column prop='terminalType' width="120" label="终端类型" sortable></el-table-column>
        <el-table-column prop='floorName' width="120" label="所属楼层" sortable></el-table-column>
        <el-table-column prop='terminalLocation' width="120" label="终端位置" sortable></el-table-column>
        <el-table-column prop='isTerminalOnline' min-width="120" label="终端状态" sortable></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
      <el-button @click.native="dialogForm=false">取消</el-button>
			<el-button type="primary" @click="issueData()">发布</el-button>
      </div>
    </el-dialog>
    <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
		</el-col>
  </section>
</template>
<script>
import {
  getScreenManagementPage,
  addScreenManagement,
  removeScreenManage,
  getPublichScreen,
  getSerminalManagePage,
  getScreenPage,
  getScreenSaver,
  getPublic,
  editScreenpage
} from "../../api/api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: "",
      dialog: "",
      dialogForm: false,
      dialogN: "",
      dialogNum: false,
      dialogP: "",
      dialogPub: false,
      shops: [],
      page: 1,
      pageNum: 1,
      pageSize:10,
      filters: {
        name: ""
      },
      total: 0,
      textMap: {
        create: "添加屏保",
        edit:"编辑"
      },
      textNum: {
        num: "素材",
        pub: "播放终端"
      },
      createForm: {
        screensaverId: 0,
        screensaverProgramName: "",
        screenId: 0
        // type: ""
      },
      rules: {
        screensaverProgramName: [
          { required: true, message: "请输入屏保名称", trigger: "blur" }
        ]
      },
      textIssue: {
        update: "发布"
      },
      formInline: {
        floor: "",
        type: ""
      },
      tableData: [],
      items: [],
      multipleSelection: [],
      terminalId: [],
      screensavers: [],
      pubTableData: [],
      issueId: "",
      checkedBox: [],
      checkedId: [],
      screensaverMaterialIds:[]
    };
  },
  methods: {
    open() {
      (this.dialogFormVisible = true), (this.dialogStatus = "create");
      getScreenPage().then(res => {
        console.log(res.data.data.list);
        this.items = res.data.data.list;
      });
    },
    getScreen() {
      let para = {
        page: this.page,
        name: this.filters.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // screenId:this.createForm.screenId,
      };
      getScreenManagementPage(para).then(res => {
        this.shops = res.data.data.list;
        this.total = res.data.data.total;
        this.pageNum = res.data.data.pageNum;
        this.pageSize = res.data.data.pageSize;
        console.log(res.data.data);
      });
      // getSerminalManagePage(para).then(res => {
      //   console.log(res.data.data.list);
      //   this.tableData = res.data.data.list;
      // });
      // getScreenPage(para).then(res => {
      //   console.log(res.data.data.list);
      //   this.screensavers = res.data.data.list;
      // });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "edit";
      this.createForm = Object.assign({},row)
    },
    updateData(createForm) {
      // this.$refs[createForm].validate(valid => {
      //   if (valid) {
      this.$refs.createForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          let para = Object.assign({}, this.createForm);
          editScreenpage(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getScreen();
          });
        });
      });
      // } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    handleIssue(index, row) {
      (this.dialogForm = true), (this.dialog = "update");
      let para = { id: row.screensaverId };
      this.issueId = row.screensaverId;
      // this.tableData.id = row.screensaverId
      // console.log(para);
      // console.log(this.tableData.id)
      getPublic().then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
        // this.tableData = para;
        // console.log(this.tableData)
      });
    },
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let para = { id: row.screensaverId };
          removeScreenManage(para).then(res => {
            console.log(para);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getScreen();
          });
        })
        .catch(() => {});
    },
    screensNum(index, row) {
      this.dialogNum = true;
      this.dialogN = "num";
      let para = { screensaverId: row.screensaverId };
      console.log(para);
      getScreenPage(para).then(res => {
        console.log(res.data.data.list);
        this.screensavers = res.data.data.list;
      });
    },
    screensPublish(index, row) {
      this.dialogPub = true;
      this.dialogP = "pub";
      let para = { screensaverId: row.screensaverId };
      console.log(para);
      getSerminalManagePage(para).then(res => {
        this.pubTableData = res.data.data.list;
        console.log(res);
        // this.screensavers = res.data.data.list;
      });
    },
    handleSizeChange(val) {},

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getScreen();
    },
    createData(createForm) {
      //  this.$refs[createForm].validate(valid => {
      //   if (valid) {
      // this.$refs[createForm].validate(valid => {
      //   if (valid) {
      // this.$confirm("确定提交吗？", "提示", {}).then(() => {
      this.createForm.screensaverId = parseInt(Math.random() * 100).toString();
      let para = Object.assign({}, this.createForm);
      let data = {};
      data.bizScreensaver = para;
      for (let i = 0; i < this.checkeId.length; i++) {
        this.screensaverMaterialIds.push(this.checkeId[i].screensaverMaterialId)
      }
      console.log(this.screensaverMaterialIds)
      // data.screensaverMaterialIds = this.screensaverMaterialIds;
      data.screensaverMaterialIds = this.screensaverMaterialIds
      addScreenManagement(data).then(res => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.$refs["createForm"].resetFields();
        this.dialogFormVisible = false;
        this.getScreen();
      });
    },
    issueData() {
      let para = { terminalIds: this.terminalIds, screensaverId: this.issueId };
      // console.log(this.issueId)
      getPublichScreen(para).then(res => {
        console.log(para);
        // this.$refs["tableData"].resetFields();
        this.dialogForm = false;
        this.getScreen();
      });
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleSelectionChange(val) {
      let valTerminalId = [];
      for (let i = 0; i < val.length; i++) {
        valTerminalId.push(val[i].terminalId);
      }
      this.terminalIds = valTerminalId;
    },
    handleCheckedChange(val) {
      console.log(val); 
      this.checkeId = val;
      
    },
  },
  mounted() {
    this.getScreen();
  }
};
</script>

<style>
el-dialog .el-form--inline .el-form-item {
  margin-right: 2px !important;
}
</style>
