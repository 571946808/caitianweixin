<template>
  <div>
    <label v-for="item,index in items.collection"><input type="checkbox" :name="items.id" :value="index" v-model="checkbox">{{item}}<br></label>
    <span v-show="false">{{formData[items.id] = checkbox}}</span>
  </div>
</template>
<script>
  export default {
    name: 'CheckCom',
    props: ['items', 'formData'],
    data () {
      return {
        checkbox: []
      }
    }
  }
</script>
<style></style>
