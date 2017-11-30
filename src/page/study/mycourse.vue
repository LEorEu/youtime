<template>
	<div class="mycourse">
		<div class="course-menu">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<router-link to="/study/mycourse/undone">
					<el-menu-item index="1">未上的课程</el-menu-item>
				</router-link>
				<router-link to="/study/mycourse/complete">
					<el-menu-item index="2">已上的课程</el-menu-item>
				</router-link>
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
.mycourse{ width: 100%;
	.course-menu{ width: 100%; height: 60px;
		.el-menu{ padding-left: 30px; border: 1px solid #E6E6E6;
			.el-menu-item{ font-size: 16px; border-color: #FF7048;
			a{ display: block;}
			}
		}
	}
	.course-main{ width: 100%; border-top: 10px solid #F2F3F4;}
	.el-menu-item.is-active{ color: #333;}
}
</style>