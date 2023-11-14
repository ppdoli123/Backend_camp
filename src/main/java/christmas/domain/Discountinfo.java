package christmas.domain;

import java.util.ArrayList;
import java.util.List;

public class Discountinfo {
    private int totalOrderAmount;
    private boolean weekdayDiscount;
    private boolean weekendDiscount;
    private boolean specialDiscount;
    private Menu giftMenu;
    private List<String> benefits;

    public Discountinfo() {
        this.totalOrderAmount = 0;
        this.weekdayDiscount = false;
        this.weekendDiscount = false;
        this.specialDiscount = false;
        this.giftMenu = null;
        this.benefits = new ArrayList<>();
    }

    public int getTotalOrderAmount() {
        return totalOrderAmount;
    }

    public void setTotalOrderAmount(int totalOrderAmount) {
        this.totalOrderAmount = totalOrderAmount;
    }

    public boolean isWeekdayDiscount() {
        return weekdayDiscount;
    }

    public void setWeekdayDiscount(boolean weekdayDiscount) {
        this.weekdayDiscount = weekdayDiscount;
    }

    public boolean isWeekendDiscount() {
        return weekendDiscount;
    }

    public void setWeekendDiscount(boolean weekendDiscount) {
        this.weekendDiscount = weekendDiscount;
    }

    public boolean isSpecialDiscount() {
        return specialDiscount;
    }

    public void setSpecialDiscount(boolean specialDiscount) {
        this.specialDiscount = specialDiscount;
    }

    public Menu getGiftMenu() {
        return giftMenu;
    }

    public void setGiftMenu(Menu giftMenu) {
        this.giftMenu = giftMenu;
    }

    public List<String> getBenefits() {
        return benefits;
    }

    public void addBenefit(String benefit) {
        this.benefits.add(benefit);
    }

}
