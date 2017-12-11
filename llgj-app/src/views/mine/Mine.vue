<template>
    <div id="mine-view" class="container-view">
        <blur :blur-amount=10 :url="require('assets/images/common/1.jpg')">
            <!-- <p class="center"><img :src="url"></p>
                                            <span class="center">昵称昵称</span> -->
            <flexbox :gutter="0">
                <flexbox-item :span="4">
                    <p class="center"><img :src="require('assets/images/common/avatar.jpg')"></p>
                </flexbox-item>
                <flexbox-item :span="3">
                    <br/><br/><span class="center">昵称</span><br/>
                    <span class="center">🏅金牌会员</span>
                </flexbox-item>
            </flexbox>
        </blur>
        <div style="background-color:#f4f4f4">
            <group>
                <cell title="我的钱包" primary="content" @click.native="onClick">
                    <i slot="icon" class="iconfont icon-daifukuan"></i>
                </cell>
            </group>
            <group>
                <cell title="我的优惠" primary="content" is-link @click.native="onClick">
                    <i slot="icon" class="iconfont icon-youhuiquan"></i>
                </cell>
                <cell title="服务地址" primary="content" is-link @click.native="onClick">
                    <i slot="icon" class="iconfont icon-dingwei"></i>
                </cell>
            </group>
            <group>
                <cell title="设置" primary="content" is-link @click.native="onClick">
                    <i slot="icon" class="iconfont icon-shezhi"></i>
                </cell>
            </group>
        </div>
    </div>
</template>

<script>
    import {
        Flexbox,
        FlexboxItem,
        Blur,
        Group,
        Cell
    } from 'vux'
    export default {
        components: {
            Blur,
            Flexbox,
            FlexboxItem,
            Group,
            Cell
        },
        data() {
            return {
                images: [
                    'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
                    'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
                    'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
                ],
                url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
            }
        }
    }
</script>

<style scoped>
    .center {
        text-align: center;
        padding-top: 20px;
        color: #fff;
        font-size: 18px;
    }
    .center img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 4px solid #ececec;
    }
</style>