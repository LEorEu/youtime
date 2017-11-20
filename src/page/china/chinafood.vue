<template>
	<div class="chinafood">
		<div class="container">
			<div class="area-food">
				<h2>福建美食</h2>
				<ul class="food-list flex">
					<li class="food-item" v-for="(fjfood, index) in fjfoods" :key="fjfood.index">
						<div class="item-img">
							<img :src="fjfood.img" alt="">
						</div>
						<div class="item-title flex">
							<h2>{{fjfood.title}}</h2>
						</div>  
						<div class="item-text">
							<p v-html="fjfood.text"></p>
						</div>
					</li>
				</ul>
			</div>
			<div class="area-food">
				<h2>浙江美食</h2>
				<ul class="food-list flex">
					<li class="food-item" v-for="(zjfood, index) in zjfoods" :key="zjfood.index">
						<div class="item-img">
							<img :src="zjfood.img" alt="">
						</div>
						<div class="item-title flex">
							<h2>{{zjfood.title}}</h2>
						</div>  
						<div class="item-text">
							<p v-html="zjfood.text"></p>
						</div>
					</li>
				</ul>
			</div>
			<div class="area-food">
				<h2>广东美食</h2>
				<ul class="food-list flex">
					<li class="food-item" v-for="(gdfood, index) in gdfoods" :key="gdfood.index">
						<div class="item-img">
							<img :src="gdfood.img" alt="">
						</div>
						<div class="item-title flex">
							<h2>{{gdfood.title}}</h2>
						</div>  
						<div class="item-text">
							<p v-html="gdfood.text"></p>
						</div>
					</li>
				</ul>
			</div>
		</div> 
	</div>
</template>

