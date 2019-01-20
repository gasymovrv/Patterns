package tests;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

/**
 * Регулярные выражения
 */
public class RegexTest extends Test {
    private final Pattern EMAIL_REGEX = Pattern.compile(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            Pattern.CASE_INSENSITIVE
    );

    private final List<String> emails = new ArrayList<>(Arrays.asList(
            "foobar1@gmail.com",
            "foobar2gmail.com",
            "foobar3@mail.ru",
            "foobar4@gmailcom",
            ".+@gmailfoobar5.com"
    ));

    @Override
    public void contentGo(){
        System.out.println("\n---------- Валидация email ----------");
        for (String s : emails) {
            Matcher m1 = EMAIL_REGEX.matcher(s);
            StringBuilder resultM1 = new StringBuilder(s);
            if (m1.find()) {
                resultM1.append(": Correct!");
            } else {
                resultM1.append(": Incorrect!");
            }
            System.out.println(resultM1);
        }

        String text = "Егор Алла АлексаАндра";
        System.out.println("\n---------- Жадный режим квантификатора ----------");
        Pattern pattern1 = Pattern.compile("А.+а");
        Matcher matcher1 = pattern1.matcher(text);
        printMatcherResult(matcher1);

        System.out.println("\n---------- Сверхжадный режим квантификатора ----------");
        Pattern pattern2 = Pattern.compile("А.++а");
        Matcher matcher2 = pattern2.matcher(text);
        printMatcherResult(matcher2);

        System.out.println("\n---------- Ленивый режим квантификатора ----------");
        Pattern pattern3 = Pattern.compile("А.+?а");
        Matcher matcher3 = pattern3.matcher(text);
        printMatcherResult(matcher3);
    }

    private void printMatcherResult(Matcher matcher) {
        try {
            while (matcher.find()) {
                System.out.println("Found [" + matcher.group() + "] starting at "
                        + matcher.start() + " and ending at " + (matcher.end() - 1));
            }
        } catch (PatternSyntaxException pse) {
            System.err.println("Bad regex: " + pse.getMessage());
            System.err.println("Description: " + pse.getDescription());
            System.err.println("Index: " + pse.getIndex());
            System.err.println("Incorrect pattern: " + pse.getPattern());
        }
    }
}
