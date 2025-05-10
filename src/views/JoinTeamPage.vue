<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onMounted } from 'vue'
import TeamCartList from '@/components/TeamCartList.vue'
import { useTeamStore } from '@/stores/Team.ts'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'JoinTeamPage'
})

const store = useTeamStore()
const { joinTeamList } = storeToRefs(store)

onMounted(async () => {
  await store.getJoinTeamListAct();
})
</script>

<template>
  <BasicLayout>
    <van-empty v-if="!joinTeamList || joinTeamList.length < 1" description="没有加入的队伍" />
    <TeamCartList :TeamInfoList="joinTeamList"/>
  </BasicLayout>
</template>

<style scoped>

</style>
