<template>
  <footer class="yt-footer" :style="{display:none?'none':''}">
    <div class="container">
      <div class="list flexbox">
        <!-- <div class="item">
          <dl>
            <dt>APP下载</dt>
            <dd><img src=""></dd>
          </dl>
        </div> -->
        <div class="item">
          <dl>
            <dt>联系我们</dt>
            <!-- <dd><b>电话</b><span>000-000000</span></dd> -->
            <dd><b>邮箱：</b><span>info@wbhchina.com</span></dd> 
            <dd><b>地址：</b><span>北京市朝阳区东亿国际传媒产业园3号楼</span></dd>         
          </dl>
        </div>
        <!-- <div class="item">
          <dl>
            <dt>关注我们</dt>
            <dd><img src=""></dd>
          </dl>
        </div> -->
      </div>
      <div class="bottom">
        <div class="img-text"><img src=""></div>
        <div class="text">万邦汉宸(北京)教育科技有限公司</div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default{
    data(){
      return{
        none:false
      }
    },
    created (){
      if(this.$route.path=='/study'){
        this.none=true
      }else if(this.$route.path=='/study/'){
        this.none=true
      }
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .yt-footer{
    box-sizing:border-box;position: relative;background: #303139;padding:30px 0 110px 0; color:#eee;
    .list{
      width: 1200px; margin: 0 auto;
      .item{ width: 400px; margin: 0 auto;
        dt{font-size: 20px; margin-bottom: 30px;position:relative;
          &:after{
            content: "";position:absolute;left:0;bottom:-12px;width:30px;height:4px;background:#c51d2b;
          }
        }
        dd{line-height: 24px;
          b{margin-right: 6px;font-weight:500;}
          span{font-weight: 400; color:#ccc}
          a{color:#ccc;}
        }
      }
    }
    .flexbox{
      display: flex; justify-content: space-between;
    }
    .bottom{
      position:absolute;bottom:15px; text-align:center; left:0;right:0;
      .img-text{
        margin-bottom:5px;
      }
      .text{color:#ccc; font-size:12px;}
    }
  }
  @media (max-width:600px){
    .yt-footer{
      .list{
        width: 100%;
        box-sizing: border-box;
        flex-wrap: wrap;
        justify-content: center; 
      }
    }
  }
</style>
