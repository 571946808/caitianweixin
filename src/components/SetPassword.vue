<template>
  <div>
    <yd-navbar title="密码设置" bgcolor="#B2202A" color="#ffffff"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">手机号：</span>
        <yd-input slot="right" v-model.trim="tel" ref="tel" required :show-required-icon="false" regex="mobile" placeholder="请输入手机号码"></yd-input>
        <yd-sendcode slot="right" v-model.trim="code" @click.native="sendCode" type="warning"></yd-sendcode>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">短信验证码：</span>
        <yd-input slot="right" v-model.trim="authCode" regex="/[0-9a-zA-Z]{4}/" required :show-required-icon="false" placeholder="请输入验证码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" min="6" v-model.trim="password" required :show-required-icon="false" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">确认密码：</span>
        <yd-input slot="right" type="password" min="6" v-model.trim="rePassword" required :show-required-icon="false" placeholder="请再次输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="send">立即设置密码</yd-button>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios'
  export default{
    name: 'SetPassword',
    data () {
      return {
        tel: '',
        authCode: '',
        code: false,
        password: '',
        rePassword: ''
      }
    },
    methods: {
      sendCode () {
        let that = this
        that.$dialog.loading.open('发送中...')
        axios.post('/static/common.json', {
          tel: that.tel
        })
          .then((response) => {
            response = response.data
            if (String(response.code) === '0') {
              setTimeout(() => {
                that.code = true
                that.$dialog.loading.close()
                that.$dialog.totast({
                  mes: '已发送',
                  icon: 'success',
                  timeout: 1500
                })
              }, 1000)
            } else {
              that.$dialog.toast({mes: '操作失败！', timeout: 2000})
            }
          })
          .catch(function (error) {
            that.$dialog.toast({mes: '操作失败！', timeout: 2000})
            console.log(error)
          })
      },
      send () {
        let that = this
        if (that.tel === '' || that.authCode === '' || that.password === '' || that.rePassword === '') {
          that.$dialog.toast({mes: '信息填写不完整，请填好后重新提交！', timeout: 2000})
        } else if (!that.$refs.tel.valid) {
          that.$dialog.toast({mes: '手机号码格式不正确，请填好后重新提交！', timeout: 2000})
        } else if (that.password.length < 7) {
          that.$dialog.toast({mes: '密码至少为6位，请检查后重新提交！', timeout: 2000})
        } else if (that.password !== that.rePassword) {
          that.$dialog.toast({mes: '输入密码不一致，请检查后重新提交！', timeout: 2000})
        } else {
          axios.get('/static/common.json', {
            tel: that.tel,
            authCode: that.authCode,
            password: that.password
          })
            .then((response) => {
              response = response.data
              if (String(response.code) === '0') {
                that.$dialog.toast({mes: '提交成功！', timeout: 2000})
                window.location = '#/Login/' + that.$route.params.type
              } else {
                that.$dialog.toast({mes: response.errMsg, timeout: 2000})
              }
            })
            .catch(function (error) {
              that.$dialog.toast({mes: '操作失败！', timeout: 2000})
              console.log(error)
            })
        }
      }
    }
  }
</script>
<style>
  .yd-cell-right button{
    width: 3.4rem;
  }
  .yd-input-password:after {
    content: "" !important;
  }
</style>
