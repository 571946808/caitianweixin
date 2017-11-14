<template>
  <div>
    <yd-navbar title="问卷调查" bgcolor="#0399BA" color="#ffffff"></yd-navbar>
    <div class="content">
      <p class="title">{{title}}</p>
      <p class="subTitle">发布人：{{position}} 发布时间：{{date}} 截止日期：{{endDate}}</p>
      <br>
      <p class="select tip">{{subTitle}}</p>
      <br>
      <ul class="list">
        <li v-for="items,indexs in list">
          <template v-if="items.type=='1'">
            <p>{{indexs+1}}.{{items.title}}</p>
            <label>{{items.label}}：</label>
            <select :name="items.id" class="select" v-model="formData[items.id]">
              <option :value="-1" disabled>请选择</option>
              <option :value="index" v-for="item,index in items.collection">{{item}}</option>
            </select>
          </template>
          <template v-if="items.type=='2'">
            <p>{{indexs+1}}.{{items.title}}</p>
            <label>{{items.label}}：</label>
            <br>
            <label v-for="item,index in items.collection"><input type="radio" :name="items.id" :value="index" v-model="formData[items.id]">{{item}}<br></label>
          </template>
          <template v-if="items.type=='3'">
            <p>{{indexs+1}}.{{items.title}}</p>
            <label>{{items.label}}：</label>
            <br>
            <check-com :items="items" :formData="formData"></check-com>
          </template>
          <template v-if="items.type=='4'">
            <p>{{indexs+1}}.{{items.title}}</p>
            <textarea :name="items.id" class="textarea" v-model="formData[items.id]"></textarea>
          </template>
        </li>
      </ul>
      <yd-button size="large" type="primary" @click.native="send">提交</yd-button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import CheckCom from '@/sub/CheckCom'
  export default{
    name: 'QuestionnaireDetail',
    data () {
      return {
        title: '',
        position: '',
        date: '',
        endDate: '',
        subTitle: '',
        list: [],
        formData: {},
        checkbox: [],
        flag: false
      }
    },
    created () {
      this.loadData()
    },
    components: {
      CheckCom
    },
    methods: {
      loadData: function () {
        axios.get('/static/questionnairedetail.json')
          .then((response) => {
            response = response.data
            if (String(response.code) === '0') {
              this.title = response.title
              this.position = response.position
              this.date = response.date
              this.endDate = response.endDate
              this.subTitle = response.subTitle
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
      send: function (event) {
        let that = this
        that.flag = false
        for (let i = 1; i <= that.list.length; i++) {
          if (that.formData[i] === undefined || that.formData[i] === '-1' || (that.formData[i] !== undefined && that.formData[i].length < 1)) {
            that.$dialog.toast({mes: '信息填写不完整，请填好后重新提交！', timeout: 2000})
            that.flag = true
            break
          } else if (that.list[i - 1].type === '3') {
            if (that.formData[i].length > that.list[i - 1].count) {
              that.$dialog.toast({mes: '第' + i + '题最多可选' + that.list[i - 1].count + '项，请填好后重新提交！', timeout: 2000})
              that.flag = true
              break
            }
          }
        }
        if (that.flag === false) {
          axios.post('/static/common.json', {
            formData: that.formData
          })
            .then((response) => {
              response = response.data
              if (String(response.code) === '0') {
                that.$dialog.toast({mes: '提交成功！', timeout: 2000})
              } else {
                that.$dialog.toast({mes: '提交失败！', timeout: 2000})
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
  .list{
    text-align: left;
    padding: 0 .5rem;
    font-size: .3rem;
    line-height: .5rem;
  }
  .list .textarea{
    padding: .1rem;
    width: 6rem;
    height: 2.5rem;
  }
</style>
