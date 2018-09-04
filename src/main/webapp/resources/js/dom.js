



//---------------------------------------Навигация по DOM-элементам-----------------------------------------------------

for (var i = 0; i < document.body.childNodes.length; i++) {
//Список детей – только для чтения!
    alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
}
//При наличии дочерних узлов всегда верно:
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild

//При помощи Array.prototype.slice сделать из коллекции массив.
var elems = document.documentElement.childNodes;
elems = Array.prototype.slice.call(elems); // теперь elems - массив
elems.forEach(function(elem) {
    alert( elem.tagName ); // HEAD, текст, BODY
});


//Навигация только по элементам
//Навигационные ссылки, описанные выше, равно касаются всех узлов в документе.
// В частности, в childNodes сосуществуют и текстовые узлы и узлы-элементы и узлы-комментарии, если есть.
//
//Но для большинства задач текстовые узлы нам не интересны.
//
//Поэтому посмотрим на дополнительный набор ссылок, которые их не учитывают:
//Эти ссылки похожи на те, что раньше, только в ряде мест стоит слово Element:
//
//children – только дочерние узлы-элементы, то есть соответствующие тегам.
//firstElementChild, lastElementChild – соответственно, первый и последний дети-элементы.
//previousElementSibling, nextElementSibling – соседи-элементы.
//parentElement – родитель-элемент.
//
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null

for (var i = 0; i < document.body.children.length; i++) {
    alert( document.body.children[i] ); // DIV, UL, DIV, SCRIPT
}
//Всегда верны равенства:
elem.firstElementChild === elem.children[0]
elem.lastElementChild === elem.children[elem.children.length - 1]




//--------------------------------Поиск: getElement* и querySelector* и не только-------------------------------------------------

var elem = document.getElementById('testId');
elem.style.background = 'red';
alert( elem == testId ); // true
testId.style.background = ""; // один и тот же элемент

// получить все div-элементы
var elements = document.getElementsByTagName('div');

// получить все элементы документа
document.getElementsByTagName('*');
// получить всех потомков элемента elem:
elem.getElementsByTagName('*');

var links = document.getElementsByClassName('a-head');
alert( links.length ); // 2, найдёт оба элемента

//querySelectorAll
//Вызов elem.querySelectorAll(css) возвращает все элементы внутри elem, удовлетворяющие CSS-селектору css.
//Следующий запрос получает все элементы LI, которые являются последними потомками в UL
var elements = document.querySelectorAll('ul > li:last-child');
for (var i = 0; i < elements.length; i++) {
    alert( elements[i].innerHTML );
}

//querySelector
//Вызов elem.querySelector(css) возвращает не все, а только первый элемент, соответствующий CSS-селектору css.
var element = document.querySelector('ul > li:last-child');
alert(element.innerHTML);//<a href="https://learn.javascript.ru/forms-controls">Формы, элементы управления</a>
alert(element.textContent);//Формы, элементы управления




//---------------------------------------Свойства узлов: тип, тег и содержимое-----------------------------------------------------
//
//Прямо от Node наследуют текстовые узлы Text, комментарии Comment и элементы Element.
//Элементы Element – это ещё не HTML-элементы, а более общий тип, который используется в том числе в XML.
// От него наследует SVGElement для SVG-графики и, конечно, HTMLElement.
//От HTMLElement уже наследуют разнообразные узлы HTML:
//Для <input> – HTMLInputElement
//Для <body> – HTMLBodyElement
//Для <a> – HTMLAnchorElement… и так далее.
//Узнать класс узла очень просто – достаточно привести его к строке, к примеру, вывести:
alert( document.body ); // [object HTMLBodyElement]
//Можно и проверить при помощи instanceof:
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true

//console.log выводит элемент в виде, удобном для исследования HTML-структуры.
//console.dir выводит элемент в виде JavaScript-объекта, удобно для анализа его свойств.


//Тип: nodeType
//Тип узла содержится в его свойстве nodeType.
//
//Как правило, мы работаем всего с двумя типами узлов:
//Элемент.
//Текстовый узел.

//  // Всевозможные значения nodeType
//  const unsigned short ELEMENT_NODE = 1;
//  const unsigned short ATTRIBUTE_NODE = 2;
//  const unsigned short TEXT_NODE = 3;
//  const unsigned short CDATA_SECTION_NODE = 4;
//  const unsigned short ENTITY_REFERENCE_NODE = 5;
//  const unsigned short ENTITY_NODE = 6;
//  const unsigned short PROCESSING_INSTRUCTION_NODE = 7;
//  const unsigned short COMMENT_NODE = 8;
//  const unsigned short DOCUMENT_NODE = 9;
//  const unsigned short DOCUMENT_TYPE_NODE = 10;
//  const unsigned short DOCUMENT_FRAGMENT_NODE = 11;
//  const unsigned short NOTATION_NODE = 12;
//

alert( document.body.nodeType ); // 1
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY

// для комментария
alert( document.body.firstChild.nodeName ); // #comment
alert( document.body.firstChild.tagName ); // undefined (в IE8- воскл. знак "!")
// для документа
alert( document.nodeName ); // #document, т.к. корень DOM -- не элемент
alert( document.tagName ); // undefined


//innerHTML: содержимое элемента
alert( document.body.innerHTML ); // читаем текущее содержимое
document.body.innerHTML = 'Новый BODY!'; // заменяем содержимое

document.body.innerHTML = '<b>тест'; // незакрытый тег
alert( document.body.innerHTML ); // <b>тест</b> (исправлено)

alert(document.body.children[0].children[0].innerHTML);
alert(document.body.getElementsByTagName("div")[0].getElementsByClassName("a-head")[0].innerHTML);

//Текст: textContent
//elem.textContent возвращает конкатенацию всех текстовых узлов внутри elem.

// Документ и объекты страницы
// Основы работы с событиями
// Формы, элементы управления
alert(document.body.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].textContent);

document.body.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].textContent = "новый текст";//<ul>новый текст</ul>




//---------------------------------------Современный DOM: полифиллы-----------------------------------------------------




//---------------------------------------Навигация по DOM-элементам-----------------------------------------------------




//---------------------------------------Навигация по DOM-элементам-----------------------------------------------------




//---------------------------------------Навигация по DOM-элементам-----------------------------------------------------