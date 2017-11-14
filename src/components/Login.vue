<template>
  <div>
    <yd-navbar title="登录" bgcolor="#B2202A" color="#ffffff"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">密码：</span>
        <yd-input slot="right" type="password" v-model.trim="password" placeholder="请输入密码"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="send">登录</yd-button>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios'
  export default{
    name: 'Login',
    data () {
      return {
        password: ''
      }
    },
    methods: {
      send: function () {
        let that = this
        if (that.password !== '') {
          axios.get('/static/common.json', {
            password: that.password
          })
            .then(function (response) {
              response = response.data
              if (String(response.code) === '0') {
                let type = that.$route.params.type
                if (type === '1') {
                  window.location = '#/AnnualCheck'
                } else if (type === '2') {
                  window.location = '#/Questionnaire'
                } else if (type === '3') {
                  window.location = '#/Enter'
                } else if (type === '4') {
                  window.location = '#/RegisterInfo'
                }
              } else {
                that.$dialog.toast({mes: that.errorMsg, timeout: 2000})
              }
            })
            .catch(function (error) {
              that.$dialog.toast({mes: '操作失败！', timeout: 2000})
              console.log(error)
            })
        } else {
          that.$dialog.toast({mes: '信息填写不完整，请填好后重新提交！', timeout: 2000})
        }
      }
    }
  }
</script>
<style></style>
