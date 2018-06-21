<template>
	<section>
		<el-button type="text" v-on:click="open">添加商铺</el-button>
		<!-- 过滤 -->
		<el-col>
			<el-form :inline = true :model='filters'>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商铺名称" @keyup.enter.native="getUsers"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.floor" placeholder="所属楼层" @keyup.enter.native="getUsers"></el-input>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>
		<!-- 创建页面 -->
		<el-dialog class="create" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
			<el-form :model="createForm" label-width="80px" :rules="editFormRules" ref="createForm" style="width:300px">
				<el-form-item label="商铺编码" prop="shopNumber">
					<el-input v-model="createForm.shopNumber" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商铺名称" prop="shopName">
					<el-input  v-model="createForm.shopName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商铺英文名称" prop="shopEnglishName">
					<el-input  v-model="createForm.shopEnglishName" auto-complete="off" ></el-input>
				</el-form-item>
				<el-form-item label="所属楼层" prop="floorName">
					<el-select  v-model="createForm.floorId" aria-placeholder="请选择" @change = 'addFloorId'>
					<el-option v-for="option in options"  :key="option.floorId" :label = "option.floorName" :value = "option.floorId"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="业务类型" prop="bizFormatNumber" >
          <el-select  v-model="createForm.bizFormatId" aria-placeholder="请选择" @change = 'addbizFormatId'>
					<el-option v-for="item in items"  :key="item.bizFormatId" :label = "item.bizFormatNumber" :value = "item.bizFormatId"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="门牌号" prop="shopHouseNumber">
					<el-input  v-model="createForm.shopHouseNumber"></el-input>
				</el-form-item>
				<el-form-item label = "LOGO" prop="logo">
					<el-upload
             class="avatar-uploader"
             action="http://192.168.1.103:9000/shop/logo"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
				</el-form-item>
				<el-form-item  label = "商铺图片" prop="shoppicture" style="width:600px">
					<el-upload  action='http://192.168.1.103:9000/shop/pictures' 
								list-type='picture-card' 
                :on-success = "handlePictureCardPreview"
								:on-remove = "handleRemove" 
                multiple
								>
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label='联系电话' prop="shopTel">
				<el-input  v-model="createForm.shopTel"></el-input>
				</el-form-item>
				<el-form-item label='入驻日期' prop="addShopTime">
				<el-date-picker type="date" placeholder="选择日期" v-model="createForm.addShopTime"></el-date-picker>
				</el-form-item>
				<el-form-item label='商铺介绍' prop="shopDescript">
				<el-input  type="textarea" v-model="createForm.shopDescript"></el-input>
				</el-form-item>
				<el-form-item label='商铺权重' prop="shopWeight">
				<el-input v-model="createForm.shopWeight"></el-input>
				</el-form-item>
        <el-form-item>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        		<el-button v-else type="primary" @click="updateData">修改</el-button>
            <el-button @click.native="resetForm('createForm')">取消</el-button>
        </el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
			 <el-button @click.native="dialogFormVisible=false">取消</el-button>
			  <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        		<el-button v-else type="primary" @click="updateData">修改</el-button>
			</div> -->
		</el-dialog>
		<!-- 列表 -->
		<el-table :data="shops" highlight-current-row style="width: 100%;">
			<el-table-column prop="shopNumber" label="商铺编码" width="120px" sortable>
			</el-table-column>
			<el-table-column prop="shopName" label="商铺名称" width=120px  sortable>
			</el-table-column>
			<el-table-column prop="floorName" label="所属楼层" width=120px sortable>
			</el-table-column>
			<el-table-column prop="bizFormatType" label="业态类型" width=120px sortable>
			</el-table-column>
			<el-table-column prop="shopHouseNumber" label="门牌号" min-width=120px sortable>
			</el-table-column>
			<el-table-column prop="shopTel" label="联系方式" width=120px sortable>
			</el-table-column>
      <el-table-column prop="isShopEnabled"  label="状态" width="100">
        <template slot-scope="scope">
           {{scope.row.isShopEnabled | filterOnline}}
        </template> 
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button @click="changeOnline(scope.row,scope.row.isShopEnabled)" type="text" size="small">{{scope.row.isShopEnabled===0?"启用":"停用"}}</el-button>
        </template>
      </el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="change_num" :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
		</el-col>
	</section>
</template>


