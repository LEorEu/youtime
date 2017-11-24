<template>
	<div class="reservation">
		<div class="reservation-menu">
			<div class="reservation-title">
				<h2>预约课程</h2>
			</div>
		</div>
		<div class="reservation-main">
			<div class="teacher-main">
				<div class="teacher-content flex">
					<div class="teacher-details">
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
					</div>
				</div>
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
			tz: '',			//获取当前时区
			rtdates: '',	//预约课程具体时间
			times: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00']	//预约课程时间段
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
			this.getTimeList(this.tz);
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
		// 获取预约时间
		getTimeList(tz){
			let that=this;
			// md5验证
			let time_zone = `time_zone=${tz}`
			console.log(time_zone)
			let tokens = md5(`ilovewan${time_zone}banghanchen`);
			// ajax
			let url = `/api/v2/onebyone/gettimelist?${time_zone}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.get(url,time_zone,config)
			.then(function (response) {
				that.rtdates = response.data.data;
				console.log(that.rtdates);
			})
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
	}
	.reservation-main{ padding-top: 10px;  width: 100%; border-top: 10px solid #F2F3F4;
		.teacher-main{ padding-left: 20px; margin-top: 20px; border-top: 1px solid #F2F3F4;;
			.teacher-details{
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
</style>