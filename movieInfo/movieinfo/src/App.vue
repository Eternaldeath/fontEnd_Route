<template>
  <!-- <div id="app">
   
  </div> -->

<!-- keep-alive 用于保存已经存在于页面的其他页面的信息，不用每次切换到发出请求 -->
   <keep-alive>
      <router-view/>
   </keep-alive>
</template>

<style lang="scss">

</style>
