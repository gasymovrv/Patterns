package tests;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        Test doubleTest = new DoubleTest();
        Test finallyTest = new FinallyTest();
        Test randomTest = new RandomTest();
        RegexTest regexTest = new RegexTest();
        doubleTest.go();
        finallyTest.go();
        randomTest.go();
        regexTest.go();
        System.out.println();


        //Ручной toString в цикле
        List<MyClass> myClasses = new ArrayList<>();
        myClasses.add(new MyClass(1L,"info1"));
        myClasses.add(new MyClass(2L,"info2"));
        myClasses.add(new MyClass());
        myClasses.add(new MyClass(3L,"info3"));
        myClasses.add(new MyClass("info4"));
        myClasses.add(new MyClass());
        ArrayList<String> strings = new ArrayList<>();
        myClasses.forEach((mc)-> strings.add(String.format("{id=%s; info=%s}",mc.getId(), mc.getInfo())));
        System.out.println("strings="+strings);
        System.out.println();


        //Вывод сета енамов
        Set<MyClass.OrderType> myClasses2 = new HashSet<>();
        myClasses2.add(MyClass.OrderType.CU);
        myClasses2.add(MyClass.OrderType.PO);
        myClasses2.add(MyClass.OrderType.RO);
        myClasses2.add(MyClass.OrderType.PRO);
        myClasses2.add(MyClass.OrderType.SO);
        System.out.println("enums="+myClasses2);
        System.out.println();


        //substring последних 2х цифр и удаление нуля
        String spz = "1234507";
        String str = "";
        str = spz.substring(spz.length()-2, spz.length());
        if(str.startsWith("0")){
            str = str.substring(1, str.length());
        }
        System.out.println("2 последние цифры из "+spz+" без нуля = "+str);
        System.out.println();


        //Мапы и null
        Map<String, MyClass> map = new HashMap<>();
        map.put("str1", new MyClass("info1"));
        map.put("str2", null);
        map.put(null, new MyClass("info2"));
        map.put(null, new MyClass("info3"));
        System.out.println("map.get(\"str1\") = "+map.get("str1"));
        System.out.println("map.get(\"str2\") = "+map.get("str2"));
        System.out.println("map.get(\"str3\") = "+map.get("str3"));
        System.out.println("map.get(null) = "+map.get(null));
        System.out.println();


        //Боксинг long в Long при сохранении в Object
        long l1 = 425L;
        Object o1 = l1;
        System.out.println("Object o1 = 425L, o1.getClass()="+o1.getClass());

    }

}
