<template>
    <div id="llgj-header">
        <x-header class="llgj-header">
            <span class="llgj-header-title">{{title}}</span>
            <i slot="overwrite-left" class="iconfont" :class="icon_left" @click="onLeftClick"></i>
            <span slot="overwrite-left" class="stringLeft">{{string_left}}</span>
            <i slot="right" class="iconfont" :class="icon_right" @click="onRightClick"></i>
        </x-header>
    </div>
</template>

<script>
    import {
        XHeader
    } from 'vux'
    export default {
        props: {
            bgcol: String,
            title: String,
            icon_left: String,
            icon_right: String,
            string_left: String,
            string_right: String
        },
        components: {
            XHeader
        },
        data() {
            return {}
        },
        methods: {
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
    @import "../../assets/less/theme.less";
    .llgj-header {
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
</style>
