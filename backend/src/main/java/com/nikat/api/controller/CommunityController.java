package com.nikat.api.controller;

import com.nikat.api.dto.CommunityPostDto;
import com.nikat.api.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/public/community")
    public ResponseEntity<List<CommunityPostDto>> getAllPosts() {
        return ResponseEntity.ok(communityService.getAllPosts());
    }

    @GetMapping("/public/community/{id}")
    public ResponseEntity<CommunityPostDto> getPostById(@PathVariable UUID id) {
        return ResponseEntity.ok(communityService.getPostById(id));
    }
}
