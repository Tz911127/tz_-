<template>
    <section>
        <el-button type='text' @click="open">上传素材</el-button>
        <el-dialog title= "上传素材" :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="createForm" ref="createForm">
                <el-form-item>
                    <!-- :show-file-list = false -->
                    <el-upload
                            ref='upload' 
                            class="upload-demo"
                            style="display:inline-block"
                            action="http://192.168.1.146:9000/screensaverMaterial/picture"
                            :on-success="handleChange"
                            list-type="picture"
                            :limit="3"
                            :on-exceed="handleExceed"
                            :on-remove="handleRemove"
                            multiple>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item >
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('createForm')">确定</el-button>
			      <el-button @click.native="resetForm('createForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
	

        <el-table :data="tableData" style="100%">
            <el-table-column label="素材" prop="screensaverMaterialImgPath" sortable>
                <template slot-scope="scope">
                    <img :src="scope.row.screensaverMaterialImgPath" @click="select(scope.$index, scope.row)" width="40" height="40" style="cursor:pointer" class="head_pic"/>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="ImgPath">
                    </el-dialog>
                </template>
            </el-table-column>
            <el-table-column label="素材名称" prop="screensaverMaterialImgName" sortable></el-table-column>
            <el-table-column label="素材类型" prop="screensaverMaterialType" sortable>
                <template slot-scope="scope">
                {{scope.row.screensaverMaterialType | filterType}}
              </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 工具 -->
        <el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize'  layout="total, sizes, prev, pager, next, jumper" :total="total">
    	</el-pagination>
		</el-col>
    </section>
</template>
<script>
import { getFirst, addScreenMaterial, removeScreenpage } from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogStatus: "",
      ImgPath: "",
      pageSize: 10,
      total: 0,
      filters: {},
      createForm: {},
      pics: [],
      screensArr: []
    };
  },
  methods: {
    open() {
      (this.dialogFormVisible = true), (this.dialogStatus = "create");
    },
    close() {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
    },
    getData() {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getFirst(para).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    select(index, row) {
      this.ImgPath = row.screensaverMaterialImgPath;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = parseInt(val);
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNum = parseInt(val);
      this.getData();
    },
    handleChange(response, file, fileList) {
      console.log(fileList);
      this.pics = fileList;
    },
    handleExceed(files, fileList) {
      console.log(12);
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleRemove(file, fileList) {
      this.pics = fileList;
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
    resetForm() {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
    },
    createData() {
      for (let i = 0; i < this.pics.length; i++) {
        let screens = {};
        console.log(this.pics[i].response.data);
        screens.isFirstPage = 1;
        screens.screensaverMaterialImgName = this.pics[
          i
        ].response.data.fileNewName;
        screens.screensaverMaterialImgPath = this.pics[
          i
        ].response.data.filePath;
        screens.screensaverMaterialName = this.pics[
          i
        ].response.data.fileOriginName;
        screens.screensaverMaterialSize = this.pics[i].response.data.fileSize;
        screens.screensaverMaterialType = this.pics[
          i
        ].response.data.imageOrientation;
        this.screensArr.push(screens);
      }
      if (this.screensArr.length == 0) {
        this.$confirm(`请上传图片`);
      } else {
        let para = Object.assign([], this.screensArr);
        addScreenMaterial(para).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$refs.upload.clearFiles();
          this.dialogFormVisible = false;
          this.screensArr = [];
          this.getData();
        });
      }
    },
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
          this.getData();
        });
      });
    }
  },
  filters: {
    filterType(data) {
      if (Number(data) == 1) {
        return "竖屏";
      } else {
        return "横屏";
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
