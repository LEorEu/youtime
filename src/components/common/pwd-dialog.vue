<template>
<div class="pwd-showbox showbox">
    <el-dialog title="修改密码" :visible.sync="dialogPwdVisible">
        <el-form>
            <el-form-item label="旧密码" :label-width="formLabelWidth">
                <el-input v-model="pwd.src_password" type="password" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="pwd.new_password" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="pwd.confirm_password" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changePwd(false)">取 消</el-button>
            <el-button type="primary" @click="changePwd(false)">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    props: ['pwdIsDoalog','changePwd'],
    data() {
        return {
            pwd: [],
            dialogPwdVisible: this.pwdIsDoalog,
            formLabelWidth: '100px'
        }
    },
    watch:{
        pwdIsDoalog(val){
            this.dialogPwdVisible=val;
        },
    }
}
</script>


<style lang="less" scoped>
.showbox{
  .el-input{ width: 80%;}
}
</style>
