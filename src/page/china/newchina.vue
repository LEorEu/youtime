<template>
	<div class="story">
		<div class="container">
			<h1>新时代中国</h1>
			<ul class="story-list">
				<li class="story-item" v-for="(item, index) in items" :key="item.index">
					<div class="item-title flex">
						<h2>{{item.title}}</h2>
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
					title: '中国高铁',
					text: '中国的高速铁路的建设始于2004年的中国铁路长远规划，开通的第一条真正意义的高速铁路是2008年8月1日开通运营的350公里/小时的京津城际高速铁路（符合高铁大系统定义，既要求基础建设部分，又要求高速动车或高速列车部分。）。经过10多年的高速铁路建设和对既有铁路的高速化改造，中国目前已经拥有全世界最大规模以及最高运营速度的高速铁路网。截止2014年10月26日，中国高铁总里程达到12000公里，“四纵”干线基本成型。中国高速铁路运营里程约占世界高铁运营里程的50%，稳居世界高铁里程榜首',
					img: '../../../static/img/china/newchina01.jpg',
				},
				{
					title: '移动支付',
					text: '移动支付也称为手机支付，就是允许用户使用其移动终端（通常是手机）对所消费的商品或服务进行账务支付的一种服务方式。单位或个人通过移动设备、互联网或者近距离传感直接或间接向银行金融机构发送支付指令产生货币支付与资金转移行为，从而实现移动支付功能。移动支付将终端设备、互联网、应用提供商以及金融机构相融合，为用户提供货币支付、缴费等金融业务。<br/>移动支付主要分为近场支付和远程支付两种，所谓近场支付，就是用手机刷卡的方式坐车、买东西等，很便利。远程支付是指：通过发送支付指令（如网银、电话银行、手机支付等）或借助支付工具（如通过邮寄、汇款）进行的支付方式，如掌中付推出的掌中电商，掌中充值，掌中视频等属于远程支付。目前支付标准不统一给相关的推广工作造成了很多困惑。',
					img: '../../../static/img/china/newchina02.jpg',
				},
				{
					title: '上海中心大厦',
					text: '上海中心大厦（Shanghai Tower），是中华人民共和国上海市的一座超高层地标式摩天大楼，其设计高度超过附近的上海环球金融中心。上海中心大厦项目面积433954平方米，建筑主体为118层，总高为632米，结构高度为580米，机动车停车位布置在地下，可停放2000辆。<br/>上海中心大厦作为一幢综合性超高层建筑，以办公为主，其他业态有会展、酒店、观光娱乐、商业等。大厦分为5大功能区建造，包括大众商业娱乐区域，低、中、高、办公区域，企业会馆区域，精品酒店区域和顶部功能体验空间。其中“世界之巅”即是功能体验区，有城市展示观看台，娱乐，VIP小型酒吧、餐饮、观光会晤等功能。另外，在大厦裙房中还设有容纳1200人的多功能活动中心。',
					img: '../../../static/img/china/newchina03.jpg',
				},
				{
					title: '港珠澳大桥',
					text: '港珠澳大桥（英语：Hong Kong-Zhuhai-Macao Bridge；葡萄牙语：Ponte Hong Kong-Zhuhai-Macau）是中国的一座跨海大桥，港珠澳大桥是连接香港、珠海、澳门的超大型跨海通道，全长55公里，建成后将成为世界最长的跨海大桥。<br/>其中，工程量最大、技术难度最高的是长约29.6公里的桥—岛—隧集群的主体工程。主体工程“海中桥隧”长35.578公里，其中海底隧道长约6.75公里。建成后将会为 G4-京港澳高速以及 G94-珠三角环线高速的一部分。<br/>港珠澳大桥沉管隧道是全球最长的公路沉管隧道和全球唯一的深埋沉管隧道，生产和安装技术有一系列创新，为世界海底隧道工程技术提供了独特的样本和宝贵的经验 。2017年11月14日，港珠澳大桥主体工程荷载试验完成，全面进入验收期。',
					img: '../../../static/img/china/newchina04.jpg',
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.story{ padding: 80px 0;
		h1{ text-align: center; font-size: 32px; color: #333;}
		.story-list{ margin-top: 30px;
			.story-item{ margin-bottom: 80px;
				.item-title{ color: #333;
					h2{ font-size: 24px;}
				}
				.item-text{ margin-top: 30px; color: #333;
					p{ font-size: 16px;}
				}
				.item-img{ margin-top: 30px;
					img{ width: 100%; height: 500px; background-color: #eee;}
				}
			}
		}
	}
</style>
