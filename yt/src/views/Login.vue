<template>
  <div class="login-wrapper">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" block>
      <FormItem prop="user">
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
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
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
          { type: 'string', min: 4, message: 'The password length cannot be less than 4 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.formInline).then((res) => {
            console.log(res.data.status)
            if (res.data.status === '200') {
              this.$Message.success('登录成功!')
              sessionStorage.setItem('loginInfo', JSON.stringify(res.data))
              this.$router.replace('/index')
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
