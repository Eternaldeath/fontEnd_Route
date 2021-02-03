<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name:'Scroller',
    mounted(){
        this.$nextTick(()=>{
            // 使用 better-scroll 要求外层容器高度小于内层容器高度
           new BScroll(this.$refs.wrapper,{
                // tap:'tap', // 开启 tap 配置
                // probeType:1,
            });
        });

    }
}
</script>

<style lang="scss" scoped>
    .wrapper{height: 100%;}
</style>