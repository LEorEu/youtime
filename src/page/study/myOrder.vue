<template>
  <div class="order" @click="getData">
    <div class="list"><p class="title">我的订单</p></div>
    <div class="list">
      <div class="container">
        <div class="course-type">
          <img><h1>一对一课程</h1>
        </div>
        <div class="course-number">
          <span>订单编号:</span><span>65465465</span>
        </div>
        <div class="pay-time">
          <span>购买时间:</span><span>2017年10月11日</span>
        </div>
        <div class="price">
          <span class="pay">实付金额:</span><span>￥55</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueHeader from '../../components/header/yt-header'
  import VueFooter from '../../components/footer/yt-footer'
  import axios from 'axios'
  export default {
    components: { VueHeader, VueFooter },
    data(){
      return{
        data: []
      }
    },
    methods: {
      getData(){
        let data = {
          'user_id': window.localStorage.getItem('id'),
          'type' : '1',
          'page' : '1'
        }
        axios.get('/api/v1/user/order_login', data).then((response) => {
          this.data = response.data
          console.log(this.data)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .list{ width: 100%;margin-bottom: 20px;background: #fff;text-indent:20px;
    .title{ height: 60px; font-size: 18px;line-height: 60px; color: #333; }
    .container{ width: 100%; position: relative;height: 200px;padding-top: 20px;
      .course-type{  height: 40px;display: flex;
        img{margin-left: 20px; flex:1; width: 60px;height: 40px;max-width: 60px;border: 1px solid black }
        h1{flex: 1; display: inline-block; line-height: 40px; }
      }
      .course-number{ margin:20px 0 20px 0; span{ margin-right: 5px;color: #333;}}
      .pay-time{ span{ margin-right: 5px;color: #333;} }
      .price{ position: absolute;bottom: 20px;right: 20px; .pay{ color: black;} }
    }
  }
  /*.list{ width: 100%;margin-bottom: 20px;background: #fff;text-indent:20px;}*/
  /*.title{ height: 60px; font-size: 18px;line-height: 60px; color: #333;}*/
  /*.container{position: relative;height: 200px;width: 100%;}*/
  /*.course-type{  width: 100%; height: 40px; border: 1px solid red}*/
  /*img{ width: 60px;height: 40px;border: 1px solid black} h1{ display: inline-block; line-height: 40px;}*/
  /*.course-number{margin:20px 0 20px 0;} span{ margin-right: 10px;color: #333;}*/
  /*.price{position: absolute;bottom: 20px;right: 20px;} .pay{ color: black;}*/
</style>
