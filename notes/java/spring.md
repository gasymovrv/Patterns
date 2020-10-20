# Основные понятия по фреймворкам Spring

## Spring Core
+ Основные этапы поднятия ApplicationContext:
	+ ...BeanDefinitionReader - чтение конфигов и создание BeanDefinition
		+ Виды конфигов:
			+ xml - ClassPathXmlApplicationContext(“context.xml”)
			+ javaConfig - класс с @Configuration: AnnotationConfigApplicationContext(JavaConfig.class)
			+ annotations - пакета для сканирования: AnnotationConfigApplicationContext(“package.name”)
			+ groovy - GenericGroovyApplicationContext(“context.groovy”)
		+ На выходе мапа Map<BeanId, BeanDefinition>
	
	+ Создание BeanFactory и настройка BeanDefinition (мета данные о бинах)
		можно перехватить и донастроить BeanDefinition через BeanFactoryPostProcessor
		на этом этапе парсятся проперти для @Value

	+ Создание кастомных FactoryBean - фабрика создания бинов (актуально только для xml конфига)

	+ Создание экземпляров бинов (только не lazy - например синглтон, он по умолчанию не lazy)
		+ Созданием экземпляров бинов занимается BeanFactory при этом, если нужно, делегирует это кастомным FactoryBean
		+ На выходе мапа Map<BeanId, Bean>
		+ Тут происходит инжекция бинов 
		+ Лучше инжектить через конструктор - так поля можно сделать final и создавать бин сразу со всеми необходимыми зависимостями (к тому же это не позволит создать циклическую зависимость, а например через поля или сеттеры это возможно)

	+ Донастройка созданных бинов
		+ Можем вклиниться с помощью BeanPostProcessor 
		
## Spring Boot
+ Отличия от простого Spring:
    + Наличие автоконфигураций - стартеры (реализованы через @ConditionalOnProperty)
    + Встроенный контейнер сервлетов - для Spring-MVC - Tomcat, для Spring-Webflux - Netty

## Spring Webflux
+ Отличия от Spring MVC (подробно о Webflux [тут](https://habr.com/ru/company/funcorp/blog/350996/))
	+ В основе WebFlux лежит библиотека Reactor
	+ Вместо tomcat использует netty
	+ Использует неблокирующую многопоточность
	+ Текущий поток выполнения не блокируется и ждет, а переключается на что-нибудь полезное, вернувшись к текущему процессу, когда асинхронная обработка будет завершена
	+ Требуется меньше потоков благодаря предыдущему пункту
	+ Работает гораздо быстрее Spring-MVC при большом количестве запросов
	+ Работает также или хуже при малом количестве, но тяжелых и длительных процессов
