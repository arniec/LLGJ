<template>
    <div id="app">
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
        Tabbar,
        TabbarItem
    } from 'vux'
    export default {
        name: 'app',
        computed: {
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
        components: {
            Tabbar,
            TabbarItem
        }
    }
</script>

<style lang="less">
    @import './assets/less/reset.less';
    @import './assets/less/main.less';
    @import './assets/less/theme.less';
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
