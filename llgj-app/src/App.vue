<template>
    <div id="app" style="height:100%;">
        <!-- header -->
        <x-header slot="header" class="llgj-header" :left-options="leftOptions" :right-options="rightOptions" :title="title" :transition="headerTransition" @on-click-more="onClickMore">
            <span v-if="this.$route.path === '/'" slot="overwrite-left">
                    <i slot="overwrite-left" class="iconfont icon-dizhiguanli" :class="icon_left"></i>
                    <span slot="overwrite-left" class="stringLeft">深圳</span>
            </span>
        </x-header>
        <!-- header -->
        <!--主体内容视图-->
        <transition :name="animateName">
            <!--<keep-alive>-->
            <router-view></router-view>
            <!--</keep-alive>-->
        </transition>
        <!--/主体内容视图-->
        <!--导航条-->
        <tabbar v-if="isNotFirst">
            <tabbar-item :selected="navIndex == 1" link="/">
                <i slot="icon" class="iconfont icon-shouye"></i>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="navIndex == 2" link="/order" badge="2">
                <i slot="icon" class="iconfont icon-dingdan"></i>
                <span slot="label">订单</span>
            </tabbar-item>
            <tabbar-item :selected="navIndex == 3" link="/mine" show-dot>
                <i slot="icon" class="iconfont icon-wode"></i>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
        <!--/导航条-->
    </div>
</template>

<script>
    import {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem
    } from 'vux'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'app',
        props: {
            icon_left: String,
            icon_right: String,
            string_left: String,
            string_right: String
        },
        components: {
            ViewBox,
            XHeader,
            Tabbar,
            TabbarItem
        },
        computed: {
            ...mapState({
                // route: state => state.route,
                // path: state => state.route.path
            }),
            headerTransition() {
                if (!this.direction) return ''
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },
            title() {
                if (this.$route.path === '/') return '了了管家'
                if (this.$route.path === '/order') return '订单'
                if (this.$route.path === '/mine') return '我的'
            },
            leftOptions() {
                return {
                    showBack: this.$route.path !== '/'
                }
            },
            rightOptions() {
                return {
                    showMore: true
                }
            },
            animateName() {
                return this.$store.state.animate_name
            },
            navIndex() {
                return this.$store.state.nav_index
            },
            isNotFirst() {
                return this.$store.state.is_not_first
            }
        },
        methods: {
            ...mapActions({}),
            onClickMore() {
                this.showMenu = true
            },
            onLeftClick() {
                this.$emit('leftClick')
            },
            onRightClick() {
                this.$emit('rightClick')
            }
        }
    }
</script>

<style lang="less">
    @import './assets/less/reset.less';
    @import './assets/less/main.less';
    @import './assets/less/theme.less';
    body {
        background: @colorBackground;
        color: @colorBlack;
    }
    html,
    body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    .llgj-header {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: @colorOne !important;
        color: @colorWhite !important;
        .llgj-header-title {
            font-size: @fontSize14
        }
        .iconfont {
            color: @colorFontWhite !important;
        }
        .stringLeft {
            color: @colorFontWhite !important;
        }
        .stringRight {
            color: @colorFontWhite !important;
        }
    }
    .vux-header .vux-header-left a {
        color: @colorWhite !important;
    }
    .vux-header .vux-header-left .left-arrow {
        color: @colorWhite !important;
    }
    .weui-tabbar {
        background-color: @colorWhite !important;
    }
    .weui-tabbar__item {
        color: @colorFontNav !important;
    }
    .weui-bar__item_on {
        color: @colorSec !important;
    }
</style>
