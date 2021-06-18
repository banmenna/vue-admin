<template>

  <div>
    
      <el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
 <el-menu-item index="1" >我的订单</el-menu-item>
  <el-menu-item index="2">我的购物车</el-menu-item>
  <el-menu-item
        index="3"
        style="float: left; background-color: #515695; text-color: '#ffd04b'"
        >返回商城</el-menu-item
      >
  
  
</el-menu>


  <div>
    <el-container>
  <el-main style="background-color:#D3DCE6;">
      <el-table
      
      :data="list1"
      border
      fit
      highlight-current-row
      rules=rows   cellspacing=0   align=right
      >

  
           <el-table-column  width="180" >  
           </el-table-column>
          <!-- <el-col :span="8"  > -->

      <el-table-column   >  
        <template  slot-scope="scope" >  
          <el-card :body-style="{ padding: '20px' }" >      
            <img v-bind:src="URL+scope.row.goodsPicture" class="image" />
            <div style="padding: 14px;">
              
          
        <span>{{scope.row.goodsName}}</span>
      </div>
      </el-card>
    </template> 
            
      </el-table-column>

      <el-table-column   >  
        <template  slot-scope="scope" >      
            <div class="detail">
              <p>商品名：{{scope.row.goodsName}}</p>
              <p>类别：{{scope.row.goodsType}}</p>
              <p>原价：{{scope.row.goodsOldprice}}</p>
              <p>现价：{{scope.row.goodsNewprice}}</p>
              <p>尺寸：{{scope.row.goodsSize}}</p>
              <p>库存：{{scope.row.goodsNumber}}</p>
              <p>销量：{{scope.row.goodsSaler}}</p>
              <p>好评率：{{scope.row.goodsRate}}</p>
            </div>
            <div class="bottom clearfix">
          <!-- <time class="time">{{ currentDate }}</time> -->
          <el-button type="text" class="button" @click="add(scope.row.goodsId)">加入购物车</el-button>
        </div>
        </template> 
            
      </el-table-column>
      
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
           
    <el-table-column  width="180" >  
           </el-table-column>
  <!-- </el-col> -->
        
         <!-- <el-col :span="8"  > -->
    
      
      <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
          
    
  <!-- </el-col> -->
     
      </el-table>

      <el-table
      
      :data="listcomment"
      border
      fit
      highlight-current-row
      frame=void
       rules=none   cellspacing=0   align=center
      >
      <el-table-column  width="180" >  
      </el-table-column>
      <el-table-column label="全部评价">
        
          <el-table-column width="180" >
            <template  slot-scope="scope" >      
                <div class="detail">          
                    <p>用户：{{scope.row.userName}}</p>
                </div>
            </template> 
          </el-table-column>
          <el-table-column>
            <template  slot-scope="scope" >      
                <div class="detail">          
                    <p>星级：{{scope.row.star}}</p>
                    <p>评价：{{scope.row.comment}}</p>
                </div>
            </template> 
          </el-table-column>
        
            
      </el-table-column>
      
      <el-table-column  width="180" >  
      </el-table-column>
    
  
      </el-table>
  </el-main>
    </el-container>
  </div>
  <div>
    <p>list1: {{list1}}</p>
    <p>listuser: {{listcomuser}}</p>
    <p>listcomment: {{listcomment}}</p>
  </div>
</div>
</template>

<script>
import saler from '@/api/manage/saler'
import user from '@/api/manage/user'
export default {
  data() {
    return {
       URL:"http://localhost:80/image/",
       
          page:1,
          limit:10,
          total:[],
          list1:[],
          listcomuser:[],//传评论时的用户名
          listcomment:[],
          applause:0,//总评
          applausenum:0,//评价数
          applauserate:0,//好评率
          form: {
            userId: '',
            goodsId: '',
      },
      cform:{
        goodsName:''
      },
      // imagesList:[{id:0,idView:require("../../assets/images/board.jpg")},{id:1,idView:require("../../assets/images/world.jpg")},{id:2,idView:require("../../assets/images/world.jpg")}],
      //  currentDate: new Date(),

    };
  },
  created () {
  
  var goodid = parseInt(this.$route.query.goodid)
  
  console.log("goodsidchuan:"+goodid)
  this.getCom(goodid)
  //this.setRate(goodid,this.applauserate)
  this.getList1("goodsid"+goodid)

  },
  methods: {
    // setRate(goodid,rate){
    //   //rate=this.applauserate
    //   console.log("rate xianshi"+rate)
    //   user.createRate(goodid,rate)
    //   .then(response=>{
    //     this.$message({
    //                 type: 'success',
    //                 message: '操作成功!'
    //                 });
    //   })

    // },
    add(goodsId){
      var id = parseInt(this.$route.query.userid)
      this.form.userId=id
      this.form.goodsId=goodsId
      console.log("id:"+id)

      user.add(this.form)
      .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '操作成功!'
                    });
              })
             // this.reload() 
       
    },
    getCom(goodid){
      user.getComment(goodid)
      .then(response=>{
        
          console.log("listuserlength "+response.data.rows1.length)
        for(var i=0;i<response.data.rows.length;i++){
              this.listcomuser.push(response.data.rows1[i]);
              this.listcomment.push(response.data.rows[i]);
              
          console.log("listuser0 "+response.data.rows1[i])
          console.log("listcomment0 "+response.data.rows[i])
                  }
          console.log("listuser "+this.listcomuser)
          console.log("listcomment "+this.listcomment)
        for(var i=0;i<response.data.rows.length;i++){
            this.listcomment[i].userName=this.listcomuser[i].userName;
            this.applause=this.applause+this.listcomment[i].star;
            this.applausenum++;
            }
            this.applauserate=this.applause/this.applausenum;
            console.log("applouse xianshi"+this.applause)
            console.log("applousenum xianshi"+this.applausenum)
            console.log("applouserate xianshi"+this.applauserate)

            user.createRate(goodid,this.applauserate)
            .then(response=>{
              console.log("rate xianshi"+this.applauserate)
              this.$message({
                 type: 'success',
                 message: '操作成功!'
                 });
            })
      }).catch(error=>{
                    console.log(error)
                })
    },
    getList1(){
      
        //console.log("asudfluahfl")
          var goodid = parseInt(this.$route.query.goodid)
            saler.getPageListOkpublishGoodsNew(this.page,this.limit)
                .then(response=>{//请求成功
                //response接口返回的数据
                
                console.log("goodid: "+goodid)
                for(var i=0;i<response.data.rows.length;i++){
                  
                  //console.log("goodidli: "+response.data.rows[i].goodsId)
                    if(response.data.rows[i].goodsId==goodid){
                    
                      this.list1.push(response.data.rows[i]);
                      this.total.push(response.data.total[i]);

                  }
                   }

                      console.log("list "+this.list1)
                      console.log("total "+this.total)
                    
                   
                })
                .catch(error=>{
                    console.log(error)
                })
        },
      handleSelect(key, keyPath) {
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
      }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    display:flex;
    justify-content:center;
    align-items: center;
    
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
  .detail {
    font-size: 18px;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
.left {
  margin-left: 200px;
}
.center {
  margin-top: 15px;
  margin-left: 200px;
}
#search {
  background-color: #ffc300;
  border-radius: 0%;
}
.search-title {
  color: #bdbaba;
  font-size: 15px;
  margin-bottom: 5px;
}
.remove-history {
  color: #bdbaba;
  font-size: 15px;
  float: right;
  margin-top: -22px;
}
#search-box {
  width: 555px;
  height: 300px;
  margin-top: 0px;
  padding-bottom: 20px;
}
.el-menu-item{
    float: right;
}
</style>


