package christmas.controller;

import christmas.domain.Menu;

import java.util.ArrayList;
import java.util.List;

public class Controller {
    private List<Menu> menuList;

    public Controller() {
        menuList = new ArrayList<>();
        initializeMenu();
    }

    private void initializeMenu() {
        menuList.add(new Menu("양송이수프", 6000));
        menuList.add(new Menu("타파스", 5500));
        menuList.add(new Menu("시저샐러드", 8000));
        menuList.add(new Menu("티본스테이크", 55000));
        menuList.add(new Menu("바비큐립", 54000));
        menuList.add(new Menu("해산물파스타", 35000));
        menuList.add(new Menu("크리스마스파스타", 25000));
        menuList.add(new Menu("초코케이크", 15000));
        menuList.add(new Menu("아이스크림", 5000));
        menuList.add(new Menu("제로콜라", 3000));
        menuList.add(new Menu("레드와인", 60000));
        menuList.add(new Menu("샴페인", 25000));
    }

    public List<Menu> getMenuList() {
        return menuList;
    }
}
