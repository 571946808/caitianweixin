<template>
  <div>
    <div class="table"><span>{{items.tableHead}}</span></div>
    <div class="table" v-for="index in items.tableBody">
      <select :name="items.id" class="selectCore" v-model="select[index-1]">
        <option value="-1">请选择</option>
        <option value="1">1分</option>
        <option value="2">2分</option>
        <option value="3">3分</option>
        <option value="4">4分</option>
        <option value="5">5分</option>
        <option value="6">6分</option>
        <option value="7">7分</option>
        <option value="8">8分</option>
        <option value="9">9分</option>
        <option value="10">10分</option>
      </select>
      <span v-show="false">{{formData[items.id] = select}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'select',
    props: ['items', 'formData'],
    data () {
      return {
        select: [-1, -1]
      }
    }
  }
</script>
<style>
  .selectCore{
    text-align: center;
  }
</style>
