<template>
	<div class="reservation">
		<div class="reservation-menu">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<router-link to="/study/reservation/onebyfour">
					<el-menu-item v-show="userStatus" index="1">一对四约课</el-menu-item>
				</router-link>
				<router-link to="/study/reservation/onebyone">
					<el-menu-item v-show="userStatus" index="2">一对一约课</el-menu-item>
				</router-link>
				<el-menu-item v-show="!userStatus" :index="userStatusCode">首次测评</el-menu-item>
			</el-menu>
		</div>
		<div class="reservation-main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

import Onebyfour from './children/onebyfour'
import Onebyone from './children/onebyone'

export default {
	components: {
		'onebyfour': Onebyfour,
		'onebyone': Onebyone
  	},
	data() {
		return {
			activeIndex: '1',
			userStatus: '',
			userStatusCode: ''
		};
	},
	mounted(){
		this.getUserinfo();
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		},
		getUserinfo(){
			let that=this;
			// md5验证
			let info = {
				'userid': window.localStorage.getItem('id')
			},
			keys = Object.keys(info),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+info[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = '/api/v1/user_level';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,info,config)
			.then(function (response) {
				console.log(1);
				if (response.data.data.is_show == '0') {
					that.userStatusCode = '1';
					that.userStatus = false;
					that.getUserStatus(that.userStatus);
				}else if (response.data.data.is_show == '1'){
					console.log('请等待上课！')
				}else {
					that.userStatus = true;
					that.userStatusCode = '3';
					that.getUserStatus(that.userStatus);
				}
			})
		},
		getUserStatus(status){
			if (status == true) {
				this.$router.push('/study/reservation/onebyfour');
			}else {
				this.$router.push('/study/reservation/test');
			}
		},
	}
}
</script>


<style lang="less" scoped>
.reservation{ width: 100%; background-color: #fff; border: 1px solid #E6E6E6;
	.reservation-menu{ width: 100%; height: 60px;
		.el-menu{ margin-left: 30px;
			.el-menu-item{ font-size: 16px; border-color: #FF7048;
				a{ display: block;}
			}
		}
		.myscore-title{ display: inline-block; padding: 0 20px; height: 58px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
			h2{ line-height: 58px; font-size: 16px; font-weight: 400; color: #2d2f33;}
		}
	}
	.reservation-main{ width: 100%; border-top: 10px solid #F2F3F4;}
	.el-menu-item.is-active{ color: #333;}
}
</style>