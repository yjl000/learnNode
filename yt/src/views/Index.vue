<template>
    <div class="index">
      <header>
        <div class="meauList">
          <img src="../assets/home/meau.png" alt="" @click.stop="showMeauList = true">
          <ul v-show="showMeauList" id="meauList">
            <li v-for="item in meauList" :key="item.id" @click="showMeauList = false">
              <router-link class="tab-item" :to="item.url">
                <span class="tab-link">{{item.text}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="userInfo">
          <span style="color: #fff">{{userName}}</span>
          <img src="../assets/home/vatar.png" alt="">
        </div>
      </header>
      <section>
        <router-view/>
      </section>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      showMeauList: false,
      userName: 'user',
      meauList: [
        {
          id: 0,
          url: '/index/home',
          text: '首页'
        },
        {
          id: 1,
          url: '/index/nbBolg',
          text: '名人博客'
        },
        {
          id: 2,
          url: '/index/studyWeb',
          text: '学习网站'
        },
        {
          id: 3,
          url: '/index/studyNote',
          text: '学习笔记'
        },
        {
          id: 4,
          url: '/index/selfZone',
          text: '个人空间'
        },
        {
          id: 5,
          url: '/index/happyDay',
          text: '开心一刻'
        }
      ]
    }
  },
  mounted () {
    console.log(JSON.parse(sessionStorage.getItem('loginInfo')).data.name)
    this.userName = JSON.parse(sessionStorage.getItem('loginInfo')).data.name
    let _that = this
    document.addEventListener('click', function (e) {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      let flag = e.target.contains(document.getElementById('meauList'))
      console.log(flag)
      if (!flag) return
      _that.showMeauList = false
    })
  }
}
</script>

<style scoped lang="less">
.index{
  height: 100%;
  display: flex;
  flex-direction: column;
  & > header{
    height: 4rem;
    padding: 0 .8rem;
    background: #2c3e50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .meauList{
      width: 3.2rem;
      height: 3.2rem;
      position: relative;
      & > ul{
        position: absolute;
        left: 0;
        top: 3.4rem;
        z-index: 9;
        background: #2c3e50;
        border: 1px solid #eeeeee;
        border-radius: .5rem;
        width: 10rem;
        & > li{
          height: 3rem;
          line-height: 3rem;
          & > a > span{
            color: #ecf0f1;
          }
        }
      }
    }
    & > .userInfo{
      display: flex;
      align-items: center;
      & > span{
        display: inline-block;
        margin-right: .5rem;
      }
    }
  }
  & > section{
    flex: 1;
    overflow: hidden;
  }
}
</style>
