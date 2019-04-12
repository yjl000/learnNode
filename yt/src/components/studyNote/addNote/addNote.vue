<template>
    <div class="addNote">
      <h3>添加笔记</h3>
      <div class="content">
        <div class="label">
          <span>标签：</span>
          <Select v-model="labelValue" style="width:90%">
            <Option v-for="item in labelList" :value="item.value" :key="item.value">{{ item.value }}</Option>
          </Select>
        </div>
        <div class="title">
          <span>标题：</span>
          <Input v-model="titleValue" placeholder="请输入标题" style="width: 90%" />
        </div>
        <div class="detail">
          <span>内容：</span>
          <vue-editor v-model="content"></vue-editor>
        </div>
        <Button type="primary">提交</Button>
      </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'addNote',
  data () {
    return {
      labelValue: '',
      titleValue: '',
      content: '',
      labelList: [
        {
          value: '前端'
        },
        {
          value: '后端'
        }
      ]
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style scoped lang="less">
@import "./addNote";
</style>
