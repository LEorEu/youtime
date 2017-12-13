<template>
	<div class="course-box">
		<div class="course-list" v-show="!show">
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
								<p class="course-datetimes">{{moment.unix(parseInt(course.datetimes)).format('MM月DD日 HH:mm')}}</p>
								<div class="course-teacher flex">老师：
									<div class="teacher-img">
										<img :src="course.headimg" alt="">
									</div>
									<p>{{course.ename}}</p>
								</div>
							</div>
							<div class="course-btns fl-r clearfix">
                <button class="course-btn" @click="evalShow(course)">课程评价</button>
                <!--<button id="is-grade" class="course-btn" v-show="gradeShow">已评价</button>-->
								<!--  <button class="course-btn fl-r">复习</button> -->
                <!--<evaluation></evaluation>-->
              </div>
						</div>
					</div>
				</li>
			</ul>
		</div>
    <evaluation ref="evaluation"></evaluation>
    <div class="alert-box" v-show="show">
			<div class="notfound">
				<div class="notfound-img">
					<img src="../../../../../static/img/icon-null.png" alt="">
				</div>
				<p>{{null_text}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'
import evaluation from './evaluation/index'

export default {
  components: { evaluation },
	data(){
    return{
			courses: [],
			block: false,
			show: false,
			null_text: ''
        }
	},
	mounted(){
		this.courseListFuc();
	},
	methods:{
    // 弹窗
    evalShow(course){
      this.$refs.evaluation.showEvaluation(course)
    },
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
			let url = '/api/v1/yescourse';
			let config = {
				headers:{
					versions: '1',
          tokens: tokens,
				}
			}
			axios.post(url,courseList,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.courses=response.data.data;
				}else{
					that.null_text = '您还没有已上的课程，请先预约'
					that.show = true;
				}
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
                case 3:
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
                case 3:
                    text='typetest';
                    break;
            }
            return text;
        }
	}
}
</script>

<style lang="less" scoped>
.course-box{
	.course-list{ padding: 40px 40px 60px; background-color: #fff; border: 1px solid #E6E6E6;
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
				.typelive{background-color: #F9D872;}
				.typetest{width: 60px; background-color: #F9D872;}
				.course-img{ width: 330px; height: 230px; overflow: hidden; text-align: center; color: #fff;}
				.course-text{ width: calc(~'100% - 345px'); margin-left: 15px; margin-bottom: 10px;
					.course-title{font-size: 18px; line-height: 30px; color: #4d4d4d;
						.course-type{ margin-right: 15px; width: 50px; height: 30px; line-height: 30px; text-align: center; color: #fff;}
						.typev1{background-color: #F9D872;}
						.typev4{background-color: #60C5F7;}
					}
					.course-subtitle{ margin-top: 10px; font-size: 16px; color: #818181;}
					.course-datetimes{ margin-top: 10px; font-size: 16px; color: #818181;}
					.course-teacher{ margin-top: 10px; font-size: 16px; color: #818181;
						.teacher-img{ margin-left: 5px; width: 48px; height: 48px; border-radius: 100%; overflow: hidden;}
						p{ margin-left: 10px; line-height: 48px;}
					}
				}
        #is-grade{ background-color: #F2F3F4 }
				.course-btn{ width: 140px; height: 40px; font-size: 16px; margin-right: 10px;background-color: #fff; color: #727272; border: 1px solid #D1D1D1; border-radius: 4px; cursor: pointer;}
      }
		}
	}
	.alert-box{ display: table; width: 100%; height: 100%;
		.notfound{ display: table-cell; vertical-align: middle; width: 100%; height: 100%;
			.notfound-img{ margin: 0 auto; width: 300px;
				img{ max-width: 100%;}
			}
			p{ margin-top: 20px; font-size: 18px; text-align: center; color: #666;}
		}
	}
}
</style>
