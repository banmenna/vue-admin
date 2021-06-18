import request from '@/utils/request'
export default{
  getPageListSearchGoods(current,limit,goodsName){
    return request({
      url:`/adminmanage/saler/pageSearchGoods/${current}/${limit}/${goodsName}`,
      method:'get',
      data:{
        current,
        limit
    }
  })
  },
    registerSaler(saler){
      return request({
        url: '/adminmanage/saler/register',
        method: 'post',
        data: saler
      })
    },
    loginSaler(saler) {
        return request({
          url: '/adminmanage/saler/login',
          method: 'post',
          data: saler
        })
      },
    createGood(good){
      return request({
        url:'/adminmanage/saler/create',
        method: 'post',
        data: good
      })
    },
    getPageListUnpublishGoods(current,limit,salerId){
      return request({
          url:`/adminmanage/saler/pageUnpublishGoods/${current}/${limit}/${salerId}`,
          method:'get',
          data:{
              current,
              limit
          }
      })
  }, 
  unpublish(goodsId){
    return request({
      url:`/adminmanage/saler/Unpublish/${goodsId}`,
      method:'get'
  })
  },
  deleteUnpublish(goodsId){
    return request({
      url:`/adminmanage/saler/deleteUnpublish/${goodsId}`,
      method:'delete'
  })

  },
  //已发布->下架，显示已发布的商品
  getPageListOkpublishGoods(current,limit,salerId){
    return request({
        url:`/adminmanage/saler/pageOkpublishGoods/${current}/${limit}/${salerId}`,
        method:'get',
        data:{
            current,
            limit
        }
    })
}, getPageListOkpublishGoodsNew(current,limit){
  return request({
      url:`/adminmanage/saler/pageOkpublishGoodsNew/${current}/${limit}`,
      method:'get',
      data:{
          current,
          limit
      }
  })
}, 
okpublish(goodsId){
  return request({
    url:`/adminmanage/saler/Okpublish/${goodsId}`,
    method:'get'
})
},
getPageListSoldGoods(current,limit,salerId){
  return request({
      url:`/adminmanage/saler/pageSoldGoods/${current}/${limit}/${salerId}`,
      method:'get',
      data:{
          current,
          limit
      }
  })
}, 
deleteSold(goodsId){
  return request({
    url:`/adminmanage/saler/deleteSold/${goodsId}`,
    method:'delete'
})

},
}