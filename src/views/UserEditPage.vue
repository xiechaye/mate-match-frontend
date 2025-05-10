<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { updateUser } from '@/api/user.ts'
import { showSuccessToast } from 'vant'
import { toRef } from 'vue'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
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
const currentValue = toRef(editInfo.value, 'currentValue');
const fieldValue = ref('');
const store = useUserStore();
const { currentUserInfo } = storeToRefs(store);

const show = ref(false);
// 性别选项
const options = [
  {
    text: '男',
    value: '0',
  },
  {
    text: '女',
    value: '1',
  },
];

// 页面加载时如果是 gender 字段，把当前值转换为对应的文本
if (editInfo.value.editKey === 'gender') {
  const defaultGender = options.find(item => item.value === editInfo.value.currentValue)
  fieldValue.value = defaultGender ? defaultGender.text : ''
}

const onSubmit = async () => {
  store.updateCurrentUserInfo(editInfo.value.editKey, editInfo.value.currentValue);
  const res = await updateUser(currentUserInfo.value);
  if (res?.code === 0 && res?.data as number > 0) {
    showSuccessToast('修改成功');
    await router.replace('/user');
  }
}

// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  fieldValue.value = selectedOptions.map(option  => option.text).join('/');
};
</script>

<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <body v-if="editInfo.editKey === 'gender'">
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
      </body>
      <body v-else>
      <van-field
        v-model="editInfo.currentValue"
        :label="editInfo.editName"
        placeholder="请输入{{ editInfo.editName }}"
        :rules="[{ required: true, message: '请填写' + editInfo.editName }]" />
      </body>
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
