function run() {

    var elems = document.querySelectorAll('#id19_1,#id19_2,#id19_3');

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", highlightThis, true);
        elems[i].addEventListener("click", highlightThis, false);
    }

    function highlightThis() {
        this.style.backgroundColor = 'yellow';
        alert(this.tagName);
        this.style.backgroundColor = '';
    }

}