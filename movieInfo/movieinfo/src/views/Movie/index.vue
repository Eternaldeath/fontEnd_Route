<template>
    <div id="main">
        <Header title="电影信息"></Header>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';

export default {
    name:'Moive',
    components:{
        Header,
        Tabbar
    }
}
</script>