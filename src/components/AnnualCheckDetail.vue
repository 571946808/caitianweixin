<template>
  <div>
    <yd-navbar title="年度考核" bgcolor="#0399BA" color="#ffffff"></yd-navbar>
    <div class="content">
      <p class="title">{{title}}</p>
      <p class="subTitle">发布人：{{position}} 发布时间：{{date}} 截止日期：{{endDate}}</p>
      <br>
      <p class="select tip">请客观填写此考核评选卷，得票最多的老师被评选为优秀或先进。</p>
      <br>
      <template v-for="item,index in list">
        <p class="select">{{index+1}}.{{item.selectTitle}}*</p>
        <p class="select">{{item.selectContent}}</p>
        <detail-com :list="item.list" :formData="formData"></detail-com>
        <br>
      </template>
      <yd-button size="large" type="primary" @click.native="send">提交</yd-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import DetailCom from '@/sub/DetailCom'
  export default{
    name: 'AnnualCheckDetail',
    data () {
      return {
        title: '',
        position: '',
        date: '',
        endDate: '',
        list: [],
        formData: {}
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData: function () {
        let that = this
        axios.get('/static/annualcheckdetail.json', {
          id: that.$route.params.id
        })
          .then((response) => {
            response = response.data
            if (response.code === '0') {
              this.title = response.title
              this.position = response.position
              this.date = response.date
              this.endDate = response.endDate
              this.list = response.list
            } else {
              this.$dialog.toast({mes: '加载数据异常', timeout: 2000})
            }
          })
          .catch(function (error) {
            this.$dialog.toast({mes: '加载数据异常', timeout: 2000})
            console.log(error)
          })
      },
      send: function () {
        let that = this
        if (that.defender() === 1) { // 若返回值为1，则验证成功发送数据；返回值为2，验证表单部分项为空；返回值为其他，自定义提示信息
          axios.post('/static/common.json', {
            id: that.$route.params.id,
            formData: that.formData
          })
            .then((response) => {
              response = response.data
              if (response.code === '0') {
                window.location = '#/AnnualCheck'
              } else {
                that.$dialog.toast({mes: '提交失败！', timeout: 2000})
              }
            })
            .catch(function (error) {
              that.$dialog.toast({mes: '操作失败！', timeout: 2000})
              console.log(error)
            })
        } else if (that.defender() === 2) {
          that.$dialog.toast({mes: '请将问卷填写完整！', timeout: 2000})
        }
      },
      defender: function () {
        let flag
        for (let i = 0; i < this.list.length; i++) {
          for (let j = 0; j < this.list[i].list.length; j++) {
            let arr = this.list[i].list[j]
            if (arr.id) {
              flag = arr.id
              if (arr.type === '2' && this.formData[flag] === undefined) {
                return 2
              } else if (arr.type === '3') {
                if (this.formData[flag].length === 0) {
                  return 2
                } else if (this.formData[flag].length > arr.count) {
                  this.$dialog.toast({mes: arr.tableHead + '最多可选' + arr.count + '项,请填好后重新提交！', timeout: 2000})
                  return 3
                }
              } else if (arr.type === '4') {
                if (!this.formData[flag].length) {
                  return 2
                }
                for (let k = 0; k < this.formData[flag].length; k++) {
                  if (this.formData[flag][k] === -1) {
                    return 2
                  }
                }
              } else if (arr.type === '5') {
                if (!this.formData[flag].length) {
                  return 2
                }
                for (let k = 0; k < this.formData[flag].length; k++) {
                  console.log(this.formData[flag][k])
                  if (this.formData[flag][k] === '') {
                    return 2
                  }
                }
              }
            }
          }
        }
        return 1
      }
    },
    components: {
      DetailCom
    }
  }
</script>
<style>
  /*公共样式*/
  .content{
    padding: .10rem;
  }
  .title{
    color: #0399BA;
    font-size: .40rem;
    line-height: .40rem;
    height: .50rem;
    margin-top: .20rem;
  }
  .subTitle{
    font-size: .30rem;
    padding: 0 .5rem;
  }
  .tip{
    text-indent: .6rem;
  }
  .select{
    text-align: left;
    font-size: .30rem;
    line-height: .35rem;
    height: .35rem;
    margin-bottom: .20rem;
  }
</style>
