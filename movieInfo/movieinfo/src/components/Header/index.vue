<template>
    	<header id="header">
			<slot></slot> <h1>{{title}}</h1>
		</header>
</template>

<script>
export default {
    // 最好添加组件的名字
    name:'Header',
    props:{
        title:{
            type:String,
            default:'电影信息',
            }
        }
}
</script>

<style lang="scss" scoped>
    #header{width:100%; height:50px; color: #fff; background: #4e72b8; border-bottom: 1px solid #4e72b8; position: relative;}
    #header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
    #header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
</style>