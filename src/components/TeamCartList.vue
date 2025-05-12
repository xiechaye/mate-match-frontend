<script setup lang="ts">
import type { TeamType } from '@/model/Team'
import { teamStatusEnum } from '../constants/team.ts'
import iKun from '@/assets/ikun.jpg'
import { deleteTeam, joinTeam, quitTeam } from '@/api/team.ts'
import { showFailToast, showSuccessToast } from 'vant'
import { useUserStore } from '@/stores/User.ts'
import { storeToRefs } from 'pinia'
import { useRouter} from 'vue-router'
import { useRoute } from 'vue-router'
import { useTeamStore } from '@/stores/Team.ts'
import { ref } from 'vue'

interface TeamCartListProps {
  TeamInfoList: TeamType[]
}

const route = useRoute()
const router = useRouter()
const store = useUserStore()
const teamStore = useTeamStore()
const { currentUserInfo } = storeToRefs(store)
const props = defineProps<TeamCartListProps>()

const showDialog = ref(false)
const roomPassword = ref('')
const confirmTeamId = ref(0)

// 清除数据
const clearData = () => {
  roomPassword.value = ''
}

const doJoinTeam = async (teamId: number, status: number) => {
  // 如果是私密队伍，弹出输入密码框
  let res = {}
  if(status === 0) {
    res = await joinTeam(teamId)
  }else if(status === 2) {
    res = await joinTeam(teamId, status, roomPassword.value)
  }

  await teamStore.joinTeam(teamId, currentUserInfo.value)

  if (res.code !== 0) {
    showFailToast(res.description || '加入队伍失败')
  }else {
    showSuccessToast('加入队伍成功')
  }
}

// 更新队伍
const doUpdateTeam = (teamId : number) => {
  router.push({
    path: '/team/update',
    query: {
      teamId: teamId,
    },
  })
}

// 解散队伍
const doDeleteTeam = async (teamId: number) => {
  const res = await deleteTeam(teamId)
  if (res.code !== 0) {
    showFailToast(res.description || '解散队伍失败')
  }else {
    showFailToast('解散队伍成功')
    teamStore.deleteCreateTeamAct(teamId)
  }
}

// 退出队伍
const doQuitTeam = async (teamId: number) => {
  const res = await quitTeam(teamId)
  if (res.code !== 0) {
    showFailToast(res.description || '退出队伍失败')
  }else {
    showSuccessToast('退出队伍成功')
    teamStore.deleteJoinTeamAct(teamId)
  }
}

const preJoinTeam = async (teamId: number, status: number) => {
  // 如果是公开队伍，直接加入
  if(status === 0) {
    await doJoinTeam(teamId, status)
  }else {
    // 如果是私密队伍，弹出输入密码框
    showDialog.value = true
    confirmTeamId.value = teamId
  }
}

// 确认密码
const doConfirm = async () => {
  await doJoinTeam(confirmTeamId.value, 2)
  showDialog.value = false
  clearData()
}

const url = route.path


</script>

<template>
  <div id="teamCartList">
    <van-card
      v-for="teamInfo in TeamInfoList"
      :key="teamInfo.name"
      :desc="teamInfo.description"
      :title="teamInfo.name"
      :thumb="iKun"
    >
      <template #tags>
        <van-tag
          :key="teamInfo.status"
          plain
          type="primary"
          style="margin-right: 8px;
          margin-top: 8px">{{ teamStatusEnum[teamInfo.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{'队伍人数：' + teamInfo.userList.length + '/' + teamInfo.maxNum}}
        </div>
        <div v-if="teamInfo.expireTime">
          {{ '过期时间：' + teamInfo.expireTime }}
        </div>
        <div>
          {{ '创建时间：' + teamInfo.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="currentUserInfo.id === teamInfo.userId &&
         (url === '/team/my/create' || url === '/team/my/join')"
                    size="small"
                    type="primary"
                    @click="doUpdateTeam(teamInfo.id)">更新队伍</van-button>

        <div v-if="url === '/team'">
          <van-button v-if="!teamInfo.userList.some(user => user.id === currentUserInfo.id)"
                      size="small" type="primary"
                      @click="preJoinTeam(teamInfo.id, teamInfo.status)">加入队伍</van-button>
          <van-button v-else
                      size="small" type="primary"
                      disabled>已加入</van-button>
        </div>



        <van-button v-if="currentUserInfo.id === teamInfo.userId &&
         (url === '/team/my/create' || url === '/team/my/join')"
          size="small" plain type="danger" @click="doDeleteTeam(teamInfo.id)">解散队伍</van-button>

        <van-button v-if="url === '/team/my/join' || url === '/team/my/create'"
          size="small" plain type="danger" @click="doQuitTeam(teamInfo.id)">退出队伍</van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showDialog"
                title="输入密码"
                @confirm="doConfirm"
                @cancel="clearData"
                show-cancel-button>
      <van-cell-group inset>
        <van-field v-model="roomPassword"
                   label="密码"
                   placeholder="请输入密码" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<style scoped>
  #teamCartList :deep(.van-image__img) {
    height: 128px;
    object-fit: unset;
  }
  #teamCartList :deep(.van-cell__title) {
    width: 50px;
  }
</style>
