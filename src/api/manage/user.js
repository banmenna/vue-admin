import request from '@/utils/request'
export default {
    addform(userId,  formId, total) {
        return request({
            url: `/adminmanage/comment/addform/${userId}/${formId}/${total}`,
            method: 'get',
        })
    },
    task(list) {
        return request({
            url: `/adminmanage/comment/Task/${list}`,
            method: 'get',
        })
    },
    addComment(comment,  star,  commentId)  {         return  request({             url:   `/adminmanage/comment/addComment/${comment}/${star}/${commentId}`,             method:   'get',          })

             },

     pay(userId,  formId, list)  {         return  request({             url:   `/adminmanage/comment/pay/${userId}/${formId}/${list}`,             method:   'get',          })     },
    updateComment(userId, formId, list) {
        return request({
            url: `/adminmanage/comment/updateComment/${userId}/${formId}/${list}`,
            method: 'get',
        })
    },
    createList(userId) {
        return request({
            url: `/adminmanage/comment/create/${userId}`,
            method: 'get',
            // data:formId
        })
    },
    getComment(goodsId) {
        return request({
            url: `/adminmanage/comment/getComment/${goodsId}`,
            method: 'get',

        })
    },
    add(comment) { //将这个对象传给后端，存入数据库，用户和商品的id，用于记录用户将该商品加入购物车，state=0，如果他购买了state=1
        return request({
            url: `/adminmanage/user/add`,
            method: 'post',
            data: comment
        })
    },
    createRate(goodsId, goodsRate) {
        return request({
            url: `/adminmanage/goods/createRate/${goodsId}/${goodsRate}`,
            method: 'get'
        })
    },
    confirm(commentId) {
        return request({
            url: `/adminmanage/comment/confirm/${commentId}`,
            method: 'get'
        })
    },
    refund(commentId) {
        return request({
            url: `/adminmanage/comment/refund/${commentId}`,
            method: 'get'
        })
    },

    abolish(commentId) {
        return request({
            url: `/adminmanage/comment/abolish/${commentId}`,
            method: 'delete'
        })
    },
    registerUser(registerVo) {
        return request({
            url: '/adminmanage/user/register',
            method: 'post',
            data: registerVo
        })
    },
    loginUser(user) {
        return request({
            url: '/adminmanage/user/login',
            method: 'post',
            data: user
        })
    },
    getTrollyGoods(current, limit, userId) {
        return request({
            url: `/adminmanage/comment/getTrollyGoods/${current}/${limit}/${userId}`,
            method: 'get',
            data: {
                current,
                limit
            }
        })
    },
    delete(userId, goodsId) {
        return request({
            url: `/adminmanage/comment/delete/${userId}/${goodsId}`,
            method: 'delete'
        })
    },
    removeAll(userId) {
        return request({
            url: `/adminmanage/comment/remove/${userId}`,
            method: 'delete'
        })
    },
}