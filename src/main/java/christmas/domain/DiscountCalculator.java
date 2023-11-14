package christmas.domain;


import java.util.ArrayList;
import java.util.List;

public class DiscountCalculator {
    private static boolean isWeekend(int visitDate) {
        return visitDate % 7 == 5 || visitDate % 7 == 6;
    }

    private static boolean isSpecialDiscount(int visitDate) {
        List<Integer> specialDiscountDates = new ArrayList<>();
        specialDiscountDates.add(5);
        specialDiscountDates.add(10);
        specialDiscountDates.add(15);
        specialDiscountDates.add(20);
        specialDiscountDates.add(25);

        return specialDiscountDates.contains(visitDate);
    }

    private static boolean isGiftEventQualified(int totalOrderAmount) {
        return totalOrderAmount >= 5000;
    }
}
