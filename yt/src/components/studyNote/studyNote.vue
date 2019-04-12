<template>
    <div class="studyNote">
      <section class="addBtn">
        <Button type="primary" @click="toAddNote"> + 添加笔记</Button>
      </section>
      <section class="noteList">
        <div class="webWrapper">
          <ul class="label">
            <li>前端</li>
            <li>更多此类型笔记 >></li>
          </ul>
          <ul class="listContent">
            <li @click="toDetail"><a href="javascript:void(0)">1、ts引入第三方js插件的两种方式</a></li>
          </ul>
        </div>
        <div class="webWrapper">
          <ul class="label">
            <li>后端</li>
            <li>更多此类型笔记 >></li>
          </ul>
          <ul class="listContent">
            <li><a href="javascript:void(0)">2、node+mysql空白一段时间，接口请求超时的问题</a></li>
          </ul>
        </div>
      </section>
      <section class="view">
        <router-view/>
      </section>
    </div>
</template>

<script>
export default {
  name: 'studyNote',
  data () {
    return {

    }
  },
  methods: {
    toDetail () {
      this.$router.push('/index/studyNote/noteDetail/1')
    },
    toAddNote () {
      this.$router.push('/index/studyNote/addNote')
    }
  }
}
</script>

<style scoped lang="less">
@import "./studyNote";
</style>
