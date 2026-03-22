package com.nikat.nikat_backend.controllers;

import com.nikat.nikat_backend.entities.CommunityPost;
import com.nikat.nikat_backend.services.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/public/community")
    public ResponseEntity<List<CommunityPost>> getApprovedPosts() {
        return ResponseEntity.ok(communityService.getApprovedPosts());
    }

    @GetMapping("/public/community/locality/{locality}")
    public ResponseEntity<List<CommunityPost>> getPostsByLocality(@PathVariable String locality) {
        return ResponseEntity.ok(communityService.getPostsByLocality(locality));
    }

    @PostMapping("/community")
    public ResponseEntity<CommunityPost> createPost(@RequestBody CommunityPost post) {
        return ResponseEntity.ok(communityService.createPost(post));
    }

    @GetMapping("/admin/community")
    public ResponseEntity<List<CommunityPost>> getAllPostsAdmin() {
        return ResponseEntity.ok(communityService.getAllPosts());
    }

    @PutMapping("/admin/community/{id}/approve")
    public ResponseEntity<CommunityPost> approvePost(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.approvePost(id));
    }

    @DeleteMapping("/admin/community/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        communityService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
