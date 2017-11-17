<template>
  <div class="curriculum">
    <yt-header></yt-header>
    <section class="banner section">
      <div class="container">
      </div>
    </section>
    <section class="features c1 section">
      <div class="container">
        <div class="section-title">
          <h1>我们的特色</h1>
        </div>
        <div class="features-list">
          <ul class="clearfix">
            <li :class="ft.class" v-for="(ft, index) in features" :key="ft.index">
              <div class="box-img">
                <img :src="ft.img">
              </div>
              <div class="box-info">
                  <h4 class="box-title">{{ft.title}}</h4>
                  <div class="line"></div>
                  <p class="box-text" v-html="ft.desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="table c2 section">
      <div class="container">
        <div class="section-title">
          <h1>主修进阶课程体系</h1>
          <p>快速掌握800个核心字词 ，普通话、阅读、写作能力综合提升<br/>自主知识产权教材、课件</p>
        </div>
        <div class="c-box">
          <div class="c-img">
            <img src="../../../static/img/level.jpg">
          </div>
        </div>
      </div>
    </section>
    <section class="section c3">
      <div class="c-mask"></div>
      <div class="section-title">
        <h1>掌握标准的华语发音方式<br/>领悟中华文化的博大精深</h1>
      </div>
    </section>
    <section class="section c4">
      <div class="container">
        <div class="section-title">
          <h1>文化拓展直播课</h1>
          <p>根据兴趣和偏好自主选择，创造多维文化环境和应用场景</p>
        </div>
        <div class="item-list">
          <ul class="clearfix" id="itemeach">
            <li class="item-box" v-for="(item, index) in items" :key="item.index">
              <p class="item-title">{{item.title}}</p>
              <img :src="item.imgsrc">
            </li>
          </ul>
        </div>
      </div>
    </section>
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
    },
    data: function(){
        return{
            features: [
                {
                    img: '../../../static/img/c-test.jpg',
                    title: '阶段性测评课',
                    desc: '每节课25分钟<br/>孩子全程保持注意力，学习效果倍增，老师根据孩子特点进行更有针对性的教学。',
                    class: 'c-top color-a',
                },
                {
                    img: '../../../static/img/c-v1.jpg',
                    title: '一对一课程',
                    desc: '每节课25分钟<br/>孩子全程保持注意力，学习效果倍增，老师根据孩子特点进行更有针对性的教学',
                    class: 'c-bottom color-b',
                },
                {
                    img: '../../../static/img/c-v4.jpg',
                    title: '阶段性测评课',
                    desc: '每节课35分钟<br/>小班级学习氛围，孩子之间对话和互动，充分保证每个孩子的练习时间，跟小伙伴一起成长',
                    class: 'c-top  color-c'
                },
                {
                    img: '../../../static/img/c-open.jpg',
                    title: '阶段性测评课',
                    desc: '每节课25分钟<br/>孩子全程保持注意力，学习效果倍增，老师根据孩子特点进行更有针对性的教学',
                    class: 'c-bottom  color-d'
                },
            ],
            items: [
              {
                title: '诗词成语',
                imgsrc: '/static/img/select-img01.jpg',
                link: ''
              },
              {
                title: '经典诵读',
                imgsrc: '/static/img/select-img02.jpg',
                link: ''
              },
              {
                title: '中华美食',
                imgsrc: '/static/img/select-img03.jpg',
                link: ''
              },
              {
                title: '现代中国',
                imgsrc: '/static/img/select-img04.jpg',
                link: '',
              },
              {
                title: '中华艺术',
                imgsrc: '/static/img/select-img05.jpg',
                link: ''
              },
              {
                title: '民风民俗',
                imgsrc: '/static/img/select-img06.jpg',
                link: '',
              },
              {
                title: '历史文化',
                imgsrc: '/static/img/select-img06.jpg',
                link: '',
              },
              {
                title: '锦绣河山',
                imgsrc: '/static/img/select-img06.jpg',
                link: '',
              }
            ],
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.section{ padding: 40px 0;
	.section-title{ text-align: center;
		h1{ font-size: 36px; font-weight: 400; line-height: 60px; color: #555;}
		p{ margin-top: 15px; font-size: 20px; text-align: center; color: #555;}
	}
}
.banner{ position: relative; width: 100%; height: 600px; background-image: url('../../../static/img/course-banner.jpg'); background-position: center; background-repeat: no-repeat;}
.features{ margin-top: 40px;
  .features-list{ margin-top: 40px;
    ul li{ float: left; margin: 0 15px; width: 270px; height: 420px; background-color: #eee; border-radius: 10px;
      .box-img{ width: 100%; height: 200px; overflow: hidden;
        img{ width: 100%;} 
      }
      .box-info{ padding: 20px; color: #fff;
        .box-title{ font-size: 20px;}
        .line{ margin: 10px 0; width: 60px; height: 1px; background-color: #e8e8e8;}
        .box-text{ font-size: 14px;}
      }
    }
    .color-a{ background-color: #00d4d1;}
    .color-b{ background-color: #ffae4b;}
    .color-c{ background-color: #35b8f9;}
    .color-d{ background-color: #ff6060;}
    .c-bottom{ margin-top: 100px;}
  }
}
.table{ padding: 80px 0;
  .c-box{ margin-top: 40px;
    .c-img{ width: 100%; text-align: center;
      img{ display: inline-block;}
    }
  }
}
.c3{ position: relative; display: table; width: 100%; height: 300px; background: url('../../../static/img/c3-bg.jpg') center; 
  .c-mask{ position: absolute; top: 0; z-index: 9; background-color: rgba(0,0,0,0.2); width: 100%; height: 100%;}
  .section-title { position: relative; z-index: 99; display: table-cell; vertical-align: middle;
    h1{ color: #fff;}
  }
}
.c4{ margin-top: 40px;
    .item-list{ margin-top: 40px;
      .item-box{ position: relative; float: left; margin-right: 20px; margin-bottom: 40px; width: 1140px / 4; height: 200px; cursor: pointer;
        .item-title{ position: absolute; width: 100%; text-align: center; font-size: 28px; font-weight: 600; line-height: 200px; color: #fff; background-color: rgba(0, 0, 0, .4)}
        img{ width: 100%; height: 100%;}
      }
      .item-box:nth-child(4n){ margin-right: 0;}
    }
}
</style>
