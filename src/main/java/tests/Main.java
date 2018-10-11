package tests;

public class Main {
    public static void main(String[] args) {
        Test doubleTest = new DoubleTest();
        Test finallyTest = new FinallyTest();
        Test randomTest = new RandomTest();
        doubleTest.go();
        finallyTest.go();
        randomTest.go();
    }

}
