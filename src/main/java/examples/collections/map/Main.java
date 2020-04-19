package examples.collections.map;

import java.util.Set;
import java.util.SortedMap;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {
        System.out.println("-".repeat(7) + " MyHashMap test " + "-".repeat(7));

        // Capacity (начальная емкость - кол-во корзин)
        // LoadFactor (отношение кол/ва элементов к размеру массива при котором произойдет содание нового массива)
        // LoadFactor и Capacity – два главных фактора, от которых зависит производительность операций.
        // LoadFactor, равный 0,75, в среднем обеспечивает хорошую производительность.
        // Если этот параметр увеличить, тогда уменьшится нагрузка на память (так как это уменьшит количество операций ре-хэширования и перестраивания),
        // но ухудшит скорость операций добавления и поиска (так как с маленьким количеством корзин кол-во элементов в них увеличивается и придется их обходить в цикле)

        //Чем больше корзин, тем меньше коллизий - меньше итераций внутри корзин, но больше памяти потребуется (когда loadFactor меньше)
        //Чем меньше корзин, тем больше коллизий - меньше памяти, но больше итераций при поиске. (когда loadFactor больше)
        System.out.println("Пример хэш мапы, все элементы которой имеют неверно переопределенный hashCode (одинаковый)");
        MyHashMap<ClassWithBadHash, String> map = new MyHashMap<>(4, 0.5f);
        for (long i = 0; i < 3; i++) {
            map.put(new ClassWithBadHash(i), "value_"+i);
            map.put(new ClassWithBadHash(i), "value_"+i);
        }
        System.out.println(map);

        System.out.println("Пример хэш мапы, все элементы которой имеют правильный hashCode");
        MyHashMap<ClassWithGoodHash, String> map2 = new MyHashMap<>(4, 1f);
        for (long i = 0; i < 3; i++) {
            map2.put(new ClassWithGoodHash(i), "value_"+i);
            map2.put(new ClassWithGoodHash(i), "value_"+i);
        }
        map2.put(null, "NULL!!!");
        System.out.println(map2);
        System.out.println(map2.get(null));

        //--------------------------------------------------------------------------------------------------------------
        System.out.println();
        System.out.println("-".repeat(7) + "Пример расчета индекса корзин HashMap" + "-".repeat(7));
        hash();

        //--------------------------------------------------------------------------------------------------------------
        System.out.println();
        System.out.println("-".repeat(7) + " TreeMap test " + "-".repeat(7));
        SortedMap<ClassWithGoodHash, String> sortedMap = new TreeMap<>();
        sortedMap.put(new ClassWithGoodHash(2L), "second");
        sortedMap.put(new ClassWithGoodHash(5L), "second");
        sortedMap.put(new ClassWithGoodHash(3L), "second");
        sortedMap.put(new ClassWithGoodHash(1L), "first");
        sortedMap.put(new ClassWithGoodHash(4L), "second");
        sortedMap.put(new ClassWithGoodHash(4L), "second");
        sortedMap.put(new ClassWithGoodHash(4L), "second");

        System.out.println(sortedMap.entrySet());
        ClassWithGoodHash highestKey = sortedMap.lastKey();
        ClassWithGoodHash lowestKey = sortedMap.firstKey();
        System.out.println("highestKey="+highestKey);
        System.out.println("lowestKey="+lowestKey);
        Set<ClassWithGoodHash> keysLessThan3 = sortedMap.headMap(new ClassWithGoodHash(3L)).keySet();
        System.out.println("keysLessThan3="+keysLessThan3);
        Set<ClassWithGoodHash> keysGreaterThanEqTo3 = sortedMap.tailMap(new ClassWithGoodHash(3L)).keySet();
        System.out.println("keysGreaterThanEqTo3="+keysGreaterThanEqTo3);

        //--------------------------------------------------------------------------------------------------------------
        System.out.println();
        System.out.println("-".repeat(7) + " MyTreeMap test " + "-".repeat(7));
        SortedMap<Integer, String> myTreeMap = new MyTreeMap<>();
        for (int i = 0; i < 8; i++) {
            myTreeMap.put(1000 + i, "v_"+i);
            myTreeMap.put(1000 + i, "v_"+i);
        }
        System.out.println(myTreeMap);
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
