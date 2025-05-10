<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onMounted } from 'vue'
import TeamCartList from '@/components/TeamCartList.vue'
import { useTeamStore } from '@/stores/Team.ts'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'CreateTeamPage'
})

const store = useTeamStore()
const { createTeamList } = storeToRefs(store)

onMounted(async () => {
  await store.getCreateTeamListAct()
})
</script>

<template>
  <BasicLayout>
    <van-empty v-if="!createTeamList || createTeamList.length < 1" description="没有创建队伍" />
    <TeamCartList :TeamInfoList="createTeamList"/>
  </BasicLayout>
</template>

<style scoped>

</style>
