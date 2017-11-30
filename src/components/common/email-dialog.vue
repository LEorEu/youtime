<template>
    <div class="email-showbox showbox">
        <el-dialog title="修改邮箱" :visible.sync="dialogEmailVisible">
            <el-form>
                <el-form-item label="邮箱地址" :label-width="formLabelWidth">
                    <el-input v-model="dialogEmailText" type="email" placeholder="请输入邮箱"></el-input>
                    <span>{{tooltipEmailContent}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancal()">取 消</el-button>
                <el-button type="primary" @click="saveEmail()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import md5 from 'blueimp-md5'
import axios from 'axios'

export default {
    props: ['emailIsDoalog','changeEmail'],
    data(){
        return{
            dialogEmailVisible: this.emailIsDoalog,
            dialogEmailText: '',
            tooltipEmailContent: '',
            formLabelWidth: '100px'
        }
    },
    watch:{
        emailIsDoalog(val){
            this.dialogEmailVisible=val;
        },
    },
    methods:{
        // 更改邮箱
        saveEmail(){
            let that=this;
                // md5验证
            let info = {
                'id': window.localStorage.getItem('id'),
                'smscode': '1',
                'email': this.dialogEmailText
            },
            keys = Object.keys(info),
            i, len = keys.length;
            keys.sort();
            let p = '';
            for (i = 0; i < len; i++) {
                let k = keys[i];
                p += k+'='+info[k]+'&';
            }
            p = p.substring(0,p.length-1);
            let tokens = md5(`ilovewan${p}banghanchen`);
            // ajax
            let url = '/api/v1/users/bind_email';
            let config = {
                headers:{
                    versions: '1',
                    tokens: tokens
                }
            }
            let formData = new FormData();
            formData.append('id', window.localStorage.getItem('id'));
            formData.append('smscode', '1');
            formData.append('email', this.dialogEmailText);
            axios.post(url,formData,config)
            .then(function (response) {
                console.log(response);
                if (response.data.errCode == '0') {
                    that.changeEmail(false,that.dialogEmailText);
                }else {
                    that.tooltipEmailContent = response.data.errMsg;
                }
            })
        },
        cancal(){
            this.dialogEmailText = '';
            this.tooltipEmailContent = '';
            this.changeEmail(false);
        },
    }
}
</script>

<style lang="less" scoped>
.showbox{
  .el-input{ width: 80%;}
}
</style>
