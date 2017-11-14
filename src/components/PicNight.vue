<template>
  <div>
    <!--<yd-navbar>-->
      <img src="/static/back.jpg" alt="彩田学校" slot="center" class="back">
    <!--</yd-navbar>-->
    <yd-button size="large" type="disabled" class="position" disabled>{{position}}，您好！</yd-button>
  </div>
</template>
<script>
  export default{
    name: 'PicNight',
    props: ['position']
  }
</script>
<style>
  .position{
    margin-top: 0rem;
  }
  .back {
    /*width: 7rem;*/
    /*height: 4rem;*/
    width: 100%;
    height: 100%;
  }
</style>
