<template>
  <div class="tab-tel tab-list">
    <div class="form-wrapper">
        <div class="account">
            <p class="input-title">手机号</p>
            <div class="input-row">
                <!-- <select class="countrycode" name="countrycode">
                    <option value="1">+86</option>
                </select> -->
                <input type="text" name="countrycode" class="countrycode form-control" v-model="regCountry" placeholder="国家码">
                <input type="tel" name="account" class="form-control" v-model="regTel" maxlength="11" placeholder="输入手机号">
            </div>
        </div>
        <div class="smscode">
            <p class="input-title">验证码</p>
            <div class="input-row">
                <input type="tel" name="smscode" class="form-control" v-model="regSms" maxlength="6" placeholder="输入验证码">
                <button class="btn" @click='daojishi' :disabled='isDisabled'>{{time}}</button>
                <div class="page-polite">
                </div>
            </div>
        </div>
        <div class="password">
            <p class="input-title">密码</p>
            <div class="input-row">
                <input type="password" name="password" class="form-control" v-model="regPwd" placeholder="输入密码">
            </div>
        </div>
    </div>
    <div class="btn-area">
        <button class="btn" id="submitRegister" @click="reg">注册</button>
        <router-link class="btn-link" to="/login">已有账号？登录</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'
import jstz from 'jstz'

export default {
  data:function () {
    return {
      regCountry: '',
      regTel: '',
      regSms: '',
      regPwd: '',
      time: '发送验证码',
      isdaojishi: false,
      isDisabled: false,
      tz: ''
    }
  },
  mounted(){
    this.timeZone();
  },
  methods: {
    timeZone(){
        const timezone = jstz.determine();
        timezone.name(); 
        this.tz = timezone.name();
        console.log(this.tz);
    },
    // 验证码获取
    daojishi :function() {
        let that = this;
        // 验证是否为空
        if (this.regCountry == '' || this.regTel == '') {
            let alert = {
                message: '请输入手机号和国家码',
                type: 'warning'
            }
            that.alertOpen(alert.message,alert.type);
        }else{
            // 计时器
            this.time = 60;
            this.isDisabled=true;
            this.isdaojishi=true;
            let interval = window.setInterval(function() {
                if ((this.time--) <= 0) {
                    this.time = '重新发送';
                    this.isdaojishi = false;
                    this.isDisabled = false;
                    window.clearInterval(interval);
                }
            }.bind(this), 1000);
            // md5验证
            let sendsms = {
                'areacode': this.regCountry,
                'telephone': this.regTel,
                'type': '1'
            },
            keys = Object.keys(sendsms),
            i, len = keys.length;
            keys.sort();
            let p = '';
            for (i = 0; i < len; i++) {
                let k = keys[i];
                p += k+'='+sendsms[k]+'&';
            }
            p = p.substring(0,p.length-1);
            let tokens = md5('ilovewan' + p + 'banghanchen');
            // ajax
            axios.get('/api/v1/common/sendsms?'+p+'',{
                headers: {
                    versions: '1',
                    tokens: tokens
                },
                data:{
                    areacode: this.regCountry,
                    telephone: this.regTel,
                    type: '1'
                }
            })
            .then(function (response) {
                console.log(response.data.errMsg);
            })
            .catch(function (error) {
                let alert = {
                    message: '发送验证码失败',
                    type: 'error'
                }
                that.alertOpen(alert.message,alert.type);
            })
        }
    },
    // 注册接入
    reg :function(){
        let that = this;
        if (this.regCountry == '' || this.regTel == '' || this.regSms == '' || this.regPwd == '') {
            let alert = {
                message: '请填写完整的资料',
                type: 'warning'
            }
            that.alertOpen(alert.message,alert.type);
        }else{
            // md5验证
            let register = {
                'telephone': this.regTel,
                'password': this.regPwd,
                'smscode': this.regSms,
                'areacode': this.regCountry
            },
            keys = Object.keys(register),
            i, len = keys.length;
            keys.sort();
            let p = '';
            for (i = 0; i < len; i++) {
                let k = keys[i];
                p += k+'='+register[k]+'&';
            }
            p = p.substring(0,p.length-1);
            let tokens = md5('ilovewan' + p + 'banghanchen');
            console.log(p,tokens);
            // ajax
            let url = '/api/v1/phone/register'
            let formData = new FormData();
            formData.append('telephone', this.regTel);
            formData.append('password', this.regPwd);
            formData.append('smscode', this.regSms);
            formData.append('areacode', this.regCountry);
            let config = {
                headers:{
                    versions: '1',
                    as: '3',
                    tokens: tokens,
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url,formData,config)
            .then(function (response) {
                if (response.data.errCode == '0') {
                    let alert = {
                        message: '注册成功',
                        type: 'success'
                    }
                    that.alertOpen(alert.message,alert.type);
                    window.localStorage.setItem('id',response.data.data.id);
                    window.localStorage.setItem('account',response.data.data.phone);
                    window.location.href = '/study';
                }else if(response.data.errCode == '30002'){
                    let alert = {
                        message: '手机号或密码格式错误，请输入正确的手机号或6-16位密码',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                }else if(response.data.errCode == '30003'){
                    let alert = {
                        message: '验证码错误',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                }else if(response.data.errCode == '30007'){
                    let alert = {
                        message: '该手机号已注册',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                }else{
                    let alert = {
                        message: '注册失败',
                        type: 'error'
                    }
                    that.alertOpen(alert.message,alert.type);
                }
            })
            .catch(function (error) {
                let alert = {
                    message: '系统错误',
                    type: 'error'
                }
                that.alertOpen(alert.message,alert.type);
            })
        }
    },
    alertOpen(msg,tp){
        this.$message({
            message: msg,
            type: tp
        });
    }
  }
}
</script>

<style lang="less" scoped>
.form-wrapper{
    .account{
        margin-top: 20px;
        .input-row{
            display: flex;
            align-items: center;
            .countrycode{
				padding-left: 0px;
                width: 65px;
                height: 40px;
                text-align: center;
                border: 1px solid #E1E1E1;
                border-radius: 6px;
                background: #FFFFFF;
            }
        }
    }
    .smscode{
        margin-top: 20px;
        .input-row{
            display: flex;
            align-items: center;
            .btn{
                margin-left: 10px;
                width: 120px;
                height: 40px;
                background: #FFFFFF;
                border: 1px solid #E1E1E1;
                border-radius: 6px;
                font-size: 14px;
                color: #F9763D;
            }
        }
    }
    .password{
        margin-top: 20px;
    }
    .input-title{
        font-size: 14px;
        color: #555;
    }
    .input-row{
        width: 100%;
        input{
			padding-left: 15px;
            width: 100%;
            height: 40px;
            background: #FFFFFF;
            border: 1px solid #E1E1E1;
            border-radius: 6px;
        }
    }
}
.btn-area{
    margin-top: 25px;
    .btn-link{
        margin-top: 20px;
        display: block;
        text-align: right;
        font-size: 14px;
        color: #333;
    }
    .btn{
        margin-top: 20px;
        width: 300px;
        height: 50px;
        background-image: linear-gradient(-180deg, #FF7E3F 0%, #E45C36 100%);
        border-radius: 6px;
        font-size: 16px;
        border: 0;
        color: #FFFFFF;
    }
}
</style>