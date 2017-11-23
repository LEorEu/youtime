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
				{{this.paypals()}}
				<button>确认支付</button>
			</div>	
		</div>
	</div>
</template>

<script>
import axios from "axios";
import client from "braintree-web/client";
import paypalCheckout from "braintree-web/paypal-checkout";

export default {
  data() {
    return {
      resource: ""
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let that = this;
      // md5验证
      let info = this.$route.query,
        keys = Object.keys(info),
        i,
        len = keys.length;
      keys.sort();
      let p = "";
      for (i = 0; i < len; i++) {
        let k = keys[i];
        p += k + "=" + info[k] + "&";
      }
      p = p.substring(0, p.length - 1);
      // ajax
      let url = `/api/v1/goods/goodsinfo?${p}`;
      axios.get(url).then(function(response) {
        that.resource = response.data.data;
      });
    },
    currency(item) {
      let text = "";
      switch (item) {
        case "USD":
          text = "$";
          break;
        case "EUR":
          text = "€";
          break;
        case "GBP":
          text = "￡";
          break;
        case "RMB":
          text = "¥";
          break;
      }
      return text;
    },
    paypals() {
      paypal.Button.render(
        {
          braintree: braintree,
          client: {
            sandbox: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIyZWUyOTZhYjNiMjU5YzY3ODdlNmY1NWI1MTFiMDlkNjA1N2ZhYmU4YjJkMGJhNGEyN2I4NTE4ZjkxNmMxMDhkfGNsaWVudF9pZD1jbGllbnRfaWQkcHJvZHVjdGlvbiRkdHh0bWgzeGhxeHoyOTU3XHUwMDI2Y3JlYXRlZF9hdD0yMDE3LTExLTIzVDAzOjE0OjEyLjMyODMwMjI3MyswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9OXB6MzJqc3FiNnJwajIzOSIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvOXB6MzJqc3FiNnJwajIzOS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy85cHozMmpzcWI2cnBqMjM5L2NsaWVudF9hcGkiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5icmFpbnRyZWVnYXRld2F5LmNvbS85cHozMmpzcWI2cnBqMjM5In0sInRocmVlRFNlY3VyZUVuYWJsZWQiOmZhbHNlLCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiLkuIfpgqbmsYnlrrjvvIjljJfkuqzvvInmlZnogrLnp5HmioDmnInpmZDlhazlj7giLCJjbGllbnRJZCI6IkFUdjZFcWNweVRRWFZtUWM0WUxULS1mU1pCWFYwN2JRVVRYYXVXNDk0SnlCX2J5U1lBLS1GcFhIUFNSOTZqeTNnTERsellsNkV1ckwySWM2IiwicHJpdmFjeVVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6ZmFsc2UsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJsaXZlIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoiQVJLcllSRGgzQUdYRHpXN3NPXzNiU2txLVUxQzdIR191V05DLXo1N0xqWVNETlVPU2FPdElhOXE2VnBXIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6IlVTRCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiOXB6MzJqc3FiNnJwajIzOSIsInZlbm1vIjoib2ZmIn0=',
            production: "<insert production auth key>"
          },
          env: "sandbox", // sandbox | production
          payment: function(data, actions) {
            return actions.payment.create({
              payment: {
                transactions: [
                  {
                    amount: { total: "0.01", currency: "USD" }
                  }
                ]
              }
            });
          },
          onAuthorize: function(data, actions) {
            console.log("Braintree nonce:", data.nonce);
            return actions.payment.get().then(function(payment) {
              console.log("Payment details:", payment);
            });
          }
        },
        "#paypal-button-container"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.buy-list {
  padding: 20px;
  width: 100%;
  background-color: #fff;
  h2 {
    font-size: 28px;
    font-weight: 500;
    color: #ff6325;
  }
  .table {
    margin-top: 30px;
    table th {
      padding-bottom: 10px;
      min-width: 200px;
      border-bottom: 1px solid #eee;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
    }
    table td {
      padding-top: 10px;
      min-width: 200px;
      text-align: center;
      font-size: 16px;
    }
  }
  .price {
    margin-top: 10px;
    padding-right: 50px;
    p {
      width: 100%;
      text-align: right;
      span {
        color: #ff6325;
      }
    }
  }
}
.pay-type {
  padding: 20px;
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  h2 {
    font-size: 28px;
    font-weight: 500;
    color: #ff6325;
  }
  .pay-list {
    margin-top: 20px;
    padding-left: 20px;
    .el-radio {
      width: 150px;
      text-align: center;
      margin-right: 20px;
    }
  }
  .pay-btn {
    margin-top: 150px;
    p {
      font-size: 14px;
      text-align: center;
      span {
        color: #ff6325;
      }
    }
    button {
      display: block;
      margin: 30px auto;
      width: 150px;
      height: 40px;
      background-color: #ff6325;
      color: #fff;
      font-size: 18px;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
