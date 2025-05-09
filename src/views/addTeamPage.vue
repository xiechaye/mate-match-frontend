<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { ref } from 'vue'
import { addTeam } from '@/api/team.ts'
import { showFailToast, showSuccessToast } from 'vant'
import router from '@/router'

defineOptions({
  name: 'AddTeamIndex'
})

// 最小可选日期
const minDate = new Date();

const initFormData = {
  'description': '',
  'expireTime': '',
  'maxNum': 1,
  'name': '',
  'password': '',
  'status': 0,
}
// 时间选择器
const showPicker = ref(false);
const onConfirm = ( {selectedValues}: { selectedValues: string[] }  ) => {
  addFormData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};

// 表单数据
const addFormData = ref({ ...initFormData })

const onSubmit = async () => {
  const teamInfo = {
    ...addFormData.value,
    status: Number(addFormData.value.status),
  };
  const res = await addTeam(teamInfo);
  if(res.code === 0 && res.data !== null) {
    showSuccessToast('创建成功');
    console.log(res);
    await router.push({
      path: '/team',
      replace: true,
    })
  }else {
    showFailToast(res.description);
    await router.push({
      path: '/team',
      replace: true,
    })
  }
}
</script>

<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="addFormData.name"
          name="name"
          label="队伍名"
          placeholder="队伍名"
          maxlength="20"
          :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <van-field
          v-model="addFormData.description"
          rows="2"
          autosize
          label="队伍描述"
          maxlength="512"
          type="textarea"
          placeholder="请输入队伍描述"
        />
        <van-field
          v-model="addFormData.expireTime"
          is-link
          readonly
          name="expireTime"
          label="过期时间选择"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
            :min-date="minDate"
            @confirm="onConfirm"
            @cancel="showPicker = false" />
        </van-popup>
        <van-field name="maxNum" label="房间最大人数">
          <template #input>
            <van-stepper min="3" max="20" v-model="addFormData.maxNum" />
          </template>
        </van-field>
        <van-field name="radio" label="单选框">
          <template #input>
            <van-radio-group v-model="addFormData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私密</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="addFormData.status === '2'"
          v-model="addFormData.password"
          type="password"
          name="Password"
          label="房间密码"
          placeholder="房间密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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
