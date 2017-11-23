<template>
	<div class="folk">
		<div class="container">
			<ul class="folk-list">
				<li class="folk-item clearfix" v-for="(item, index) in items" :key="item.index">
					<div class="item-img">
						<img :src="item.img" alt="">
					</div>
					<div class="item-info">
						<div class="item-title">
							<h2>{{item.title}}</h2>
						</div>  
						<div class="item-text">
							<p v-html="item.text"></p>
						</div>
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
					img: '../../../static/img/china/folk01.jpg',
					title: '拗九节',
					text: '在福州人的传统观念中，数字“九”是极好的。节日当天，各家各户都用糯米、红糖，加上花生、桂圆、红枣、荸荠、芝麻等原料，煮成甜粥，称为“拗九粥”，用来祭祖或馈赠亲友。已出嫁的女儿，也必定要送一碗“拗九粥”，有的还要加上太平面、蛋、猪蹄等，送回娘家，孝敬父母。浓厚的节日气氛中，包含了儿女的一片孝心。'
				},
				{
					img: '../../../static/img/china/folk02.jpg',
					title: '游灯会',
					text: '元宵，在福建又称“灯节”，始于汉代。每届灯节，几乎家家户户点灯挂彩，尤以福州、泉州、厦门为盛，一般还会举行颇具规模的游灯会。福州花灯，历史上亦素享盛名，有“灯品至多，苏、福为冠”之说。泉州市每年元宵灯节之舞龙灯更成为群众喜闻乐见的娱乐形式。此外，福建民歌《卖汤圆》中唱到：“卖汤圆，卖汤圆，元宵的汤圆圆又圆……”正是“元宵吃汤圆”的真实写照。'
				},
				{
					img: '../../../static/img/china/folk03.jpg',
					title: '赛龙舟',
					text: '在端午节，吃粽子，赛龙舟，是福建多地普遍流行的特色。甜粽肉粽总相宜，龙舟竞技多风情。厦门集美的龙舟比赛，如今已成为区域性、国际性的重要品牌赛事，来自各国的参赛队伍，届时展开热烈追逐，场面十分火爆。'
				},
				{
					img: '../../../static/img/china/folk04.jpg',
					title: '春节',
					text: '春节是指汉字文化圈传统上的农历新年，俗称“年节”，传统名称为新年、大年、新岁，但口头上又称度岁、庆新岁、过年。[1]  中国人过春节已有4000多年的历史。在现代，人们把春节定于农历正月初一，但一般至少要到正月十五（上元节）新年才算结束，在民间，传统意义上的春节是指从腊月的腊祭或腊月二十三或二十四的祭灶，一直到正月十九。春节是中华民族最隆重的传统佳节，同时也是中国人情感得以释放、心理诉求得以满足的重要载体，是中华民族一年一度的狂欢节和永远的精神支柱。春节与清明节、端午节、中秋节并称为中国四大传统节日。'
				},
				{
					img: '../../../static/img/china/folk05.jpg',
					title: '醒狮',
					text: '广东醒狮属于中国狮舞中的南狮，是一种地道的广东省传统民间舞蹈，是广东舞苑中的一宝。历史上由唐代宫廷狮子舞脱胎而来，五代十国之后，随着中原移民的南迁，舞狮文化传入岭南地区。<br/>明代时，醒狮在广东出现，起源于南海县。现流传于广东、广西及东南亚各国华侨中间；在广东境内主要分布在珠三角及粤西地区。广东醒狮被认为是驱邪避害的吉祥瑞物，每逢节庆，或有重大活动，必有醒狮助兴，长盛不衰，历代相传。'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.folk{ padding: 80px 0;
		.folk-item{ margin-bottom: 60px; width: 100%; height: 400px; overflow: hidden;
			.item-img{ float: left; width: 570px; height: 400px; overflow: hidden;
				img{ width: 100%;}
			}
			.item-info{ float: right; width: 570px;
				.item-title{ margin-top: 20px;
					h2{ font-size: 30px; color: #333;}
				}
				.item-text{ margin-top: 30px;}
			}
		}
		.folk-item:nth-child(2n){
			.item-img{ float: right;}
			.item-info{ float: left;}
		}
	}
</style>
