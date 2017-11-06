<template>
	<div class="reservation">
		<div class="reservation-menu">
			<div class="reservation-title">
				<h2>预约课程</h2>
			</div>
			<span class="reservation-subtitle">约课规则：当天12：00前只能约明天的课，最多可约2周的课。</span>
		</div>
		<div class="reservation-main">
			<div class="time-select clearfix">
				<div class="block fl-l">
					<span class="demonstration">选择日期:</span>
					<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
				</div>
				<div class="block fl-l">
					<span class="demonstration">选择日期:</span>
					<el-time-select v-model="value2" :picker-options="{ start: '09:00', step: '00:30', end: '20:00'}" placeholder="选择时间"></el-time-select>
				</div>
			</div>
			<!-- <div class="teacher-main flex">
				<div class="teacher-list">
					<ul>
						<li class="teacher-item flex" v-for="(teacher, index) in teachers" :key="teacher.index">
							<div class="teacher-img">
								<img :src="teacher.headimg" alt="">
							</div>
							<div class="teacher-text">
								<p class="teacher-cname">{{teacher.cname}}</p>
								<span class="teacher-ename">{{teacher.ename}}</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="teacher-details">
					
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'
import jstz from 'jstz'

export default {
    data() {
		return {
			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			},
			value1: '',
			value2: '',
			timeStamp: '',
			teachers: [],
			tz: ''
		}
	},
	watch:{
		value1(){
			this.dateSelect();
		},
		value2(){
			this.dateSelect();
		}
	},
	mounted(){
		this.timeZone();
	},
	methods: {
		timeZone(){
			const timezone = jstz.determine();
			timezone.name(); 
			this.tz = timezone.name();
		},
		dateSelect(){
			if (this.value1 != '' && this.value2 != '' && this.value1 != null && this.value2 != null) {
				let ymd = this.GMTToStr(this.value1);
				let strtime = ymd.substring(0,10) + ' ' + this.value2 + ':000';
				let date = new Date(strtime);
				let timeStamp = Date.parse(date);
				timeStamp = timeStamp.toString().substring(0,10);
				this.timeStamp = timeStamp;
				console.log(date);
				this.teacherSearch();
			}else{
				console.log('请选择完整的时间段');
			}
		},
		GMTToStr(time){
			let date = new Date(time)
			let Str=date.getFullYear() + '-' +
			(date.getMonth() + 1) + '-' + 
			date.getDate() + ' ' + 
			date.getHours() + ':' + 
			date.getMinutes() + ':' + 
			date.getSeconds()
			return Str
		},
		teacherSearch(){
			let that=this;
			// md5验证
			let search = {
				'time': this.timeStamp,
				'page': '1',
				'exp': '',
				'sex': ''
			},
			keys = Object.keys(search),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+search[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5('ilovewan' + p + 'banghanchen');
			// ajax
			let url = '/api/v1/onebyone?' + p;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.get(url,search,config)
			.then(function (response) {
				console.log(response.data.data);
				that.teachers = response.data.data;
			})
		}
	}
}
</script>

<style lang="less" scoped>
.reservation{ width: 100%; background-color: #fff; border: 1px solid #E6E6E6;
	.reservation-menu{ margin-left: 30px; width: 100%; height: 60px;
		.reservation-title{ display: inline-block; padding: 0 20px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
			h2{ height: 58px; line-height: 60px; font-size: 16px; font-weight: 400; color: #2d2f33;}
		}
		.reservation-subtitle{ margin-left: 10px; line-height: 60px; font-size: 14px; color: #999999;}
	}
	.reservation-main{ padding: 20px 0;  width: 100%; border-top: 10px solid #F2F3F4;
		.time-select{ padding: 0 20px; 
			.block{ margin-right: 20px;
				.demonstration{ margin-right: 10px; font-size: 14px; color: #333;}
			}
		} 
		.teacher-main{ padding: 0 20px; margin-top: 20px; border-top: 1px solid #F2F3F4;;
			.teacher-list{ padding: 30px 0; width: 230px; border-right: 10px solid #f2f3f4;
				ul{ margin-right: 20px; background: #F7F7F7; 
					.teacher-item{ height: 100px; border: 1px solid #D9D9D9; border-top: 0; justify-content:center; align-items:Center;
						.teacher-img{ width: 70px; height: 70px;}
						.teacher-text{ margin-left: 15px;
							.teacher-cname{ font-size: 16px; color: #333333;}
							.teacher-ename{ display: inline-block; margin-top: 5px; font-size: 14px; color: #818181;}
						}
					}
					.focus{ border: 1px solid #FF6325;}
				}
			}
		}
	}
}
</style>