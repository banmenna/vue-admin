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
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="全部" name="first">
            <el-table :data="list" border fit highlight-current-row>
              <el-table-column label="序号" width="95" align="center">
                <template slot-scope="scope">
                  {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
              </el-table-column>

              <el-table-column prop="goodsName" label="商品名称" width="100" />

              <el-table-column prop="goodsType" label="类别" width="150" />

              <el-table-column prop="goodsOldprice" label="原价" width="80" />
              <el-table-column prop="goodsNewprice" label="现价" width="80" />
              <el-table-column prop="goodsSize" label="尺寸" width="80" />

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
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="Comment(scope.row.commentId)"
                    v-if="scope.row.state1 == 4"
                    plain
                    >评价</el-button
                  >
                  <!-- <el-button type="primary" size="mini"  v-if="scope.row.state1==4"  plain>退货</el-button > -->
                  <el-button
                    type="success"
                    size="mini"
                    plain
                    @click="
                      Pay(
                        scope.row.userId,
                        scope.row.formId,
                        scope.row
                      )
                    "
                    v-if="scope.row.state1 == 1"
                    >支付</el-button
                  >
                  <el-button
                    type="success"
                    size="mini"
                    @click="abolish(scope.row.commentId)"
                    v-if="scope.row.state1 == 1"
                    plain
                    >取消订单</el-button
                  >

                  <el-button
                    type="warning"
                    size="mini"
                    @click="confirm(scope.row.commentId)"
                    v-if="scope.row.state1 == 2"
                    plain
                    >确认收货</el-button
                  >
                  <el-button
                    type="warning"
                    size="mini"
                    @click="refund(scope.row.commentId)"
                    v-if="scope.row.state1 == 2"
                    plain
                    >退货</el-button
                  >

                  <el-button
                    type="danger"
                    size="mini"
                    v-if="scope.row.state1 == 5"
                    disabled
                    >已退货</el-button
                  >

                  <el-button
                    type="primary"
                    size="mini"
                    v-if="scope.row.state1 == 3"
                    disabled
                    >已评价</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待支付" name="second">
            <el-table :data="listpay" border fit highlight-current-row>
              <el-table-column label="序号" width="95" align="center">
                <template slot-scope="scope">
                  {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
              </el-table-column>

              <el-table-column prop="goodsName" label="商品名称" width="100" />

              <el-table-column prop="goodsType" label="类别" width="150" />

              <el-table-column prop="goodsOldprice" label="原价" width="80" />
              <el-table-column prop="goodsNewprice" label="现价" width="80" />
              <el-table-column prop="goodsSize" label="尺寸" width="80" />

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
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    size="mini"
                    plain
                    @click="
                      Pay(
                        scope.row.userId,
                        scope.row.formId,
                        scope.row
                      )
                    "
                    >支付</el-button
                  >
                  <el-button
                    type="success"
                    size="mini"
                    @click="abolish(scope.row.commentId)"
                    plain
                    >取消订单</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待收货" name="four">
            <el-table :data="listtake" border fit highlight-current-row>
              <el-table-column label="序号" width="95" align="center">
                <template slot-scope="scope">
                  {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
              </el-table-column>

              <el-table-column prop="goodsName" label="商品名称" width="100" />

              <el-table-column prop="goodsType" label="类别" width="150" />

              <el-table-column prop="goodsOldprice" label="原价" width="80" />
              <el-table-column prop="goodsNewprice" label="现价" width="80" />
              <el-table-column prop="goodsSize" label="尺寸" width="80" />

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
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="warning"
                    size="mini"
                    @click="confirm(scope.row.commentId)"
                    plain
                    >确认收货</el-button
                  >
                  <el-button
                    type="warning"
                    size="mini"
                    @click="refund(scope.row.commentId)"
                    plain
                    >退货</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待评价" name="third">
            <el-table :data="listcomment" border fit highlight-current-row>
              <el-table-column label="序号" width="95" align="center">
                <template slot-scope="scope">
                  {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
              </el-table-column>

              <el-table-column prop="goodsName" label="商品名称" width="100" />

              <el-table-column prop="goodsType" label="类别" width="150" />

              <el-table-column prop="goodsOldprice" label="原价" width="80" />
              <el-table-column prop="goodsNewprice" label="现价" width="80" />
              <el-table-column prop="goodsSize" label="尺寸" width="80" />

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
              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    v-if="scope.row.state1 == 4"
                    @click="Comment(scope.row.commentId)"
                    plain
                    >评价</el-button
                  >
                  <!-- <el-button type="primary" size="mini" v-if="scope.row.state1==3" disabled>已评价</el-button > -->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

    <!-- <div style="line-height:20px">
    <el-dialog  title="支付" :visible.sync="dialogVisible2" width="30%" >
      <p>确认支付</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false" >支付</el-button >
      </span>
    </el-dialog>
</div> -->
    <div style="line-height: 20px">
      <el-dialog title="评价" :visible.sync="dialogVisible1" width="30%">
        <p>请输入评价</p>
        <el-input
          style="margin-bottom: 30px"
          v-model="input"
          placeholder="请输入评价"
        ></el-input>
        <span style="margin-top: 30px" class="demonstration">星级</span>
        <el-rate
          show-score
          style="margin-top: 10px"
          v-model="value2"
          :colors="colors"
        >
        </el-rate>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogVisible1 = false;
              handleComment();
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- <p>list: {{ list }}</p>
    <p>list1: {{ list1 }}</p>
    <p>list2: {{ list2 }}</p>
    <p>listpay: {{ listpay }}</p>
    <p>listtake: {{ listtake }}</p>
    <p>listcomment: {{ listcomment }}</p>
    <p>listcomplete: {{ listcomplete }}</p> -->
  </div>
</template>

<script>
import userlist from "@/api/manage/userlist";
import user from "@/api/manage/user";

export default {
  data() {
    return {
      dialogVisible1: false, //评价对话框
      dialogVisible2: false, //支付对话框
      value2: null, //星级
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      URL: "http://localhost:80/image/",
      val: 0,
      input: "", //文字评论
      list: [],
      list1: [],
      list2: [],
      listpay: [],
      listtake: [],
      listcomment: [],
      listcomplete: [],
      page: 1,
      limit: 10,
      activeName: "first",
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

      saveBtnDisabled: false,
    };
  },
  created() {
    //console.log("get~")
    //获得路由上的id

    var id = parseInt(this.$route.query.userid);
    // const userId=this.$route.params.id
    console.log(id);
    this.getList2(id);
    this.getList(id);
    //this.getListpaycomment(id)
  },
  methods: {
    abolish(commentId) {
      console.log("tui commentid" + commentId);
      user.abolish(commentId).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
      location.reload();
    },
    refund(commentId) {
      console.log("tui commentid" + commentId);
      user.refund(commentId).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
      location.reload();
    },
    confirm(commentId) {
      user.confirm(commentId).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
      location.reload();
    },
    Comment(commentId) {
      this.dialogVisible1 = true;
      this.val = commentId;
    },
    handleComment() {
      console.log(this.input, this.value2, this.val);
      user.addComment(this.input, this.value2, this.val).then((response) => {
        this.$message({
          type: "success",
          message: "操作成功!",
        }); //回到列表页面 //  this.getList()
        location.reload();
      });
    },
    Pay(id, formId, str) {
      this.$confirm("确认支付, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var lis = JSON.stringify(str);
          console.log(str)
          // var id = parseInt(this.$route.query.userid);
          user.pay(id, formId,lis).then((response) => {
            user.task(response.data.rows)
              .then((response) => {
              //请求成功
              })
            this.$message({
              type: "success",
              message: "付款成功!",
            }); //回到列表页面 //  this.getList()
            //             location.reload();
          });
          location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消支付",
          });
        });
      // location.reload();
    },

    handleClick(tab) {
      this.activeName = tab.name;
      //console.log("~~~~")
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 1) {
        var id = parseInt(this.$route.query.userid);
        this.$router.push({ path: "/user/list", query: { userid: id } });
      } else if (key == 2) {
        console.log("eee");
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
          console.log(this.list2.userId + response.data.user);
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
            if (response.data.rows2[i].state != 0) {
              this.list.push(response.data.rows[i]);
              this.list1.push(response.data.rows1[i]);
              this.list2.push(response.data.rows2[i]);
              console.log("list2 i: " + ":" + this.list2[i]);
            }
          }

          console.log("list2 length2 " + ":" + this.list2.length);
          console.log(this.list);
          console.log("list1 " + ":" + this.list1.num);
          console.log("list2 " + ":" + this.list2.num);

          // this.list=response.data.rows//goods
          // this.total=response.data.total
          // this.list2=response.data.rows2//comment表
          // this.list1=response.data.rows1//saler
          // this.total1=response.data.total1
          // // this.list2=this.list
          // // console.log("sdfsf"+this.list[0].num)
          for (var i = 0; i < this.list1.length; i++) {
            this.list[i].salerName = this.list1[i].salerName;
            this.list[i].commentId = this.list2[i].commentId;
            this.list[i].state1 = this.list2[i].state;
            this.list[i].num = this.list2[i].num;
            this.list[i].totalPrice = this.list2[i].totalPrice;
            this.list[i].formId = this.list2[i].formId;
            this.list[i].userId = this.list2[i].userId;
            if (this.list2[i].state == 1) {
              this.listpay.push(this.list[i]);
            } else if (this.list2[i].state == 2) {
              this.listtake.push(this.list[i]);
            } else if (this.list2[i].state == 4) {
              //||this.list2[i].state==3){
              this.listcomment.push(this.list[i]);
            }
            // this.list[i].num=this.list2[i].num
            // this.list[i].num=1
            // console.log(this.list[i].num)
          }

          // console.log(this.total)
        })
        .catch((error) => {
          console.log("zheli" + error);
        });
    },
    //         getListpaycomment(id){

    //             console.log("list2 length "+":"+this.list2)
    //             for(var i=0;i<this.list2.length;i++){
    //               if(this.list2[i].state=='0')
    //                    this.listpay.push(this.list2[i]);
    //                    }
    //         },
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

