import myAxios from '@/plugins/myAxios.ts'
import qs from 'qs'
import type { ResponseType, UserType } from '@/model/User'

// 根据标签搜索用户
export const searchUsersByTags = (tagNameList: string[]) : Promise<ResponseType> => {
  return myAxios.get('/user/search/tags', {
    params: {
      tagNameList
    },
    // 将params参数序列化
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

// 修改用户信息
export const updateUser = (currentUserInfo : UserType) : Promise<ResponseType> => {
  return myAxios.post('/user/update', {
    ...currentUserInfo
  })
}

// 用户登录
export const userLogin = (userAccount: string, userPassword: string) : Promise<ResponseType> => {
  return myAxios.post('/user/login', {
    userAccount,
    userPassword
  })
}

// 获取当前用户信息
export const getCurrentUser = () : Promise<ResponseType> => {
  return myAxios.get('/user/current')
}

// 获取默认用户
export const recommendUsers = () => {
  return myAxios.get('/user/recommend')
}

// 推荐匹配用户
export const getMatchUserList = (num : number) => {
  return myAxios.get('/user/match', {
    params: {
      num
    }
  })
}

// 用户注册功能
export const userRegister = (userAccount: string, userPassword: string, checkPassword: string)  => {
  return myAxios.post('/user/register', {
    userAccount,
    userPassword,
    checkPassword
  })
}

// 用户退出登录
export const userLogout = () => {
  return myAxios.post('/user/logout')
}
