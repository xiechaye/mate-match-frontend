import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserType } from '@/model/user'
import { getCurrentUser} from '@/api/user.ts'

export const useUserStore = defineStore('user', () => {
  const currentUserInfo = ref<UserType>({} as UserType)
  const getCurrentUserInfo = async () => {
    const res = await getCurrentUser();
    if (res.code === 0 && res.data !== null) {
      currentUserInfo.value = res.data as UserType
    }else{
      currentUserInfo.value = {} as UserType
    }
  }

  const updateCurrentUserInfo = (key: string, value: unknown) => {
    if (!currentUserInfo.value) {
      currentUserInfo.value = {} as UserType;
    }

    if (key in currentUserInfo.value) {
      currentUserInfo.value[key as keyof UserType] = value;
    }
  }

  return { currentUserInfo, getCurrentUserInfo, updateCurrentUserInfo }
})
