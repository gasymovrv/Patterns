function run() {



// <div class="collapse">
//     <a class="collapse-toggle" type="button" href="/">
//     Скрыть
//     </a>
//
//     <div class="collapse-content">
//     Скрываемое содержимое
// </div>
// </div>

    var div = document.createElement('div');
    div.setAttribute('class', 'collapse');
    var a = document.createElement('a');
    a.setAttribute('class', 'collapse-toggle');
    a.setAttribute('type', 'button');
    a.setAttribute('href', '/');
    a.textContent = 'Скрыть';
    div.appendChild(a);
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'collapse-content');
    div2.textContent = 'Скрываемое содержимое';
    div.appendChild(div2);

    // document.body.appendChild(div);
    document.getElementById('testId17').appendChild(div);


    document.getElementsByClassName('collapse-toggle')[0].addEventListener('click', (e) => {
        e.preventDefault();
        let div = document.getElementsByClassName('collapse-content')[0];
        e.target.textContent = div.hidden ? 'Скрыть' : 'Показать';
        div.hidden = !div.hidden;
    });


}