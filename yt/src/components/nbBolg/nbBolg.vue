<template>
    <div class="nbBolg">
      <ul>
        <li v-for="item in dataList" :key="item.id">
          <a :href="item.url" target="_self">{{item.name}}</a>
        </li>
      </ul>
      <Button type="primary" @click="addBolg()" disabled>添加更多名人博客</Button>
    </div>
</template>

<script>
import { blogData } from '@/api/blogList'
export default {
  name: 'nbBolg',
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    getList () {
      blogData().then((res) => {
        console.log(res)
        if (parseInt(res.status) === 200) {
          this.dataList = res.data.data
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    addBolg () {
      //
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped lang="less">
  .nbBolg{
    & > ul{
      & > li{
        height: 4rem;
        line-height: 4rem;
        text-align: left;
        text-indent: 2.4rem;
        font-size: 1.4rem;
      }
    }
  }
</style>
