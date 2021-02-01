<template>
    <div id="main">
        <Header title="我的信息"></Header>
        <Login></Login>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';
import { Toast } from 'mint-ui';
import Login from '@/components/Login';

export default {
    name:'MIne',
    components:{
        Header,
        Tabbar,
        Login
    },
    mounted(){
        Toast('无需注册登录');
    }
}
</script>