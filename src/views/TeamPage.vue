<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onMounted, ref } from 'vue'
import { getTeamList } from '@/api/team.ts'
import TeamCartList from '@/components/TeamCartList.vue'
import type { TeamType } from '@/model/Team'
import { showFailToast } from 'vant'

defineOptions({
  name: 'TeamPage'
})

const teamInfoList = ref<TeamType[]>([])

onMounted(async () => {
  const res = await getTeamList()
  if (res.code === 0 && res.data.length > 0){
    teamInfoList.value = res.data as TeamType[]
  } else {
    showFailToast('获取团队列表失败')
  }
})
const searchValue = ref('');
const onSearch = async () => {
  const res = await getTeamList(searchValue.value)
  if (res.code === 0 && res.data.length > 0){
    teamInfoList.value = res.data as TeamType[]
  }
}
</script>

<template>
  <BasicLayout>
    <form action="/">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <van-empty v-if="!teamInfoList || teamInfoList.length < 1" description="搜索结果为空" />
    <TeamCartList :TeamInfoList="teamInfoList"/>
  </BasicLayout>
</template>

<style scoped>

</style>
