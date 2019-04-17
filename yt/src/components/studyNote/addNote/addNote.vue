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
        <Button type="primary" @click="submitData">提交</Button>
      </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { addNote } from '@/api/addNote'
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
  methods: {
    submitData () {
      if (!this.labelValue) {
        this.$Message.error('请选择标签!')
        return false
      }
      if (!this.titleValue) {
        this.$Message.error('请输入标题!')
        return false
      }
      if (!this.content) {
        this.$Message.error('请输入内容!')
        return false
      }
      const params = {
        label: this.labelValue,
        title: this.titleValue,
        content: this.content
      }
      addNote(params).then((res) => {
        console.log(res)
      })
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
