<template>
	<section>
		<el-button type="text" @click="open">添加业态</el-button>
		<el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :model="createForm" label-width="100px" :rules = "editFormRules" ref="createForm" style="width:300px">
				<el-form-item  prop="bizFormatNumber" label="业态编码" required>
					<el-input v-model="createForm.bizFormatNumber" placeholder="例：A0001"></el-input>
				</el-form-item>
				<el-form-item  prop="bizFormatType" label="业态名称" required>
					<el-input v-model="createForm.bizFormatType" placeholder="例：餐饮"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer"  class="dialog-footer">
       <el-button @click.native="resetForm('createForm')">取消</el-button>
			 <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">添加</el-button>
       <el-button v-else type="primary" @click="updateData('createForm')">修改</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
			</div>
		</el-dialog>
		<!-- 列表 -->
		<el-table :data = 'states' highlight-current-row style="100%">
			<el-table-column prop="bizFormatNumber" label="业态编码" width="300px" sortable>
			</el-table-column>
			<el-table-column prop="bizFormatType" label="业态名称" width="300px" sortable>
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
import { getStatePage, removeState, addState, editState } from "../../api/api";
export default {
  data() {
    return {
      createForm: {
        bizFormatId: "0",
        bizFormatNumber: "",
        bizFormatType: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        edit: "编辑业态",
        create: "添加业态"
      },
      states: [],
      total: 0,
      page: 1,
      pageNum:1,
      pageSize:10,
      filters: {
        name: ""
      },
      editFormRules: {
        name: [{ required: true, message: "请输入业态编码", trigger: "blur" }],
        code: [{ required: true, message: "请输入业态名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    getStates() {
      let para = {
        page: this.page,
        // name: this.filters.name,
        pageNum:this.pageNum,
        pageSize: this.pageSize,
      };
      getStatePage(para).then(res => {
        this.states = res.data.data.list;
        this.total = res.data.data.total;
        this.pageNum = res.data.data.pageNum,
        this.pageSize = res.data.data.pageSize;
      });

    },
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          // this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.createForm.bizFormatId = parseInt(Math.random() * 100).toString();
            let para = Object.assign({}, this.createForm);
            addState(para).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["createForm"].resetFields();
              this.dialogFormVisible = false;
              this.getStates();
              console.log(para)
            });
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleSizeChange() {},
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getStates();
    },
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.bizFormatId };
        console.log(para);
        removeState(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getStates();
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
              editState(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.dialogFormVisible = false;
                this.getStates();
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
      this.$refs[createForm].resetFields();
    },
  },
  mounted() {
    this.getStates();
  }
};
</script>
<style>

</style>


