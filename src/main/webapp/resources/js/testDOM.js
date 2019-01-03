function run() {

    //При движении мыши показываются координаты и инфа о  теге на котором мышь сейчас
    document.body.addEventListener("mousemove", mouseMoveInfo);
    function mouseMoveInfo(event) {
        var div = document.getElementById('mouseCoord');
        if(!div){
            div = document.createElement('div');
        }
        div.setAttribute('id', 'mouseCoord');
        div.style.position = "absolute";
        div.style.padding = "3px";
        div.style.border = "solid 2px";
        div.style.backgroundColor = "#333434";
        div.style.color = "#bdbdbd";
        div.innerHTML = `clientX=${event.clientX},<br>
                        clientY=${event.clientY},<br>
                        pageX=${event.pageX},<br>
                        pageY=${event.pageY},<br>
                        targetTag=${event.target.tagName},<br>
                        targetId=${event.target.getAttribute('id')},<br>
                        targetClass=${event.target.getAttribute('class')}`;
        //Ставим координаты элемента
        //Вычитаем div.offsetHeight чтобы сдвинуть див вверх на свой размер
        //и 3px чтобы было повыше курсора
        //Можно и div.clientWidth/div.clientHeight но они не учитывают бордер
        //event.clientX/event.clientY - это координаты окна, не учитывают прокрутку
        div.style.left = `${event.pageX}px`;
        div.style.top = `${event.pageY-div.offsetHeight-3}px`;
        document.body.appendChild(div);
    }
    //Определяем высоту страницы с учетом прокрутки
    var scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    console.log('высота страницы : scrollHeight=' + scrollHeight);
    console.log('высота страницы : document.body.scrollHeight='+document.body.scrollHeight);
    console.log('высота страницы : document.body.offsetHeight='+document.body.offsetHeight);
    console.log('положение верт скролла : window.pageYOffset='+window.pageYOffset);
    console.log('document.documentElement.clientHeight='+document.documentElement.clientHeight);
    console.log('scrollHeight - document.documentElement.clientHeight='+(scrollHeight-document.documentElement.clientHeight));
    window.onscroll = function() {
        //Когда прокрутили до самого низа
        if(window.pageYOffset >= (scrollHeight-document.documentElement.clientHeight)){
            alert("---------------------------end of page-----------------------------")
        }
    }

}