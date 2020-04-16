package examples.collections;

public class MyLinkedList implements MyList {

    private Entry first;

    private Entry last;

    private int size = 0;

    @Override
    public void add(Object o) {
        Entry l = last;
        Entry newEntry = new Entry(last, null, o);
        last = newEntry;
        if (l == null) {
            first = newEntry;
        } else {
            l.next = newEntry;
        }
        size++;
    }

    public void add(int index, Object o) {
        Entry current = getEntry(index);
        Entry prev = current.prev;
        Entry newEntry = new Entry(prev, current, o);
        prev.next = newEntry;
        current.prev = newEntry;
        size++;
    }

    @Override
    public Object get(int index) {
        return getEntry(index).item;
    }

    @Override
    public int size() {
        return size;
    }

    private Entry getEntry(int index) {
        Entry x = first;
        for (int i = 0; i < index; i++) {
            x = x.next;
        }
        return x;
    }

    private static class Entry {
        Entry prev;
        Entry next;
        Object item;

        public Entry(Entry prev, Entry next, Object item) {
            this.prev = prev;
            this.next = next;
            this.item = item;
        }

    }

}
