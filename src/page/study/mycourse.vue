<template>
	<div class="mycourse">
		<div class="course-menu">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">
					<router-link to="/study/mycourse/undone">未上的课程</router-link>
				</el-menu-item>
				<el-menu-item index="2">
					<router-link to="/study/mycourse/complete">已上的课程</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="course-main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

import Undone from './children/undone'
import Complete from './children/complete'

export default {
	components: {
		'complete': Complete,
		'undone': Undone,
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
			.el-menu-item{ font-size: 16px; border-color: #FF7048;
			a{ display: block;}
			}
		}
	}
	.course-main{ width: 100%; border-top: 10px solid #F2F3F4;}
}
</style>