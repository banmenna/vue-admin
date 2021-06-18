<template>

  <div>
    	<el-container>
  <el-aside width="200px">
<!-- <el-card class="box-card"  > -->
  
  <!-- <div slot="header" class="clearfix">
    <span>个人信息</span> -->
      <!-- </div> -->

      <el-container>
  <el-header style="background-color:#B3C0D1;" >个人中心</el-header>
  <el-main style="background-color:#D3DCE6;text-align: left;">
      <el-form class="leftText" ref="form" :model="form" label-width="80px">
        <tr>
        <el-form-item  label="店铺名">
          <el-row><div style="text-align: left;">{{form.salerName}}</div></el-row>
        </el-form-item>
        </tr>
        <tr>
        <el-form-item label="手机号" >
          <el-row><div>{{form.salerPhone}}</div></el-row>
        </el-form-item>
        </tr>
        <tr>
        <el-form-item label="商家性别">
          <el-row><div>{{form.salerSex}}</div></el-row>
        </el-form-item>
        </tr>
        <tr>
        <el-form-item label="银行账号">
          <el-row><div>{{form.salerBank}}</div></el-row>
        </el-form-item>
        </tr>
        <tr>
        <el-form-item label="账户余额">
          <el-row><div>{{form.salerMoney}}</div></el-row>
        </el-form-item>
        </tr>
        <tr>
        <el-form-item label="商家等级">
          <el-row><div>{{form.salerLevel}}</div></el-row>
        </el-form-item>
        </tr>
        
      </el-form>

      </el-main>
</el-container>
<!-- </el-card> -->
  </el-aside>
    <el-main>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
  <el-tab-pane label="创建商品" name="first">
      <el-form ref="cform" :model="cform" status-icon :rules="rules" label-width="120px"
       target="iframe" >
       <!-- method="POST" action="http://localhost:80/uploadGoodPicture" enctype="multipart/form-data"> -->
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="cform.goodsName"/>
      </el-form-item>
      <el-form-item label="类别" prop="goodsType">
          <el-input v-model="cform.goodsType"/>
      </el-form-item>
     
      <el-form-item label="原价" prop="goodsOldprice">
          <el-input v-model="cform.goodsOldprice"/>
      </el-form-item>
      <el-form-item label="现价" prop="goodsNewprice">
         <el-input v-model="cform.goodsNewprice"/>
      </el-form-item>
      <el-form-item label="尺寸大小" prop="goodsSize">
         <el-input v-model="cform.goodsSize"/>
      </el-form-item>
      <el-form-item label="商品图" prop="goodsPicture">
         <!-- <input type="file" name="file" required/> -->
        <!-- <el-input /> -->
        <el-upload
        
  class="upload-demo"
  action="http://localhost:80/uploadGoodPicture"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  enctype="multipart/form-data"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
      </el-form-item>
      <el-form-item label="库存" prop="goodsNumber">
        <el-input v-model="cform.goodsNumber"/>
      </el-form-item>
      <el-form-item>
        <button class="el-button el-button--default" style="background-color:#00CCFF;"  type="submit" @click="createGood">创建</button>
        <el-button @click="onCancel">清空</el-button>
      </el-form-item>
    </el-form>
    <iframe id="frame" name="iframe" style="display:none;"></iframe>  
  </el-tab-pane>
  <el-tab-pane label="未发布" name="second">
      <el-table
      
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" width="80" />

      <el-table-column prop="goodsType" label="类别" width="120" />

      <el-table-column prop="goodsOldprice" label="原价" width="60" />
      <el-table-column prop="goodsNewprice" label="现价" width="60" />
      <el-table-column prop="goodsSize" label="尺寸"  width="60"/>

      <el-table-column prop="goodsPicture" label="商品图"  >
        <template  slot-scope="scope" >            
          <el-popover placement="left" trigger="hover">
            <img v-bind:src="URL+scope.row.goodsPicture" min-width="700" height="500" />
            <img slot="reference" v-bind:src="URL+scope.row.goodsPicture" style="width: 70px;height:70px">
          </el-popover>
        </template> 
      </el-table-column>
      <el-table-column prop="goodsNumber" label="库存"  />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="unpublish(scope.row.goodsId)">发布</el-button>
   
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUnpublish(scope.row.goodsId)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane label="已发布" name="third">
       <el-table
      
      :data="list1"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" width="80" />

      <el-table-column prop="goodsType" label="类别" width="120" />

      <el-table-column prop="goodsOldprice" label="原价" width="60" />
      <el-table-column prop="goodsNewprice" label="现价" width="60" />
      <el-table-column prop="goodsSize" label="尺寸"  width="60"/>
      <el-table-column prop="goodsPicture" label="商品图"  >
        <template  slot-scope="scope" >            
          <el-popover placement="left" trigger="hover">
            <img v-bind:src="URL+scope.row.goodsPicture" min-width="700" height="500" />
            <img slot="reference" v-bind:src="URL+scope.row.goodsPicture" style="width: 70px;height:70px">
          </el-popover>
        </template> 
      </el-table-column>
      <el-table-column prop="goodsNumber" label="库存"  />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="okpublish(scope.row.goodsId)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane label="已下架" name="fourth">
    <el-table
      
      :data="list2"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" width="80" />

      <el-table-column prop="goodsType" label="类别" width="120" />

      <el-table-column prop="goodsOldprice" label="原价" width="60" />
      <el-table-column prop="goodsNewprice" label="现价" width="60" />
      <el-table-column prop="goodsSize" label="尺寸"  width="60"/>
      <el-table-column prop="goodsPicture" label="商品图"  >
        <template  slot-scope="scope" >            
          <el-popover placement="left" trigger="hover">
            <img v-bind:src="URL+scope.row.goodsPicture" min-width="700" height="500" />
            <img slot="reference" v-bind:src="URL+scope.row.goodsPicture" style="width: 70px;height:70px">
          </el-popover>
        </template> 
      </el-table-column>
      <el-table-column prop="goodsNumber" label="库存"  />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="sold(scope.row.goodsId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
