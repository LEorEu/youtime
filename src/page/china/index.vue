<template>
	<div class="china">
		<yt-header></yt-header>
		<router-view></router-view>
		<yt-footer></yt-footer>
	</div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import YtFooter from '../../components/footer/yt-footer'

export default {
    components: {
        'yt-header': ytHeader,
        'yt-footer': YtFooter
    }
}
</script>