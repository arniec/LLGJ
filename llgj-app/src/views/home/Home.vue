<template>
    <div id="home-view" class="container-view">
        <!-- 中间内容 -->
        <div class="view-content">
            <!-- 轮播广告图片 -->
            <swiper auto loop :aspect-ratio="300/800" dots-position="center">
                <swiper-item v-for="(banner, key) in banners" :key="key">
                    <img :src="banner">
                </swiper-item>
            </swiper>
            <!-- 轮播广告图片 -->
            <!-- 中间服务分类 -->
            <grid :cols="3">
                <grid-item v-for="(cat, key) in cats" :key="key">
                    <img slot="icon" :src="cat.img">
                    <span slot="label">{{cat.label}}</span>
                </grid-item>
            </grid>
            <!-- 中间业务分类 -->
            <group>
                <cell title=""></cell>
            </group>
            <flexbox :gutter="0">
                <flexbox-item :span="6">
                    <div class="text-center">
                        <img src="../../assets/images/common/richangbaojie.png" alt="">
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <flexbox orient="vertical" :gutter="0">
                        <flexbox-item>
                            <div class="text-center"><img src="../../assets/images/common/bingxiangqingxi.png" alt=""></div>
                        </flexbox-item>
                        <flexbox-item>
                            <div class="text-center"><img src="../../assets/images/common/xinjunkaihuang.png" alt=""></div>
                        </flexbox-item>
                    </flexbox>
                </flexbox-item>
            </flexbox>
            <!-- 中间业务分类 -->
            <group>
                <cell style="color:#42BE9B;font-size:12px;text-align:left;" title="优惠活动" value="更多" is-link>
                    <i slot="icon" class="iconfont icon-youhuiquan"></i>
                </cell>
            </group>
            <swiper loop :show-dots="false" height="100px">
                <swiper-item v-for="(act, key) in acts" :key="key">
                    <img :src="act.img">
                </swiper-item>
            </swiper>
            <group>
                <cell style="color:#42BE9B;font-size:12px;text-align:left;" title="生活妙招" value="更多" is-link>
                    <i slot="icon" class="iconfont icon-fenlei"></i>
                </cell>
            </group>
            <panel :list="list"></panel>
        </div>
        <!-- 中间内容 -->
    </div>
</template>

<script>
    import {
        Search,
        Group,
        Cell,
        XButton,
        Swiper,
        SwiperItem,
        CellBox,
        Grid,
        GridItem,
        Flexbox,
        FlexboxItem,
        Panel
    } from 'vux'
    import GestureMobile from '../../assets/lib/GestureMobile'
    import types from '../../store/mutation-types'
    import CountUp from '../../assets/lib/countUp'
    import Util from '../../assets/lib/Util'
    export default {
        name: 'home',
        data() {
            return {
                banners: [
                    'https://static.vux.li/demo/1.jpg',
                    'https://static.vux.li/demo/2.jpg',
                    'https://static.vux.li/demo/3.jpg'
                ],
                cats: [
                    {
                        id: 1,
                        label: '深度开荒',
                        img: require('assets/images/common/kaihuang.png')
                    },
                    {
                        id: 2,
                        label: '家庭厨房',
                        img: require('assets/images/common/chufang.png')
                    },
                    {
                        id: 3,
                        label: '家电维修',
                        img: require('assets/images/common/weixiu.png')
                    },
                    {
                        id: 4,
                        label: '专业维修',
                        img: require('assets/images/common/weixiu2.png')
                    },
                    {
                        id: 5,
                        label: '555',
                        img: require('assets/images/common/loudou.png')
                    },
                    {
                        id: 6,
                        label: '666',
                        img: require('assets/images/common/loudou.png')
                    }
                ],
                acts: [
                    {
                        id: 1,
                        label: '1111',
                        img: require('assets/images/common/youhuihuodong1.png')
                    },
                    {
                        id: 2,
                        label: '22222',
                        img: require('assets/images/common/youhuihuodong2.png')
                    }
                ],
                items: [
                    {
                        id: 1,
                        name: '标准保洁',
                        src: require('assets/images/common/1.jpg'),
                        originalPrice: 300,
                        price: 100,
                        likecount: 565,
                        msgcount: 96,
                        viewcount: 153
                    },
                    {
                        id: 2,
                        name: '深度保洁',
                        src: require('assets/images/common/1.jpg'),
                        originalPrice: 300,
                        price: 100,
                        likecount: 56,
                        msgcount: 96,
                        viewcount: 153
                    },
                    {
                        id: 3,
                        name: '专项清理（厨房、卫生间、除螨）',
                        src: require('assets/images/common/1.jpg'),
                        originalPrice: 300,
                        price: 100,
                        likecount: 56,
                        msgcount: 96,
                        viewcount: 153
                    },
                    {
                        id: 4,
                        name: '保姆（住家24小时，全天10小时）',
                        src: require('assets/images/common/1.jpg'),
                        originalPrice: 300,
                        price: 100,
                        likecount: 56,
                        msgcount: 96,
                        viewcount: 153
                    },
                    {
                        id: 5,
                        name: '定期煮饭（中、晚）（含买菜）',
                        src: require('assets/images/common/1.jpg'),
                        originalPrice: 300,
                        price: 100,
                        likecount: 56,
                        msgcount: 96,
                        viewcount: 153
                    }
                ],
                list: [
                    {
                        src: require('assets/images/common/miaozhao1.png'),
                        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '标题一',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        url: '/component/cell'
                    }, {
                        src: require('assets/images/common/miaozhao2.png'),
                        title: '标题二',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        url: {
                            path: '/component/radio',
                            replace: false
                        },
                        meta: {
                            source: '来源信息',
                            date: '时间',
                            other: '其他信息'
                        }
                    },
                    {
                        src: require('assets/images/common/miaozhao1.png'),
                        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
                        title: '标题三',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
                        url: '/component/cell'
                    }
                ]
            }
        },
        components: {
            Swiper,
            SwiperItem,
            Group,
            Cell,
            CellBox,
            Search,
            XButton,
            Grid,
            GridItem,
            Flexbox,
            FlexboxItem,
            Panel
        },
        created() {
            this.gestureMobile()
            this.setNavIndex()
            this.fetchBalance()
        },
        methods: {
            onRightClick() {},
            onLeftClick() {},
            // 手势
            gestureMobile() {
                this.$nextTick(() => {
                    const _this = this
                    GestureMobile(this.$el, {
                        upCallBackFun() {
                            _this.is_open = true
                        },
                        downCallBackFun() {
                            _this.is_open = false
                        }
                    })
                })
            },
            // 获取可用余额
            fetchBalance() {
                this.total_balance = Util.TotalBalance.query()
                this.$nextTick(() => {
                    new CountUp('total_balance', 0, this.total_balance, 2, 2).start()
                })
            },
            // 设置导航条按钮状态
            setNavIndex() {
                this.$store.commit(types.SET_NAV_INDEX, '1')
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/less/theme";
</style>
