<template>
	<div class="myscore">
		<div class="myscore-menu">
			<div class="myscore-title">
				<h2>我的成绩</h2>
			</div>
		</div>
		<div class="myscore-main">
			<div class="myscore-content clearfix" v-show="!show">
				<div class="myscore-list fl-l">
					<ul>
						<li class="myscore-item" v-for="(grade, index) in grades" :key="grade.index">
							<div class="grade-title flex">
								<div class="grade-type typev1">1v1</div>
								<h2>{{grade.title}}</h2>
							</div>
							<p class="grade-subtitle">{{grade.desc}}</p>
							<p class="grade-teacher">老师：{{grade.name}}</p>
							<p class="grade-datetimes">上课时间：{{moment.unix(parseInt(grade.datetimes)).format('MM月DD日 HH:mm')}}</p>
						</li>
					</ul>
				</div>
				<div class="myscore-details fl-l">
					<ul class="details-list">
						<li>
							<div class="myscore-chart">
								<div class="lv-title">
									<h3>LV{{lvs.level}}级</h3>
									<p>我们为您测评的中文等级为{{lvs.level}}级，建议从优唐中文{{lvs.level}}级课程开始学起。祝您学习愉快！</p>
								</div>
								<div class="lv-chart">
									<img :src="lvs.url" alt="">
								</div>
							</div>
							<div class="myscore-desc">
								<h3>总体能力</h3>
								<p>{{lvs.desc}}</p>
							</div>
							<div class="myscore-skill">
								<h3>各项技能的具体描述</h3>
								<div class="skill-list">
									<ul class="clearfix">
										<li class="skill-item" v-for="(skill, index) in skills" :key="skill.index">
											<i class="item-icon"></i>
											<h5>{{typeSkill(skill.type)}}</h5>
											<p>{{skill.desc}}</p>
										</li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="alert-box" v-show="show">
				<div class="notfound">
					<div class="notfound-img">
						<img src="../../../static/img/icon-null.png" alt="">
					</div>
					<p>{{null_text}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
	data() {
		return {
			grades: [],
			lvs: [],
			skills: [],
			show: false,
			null_text: ''
		}
	},
	mounted(){
		this.gradesList();
	},
	methods:{
		// 我的成绩列表渲染
		gradesList(){
			let that=this;
			// md5验证
			let user_id = {
				'user_id': window.localStorage.getItem('id')
			},
			keys = Object.keys(user_id),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+user_id[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = '/api/v1/grades/get_grades';
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
				}
			}
			axios.post(url,user_id,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.grades = response.data.data;
					that.ecaluation();
				}else{
					that.null_text = '您还没有进行过测评，没有成绩可供显示'
					that.show = true;
					console.log('没有数据');
				}
			})
		},
		// 测评详情
		ecaluation(){
			let that=this;
			// md5验证
			let userid = {
				'userid': window.localStorage.getItem('id')
			},
			keys = Object.keys(userid),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+userid[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = `/api/v1/user_ecaluation?${p}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens
				}
			}
			axios.get(url,userid,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
					that.lvs = response.data.data[0];
					response.data.data.shift();
					that.skills = response.data.data;
				}else{
					console.log('没有数据');
				}
			})
		},
		typeSkill(type){
			let text='';
			switch (type) {
				case '2':
					text = '听'
					break;
				case '3':
					text = '说'
					break;
				case '4':
					text = '读'
					break;
				case '5':
					text = '写'
					break;
				case '6':
					text = '汉字'
					break;
			}
			return text;
		}
	}
}
</script>

<style lang="less" scoped>
.myscore{ width: 100%; height: 100%;
	.myscore-menu{ padding-left: 30px; width: 100%; height: 60px; background-color: #fff; border: 1px solid #dddddd;
		.myscore-title{ display: inline-block; padding: 0 20px; height: 58px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
			h2{ line-height: 58px; font-size: 16px; font-weight: 400; color: #2d2f33;}
		}
	}
	.myscore-main{ width: 100%; height: 100%; border-top: 10px solid #F2F3F4;
		.myscore-content{
			.myscore-list{ width: 300px; border-right: 10px solid #f2f3f4;
				.myscore-item{ padding: 20px; height: 180px; justify-content:center; align-items:Center; background-color: #fff; border: 1px solid #dddddd;
					.grade-title{ 
						.grade-type{ width: 40px; height: 30px; line-height: 30px; text-align: center; color: #fff;}
						.typev1{ background-color: #F9D872;}
						h2{ margin-left: 10px; font-size: 18px; line-height: 30px; color: #4d4d4d;}
					}
					.grade-subtitle{ margin-top: 5px; font-size: 14px; color: #818181;}
					.grade-teacher{ margin-top: 5px; font-size: 14px; color: #818181;}
					.grade-datetimes{ margin-top: 5px; font-size: 14px; color: #818181;}
				}
				.focus{ border: 1px solid #FF6325;}
			}
		}
		.myscore-details{ width: calc(~'100% - 300px');
			.details-list li { 
				.myscore-chart{ padding: 20px; background-color: #fff; border: 1px solid #dddddd;
					h3{ font-size: 24px; font-weight: 500; color: #ff6325;}
					p{ font-size: 16px; color: #333333;}
					.lv-chart{ margin-top: 20px; min-width: 600px; max-width: 700px;}
				}
				.myscore-desc{ margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #dddddd;
					h3{ font-size: 24px; font-weight: 500; color: #ff6325;}
					p{ font-size: 16px; color: #333333;}
				}
				.myscore-skill{ margin-top: 20px; padding: 20px; background-color: #fff; border: 1px solid #dddddd;
					h3{ font-size: 24px; font-weight: 500; color: #ff6325;}
					.skill-list{ margin-top: 20px;
						.skill-item{ margin-bottom: 15px; float: left; width: 50%;
							.item-icon{ display: block; float: left; margin-right: 10px; width: 84px; height: 84px; background-size: 84px;}
							h5{ margin-top: 5px; font-size: 18px; color: #333;}
							p{ margin-top: 5px; padding-right: 50px; font-size: 14px; color: #666;}
						}
						.skill-item:nth-child(1) .item-icon{ background-image: url('../../../static/img/icon-listen.png');}
						.skill-item:nth-child(2) .item-icon{ background-image: url('../../../static/img/icon-talk.png');}
						.skill-item:nth-child(3) .item-icon{ background-image: url('../../../static/img/icon-read.png');}
						.skill-item:nth-child(4) .item-icon{ background-image: url('../../../static/img/icon-write.png');}
						.skill-item:nth-child(5) .item-icon{ background-image: url('../../../static/img/icon-chinese.png');}
					}
				}
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