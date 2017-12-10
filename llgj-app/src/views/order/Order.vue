<template>
    <div id="order-view" v-title="'订单'" class="container-view">
        <!-- 头部 -->
        <l-header title="订单" icon_left="icon-fanhuijiantou" string_left="" icon_right="icon-fenlei" @rightClick="onRightClick" @leftClick="onLeftClick"></l-header>
        <!-- 头部 -->
        <div>
            <!-- 订单状态 -->
            <div style="height:46px;">
                <sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46">
                    <tab v-model="orderType" prevent-default @on-before-index-change="switchTabItem">
                        <tab-item selected>全部</tab-item>
                        <tab-item>已完成</tab-item>
                        <tab-item badge-label="1">未完成</tab-item>
                    </tab>
                </sticky>
            </div>
            <!-- 订单状态 -->
            <card v-if="show(0)">
                <group slot="header">
                    <cell style="color:#42BE9B;font-size:12px;" title="日常保洁" value="2017.12.10" class="card-padding">
                        <i slot="icon" class="iconfont icon-fenlei"></i>
                    </cell>
                </group>
                <div slot="content" class="card-padding">
                    <panel :list="list1"></panel>
                </div>
                <div slot="footer" class="card-padding">
                    <flexbox>
                        <flexbox-item><span style="color:#999;font-size:12px;">
                                                                                未完成
                                                                            </span></flexbox-item>
                        <flexbox-item style="text-align: right">
                            <x-button style="font-size:12px;" mini type="warn">支付</x-button>
                            <x-button style="font-size:12px;" mini plain>取消订单</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>
            </card>
            <card v-if="show(1)">
                <group slot="header">
                    <cell style="color:#42BE9B;font-size:12px;" title="日常保洁" value="2017.12.10" class="card-padding">
                        <i slot="icon" class="iconfont icon-fenlei"></i>
                    </cell>
                </group>
                <div slot="content" class="card-padding">
                    <panel :list="list1"></panel>
                </div>
                <div slot="footer" class="card-padding">
                    <flexbox>
                        <flexbox-item><span style="color:#999;font-size:12px;">
                                                                                已完成
                                                                            </span></flexbox-item>
                        <flexbox-item style="text-align: right">
                            <x-button style="font-size:12px;" mini plain>评价</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>
            </card>
            <card v-if="show(1)">
                <group slot="header">
                    <cell style="color:#42BE9B;font-size:12px;" title="日常保洁" value="2017.12.10" class="card-padding">
                        <i slot="icon" class="iconfont icon-fenlei"></i>
                    </cell>
                </group>
                <div slot="content" class="card-padding">
                    <panel :list="list1"></panel>
                </div>
                <div slot="footer" class="card-padding">
                    <flexbox>
                        <flexbox-item><span style="color:#999;font-size:12px;">
                                                                                已完成
                                                                            </span></flexbox-item>
                        <flexbox-item style="text-align: right">
                            <x-button style="font-size:12px;" mini plain>评价</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
    import LHeader from 'components/common/header'
    import {
        Tab,
        TabItem,
        Card,
        Group,
        Cell,
        Panel,
        XButton,
        Flexbox,
        FlexboxItem,
        Sticky
    } from 'vux'
    export default {
        props: {
            selected: Number
        },
        components: {
            LHeader,
            Tab,
            TabItem,
            Card,
            Group,
            Cell,
            Panel,
            XButton,
            Flexbox,
            FlexboxItem,
            Sticky
        },
        data() {
            return {
                orderType: 0,
                list1: [
                    {
                        status: 1,
                        src: require('assets/images/common/miaozhao1.png'),
                        title: '标题一',
                        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                    }
                ]
            }
        },
        methods: {
            onLeftClick() {
                this.$router.push({
                    name: 'home'
                })
            },
            switchTabItem(index) {
                console.log('on-before-index-change', index)
                this.$vux.loading.show({
                    text: 'loading'
                })
                setTimeout(() => {
                    this.$vux.loading.hide()
                    this.orderType = index
                }, 1000)
            },
            onItemClick(index) {
                console.log('on item click:', index)
            },
            show(finished) {
                if (finished === 1 && (this.orderType === 0 || this.orderType === 1)) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
</script>

<style lang="less">
    .card-padding {
        padding: 15px;
    }
</style>
