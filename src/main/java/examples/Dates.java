package examples;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dates {
    public static void main(String[] args) {
        LocalDateTime currentUtcDateTime =
                LocalDateTime.of(2020, 3, 5, 12, 24);

        DatesPair datesForPreviousDay = getDatesForPreviousDay(currentUtcDateTime);
        System.out.println("Day");
        System.out.println(datesForPreviousDay.startDate);
        System.out.println(datesForPreviousDay.endDate);

        System.out.println("Week");
        DatesPair datesForPreviousWeek = getDatesForPreviousWeek(currentUtcDateTime);
        System.out.println(datesForPreviousWeek.startDate);
        System.out.println(datesForPreviousWeek.endDate);

        System.out.println("Month");
        DatesPair datesForPreviousMonth = getDatesForPreviousMonth(currentUtcDateTime);
        System.out.println(datesForPreviousMonth.startDate);
        System.out.println(datesForPreviousMonth.endDate);

        System.out.println("Quarter");
        DatesPair datesForPreviousQuarter = getDatesForPreviousQuarter(currentUtcDateTime);
        System.out.println(datesForPreviousQuarter.startDate);
        System.out.println(datesForPreviousQuarter.endDate);
    }

    private static List<LocalDate> getListOfDays(LocalDateTime start, LocalDateTime end) {
        LocalDate startWithoutTime = start.toLocalDate();
        LocalDate endWithoutTime = end.toLocalDate();

        List<LocalDate> listOfDays = new ArrayList<>();
        if (startWithoutTime.isAfter(endWithoutTime)) {
            return listOfDays;
        }

        listOfDays.add(startWithoutTime);
        if (startWithoutTime.isEqual(endWithoutTime)) {
            return listOfDays;
        }

        LocalDate temp = startWithoutTime;
        while (temp.isBefore(endWithoutTime)) {
            temp = temp.plusDays(1);
            listOfDays.add(temp);
        }

        return listOfDays;
    }

    private static DatesPair getDatesForPreviousDay(LocalDateTime date) {
        LocalDateTime startDate = date
                .minusHours(date.getHour() - 1)
                .minusDays(1)
                .withHour(0).withMinute(0);

        LocalDateTime endDate = startDate.plusDays(1).minusMinutes(1);
        return new DatesPair(startDate, endDate);
    }

    private static DatesPair getDatesForPreviousWeek(LocalDateTime date) {
        LocalDateTime startDate = date
                .minusDays(date.getDayOfWeek().getValue() - 1)
                .minusWeeks(1)
                .withHour(0).withMinute(0);

        LocalDateTime endDate = startDate.plusWeeks(1).minusDays(1);
        return new DatesPair(startDate, endDate);
    }

    private static DatesPair getDatesForPreviousMonth(LocalDateTime date) {
        LocalDateTime startDate = date
                .minusDays(date.getDayOfMonth() - 1)
                .minusMonths(1)
                .withHour(0).withMinute(0);

        LocalDateTime endDate = startDate.plusMonths(1).minusDays(1);
        return new DatesPair(startDate, endDate);
    }

    private final Map<Integer, int[]> quarters = new HashMap<>();

    {
        int[] q1 = {1, 2, 3};
        int[] q2 = {4, 5, 6};
        int[] q3 = {7, 8, 9};
        int[] q4 = {10, 11, 12};
        quarters.put(1, q1);
        quarters.put(2, q2);
        quarters.put(3, q3);
        quarters.put(4, q4);
    }

    //TODO Доработать
    private static DatesPair getDatesForPreviousQuarter(LocalDateTime date) {
        LocalDateTime startDate = date
                .minusDays(date.getDayOfMonth() - 1)
                .minusMonths(3)
                .withHour(0).withMinute(0);

        LocalDateTime endDate = startDate.plusMonths(3).minusDays(1);
        return new DatesPair(startDate, endDate);
    }

    private static int getQuarterByMonth(int month) {
        return (month >= Calendar.JANUARY && month <= Calendar.MARCH) ? 1 :
                (month >= Calendar.APRIL && month <= Calendar.JUNE) ? 2 :
                        (month >= Calendar.JULY && month <= Calendar.SEPTEMBER) ? 3 :
                                4;
    }

    public static class DatesPair {

        private final LocalDateTime startDate;

        private final LocalDateTime endDate;

        public DatesPair(LocalDateTime startDate, LocalDateTime endDate) {
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }
}