<script>
import {
  getUserListPage,
  removeUser,
  editUser,
  addUser,
  getFloorPage,
  getStatePage,
  switchStart
} from "../../api/api";
export default {
  data() {
    return {
      dialogStatus: "",
      textMap: {
        update: "编辑商铺",
        create: "添加商铺"
      },
      dialogFormVisible: false,
      createForm: {
        shopId: "0",
        shopNumber: "",
        shopName: "",
        floorId: "",
        bizFormatId: "",
        shopEnglishName: "",
        num: "",
        addShopTime: "",
        addr: "",
        shopLogoPath: "",
        isShopEnabled: "",
        shopWeight: "",
        floorName: "",
        bizFormatType: "",
        shoppicture: "",
        logo: ""
      },
      pictureLists: [],
      options: [],
      optionsValue: "",
      items: [],
      itemsValue: "",
      dialogVisible: "false",
      dialogImageUrl: "",
      imageUrl: "",
      shops: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      filters: {
        name: "",
        floor: ""
      },
      loading: false,
      editFormRules: {
        shopName: [
          { required: true, message: "请输入商铺名称", trigger: "blur" }
        ],
        shopNumber: [
          { required: true, message: "请输入商铺编码", trigger: "blur" }
        ],
        floorName: [
          { required: true, message: "请输入商铺楼层", trigger: "blur" }
        ],
        bizFormatType: [
          { required: true, message: "请输入业务类型", trigger: "blur" }
        ],
        shopHouseNumber: [
          { required: true, message: "请输入门牌号", trigger: "blur" }
        ],
        logo: [{ required: true, message: "请上传LOGO", trigger: "blur" }],
        shoppicture: [
          { required: true, message: "请上传商铺图片", trigger: "blur" }
        ]
      },
      value1: true,
      value2: true,
      flag: ""
    };
  },
  methods: {
    open() {
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file, fileList, res) {
  
      let pictureList = {};
      pictureList.shopPictureName = res[0].response.data[0].fileNewName;
      pictureList.shopPictureSize = res[0].response.data[0].fileSize;
      pictureList.shopPicturePath = res[0].response.data[0].filePath;
  
      this.pictureLists.push(pictureList);
      console.log(this.pictureLists);
    },
    handleAvatarSuccess(res, file) {
      this.createForm.shopLogoPath = res.data.filePath;
      console.log(this.createForm.shopLogoPath);
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
    },
    createData: function() {
      // this.$refs[createForm].validate(valid => {
      // this.$confirm("确认提交吗？", "提示", {}).then(() => {
      this.createForm.shopId = parseInt(Math.random() * 100).toString();
      let para = Object.assign({}, this.createForm);
      let data = {};
      data.bizShop = para;
      data.pictureList = this.pictureLists;
      addUser(data).then(res => {
        console.log(res.data.msg);
        if (res.data.status != 406) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.$refs["createForm"].resetFields();
          this.dialogFormVisible = false;
          console.log(data);
          this.getUsers();
        } else {
          alert(res.data.msg);
        }
      });
      // });
      // });
    },
    resetForm(createForm) {
      this.dialogFormVisible = false;
      this.$refs[createForm].resetFields();
    },

    handleEdit: function(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.createForm = Object.assign({}, row);
    },
    //编辑
    updateData: function() {
      this.$refs.createForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          let para = Object.assign({}, this.createForm);
          //console.log(para);
          editUser(para).then(res => {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$refs["createForm"].resetFields();
            this.dialogFormVisible = false;
            this.getUsers();
          });
        });
      });
    },
    change_num(val) {
      this.pageNum = parseInt(val);
      this.getUsers();
    },

    handleSizeChange(val) {},
    //获取用户列表

    getUsers() {
      let para = {
        name: this.filters.name,
        floor: this.filters.floor,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      getUserListPage(para).then(res => {
        this.total = res.data.data.total;
        this.shops = res.data.data.list;
        this.pageNum = res.data.data.pageNum;
        this.pageSize = res.data.data.pageSize;
        console.log(res);
      });
      getStatePage(para).then(res => {
        console.log(res);
        this.items = res.data.data.list;
      });
      getFloorPage(para).then(res => {
        console.log(res);
        this.options = res.data.data.list;
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          //this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          removeUser(para).then(res => {
            //this.listLoading = false;
            //NProgress.done();
            console.log(para);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    addFloorId() {
      // this.createForm.floorId = this.optionsValue;
      console.log(this.createForm.floorId);
    },
    addbizFormatId() {
      // this.createForm.bizFormatId = this.itemsValue;
      console.log(this.itemsValue);
    },
    handleModifyStatus(row, status) {
      this.$confirm("确定执行此操作吗？", "提示", {})
        .then(() => {
          let para = { id: row.shopId };
          switchStart(para).then(res => {
            // if(res.data.data === 0) {
            //   this.flag = '停用'
            // } else {
            //   this.flag = '启用'
            // }
            console.log(this.flag);
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    changeOnline(row, data) {
      this.$confirm("确定执行此操作吗？", "提示", {})
        .then(() => {
          for (let i = 0; i < this.shops.length; i++) {
            const item = this.shops[i];
            if (row.id === item.shopId) {
              item.isShopEnabled = data === 0 ? 1 : 0;
            }
          }
          let para = { id: row.shopId };
          switchStart(para).then(res => {
            console.log(this.flag);
            this.getUsers();
          });
        })
        .catch(() => {});
    }
  },
  filters: {
    filterOnline(data) {
      console.log(data)
      if (Number(data) == 0) {
        return "停用";
      } else {
        return "启用";
      }
    }
  },
  mounted() {
    this.getUsers();
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
