import request from '@/utils/request'
export default {    
    Rate() {        
        return  request({            
            url: `/adminmanage/saler/Rate`,
            method: 'get',
        })
    },
    getSalerInfo(salerId) { //修改时的按id查找
        return request({
            url: `/adminmanage/saler/getSaler/${salerId}`,
            method: 'get'
        })

    },
    //商家列表（分页）
    getPageListSaler(current, limit) {
        return request({
            url: `/adminmanage/saler/pageSaler/${current}/${limit}`,
            method: 'get',
            data: {
                current,
                limit
            }
        })
    },
    updateSaler(saler) {
        return request({
            url: `/adminmanage/saler/updateSaler`,
            method: 'post',
            data: saler
        })
    },
}