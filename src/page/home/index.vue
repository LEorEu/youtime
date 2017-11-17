<template>
  <div class="homepage">
    <yt-header></yt-header>
    <section class="banner section s1">
      <div class="swiper-banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" style="background-image: url('../../../static/img/banner1.jpg')"></div>
        </div>
      </div>
    </section>
    <section class="about-course section s2">
      <div class="container">
        <div class="section-title">
          <h1>视频在线教学，在家跟老师 “面对面” 互动<br/>全中文沉浸式课堂环境，随时随地高效学习</h1>
        </div>
        <div class="s2-banner">
          <img src="../../images/homepage-banner.jpg">
        </div>
      </div>
    </section>
    <section class="advantage section s3">
      <div class="container">
        <div class="section-title">
          <h1>我们的优势</h1>
          <p>多元化课程形式<br/>标准课程+自选课题，满足个性化学习需求</p>
        </div>
        <div class="type-list">
          <!-- <ul class="clearfix">
            <li v-for="(item, index) in items" :key="item.index">
              <div class="type-img">
                <img :src="item.imgsrc">
              </div>
              <div class="type-desc">
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul> -->
          <img src="../../../static/img/s3-bg.jpg">
        </div>
      </div>
    </section>
    <section class="section s4">
      <div class="section-title">
        <h1>视频在线教学，在家跟老师 “面对面” 互动<br/>全中文沉浸式课堂环境，随时随地高效学习</h1>
      </div>
    </section>
    <section class="teachers section s5">
      <div class="container">
        <div class="section-title">
          <h1>精选优质教师</h1>
        </div>
        <div class="advantage-main">
          <ul class="clearfix">
              <li class="ad" v-for="(ad, index) in ads" :key="ad.index">
                  <i :class="ad.class"></i>
                  <h3>{{ad.title}}</h3>
                  <p v-html="ad.text"></p>
              </li>
          </ul>
        </div>
        <div class="teacher-main">
            <div class="swiper-teacher">
              <ul class="swiper-wrapper">
                  <li class="swiper-slide teacher-item" v-for="(teacher, index) in teachers" :key="teacher.index">
                    <div class="teacher-img">
                      <img :src="teacher.img">
                    </div>
                    <div class="teacher-info">
                      <h5>{{teacher.cname}} {{teacher.ename}}</h5>
                      <p v-html="teacher.school"></p>
                    </div>
                    <div class="teacher-desc">
                      <p>{{teacher.text}}</p>
                    </div>
                  </li>
              </ul>
              <!-- Add Arrows -->
              <div class="swiper-button-next swiper-button-black"></div>
              <div class="swiper-button-prev swiper-button-black"></div>
          </div>
        </div>
      </div>
    </section>
    <yt-footer></yt-footer>
  </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import YtFooter from '../../components/footer/yt-footer'

import '../../plugins/Swiper-3.4.2/dist/js/swiper.min.js'
import '../../plugins/Swiper-3.4.2/dist/css/swiper.min.css'

