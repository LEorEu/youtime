<template>
	<el-header>
		<div class="header-container clearfix">
			<div class="logo fl-l">
				<a href="/"><img src="../../images/logo2.png"></a>
			</div>
			<nav class="nav fl-l">
				<ul class="nav-menu clearfix">
					<li><router-link to="/">首页</router-link></li>
					<li><router-link to="/curriculum">课程介绍</router-link></li>
					<li><router-link to="/client">下载客户端</router-link></li>
				</ul>
			</nav>
			<div class="nav nav-login fl-r">
				<ul>
					<li><router-link to="/study/cart">购买课程</router-link></li>
					<li v-if="this.checkLogin()">
						<el-dropdown>
							<span class="el-dropdown-link">Hi，{{users.cname}}同学<i class="el-icon-arrow-down el-icon--right"></i></span>
							<el-dropdown-menu slot="dropdown">
								<router-link to="/study/mycourse">
									<el-dropdown-item>我的课程</el-dropdown-item>
								</router-link>
								<router-link to="/usercenter">
									<el-dropdown-item>个人信息</el-dropdown-item>
								</router-link>
								<!-- <el-dropdown-item>我的订单</el-dropdown-item> -->
								<!-- <router-link to="/help">
									<el-dropdown-item>帮助与反馈</el-dropdown-item>
								</router-link> -->
								<el-dropdown-item>
									<span @click="close()">退出登录</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
					<li v-else><router-link to="/login">登录</router-link></li>
				</ul>
			</div>
		</div>
	</el-header>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
	data(){
		return{
			users: ''
		}
	},
	mounted(){
		this.checkLogin();
		this.studentInfo();
	},
	watch: {
		"$route": "checkLogin"
	},
  	methods: {
		checkLogin(){
			if(!window.localStorage.getItem('id')){
				return false
			}else{
				return true
			}
		},
		close(){
			window.localStorage.setItem('id','');
			window.localStorage.setItem('account','');
			this.$router.push('/login');
		},
		studentInfo(){
			let that=this;
			let ls = window.localStorage.getItem('id');
			// md5验证
			let studentInfo = 'id='+ls
			let tokens = md5('ilovewan' + studentInfo + 'banghanchen');
			// ajax
			let url = '/api/v1/Studentuser_info?' + studentInfo;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.get(url,studentInfo,config)
			.then(function (response) {
				that.users=response.data.data;
				if (that.users.cname == '') {
					that.users.cname='优唐学员';
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
	.el-header{ background-color: #FF6325;
		.logo { width: 100px; height: 60px;line-height: 60px;
			img{ vertical-align:middle;display:inline-block; max-width: 100%;}
		}
		.nav{ height: 60px;
			.nav-menu{ margin-left: 20px;
				li{ list-style:none; float:left;
					a{ display:block;padding:0 15px;width: 100%; line-height: 60px; font-size: 16px; color: #fff;}
					a:hover{ transition: all .3s; color: #FF6325; background-color: #fff;}
				}
			}
		}
		.nav-login{
			li{ list-style:none; float:left;
				a{ display:block;padding:0 15px;width: 100%; line-height: 60px; font-size: 16px; color: #fff;;}
				a:hover{ transition: all .3s; color: #FF6325; background-color: #fff;}
				.el-dropdown{ margin-left: 20px;
					span{ line-height: 60px; font-size: 14px; color: #fff;}
				} 
			}
		}
	}
	.el-dropdown-menu__item{ text-align: center;}
</style>
