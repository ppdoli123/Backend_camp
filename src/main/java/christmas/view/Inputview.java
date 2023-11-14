package christmas.view;
import christmas.domain.Menu;
import christmas.domain.Order;
import camp.nextstep.edu.missionutils.Console;

import java.util.ArrayList;
import java.util.List;

public class Inputview {
    public static int getVisitDate() {
        while (true) {
            try {
                System.out.print("12월 중 식당 예상 방문 날짜를 입력해주세요: ");
                int visitDate = Integer.parseInt(Console.readLine());
                return visitDate;
            } catch (NumberFormatException e) {
                printError("[ERROR] 잘못된 입력입니다. 숫자로 입력해주세요.");
            }
        }
    }

    public static List<Order> getMenuOrders(List<Menu> menuList) {
        List<Order> menuOrders = new ArrayList<>();

        while (true) {
            try {
                System.out.print("주문하실 메뉴를 메뉴와 개수로 입력해주세요 (e.g. 해산물파스타-2,레드와인-1,초코케이크-1): ");
                String input = Console.readLine();

                String[] menuOrderPairs = input.split(",");
                for (String pair : menuOrderPairs) {
                    String[] menuOrder = pair.split("-");
                    String menuName = menuOrder[0];
                    int quantity = Integer.parseInt(menuOrder[1]);

                    Menu menu = findMenuByName(menuList, menuName);
                    if (menu == null) {
                        throw new IllegalArgumentException("[ERROR] 잘못된 메뉴명입니다: " + menuName);
                    }

                    Order order = new Order(menu, quantity);
                    menuOrders.add(order);
                }

                return menuOrders;
            } catch (NumberFormatException e) {
                printError("[ERROR] 잘못된 입력입니다. 숫자로 입력해주세요.");
            } catch (IllegalArgumentException e) {
                printError(e.getMessage());
            }
        }
    }

    private static Menu findMenuByName(List<Menu> menuList, String menuName) {
        for (Menu menu : menuList) {
            if (menu.getName().equals(menuName)) {
                return menu;
            }
        }
        return null;
    }

    private static void printError(String message) {
        System.out.println(message);
    }
}
