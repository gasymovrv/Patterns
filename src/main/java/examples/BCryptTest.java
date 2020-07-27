package examples;

import java.util.function.Supplier;
import org.springframework.security.crypto.bcrypt.BCrypt;
import examples.utils.TimeMeasurementUtil;

/**
 * Хеширование паролей с помощью BCrypt и дальнейшая проверка
 */
public class BCryptTest extends Test {

    private static final String PASSWORD = "1234";
    private static final String PASSWORD_TO_CHECK = "wrong";

    private static Test thisOne = new BCryptTest();

    public static void main(String[] args) {
        thisOne.go();
    }

    @Override
    public void contentGo() {
        System.out.printf("Password: '%s'\n", PASSWORD);
        String hashed = hashPassword(PASSWORD);

        System.out.println();

        System.out.printf("Password to check: '%s'\n", PASSWORD_TO_CHECK);

        //Проверка пароля через специальный метод класса BCrypt
        checkPassword(
                () -> BCrypt.checkpw(PASSWORD_TO_CHECK, hashed),
                "checkpw(pepper+pass, salt as previous_hashed_pass)"
        );

        System.out.println();

        //Проверка пароля по гайдам из хабра - нечто подобное делается также в checkpw, но немного сложнее.
        //Суть в том, что пароль для проверки хэшируется с солью в виде хэша правильного пароля
        //и результат сравнивается с хэшем правильного пароля.
        //Если соль в hashpw(pass, salt) всегда одинаковая, то и результат всегда одинаковый.
        //А для первичного создания хэша соль генерится каждый раз разная
        checkPassword(
                () -> hashed.equals(BCrypt.hashpw(PASSWORD_TO_CHECK, hashed)),
                "previous_hashed_pass == hashpw(pepper+pass, salt as previous_hashed_pass)"
        );

        System.out.println();

        measureVerificationTime(() -> BCrypt.checkpw(PASSWORD, hashed));
    }

    private void checkPassword(Supplier<Boolean> checkFunction, String functionDescription) {
        String result;
        if (checkFunction.get()) {
            result = "Login OK";
        } else {
            result = "Wrong password";
        }
        System.out.printf("Checking result with function '%s':\n%s\n", functionDescription, result);
    }

    private String hashPassword(String plainPass) {
        String salt = BCrypt.gensalt();
        System.out.println("Salt: " + salt);

        String hashed = BCrypt.hashpw(plainPass, salt);
        System.out.println("Hashed password: " + hashed);

        return hashed;
    }

    private void measureVerificationTime(Runnable func) {
        System.out.println("Measuring password verification time:");
        long result = TimeMeasurementUtil.measureTime(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.printf("Iteration #%d: %d\n",
                        i,
                        TimeMeasurementUtil.measureTime(func));
            }
        });
        System.out.printf("Total time: %d\n", result);
    }
}
