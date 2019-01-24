//?! - исключение слов - для русских все сложнее, нет метасимвола для границы слов, поэтому нужны двойные пробелы
//сделать [a-zа-яё]+ не используя границы слов не получится в связке исключающей группой
var str = ' Se  cat  КОТовасия  Gecat  Po Po2  Po3  cat  Cat  Service  Catty  cat  кот  cat  cat  КОТ ';
lg( str.match(/(\s|^)(?!cat[ ,.;:'"-]|кот[ ,.;:'"-])\S+(\s|$)/gi) ); // [ " Se ", " КОТовасия ", " Gecat ", " Po ", " Po3 ", " Service ", " Catty " ]

var str2 = 'Se cat Gecat Po cat Service cat Cat Catty cat cat';
lg( str2.match(/\b((?!cat\b)\w+)\b/gi) ); // [ "Se", "Gecat", "Po", "Service", "Catty" ]
