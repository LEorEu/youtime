<template>
	<div class="course-box">
		<div class="course-list">
			<ul>
				<li class="flex">
					<div class="course-left">
						<div class="line"></div>
						<i class="icon-round"></i>
					</div>
					<div class="course-right">
						<div class="course-time">
							<p>2017年4月29日 20:30</p>
						</div>
						<div class="course-info">
							<div class="course-type">1V1</div>
							<div class="course-text">
								<h2 class="course-title">新版主修课程：拼音入门（1）</h2>
								<p class="course-subtitle">副标题？没错就是副标题！你要问我字数多少，其实不也不知道。请自行脑爆看着办吧。</p>
								<p class="course-teacher">老师：测试老师</p>
							</div>
							<div class="course-btn">复习</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	
}
</script>

<style lang="less" scoped>
.course-box{ padding: 40px 40px 60px;
	.course-list{
		ul li{ padding-bottom: 40px;
			.course-left{ position: relative; width: 12px;
				.line{ margin-left: 5px; width: 2px; height: 100%; background-color: #f3f3f3;}
				.icon-round{ position: absolute; display: inline-block; top: 0px; left: 0px; width:12px; height: 12px; border-radius: 100%; border: 1px solid #999;}
			}
			.course-right{
				
			}
		}
	}
}
</style>
