<template>
    <section>
        <el-button type="text" @click="open">添加账号</el-button>
        <el-dialog :visible.sync="dialogVisible" :title="textMap[dialogStatus]" :before-close="close" >
            <el-form :model="createForm" label-width="100px" :rules="rules" ref="createForm" style="width:300px"> 
                <el-form-item label="登录账号" prop="userLoginname">
                    <el-input v-model="createForm.userLoginname"></el-input>
                </el-form-item>
                <el-form-item label="账号名称" prop="userName">
                    <el-input v-model="createForm.userName"></el-input>
                </el-form-item>
                <el-form-item  label="账号密码" prop="userPassword">
                    <el-input type="password" v-model="createForm.userPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('createForm')">提交</el-button>
                    <el-button @click.native="resetForm('createForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table :data="userData">
            <el-table-column label="登录账号" prop="userLoginname" sortable></el-table-column>x
            <el-table-column label="账号名称" prop="userName" sortable></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        </el-col>
    </section>
</template>
<script>
import { getUser, addUserName, removeUserName } from "../../api/api";
export default {
  data() {
    return {
      userData: [],
      dialogVisible: false,
      dialogStatus: "",
      textMap: {
        create: "添加账号",
        edit: "修改"
      },
      createForm: {
        userName: "",
        userName: "",
        userPassword: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        userLoginname: [
          { required: true, message: "请输入账号名称", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      pageSize: 10,
      total: 0,
      pageNum: 1
    };
  },
  methods: {
    open() {
      (this.dialogVisible = true), (this.dialogStatus = "create");
    },
    close() {
      this.dialogVisible = false;
      this.$refs["createForm"].resetFields();
    },
    getData() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getUser(para).then(res => {
        this.userData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    submitForm(createForm) {
      this.$refs[createForm].validate(valid => {
        if (valid) {
          let para = Object.assign({}, this.createForm);
          addUserName(para).then(res => {
            if (res.data.code == 30002) {
              this.$confirm("登录账号重复");
            } else {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["createForm"].resetFields();
              this.dialogVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(createForm) {
      this.$refs[createForm].resetFields();
      this.dialogVisible = false;
    },
    handleDel(idnex, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      }).then(() => {
        let para = { id: row.userId };
        removeUserName(para).then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getData();
        });
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = parseInt(val);
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = parseInt(val);
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
