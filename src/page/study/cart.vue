<template>
	<div class="cart">
		<div class="course-v1 cart-section">
			<div class="cart-head">
				<h2 class="cart-title">一对一课程</h2>
				<p class="cart-subtitle">每节课25分钟，随时预约上课，学习进度自己掌握</p>
			</div>
			<div class="cart-list">
				<ul class="flex">
					<li class="course-item">
						<router-link to="/study/pay">
							<h3>60节课</h3>
							<p>此处是文案<br/>此处是文案</p>
							<span>套餐价格 $ 10</span>	
						</router-link>
					</li>
					<li class="course-item">
						<router-link to="/study/pay">
							<h3>120节课</h3>
							<p>此处是文案<br/>此处是文案</p>
							<span>套餐价格 $ 18</span>
						</router-link>
					</li>
					<li class="course-item">
						<p>此处是文案<br/>此处是文案</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="course-v4 cart-section">
			<div class="cart-head">
				<h2 class="cart-title">一对一课程</h2>
				<p class="cart-subtitle">每节课40分钟，随时预约上课，学习进度自己掌握</p>
			</div>
			<div class="cart-list">
				<ul class="flex">
					<li class="course-item">
						<router-link to="/study/pay">
							<h3>60节课</h3>
							<p>此处是文案<br/>此处是文案</p>
							<span>套餐价格 $ 10</span>
						</router-link>
						
					</li>
					<li class="course-item">
						<router-link to="/study/pay">
							<h3>120节课</h3>
							<p>此处是文案<br/>此处是文案</p>
							<span>套餐价格 $ 18</span>
						</router-link>
						
					</li>
					<li class="course-item" style=" verti">
						<p>此处是文案<br/>此处是文案</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.cart-section{ padding: 20px; margin-bottom: 10px; width: 100%; background-color: #fff;
	.cart-head{ color: #333;
		.cart-title{ font-size: 28px;}
		.cart-subtitle{ font-size: 16px;}
	}
	.cart-list{ margin-top: 20px;
		.course-item{ margin-right: 30px;
			width: 380px;
			height: 240px;
			color: #444;
			h3{ margin-top:40px; font-size: 24px; text-align: center;}
			p{ margin-top:20px; font-size: 16px; text-align: center;}
			span{ display: block; margin-top: 20px; font-size: 20px; text-align: center; color: #ff6325;}
		}
	}
}
.course-v1{
	.course-item{ background-color: #ffd557;}
}
.course-v4{
	.course-item{ background-color: #5dc4ff;}
}
</style>
