<template>
    <div class="client">
        <yt-header></yt-header>
        <section class="banner">
            <div class="container clearfix">
                <div class="banner-text fl-l flex">
                    <h1 class="banner-titile">优唐中文客户端<br/><span>iPad/iPhone/Android</span></h1>
                </div>
                <div class="banner-clientimg fl-r flex">
                    <img src="../../../static/img/client-bannerimg.png" alt="">
                </div>
            </div>
        </section>
        <section class="downlaod">
            <div class="container">
                <div class="client-list">
                    <ul class="flex">
                        <li class="client-item" v-for="(client,cindex) in clients" :key="client.cindex" :class="{'focus':flag==cindex}" @click="clientShow(cindex)">
                            <i class="iconfont" :class="client.icon"></i>
                            <p>{{client.title}}</p>
                        </li>
                    </ul>
                </div>
                <div class="client-info">
                    <ul>
                        <li class="down-item clearfix" v-for="(down,index) in downs" :key="down.index"  v-if="index == tabIndex" v-show="true">
                            <div class="down-img fl-l">
                                <img :src="down.src" alt="">
                            </div>
                            <div class="down-info fl-l">
                                <h3>{{down.title}}</h3>
                                <p v-html="down.text"></p>
                                <div class="QRcode">
                                    <img :src="down.QRcode" alt="">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <yt-footer></yt-footer>
    </div>
</template>

<script>
import ytHeader from '../../components/header/yt-header'
import YtFooter from '../../components/footer/yt-footer'

export default {
    components: {
        'yt-header': ytHeader,
        'yt-footer': YtFooter
    },
    data() {
        return {
            clients: [
                {
                    icon: 'icon-ipad',
                    title: 'iPad版下载'
                },
                {
                    icon: 'icon-pingguo',
                    title: 'iPhone版下载'
                },
                {
                    icon: 'icon-anzhuo',
                    title: 'Android版下载'
                }
            ],
            downs: [
                {
                    src: '../../static/img/client-pad.png',
                    title: 'iPad客户端下载',
                    text: '软件系统建议：iOS 9.0 或更更⾼高版本<br/>下载⽅法：前往APP Store搜索“优唐中⽂HD”下载',
                    QRcode: ''
                },
                {
                    src: '../../static/img/client-iphone.png',
                    title: 'iPhone客户端下载',
                    text: '软件系统建议：iOS 9.0 或更高版本<br/>下载⽅法一：前往APP Store搜索“优唐中文”下载<br/>下载方法二：扫一扫二维码下载（带二维码）',
                    QRcode: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/qrcode/qr-iphone.png'
                },
                {
                    src: '../../static/img/client-android.png',
                    title: 'Android客户端下载',
                    text: `软件系统建议：建议Android4.4以上版本<br/>下载方法一：<a class="client-down" href="http://wanbangoss.oss-cn-beijing.aliyuncs.com/apk/youtangzhongwen.apk">下载到本地</a><br/>下载方法二：前往google play搜索“优唐中文”下载<br/>下载方法三：扫一扫二维码下载（带二维码）`,
                    QRcode: 'http://wanbangoss.oss-cn-beijing.aliyuncs.com/youtang/static/img/qrcode/qr-android.png'
                }
            ],
            tabIndex: '',
            flag:0
        }
    },
    methods: {
        clientShow(num){
            this.tabIndex = num;
            this.light(num);
        },
        light(index){
            this.flag = index;
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../style/iconfont/iconfont.css';

.banner{ position: relative; width: 100%; height: 600px; background-image: url('../../../static/img/client-banner.png'); background-position: center; background-repeat: no-repeat;
    .container{ height: 100%;}
    .banner-text{ width: 400px; height: 100%; align-items:center;
        .banner-titile{ text-align: center; font-size: 48px; font-weight: 500; color: #fff;
            span{ font-size: 34px;}
        }
    }
    .banner-clientimg{ width: 650px; height: 100%; align-items:center;}
}
.downlaod{ padding: 40px 0;
    .client-list{ margin: 0 auto; width: 820px;
        .client-item{ margin-right: 80px; min-width: 220px; height: 60px; border: 1px solid #d4d4d4; border-radius: 5px; cursor: pointer;
            i{ display: block; margin: 5px auto; width: 24px;}
            p{ text-align: center; font-size: 14px; color: #666;}
        }
        .focus{ border: 0; background-color: #ff6325;
            i{ color: #fff;}
            p{ color: #fff;}
        }
    }
    .client-info{ margin: 0px auto; margin-top: 80px; width: 820px;
        .down-item{ padding: 0 40px; height: 400px;
            .down-img{ width: 350px;
                img{ width: 100%;}
            }
            .down-info{ margin-left: 50px; width: 740px - 400px;
                h3{ font-size: 20px; color: #333;}
                p{ margin-top: 15px; line-height: 30px; font-size: 14px; color: #666;} 
            }
            .QRcode{ margin-top: 40px; width: 180px; height: 180px;
                img{ width: 180px; height: 180px;}
            }
        }
    }
}
</style>
