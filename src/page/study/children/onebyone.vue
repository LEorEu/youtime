<template>
    <div class="reservation-table flex">
        <ul class="table-time">
            <li v-for="(time, index) in times" :key="time.index">{{time}}</li>
        </ul>
        <ul class="table-date" v-for="(rtdate, dindex) in rtdates" :key="rtdate.index">
            <p>{{moment.unix(dates[dindex-1]).format('dddd')}}</p>
            <input type="hidden">
            <li class="time" v-for="(item, index) in rtdate" :key="item.index">
                <span class="myspan" v-if='tebelRender(item.status)' @click="makeclass(dindex,item.time)">可预约</span>
            </li>
        </ul>
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
			times: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'],	//预约课程时间段
			dates: []
		}
	},
	mounted(){
		this.timeZone();
		this.dateTime();
	},
	methods: {
		// 获取时区
		timeZone(){
			const timezone = jstz.determine();
			timezone.name(); 
			this.tz = timezone.name();
			this.getTimeList(this.tz);
		},
		// 生成预约日期
		dateTime(){
			let dateArr = [];
			let date = new Date();
			let dateFormat = date.setHours(0,0,0);
			let todayNum = parseInt(Number(dateFormat).toString().substring(0,10));
			for (let index = 0; index < 7; index++) {
				todayNum = todayNum + 86400;
				dateArr.push(todayNum);
			}
			this.dates = dateArr;
		},
		// 获取预约时间
		getTimeList(tz){
			let that=this;
			// md5验证
			let time_zone = `time_zone=${tz}`;
			let tokens = md5(`ilovewan${time_zone}banghanchen`);
			// ajax
			let url = `/api/v2/onebyone/gettimelist?${time_zone}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens
				}
			}
			axios.get(url,time_zone,config)
			.then(function (response) {
				that.rtdates = response.data.data;
			})
		},
		// 显示可预约时间
		tebelRender(status){
			if(status == '1'){
				return true
			}
		},
		// 点击约课状态
		makeclass(index,time) {
			let that=this;
			let dateStr = parseInt(this.dates[index-1].toString()+'000');
			let newDate = new Date(dateStr);
			let hours = parseInt(time.substring(0,2));
			let minutes = parseInt(time.substring(3,5));
			newDate.setHours(hours,minutes,0);
			let date = parseInt(Number(newDate).toString().substring(0,10));
			// md5验证
			let info = {
				'time': date,
				'userId': window.localStorage.getItem('id'),
			},
			keys = Object.keys(info),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+info[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = '/api/v2/onebyone/makeclass';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,info,config)
			.then(function (response) {
				that.getTimeList(that.tz);
				console.log(response);
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
    .table-date:nth-child(2) li{
        border-left: 1px solid #E5D9D3;
    }
}
</style>
