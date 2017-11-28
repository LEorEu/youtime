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
                        <li class="client-item" v-for="(client,cindex) in clients" :key="client.cindex" :class="{'on':flag==cindex}" @click="clientShow(cindex)">
                            <i :class="client.icon"></i>
                            <p>{{client.title}}</p>
                        </li>
                    </ul>
                </div>
                <div class="client-info">
                    <ul>
                        <li class="down-item" v-for="(down,index) in downs" :key="down.index"  v-if="index == tabIndex" v-show="true">
                            <div class="down-img">
                                <img :src="down.src" alt="">
                            </div>
                            <div class="down-info">
                                <h3>{{down.title}}</h3>
                                <p>{{down.text}}</p>
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
                    icon: 'icon-iphone',
                    title: 'iPhone版下载'
                },
                {
                    icon: 'icon-android',
                    title: 'Android版下载'
                }
            ],
            downs: [
                {
                    src: '',
                    title: 'iPad客户端下载',
                    text: '',
                    QRcode: ''
                },
                {
                    src: '',
                    title: 'iPhone客户端下载',
                    text: '',
                    QRcode: ''
                },
                {
                    src: '',
                    title: 'Android客户端下载',
                    text: '',
                    QRcode: ''
                }
            ],
            tabIndex: '',
            flag:0
        }
    },
    methods: {
        clientShow(num){
            this.tabIndex = num;
            console.log(num);
        },
        light(index){
            this.flag = index;
        }
    }
}
</script>

<style lang="less" scoped>
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
        .client-item{ margin-right: 80px; min-width: 220px; height: 60px; border: 1px solid #d4d4d4; border-radius: 5px;
            i{ }
            p{ text-align: center; font-size: 14px; color: #666;}
        }
    }
    .client-info{ margin-top: 80px;}
}
</style>
