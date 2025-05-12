<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'

const router = useRouter()
const route = useRoute()

const onClickLeft = () => router.back()
const onClickRight = () => router.push('/search')

const active = ref(0);
const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

// 根据路由切换标题
watch(() => route?.meta?.title, (newTitle) => {
  title.value = newTitle || DEFAULT_TITLE
}, { immediate: true })


</script>

<template>
  <van-nav-bar fixed
    :title="title"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
  <router-view>
    <slot></slot>
  </router-view>
  </div>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" name="index" to="/layout">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user" to="/user">用户</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
  #content {
    padding-bottom: 50px;
    padding-top: 50px;
  }
</style>

