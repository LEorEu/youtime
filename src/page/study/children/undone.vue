<template>
	<div class="course-box">
		<div class="course-list">
			<ul>
				<li class="flex" v-for="(course, index) in courses" :key="course.index">
					<div class="course-left">
						<div class="line"></div>
						<i class="icon-round"></i>
					</div>
					<div class="course-right">
						<div class="course-time">
							<p>{{moment.unix(parseInt(course.datetimes)).format('MM月DD日 HH:mm')}}</p>
						</div>
						<div class="course-info clearfix">
							<div class="course-type fl-l" :class="typeClass(course.type)">{{typeDistinguish(course.type)}}</div>
							<div class="course-text fl-l">
								<h2 class="course-title">{{course.title}}</h2>
								<p class="course-subtitle">{{course.describe}}</p>
								<p class="course-teacher">老师：{{course.ename}}</p>
							</div>
							<div class="course-btns fl-l clearfix">
								<button class="course-btn btn-cancel fl-r" v-if="course.type == 0" :style="{display:block?'block':''}">取消预约</button>
								<button class="course-btn btn-enter fl-r">进入教室</button>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
	data: function(){
        return{
			courses: [],
			block: false
        }
	},
	mounted(){
		this.courseListFuc();
	},
	methods:{
		// 未上的课列表
		courseListFuc(){
			let that=this;
			let ls = window.localStorage.getItem('id');
			// md5验证
			let courseList = {
				'userid': ls,
				'page': '1'
			},
			keys = Object.keys(courseList),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+courseList[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5('ilovewan' + p + 'banghanchen');
			// ajax
			let url = '/api/v1/nocourse';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,courseList,config)
			.then(function (response) {
				that.courses=response.data.data
			})
		},
		typeDistinguish(item){
            let text='';
            switch(item){
                case "0":
                    text='1v1';
                    break;
                case "1":
                    text='1v4';
                    break;
                case "2":
                    text='直播课';
                    break;
                case "3":
                    text='测评课';
                    break;
            }
            return text;
		},
		typeClass(item){
            let text='';
            switch(item){
                case "0":
                    text='typev1';
                    break;
                case "1":
                    text='typev4';
                    break;
                case "2":
                    text='typelive';
                    break;
                case "3":
                    text='typetest';
                    break;
            }
            return text;
        }
	}
}
</script>

<style lang="less" scoped>
.course-box{ padding: 40px 40px 60px;
	.course-list{
		.course-left{ position: relative; width: 12px;
			.line{ margin-left: 5px; width: 2px; height: 100%; background-color: #f3f3f3;}
			.icon-round{ position: absolute; display: inline-block; top: 0px; left: 0px; width:12px; height: 12px; border-radius: 100%; border: 1px solid #999; background-color: #fff;}
		}
		.course-right{ margin-left: 30px; padding-bottom: 40px;
			.course-time{ margin-bottom: 20px;
				p{ font-size: 18px; color: #818181;}
			}
			.course-info{ padding: 20px; min-width: 900px; border: 1px solid #E6E6E6; background: #F6F6F6; 
				.course-type{ width: 50px; height: 30px; line-height: 30px; text-align: center; color: #fff;}
				.typev1{background-color: #F9D872;}
				.typev4{background-color: #60C5F7;}
				.course-text{ margin-left: 15px; margin-bottom: 40px;
					.course-title{font-size: 18px; color: #4d4d4d;}
					.course-subtitle{ margin-top: 20px; font-size: 16px; color: #818181;}
					.course-teacher{ margin-top: 20px; font-size: 16px; color: #818181;}
				}
				.course-btns{ width: 100%;}
				.course-btn{ width: 140px; height: 40px; font-size: 16px; background-color: #fff; color: #727272; border: 1px solid #D1D1D1; border-radius: 4px; cursor: pointer;}
				.btn-enter{ background: #FF6325; color: #fff;}
				.btn-cancel{ margin-left: 20px; background: #DEDEDE; color: #818181;}
			}
		}
	}
}
</style>
