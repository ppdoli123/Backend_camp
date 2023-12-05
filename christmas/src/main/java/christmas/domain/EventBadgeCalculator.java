package christmas.domain;

public class EventBadgeCalculator {
    public static String getEventBadge(int totalOrderAmount) {
        if (totalOrderAmount >= 20000) {
            return "산타";
        } else if (totalOrderAmount >= 10000) {
            return "트리";
        } else if (totalOrderAmount >= 5000) {
            return "별";
        } else {
            return "없음";
        }
    }
}
