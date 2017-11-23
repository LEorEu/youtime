<template>
  <div class="login">
    <yt-header></yt-header>
    <div class="login-bg">
      <div class="container">
        <div class="login-cont">
          <div class="login-box">
            <div class="login-wrapper">
              <div class="tab-nav">
                <ul class="flex clearfix">
				          <li>
					          <router-link to="/login/tabmail" active-class='active'>邮箱</router-link>
				          </li>
                  <li>
                    <router-link to="/login/tabtel" active-class='active'>手机号</router-link>
                  </li>
                </ul>
              </div>
              <div class="tab-cont">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import tabtel from './tabtel'
import tabmail from './tabmail'

export default {
  components: {
    'yt-header': ytHeader,
    'tabtel': tabtel,
    'tabmail': tabmail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login{ 
      width: 100%;
      height: 100%;
  }
  .login-bg{
    width: 100%;
    height: 100%;
    background-image: url('../../images/133205674464.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .container{
      position: relative;
      height: 100%;
      .login-cont{
        float: right;
        display: table;
        width: 400px;
        height: 100%;
      }
      .login-box{ 
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        .login-wrapper{
          padding: 50px;
          width: 100%;
          border-radius: 10px;
          background-color: rgba(240,240,240,.6);
          .tab-nav{
            .flex li{
              float: left;
              width: 50%;
              text-align: center;
              font-size: 20px;
              color: #333;
              font-family: "Hiragino Sans GB","PingFangSC-Regular",sans-serif;
              a{
                display: block;
                width: 100%;
                padding-bottom: 10px;
                border-bottom: 3px solid #ffffff;
              }
              a:hover{
                color: #333;
              }
            }
            .flex .active{
              border-bottom: 3px solid #FF7048;
            }
          }
        }
      }
    }
  }
</style>
