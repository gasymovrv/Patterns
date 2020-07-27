package examples.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class TimeMeasurementUtil {

    /**
     * Измеритель времени выполнения функции {@code function}
     *
     * @param function функция для замера времени ее выполнения
     * @return время в миллисекундах
     */
    public static long measureTime(Runnable function) {
        long l1 = System.currentTimeMillis();
        function.run();
        long l2 = System.currentTimeMillis();
        return l2 - l1;
    }

    /**
     * То же что и measureTime, но результат в наносекундах
     *
     * @return время в наносекундах
     */
    public static long measureNanoTime(Runnable function) {
        long l1 = System.nanoTime();
        function.run();
        long l2 = System.nanoTime();
        return l2 - l1;
    }
}
