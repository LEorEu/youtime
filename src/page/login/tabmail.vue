<template>
  <div class="tab-mail tab-list">
    <div class="form-wrapper">
        <div class="account">
            <p class="input-title">邮箱账号</p>
            <div class="input-row">
                <input type="tel" name="account" class="form-control" v-model="loginMail" placeholder="输入邮箱账号">
            </div>
        </div>
        <div class="password">
            <p class="input-title">密码</p>
            <div class="input-row">
                <input type="password" name="password" class="form-control" v-model="loginMailpwd" placeholder="输入密码">
            </div>
        </div>
    </div>
    <div class="btn-area">
        <button class="btn" id="submitLogin" @click="login">登录</button>
        <router-link class="btn-link" to="/register/regmail">注册领取免费体验课</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default{
    data: function(){
        return{
            loginMail: '',
            loginMailpwd: ''
        }
    },
    methods:{
        login:function(){
            let that = this;
            if (this.loginMail == '' || this.loginMailpwd == '') {
                let alert = {
                    message: '请填写完整的资料',
                    type: 'warning'
                }
                that.alertOpen(alert.message,alert.type);
            }else{
                // md5验证
                let login = {
                    'email': this.loginMail,
                    'password': this.loginMailpwd,
                    'post_type': 'login',
                },
                keys = Object.keys(login),
                i, len = keys.length;
                keys.sort();
                let p = '';
                for (i = 0; i < len; i++) {
                    let k = keys[i];
                    p += k+'='+login[k]+'&';
                }
                p = p.substring(0,p.length-1);
                let tokens = md5('ilovewan' + p + 'banghanchen');
                console.log(p)
                // ajax
                let url = '/api/v1/users/login';
                let formData = new FormData();
                formData.append('email', this.loginMail);
                formData.append('password', this.loginMailpwd);
                formData.append('post_type', 'login');
                let config = {
                    headers:{
                        versions: '1',
                        tokens: tokens,
                        'content-type': 'multipart/form-data'
                    }
                }
                axios.post(url,formData,config)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.errCode == '0') {
                        let alert = {
                            message: '登录成功',
                            type: 'success'
                        }
                        that.alertOpen(alert.message,alert.type);
                        window.localStorage.setItem('id',response.data.data.id);
                        window.localStorage.setItem('account',response.data.data.email);
                        window.localStorage.setItem('cname',response.data.data.cname);
                        window.location.href = '/study';
                    }else if(response.data.errCode == '30005'){
                        let alert = {
                            message: '用户名或密码错误',
                            type: 'error'
                        }
                        that.alertOpen(alert.message,alert.type);
                    }else{
                        let alert = {
                            message: '登录失败',
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
    margin-top: 10px;
    .btn-link{
        display: block;
        margin-top: 15px;
        text-align: center;
        font-size: 16px;
        color: #F8763D;
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