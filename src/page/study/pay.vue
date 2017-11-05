<template>
	<div class="pay">
		<div class="buy-list">
			<h2>购买课程</h2>
			<div class="table">
				<table>
					<tr>
						<th>套餐类型</th>
						<th>商品详情</th>
						<th>价格</th>
					</tr>
					<tr>
						<td>一对一课程 60节</td>
						<td>此处是文案</td>
						<td>$ 10.00</td>
					</tr>
				</table>
			</div>
			<div class="price">
				<p>金额总计： <span>$ 10.00</span></p>
			</div>
		</div>
		<div class="pay-type">
			<h2>购买课程</h2>
			<div class="pay-list">
				<el-radio-group v-model="sizeForm.resource" size="medium">
					<el-radio border label="支付宝"></el-radio>
					<el-radio border label="微信"></el-radio>
				</el-radio-group>
			</div>	
			<div class="pay-btn">
				<p>购买即代表同意<span>《优唐中文课程服务协议》</span></p>
				<button>确认支付</button>
			</div>	
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          resource: ''
        }
      };
    }
  };
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
