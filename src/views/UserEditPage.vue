<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, toRef } from 'vue'
import { updateUser } from '@/api/user.ts'
import { showSuccessToast } from 'vant'
import { useUserStore } from '@/stores/User.ts'
import { storeToRefs } from 'pinia'
import BasicLayout from '@/layouts/BasicLayout.vue'

defineOptions({
  name: 'UserEditPage'
})

const router = useRouter()
const route = useRoute()
const editInfo = ref({
  editKey: route.query.editKey as string || '',
  editName: route.query.editName as string || '',
  currentValue: route.query.currentValue as string || ''
})
const currentValue = toRef(editInfo.value, 'currentValue')
const fieldValue = ref('')
const store = useUserStore()
const { currentUserInfo } = storeToRefs(store)

const show = ref(false)
// 性别选项
const options = [
  {
    text: '男',
    value: '0'
  },
  {
    text: '女',
    value: '1'
  }
]

// 页面加载时处理字段初始值
if (editInfo.value.editKey === 'gender') {
  // 性别字段特殊处理
  const defaultGender = options.find(item => item.value === editInfo.value.currentValue);
  fieldValue.value = defaultGender ? defaultGender.text : '';
} else {
  // 处理空值情况
  if (editInfo.value.currentValue === null ||
    editInfo.value.currentValue === 'null' ||
    editInfo.value.currentValue === undefined ||
    editInfo.value.currentValue === '') {
    // 将所有空值情况统一设为空字符串
    editInfo.value.currentValue = '';
  }

  // 为其他字段也设置fieldValue
  fieldValue.value = editInfo.value.currentValue;
}

// 电话号码验证函数
const validatePhone = () => {
  // 检查是否是11位数字
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(currentValue.value);
};

// 邮箱验证函数
const validateEmail = () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(currentValue.value);
};

const onSubmit = async () => {
  store.updateCurrentUserInfo(editInfo.value.editKey, editInfo.value.currentValue)
  const res = await updateUser(currentUserInfo.value)
  if (res?.code === 0 && res?.data as number > 0) {
    showSuccessToast('修改成功')
    await router.replace('/user')
  }
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map(option => option.text).join('/')
}
</script>

<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <div v-if="editInfo.editKey === 'gender'">
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="性别"
          placeholder="请选择性别"
          @click="show = true"
        />
        <van-popup v-model:show="show" round position="bottom">
          <van-cascader
            v-model="currentValue"
            title="性别"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
      </div>
      <div v-else-if="editInfo.editKey === 'phone'">
        <van-field
          v-model="editInfo.currentValue"
          :label="editInfo.editName"
          :placeholder="'请输入' + editInfo.editName"
          :rules="[
      { required: true, message: '请填写' + editInfo.editName },
      {
        validator: validatePhone,
        message: '请输入正确的手机号码'
      }
    ]" />
      </div>
      <div v-else-if="editInfo.editKey === 'email'">
        <van-field
          v-model="editInfo.currentValue"
          :label="editInfo.editName"
          :placeholder="'请输入' + editInfo.editName"
          :rules="[
      { required: true, message: '请填写' + editInfo.editName },
      {
        validator: validateEmail,
        message: '请输入正确的邮箱格式'
      }
    ]" />
      </div>
      <div v-else>
        <van-field
          v-model="editInfo.currentValue"
          :label="editInfo.editName"
          :placeholder="'请输入' + editInfo.editName"
          :rules="[{ required: true, message: '请填写' + editInfo.editName }]" />
      </div>
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
