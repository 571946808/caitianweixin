<template>
  <yd-flexbox class="border">
    <yd-flexbox-item v-for="items,indexs in list" :key="indexs">
      <template v-if="items.type==1">
        <div class="table"><span>{{items.tableHead}}</span></div>
        <div class="table" v-for="item in items.tableBody">
          <span>{{item}}</span>
        </div>
      </template>
      <template v-if="items.type==2">
        <div class="table"><span>{{items.tableHead}}</span></div>
        <div class="table" v-for="item in items.tableBody">
          <!--单选-->
          <input type="radio" :name="items.id" :value="item" v-model="formData[items.id]"/>
        </div>
      </template>
      <template v-if="items.type==3">
        <div class="table"><span>{{items.tableHead}}</span></div>
        <div class="table" v-for="item in items.tableBody">
          <!--多选-->
          <input type="checkbox" :name="items.id" :value="item" v-model="check"/>
          <span v-show="false">{{formData[items.id] = check}}</span>
        </div>
      </template>
      <template v-if="items.type==4">
        <select-com :items="items" :formData="formData"></select-com>
      </template>
      <template v-if="items.type==5">
        <input-com :items="items" :formData="formData"></input-com>
      </template>
    </yd-flexbox-item>
  </yd-flexbox>
</template>
<script>
  import selectCom from '@/sub/SelectCom'
  import inputCom from '@/sub/InputCom'
  export default{
    name: 'DetailRadio',
    props: ['list', 'formData'],
    data () {
      return {
        check: [],
        select: [],
        input: []
      }
    },
    components: {
      selectCom,
      inputCom
    }
  }
</script>
<style>
  .border div.table{
    border: .01rem solid  #cccccc;
  }
  .table{
    font-size: .30rem;
    height: .45rem;
  }
</style>
