<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'

defineOptions({
  name: 'UserPage',
})
</script>

<template v-if="userInfo">
  <BasicLayout>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/team/my/create" />
    <van-cell title="我加入的队伍" is-link to="/team/my/join" />
  </BasicLayout>
</template>

<style scoped>

</style>
