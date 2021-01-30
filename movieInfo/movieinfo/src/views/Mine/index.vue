<template>
    <div id="main">
        <Header title="我的信息"></Header>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';

export default {
    name:'MIne',
    components:{
        Header,
        Tabbar
    }
}
</script>