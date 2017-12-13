<template>
    <div>
      <div @click="active" class="star" :class="{white: isWhite, orange: isOrange}"></div>
    </div>
</template>

<script>
  export default {
    props: ['rateList'],
    data(){
      return{
        isWhite: true,
        isOrange: false,
      }
    },
    methods: {
      active(){
        this.isWhite = !this.isWhite
        this.isOrange = !this.isOrange
      }
    }
  }
</script>

<style lang="less" scoped>
  .star{width: 20px;height:20px;display: inline-block;margin-right: 10px;}
  .white{background: url(../../../../../../static/img/write-star.jpg);}
  .orange{background: url(../../../../../../static/img/orange-star.jpg);}
</style>