</el-tabs>
 </el-main>  
  </el-container>
      </div>
</template>

<script>
import salerlist from '@/api/manage/salerlist'
import saler from '@/api/manage/saler'
export default {
    
 inject:['reload'],
  data() {


        
      return{
          URL:"http://localhost:80/image/",
form: {
				salerName: '',
				salerPhone: '',
				salerBank: '',
				salerSex: '',
				salerLevel: '',
				salerMoney:''
			},
          list:null,
            page:1,
            limit:10,
            total:0,
            
          list1:null,
          list2:null,

          fileList:[],
          activeName: 'second',
          rules: {
       
        goodsName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        goodsType: [
          { required: true, message: "请输入商品的类型", trigger: "blur" },
        ],
        goodsNewprice: [
          { required: true, message: "请输入商品的现价", trigger: "blur" },
        ],
        goodsSize: [
          { required: true, message: "请上传商品大小", trigger: "blur" },
        ],
        goodsNumber: [
          { required: true, message: "请上传库存" ,trigger: "blur" },
        ]
     },
      cform: {
        goodsName: '',
        goodsType: '',
        goodsOldprice: '',
        goodsNewprice: '',
        goodsSize:'',
        goodsNumber: '',
        salerId:'',
        goodsPicture:''
      },
      }
  },
  
created () {
  
    var id = parseInt(this.$route.query.salerid);
    
    this.cform.salerId=id;
   //console.log(this.cform.salerId+"ad"+id);
   this.getList3(id)
// `this` 指向 vm 实例
  this.getList()
  this.getList1()
  this.getList2()
      //this.defaultForm = JSON.parse(json.stringify(this.cform))

  },
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClick(tab){
          this.activeName=tab.name;
          //console.log("~~~~")
      },
      getList3(id){
        //console.log("asudfluahfl")
          salerlist.getSalerInfo(id)
                .then(response=>{//请求成功
                //response接口返回的数据
                    
                     this.form=response.data.saler
                    // console.log(this.list2.userId+response.data.user)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
      createGood(){
        
           
//                   console.log("get~"+this.cform.goodsOldPrice)
// console.log("get~"+this.cform.goodsNumber)
// console.log("get~"+this.cform.goodsSize)
// console.log("get~"+this.cform.goodsType)
this.$refs.cform.validate(valid => {
        console.log(valid)
        if (valid) {
           
//  console.log("id="+id);
//  console.log("befoe"+this.cform)
//  this.cform.salerId=id;
 console.log("aaa"+this.cform)
      saler.createGood(this.cform)
      // console.log(this.)
      .then(response=>{
        //console.log("get~"+response.data.this.cform)
        this.$message({
          type:'success',
          massage:'修改成功!'
        })
      })
      this.reload() 
      //this.$router.replace({ path:  '/login'  })
        }
        })
    
      },
      onCancel() {
          //this.cform = JSON.parse(json.stringify(this.defaultForm))
         // this.$refs.cform.resetFields()
this.$confirm('是否清空内容', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                })
                     .then(response=>{
                          this.$refs.cform.resetFields()
                    this.$message({
                    type: 'success',
                    message: '成功!'
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });          
            });
                

    },
    getList(){
        //console.log("asudfluahfl")
            saler.getPageListUnpublishGoods(this.page,this.limit,this.cform.salerId)
                .then(response=>{//请求成功
                //response接口返回的数据
                    //console.log(response)
                    this.list=response.data.rows
                    
                    this.total=response.data.total
                    //console.log(this.list)
                    //console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
  unpublish(id){//将未发布的->请求发布状态：-1->0
          saler.unpublish(id)
          
             
          .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '操作成功!'
                    });
              })
              this.reload() 
 //location. reload()
 //this.$router.go(0)
        },
        removeUnpublish(id){
            //alert(id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    saler.deleteUnpublish(id)
                    .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                //回到列表页面
                    this.getList()
                })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        getList1(){
        //console.log("asudfluahfl")
            saler.getPageListOkpublishGoods(this.page,this.limit,this.cform.salerId)
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
  okpublish(id){//将发布的->下架状态：1->2
          saler.okpublish(id)
          
             
          .then(response=>{
            this.getList1() 
                    this.$message({
                    type: 'success',
                    message: '操作成功!'
                    });
              })
               this.reload() 
 //location. reload()
 //this.$router.go(0)
        },getList2(){//下架商品的显示
        //console.log("asudfluahfl")
            saler.getPageListSoldGoods(this.page,this.limit,this.cform.salerId)
                .then(response=>{//请求成功
                //response接口返回的数据
                    
                    this.list2=response.data.rows
                    this.total=response.data.total
                    console.log(this.list2)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
        },sold(id){
            //alert(id)
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    saler.deleteSold(id)
                    .then(response=>{
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                //回到列表页面
                    this.getList2()
                })
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
    

  }
  };
</script>
  
<style scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    width: 12px;
    /* line-height: 200px; */
  }
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    /* line-height: 160px; */
  }
 
  /* .el-table__header{
	  height: 12px;
  } */
  /* .el-form-item{
    display: inline-block;
width: 10px;
height:30px;
line-height:30px;
vertical-align: middle;
text-align: left;
text-align-last: left ;
} */
</style>