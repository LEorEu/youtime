<template>
	<div class="pay">
		<div class="buy-list">
			<h2>购买课程</h2>
			<div class="table">
				<table width=80%>
					<tr>
						<th>套餐类型</th>
						<th>商品详情</th>
						<th>价格</th>
					</tr>
					<tr>
						<td>{{resource.title_cn}}</td>
						<td>{{resource.desc_cn}}</td>
						<td>{{currency(this.$route.query.code)}} {{resource.discount_price}}</td>
					</tr>
				</table>
			</div>
			<div class="price">
				<p>金额总计： <span>{{currency(this.$route.query.code)}} {{resource.discount_price}}</span></p>
			</div>
		</div>
		<div class="pay-type">
			<h2>购买课程</h2>
			<div class="pay-list">
				<!-- <el-radio-group size="medium">
					<el-radio border label="支付宝"></el-radio>
					<el-radio border label="微信"></el-radio>
				</el-radio-group> -->

			</div>	
			<div class="pay-btn">
				<p>购买即代表同意<span>《优唐中文课程服务协议》</span></p>
				<button>确认支付</button>
			</div>	
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import client from 'braintree-web/client'
import paypalCheckout from 'braintree-web/paypal-checkout'

  export default {
    data() {
      return {
          resource: ''
      }
		},
		mounted(){
			this.getInfo();
			this.paypal();
		},
		methods:{
			getInfo(){
				let that=this;
				// md5验证
				let info = this.$route.query,
				keys = Object.keys(info),
				i, len = keys.length;
				keys.sort();
				let p = '';
				for (i = 0; i < len; i++) {
					let k = keys[i];
					p += k+'='+info[k]+'&';
				}
				p = p.substring(0,p.length-1);
				// ajax
				let url = `/api/v1/goods/goodsinfo?${p}`;
				axios.get(url)
				.then(function (response) {
					that.resource = response.data.data;
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
			paypal(){
        paypal.Button.render({
            braintree: braintree,
            client: {
                sandbox: paypal.request.get('/demo/checkout/api/braintree/client-token/'),
                production: '<insert production auth key>'
            },
            env: 'sandbox', // sandbox | production
            payment: function(data, actions) {
                return actions.payment.create({
                    payment: {
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ]
                    }
                });
            },
            onAuthorize: function(data, actions) {
                console.log('Braintree nonce:', data.nonce);
                return actions.payment.get().then(function(payment) {
                    console.log('Payment details:', payment);
                });
            }
        }, '#paypal-button-container');
			}
		}
  }
</script>

<style lang="less" scoped>
	.buy-list{ padding: 20px; width: 100%; background-color: #fff;
		h2{ font-size: 28px; font-weight: 500; color: #ff6325;}
		.table{ margin-top: 30px;
			table th{ padding-bottom: 10px; min-width: 200px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px; font-weight: 500;}
			table td{ padding-top: 10px; min-width: 200px; text-align: center; font-size: 16px;}
		}
		.price{ margin-top: 10px; padding-right: 50px;
			p{ width: 100%; text-align: right;
				span{ color: #ff6325;}
			}
		}
	}
	.pay-type{ padding: 20px; margin-top: 10px; width: 100%; background-color: #fff;
		h2{ font-size: 28px; font-weight: 500; color: #ff6325;}
		.pay-list{ margin-top: 20px; padding-left: 20px;
			.el-radio{ width: 150px; text-align: center; margin-right: 20px;}
		}
		.pay-btn{ margin-top: 150px;
			p{ font-size: 14px; text-align: center;
				span{ color: #ff6325;}
			}
			button{ display: block; margin: 30px auto; width: 150px; height: 40px; background-color: #ff6325; color: #fff; font-size: 18px; border: 0; border-radius: 4px; cursor: pointer;}
		}

	}
</style>
