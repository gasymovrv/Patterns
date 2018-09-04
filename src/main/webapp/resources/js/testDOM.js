function run() {
    document.getElementById('testId').innerHTML = 'записываем текст внутрь HTML тега';
    document.body.getElementsByTagName("div")[0].getElementsByTagName("ul")[0].textContent = "новый текст";
}