<template>
    <div class="test">
        <p>完成测试能更好的知道自己的中文水平，也能更好的找到合适自己的课程，立即开始吧！</p>
        <div class="time-select clearfix">
            <div class="block fl-l">
                <span class="demonstration">选择日期:</span>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0"></el-date-picker>
            </div>
            <div class="block fl-l">
                <span class="demonstration">选择日期:</span>
                <el-time-select v-model="value2" :picker-options="{ start: '06:00', step: '00:30', end: '20:30'}" placeholder="选择时间"></el-time-select>
            </div>
            <div class="test-btn">
                <el-button type="primary" @click="dateSelect()" plain>预约体验课</el-button>
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
            pickerOptions0: {	//日期控件
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			},
			value1: '',		//选择预约日期
            value2: ''		//选择预约时间
        }
    },
    methods:{
		// 约课时间选择
		dateSelect(){
			if (this.value1 != '' && this.value2 != '' && this.value1 != null && this.value2 != null) {
				let ymd = this.GMTToStr(this.value1);
                let strtime = ymd.substring(0,10) + ' ' + this.value2 + ':000';
                let date = new Date(strtime);
                let timeStamp = Number(date);
                console.log(timeStamp);
                timeStamp = timeStamp.toString().substring(0,10);
                this.eoyuyue(timeStamp,strtime)
			}else{
                this.$alert('请选择完整的时间段', '预约失败', {
                    confirmButtonText: '确定',
                })
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
        eoyuyue(ts,st){
            let that=this;
			// md5验证
			let info = {
                'userid': window.localStorage.getItem('id'),
                'timestamp': ts
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
			let url = '/api/v1/eoyuyue';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,info,config)
			.then(function (response) {
                console.log(response.data);
                if (response.data.errCode == 0) {
                    that.$alert(`您已成功预约${st.substring(0,16)}的体验课`, '预约成功', {
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
    p{ padding: 0 20px; color: #666;}
    .time-select{ margin-top: 20px; padding: 0 20px; 
        .block{ margin-right: 20px;
            .demonstration{ margin-right: 10px; font-size: 14px; color: #333;}
        }
    } 
}

</style>
