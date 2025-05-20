<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { updateUser, uploadAvatar } from '@/api/user.ts'
import { type CascaderOption, showSuccessToast, type UploaderFileListItem } from 'vant'
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
const fieldValue = ref('')
const store = useUserStore()
const { currentUserInfo } = storeToRefs(store)

const showGenderPicker = ref(false)
// 性别选项
const genderOptions = [
  {
    text: '男',
    value: '0'
  },
  {
    text: '女',
    value: '1'
  }
]

// 文件
const fileList = ref<UploaderFileListItem[]>([])

// afterRead 函数处理文件读取后的操作（上传）
const afterRead = async (fileItemObject: UploaderFileListItem | UploaderFileListItem[]) => {
  // 处理单个文件或多个文件的情况
  const currentFileItem = Array.isArray(fileItemObject) ? fileItemObject[0] : fileItemObject
  if (!currentFileItem || !currentFileItem.file) {
    console.error('No file found in fileItemObject')
    if (currentFileItem) {
      currentFileItem.status = 'failed'
      currentFileItem.message = '读取文件失败'
    }
    return
  }
  const rawFile = currentFileItem.file

  // 文件类型和大小校验 (Vant Uploader 的 max-size 已经做了大小校验，这里可以做更细致的类型校验)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(rawFile.type)) {
    showSuccessToast('文件类型不支持，请上传 JPG, PNG, GIF 格式的图片')
    currentFileItem.status = 'failed'
    currentFileItem.message = '文件类型不支持'
    // Vant Uploader 通常会自动处理不符合项，如果需要手动从 fileList 移除，需要额外逻辑
    return
  }

  currentFileItem.status = 'uploading'
  currentFileItem.message = '上传中...'

  try {
    const formData = new FormData()
    formData.append('file', rawFile) // 'file' 应该与后端 @RequestPart("file") 匹配

    const response = await uploadAvatar(formData)

    // 后端返回的 BaseResponse<string> 在 response.data 中
    if (response && response.code === 0 && typeof response.data === 'string') {
      currentFileItem.status = 'done'
      currentFileItem.message = response.message || '上传成功'
      currentFileItem.url = response.data // 从 response.data.data 获取URL

      // 关键: 更新 editInfo.value.currentValue 以便表单提交时使用新的头像URL
      if (editInfo.value.editKey === 'avatarUrl') {
        editInfo.value.currentValue = response.data // 更新 editInfo
      }
    } else {
      currentFileItem.status = 'failed'
      // 尝试从 response.data.message 获取后端返回的错误信息
      currentFileItem.message = (response && response.data && response.data.message) || '上传失败，请重试'
    }
  } catch (error) { // 捕获API调用可能发生的错误
    console.error('上传异常:', error)
    currentFileItem.status = 'failed'
    // 尝试从 Axios 错误对象的 response 中获取后端返回的错误信息
    currentFileItem.message = error?.response?.data?.message || error?.message || '上传异常，请检查网络'
  }
}

// 页面加载时处理字段初始值
onMounted(() => {
  if (editInfo.value.editKey === 'gender') {
    const defaultGender = genderOptions.find(item => item.value === editInfo.value.currentValue)
    fieldValue.value = defaultGender ? defaultGender.text : ''
  } else if (editInfo.value.editKey === 'avatarUrl') {
    // 初始化 fileList 用于头像编辑
    if (editInfo.value.currentValue &&
      editInfo.value.currentValue !== 'null' &&
      editInfo.value.currentValue !== '') {
      fileList.value = [{
        url: editInfo.value.currentValue,
        status: 'done',
        message: '上传成功',
        isImage: true // 确保 Vant Uploader 能正确预览图片
      }]
    } else {
      fileList.value = [] // 没有当前头像，则为空列表
    }
  } else {
    // 处理其他字段的空值情况
    if (editInfo.value.currentValue === null ||
      editInfo.value.currentValue === 'null' ||
      editInfo.value.currentValue === undefined ||
      editInfo.value.currentValue === '') {
      editInfo.value.currentValue = ''
    }
    // 对于非性别、非头像字段，如果它们也需要一个独立的显示值 (fieldValue)
    // 而不是直接绑定 editInfo.value.currentValue 到输入框，则需要在这里设置 fieldValue
    // 但当前模板中，其他字段直接使用 v-model="editInfo.currentValue"
    // 如果这些字段也用 fieldValue 显示，则：fieldValue.value = editInfo.value.currentValue;
  }
})

