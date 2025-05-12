import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TeamType } from '@/model/Team'
import { getCreateTeam, getJoinTeam } from '@/api/team.ts'


export const useTeamStore = defineStore('team', () => {
  const createTeamList = ref<TeamType[]>([] as TeamType[])
  const joinTeamList = ref<TeamType[]>([] as TeamType[])

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
  clearJoinTeamList}
})
