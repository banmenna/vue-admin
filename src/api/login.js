import request from '@/utils/request'

export function loginAdmin(admin) {
  return request({
    url: '/adminmanage/admin/login',
    method: 'post',
    data: admin
  })
}

export function login(username, password) {
  return request({
    url: '/adminmanage/login/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/adminmanage/login/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
