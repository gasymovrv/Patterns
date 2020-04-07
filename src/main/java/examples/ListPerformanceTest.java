package examples;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Consumer;

public class ListPerformanceTest extends Test {
    private static Test thisOne = new ListPerformanceTest();

    public static void main(String[] args) {
        thisOne.go();
    }

    @Override
    void contentGo() {
        int million1 = 1000000;
        int million2 = 2000000;
        int thousand10 = 10000;
        int thousand100 = 100000;
        int thousand50 = 50000;

        System.out.format("ArrayList, get(size/2), count=%d, time:%d\n", million1, testGet(new ArrayList<>(), million1));
        System.out.format("LinkedList, get(size/2), count=%d, time:%d\n", thousand50, testGet(new LinkedList<>(), thousand50));

        System.out.println();
        System.out.format("ArrayList, add(T), count=%d, time:%d\n", million2, testAdd(new ArrayList<>(), million2));
        System.out.format("LinkedList, add(T), count=%d, time:%d\n", million2, testAdd(new LinkedList<>(), million2));

        System.out.println();
        System.out.format("ArrayList, add(0, T), count=%d, time:%d\n", thousand100, testInsertFirst(new ArrayList<>(), thousand100));
        System.out.format("LinkedList, add(0, T), count=%d, time:%d\n", thousand100, testInsertFirst(new LinkedList<>(), thousand100));

        System.out.println();
        System.out.format("ArrayList, add(size/2, T), count=%d, time:%d\n", thousand10, testInsertInMiddle(new ArrayList<>(), thousand10));
        System.out.format("LinkedList, add(size/2, T), count=%d, time:%d\n", thousand10, testInsertInMiddle(new LinkedList<>(), thousand10));

        System.out.println();
        System.out.format("ArrayList, add(size/5, T), count=%d, time:%d\n", thousand50, testInsertInBeginning(new ArrayList<>(), thousand50));
        System.out.format("LinkedList, add(size/5, T), count=%d, time:%d\n", thousand50, testInsertInBeginning(new LinkedList<>(), thousand50));

        System.out.println();
        System.out.println("Multi test:");

        LinkedList<Integer> linkedList = new LinkedList<>();
        System.out.format("\tLinkedList, add(0, T), count=%d, time:%d\n", million1, testInsertFirst(linkedList, million1));

        ArrayList<Integer> arrayList = new ArrayList<>();
        long copyTime = measureTime(arg -> arrayList.addAll(linkedList));
        System.out.format("\tCopy from LinkedList to ArrayList, count=%d, time:%d\n", linkedList.size(), copyTime);

        System.out.format("\tArrayList, get(size/2), count=%d, time:%d\n", arrayList.size(), testGet(arrayList, arrayList.size()));
    }

    private long testGet(List<Integer> list, int count) {
        prepareList(list, count);

        return measureTime(arg -> {
            for (int i = 0; i < count; i++) {
                list.get(list.size()/2);
            }
        });
    }

    private long testAdd(List<Integer> list, int count) {
        return measureTime(arg -> {
            for (int i = 0; i < count; i++) {
                list.add(i);
            }
        });
    }

    private long testInsertFirst(List<Integer> list, int count) {
        return measureTime(arg -> {
            for (int i = 0; i < count; i++) {
                list.add(0, i);
            }
        });
    }

    private long testInsertInMiddle(List<Integer> list, int count) {
        prepareList(list, count);

        return measureTime(arg -> {
            for (int i = 0; i < count; i++) {
                list.add(list.size() / 2, i);
            }
        });
    }

    private long testInsertInBeginning(List<Integer> list, int count) {
        prepareList(list, count);

        return measureTime(arg -> {
            for (int i = 0; i < count; i++) {
                list.add(list.size() / 5, i);
            }
        });
    }

    private void prepareList(List<Integer> list, int size) {
        for (int i = 0; i < size; i++) {
            list.add(i);
        }
    }

    @SuppressWarnings("unchecked")
    private long measureTime(Consumer function) {
        long l1 = System.currentTimeMillis();
        function.accept(null);
        long l2 = System.currentTimeMillis();
        return l2 - l1;
    }
}