export default {
    components: {
        'yt-header': ytHeader,
        'yt-footer': YtFooter
    },
    methods: {
        swiper(){
            var swiper = new Swiper('.swiper-teacher', {
                loop : true,
                slidesPerView: 3,
                spaceBetween: 30,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
            });
        }
    },
    mounted() {
        this.swiper();
    },
    data() {
      return{
        items: [
          {
            title: '“零距离”在线课堂',
            imgsrc: '../../images/select-img01.jpg'
          },
          {
            title: '经验丰富的专业师资',
            imgsrc: '../../images/select-img02.jpg'
          },
          {
            title: '生动有趣的学习体验',
            imgsrc: '../../images/select-img03.jpg'
          },
          {
            title: '快速掌握800字词',
            imgsrc: '../../images/select-img04.jpg'
          },
          {
            title: '个性化启发式教学',
            imgsrc: '../../images/select-img05.jpg'
          },
          {
            title: '多主题文化拓展课程',
            imgsrc: '../../images/select-img06.jpg'
          }
        ],
        ads: [
          {
              class: 'icon-teachera',
              title: '严格筛选',
              text: '3轮面试，全面评估老师综合素质和能力<br>录取率低于10%，优中选优，只选最适合的老师<br>多轮在线试讲，教学专业度和课堂感染力双轨评审'
          },
          {
              class: 'icon-teacherb',
              title: '专业培训',
              text: '入职后3个月内，累计100小时培训<br/>线上教学模拟演练，教学方法定期研讨<br/>儿童心理学和教育理论学习，文化素养拓展'
          },
          {
              class: 'icon-teacherc',
              title: '系统考核',
              text: '实行老师等级晋升以及末位淘汰机制<br/>每3个月对老师的综合表现进行全面考评<br/>授课质量持续督查，家长及学员的反馈即时落实'
          }
        ],
        teachers: [
            {
                img: '../../../static/img/teachers/LuciaChen.png',
                cname: '陈晓蓓',
                ename: 'Lucia Chen',
                school: '北京大学<br/>Peking University',
                text: 'Lucia老师来自中国，生于1998年，北京大学中文系语言学专业本科生。长期教外国朋友学习华语，善于将专业的理论知识应用于教学实践。她性格开朗，寓教于乐，对小朋友们很有耐心。兴趣爱好广泛，擅长二胡、主持、写作，希望能把中华文化之美展现给每一位学生。想来学习博大精深的华语文化吗？欢迎约课哦~'
            },
            {
                img: '../../../static/img/teachers/CeciliaLi.png',
                cname: '李萌源',
                ename: 'Cecilia Li',
                school: '北京外国语大学<br/>Beijing Foreign Studies University',
                text: '李老师来自北京外国语大学，有着丰富的留学生教学经验和夏令营任教经历。她本科学中文国际教育，擅长中文发音、汉字识读、成团学词等教学板块。她灵活的教学手段总是能使课堂气氛活跃起来，鼓励孩子们积极参与、主动表现，让孩子们在快乐轻松的氛围中学习中文~想要加入李老师的课堂吗？快来约课吧！'
            },
            {
                img: '../../../static/img/teachers/CarolYang.png',
                cname: '杨子',
                ename: 'Carol Yang',
                school: '北京外国语大学<br/>Beijing Foreign Studies University',
                text: 'Carol老师来自中国，生于1997年，就读于北京外国语大学。Carol老师开朗阳光，热情幽默。她已有超过两年的从教经历，曾教过日本、德国、英国、南非和海外华人华侨学生学习中文。教学之余，她喜欢旅行、滑滑板、滑雪等户外活动。Carol老师非常喜欢小朋友，更喜欢在轻松有趣的游戏中领着小朋友们一起学习中文。'
            },
            {
                img: '../../../static/img/teachers/TongtongZhou.png',
                cname: '周桐同',
                ename: 'Tongtong Zhou',
                school: '北京师范大学<br/>Beijing Normal University',
                text: '周桐同，北京师范大学中文系本科。热爱华语言文学，普通话标准且喜爱书法。生于 1998 年， 与孩子们年龄差别较小，且性格活泼，善于与孩子沟通交流，同时有着丰富的支教和家教经验。教学之余，她喜欢旅行、阅读和写作，对中国各地的风俗风景都有着较深的体会，同时对儿童文学有着强烈的兴趣。'
            },
            {
                img: '../../../static/img/teachers/JenniferYang.jpg',
                cname: '杨镜洁',
                ename: 'Jennifer Yang',
                school: '北京外国语大学<br/>Beijing Foreign Studies University',
                text: 'Jennifer老师了解很多中国传统文化知识，曾到美丽的斯里兰卡做对外汉语教师志愿者，喜欢与小朋友相处交流。Jennifer老师还会古筝、唱歌，喜欢运动、旅行。她希望带给每一位学生知识的同时也带来乐趣。想和Jennifer老师一起了解有趣的中国文化吗，欢迎来约课~'
            },
            {
                img: '../../../static/img/teachers/TinaYuan.jpg',
                cname: '袁梦',
                ename: 'Tina Yuan',
                school: '北京师范大学<br/>Beijing Normal University',
                text: 'Tina老师来自中国北京，北京师范大学汉语国际教育专业硕士。她热爱教育，擅长和孩子沟通，拥有丰富的教学经验，曾向多个国家的学生教授中文。“学为人师，行为世范”是她作为教师的座右铭。Tina老师性格开朗、兴趣广泛，喜欢通过丰富多彩的课堂活动教授中文知识。'
            }
        ]
      }
    }
}
</script>

<style lang="less" scoped>
  .section{ padding: 40px 0;
    .section-title{ text-align: center;
      h1{ font-size: 36px; font-weight: 400; line-height: 60px; color: #555;}
      p{ margin-top: 15px; font-size: 20px; text-align: center; color: #555;}
    }
  }
  .banner{ position: relative; padding: 0; width: 100%; height: 600px; background-color: #ADADAD;
    .swiper-banner{ position: absolute; vtop: 0; left: 0; z-index: 9; width: 100%; height: 100%;}
    .swiper-slide { background-position: center; background-size: cover;}
  }
  .about-course{ margin-top: 40px;
    .s2-banner{ margin-top: 40px; text-align: center;
      img{ width: 1000px;}
    }
  }
  .advantage{ 
    .type-list{ margin-top: 40px; padding: 40px 0;
      img{ width: 100%;}
    }
  }
  .s4{ display: table; width: 100%; height: 300px; background: url('../../images/s4-bg.jpg') center;
    .section-title { display: table-cell; vertical-align: middle;
      h1{ color: #fff;}
    }
  }
  .teachers{
    .advantage-main { margin-top: 40px;
      .ad{ float: left; margin-right: 5%; width: 30%;
        i{ display: block; margin: 0 auto; width: 120px; height: 120px; background-position: center; background-size: 70%; background-repeat: no-repeat;}
        .icon-teachera{ background-image: url('../../images/icon-teachera.png');}
        .icon-teacherb{ background-image: url('../../images/icon-teacherb.png'); background-size: 80%;}
        .icon-teacherc{ background-image: url('../../images/icon-teacherc.png');}
        h3{ margin-top: 15px; text-align: center; font-size: 22px; color: #333;}
        p{ margin-top: 15px; text-align: center; font-size: 14px; color: #333;}
      }
      .ad:nth-child(3){ margin-right: 0%;}
    }
    .teacher-main{ position: relative; margin-top: 40px; padding: 0 80px;
      .swiper-teacher { padding: 20px; overflow: hidden; width: 100%;}
      .swiper-slide { padding: 20px 20px 40px; text-align: center; background: #fff; -webkit-justify-content: center; justify-content: center; -webkit-box-align: center; -webkit-align-items: center; align-items: center; border-radius: 8px;
        .teacher-img{ margin: 0 auto; margin-top: 20px; width: 140px; height: 140px; border-radius: 100%; overflow: hidden;
          img{ height: 100%;}
        }
        .teacher-info{ margin-top: 20px;
          h5{ font-size: 18px; color: #333;}
          p{ margin-top: 20px; text-align: center; font-size: 14px; color: #666;}
        }
        .teacher-desc{ margin-top: 20px; height: 130px;
          p{ font-size: 12px; color: #666;}
        }
      }
      .swiper-slide:hover{ transition: all .5s; box-shadow: 0px 0px 20px 4px #dadada;}
    }
  }
</style>
