package examples.utils;

import lombok.experimental.UtilityClass;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@UtilityClass
public class NumberedExamples {
    public void printNumberOfExample(long num, String... comments) {
        System.out.println();
        List<String> commentsList = Arrays.asList(comments);
        if (commentsList.isEmpty()) {
            System.out.printf("--- %d ---\n", num);
        } else {
            StringBuilder sb = new StringBuilder();
            AtomicInteger counter = new AtomicInteger(0);
            commentsList.forEach(str -> {
                sb.append(str);
                if(counter.getAndIncrement()!=commentsList.size()-1){
                    sb.append("; ");
                }
            });
            System.out.printf("--- %d: %s ---\n", num, sb.toString());
        }
    }
}
