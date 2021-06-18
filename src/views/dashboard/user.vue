<template >

  <div style="width:100%;background-color:#B3C0D1;">
    
      <el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
 <el-menu-item index="1" >我的订单</el-menu-item>
  <el-menu-item index="2">我的购物车</el-menu-item>
  <!-- <el-menu-item index="3" style="float: left; background-color:#515695; text-color: '#ffd04b';">个人中心</el-menu-item> -->
  <!-- <router-link :to="'/manage2/u_update/'+scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link> -->
  
  
</el-menu>
  <el-carousel indicator-position="outside"  type="card" height="300px">
    <el-carousel-item v-for="item in imagesList" :key="item.id">
      <!-- <h3>{{ item }}</h3> -->
      
      <img :src="item.idView" />
    </el-carousel-item>
  </el-carousel>

    <el-row align="middle" style="width:100%;background-color:#D3DCE6;">
      <!-- <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="二手" />
      </el-col> -->
      <el-col :span="8" class="center">
        <el-input
          v-model="search"
          @focus="focus"
          @blur="blur"
          @keyup.enter.native="searchHandler"
          placeholder="搜索感兴趣的商品"
        >
          <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
        </el-input>
        <!---设置z-index优先级,防止被走马灯效果遮挡-->
        <el-card
          @mouseenter="enterSearchBoxHanlder"
          v-if="isSearch"
          class="box-card"
          id="search-box"
          style="position:relative;z-index:15"
        >
          <dl v-if="isHistorySearch">
            <dt class="search-title" v-show="history">历史搜索</dt>
            <dt class="remove-history" v-show="history" @click="removeAllHistory">
              <i class="el-icon-delete"></i>清空历史记录
            </dt>
            <el-tag
              v-for="search in historySearchList"
              :key="search.id"
              closable
              :type="search.type"
              @close="closeHandler(search)"
              style="margin-right:5px; margin-bottom:5px;"
            >{{search.name}}</el-tag>
            <dt class="search-title">热门搜索</dt>
            <dd v-for="search in hotSearchList" :key="search.id">{{search}}</dd>
          </dl>
          <dl v-if="isSearchList">
            <dd v-for="search in searchList" :key="search.id">{{search}}</dd>
          </dl>
        </el-card>
      </el-col>
    </el-row>



  <div>


      <!-- <el-table 
      :data="list1"
      border
      fit
      highlight-current-row
      rules=none cellspacing=0 align=center> -->

    <el-row :gutter="10" style="width:100%;background-color:#D3DCE6;" >
  
          
          <el-col :span="6" padding="10" v-for="(o, index) in list1" :key="o" >
          


          <el-card :body-style="{ padding: '50px' }"  shadow="always">      
            <img v-bind:src="URL+list1[index].goodsPicture" class="image" />
            <div style="padding: 14px;">
            
              <p>{{list1[index].goodsName}}</p>
              <p  style="color:red">$ {{list1[index].goodsNewprice}}</p>

              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="add(list1[index].goodsId)">加入购物车</el-button>
              </div>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="com(list1[index].goodsId)">查看商品详细信息</el-button>
              </div>
            </div>
         </el-card> 

    
       </el-col>
      
    </el-row>
  </div>
</div>
</template>

<script>
import saler from '@/api/manage/saler'
import user from '@/api/manage/user'
import * as RandomUtil from "../../utils/randomUtil"
import * as Store from '../../utils/store'
export default {
  data() {
    return {
       URL:"http://localhost:80/image/",
       
          page:1,
          limit:10,
          total:0,
          list1:null,
          form: {
            userId: '',
            goodsId: '',
      },
      cform:{
        goodsName:''
      },
       imagesList:[{id:0,idView:require("../../assets/images/board.jpg")},{id:1,idView:require("../../assets/images/world.jpg")},{id:2,idView:require("../../assets/images/world.jpg")}],
      //  currentDate: new Date(),

      search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      hotSearchList: ["暂无热门搜索"], //热门搜索数据
      historySearchList: [], //历史搜索数据
      searchList: ["暂无数据"], //搜索返回数据,
      history: false,
      types: ["", "success", "info", "warning", "danger"] //搜索历史tag式样
    };
  },
  created () {
  
    
    
  this.getList1()

  },
  methods: {
    com(goodsid){
      var id = parseInt(this.$route.query.userid)
      var goodid = parseInt(goodsid)
      this.$router.push({  path:  '/user/comment' , query:{userid:id,goodid:goodid}  })
    },
    add(goodsId){
      var id = parseInt(this.$route.query.userid)
      this.form.userId=id
      this.form.goodsId=goodsId
      console.log("id:"+id)
      console.log("goodsid:"+goodsId)

      user.add(this.form)
      .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '操作成功!'
                    });
              })
             // this.reload() 
       
    },
    getList1(){
        //console.log("asudfluahfl")
            saler.getPageListOkpublishGoodsNew(this.page,this.limit)
                .then(response=>{//请求成功
                //response接口返回的数据
                    
                    this.list1=response.data.rows
                    this.total=response.data.total
                    console.log(this.list1)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key==1){

        var id = parseInt(this.$route.query.userid);
        this.$router.push({ path: "/user/list", query: { userid: id } });
        }else if(key==2){
          console.log("eee")
          var id = parseInt(this.$route.query.userid)
           this.$router.push({ path:  '/user/trolly', query:{userid:id}})
        }
      },
    focus() {
      this.isFocus = true;
      this.historySearchList =
        Store.loadHistory() == null ? [] : Store.loadHistory();
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    blur() {
      var self = this;
      this.searchBoxTimeout = setTimeout(function() {
        self.isFocus = false;
      }, 300);
    },
    enterSearchBoxHanlder() {
      clearTimeout(this.searchBoxTimeout);
    },
    searchHandler() {
      //随机生成搜索历史tag式样
      console.log(this.search)
      saler.getPageListSearchGoods(this.page,this.limit,this.search)
                .then(response=>{//请求成功
                //response接口返回的数据
                    
                    this.list1=response.data.rows
                    this.total=response.data.total
                    console.log(this.list1)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
      let n = RandomUtil.getRandomNumber(0, 5);
      let exist =
        this.historySearchList.filter(value => {
          return value.name == this.search;
        }).length == 0
          ? false
          : true;
      if (!exist) {
        this.historySearchList.push({ name: this.search, type: this.types[n] });
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    closeHandler(search) {
      this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
      Store.saveHistory(this.historySearchList);
      clearTimeout(this.searchBoxTimeout);
      if (this.historySearchList.length == 0) {
        this.history = false;
      }
    },
    removeAllHistory() {
      Store.removeAllHistory();
    }
  },
  computed: {
    isHistorySearch() {
      return this.isFocus && !this.search;
    },
    isSearchList() {
      return this.isFocus && this.search;
    },
    isSearch() {
      return this.isFocus;
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.el-card{
		margin:20px; //下边距
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
    width: 140px;

    height: 100px;
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
  margin-left: 500px;
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


