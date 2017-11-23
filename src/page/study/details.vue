<template>
	<div class="details">
		<div class="details-menu">
			<div class="details-title">
				<h2>课时明细</h2>
			</div>
		</div>
		<div class="details-main">
			<div class="v1-course course">
				<div class="course-title flex">
					<span>1v1</span>
					<h3>一对一课程</h3>
				</div>
				<div class="table flex">
					<div class="item">
						<p>已获得</p>
						<span>{{lessonOnebyone.total}}</span>
					</div>
					<div class="item">
						<p>已消耗</p>
						<span>{{lessonOnebyone.now}}</span>
					</div>
					<div class="item">
						<p>剩余</p>
						<span>{{lessonOnebyone.balance}}</span>
					</div>
				</div>
			</div>
			<div class="v4-course course">
				<div class="course-title flex">
					<span>1v4</span>
					<h3>一对四课程</h3>
				</div>
				<div class="table flex">
					<div class="item">
						<p>已获得</p>
						<span>{{lessonOnebyfour.total}}</span>
					</div>
					<div class="item">
						<p>已消耗</p>
						<span>{{lessonOnebyfour.now}}</span>
					</div>
					<div class="item">
						<p>剩余</p>
						<span>{{lessonOnebyfour.balance}}</span>
					</div>
				</div>
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
			lessonOnebyone:{},
			lessonOnebyfour:{}
		}
	},
	mounted(){
		this.lessonbalance();
	},
	methods:{
		lessonbalance(){
			let that=this;
			// md5验证
			let user_id = {
				'user_id': window.localStorage.getItem('id')
			},
			keys = Object.keys(user_id),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+user_id[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = `/api/v1/user/lessonbalance?${p}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.get(url,user_id,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.lessonOnebyone = response.data.data.onebyone;
					that.lessonOnebyfour = response.data.data.onebyfour;
				}else{
					console.log('没有数据');
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.details{ width: 100%;
	.details-menu{ padding-left: 30px; width: 100%; height: 60px; background-color: #fff; border: 1px solid #dddddd;
		.details-title{ display: inline-block; padding: 0 20px; height: 58px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
			h2{ line-height: 58px; font-size: 16px; font-weight: 400; color: #2d2f33;}
		}
	}
	.details-main{ margin-top: 10px;
		.course{ padding: 20px; border: 1px solid #dddddd; background-color: #fff;
			.course-title{ 
				span{ display: inline-block; width: 50px; height: 30px; text-align: center; line-height: 30px; color: #fff; font-size: 18px;}
				h3{ margin-left: 10px; line-height: 30px; font-size: 18px; color: #333;}
			}
			.table{ margin-top: 40px; padding-left: 80px;
				.item{ padding-right: 20px; width: 25%; border-right: 1px solid #999;
					p{ font-size: 18px; color: #666; text-align: right;}
					span{ display: block; margin-top: 5px; font-size: 18px; color: #333; text-align: right;}
				}
			}
		}
		.v1-course{
			.course-title span{ background-color: #ffd145;}
		}
		.v4-course{ margin-top: 10px;
			.course-title span{ background-color: #3aa5ff;}
		}
	}
}
</style>
