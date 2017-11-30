<template>
    <div class="phone-showbox showbox">
        <el-dialog title="修改手机号" :visible.sync="dialogPhoneVisible">
            <el-form>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="dialogPhoneText" type="text" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePhone(false)">取 消</el-button>
                <el-button type="primary" @click="changePhone(false)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['phoneIsDoalog','changePhone'],
    data() {
        return {
            dialogPhoneVisible: this.phoneIsDoalog,
            dialogPhoneText: '',
            formLabelWidth: '100px'
        }
    },
    watch:{
        phoneIsDoalog(val){
            this.dialogPhoneVisible=val;
        },
    }
}
</script>


<style lang="less" scoped>
.showbox{
  .el-input{ width: 80%;}
}
</style>