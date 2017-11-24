<template>
	<div class="course-box">
		<div class="transition-box" v-show="show">
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
								<div class="course-img fl-l">
									<img :src="course.url_image" alt="">
								</div>
								<div class="course-text fl-l">
									<div class="course-title">
										<div class="course-type fl-l" :class="typeClass(course.type)">{{typeDistinguish(course.type)}}</div>
										<h2>{{course.title}}</h2>
									</div>
									<p class="course-subtitle">{{course.describe}}</p>
									<p class="course-datetimes">上课时间：{{moment.unix(parseInt(course.datetimes)).format('MM月DD日 HH:mm')}}</p>
									<div class="course-teacher flex">老师：
										<div class="teacher-img">
											<img :src="course.headimg" alt="">
										</div>
										<p>{{course.ename}}</p>
									</div>
								</div>
								<div class="course-btns fl-r clearfix">
									<button class="course-btn btn-cancel fl-r" @click="uplesson(course.id)" v-if="course.type == 0" :style="{display:block?'block':''}">取消预约</button>
									<button class="course-btn btn-enter fl-r" @click="tolink(course.id,course.type)">进入教室</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="tk-classroom" v-show="!show">
			<iframe id="iframe" :src="tk_url" width="100%" height="100%;" frameborder="0"></iframe>
			<div class="return-btn flex" @click="tk_return()">
				<i class="el-icon-arrow-left"></i>
				<p>返回</p>
			</div>
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
			block: false,
			tk_url: '',
			newDate: new Date(),
			show: true
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
		},
		// 取消预约
		uplesson(lesson){
			let that=this;
			let ls = window.localStorage.getItem('id');
			// md5验证
			let cancel = {
				'user_id': ls,
				'lesson_id': lesson
			},
			keys = Object.keys(cancel),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+cancel[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5('ilovewan' + p + 'banghanchen');
			// ajax
			let url = '/api/v1/onebyone/uplesson';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,cancel,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.$alert(response.data.errMsg, '取消成功', {
						confirmButtonText: '确定',
					})
					that.courseListFuc();
				}else{
					that.$alert(response.data.errMsg, '取消失败', {
						confirmButtonText: '确定',
					})
				}
			})
		},
		// 跳转上课地址
		tolink(lesson,type){
			let that=this;
			let ls = window.localStorage.getItem('id');
			if (type == 3) {
				type = 1;
			}else{
				type = parseInt(type) + 1;
			}
			// md5验证
			let talk_cloud = {
				'schid': 534,
				'type': '2',
				'user_id': 67,
				'lesson_type': 1
			},
			keys = Object.keys(talk_cloud),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+talk_cloud[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5('ilovewan' + p + 'banghanchen');
			// ajax
			let url = '/api/v1/talk_cloud/url';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens
				}
			}
			axios.post(url,talk_cloud,config)
			.then(function (response) {
				that.tk_url = response.data.data.url;
				that.show = false;
			})
		},
		tk_return(){
			this.tk_url = '';
			this.show = true;
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
				.course-img{ width: 330px; height: 230px; overflow: hidden; text-align: center; color: #fff;}
				.course-text{ width: calc(~'100% - 345px'); margin-left: 15px; margin-bottom: 10px;
					.course-title{ font-size: 18px; line-height: 30px; color: #4d4d4d;
						.course-type{ margin-right: 15px; width: 50px; height: 30px; line-height: 30px; text-align: center; color: #fff;}
						.typev1{ background-color: #F9D872;}
						.typev4{ background-color: #60C5F7;}
					}
					.course-subtitle{ margin-top: 10px; font-size: 16px; color: #818181;}
					.course-datetimes{ margin-top: 10px; font-size: 16px; color: #818181;}
					.course-teacher{ margin-top: 10px; font-size: 16px; color: #818181;
						.teacher-img{ margin-left: 5px; width: 48px; height: 48px; border-radius: 100%; overflow: hidden;}
						p{ margin-left: 10px; line-height: 48px;}
					}
				}
				.course-btn{ width: 140px; height: 40px; font-size: 16px; background-color: #fff; color: #727272; border: 1px solid #D1D1D1; border-radius: 4px; cursor: pointer;}
				.btn-enter{ background: #FF6325; color: #fff;}
				.btn-cancel{ margin-left: 20px; background: #DEDEDE; color: #818181;}
			}
		}
	}
	.dialog-footer a{ display: inline-block;}
	#iframe{ position: absolute; top: 0px; left: 0px;}
	.return-btn{ position: absolute; top: 6px; left: 15px; z-index: 999; cursor: pointer;
		.el-icon-arrow-left{ color: #d1d1d1; font-size: 20px;}
		p{ margin-left: 5px; line-height: 20px; font-size: 14px; color: #d1d1d1;}
	}
}
</style>
