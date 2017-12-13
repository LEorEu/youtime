<template>
    <div class="onebyfour">
        <div class="four-list">
            <ul class="flex">
                <li class="item" :id="item.id" v-for="(item, index) in items" :key="item.index">
                    <div class="item-img">
                        <p class="item-time">{{item.week_title}}</p>
                    </div>
                    <div class="item-info">
                        <p>{{item.title_0}}上课时间：<span>{{item.time_0}}</span></p>
                        <p>{{item.title_1}}上课时间：<span>{{item.time_1}}</span></p>
                        <div class="item-btn">
                            <button @click="yuyue(item.id)">我要上课</button>
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
    data(){
        return {
            items: ''
        }
    },
    mounted(){
        this.onebyfour();
    },
    methods: {
        onebyfour(){
            let that=this;
			// ajax
			let url = '/api/v1/fourtimelist';
			let config = {
				headers:{
					versions: '1',
				}
            }
            axios.get(url,config)
            .then(function (response) {
                console.log(response.data.data)
                that.items = response.data.data;
            })
        },
        yuyue(id){
            let that=this;
			// md5验证
			let info = {
                'userid': window.localStorage.getItem('id'),
                'statusid': id
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
			let url = '/api/v1/onefouryuyue';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,info,config)
			.then(function (response) {
                if (response.data.errCode == 0) {
                    that.$alert(response.data.errMsg, '预约成功', {
                        confirmButtonText: '确定',
                    })
                }else {
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
.onebyfour{ margin-top: 10px; padding: 20px; background-color: #fff;
    .item{ margin-right: 30px; min-width: 300px;
        .item-img{ min-width: 300px; height: 100px; background-size: 300px 100px; border-radius: 5px 5px 0 0;
            .item-time{ line-height: 100px; text-align: center; font-size: 18px; color: #fff;}
        }
        .item-info{ padding: 20px 0; border: 1px solid #e1e1e1; border-top: 0; border-radius: 0 0 5px 5px;
            p{ text-align: center; font-size: 16px; color: #333;}
            .item-btn{ margin-top: 20px;
                button{ display: block; margin: 0 auto; width: 160px; height: 40px; border: 0; background-color: #ff6325; border-radius: 5px; font-size: 16px; color: #fff; cursor: pointer;}
            }
        }
    }
    .item:nth-child(1) .item-img{ background-image: url('../../../../static/img/sixsun.png');}
    .item:nth-child(2) .item-img{ background-image: url('../../../../static/img/threesix.png');}
    .item:nth-child(3) .item-img{ background-image: url('../../../../static/img/threesun.png');}
}
</style>
