package examples;

import examples.java8.*;
import examples.utils.NumberedExamples;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Java8Test extends Test {
    private static Test thisOne = new Java8Test();

    @Override
    void contentGo() {
        Pojo pojo = new Pojo(1L, "Pojo object from variable 'pojo'");

        //Функциональные интерфейсы
        NumberedExamples.printNumberOfExample(1, "Ссылка на не статический метод");
        StringGetter stringGetter = pojo::getInfo; //не статический
        pojo.setInfo("new");
        System.out.println(stringGetter.get());

        NumberedExamples.printNumberOfExample(2, "Ссылка на статический метод");
        StringInputFunc stringInputFunc = MyClass::printSomething; //статический
        stringInputFunc.func("static method from MyClass");

        NumberedExamples.printNumberOfExample(3, "Ссылка на конструктор");
        PojoCreator pojoCreator = Pojo::new; //конструктор
        pojoCreator.func(2L,"gjkl");
        pojo= pojoCreator.func(3L,"gjkl2");
        System.out.println(pojo);
        System.out.println(pojo.getId());

        NumberedExamples.printNumberOfExample(4, "Comparator.comparing(Pojo::getInfo).reversed()");
        List<Pojo> pojos = new ArrayList<>();
        pojos.add(new Pojo(4L,"C"));
        pojos.add(new Pojo(5L,"B"));
        pojos.add(new Pojo(6L,"A"));
        pojos.add(new Pojo(7L,"D"));
        pojos.add(new Pojo(8L,"D"));
        pojos.sort(Comparator.comparing(Pojo::getInfo).reversed());
        System.out.println(pojos);

        NumberedExamples.printNumberOfExample(5, "Свой функ-ый интерфейс с дженериком для геттеров");
        ClassWithLambdaMethod.handle(new Pojo(9L, "Pojo 9")::getInfo);
    }

    public static void main(String[] args) {
        thisOne.go();
    }
}
