package examples.collections.map;

public class Main {
    public static void main(String[] args) {
        System.out.println("-".repeat(7) + " MyHashMap test " + "-".repeat(7));

        //Capacity (кол-во корзин) + LoadFactor (отношение кол/ва элементов к размеру массива при котором произойдет содание нового массива)
        //Чем больше корзин, тем меньше коллизий - меньше итераций внутри корзин, но больше памяти потребуется
        //Чем меньше корзин, тем больше коллизий - меньше памяти, но больше итераций при поиске.
        MyHashMap<ClassWithBadHash, String> map = new MyHashMap<>(4, 0.5f);
        map.put(new ClassWithBadHash(1L), "first");
        map.put(new ClassWithBadHash(2L), "second");
        //map.put(new ClassWithBadHash(3L), "second");
        //map.put(new ClassWithBadHash(4L), "second");
        //map.put(new ClassWithBadHash(5L), "second");
        System.out.println(map);

        MyHashMap<ClassWithGoodHash, String> map2 = new MyHashMap<>();
        map2.put(new ClassWithGoodHash(1L), "first");
        map2.put(new ClassWithGoodHash(2L), "second");
        map2.put(new ClassWithGoodHash(3L), "second");
        map2.put(new ClassWithGoodHash(4L), "second");
        map2.put(new ClassWithGoodHash(5L), "second");
        map2.put(new ClassWithGoodHash(6L), "second");
        map2.put(new ClassWithGoodHash(7L), "second");
        map2.put(new ClassWithGoodHash(8L), "second");
        map2.put(new ClassWithGoodHash(9L), "second");
        map2.put(new ClassWithGoodHash(10L), "second");
        map2.put(null, "NULL!!!");
        System.out.println(map2);
        System.out.println(map2.get(null));

        System.out.println();
        System.out.println("-".repeat(7) + "Пример расчета индекса корзин мапы" + "-".repeat(7));
        hash();
    }

    /**
     * Метод с примером расчета индекса корзин мапы
     *
     * Map представляет из себя массив связных списков (корзин), дефолтный length которого = 16.
     * Индекс вставки рассчитывается как ((length-1) & hash) - так всегда получается число в дипазаоне изначального length.
     *  где hash - это особый хеш из реализации HashMap на основе hashCode вставляемого ключа
     *      - гарантирует что коллизий будет не более 8 (элементов связного списка)
     *
     * Хэш и ключ нового элемента поочередно сравниваются с хэшами и ключами элементов из списка и если:
     *  1. Они идентичны. Далее проверяется equals:
     *      1.1 Если вернул true - значение элемента перезаписывается.
     *      1.2 Если equals вернул false, то элемент добавялется в текущую корзину
     *  2. Они НЕ идентичны. Элемент добавляется в новую корзину
     */
    private static void hash() {
        int defaultSize = 16, hash = 1332455;
        System.out.println("size="+defaultSize);
        System.out.println(Integer.toBinaryString(defaultSize - 1));

        System.out.println();
        System.out.println("hash="+hash);
        System.out.println(Integer.toBinaryString(hash));

        System.out.println();
        System.out.println("index to insert="+((defaultSize - 1) & hash));
    }
}
