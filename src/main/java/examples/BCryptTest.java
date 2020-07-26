package examples;

import java.util.function.Supplier;
import org.springframework.security.crypto.bcrypt.BCrypt;

/**
 * Хеширование паролей с помощью BCrypt и дальнейшая проверка
 */
public class BCryptTest extends Test {
    private static final String PEPPER = "qwerty";
    private static final String PASSWORD = "1234";
    private static Test thisOne = new BCryptTest();

    public static void main(String[] args) {
        thisOne.go();
    }

    @Override
    public void contentGo() {
        System.out.println("Pepper: " + PEPPER);
        System.out.println("Password: " + PASSWORD);
        String hashed = hashPassword(PEPPER + PASSWORD);

        System.out.println();

        String passwordToCheck = "wrong";
        System.out.printf("Password to check: '%s'\n", passwordToCheck);

        //Проверка пароля через специальный метод класса BCrypt
        checkPassword(
                () -> BCrypt.checkpw(PEPPER + passwordToCheck, hashed),
                "checkpw(pepper+pass, salt as previous_hashed_pass)"
        );

        System.out.println();

        //Проверка пароля по гайдам из хабра - нечто подобное делается также в checkpw, но немного сложнее
        checkPassword(
                () -> hashed.equals(BCrypt.hashpw(PEPPER + passwordToCheck, hashed)),
                "previous_hashed_pass == hashpw(pepper+pass, salt as previous_hashed_pass)"
        );
    }

    private void checkPassword(Supplier<Boolean> checkFunction, String checkingType) {
        String result;
        if (checkFunction.get()) {
            result = "Login OK";
        } else {
            result = "Wrong password";
        }
        System.out.printf("Checking result of '%s': %s\n", checkingType, result);
    }

    private String hashPassword(String plainPass) {
        String salt = BCrypt.gensalt();
        System.out.println("Salt: " + salt);

        String hashed = BCrypt.hashpw(plainPass, salt);
        System.out.println("Hashed pass: " + hashed);

        return hashed;
    }
}
