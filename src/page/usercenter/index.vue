<template>
	<div class="ucenter">
		<yt-header></yt-header>
		<div class="main-container flex">
			<s-aside></s-aside>
			<div class="main-content">
        <div class="ucenter-menu">
          <div class="ucenter-title">
            <h2>个人信息</h2>
          </div>
        </div>
        <div class="ucenter-info">
          <!-- handle -->
          <div class="handle flex section">
            <div class="info-title">
              <h3>头像</h3>
            </div>
            <div class="edit-avatar">
              <VueImgInputer v-model="picValue" theme="material" size="small" :imgSrc="userInfo.headimg"></VueImgInputer>
            </div>
          </div>
          <!-- sex -->
          <div class="sex flex section">
            <div class="info-title">
              <h3>性别</h3>
            </div>
            <div class="info-radio">
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
                <el-radio :label="2">保密</el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- birthday -->
          <div class="birthday flex section">
            <div class="info-title">
              <h3>出生日期</h3>
            </div>
            <div class="info-date">
              <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择出生日期"></el-date-picker>
            </div>
          </div>  
          <!-- cname -->
          <div class="cname flex section">
            <div class="info-title">
              <h3>中文姓名</h3>
            </div>
            <div class="info-input">
              <el-input v-model="userInfo.cname" placeholder="请输入中文姓名"></el-input>
              <span>用于高等教育课程证书登记与发放，不会以任何形式向第三方透漏</span>
            </div>
          </div> 
          <!-- ename -->
          <div class="ename flex section">
            <div class="info-title">
              <h3>英文姓名</h3>
            </div>
            <div class="info-input">
              <el-input v-model="userInfo.ename" placeholder="请输入英文姓名"></el-input>
            </div>
          </div>
          <!-- email -->
          <div class="email flex section">
            <div class="info-title">
              <h3>常用邮箱</h3>
            </div>
            <div class="info-input">
              <el-input v-model="userInfo.email" placeholder="请输入常用邮箱" :disabled="flag" v-show="emailShow"></el-input>
              <el-button @click="dialogEmailVisible = true" v-show="!emailShow" plain>{{status.emailText}}</el-button>
              <span>用于接收来自平台和课程的邮件通知，非常重要</span>
            </div>
          </div>
          <!-- phone -->
          <div class="phone flex section">
            <div class="info-title">
              <h3>手机号码</h3>
            </div>
            <div class="info-input">
              <el-input v-model="userInfo.phone" placeholder="请输入手机号码" :disabled="flag" v-show="phoneShow"></el-input>
              <el-button @click="dialogPhoneVisible = true" v-show="!phoneShow" plain>{{status.phoneText}}</el-button>
              <span>用于优质课程的学习提醒等服务，手机号不会对外公开，请放心</span>
            </div>
          </div>
          <!-- password -->
          <div class="password flex section">
            <div class="info-title">
              <h3>修改密码</h3>
            </div>
            <div class="edit-btn">
              <el-button @click="dialogPwdVisible = true" plain>修改密码</el-button>
            </div>
          </div>
          <!-- save -->
          <div class="save-btn">
            <el-button type="primary" @click="saveUserInfo()">保存</el-button>
          </div>
          <!-- email-dialog -->
          <email-dialog v-bind:emailIsDoalog='dialogEmailVisible' :changeEmail='changeEmaildialog'></email-dialog>
          <!-- phone-dialog -->
          <phone-dialog v-bind:phoneIsDoalog='dialogPhoneVisible' :changePhone='changePhonedialog'></phone-dialog>
          <!-- pwd-dialog -->
          <pwd-dialog v-bind:pwdIsDoalog='dialogPwdVisible' :changePwd='changePwddialog'></pwd-dialog>
        </div>
			</div>
		</div>
	</div>
</template>

