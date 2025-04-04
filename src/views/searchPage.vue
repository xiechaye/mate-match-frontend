<script setup lang="ts">
import 'vant/es/toast/style'

import { ref } from 'vue';
import { showFailToast } from 'vant'
defineOptions({
  name: 'SearchPage',
})

// 所有标签
const originTagList = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '方向',
    children: [
      { text: 'Java', id: 'Java' },
      { text: 'python', id: 'python' },
      { text: 'C++', id: 'C++' },
      { text: 'C#', id: 'C#' },
      { text: 'Go', id: 'Go' },
      { text: 'PHP', id: 'PHP' },
      { text: 'JavaScript', id: 'JavaScript' },
      { text: 'TypeScript', id: 'TypeScript' },
    ],
  },
];

// 选中的标签
const activeIds = ref([]);
// 选中的标签的索引
const activeIndex = ref();
// 选中的标签的列表
const tagList = ref(originTagList);

const doClose = (tag: string) => {
  activeIds.value = activeIds.value
    .filter((item: string) => item !== tag);
}

// 输入框内容
const searchText = ref('');
const onUpdate =  () => {
  // 根据输入框内容过滤标签
  tagList.value = originTagList.map(tag => {
    const tempChildren = [...tag.children];
    const tempTag = {...tag};
    tempTag.children = tempChildren.filter(item => item.id.includes(searchText.value))
    return tempTag;
  }).filter(tag => tag.children.length > 0);
}
// 搜索
const onSearch = () => {
  if(activeIds.value.length === 0) {
    showFailToast('请至少选择一个标签');
    return;
  }
  console.log('搜索', activeIds.value);
}
</script>

<template>
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索标签"
    @update:model-value="onUpdate"
    @search="onSearch"
  >
    <template #action>
      <div @click="onSearch">搜索</div>
    </template>
  </van-search>
  <van-divider>已选标签</van-divider>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds" :key="tag">
      <van-tag :show="true" closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider>选择标签</van-divider>

  <van-tree-select
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    :items="tagList"
  />
</template>

<style scoped>

</style>
