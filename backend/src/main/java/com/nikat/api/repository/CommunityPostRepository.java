package com.nikat.api.repository;

import com.nikat.api.domain.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, UUID> {
    List<CommunityPost> findByLocationAreaAndStatus(String locationArea, String status);
}
