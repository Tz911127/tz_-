<template>
    <section>
        <el-button type="text" @click="open" >添加终端</el-button>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="createForm" :rules="rules" ref="createForm" label-width="100px" class="demo-ruleForm" style="width:300px">
                <el-form-item label="终端编号" prop="terminalNumber">
                    <el-input v-model="createForm.terminalNumber"></el-input>
                </el-form-item>
                <el-form-item label="终端名称" prop="terminalName">
                    <el-input v-model="createForm.terminalName"></el-input>
                </el-form-item>
                <el-form-item label="终端类型" prop="terminalType">
                  <el-select v-model="createForm.terminalType" placeholder="请选择">
                    <el-option label="横屏" value="横屏"></el-option>
                    <el-option label="竖屏" value="竖屏"></el-option>
                    <el-option label="二维码" value="二维码"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属楼层" prop="floorName">
                  <el-select v-model="createForm.floorName" placeholder="请选择">
                    <el-option label="1F" value="1F"></el-option>
                    <el-option label="2F" value="2F"></el-option>
                    <el-option label="3F" value="3F"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="终端位置" prop="terminalLocation">
                    <el-input v-model="createForm.terminalLocation"></el-input>
                </el-form-item>
                <el-form-item label="旋转角度" prop="terminalRotationAngle">
                    <el-input v-model="createForm.terminalRotationAngle"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button v-if="dialogStatus=='create'" type="primary" @click="create('createForm')">立即创建</el-button>
                  <el-button v-else type="primary" @click="updateData('createForm')">修改</el-button>
                  <el-button @click.native="dialogFormVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 列表 -->
        <el-table :data='tableData' style="width:100%">
            <el-table-column prop="terminalNumber" width="120px" label="终端编号" sortable></el-table-column>
            <el-table-column prop="terminalName" width="120px" label="终端名称" sortable></el-table-column>
            <el-table-column prop="terminalIp" width="100px" label="终端IP" sortable></el-table-column>
            <el-table-column prop="terminalType" width="120px" label="终端类型" sortable></el-table-column>
            <el-table-column prop="floorName" width="120px" label="终端楼层" sortable></el-table-column>
            <el-table-column prop="terminalLocation" width="100px" label="位置" sortable></el-table-column>
            <el-table-column prop="terminalRotationAngle" width="160px" label="旋转角度（度）" sortable></el-table-column>
            <el-table-column prop="isTerminalOnline" width="100px" label="状态" sortable>
              <template slot-scope="scope">
                {{scope.row.isShopEnabled | filterOnline}}
              </template> 
            </el-table-column>
            <el-table-column label="屏保节目" min-width=100px>
				<template slot-scope="scope">
					<el-button size="small" @click="play">餐饮轮播图</el-button>
				</template>
			</el-table-column>
            <el-table-column label="操作" min-width=100px>
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
        </el-table>
        <!-- 工具栏 -->
        <el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" :total="total">
    	</el-pagination>
		</el-col>
    </section>
</template>
<script>
import {
  getSerminalManagePage,
  addTerminalManagement,
  removeTerminalManage,
  editTerminaManage,
  getImg
} from "../../api/api";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        create: "添加终端",
        edit: "编辑终端"
      },
      createForm: {
        terminalNumber: "",
        terminalName: "",
        terminalType: "",
        floorName: "",
        terminalLocation: "",
        terminalRotationAngle: 0,
        floorId: 1
      },
      rules: {
        terminalNumber: [
          { required: true, message: "终端编号", trigger: "blur" }
        ],
        terminalName: [
          { required: true, message: "终端名称", trigger: "blur" }
        ],
        terminalType: [
          { required: true, message: "选择类型", trigger: "blur" }
        ],
        floorName: [{ required: true, message: "选择楼层", trigger: "blur" }]
      },
      tableData: [],
      page: 1,
      filters: {
        name: ""
      },
      total: 0
    };
  },
  methods: {
    open() {
      (this.dialogFormVisible = true), (this.dialogStatus = "create");
    },
    play() {
      let para = {}
      getImg(para).then(res => {
        console.log(res)
      });
    },
    getData() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      getSerminalManagePage(para).then(res => {
        console.log(res);
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$confirm("确定提交吗？", "提示", {}).then(() => {
          this.createForm.terminalId = parseInt(Math.random() * 100).toString();
          let para = Object.assign({}, this.createForm);
          addTerminalManagement(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getData();
            console.log(para);
            // });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {},
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
              editTerminaManage(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.dialogFormVisible = false;
                this.getData();
              });
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.terminalId };
        removeTerminalManage(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        });
      });
    },
    handleSizeChange() {},
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    }
  },
  filters: {
    filterOnline(data) {
      if (Number(data) == 0) {
        return "离线";
      } else {
        return "在线";
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
