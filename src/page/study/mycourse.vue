<template>
	<div class="mycourse">
		<div class="course-menu">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router=true>
				<el-menu-item index="nocourse">未上的课程</el-menu-item>
				<el-menu-item index="complete">已上的课程</el-menu-item>
			</el-menu>
		</div>
		<div class="course-main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

import Complete from './children/complete'
import Nocourse from './children/nocourse'

export default {
	components: {
		'complete': Complete,
		'nocourse': Nocourse,
  	},
	data() {
		return {
			activeIndex: '1'
		};
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}
</script>

<style lang="less" scoped>
.mycourse{ width: 100%; background-color: #fff; border: 1px solid #E6E6E6;
	.course-menu{ width: 100%; height: 60px;
		.el-menu{ margin-left: 30px;
			.el-menu-item{ font-size: 16px; border-color: #FF7048;}
		}
	}
	.course-main{ width: 100%; height: 1200px; border-top: 10px solid #F2F3F4;}
}
</style>