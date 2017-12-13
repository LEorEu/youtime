<template>
  <div class="myorder">
    <div class="myorder-menu">
			<div class="myorder-title">
				<h2>我的订单</h2>
			</div>
		</div>
    <div class="list">
      <ul>
        <li v-for="(data, index) in datas" :key="data.index">
          <div class="container">
            <div class="course-title">
              <!-- <span class="course-type">{{data.goods_type}}</span> -->
              <h1>{{data.goods_name}}</h1>
            </div>
            <div class="course-number">
              <span>订单编号:</span><span>{{data.order_id}}</span>
            </div>
            <div class="pay-time">
              <span>购买时间:</span><span>{{moment.unix(data.pay_time).format('LLL')}}</span>
            </div>
            <div class="price">
              <span class="pay">实付金额：</span><span style="color: #FF6325;">{{currency(data.currency_type)}}{{data.pay_price}}</span>
            </div>
          </div>
        </li>
      </ul>
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
        datas: []
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        let data = {
          'user_id': window.localStorage.getItem('id'),
          'type' : '1',
          'page' : '1'
        },
        keys = Object.keys(data),
        i, len = keys.length;
        keys.sort();
        let p = '';
        for (i = 0; i < len; i++) {
          let k = keys[i];
          p += k+'='+data[k]+'&';
        }
        p = p.substring(0,p.length-1);
        // ajax
        let url = `/api/v1/user/order_login?${p}`;
        axios.get(url, data).then((response) => {
          this.datas = response.data.data.orders;
          console.log(this.datas);
        })
      },
      currency(item){
				let text='';
				switch(item){
					case "USD":
							text='$';
							break;
					case "EUR":
							text='€';
							break;
					case "GBP":
							text='￡';
							break;
					case "RMB":
							text='¥';
							break;
				}
				return text;
			},
    }
  }
</script>

<style lang="less" scoped>
.myorder{ width: 100%; height: 100%;
	.myorder-menu{ padding-left: 30px; width: 100%; height: 60px; background-color: #fff; border: 1px solid #dddddd;
		.myorder-title{ display: inline-block; padding: 0 20px; height: 58px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
			h2{ line-height: 58px; font-size: 16px; font-weight: 400; color: #2d2f33;}
		}
	}
  .list{ width: 100%;margin-bottom: 20px;text-indent:20px;
    .title{ height: 60px; font-size: 18px;line-height: 60px; color: #333;background: #fff; }
    .container{ margin-top: 10px; width: 100%; position: relative;height: 200px;padding-top: 20px;background: #fff;
      .course-title{  height: 40px;display: flex;
        h1{flex: 1; display: inline-block; line-height: 40px; }
      }
      .course-number{ margin:20px 0 20px 0; span{ margin-right: 5px;color: #333;}}
      .pay-time{ span{ margin-right: 5px;color: #333;} }
      .price{ position: absolute;bottom: 20px;right: 20px; .pay{ color: black;} }
    }
  }
}
</style>
