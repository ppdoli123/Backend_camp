    package christmas.view;

    import christmas.domain.DiscountInfo;
    import christmas.domain.Order;

    import java.util.List;

    public class Outputview {
        public static void printEventPreview(int visitDate, List<Order> menuOrders, DiscountInfo discountInfo) {
            System.out.println(visitDate + "일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n");

            System.out.println("<주문 메뉴>");
            for (Order order : menuOrders) {
                System.out.println(order.getMenu().getName() + " " + order.getQuantity() + "개");
            }

            System.out.println("\n<할인 전 총주문 금액>");
            System.out.println(String.format("%,d원", discountInfo.getTotalOrderAmount()));

            System.out.println("\n<증정 메뉴>");
            if (discountInfo.getGiftMenu() != null) {
                System.out.println(discountInfo.getGiftMenu().getName() + " 1개");
            } else {
                System.out.println("없음");
            }

            System.out.println("\n<혜택 내역>");
            List<String> benefits = discountInfo.getBenefits();
            if (benefits.isEmpty()) {
                System.out.println("없음");
            } else {
                for (String benefit : benefits) {
                    System.out.println(benefit);
                }
            }

            System.out.println("\n<총혜택 금액>");
            System.out.println(String.format("%,d원", discountInfo.getTotalBenefitsAmount()));

            System.out.println("\n<할인 후 예상 결제 금액>");
            System.out.println(String.format("%,d원", discountInfo.getExpectedPaymentAmount()));

            System.out.println("\n<12월 이벤트 배지>");
            System.out.println(discountInfo.getEventBadge());
        }
    }
