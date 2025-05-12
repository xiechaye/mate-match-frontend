<script setup lang="ts">
import 'vant/es/toast/style'
import { onMounted, ref } from 'vue'
import { userLogin } from '@/api/user.ts'
import { useUserStore } from '@/stores/user'

import { useRouter, useRoute } from 'vue-router';
import { showFailToast, showSuccessToast } from 'vant'
import BasicLayout from '@/layouts/BasicLayout.vue'

defineOptions({
  name: 'UserLoginPage',
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
const onSubmit = async () => {
  const res = await userLogin(userAccount.value, userPassword.value);
  const url = typeof route.query.backUrl === 'string' ? route.query.backUrl : '/';

  if(res?.code === 0 && res?.data !== null) {
    showSuccessToast('登录成功');
    store.clearRecommendUserList()
    await router.push(url);
  }else {
    showFailToast(res?.description || '登录失败');
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
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
      <div class="register-link">
        <span @click="router.push('/user/register')">还没有账号？点击注册</span>
      </div>
    </van-form>
  </BasicLayout>
</template>

<style scoped>
.register-link {
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
  color: #1989fa;
}
.register-link span {
  cursor: pointer;
}
</style>
