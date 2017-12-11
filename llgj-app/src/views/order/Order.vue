<template>
    <div id="order-view" class="container-view">
        <div>
            <!-- 订单状态 -->
            <div style="height:44px;">
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
                    <cell style="color:#42BE9B;font-size:12px;text-align:left;" title="日常保洁" value="2017.12.10" class="card-padding">
                        <i slot="icon" class="iconfont icon-fenlei"></i>
                    </cell>
                </group>
                <div slot="content" class="card-padding">
                    <panel :list="list1"></panel>
                </div>
                <div slot="footer" class="card-padding">
                    <flexbox>
                        <flexbox-item>
                            <span style="color:#999;font-size:12px;">未完成</span>
                        </flexbox-item>
                        <flexbox-item style="text-align: right">
                            <x-button style="font-size:12px;" mini type="warn">支付</x-button>
                            <x-button style="font-size:12px;" mini plain>取消订单</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>
            </card>
            <card v-if="show(1)">
                <group slot="header">
                    <cell style="color:#42BE9B;font-size:12px;text-align:left;" title="日常保洁" value="2017.12.10" class="card-padding">
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
                    <cell style="color:#42BE9B;font-size:12px;text-align:left;" title="日常保洁" value="2017.12.10" class="card-padding">
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
                list1: [{
                    status: 1,
                    src: require('assets/images/common/miaozhao1.png'),
                    title: '标题一',
                    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
                }]
            }
        },
        methods: {
            onRightClick() {},
            onLeftClick() {},
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
                if (this.orderType === 0) {
                    return true
                } else if (this.orderType === 1 && finished === 1) {
                    return true
                } else if (this.orderType === 2 && finished === 0) {
                    return true
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
