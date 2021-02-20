        // 禁止右键菜单
        document.oncontextmenu = function () {
            return false;
        }

        var oMenu = document.querySelector("#menu");
        var showMsg = document.querySelectorAll("showMsg");
        // showMsg.onmousedown = function (ev) {
        //     var e = ev || window.event;
        //     console.log(showMsg)
        //     // if (e.button == 2) {
        //     //     oMenu.style.display = 'block';
        //     //     oMenu.style.left = e.clientX + 'px';
        //     //     oMenu.style.top = e.clientY + 'px';
        //     // } else {
        //     //     oMenu.style.display = 'none';
        //     // }
        // }

        for(var i=0;i<showMsg.length;i++){
            showMsg[i].onmousedown = (function(ev){
                var e = ev || window.event;
                if (e.button == 2) {
                    oMenu.style.display = 'block';
                    oMenu.style.left = e.clientX + 'px';
                    oMenu.style.top = e.clientY + 'px';
                } else {
                    oMenu.style.display = 'none';
                }
            })(i);
        }