<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

defineOptions({
  name: 'UserEditPage'
})

const route = useRoute();
const editInfo = ref({
  editKey: route.query.editKey as string || '',
  editName: route.query.editName as string || '',
  currentValue: route.query.currentValue as string || '',
});

const onSubmit = () => {
  console.log('提交', editInfo.value);
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="editInfo.currentValue"
        :name="editInfo.editKey"
        :label="editInfo.editName"
        :placeholder="editInfo.editName"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>
