<template>
	<div class="cart">
		<div class="course-v1 cart-section">
			<div class="cart-head">
				<h2 class="cart-title">一对一课程</h2>
			</div>
			<div class="cart-list">
				<ul class="flex">
					<li class="course-item" v-for="(oc, index) in ocs" :key="oc.index" :id="oc.id">
						<h3>{{oc.title_cn}}</h3>
						<div class="desc">
							<p>{{oc.desc_cn}}</p>
							<p>{{oc.desc_en}}</p>
						</div>
						<div class="price">
							<!-- <span>{{oc.fracture}}</span> -->
							<p class="discount-price">{{currency(oc.currency_code)}}:{{oc.discount_price}}</p>
							<!-- <del class="normal-price">{{currency(oc.currency_code)}}:{{oc.normal_price}}</del> -->
						</div>
						<div class="btn">
							<button class="buy-btn" @click="buyInfo(oc.id,oc.currency_code)">立即购买</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="course-v4 cart-section">
			<div class="cart-head">
				<h2 class="cart-title">一对四课程</h2>
			</div>
			<div class="cart-list">
				<ul class="flex">
					<li class="course-item" v-for="(fc, index) in fcs" :key="fc.index">
						<h3>{{fc.title_cn}}</h3>
						<div class="desc">
							<p>{{fc.desc_cn}}</p>
							<p>{{fc.desc_en}}</p>
						</div>
						<div class="price">
							<!-- <span>{{fc.fracture}}</span> -->
							<p class="discount-price">{{currency(fc.currency_code)}}:{{fc.discount_price}}</p>
							<!-- <del class="normal-price">{{currency(fc.currency_code)}}:{{fc.normal_price}}</del> -->
						</div>
						<div class="btn">
							<button class="buy-btn" @click="buyInfo(fc.id,fc.currency_code)">立即购买</button>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
	data(){
		return{
			user_ip: '',
			ocs: '',
			fcs: ''
		}
	},
	mounted(){
		this.get_userip();
	},
	methods: {
		get_userip(){
			let that=this;
			axios.get('/api/v1/getip')
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.user_ip = response.data.data.ip;
			 		that.cartDetails();
				}else{
					console.log('IP地址错误');
				}
			})
		},
		cartDetails(){
			let that=this;
			// md5验证
			let userid = `countIp=${this.user_ip}`
			// ajax
			let url = `/api/v1/goodslist?${userid}`;
			axios.get(url,userid)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.ocs = response.data.data['1v1'];
					that.fcs = response.data.data['1v4'];
					console.log(that.ocs);
				}else{
					console.log('没有数据');
				}
			})
		},
		buyInfo(id,code){
			console.log(id,code);
			window.location.href = `/study/pay?id=${id}&code=${code}`;
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
		}
	}
}
</script>

<style lang="less" scoped>
.cart-section{ padding: 20px; margin-bottom: 10px; width: 100%; background-color: #fff;
	.cart-head{ color: #333;
		.cart-title{ font-size: 28px;}
	}
	.cart-list{ margin-top: 20px;
		.course-item{ margin-right: 30px; border: 1px solid #e0e0e0; border-radius: 5px; min-width: 300px; height: 240px; color: #444;
			h3{ margin-top: 20px; font-size: 24px; text-align: center;}
			.desc{ margin-top: 20px;
				p{ margin-bottom: 10px; font-size: 14px; text-align: center; color: #666;}
			}
			.price{ margin-top: 10px;
				p{ text-align: center; font-size: 24px; color: #ff4848;}
			}
			.btn{ margin: 0 auto; margin-top: 10px; width: 180px;
				.buy-btn{ width: 180px; height: 34px; font-size: 16px; border: 0; background-color: #ff4848; color: #fff; cursor: pointer;}
			}
		}
	}
}
</style>
