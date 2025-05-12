<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onMounted, ref } from 'vue'
import { useTeamStore } from '@/stores/Team.ts'
import TeamCartList from '@/components/TeamCartList.vue'
import type { TeamType } from '@/model/Team'
import router from '@/router'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'TeamPage'
})

const store = useTeamStore()
const teamInfoList = storeToRefs(store).teamInfoList
const status = ref('public')

onMounted(async () => {
  await store.getTeamInfoListAct()
})
const searchValue = ref('')
const onSearch = async () => {
  const res = await store.getTeamInfoListAct(searchValue.value)
  if (res.code === 0 && res.data.length > 0) {
    teamInfoList.value = res.data as TeamType[]
  }
}

// 点击标签
const onClickTab = async () => {
  await loadTeamList()
}

// 加载队伍列表
const loadTeamList = async () => {
  if(status.value === 'public') {
    await store.getTeamInfoListAct()
  }else if(status.value === 'secret') {
    await store.getTeamInfoListAct(searchValue.value, 2)
  }
}
</script>

<template>
  <BasicLayout>
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs v-model:active="status" @click-tab="onClickTab">
      <van-tab title="公开" name="public">
        <van-empty v-if="!teamInfoList || teamInfoList.length < 1" description="搜索结果为空" />
        <TeamCartList :TeamInfoList="teamInfoList" />
      </van-tab>
      <van-tab title="加密" name="secret">
        <van-empty v-if="!teamInfoList || teamInfoList.length < 1" description="搜索结果为空" />
        <TeamCartList :TeamInfoList="teamInfoList" />
      </van-tab>
    </van-tabs>
    <div id="add" @click="router.push('/team/add')">
      <van-button icon="plus" type="primary" round />
    </div>
  </BasicLayout>

</template>

<style scoped>
#add :deep(.van-button) {
  height: 44px;
  width: 44px;
  position: absolute;
  bottom: 100px;
  right: 30px;
}
</style>
