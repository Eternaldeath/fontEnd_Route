<template>
    <div id="main">
        <Header title="影院信息"></Header>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';

export default {
    name:'Cinema',
    components:{
        Header,
        Tabbar
    }
}
</script>