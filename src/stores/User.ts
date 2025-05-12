import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/model/User'
import { getCurrentUser, getMatchUserList, recommendUsers} from '@/api/user.ts'

export const useUserStore = defineStore('user', () => {
  // 当前登录用户
  const currentUserInfo = ref<UserType>({} as UserType)
  // 获取当前登录用户信息
  const getCurrentUserInfo = async () => {
    const res = await getCurrentUser();
    if (res.code === 0 && res.data !== null) {
      currentUserInfo.value = res.data as UserType
    }else{
      currentUserInfo.value = {} as UserType
    }
  }

  // 更新当前登录用户信息
  const updateCurrentUserInfo = (key: string, value: unknown) => {
    if (!currentUserInfo.value) {
      return
    }

    if (key in currentUserInfo.value) {
      currentUserInfo.value[key as keyof UserType] = value;
    }
  }

  // 清除当前登录的用户信息
  const clearCurrentUserInfo = () => {
    currentUserInfo.value = {} as UserType
  }

  // 推荐用户列表（默认）
  const recommendUserList = ref<UserType[]>([])

  // 获取推荐用户列表
  const getRecommendUserListAct = async () => {
    const res = await recommendUsers();
    if(res.code === 0 && res.data !== null) {
      recommendUserList.value = res.data as UserType[]
    }else {
      recommendUserList.value = [] as UserType[]
    }
  }

  // 推荐匹配用户列表
  const matchUserList = ref<UserType[]>([])
  // 获取推荐匹配用户列表
  const getMatchUserListAct = async (num: number) => {
    const res = await getMatchUserList(num);
    if(res.code === 0 && res.data !== null) {
      matchUserList.value = res.data as UserType[]
    }else {
      matchUserList.value = [] as UserType[]
    }
  }

  // 清除推荐用户列表
  const clearRecommendUserList = () => {
    recommendUserList.value = [] as UserType[]
  }

  return { currentUserInfo, getCurrentUserInfo, updateCurrentUserInfo,
    recommendUserList, getRecommendUserListAct, matchUserList, getMatchUserListAct,
    clearCurrentUserInfo, clearRecommendUserList }
})
