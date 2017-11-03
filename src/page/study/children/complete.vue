<template>
	<div class="course-box">
		<div class="course-list">
			<ul>
				<li class="flex" v-for="(course, index) in courses" :key="course.index">
					<div class="course-left line">
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