<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">我的订单</el-menu-item>
      <el-menu-item index="2">我的购物车</el-menu-item>
      <el-menu-item
        index="3"
        style="float: left; background-color: #515695; text-color: '#ffd04b'"
        >返回商城</el-menu-item
      >
    </el-menu>

    <el-container>
      <el-aside width="200px">
        <!-- <el-card class="box-card"  > -->

        <!-- <div slot="header" class="clearfix">
    <span>个人信息</span> -->
        <!-- </div> -->

        <el-container>
          <el-header style="background-color: #b3c0d1">个人中心</el-header>
          <el-main style="background-color: #d3dce6; text-align: left">
            <el-form
              class="leftText"
              ref="form"
              :model="form"
              label-width="80px"
            >
              <tr>
                <el-form-item label="姓名">
                  <el-row
                    ><div style="text-align: left">
                      {{ form.userName }}
                    </div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="手机号">
                  <el-row
                    ><div>{{ form.userPhone }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="邮箱">
                  <el-row
                    ><div>{{ form.userEmail }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="城市">
                  <el-row
                    ><div>{{ form.userCity }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="性别">
                  <el-row
                    ><div>{{ form.userSex }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="银行账号">
                  <el-row
                    ><div>{{ form.userBank }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="积分">
                  <el-row
                    ><div>{{ form.userCredit }}</div></el-row
                  >
                </el-form-item>
              </tr>
              <tr>
                <el-form-item label="账户余额">
                  <el-row
                    ><div>{{ form.userMoney }}</div></el-row
                  >
                </el-form-item>
              </tr>
            </el-form>
          </el-main>
        </el-container>
        <!-- </el-card> -->
      </el-aside>
      <el-main>
        <el-table
          :data="list"
          border
          style="width: 100%; background-color: #b3c0d1"
        >
          <el-table-column prop="goodsName" label="商品名称" width="130">
          </el-table-column>
          <el-table-column prop="goodsPicture" label="商品图" width="130">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover">
                <img
                  v-bind:src="URL + scope.row.goodsPicture"
                  min-width="700"
                  height="500"
                />
                <img
                  slot="reference"
                  v-bind:src="URL + scope.row.goodsPicture"
                  style="width: 70px; height: 70px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="salerName" label="店铺" width="130">
            <!-- <template slot-scope="scope">
{{list1.scope.rows.salerName}}
        </template> -->
          </el-table-column>
          <el-table-column prop="goodsNewprice" label="单价" width="100">
          </el-table-column>
          <el-table-column label="数量" width="220">
            <template slot-scope="scope">
              <el-input-number
                v-model="list2[scope.$index].num"
                @change="numChange"
                :step="1"
                :min="1"
                :max="parseInt(scope.row.goodsNumber)"
                label="描述文字"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-delect"
                @click="delete1(scope.row.goodsId)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-footer style="text-align: right; font-size: 12px; margin: 10px">
          <el-button type="primary" @click="removeAll()" round
            >清空购物车</el-button
          >
          <!-- <template slot-scope="scope"> -->
          <el-button
            type="primary"
            round
            @click="
              dialogTableVisible = true;
              submit();
            "
            >提交订单</el-button
          >
          <!-- </template> -->
        </el-footer>
      </el-main>
    </el-container>

    <div>
      <el-dialog
        title="订单"
        v-if="dialogTableVisible"
        :visible.sync="dialogTableVisible"
      >
        <div ref="editRefs" :edit-data="editData"></div>
        <!-- @closeEditModal="closeEditModal" -->

        <el-table :data="list">
          <el-table-column prop="goodsName" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="goodsPicture" label="商品图" width="100">
            <template slot-scope="scope">
              <el-popover placement="left" trigger="hover">
                <img
                  v-bind:src="URL + scope.row.goodsPicture"
                  min-width="700"
                  height="500"
                />
                <img
                  slot="reference"
                  v-bind:src="URL + scope.row.goodsPicture"
                  style="width: 70px; height: 70px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="salerName" label="店铺" width="90">
            <!-- <template slot-scope="scope">
{{list1.scope.rows.salerName}}
        </template> -->
          </el-table-column>
          <el-table-column prop="goodsNewprice" label="单价" width="90">
          </el-table-column>
          <el-table-column prop="num" label="数量" width="60">
            <!-- <template slot-scope="scope">
					<el-label  v-model="list2[scope.$index].num" ></el-label>
				</template> -->
          </el-table-column>
          <el-table-column prop="totalPrice" label="总计" width="90">
          </el-table-column>
        </el-table>
        <el-footer style="text-align: right; font-size: 12px; margin: 10px">
          <el-button
            type="danger"
            @click="
              dialogTableVisible = false;
              cancelBuy();
            "
            round
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="
              dialogTableVisible = false;
              Buy();
            "
            round
            >支付</el-button
          >
        </el-footer>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import userlist from "@/api/manage/userlist";
import user from "@/api/manage/user";
export default {
  data() {
    return {
      dialogTableVisible: false,

      // formLabelWidth: '1800px',
      URL: "http://localhost:80/image/",
      list: [],
      list1: [],
      list2: [],
      page: 1,
      limit: 10,
      // total: ,

      form: {
        userName: "",
        userPhone: "",
        userEmail: "",
        userCity: "",
        userSex: "",
        userBank: "",
        userCredit: "",
        userMoney: "",
      },
      //  addDialog: false, // 添加的弹窗控制器
      // editDialog: false, // 修改的弹窗控制器
      editData: null, // 要修改的数据

      saveBtnDisabled: false,
    };
  },
  // mounted:function(){

  //   console.log("pppp")
  // },
  created() {
    var id = parseInt(this.$route.query.userid);
    this.getList(id);
    //  console.log("get~")
    //获得路由上的id

    var id = parseInt(this.$route.query.userid);
    // const userId=this.$route.params.id
    // console.log()

    this.getList2(id);
  },
  methods: {
    Buy() {
      var id = parseInt(this.$route.query.userid);
      user
        .createList(id)
        // return Promise.resolve()
        .then((response) => {
          //请求成功
          var formId = response.data.formId;
          var lis = new Array();
          var total = 0;
          // var flag=false
          // for (var i = 0; i < this.list.length; i++) {
          //   total += this.list[i].totalPrice;
          // }
          const p=new Promise((resolve,reject)=>{
          for (var i = 0; i < this.list.length; i++) {
           var j=0;
            var lis = JSON.stringify(this.list[i]);
            var commentId=this.list[i].commentId 
            // lis="lis.split(0,16)"
              total+=this.list[i].totalPrice
             
            user
              .updateComment(id, formId, lis)
              .then((response) => {
                // console.log(response.data.rows)
              
                
                user
                .pay(id, formId, response.data.rows)
                .then((response) => {
                  resolve()
                })
                .catch((error) => {
                  console.log(error);
                });
              
                
              })
              .catch((error) => {
                console.log(error);
              });
              
          }
          });
          p.then((value)=>{
user.addform(id,formId,total).then((response) => {
                  // console.log("wwwwww"+response.data.rows)
                  location.reload()
                })
          }).catch((error)=>{
            console.log('fail',error)
          })
          
        })
        .catch((error) => {
          console.log(error);
        });
         
    },
    cancelBuy() {
      //点击取消，将订单生成并往comment表中更改数据
      var id = parseInt(this.$route.query.userid);
      user
        .createList(id)
        .then((response) => {
          //请求成功
          var formId = response.data.formId;
          var lis = new Array();
          for (var i = 0; i < this.list.length; i++) {
            // console.log(this.list[i])
            // lis.push(this.list[i].num)
            // lis.push(this.list[i].totalPrice)
            // lis.push(this.list[i])
            var lis = JSON.stringify(this.list[i]);
            // lis="lis.split(0,16)"
            console.log(lis);
            user
              .updateComment(id, formId, lis)
              .then((response) => {
                //请求成功
                // Location.reload();
                // this.getList(id)
              })
              .catch((error) => {
                console.log(error);
              });
          }
          location.reload();
          // this.getList(id)
          //         // console.log(this.list)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit() {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].num = this.list2[i].num;
        this.list[i].totalPrice =
          this.list2[i].num * this.list[i].goodsNewprice;
      }
      //  location. reload()
      // console.log("adfsg"+this.list[0].num)
    },
    numChange(value) {
      // console.log(value);
    },
    removeAll() {
      var id = parseInt(this.$route.query.userid);
      this.$confirm("此操作将不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          user.removeAll(id).then((response) => {
            this.$message({
              type: "success",
              message: "成功清空!",
            });
            //回到列表页面
            //  this.getList()
            location.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delete1(goodsId) {
      // console.log("00000000")
      var id = parseInt(this.$route.query.userid);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          user.delete(id, goodsId).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //回到列表页面
            //  this.getList()
            location.reload();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == 1) {
        var id = parseInt(this.$route.query.userid);
        this.$router.push({ path: "/user/list", query: { userid: id } });
      } else if (key == 2) {
        // console.log("eee");
        var id = parseInt(this.$route.query.userid);
        this.$router.push({ path: "/user/trolly", query: { userid: id } });
      } else if (key == 3) {
        //   console.log("eee")
        var id = parseInt(this.$route.query.userid);
        this.$router.push({ path: "/shop/user", query: { userid: id } });
      }
    },
    handleChange(value) {
      console.log(value);
    },
    getList2(id) {
      //console.log("asudfluahfl")
      userlist
        .getUserInfo(id)
        .then((response) => {
          //请求成功
          //response接口返回的数据

          this.form = response.data.user;
          //console.log(this.list2.userId+response.data.user)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getList(id) {
      user
        .getTrollyGoods(this.page, this.limit, id)
        .then((response) => {
          //请求成功
          //response接口返回的数据

          for (var i = 0; i < response.data.rows.length; i++) {
            if (response.data.rows2[i].state == 0) {
              this.list.push(response.data.rows[i]);
              this.list1.push(response.data.rows1[i]);
              this.list2.push(response.data.rows2[i]);
            }
          }

          // this.list=response.data.rows//goods
          // this.total=response.data.total
          // this.list2=response.data.rows2//comment表
          // this.list1=response.data.rows1//saler
          // this.total1=response.data.total1
          // // this.list2=this.list
          // // console.log("sdfsf"+this.list[0].num)
          for (var i = 0; i < this.list1.length; i++) {
            this.list[i].salerName = this.list1[i].salerName;
            this.list[i].commentId=this.list2[i].commentId
            // this.list[i].num=this.list2[i].num
            // this.list[i].num=1

            // console.log(this.list[i].num)
          }

          // console.log(this.total)
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.el-menu-item {
  float: right;
}
.line {
  text-align: left;
}

.item {
  padding: 18px 0;
}
.box-card {
  width: 300px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  width: 12px;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  /* line-height: 160px; */
}
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
  display: flex;
  flex-direction: column;
}

.el-dialog__body {
  overflow: auto;
}

/* .el-table__header{
	  height: 12px;
  } */
.el-form-item {
  display: inline-block;
  width: 10px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: left;
  text-align-last: left;
}
</style>

