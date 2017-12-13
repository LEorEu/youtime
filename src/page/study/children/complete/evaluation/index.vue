<template>
  <div>
    <div :class="clear" @click="hideEvaluation"></div>
    <transition name="fade">
      <div class="evaluation" v-show="evaluationShow">
        <div class="title">
          <i @click="hideEvaluation"><img src="../../../../../../static/img/close.jpg" style="width: 20px;height: 20px;"></i>
          <h1 class="text">课程评价</h1>
        </div>
        <div class="container">
          <div class="main">
            <h2 class="bar">课程信息</h2>
            <div class="child">课程:<p class="info">
              {{course.describe}}
            </p></div>
            <div class="child">上课时间:<p class="info">
              {{moment.unix(parseInt(course.datetimes)).format('MM月DD日 HH:mm')}}
            </p>
            </div>
            <div class="child">老师:<p class="info">
              {{course.ename}}
            </p></div>

            <!--<ul v-for="rate in rateList">-->
              <!--<li class="child">{{ rate.type }}<span class="info">{{ rate.key }}</span></li>-->
            <!--</ul>-->



          </div>
          <div class="main">
            <h2 class="bar">课程评分</h2>
            <div class="child"><star class="info" @getValue="getValue"></star></div>

            <!--<ul v-for="grade in gradeList">-->
              <!--<li class="child">{{ grade.type }}-->
                <!--<ul v-for="n in 5" class="info">-->
                  <!--<li><star></star></li>-->
                <!--</ul>-->
              <!--</li>-->
            <!--</ul>-->
          </div>
          <div @click="submitData()" class="submit">提交</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import md5 from 'blueimp-md5'
  import Star from './stars'
  import axios from 'axios'
  export default {
    components: { Star },
    data(){
      return {
        // rateList: [
        //   { type: '课程', key: null },
        //   { type: '上课时间', key: null },
        //   { type: '老师', key: null }
        // ],
        // gradeList: [
        //   {type: '老师', score1: null},
        //   {type: '课件', score2: null},
        //   {type: '网络', score3: null},
        // ],
        evaluationShow: false,
        clear: '',
        course: '',
        user_ip: '',
        value1: null ,
        value2: null ,
        value3: null
        // rateList: [
        //   {type: '老师', selected: 1},
        //   {type: '课件', selected: 2},
        //   {type: '网络', selected: 3},
        // ]
      }
    },
    mounted(){
      this.getUserIp()
    },
    // watch: {
    //   'course'() {
    //     this.$nextTick(() => {
    //       this.rateList = [
    //         { type: '课程', key: this.course.describe },
    //         { type: '上课时间', key: moment.unix(parseInt(this.course.datetimes)).format('MM月DD日 HH:mm') },
    //         { type: '老师', key: this.course.ename }
    //       ]
    //     })
    //   }
    // },
    methods: {
      getUserIp(){
        axios.get('/api/v1/getip').then((response) => {
          if(response.data.errCode === 0){
            this.user_ip = response.data.data.ip
          }
        })
      },
      getValue([value1, value2, value3]){
        this.value1 = value1
        this.value2 = value2
        this.value3 = value3
      },
      showEvaluation(course){
        this.evaluationShow = true
        this.clear = 'clear'
        this.course = course
      },
      hideEvaluation(){
        this.evaluationShow = false
        this.clear = ''
      },
      submitData(){
        let url = '/api/v1/user/couser_grade'
        let data = {
          'userid': window.localStorage.id,    //	用户id
          'course_id': this.course.course_id,      //课程的id
          'user_ip': this.user_ip,       //用户ip
          'teacher_grade': this.value1,       //老师评分(1-5)
          'lesson_grade': this.value2,       //	课件评分(1-5)
          'network_grade': this.value3,       //网络评分(1-5)
          'type': this.course.type, //	课程类型
          'teacher_id': this.course.teacherid      //	被老师的id
        },
        keys = Object.keys(data),
          i, len = keys.length;
        keys.sort();
        let p = '';
        for (i = 0; i < len; i++) {
          let k = keys[i];
          p += k + '=' + data[k] + '&';
        }
        p = p.substring(0,p.length-1);
        let tokens = md5('ilovewan' + p + 'banghanchen');
        let config = {
          headers:{
            versions: '1',
            tokens: tokens,
            as: 3
          }
        }
        console.log(data)
        axios.post(url, data, config).then((response) => {
          if(response.data.errCode === 0){
            alert('您已评价成功！')
            window.location.href = '/study/mycourse/complete'
          } else{
            alert('评分不能为空！')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .clear{position:fixed;left:0;right:0;top:0;bottom:0;opacity: 0.3;z-index: 1;background: #000;}
  .evaluation{width: 500px; height: 500px; position: fixed; z-index: 2; top: 50%; left: 50%; margin-top: -250px; margin-left: -250px; opacity: 1; background: #fff;
    &.fade-enter-active, &.fade-leave-active{ transition: all .3s};
    &.fade-enter, &.fade-leave-active{ opacity: 0; background: rgba(7, 17, 27, 0);}
    .title{position: relative;width: 100%; height: 70px; text-align: center; font-size: 20px;
      i{position: absolute; top: 0; right: 0;padding: 10px;}
      .text{ line-height: 70px;};
    };
    .container{width: 100%;
      .main{width: 460px;height:152px;border-radius: 10px;border:1px solid #dad6d6;margin: 0 auto 20px auto;
        .bar{ margin: 16px auto auto 20px ;color: #a7a7a7};
        .child{margin: 10px auto auto 20px ;
          .info{ display: inline-block;vertical-align: middle;}
        };
      };
      .submit{width: 265px;height: 50px;line-height: 50px;text-align: center;margin: 30px auto auto auto;color: #000;font-size: 20px;background: url(../../../../../../static/img/submit-button.jpg)}
    }
  }
</style>
