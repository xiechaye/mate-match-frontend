<script setup lang="ts">
import 'vant/es/toast/style'
import { onMounted, ref } from 'vue'
import { userRegister } from '@/api/user.ts'
import { useUserStore } from '@/stores/User'

import { useRouter, useRoute } from 'vue-router';
import { showFailToast, showSuccessToast } from 'vant'
import BasicLayout from '@/layouts/BasicLayout.vue'
defineOptions({
  name: 'UserRegisterPage',
})

const store = useUserStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if(store.currentUserInfo !== null && Object.keys(store.currentUserInfo).length !== 0) {
    const url = typeof route.query.backUrl === 'string' ? route.query.backUrl : '/';
    await router.push(url)
  }
})

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const onSubmit = async () => {
  const res = await userRegister(userAccount.value, userPassword.value, checkPassword.value)
  if(res?.code === 0 && res?.data !== null) {
    showSuccessToast('注册成功');
    await router.push({
      path: '/user/login',
      replace: true,
    });
  }else {
    showFailToast('注册 失败');
  }
};
</script>
<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请填写密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="请填写确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </BasicLayout>
</template>

<style scoped>

</style>
