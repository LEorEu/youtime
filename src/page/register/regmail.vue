<template>
  <div class="tab-mail tab-list">
    <div class="form-wrapper">
        <div class="account">
            <p class="input-title">邮箱账号</p>
            <div class="input-row">
                <input type="mail" name="account" class="form-control" v-model="regMail" placeholder="输入邮箱账号">
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
        <button class="btn" id="submitLogin" @click="reg">注册</button>
        <router-link class="btn-link" to="/login">已有账号？登录</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
  data:function () {
    return {
      regMail: '',
      regPwd: ''
    }
  },
  methods: {
    // 注册接入
    reg :function(){
        if (this.regMail == '' || this.regPwd == '') {
            console.log('请填写完整的资料')
        }else{
            // md5验证
            let register = {
                'email': this.regMail,
                'password': this.regPwd,
                'post_type': 'ipadregister',
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
            // ajax
            let url = '/api/v1/email/ipad_email_register';
            let formData = new FormData();
            formData.append('email', this.regMail);
            formData.append('password', this.regPwd);
            formData.append('post_type', 'register');
            let config = {
                headers:{
                    versions: '1',
                    tokens: tokens,
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post(url,formData,config)
            .then(function (response) {
                if (response.data.errCode == '0') {
                    console.log('注册成功');
                    window.localStorage.setItem('id',response.data.data.id);
                    window.localStorage.setItem('account',response.data.data.mail);
                    window.location.href = '/study';
                }else if(response.data.errCode == '30002'){
                    console.log('邮箱或密码格式错误，请输入正确的邮箱或6-16位密码');
                }else if(response.data.errCode == '30007'){
                    console.log('该邮箱已注册');
                }else{
                    console.log('注册失败');
                }
            })
            .catch(function (error) {
                console.log('系统错误');
            })
        }
    }
  }
}
</script>

<style lang="less" scoped>
.form-wrapper{
    .account{
        margin-top: 20px;
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