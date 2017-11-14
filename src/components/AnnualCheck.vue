<template>
  <div>
    <pic-night :position="position"></pic-night>
    <ul>
      <li v-for="item in list" class="li-list">
        <a :href="'#/AnnualCheckDetail/'+item.id">
          <p class="activity">{{item.vote}}</p>
          <p class="date">{{item.date}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  import PicNight from '@/components/PicNight'
  export default{
    name: 'AnnualCheck',
    data () {
      return {
        position: '',
        list: []
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData: function () {
        axios.get('/static/annualcheck.json')
          .then((response) => {
            response = response.data
            if (String(response.code) === '0') {
              this.position = response.position
              this.list = response.list
            } else {
              this.$dialog.toast({mes: '加载数据异常', timeout: 2000})
            }
          })
          .catch(function (error) {
            this.$dialog.toast({mes: '加载数据异常', timeout: 2000})
            console.log(error)
          })
      }
    },
    components: {
      PicNight
    }
  }
</script>
<style>
  .activity{
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: justify;
    height: .46rem;
    color: #505050;
    font-size: .32rem;
    line-height: .32rem;
    text-align: justify;
    font-weight: 800;
    margin-top: .2rem;
  }
  .li-list{
    padding: .15rem;
    background-color: #ffffff;
    margin-bottom: .1rem;
  }
  .date{
    overflow: hidden;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    color: #999;
    font-size: .28rem;
  }
</style>