// 电话号码验证函数
const validatePhone = (val: string) => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(val)
}

// 邮箱验证函数
const validateEmail = (val: string) => {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(val)
}

const onSubmit = async () => {
  // 确保 store 更新的是最新的 currentValue (对于头像，已在afterRead中更新)
  store.updateCurrentUserInfo(editInfo.value.editKey, editInfo.value.currentValue)

  // 建议让 updateUser 接受一个包含 id 和待更新字段的对象
  // 或者，如果 store.updateCurrentUserInfo 已经正确更新了 currentUserInfo.value 的所有属性，
  // 并且 updateUser 期望完整的用户信息对象，可以如下操作：
  // 注意：store.updateCurrentUserInfo 是同步的，所以 currentUserInfo.value 应该是更新后的
  const dataToUpdate = { ...currentUserInfo.value } // 创建副本
  // 如果 store 的更新不是立即反映到 currentUserInfo.value (例如是异步的)，
  // 或者为了更明确，可以手动设置要更新的字段：
  // dataToUpdate[editInfo.value.editKey] = editInfo.value.currentValue;

  const res = await updateUser(dataToUpdate)

  if (res?.code === 0 && (res?.data as any) > 0) { // 后端返回的 data 可能不是 number，用 any 兼容
    showSuccessToast('修改成功')
    // 建议在成功后重新从服务器获取最新的用户信息，以保证 store 和视图完全同步
    // await store.fetchCurrentUserInfo(); // 暂时注释，请根据 UserStore 的实际情况调整或移除
    // 如果 store.updateCurrentUserInfo 已经确保 currentUserInfo 是最新的，则上面一行可能不需要
    await router.replace('/user')
  } else {
    showSuccessToast(res?.message || '修改失败，请重试')
  }
}

// 性别选择完毕后，会触发 finish 事件
const onGenderFinish = ({ selectedOptions }: { selectedOptions: CascaderOption[] }) => {
  showGenderPicker.value = false
  if (selectedOptions.length > 0) {
    fieldValue.value = selectedOptions[0].text as string
    editInfo.value.currentValue = selectedOptions[0].value as string
  }
}
</script>

<template>
  <BasicLayout>
    <van-form @submit="onSubmit">
      <!-- 性别编辑 -->
      <div v-if="editInfo.editKey === 'gender'">
        <van-field v-model="fieldValue" is-link readonly label="性别" placeholder="请选择性别"
          @click="showGenderPicker = true" />
        <van-popup v-model:show="showGenderPicker" round position="bottom">
          <van-cascader v-model="editInfo.currentValue" title="性别" :options="genderOptions"
            @close="showGenderPicker = false" @finish="onGenderFinish" />
        </van-popup>
      </div>

      <!-- 头像上传 -->
      <div v-else-if="editInfo.editKey === 'avatarUrl'">
        <van-field name="uploader" label="更换头像">
          <template #input>
            <van-uploader v-model="fileList" :after-read="afterRead" reupload :max-size="2 * 1024 * 1024" :max-count="1"
              accept="image/*" />
          </template>
        </van-field>
      </div>

      <!-- 电话号码编辑 -->
      <div v-else-if="editInfo.editKey === 'phone'">
        <van-field v-model="editInfo.currentValue" :label="editInfo.editName" :placeholder="'请输入' + editInfo.editName"
          :rules="[
            { required: true, message: '请填写' + editInfo.editName },
            { validator: validatePhone, message: '请输入正确的手机号码' }
          ]" />
      </div>

      <!-- 邮箱编辑 -->
      <div v-else-if="editInfo.editKey === 'email'">
        <van-field v-model="editInfo.currentValue" :label="editInfo.editName" :placeholder="'请输入' + editInfo.editName"
          :rules="[
            { required: true, message: '请填写' + editInfo.editName },
            { validator: validateEmail, message: '请输入正确的邮箱格式' }
          ]" />
      </div>

      <!-- 其他文本字段编辑 -->
      <div v-else>
        <van-field v-model="editInfo.currentValue" :label="editInfo.editName" :placeholder="'请输入' + editInfo.editName"
          :rules="[{ required: true, message: '请填写' + editInfo.editName }]" />
      </div>

      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交修改
        </van-button>
      </div>
    </van-form>
  </BasicLayout>
</template>

<style scoped>
/* 可以在这里添加一些样式 */
</style>
