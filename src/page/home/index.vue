<template>
  <div class="homepage">
    <yt-header></yt-header>
    <section class="banner section s1">
      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"></div>
            <div class="swiper-slide"></div>     
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination swiper-pagination-white"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next swiper-button-white"></div>
        <div class="swiper-button-prev swiper-button-white"></div>
      </div>
    </section>
  </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import '../../plugins/Swiper-3.4.2/dist/js/swiper.min.js'
import '../../plugins/Swiper-3.4.2/dist/css/swiper.min.css'

export default {
    components: {
        'yt-header': ytHeader
    },
    methods: {
        swiper(){
            var swiper = new Swiper('.swiper-container', {
                autoplay : 5000,
                loop : true,
                pagination: '.swiper-pagination',
                paginationClickable: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30,
                effect: 'fade'
            });
        }
    },
    mounted() {
        this.swiper();
    },
    data() {
        return{
        }
    }
}
</script>

<style lang="less" scoped>
  .section{ padding: 40px 0;
    .section-title{ text-align: center;
      h1{ font-size: 36px; line-height: 60px; color: #555;}
    }
  }
  .banner{ position: relative; padding: 0; width: 100%; height: 600px; background-color: #ADADAD;
    .swiper-container{ position: absolute; top: 0; left: 0; z-index: 9;}
    .swiper-container { width: 100%; height: 100%;}
    .swiper-slide { background-position: center; background-size: cover;}
  }

</style>
