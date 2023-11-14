package christmas.view;

import christmas.domain.Menu;
import christmas.domain.Order;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Inputview {
    private static Scanner scanner = new Scanner(System.in);

    public static int getVisitDate() {
        System.out.print("12월 중 식당 예상 방문 날짜를 입력해주세요: ");
        return scanner.nextInt();
    }

    public static List<Order> getMenuOrders(List<Menu> menuList) {
        List<Order> menuOrders = new ArrayList<>();

        System.out.print("주문하실 메뉴를 메뉴와 개수로 입력해주세요 (e.g. 해산물파스타-2,레드와인-1,초코케이크-1): ");
        String input = scanner.next();
        String[] menuOrderPairs = input.split(",");

        for (String pair : menuOrderPairs) {
            String[] menuOrder = pair.split("-");
            String menuName = menuOrder[0];
            int quantity = Integer.parseInt(menuOrder[1]);

            Menu menu = findMenuByName(menuList, menuName);
            Order order = new Order(menu, quantity);
            menuOrders.add(order);
        }

        return menuOrders;
    }

    private static Menu findMenuByName(List<Menu> menuList, String menuName) {
        for (Menu menu : menuList) {
            if (menu.getName().equals(menuName)) {
                return menu;
            }
        }
        return null;
    }
}
