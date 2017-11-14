<template>
  <div>
    <div class="table"><span>{{items.tableHead}}</span></div>
    <div class="table text" v-for="index in items.tableBody">
      <!--文本-->
      <yd-input slot="right" :name="items.id" class="text" required v-model.trim="input[index-1]" max="15" :show-clear-icon="false" :show-success-icon="false" :show-error-icon="false"></yd-input>
      <span v-show="false">{{formData[items.id] = input}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'input',
    props: ['items', 'formData'],
    data () {
      return {
        input: []
      }
    }
  }
</script>
<style>
  .text{
    padding: .01rem;
  }
  .text input{
    border: 1px solid #cccccc !important;
    margin: .15rem .05rem;
  }
</style>
