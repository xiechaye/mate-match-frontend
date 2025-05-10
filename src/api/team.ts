import myAxios from '@/plugins/myAxios.ts'
import type { TeamType } from '@/model/Team'

// 创建队伍
export const addTeam = (teamInfo : TeamType) => {
  return myAxios.post('/team/add', {
    ...teamInfo
  })
}

// 获取队伍信息
export const getTeamList = (searchText: string = '') => {
    return myAxios.get('/team/list', {
      params: {
        searchText
      }
    })
}

// 加入队伍
export const joinTeam = (teamId: number) => {
  return myAxios.post('/team/join' ,{
    teamId
  })
}

// 通过id获取队伍信息
export const getTeamInfo = (id: number) => {
  return myAxios.get('/team/get', {
    params: {
      id
    }
  })
}

// 更新队伍信息
export const updateTeam = (teamInfo: TeamType) => {
  return myAxios.post('/team/update', {
    ...teamInfo
  })
}

// 获取个人创建的队伍
export const getCreateTeam = () => {
  return myAxios.get('/team/list/create')
}

// 获取个人加入的队伍
export const getJoinTeam = () => {
  return myAxios.get('/team/list/my/join')
}

// 队长解散队伍
export const deleteTeam = (teamId: number) => {
  return myAxios.delete(`/team/delete/${teamId}`)
}

// 退出队伍
export const quitTeam = (teamId: number) => {
  return myAxios.delete(`/team/quit/${teamId}`)
}
