package tests;

public class MyClass {
    private Long id;
    private String info;

    public enum OrderType{
        PRO,
        PO,
        RO,
        SO,
        CU
    }

    public MyClass(String info) {
        this.info = info;
    }

    public MyClass(Long id, String info) {
        this.id = id;
        this.info = info;
    }

    public MyClass() {
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "MyClass{" +
                "info='" + info + '\'' +
                '}';
    }
}