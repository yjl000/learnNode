<template>
  <div class="login-wrapper">
    <Form v-show="!isLogin" ref="formInRegin" :model="formInRegin" :rules="ruleInRegin" block>
      <FormItem prop="userName">
        <Input type="text" v-model="formInRegin.userName" placeholder="Username"/>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInRegin.password" placeholder="Password"/>
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleRegin('formInRegin')">注册</Button>
      </FormItem>
    </Form>
    <Form v-show="isLogin" ref="formInline" :model="formInline" :rules="ruleInline" block>
      <FormItem prop="userName">
        <Input type="text" v-model="formInline.userName" placeholder="Username"/>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password"/>
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
    <div class="trans">
      <span>{{trans.text}}</span>
      <a href="javascript:void(0)" @click="transted">{{trans.btn}}</a>
    </div>
  </div>
</template>

<script>
import { login, regin } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
      isLogin: false,
      trans: {
        text: '已有账号，直接',
        btn: '登录'
      },
      formInline: {
        userName: '',
        password: ''
      },
      ruleInline: {
        userName: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'change' }
        ]
      },
      formInRegin: {
        userName: '',
        password: ''
      },
      ruleInRegin: {
        userName: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    transted () {
      if (this.isLogin) {
        this.isLogin = false
        this.trans.text = '已有账号，直接'
        this.trans.btn = '登录'
      } else {
        this.isLogin = true
        this.trans.text = '暂无账号，去'
        this.trans.btn = '注册'
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.formInline).then((res) => {
            console.log(res.data.status)
            if (res.data.status === '200') {
              this.$router.replace('/index')
              this.$Message.success('登录成功!')
              sessionStorage.setItem('loginInfo', JSON.stringify(res.data))
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleRegin (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          regin(this.formInRegin).then((res) => {
            console.log(res.data.status)
            if (res.data.status === '200') {
              this.$Message.success('注册成功!')
              this.isLogin = true
              this.trans.text = '暂无账号，去'
              this.trans.btn = '注册'
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-wrapper{
  & > form{
    width: 80%;
    margin: 20rem auto;
  }
}
</style>
