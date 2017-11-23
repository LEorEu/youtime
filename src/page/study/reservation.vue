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
			<div class="teacher-main">
				<transition name="el-fade-in-linear">
					<div class="teacher-content flex" v-show="show">
						<div class="teacher-list">
							<ul>
								<li class="teacher-item flex" v-for="(teacher, index) in teachers" :key="teacher.index" @click="tabs(index,teacher.tid)">
									<div class="teacher-img">
										<img :src="teacher.headimg" alt="">
									</div>
									<div class="teacher-name">
										<p class="teacher-cname">{{teacher.cname}}</p>
										<span class="teacher-ename">{{teacher.cnamespell}}</span>
									</div>
								</li>
							</ul>
						</div>
						<div class="teacher-details">
							<ul class="details-list">
								<li v-for="(teacherInfo, index) in teachers" :key="teacherInfo.index" v-if="index == tabIndex" :style="{display:block?'block':''}">
									<div class="teacher-info clearfix">
										<div class="teacher-video fl-l">
											<i class="icon-player"></i>
										</div>
										<div class="teacher-text fl-l">
											<p class="teacher-name">{{teacherInfo.cname}} <span>{{teacherInfo.cnamespell}}</span></p>
											<div class="star clearfix">
												<span>评分</span>
												<el-rate v-model="starValue" disabled text-color="#ff9900"></el-rate>
											</div>
											<p class="teacher-information">{{teacherInfo.information}}</p>
											<p class="teacher-num">剩余课时: {{teacherInfo.num}}</p>
										</div>
									</div>
									<div class="reservation-table flex">
										<ul class="table-time">
											<li v-for="(time, index) in times" :key="time.index">{{time}}</li>
										</ul>
										<ul class="table-date" v-for="(rtdate, index) in rtdates" :key="rtdate.index">
											<p>{{moment(rtdate.day).format('MM/DD')}}</p>
											<li class="time" v-for="(item, itemI) in times" :key="item.index+'time'">
												<span class="myspan" v-if='tebelRender(item,index)' @click="makeclass(rtdate.day,item,teacherInfo.tid)">可预约</span>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
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
			pickerOptions0: {	//日期控件
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			},
			tz: '',			//获取当前时区
			value1: '',		//选择预约日期
			value2: '',		//选择预约时间
			timeStamp: '',	//选择预约日期时间时间戳
			show: false,	//约课内容显示开关
			teachers: [],	//老师列表
			tabIndex: '',	//老师约课详情模板切换控制
			block: false,	//老师约课详情模板显示控制
			starValue: 5,	//评价星级
			rtdates: [],	//预约课程具体时间
			times: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00']	//预约课程时间段
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
		// 约课时间选择
		dateSelect(){
			if (this.value1 != '' && this.value2 != '' && this.value1 != null && this.value2 != null) {
				let ymd = this.GMTToStr(this.value1);
				let strtime = ymd.substring(0,10) + ' ' + this.value2 + ':000';
				let date = new Date(strtime);
				let timeStamp = Date.parse(date);
				timeStamp = timeStamp.toString().substring(0,10);
				this.timeStamp = timeStamp;
				this.teacherSearch();
				this.show = true;
			}else{
				console.log('请选择完整的时间段');
				this.show = false;
			}
		},
		// 时间格式转换
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
		// 老师列表渲染
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
			// ajax
			let url = `/api/v1/onebyone?${p}`;
			axios.get(url,search)
			.then(function (response) {
				that.teachers = response.data.data;
				if (response.data.data == '') {
					that.show = false;
					that.$alert('此时间段暂无老师', response.data.errMsg, {
						confirmButtonText: '确定',
					})
				}else{
					that.tabs(0,that.teachers[0].tid);
				}
			})
		},
		// 约课老师切换
		tabs(num, id){
			this.tabIndex = num;
			let that=this;
			// md5验证
			let search = {
				'teacher_id': id
			}
			let p = `teacher_id=${id}`;
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = `/api/v1/onebyone/timelist?${p}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.get(url,search,config)
			.then(function (response) {
				let rtdates= (response.data.data).slice(0,7);
				that.rtdates = (response.data.data).slice(0,7);
			})
		},
		//表格渲染
		tebelRender(item,index){
			if(this.rtdates.length>0){
				for(let i=0;i<this.rtdates[index].time.length;i++){
					if(item==this.rtdates[index].time[i]){
						return true
					}
				}
			}
		},
		// 点击约课状态
		makeclass(date,time,teacher) {
			let that=this;
			let dateTime = date + ' ' + time + ':000';
			let newDate = new Date(dateTime);
			let timeStamp = Date.parse(newDate);
			timeStamp = timeStamp.toString().substring(0,10);
			// md5验证
			let mc = {
				'time': timeStamp,
				'user_id': window.localStorage.getItem('id'),
				'teacher_id': teacher
			},
			keys = Object.keys(mc),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+mc[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = '/api/v1/onebyone/makeclass';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,mc,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.tebelRender();
					that.$alert(response.data.errMsg, '预约成功', {
						confirmButtonText: '确定',
					})
				}else if (response.data.errCode == 60003) {
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60004){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60005){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60006){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60007){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60008){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60009){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60010){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60011){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}else if(response.data.errCode == 60021){
					that.$alert(response.data.errMsg, '预约失败', {
						confirmButtonText: '确定',
					})
				}
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
	.reservation-main{ padding-top: 10px;  width: 100%; border-top: 10px solid #F2F3F4;
		.time-select{ padding: 0 20px; 
			.block{ margin-right: 20px;
				.demonstration{ margin-right: 10px; font-size: 14px; color: #333;}
			}
		} 
		.teacher-main{ padding-left: 20px; margin-top: 20px; border-top: 1px solid #F2F3F4;;
			.teacher-list{ padding: 30px 0; width: 230px; border-right: 10px solid #f2f3f4;
				ul{ margin-right: 20px; background: #F7F7F7; border-top: 1px solid #D9D9D9;
					.teacher-item{ width: 190px; height: 100px; border: 1px solid #D9D9D9; border-top: 0; justify-content:center; align-items:Center;
						.teacher-img{ width: 70px; height: 70px;}
						.teacher-name{ margin-left: 15px;
							.teacher-cname{ font-size: 16px; color: #333333;}
							.teacher-ename{ display: inline-block; margin-top: 5px; font-size: 14px; color: #818181;}
						}
					}
					.focus{ border: 1px solid #FF6325;}
				}
			}
			.teacher-details{
				.details-list li { background-color: #f2f3f4;
					.teacher-info { padding: 30px 20px 20px; background-color: #fff;
						.teacher-video{ width: 250px; height: 180px; background-color: #eee;}
						.teacher-text{ margin-left: 20px; width: calc(~'100% - 270px');}
							.teacher-name{ margin-top: 5px; font-size: 18px; color: #333333;
								span{ margin-left: 5px; font-size: 15px; color: #818181;}
							}
							.star{ margin-top: 5px;
								span{ float: left; font-size: 16px; color: #818181;}
								.el-rate{ float: left; margin-left: 10px; height: 20px; line-height: 28px;}
							}
							.teacher-num{ margin-top: 5px; font-size: 16px; color: #818181;}
							.teacher-information{ margin-top: 5px; font-size: 16px; color: #818181;}
					}
					.reservation-table{ margin-top: 10px; padding: 20px; background-color: #fff;
						.table-time{ margin-top: 34px; width: 90px; text-align: center; box-sizing: border-box;
							li{ width: 90px; height: 60px; line-height: 60px; font-size: 14px; color: #666; background-color: #fff;}
						}
						.table-date{ width: 90px; text-align: center; box-sizing: border-box;
							p{ height: 24px; margin-bottom: 10px; text-align: center; color: #666;}
							.time{ width: 90px; height: 60px; border-top: 1px solid #E5D9D3; border-right: 1px solid #E5D9D3; background-color: #fff9f5;
								.myspan{ display: block; width: 89px; height: 60px; line-height: 60px; font-size: 14px; background-color: #FF6325; color: #fff; cursor: pointer;}
							}
							.time:nth-last-child(1){ border-bottom: 1px solid #E5D9D3;}
						}
					}
				}
			}
		}
	}
}
</style>