//Пример showUserAvatar() можно переписать с использованием co вот так:
// Загрузить данные пользователя с нашего сервера
function* fetchUser(url) {
    let userFetch = yield fetch(url);
    let user = yield userFetch.json();
    return user;
}

// Загрузить профиль пользователя с github
function* fetchGithubUser(user) {
    let githubFetch = yield fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = yield githubFetch.json();
    return githubUser;
}

// Подождать ms миллисекунд
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Использовать функции выше для получения аватара пользователя
function* fetchAvatar(url) {
    let user = yield* fetchUser(url);
    let githubUser = yield* fetchGithubUser(user);
    return githubUser.avatar_url;
}

// Использовать функции выше для получения и показа аватара
function* showUserAvatar() {
    let avatarUrl;
    try {
        avatarUrl = yield* fetchAvatar('https://learn.javascript.ru/article/promise/user.json');
    } catch(e) {
        avatarUrl = 'https://learn.javascript.ru/article/generator/anon.png';
    }
    let img = new Image();
    img.src = avatarUrl;
    img.className = "promise-avatar-example";
    document.body.appendChild(img);
    yield sleep(2000);
    img.remove();
    return img.src;
}
co(showUserAvatar).then((resolve => {
    alert(resolve);//выводит img.src, который вернула ф-ия-генератор showUserAvatar
}));