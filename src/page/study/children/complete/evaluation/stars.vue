<template>
  <div>
    <div class="block">
      <span @click="getValue" class="demonstration">老师
        <el-rate  class="star" v-model="value1"></el-rate>
      </span>
    </div>
    <div class="block">
      <span @click="getValue" class="demonstration">课件
        <el-rate class="star" v-model="value2"></el-rate>
      </span>
    </div>
    <div class="block">
      <span @click="getValue" class="demonstration">网络
        <el-rate class="star" v-model="value3"></el-rate>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        value1: null,
        value2: null,
        value3: null
      }
    },
    methods: {
      getValue(){
        this.$emit('getValue', [this.value1, this.value2, this.value3])
      }
    }
  }
</script>

<style type="text/css" scoped>
  .block{
    margin: 10px auto auto 0 ;
  }
  .star{
    margin-left: 10px;
    display: inline;
    vertical-align: top;
  }
</style>
