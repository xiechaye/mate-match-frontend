import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TeamType } from '@/model/Team'
import { getCreateTeam, getJoinTeam, getTeamList } from '@/api/team.ts'
import { joinTeam } from '@/api/team.ts'
import { showFailToast } from 'vant'
import type { UserType } from '@/model/User'

export const useTeamStore = defineStore('team', () => {
  const createTeamList = ref<TeamType[]>([] as TeamType[])
  const joinTeamList = ref<TeamType[]>([] as TeamType[])
  // 队伍列表信息
  const teamInfoList = ref<TeamType[]>([] as TeamType[])

  // 获取个人创建的队伍
  const getCreateTeamListAct = async () => {
    const res = await getCreateTeam()
    if(res.code === 0){
      createTeamList.value = res.data as TeamType[]
    } else {
      createTeamList.value = []
    }
  }

  // 获取个人加入的队伍
  const getJoinTeamListAct = async () => {
    const res = await getJoinTeam()
    if(res.code === 0){
      joinTeamList.value = res.data as TeamType[]
    } else {
      joinTeamList.value = []
    }
  }

  // 获取队伍信息
  const getTeamInfoListAct = async (searchText: string = '', status: number = 0) => {
    const res = await getTeamList(searchText, status)
    if(res.code === 0){
      teamInfoList.value = res.data as TeamType[]
    } else {
      teamInfoList.value = []
    }
  }

  // 队伍加入用户
  const joinTeam = async (teamId: number, user: UserType) => {
    teamInfoList.value.forEach((team) => {
      if (team.id === teamId) {
        team.userList.push(user)
      }
    })
  }

  // 删除创建队伍信息
  const deleteCreateTeamAct = (teamId: number) => {
    createTeamList.value = createTeamList.value.filter((team) => team.id !== teamId)
  }

  // 删除加入队伍信息
  const deleteJoinTeamAct = (teamId: number) => {
    joinTeamList.value = joinTeamList.value.filter((team) => team.id !== teamId)
  }
  // 清除创建队伍信息
  const clearCreateTeamList = () => {
    createTeamList.value = []
  }

  // 清除加入队伍信息
  const clearJoinTeamList = () => {
    joinTeamList.value = []
  }

  return { createTeamList, getCreateTeamListAct,
    joinTeamList, getJoinTeamListAct,
    deleteCreateTeamAct, deleteJoinTeamAct,clearCreateTeamList,
  clearJoinTeamList, teamInfoList, getTeamInfoListAct,joinTeam}
})
