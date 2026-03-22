package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.entities.CommunityPost;
import com.nikat.nikat_backend.repositories.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityPostRepository repository;

    public List<CommunityPost> getAllPosts() {
        return repository.findAll();
    }

    public List<CommunityPost> getApprovedPosts() {
        return repository.findAll().stream().filter(CommunityPost::isApproved).toList();
    }

    public List<CommunityPost> getPostsByLocality(String locality) {
        return repository.findAll().stream()
                .filter(p -> p.isApproved() && p.getLocality().equalsIgnoreCase(locality))
                .toList();
    }

    public CommunityPost createPost(CommunityPost post) {
        post.setApproved(false); // Default to pending
        return repository.save(post);
    }

    public CommunityPost approvePost(Long id) {
        var post = repository.findById(id).orElseThrow();
        post.setApproved(true);
        return repository.save(post);
    }

    public void deletePost(Long id) {
        repository.deleteById(id);
    }
}
