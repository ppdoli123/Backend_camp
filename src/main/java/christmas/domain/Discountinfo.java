package christmas.domain;

import java.util.ArrayList;
import java.util.List;

public class Discountinfo {
    private int totalOrderAmount;

    public Discountinfo() {
        this.totalOrderAmount = 0;
    }

    public int getTotalOrderAmount() {
        return totalOrderAmount;
    }

    public void setTotalOrderAmount(int totalOrderAmount) {
        this.totalOrderAmount = totalOrderAmount;
    }
}