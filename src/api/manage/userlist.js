import request from '@/utils/request'
export default{
    //用户列表（分页）
    getPageListUser(current,limit){
        return request({
            url:`/adminmanage/admin/pageUser/${current}/${limit}`,
            method:'get',
            data:{
                current,
                limit
            }
        })
    },
    getPageListUserRegister(current,limit){
        return request({
            url:`/adminmanage/admin/pageUserRegister/${current}/${limit}`,
            method:'get',
            data:{
                current,
                limit
            }
        })
    },
    loginAdmin(admin) {
        return request({
          url: '/adminmanage/admin/login',
          method: 'post',
          data: admin
        })
      },
    deleteUserId(userId){
        return request({
            url:`/adminmanage/admin/${userId}`,
            method:'delete'
        })
    },
    disableUser(userId){
        return request({
            url:`/adminmanage/admin/disableUser/${userId}`,
            method:'get'
        })
    },
    getUserInfo(userId){//修改用户时的按id查找
        return request({
            url:`/adminmanage/admin/getUser/${userId}`,
            method:'get'
        })

    },
    updateUser(user){
        return request({
            url:`/adminmanage/admin/updateUser`,
            method:'post',
            data:user
        })
    },
    //对商家注册的审核
    deleteSalerId(salerId){
        return request({
            url:`/adminmanage/admin/deleteSaler/${salerId}`,
            method:'delete'
        })
    },
    disableSaler(salerId){
        return request({
            url:`/adminmanage/admin/disableSaler/${salerId}`,
            method:'get'
        })
    },
    getPageListSalerRegister(current,limit){
        return request({
            url:`/adminmanage/admin/pageSalerRegister/${current}/${limit}`,
            method:'get',
            data:{
                current,
                limit
            }
        })
    },


//对商品申请发布的审核
    getPageListPublishGoods(current,limit){
        return request({
            url:`/adminmanage/admin/pagePublishGoods/${current}/${limit}`,
            method:'get',
            data:{
                current,
                limit
            }
        })
    }, 
    publish(goodsId){
      return request({
        url:`/adminmanage/admin/publish/${goodsId}`,
        method:'get'
    })
    },
    deletePublish(goodsId){
      return request({
        url:`/adminmanage/admin/deletePublish/${goodsId}`,
        method:'delete'
    })
  
    }
}
