<template>
    <div class="test">
        <p class="test-desc">完成测试能更好的知道自己的中文水平，也能更好的找到合适自己的课程，立即开始吧！</p>
        <div class="reservation-table flex">
            <ul class="table-time">
                <li v-for="(time, index) in times" :key="time.index">{{time}}</li>
            </ul>
            <ul class="table-date" v-for="(rtdate, dindex) in rtdates" :key="rtdate.index">
                <p>{{moment.unix(dates[dindex-1]).format('dddd')}}</p>
                <input type="hidden">
                <li class="time" v-for="(item, index) in rtdate" :key="item.index">
                    <el-button class="mybutton" v-if='tebelRender(item.status)' :loading="btnStatus" @click="eoyuyue(dindex,item.time)">可预约</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'
import jstz from 'jstz'


export default {
    data(){
		return {
			tz: '',			//获取当前时区
			rtdates: '',	//预约课程具体时间
			times: ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00'],	//预约课程时间段
			dates: [],
			btnStatus: false
		}
    },
	mounted(){
		this.timeZone();
		this.dateTime();
	},
    methods:{
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
        eoyuyue(index,time){
			let that=this;
			this.btnStatus = true;
            let dateStr = parseInt(this.dates[index-1].toString()+'000');
            let hours = parseInt(time.substring(0,2));
			let minutes = parseInt(time.substring(3,5));
            let newDate = this.moment(dateStr).add(hours,'hours').add(minutes,'minutes').unix();
			let showtime = this.moment.unix(newDate).format('LLL');
			// md5验证
			let info = {
                'userId': window.localStorage.getItem('id'),
                'time': newDate
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
			let url = '/api/v2/makelesson/testlesson';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,info,config)
			.then(function (response) {
				that.btnStatus = false;
                if (response.data.errCode == 0) {
                    that.$alert(`您已成功预约${showtime}的体验课`, '预约成功', {
                        confirmButtonText: '确定',
                    })
                }else{
                    that.$alert(response.data.errMsg, '预约失败', {
                        confirmButtonText: '确定',
                    })
                }
			})
        }
    }
}
</script>

<style <style lang="less" scoped>
.test{ margin-top: 10px; padding: 20px;
    .test-desc{ padding: 0 20px; color: #666;}
    .reservation-table{ margin-top: 10px; padding: 20px; background-color: #fff;
        .table-time{ margin-top: 34px; width: 90px; text-align: center; box-sizing: border-box;
            li{ width: 90px; height: 60px; line-height: 60px; font-size: 14px; color: #666; background-color: #fff;}
        }
        .table-date{ width: 90px; text-align: center; box-sizing: border-box;
            p{ height: 24px; margin-bottom: 10px; text-align: center; color: #666;}
            .time{ width: 90px; height: 60px; border-top: 1px solid #E5D9D3; border-right: 1px solid #E5D9D3; background-color: #fff9f5;
                .mybutton{ display: block; width: 89px; height: 60px; font-size: 14px; background-color: #FF6325; color: #fff; cursor: pointer;}
            }
            .time:nth-last-child(1){ border-bottom: 1px solid #E5D9D3;}
        }
        .table-date:nth-child(2) li{
            border-left: 1px solid #E5D9D3;
        }
    }
}

</style>
