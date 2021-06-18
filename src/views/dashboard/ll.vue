














<template>
  <div class="dashboard-container">
   
<div class="line"></div>
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
      <el-table-column prop="goodsNumber" label="库存"  />


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
         
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="okpublish(scope.row.goodsId)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import saler from '@/api/manage/saler'
export default {
    
 inject:['reload'],
    data() {
      return {
         list:null,
             page:1, 
            limit:10,
            total:0,
      };
    },
    created () {
 
// `this` 指向 vm 实例
  this.getList1()
      //this.defaultForm = JSON.parse(json.stringify(this.cform))

  },
    methods: {
           getList1(){
        console.log("asudfluahfl")
            saler.getPageListOkpublishGoods(this.page,this.limit)
                .then(response=>{//请求成功
                //response接口返回的数据
                    
                    this.list=response.data.rows
                    this.total=response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
                .catch(error=>{
                    console.log(error)
                })
        },
  okpublish(id){//将发布的->下架状态：1->2
          saler.okpublish(id)
          
             
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
    

  }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-menu-item{
    float: right;
}
</style>
