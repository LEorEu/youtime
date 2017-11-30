<template>
    <div class="phone-showbox showbox">
        <el-dialog title="修改手机号" :visible.sync="dialogPhoneVisible">
            <el-form>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="dialogPhoneText" type="text" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPhoneVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogPhoneVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pwd: [],
            dialogPhoneVisible: false,
            dialogPhoneText: '',
            formLabelWidth: '100px'
        }
    }
}
</script>


<style lang="less" scoped>
.showbox{
  .el-input{ width: 80%;}
}
</style>