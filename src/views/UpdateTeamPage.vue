<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { onMounted, ref } from 'vue'
import type { TeamType } from '@/model/Team'
import { useRoute } from 'vue-router'
import { getTeamInfo } from '@/api/team.ts'
import { showFailToast, showSuccessToast } from 'vant'
import { updateTeam } from '@/api/team.ts'
import router from '@/router'

defineOptions({
  name: 'UpdateTeamPage',
})
const route = useRoute()
const showPicker = ref(false)
const minDate = new Date()
const updateFormDate = ref<TeamType>({} as TeamType)
const onConfirm = ( {selectedValues}: { selectedValues: string[] }  ) => {
  updateFormDate.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};
onMounted(async () => {
  // 获取路由参数
  const teamId = Number(route.query.teamId)
  const res = await getTeamInfo(teamId)
  if(res.code === 0 && res.data !== null) {
    updateFormDate.value = res.data as TeamType
  } else {
    showFailToast('获取队伍信息失败')
  }
})

const onSubmit = async () => {
  const res = await updateTeam(updateFormDate.value)
  if(res.code !== 0) {
    showFailToast('更新失败')
  } else {
    showSuccessToast('更新成功')
    await router.push('/team')
  }
}

</script>

<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="updateFormDate.name"
          name="name"
          label="队伍名"
          placeholder="队伍名"
          maxlength="20"
          :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <van-field
          v-model="updateFormDate.description"
          rows="2"
          autosize
          label="队伍描述"
          maxlength="512"
          type="textarea"
          placeholder="请输入队伍描述"
        />
        <van-field
          v-model="updateFormDate.expireTime"
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
            <van-stepper min="3" max="20" v-model="updateFormDate.maxNum" />
          </template>
        </van-field>
        <van-field name="radio" label="单选框">
          <template #input>
            <van-radio-group v-model="updateFormDate.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私密</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="updateFormDate.status === '2'"
                   v-model="updateFormDate.password"
                   type="password"
                   name="Password"
                   label="房间密码"
                   placeholder="房间密码"
                   :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          更新
        </van-button>
      </div>
    </van-form>
  </BasicLayout>
</template>

<style scoped>

</style>
