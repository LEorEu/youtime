<template>
	<div class="poetry">
		<div class="container">
			<h1>诗词成语</h1>
			<ul class="poetry-list">
				<li class="poetry-item" v-for="(item, index) in items" :key="item.index">
					<div class="item-title flex">
						<h2>{{item.title}}</h2>
					</div>
					<div class="audio">
						<audio :src="item.audio" controls="controls" controlsList="nodownload" oncontextmenu="return false"></audio>
					</div>
					<div class="item-text">
						<p v-html="item.text"></p>
					</div>
					<div class="item-img">
						<img :src="item.img" alt="">
					</div>
				</li>
			</ul>
		</div> 
	</div>
</template>

<script>
export default {
	data(){
		return{
			items: [
				{
					title: '画龙点睛',
					text: '画龙点睛（ huà lóng diǎn jīng ）原形容梁代画家张僧繇作画的神妙。后多比喻写文章或讲话时，在关键处用几句话点明实质，使内容更加生动有力。',
					img: '../../../static/img/china/hldj.jpg',
					audio: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/mp3/hldj.mp3'
				},
				{
					title: '闻鸡起舞',
					text: '闻鸡起舞（ wén jī qǐ wǔ ）原意为听到鸡啼就起来舞剑，后来比喻有志报国的人即时奋起。《晋书·祖逖传》记述：传说东晋时期将领祖逖他年轻时就很有抱负，每次和好友刘琨谈论时局，总是慷慨激昂，满怀义愤，为了报效国家，他们在半夜一听到鸡鸣，就披衣起床，拔剑练武，刻苦锻炼',
					img: '../../../static/img/china/wjqw.jpg',
					audio: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/mp3/wjqw.mp3'
				},
				{
					title: '一诺千金',
					text: '一诺千金（ yī nuò qiān jīn ）一诺千金是汉语成语，意思是指许下的一个诺言有千金的价值。比喻说话算数，极有信用。也叫千金一诺。出自《史记·季布栾布列传》。',
					img: '../../../static/img/china/ynqj.jpg',
					audio: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/mp3/ynqj.mp3'
				},
				{
					title: '画蛇添足',
					text: '画蛇添足（ huà shé tiān zú ）原意为画蛇时给蛇添上脚。后比喻做了多余的事，非但无益，反而不合适。也比喻虚构事实，无中生有。',
					img: '../../../static/img/china/hstz.jpg',
					audio: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/mp3/hstz.mp3'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.poetry{ padding: 80px 0;
		h1{ text-align: center; font-size: 32px; color: #333;}
		.poetry-list{ margin-top: 30px;
			.poetry-item{ margin-bottom: 80px;
				.item-title{ color: #333;
					h2{ font-size: 24px;}
				}
				.audio{ margin-top: 20px;
					audio{ width: 40%;}
				} 
				.item-text{ margin-top: 10px; color: #333;
					p{ font-size: 16px;}
				}
				.item-img{ margin-top: 30px; width: 100%; 
					img{ max-width: 100%; height: 500px; background-color: #eee;}
				}
			}
		}
	}
	// 这个方式兼容所有版本的谷歌浏览器
audio::-webkit-media-controls {
    overflow: hidden !important
}
audio::-webkit-media-controls-enclosure {
    margin-left: auto;
}
</style>
