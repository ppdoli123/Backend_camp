package christmas.domain;

public class EventInfo {
    private final String eventName;
    private final String eventPeriod;

    public EventInfo() {
        this.eventName = "12월 이벤트";
        this.eventPeriod = "2023.12.1 ~ 2023.12.31";
    }

    public String getEventName() {
        return eventName;
    }

    public String getEventPeriod() {
        return eventPeriod;
    }
}
