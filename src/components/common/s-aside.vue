<template>
	<el-aside width="200px">
		<div class="aside-info">
			<div class="user-img">
				<img :src="users.headimg" alt="">
			</div>
			<div class="user-name">
				<p>{{users.cname}}</p>
			</div>
		</div>
		<div class="aside-nav">
			<ul>
				<li class="nav-item">
					<router-link to="/study/mycourse" active-class="router-link-active">我的课程</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/study/reservation" active-class="router-link-active">预约课程</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/study/myscore" active-class="router-link-active">我的成绩</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/study/details" active-class="router-link-active">课时明细</router-link>
				</li>
				<!-- <li class="nav-item">
					<router-link to="/study/guide" active-class="router-link-active">课前指导</router-link>
				</li> -->
			</ul>
		</div>
	</el-aside>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
	data (){
		return {
			users:[]
		}
	},
	mounted(){
		this.studentInfo();
	},
	methods:{
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
				that.users=response.data.data
			})
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
			.router-link-active{ color: #FF6325;}
		}
	}
}
</style>
