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
					<li><router-link to="/login">购买课程</router-link></li>
					<li><router-link to="/login">登录</router-link></li>
				</ul>
			</div>
		</div>
	</el-header>
</template>

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
			}
		}
	}
</style>
