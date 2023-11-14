package christmas.domain;


import java.util.ArrayList;
import java.util.List;

public class DiscountCalculator {
    public static DiscountInfo calculateDiscount(int visitDate, int totalOrderAmount) {
        DiscountInfo discountInfo = new DiscountInfo();
        discountInfo.setTotalOrderAmount(totalOrderAmount);

        // 할인 정보 설정
        if (visitDate >= 1 && visitDate <= 25) {
            int discountAmount = (visitDate - 1) * 100;
            discountInfo.setTotalOrderAmount(totalOrderAmount - discountAmount);
        }

        if (visitDate >= 1 && visitDate <= 31) {
            if (isWeekend(visitDate)) {
                discountInfo.setWeekendDiscount(true);
            } else {
                discountInfo.setWeekdayDiscount(true);
            }
        }

        if (isSpecialDiscount(visitDate)) {
            discountInfo.setSpecialDiscount(true);
        }

        if (isGiftEventQualified(totalOrderAmount)) {
            Menu giftMenu = new Menu("샴페인", 0);
            discountInfo.setGiftMenu(giftMenu);
        }

        // 혜택 정보 설정
        if (discountInfo.isWeekdayDiscount()) {
            discountInfo.addBenefit("평일 할인: -2,023원");
        }

        if (discountInfo.isWeekendDiscount()) {
            discountInfo.addBenefit("주말 할인: -2,023원");
        }

        if (discountInfo.isSpecialDiscount()) {
            discountInfo.addBenefit("특별 할인: -1,000원");
        }

        if (discountInfo.getGiftMenu() != null) {
            discountInfo.addBenefit("증정 이벤트: -25,000원");
        }

        return discountInfo;
    }

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
