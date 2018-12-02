# Spring-Boot

## Непонятки по Spring-Boot
1. Взаимодействие spring-boot, сервера приложений, БД
    + создание jar/war и подкладывание их на сервер
    + не совсем понимаю как все это будет работать без web.xml
    + нужно jndi вместо прямого подключения к БД - или в продакшене вообще по другому?
    

-------------------------------------------------------------------

# REACT

## Непонятки по react

1. react/node/npm/yarn/webpack
	+ веб-пак - где он?
	+ как все это деплоится на сервер приложений?
	+ 

## Команды npm/yarn

1. **Глобально**
```
npm install -g create-react-app@1.5.2
npm install -g create-react-app
```
или сокращенно:
```
npm i -g create-react-app
```
удаление из npm:
```
npm un -g create-react-app
```

1. **В пустом проекте**
```
create-react-app client --scripts-version=react-scripts-ts
create-react-app app2
```


1. **В готовом проекте**, если нет зависимостей (например скачал с гита):

Ставим реакт:
```
yarn add --exact react-scripts@1.1.5
yarn add --exact react-scripts
```
или становим все что прописано в package.json:
```
yarn
```
или тоже самое но через npm:
```
npm install
```
или тоже:
```
npm i
```
ставим утилиту storybook
```
getstorybook
```
или
```
getstorybook -f
yarn run storybook
```


## Добавление зависимостей

1.	**Reactstrap** - bootstrap для react:
 
через npm   
```
npm install bootstrap --save
npm install --save reactstrap react react-dom
```

или через yarn:
```
yarn add bootstrap
```

1. **Recompose:**
```
yarn add recompose
```
или через npm
```
npm install recompose --save
```
1. **Storybook** - утилита для просмотра компонентов:
```
npm i -g @storybook/cli
npm un -g getstorybook
```

## Основные понятия react

1. Node.js + npm + webpack
	+ ```npm/yarn``` - менеджеры пакетов, нужны для подключения зависимостей, библиотек (в том числе и реакт) - папка node_modules
	+ ```babel``` - одна из библиотек которая лежит в node_modules, преобразует es6, jsx и прочую крутизну в обычный js
	+ ```webpack``` - утилита которая собирает проект в различные оптимизированные, минимизированные файлы типа bundle.js, прогоняет код через babel и т.д.
	К тому же webpack обеспечивает работу модулей, при сборке он объединяет все импортированные файлы в bundle.js. 
	Кстати если при импорте написать без слэша, например ```import React from 'react';```, то webpack поймет, что эта либа из node_modules
	+ ```create-react-app``` - утилита которая включает в себя дефолтные библиотеки и настройки для реакта (babel,webpack,jsx...)
	+ ```Node.js``` - платформа на которой вся эта дичь работает
	
1. Что такое компонент. 
	+ Компонент - это часть UI, содержит логику и отображение, пример:
	    + Создаем компонент:
	    ```jsx harmony
	    function Book(){
	        return (<h3>Книга</h3>)
	    }
	    ```
	    + Используем его в другом компоненте:
	    ```jsx harmony
	    function BookList(){
	        return (<div><Book/><Book/><Book/></div>)
	    }
	    ```
	    
	+ Может быть функциональным (```stateless```) или классом (```statefull```);
	+ Функция должна вернуть DOM элемент (реактовский), возвращать можно в виде ```JSX```
	+ Класс должен быть унаследован от ```React.Component```
	+ JSX транспилируется babel-ем в:
        ```
        React.createElement('div', [atributes], [контент дива])
        ```

1. Что такое стейт и пропсы. 
    + State - состояние, все сохраненное в нем при изменении инициирует перерисовку. Доступен только в ```statefull``` компоненте
    + Props - параметры, передаваемые в компонент

1. Как передаются пропсы, колбеки. 
    + Создаем компонент:
        ```jsx harmony
        import React from 'react';

        function Book(props){
            return (          
              <div>
                <h3>Книга {props.name}</h3>
                <button onClick={props.callback}>Кнопка</button>
              </div>
            )
        }
        ```
    + Используем его в другом компоненте, передавая props:
        ```jsx harmony
        import React from 'react';
        
        class BookList extends React.Component {
            handler = (event) => {
                //здесь что-то делается при нажатии кнопки
            };
        
            render() {
                return (
                    <div>
                        <Book name={'К1'} callback={this.handler}/>
                        <Book name={'К2'} callback={this.handler}/>
                        <Book name={'К3'} callback={this.handler}/>
                    </div>)
            }
        }
        ```
1. Как сетается стейт. 
    + Вариант 1:
    ```js
    this.setState({something:'something value'})
    ```
    + Вариант 2 (с предыдущим состоянием и пропсами):
    ```js
        this.setState((state, props)=>({counter:state.counter + props.newCounter}))
    ```

1. Virtual DOM
    + В реакте всегда хранится виртуальное DOM-дерево
    + При вызове ```setState``` виртуальное дерево компонента, у которого был вызван ```setState```, полностью перестраивается - **```реконселяция```**(с версии 16 стала асинхронной)
    + Затем перестроенное дерево этого компонента сравнивается со старым виртуальным деревом и вносятся изменения в реальное DOM-дерево - **```ререндеринг```**
    + Для списков необходимо указывать props ```key```, чтобы обновление было более оптимизированным (иначе он будет проходиться по всему списку)

1. Когда происходит ререндеринг. 

1. Какие жизненные циклы компонента бывают и что можно делать в функциях хуков этих жизненных циклов. 
    + Инициализация
        1. constructor(props) - создание компонента как js-объекта
        1. componentWillMount()
        1. render() - создание virtual DOM, реальная отрисовка 
        1. componentDidMount() - после окончания отрисовки
    + Обновление (произошел setState)
        1. componentWillReceiveProps(nextProps) - вызовется при setState **родителей** даже когда пропсы не менялись
        1. shouldComponentUpdate(nextProps, nextState) - вызовется при setState **родителей** или **внутри** самого компонента
        1. componentWillUpdate(nextProps, nextState) - вызовется при setState **родителей** или **внутри** самого компонента, прямо перед ререндерингом
        1. render() - перестроение virtual DOM, сравнение со старым virtual DOM, реальная отрисовка изменений
        1. componentDidUpdate(prevProps, prevState) - после отрисовки
    + Удаление
        1. componentWillUnmount() - после удаления из DOM дерева

        
1. Что такое ```ref```. 
	+ Нужны чтобы получить элемент в виде DOM-объекта
	ref исп-ся если нужно по разному реагировать в зависимости от DOM-элемента
	пример: 
		по клику в любой точке документа КРОМЕ меню, скрывать это самое меню,
		а по нажатию кнопки открывать это меню
		можем сохранить это меню в this.menu с помощью ref и работать с ним в любых обработчиках

1. Что такое ```pureComponent```.
    + Это компонент у которого по умолчанию уже реализван
    ```shouldComponentUpdate```. И в нем происходит поверхностное сравнение всех пропсов и стейтов.
    То есть этот компонент обновляется только при изменении пропсов/стейтов.
    + Пример когда PureComponent не перерисует компонент: состояние родителя поменялось, но в детей он передает одно и тоже

1. Как задается класс в разметке 
    + Класс в JSX задается пропсом ```className```
    + Также:
    ```
       for = hrmlFor
       onclick = onClick
       ...
    ```
1. Методы оптимизации рендеринга
    + ```shouldComponentUpdate``` - если возвращает ```false```, то виртуальный дом этого комопнента не будет перестраиваться
1. Redux
