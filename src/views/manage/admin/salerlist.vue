<template>
  <div class="app-container">
    商家等级列表
    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="salerName" label="店铺名" width="120" />
      <el-table-column prop="salerRate" label="店铺好评率" width="120" />
      <el-table-column prop="salerLevel" label="等级" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" @click="open" icon="el-icon-edit">修改</el-button> -->
          <!-- <router-link :to="'/manage2/s_update/'+scope.row.salerId"> -->
          <el-button
            type="primary"
            size="mini"
            @click="open(scope.row.salerId)"
            icon="el-icon-edit"
            >修改</el-button
          >
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <p>list:{{ list }}</p>
    <p>list1:{{ list1 }}</p>
    <p>list2:{{ list2 }}</p>
    <p>list3:{{ list3 }}</p> -->
  </div>
</template>
<script>
import salerlist from "@/api/manage/salerlist";
export default {
  //核心代码
  data() {
    //定义变量和初始值
    return {
      list: null,
      list1: [],//saler列
      list2: [],//goods列
      list3: [],//重新获取list
      page: 1,
      limit: 10,
      total: 0,
      applause: 0, //总评
      applausenum: 0, //评价数
      applauserate: [], //好评率
      form: {
        salerLevel: "",
        salerId: "",
      },
    };
  },
  created() {
    //一般调用methods中方法

    this.getList();
    this.getRate();
    //this.getList3();
  },
  methods: {
    //调用userlist.js定义的方法
    //用户列表的方法
   
    getList() {
      salerlist
        .getPageListSaler(this.page, this.limit)
        .then((response) => {
          //请求成功
          //response接口返回的数据
          //console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
          // for(var i=0;i<this.list.length;i++){
          //   this.list[i].salerRate=0
          //   this.list[i].salerNum=0
          // }
          

        })
        .catch((error) => {
          console.log(error);
        });
    }, 
    // getList3(){
    //   console.log("chonglist "+this.list)
    //   for(var i=0;i<this.list.length;i++){
    //     this.list3[i]=this.list[i]
    //   }
    // },
    setRate(){
      
      console.log("list "+this.list.length)
      console.log("list1 "+this.list1.length)
      console.log("list2 "+this.list2.length)
      
      for(var i=0;i<this.list1.length;i++){


        for(var j=0;j<this.list2.length;j++){
          if(this.list1[i].salerId==this.list2[j].salerId){
           
            this.list1[i].salerRate=parseFloat(this.list1[i].salerRate)+parseFloat(this.list2[j].goodsRate);
            this.list1[i].salerNum++
            
          }
        }

        for(var j=0;j<this.list.length;j++){
          if(this.list[j].salerId==this.list1[i].salerId){ 
            if(this.list1[i].salerRate==0){
              this.list[j].salerRate=0
            }
            else{
              this.list[j].salerRate=this.list1[i].salerRate/this.list1[i].salerNum
            }
          }
        }
        console.log(i+"list1 r "+this.list1[i].salerRate)
        //console.log("list2 r "+this.list2)

      }

    },
    getRate() {
      salerlist.Rate().then(response=>{
        for (var i = 0; i < response.data.rows1.length; i++) {
          this.list1.push(response.data.rows1[i]);
          this.list1[i].salerNum=0;
          this.list1[i].salerRate=0;
        }
        for (var i = 0; i < response.data.rows2.length; i++) {
          this.list2.push(response.data.rows2[i]);
        }
        this.setRate()

      })






      // console.log("length"+this.list.length)
      // for(var i=0;i<this.list.length;i++){
      //     console.log("salerid:"+this.list[i].salerId)
      //   salerlist.Rate(this.list[i].salerId).then(response=>{
      //     console.log("pp"+this.applausenum)
      //     for(var j=0;j<response.data.rows.length;j++){
      //       this.list1.push(response.data.rows[j]);
      //       this.applause=this.applause+parseFloat(this.list1[j].goodsRate)
      //       console.log("rate: "+this.applause)
      //       this.applausenum++
      //     }
      //   console.log(i+"num"+this.applausenum)
      //   this.applauserate=this.applause/this.applausenum
      //   console.log(i+"app"+this.applauserate)
      //   this.list[i].salerRate=this.applauserate
      //   console.log(i+"salerrate:"+list[i].salerRate)
      //   })
      //   // this.applause=0
      //   // this.applausenum=0
      //   // this.list1=[]
      //   console.log("pppp"+this.applausenum)
      //}
    },
    open(id) {
      this.$prompt("请设置店铺等级", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[1|2|3|4|5]/,
        inputErrorMessage: "请键入1-5",
      })
        .then(({ value }) => {
          this.form.salerId = id;
          this.form.salerLevel = value;
          console.log(this.form.salerId);
          salerlist.updateSaler(this.form).then((response) => {
            console.log("asdaef");
            this.$message({
              type: "success",
              message: "设置成功",
            });
            //this.reload()
            this.getList();
            //location.reload();
          });

          this.$message({
            type: "success",
            message: "设置成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>