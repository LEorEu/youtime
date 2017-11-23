<template>
	<div class="art">
		<div class="container">
			<h1>中华艺术</h1>
			<ul class="art-list">
				<li class="art-item" v-for="(item, index) in items" :key="item.index">
					<div class="item-title flex">
						<h2>{{item.title}}</h2>
					</div>  
					<div class="item-text">
						<p v-html="item.text"></p>
					</div>
					<div class="item-img flex" :class="item.type">
						<img :src="item.img1" alt="">
						<img :src="item.img2" alt="">
						<img :src="item.img3" alt="">
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
					title: '青花瓷',
					text: '青花瓷又称白地青花瓷，常简称青花，中华陶瓷烧制工艺的珍品。是中国瓷器的主流品种之一，属釉下彩瓷。青花瓷是用含氧化钴的钴矿为原料，在陶瓷坯体上描绘纹饰，再罩上一层透明釉，经高温还原焰一次烧成。钴料烧成后呈蓝色，具有着色力强、发色鲜艳、烧成率高、呈色稳定的特点。原始青花瓷于唐宋已见端倪，成熟的青花瓷则出现在元代景德镇的湖田窑。明代青花成为瓷器的主流。清康熙时发展到了顶峰。明清时期，还创烧了青花五彩、孔雀绿釉青花、豆青釉青花、青花红彩、黄地青花、哥釉青花等衍生品种。',
					img1: '../../../static/img/china/qhc01.jpg',
					img2: '../../../static/img/china/qhc02.jpg',
					img3: '../../../static/img/china/qhc03.jpg',
					type: 'img3'
				},
				{
					title: '太极',
					subtitle: '（土楼建筑）',
					text: '所谓太极即是阐明宇宙从无极而太极，以至万物化生的过程。其中的太极即为天地未开、混沌未分阴阳之前的状态。 易经系辞：“是故易有太极，是生两仪”。 两仪即为太极的阴、阳二仪。<br/>关于“太极”迄今可见文献最早出自《庄子》。太极图式说是《庄子》“太极”思想在儒、道两家结出的硕果。',
					img1: '../../../static/img/china/tj01.jpg',
					img2: '../../../static/img/china/tj02.jpg',
					type: 'img2'
				},
				{
					title: '京剧',
					text: '京剧，曾称平剧，是中国五大戏曲剧种之一，腔调以西皮、二黄为主，用胡琴和锣鼓等伴奏，被视为中国国粹，位列中国戏曲三鼎甲“榜首” 。<br/>徽剧是京剧的前身。清代乾隆五十五年（1790年）起，原在南方演出的三庆、四喜、春台、和春， 四大徽班陆续进入北京，他们与来自湖北的汉调艺人合作，同时又接受了昆曲、秦腔的部分剧目、曲调和表演方法，民间曲调，通过不断的交流、融合，最终形成京剧。京剧形成后在清朝宫廷内开始快速发展，直至民国得到空前的繁荣。<br/>京剧走遍世界各地，成为介绍、传播中国传统艺术文化的重要媒介。分布地以北京为中心，遍及中国。在2010年11月16日，京剧被列入“人类非物质文化遗产代表作名录”。',
					img1: '../../../static/img/china/jj01.jpg',
					img2: '../../../static/img/china/jj02.jpg',
					type: 'img2'
				},
				{
					title: '绘画',
					text: '清明上河图，中国十大传世名画之一。为北宋风俗画，北宋画家张择端仅见的存世精品，属国宝级文物，现藏于北京故宫博物院。<br/>清明上河图宽25.2厘米，长528.7厘米，绢本设色。作品以长卷形式，采用散点透视构图法，生动记录了中国十二世纪北宋都城东京（又称汴京，今河南开封）的城市面貌和当时社会各阶层人民的生活状况，是北宋时期都城汴京当年繁荣的见证，也是北宋城市经济情况的写照。<br/>这在中国乃至世界绘画史上都是独一无二的。在五米多长的画卷里，共绘了数量庞大的各色人物，牛、骡、驴等牲畜，车、轿、大小船只，房屋、桥梁、城楼等各有特色，体现了宋代建筑的特征。具有很高的历史价值和艺术价值。《清明上河图》虽然场面热闹，但表现的并非繁荣市景，而是一幅带有忧患意识的“盛世危图”，官兵懒散税务重。',
					img1: '../../../static/img/china/hh01.jpg',
					type: 'img1'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.art{ padding: 80px 0;
		h1{ text-align: center; font-size: 32px; color: #333;}
		.art-list{ margin-top: 30px;
			.art-item{ margin-bottom: 80px;
				.item-title{ color: #333;
					h2{ font-size: 32px;}
					p{ margin-top: 10px; margin-left: 5px; font-size: 20px;}
				}
				.item-text{ margin-top: 30px; color: #333;
					p{ font-size: 16px;}
				}
				.item-img{ margin-top: 30px;
					img{ margin-right: 60px; background-color: #eee;}
					img:nth-child(2){ margin-right: 0;}
				}
				.img3 img{ margin-right: 100px;}
			}
		}
	}
</style>
