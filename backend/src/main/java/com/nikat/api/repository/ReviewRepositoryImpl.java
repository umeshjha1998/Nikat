package com.nikat.api.repository;

import com.nikat.api.domain.Review;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewRepositoryImpl implements ReviewRepositoryCustom {

    @PersistenceContext
    private final EntityManager entityManager;

    @Override
    public Double findAverageRatingByShopId(String shopId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Double> cq = cb.createQuery(Double.class);
        Root<Review> root = cq.from(Review.class);

        cq.select(cb.avg(root.get("rating")));
        cq.where(
            cb.equal(root.get("shop").get("id"), shopId),
            cb.equal(root.get("status"), "ACTIVE")
        );

        return entityManager.createQuery(cq).getSingleResult();
    }

    @Override
    public Double findAverageRatingByServiceId(String serviceId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Double> cq = cb.createQuery(Double.class);
        Root<Review> root = cq.from(Review.class);

        cq.select(cb.avg(root.get("rating")));
        cq.where(
            cb.equal(root.get("service").get("id"), serviceId),
            cb.equal(root.get("status"), "ACTIVE")
        );

        return entityManager.createQuery(cq).getSingleResult();
    }
}
