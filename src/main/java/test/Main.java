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
            try {
                throw new RuntimeException("Корневое исключение!");
            } catch (RuntimeException e) {

                try {
                    throw new RuntimeException(e);
                } catch (RuntimeException e1) {

                    try {
                        throw new RuntimeException(e1);
                    } catch (RuntimeException e2) {

                        throw new RuntimeException(e2);
                    }
                }
            }
        } catch (RuntimeException e){
            Throwable t = e;
            //берем корневое исключение
            while (t.getCause() != null){
                t = t.getCause();
            }
            //и сообщение из него
            message = t.getMessage();
            return message;
        } finally {
            message += " from finally";
            return message;
        }
    }
}
