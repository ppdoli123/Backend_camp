package christmas;

import christmas.controller.Controller;
import christmas.domain.*;
import christmas.view.Inputview;
import christmas.view.Outputview;

import java.util.List;

public class Application {
    public static void main(String[] args) {

        Controller controller = new Controller();

        int visitDate = Inputview.getVisitDate();

        List<Menu> menuList = controller.getMenuList();
        List<Order> menuOrders = Inputview.getMenuOrders(menuList);

        int totalOrderAmount = calculateTotalOrderAmount(menuOrders);
        DiscountInfo discountInfo = DiscountCalculator.calculateDiscount(visitDate,totalOrderAmount);

        Outputview.printEventPreview(visitDate, menuOrders, discountInfo);

    }

    private static int calculateTotalOrderAmount(List<Order> menuOrders) {
        int totalOrderAmount = 0;
        for (Order order : menuOrders) {
            totalOrderAmount += order.getMenu().getPrice() * order.getQuantity();
        }
        return totalOrderAmount;
    }
}
