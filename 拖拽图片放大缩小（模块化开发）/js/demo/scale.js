define(function(){
    // node1 是图片
    // node2 是拖拽框
    function scale(node1,node2){
        console.log("执行了");
        var picture = node1;
        var dBlock = node2;

        dBlock.onmousedown = function(ev){
            var e = ev||window.event;
            var offsetX = e.clientX - dBlock.offsetLeft;
            var offsetY = e.clientY - dBlock.offsetTop;

            document.onmousemove = function(ev){
                var e=ev||window.event;
                dBlock.style.left = e.clientX - offsetX +'px';
                dBlock.style.top = e.clientY - offsetY +'px';
                picture.style.width = e.clientX - offsetX +'px';
                picture.style.height = e.clientY - offsetY +'px';

            }

            document.onmouseup = function(){
                document.onmousemove = null;
            }
        }
    }

    return {
        outSclae:scale,
    }
})