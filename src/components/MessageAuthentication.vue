<template>
  <div>
    <yd-navbar title="信息验证" bgcolor="#B2202A" color="#ffffff"></yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
        <span slot="left">学号/工号：</span>
        <yd-input slot="right" v-model="number" required :show-required-icon="false" type="number" placeholder="请输入您的学号" ></yd-input>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">姓名：</span>
        <yd-input slot="right" v-model="name" required :show-required-icon="false" placeholder="请输入您的姓名"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-button size="large" type="primary" @click.native="send">下一步</yd-button>
  </div>
</template>
<script type="text/babel">
  import axios from 'axios'
  export default{
    name: 'MessageAuthentication',
    data () {
      return {
        number: '',
        name: ''
      }
    },
    methods: {
      send: function () {
        let that = this
        if (that.number === '' || that.name === '') {
          that.$dialog.toast({mes: '输入信息不能为空，请检查信息重新输入！', timeout: 2000})
        } else {
          axios.get('/static/common.json', {
            number: that.number,
            name: that.name
          })
            .then((response) => {
              response = response.data
              if (String(response.code) === '0') {
                let type = that.$route.params.type
                let status = that.$route.params.status
                if (status !== '0') {
                  window.location = '#/Login/' + type
                } else {
                  window.location = '#/SetPassword/' + type
                }
              } else {
                that.$dialog.toast({mes: '信息验证失败，请检查信息输入是否正确！', timeout: 2000})
              }
            })
            .catch(function (error) {
              that.$dialog.toast({mes: '数据提交失败，请稍后再试！', timeout: 2000})
              console.log(error)
            })
        }
      }
    }
  }
</script>
<style>

</style>
