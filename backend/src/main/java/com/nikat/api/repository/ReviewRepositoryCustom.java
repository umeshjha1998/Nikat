package com.nikat.api.repository;

public interface ReviewRepositoryCustom {
    Double findAverageRatingByShopId(String shopId);
    Double findAverageRatingByServiceId(String serviceId);
}
