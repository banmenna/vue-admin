<template>
  <div class="app-container">
    商家商品申请列表
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" width="80" />

      <el-table-column prop="goodsType" label="类别" width="120" />

      <el-table-column prop="goodsOldprice" label="原价" width="60" />
      <el-table-column prop="goodsNewprice" label="现价" width="60" />
      <el-table-column prop="goodsSize" label="尺寸" width="60" />
      <el-table-column prop="goodsPicture" label="商品图">
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
      <el-table-column prop="goodsNumber" label="库存" />

      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="publish(scope.row.goodsId)"
            >允许发布</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removePublish(scope.row.goodsId)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import userlist from "@/api/manage/userlist";
export default {
  inject: ["reload"],
  data() {
    //定义变量和初始值
    return {
      URL: "http://localhost:80/image/",
      list: null,
      page: 1,
      limit: 10,
      total: 0,
    };
  },
  created() {
    //一般调用methods中方法

    this.getList();
  },
  methods: {
    //调用userlist.js定义的方法
    //用户列表的方法
    getList() {
      //console.log("asudfluahfl")
      userlist
        .getPageListPublishGoods(this.page, this.limit)
        .then((response) => {
          //请求成功
          //response接口返回的数据
          //console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list);
          console.log(this.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    publish(id) {
      //将未发布的->请求发布状态：-1->0
      userlist
        .publish(id)

        .then((response) => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      // this.getList()
      this.reload();
      //location. reload()
      //this.$router.go(0)
    },
    removePublish(id) {
      //alert(id)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userlist.deletePublish(id).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //回到列表页面
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>