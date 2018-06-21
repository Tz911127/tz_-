<template>
	<section>
		<el-button type="text" @click="open">添加楼层</el-button>
		<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :model="createForm" label-width="100px" :rules="editFormRules" ref="createForm" style="width:300px">
				<el-form-item  prop="floorName"  label="楼层" required>
					<el-input v-model="createForm.floorName" placeholder="例：01"></el-input>
				</el-form-item>
				<el-form-item  prop="floorNumber"  label="楼层名称" required>
					<el-input v-model="createForm.floorNumber" placeholder="例：F1"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			 <!-- <el-button @click.native="resetForm('createForm')">取消</el-button> -->
			 <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">添加</el-button>
        <el-button v-else type="primary" @click="updateData('createForm')">修改</el-button>
        <el-button @click.native="resetForm('createForm')">取消</el-button>
			</div>
		</el-dialog>
		<!-- 列表 -->
		<el-table :data = 'floors' highlight-current-row style="100%">
			<el-table-column prop="floorNumber" label="楼层" width="300px" sortable>
			</el-table-column>
			<el-table-column prop="floorName" label="楼层名称" width="300px" sortable>
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
  getFloorPage,
  removeFloor,
  addFloor,
  editFloor
} from "../../api/api";
export default {
  data() {
    return {
      createForm: {
        id: "0",
        floorName: "",
        floorNumber: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        edit: "编辑楼层",
        create: "添加楼层"
      },
      floors: [],
      total: 0,
      page: 1,
      pageSize: 10,
      pageNum: 1,
      filters: {
        name: ""
      },
      editFormRules: {
        name: [{ required: true, message: "请输入楼层", trigger: "blur" }],
        code: [{ required: true, message: "请输入楼层名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    open() {
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    getFloors() {
      let para = {
        page: this.page,
        name: this.filters.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getFloorPage(para).then(res => {
        this.floors = res.data.data.list;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.pageSize;
        this.pageNum = res.data.data.pageNum;
      });
    },
    createData(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          // this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.createForm.id = parseInt(Math.random() * 100).toString();
          let para = Object.assign({}, this.createForm);
          addFloor(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getFloors();
            console.log(para);
            // });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleSizeChange() {},
    handleCurrentChange(val) {
      this.pageNum = parseInt(val);
      this.getFloors();
    },
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.floorId };
        console.log(para);
        removeFloor(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getFloors();
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
              editFloor(para).then(res => {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["createForm"].resetFields();
                this.dialogFormVisible = false;
                this.getFloors();
              });
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     resetForm(createForm) {
      this.dialogFormVisible = false;
      this.$refs[createForm].resetFields();
    },
  },
  mounted() {
    this.getFloors();
    console.log(this.$store.getters.token);
  }
};
</script>
<style>
</style>


