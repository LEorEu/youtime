<template>
	<el-header>
		<div class="header-container clearfix">
			<div class="logo fl-l">
				<a href="/"><img src="../../images/logo2.png"></a>
			</div>
			<nav class="nav fl-l">
				<ul class="nav-menu clearfix">
					<li><router-link to="/curriculum">课程介绍</router-link></li>
					<li><router-link to="/studyidea">学习理念</router-link></li>
					<li><router-link to="/teachers">师资力量</router-link></li>
				</ul>
			</nav>
			<div class="nav nav-login fl-r">
				<ul>
					<li><router-link to="/buycourse">购买课程</router-link></li>
					<li><router-link to="/login">登录</router-link></li>
					<li>
						<el-row class="block-col-2">
							<el-col :span="12">
								<el-dropdown>
								<span class="el-dropdown-link">Hi，测试账号同学<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>个人信息</el-dropdown-item>
									<el-dropdown-item>退出登录</el-dropdown-item>
								</el-dropdown-menu>
								</el-dropdown>
							</el-col>
						</el-row>
					</li>
				</ul>
			</div>
		</div>
	</el-header>
</template>

<script>
export default{
	mounted(){
		//组件开始挂载时获取用户信息
		this.getUserInfo();
  	},
  	methods: {
    //请求用户的一些信息
		getUserInfo(){
			this.userInfo = {
				nick: 'Doterlin',
				ulevel: 20,
				uid: '10000',
				portrait: 'images/profile.png'
			}	
		}
	}
}
</script>

<style lang="less" scoped>
	.el-header{background-color: #FF6325;
		.logo {width: 100px; height: 60px;line-height: 60px;
			img{vertical-align:middle;display:inline-block; max-width: 100%;}
		}
		.nav{height: 60px;
			.nav-menu{margin-left: 20px;
				li{list-style:none; float:left;
					a{display:block;padding:0 15px;width: 100%; line-height: 60px; font-size: 16px; color: #fff;}
					a:hover{transition: all .3s; color: #FF6325; background-color: #fff;}
				}
			}
		}
		.nav-login{
			li{list-style:none; float:left;
				a{display:block;padding:0 15px;width: 100%; line-height: 60px; font-size: 16px; color: #fff;;}
				a:hover{transition: all .3s; color: #FF6325; background-color: #fff;}
			}
		}
	}
</style>
