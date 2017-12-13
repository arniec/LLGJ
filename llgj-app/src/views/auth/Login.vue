<template>
    <div class="login-view">
        <div class="content">
            <h1>欢迎来到了了管家</h1>
            <group>
                <x-input v-model="mobile" placeholder="手机号码" is-type="text"></x-input>
                <x-input v-model="password" placeholder="密码" type="password"></x-input>
            </group>
            <p class="errorMessage">{{ errorMessage }}</p>
            <x-button type="primary" @click.native="login">登录</x-button>
            <p class="other">
                <router-link to="/register">注册账号</router-link>
                <span>|</span>
                <router-link to="#">忘记密码</router-link>
            </p>
        </div>
    </div>
</template>


<script>
    import {
        XHeader,
        Group,
        XInput,
        XButton
    } from 'vux'
    import http from '../../utils/http'
    import api from '../../utils/api'
    export default {
        components: {
            XHeader,
            Group,
            XInput,
            XButton
        },
        data() {
            return {
                userList: [],
                mobile: '13923443233',
                password: '12345678',
                errorMessage: ''
            }
        },
        methods: {
            login: async function() {
                const params = {
                    mobile: this.mobile,
                    password: this.password
                }
                const res = await http.post(api.login, params)
                // if (res.data.success) {
                console.log(res)
                // }
            }
        },
        created() {}
    }
</script>


<style lang="less">
    .login-view {
        .content {
            padding: 50px 10px 10px 10px;
        }
        button,
        p {
            margin-top: 10px;
            text-align: center;
        }
        .header {
            background-color: #fbf9fe;
        }
        h1 {
            text-align: center;
            color: #35495e;
        }
    }
</style>
