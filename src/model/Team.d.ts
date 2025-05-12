import type { UserType } from '@/model/User'

export type TeamType = {
  id: number,
  name: string,
  description: string,
  expireTime?: string,
  maxNum: number,
  password?: string,
  // todo 定义枚举值类型更规范
  status: number,
  createTime: Date,
  updateTime: Date,
  userList: UserType[]
}
