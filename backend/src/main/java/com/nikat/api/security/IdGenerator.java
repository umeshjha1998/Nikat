package com.nikat.api.security;

import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class IdGenerator {

    /**
     * Format: YYYY-MM-DD-INCREMENTAL
     */
    public synchronized String generateOrderId(long currentCountForDay) {
        LocalDateTime now = LocalDateTime.now();
        String datePart = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return datePart + "-" + (currentCountForDay + 1);
    }

    /**
     * Format: YEAR-MONTH-INCREMENTAL
     */
    public synchronized String generateShopOrServiceId(long currentCountForMonth) {
        LocalDateTime now = LocalDateTime.now();
        String monthPart = now.format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return monthPart + "-" + (currentCountForMonth + 1);
    }
}
