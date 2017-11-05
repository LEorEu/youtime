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
					<el-time-select v-model="value2" :picker-options="{ start: '08:30', step: '00:30', end: '20:30'}" placeholder="选择时间"></el-time-select>
				</div>
				<div class="select-btn">
					<button @click="dateSelect()">click</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
		return {
			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			},
			value1: '',
			value2: ''
		}
	},
	methods: {
		dateSelect(){
			let ymd = this.GMTToStr(this.value1);
			let year = parseInt(ymd.substring(0,4));
			let month = parseInt(ymd.substring(5,7));
			let day = parseInt(ymd.substring(8,10));
			let hour = parseInt((this.value2).substring(0,2));
			let min = parseInt((this.value2).substring(3,5));
			let date = new Date();
			date.setFullYear(year,month,day)
			date.setHours(hour,min,0);
			console.log(Date.parse(date));
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
	.reservation-main{ padding: 20px; width: 100%; border-top: 10px solid #F2F3F4;
		.time-select .block{ margin-right: 20px;
			.demonstration{ margin-right: 10px; font-size: 14px; color: #333;}
		}
	}
}
</style>