<script>
export default {
	data(){
		return{
			fjfoods: [
				{
					img: '../../../static/img/china/fj01.jpg',
					title: '扁肉燕',
					text: '扁肉燕别名肉燕、扁食，是一道以肉燕皮、猪肉馅、葱花、白糖、麻油为主材的福建主食名，因形状似燕而得名，常见于福建和台湾。<br/>扁肉燕是福州传统的特色小吃之一，有平安吉祥的喻意，因此是本地节日和婚宴上必不可少的一道菜肴。在馅料上根据个人的喜好，各有差别，做法简单，蒸、煮两相宜，家家户户都会做。'
				},
				{
					img: '../../../static/img/china/fj02.jpg',
					title: '沙茶面',
					text: '沙茶面，普通话：ShaChaMian，台罗：sa-te-mī，东南亚广泛流行的著名的汤类面食小吃，在中国的沙茶面分有闽南的沙茶，广东潮汕的沙茶等风味，其妙处在在于沙茶酱的制作，用沙茶酱再制作汤头，而其中以厦门的沙茶面为典范。<br/>闽南美食大师杨继波老先生的沙茶面配方的唯一传授徒弟厨师技师王大全继承传统使之发扬光大。沙茶酱主料有虾干，鱼干，葱头，蒜头，老姜等十几种食材构成，经油炸香酥再研磨细，制成沙茶酱待用。'
				},
				{
					img: '../../../static/img/china/fj03.jpg',
					title: '蚵仔煎',
					text: '蚵仔煎，（闽南语读做ô-ā-jiān，普通话译作“海蛎煎”），是一道常见的家常菜，起源于福建泉州，是闽南，台湾，潮汕等地区经典的传统小吃之一。<br/>关于它的起源，有一则有趣的故事。民间传闻，西元1661年时，荷兰军队占领台南，泉州南安人郑成功从鹿耳门率兵攻入，意欲收复失土，郑军势如破竹大败荷军，荷军在一怒之下，把米粮全都藏匿起来，郑军在缺粮之馀急中生智，索性就地取材将台湾特产蚵仔、番薯粉混合加水和一和煎成饼吃，想不到竟流传后世，成了风靡全省的小吃。'
				}
			],
			zjfoods: [
				{
					img: '../../../static/img/china/zj01.jpg',
					title: '东坡肉',
					text: '东坡肉，又名红烧肉、滚肉、东坡焖肉，是眉山和江南地区特色传统名菜。东坡肉在浙菜、川菜、鄂菜等菜系中都有，且各地做法也有不同，有先煮后烧的，有先煮后蒸的，有直接焖煮收汁的。<br/>东坡肉的主料和造型大同小异，主料都是半肥半瘦的猪肉，成品菜都是码得整整齐齐的麻将块儿，红得透亮，色如玛瑙，夹起一块尝尝，软而不烂，肥而不腻。'
				},
				{
					img: '../../../static/img/china/zj02.jpg',
					title: '嘉兴粽子',
					text: '嘉兴粽子是浙江嘉兴特色传统名点。以糯而不糊，肥而不腻，香糯可口，咸甜适中而著称。尤以鲜肉粽最为出名，被誉为“粽子之王”。嘉兴粽子因其滋味鲜美，携带、食用方便而备受广大旅游者厚爱，有“东方快餐”之称。'
				},
				{
					img: '../../../static/img/china/zj03.jpg',
					title: '汤圆',
					text: '汤圆起源于中国宋朝。当时明州（现为浙江省宁波市）兴起吃一种新奇的食品[1]  ，即用黑芝麻、猪油、白砂糖为原料，首先把黑芝麻磨制成粉末状，然后猪油、白砂糖相继放入混合物揉成团做馅，外面用糯米粉搓成圆形，煮熟后，吃起来香甜可口，饶有风趣。因为这种糯米球煮在锅里又浮又沉，所以它最早叫“浮元子”，后来把“浮元子”改称汤圆。'
				}
			],
			gdfoods: [
				{
					img: '../../../static/img/china/gd01.jpg',
					title: '叉烧包',
					text: '叉烧包是广东地区具有代表性的特色传统西关名点之一，是粤式早茶的“四大天王（虾饺、干蒸烧卖、叉烧包、蛋挞）”之一。叉烧包是因面皮内包入叉烧肉馅，故使用此名。<br/>叉烧包的面皮是用北方常用的发酵面团经过改进而成的。包制时要捏制成雀笼形，因为发酵适当，蒸熟后包子顶部自然开裂，实际上是一种带有叉烧肉馅的开花馒头。叉烧包一般大小约为直径五公分左右，一笼通常为三或四个。'
				},
				{
					img: '../../../static/img/china/gd02.jpg',
					title: '广东早茶',
					text: '广东早茶是一种岭南民间饮食风俗。广东人饮早茶，有的是当作早餐的，一般都是全家老小围坐一桌，共享天伦之乐。有的喝完早茶即去上班，有的则以此消闲。消闲族大多为街坊退休老人，他们一般来得最早，离去最迟，从早上茶馆开门可以一直坐到早茶“收档”。这类茶客不去豪华酒家、高档茶楼或宾馆，而到就近街边经济实惠的小茶馆。如去高档茶楼，人均消费可以和酒宴差不多。“请早茶”也是广东人一种通常的社交方式。'
				},
				{
					img: '../../../static/img/china/gd03.jpg',
					title: '糖醋咕噜肉',
					text: '糖醋咕噜肉又名古老肉，始于清代，是广东传统名菜之一。据说，每每将它端上餐桌时，周围的食客都会馋得“咕噜咕噜”直咽口水，因此得名。<br/>醋咕噜肉是用甜酸汁和猪肉烹饪而成。成菜后，色泽金黄，香脆微辣，略带酸甜。'
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.chinafood{ padding: 80px 0;
		.area-food{ margin-bottom: 60px;
			h2{ text-align: center; font-size: 32px; color: #333;}
			.food-list{ margin-top: 20px;
				.food-item{ margin-right: 45px; width: 370px; 
					.item-img{ width: 100%; height: 300px; overflow: hidden;
						img{ width: 100%;}
					}
					.item-title{ margin-top: 20px;
						h2{ font-size: 24px; color: #333;}
					}
					.item-text{ margin-top: 5px;
						p{ letter-spacing: 2px; font-size: 16px; color: #333;}
					}
				}
				.food-item:nth-child(3){margin-right: 0;}
			}
		}
	}
</style>