<script>
import VueImgInputer from 'vue-img-inputer'
import ytHeader from '../../components/header/yt-header'
import sAside from '../../components/common/s-aside'
import emailDialog from '../../components/common/email-dialog'
import phoneDialog from '../../components/common/phone-dialog'
import pwdDialog from '../../components/common/pwd-dialog'
import md5 from 'blueimp-md5'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    'yt-header': ytHeader,
    's-aside': sAside,
    'email-dialog': emailDialog,
    'phone-dialog': phoneDialog,
    'pwd-dialog': pwdDialog,
    VueImgInputer
  },
  data() {
    return {
      userInfo: [],
      flag: true,
      emailShow: true,
      phoneShow: true,
      status: {
        emailText: '修改邮箱',
        phoneText: '修改手机号'
      },
      dialogEmailVisible: false,
      dialogPwdVisible:false,
      dialogPhoneVisible:false,
      formLabelWidth: '100px',
      picValue: ''
    }
  },
  mounted(){
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo(){
			let that=this;
			// md5验证
			let userid = {
				'id': window.localStorage.getItem('id')
			},
			keys = Object.keys(userid),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+userid[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
			let url = `/api/v1/Studentuser_info?${p}`;
			let config = {
				headers:{
					versions: '1',
					tokens: tokens
				}
      }
			axios.get(url,userid,config)
			.then(function (response) {
				if (response.data.errCode == 0) {
          that.userInfo = response.data.data;
          that.userInfo.sex = parseInt(that.userInfo.sex);
          // 日期类型转换有问题
          if (that.userInfo.birthday == '0') {
            that.userInfo.birthday == '';
          }else {
            let timestamp = parseInt(that.userInfo.birthday+'000');
            let newDate = new Date(timestamp);
            that.userInfo.birthday = newDate;
          }
          that.classStatus();
				}else{
          that.$alert(response.data.errMsg, '系统错误', {
						confirmButtonText: '确定',
					})
				}
			})
    },
    // 保存用户信息
    saveUserInfo(){
			let that=this;
			// md5验证
			let data = {
        'id': window.localStorage.getItem('id'),
        'cname': this.userInfo.cname,
        'ename': this.userInfo.ename,
        'sex': this.userInfo.sex,
        'birthday': moment(this.userInfo.birthday).unix(),
        'headimg': this.picValue
			},
			keys = Object.keys(data),
			i, len = keys.length;
			keys.sort();
			let p = '';
			for (i = 0; i < len; i++) {
				let k = keys[i];
				p += k+'='+data[k]+'&';
			}
			p = p.substring(0,p.length-1);
			let tokens = md5(`ilovewan${p}banghanchen`);
			// ajax
      console.log(data);
			let url = '/api/v1/users/update';
      let formData = new FormData();
      formData.append('id', window.localStorage.getItem('id'));
      formData.append('cname', this.userInfo.cname);
      formData.append('ename', this.userInfo.ename);
      formData.append('sex', this.userInfo.sex);
      formData.append('birthday', moment(this.userInfo.birthday).unix());
      formData.append('headimg', this.picValue);
			let config = {
				headers:{
					versions: '1',
					tokens: tokens,
          as: '3'
				} 
      }
			axios.post(url,formData,config)
			.then(function (response) {
        console.log(response);
				if (response.data.errCode == 0) {
          console.log('保存成功！');
          window.location.href = '/usercenter';
				}else{
          that.$alert(response.data.errMsg, '系统错误', {
						confirmButtonText: '确定',
					})
				}
			})
    },
    // 邮箱手机号状态
    classStatus(){
      if (this.userInfo.email == '') {
        this.emailShow = false;
        this.status.emailText = '添加邮箱'
      }else if(this.userInfo.phone == ''){
        this.phoneShow = false;
        this.status.phoneText = '添加手机'
      }
    },
    //更改邮箱dialog状态
    changeEmaildialog(val,text){
      this.dialogEmailVisible=val;
      this.this.userInfo.email = text;
      this.classStatus();
    },
    //更改密码dialog状态
    changePwddialog(val){
      this.dialogPwdVisible=val;
    },
    //更改手机号dialog状态
    changePhonedialog(val){
      this.dialogPhoneVisible=val;
      this.classStatus();
    }
  }
}
</script>

<style lang="less" scoped>
.ucenter{ width: 100%; height: 100%; background-color: #F2F3F4; overflow: hidden;
	.main-container{ height: 100%;
    .main-content{ padding: 20px; padding-bottom: 70px; overflow-y: scroll;
      .ucenter-menu{ padding-left: 30px; width: 100%; height: 60px; background-color: #fff; border: 1px solid #dddddd;
        .ucenter-title{ display: inline-block; padding: 0 20px; height: 58px; border-bottom: 2px solid #FF7048; box-sizing: border-box;
          h2{ line-height: 58px; font-size: 16px; font-weight: 400; color: #2d2f33;}
        }
      }    
      .ucenter-info{ padding: 20px; width: 100%; margin-top: 10px; background-color: #fff; border: 1px solid #dddddd;
        .section{ margin-bottom: 25px;
          .info-title{ margin-right: 15px;
            h3{ font-size: 16px; font-weight: 500; line-height: 40px; color: #333;}
          }
          .edit-avatar{ margin-left: 20px;}
          .info-avatar{ margin-left: 40px; width: 140px; height: 140px;
            img{ width: 100%;}
          }
          .info-radio{ line-height: 40px;}
          .info-input{ 
            span{ display: block; margin-top: 5px; font-size: 12px; color: #666;}
          }
          .el-input{ margin-right: 20px; width: 300px;}
        }
      }
    }
  }
}
.img-inputer--small{ width: 100px; height: 100px;}
.img-inputer:hover{ transform: scale(1);}

</style>