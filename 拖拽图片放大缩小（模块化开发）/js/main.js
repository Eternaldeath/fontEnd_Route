console.log("加载完成！");

require.config({
    paths:{
        scale:'demo/scale'
    }
})

require(['scale'],function(scaleObj){
    var picture = document.querySelector("#div1");
    var dBlock = document.querySelector("#div2");
    scaleObj.outSclae(picture,dBlock);
})