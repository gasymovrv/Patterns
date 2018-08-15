package test;

public class Main {
    public static void main(String[] args) {
        //-----------------------------Math.random()-------------------
        for (int i = 0; i < 100; i++) {
            System.out.println((int)(Math.random()*5));
        }

        //-----------------------------finally-------------------
        System.out.println(finallyTest());
    }

    private static String finallyTest(){
        String message = null;
        try {
            message = "Успешно!";
//            throw new Exception();
            return message;
        } catch (Exception e){
            message = "Ошибка!";
            return message;
        } finally {
            message += " from finally";
            return message;
        }
    }
}
