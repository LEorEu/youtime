<template>
	<el-aside width="200px">
		<div class="aside-info">
			<div class="user-img">
				<img src="" alt="">
			</div>
			<div class="user-name">
				<p>测试账号</p>
			</div>
		</div>
		<div class="aside-nav">
			<ul>
				<li class="nav-item">
					<router-link to="/study/mycourse">我的课程</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/study/reservation">预约课程</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/study/guide">课前指导</router-link>
				</li>
			</ul>
		</div>
	</el-aside>
</template>

<script>
export default{
	data (){
		return {
			users:[]
		}
	}
}
</script>

<style lang="less" scoped>
.el-aside{ position: relative; width: 200px; height: 100%; background-color: #fff; border-right: 1px solid #E6E6E6;
	.aside-info{ padding-top: 20px; 
		.user-img{ margin: 30px auto; width: 100px; height: 100px; border: 1px solid #E6E6E6; border-radius: 100%; background-color: #eee; overflow: hidden;
			img{ width: 100px; height: 100px;}
		}
		.user-name{ margin: 0 auto; width: 120px; padding-bottom:30px; border-bottom: 1px solid #E6E6E6;
			p{ text-align: center; font-size: 20px; color: #333;}
		} 
	}
	.aside-nav{ padding-top: 20px; 
		ul li{ margin-top: 30px; text-align: center;
			a{ font-size: 18px; color: #333;}
			a:hover{ transition: color .3s; color: #FF6325;}
		}
	}
}
</style>
