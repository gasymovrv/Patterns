# Основные понятия по фреймворкам Spring

## Spring Core
+ Основные этапы поднятия ApplicationContext:
	+ ...BeanDefinitionReader - чтение конфигов и создание BeanDefinition
		+ Виды конфигов:
			+ xml - ClassPathXmlApplicationContext(“context.xml”)
			+ javaConfig - класс с @Configuration: AnnotationConfigApplicationContext(JavaConfig.class)
			+ annotions - пакета для сканирования: AnnotationConfigApplicationContext(“package.name”)
			+ groovy - GenericGroovyApplicationContext(“context.groovy”)
		+ На выходе мапа Map<BeanId, BeanDefinition>
	
	+ Создание BeanFactory и настройка BeanDefinition (мета данные о бинах)
		можно перехватить и донастроить BeanDefinition через BeanFactoryPostProcessor
		на этом этапе парсятся проперти для @Value

	+ Создание кастомных FactoryBean - фабрика создания бинов (актуально только для xml конфига)

	+ Создание экземпляров бинов (только не lazy - например синглтон, он по умолчанию не lazy)
		+ Созданием экземпляров бинов занимается BeanFactory при этом, если нужно, делегирует это кастомным FactoryBean
		+ На выходе мапа Map<BeanId, Bean>

	+ Донастройка созданных бинов
		+ Можем вклиниться с помощью BeanPostProcessor 
		
## Spring Boot