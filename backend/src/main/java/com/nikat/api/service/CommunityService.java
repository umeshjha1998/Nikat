package com.nikat.api.service;

import com.nikat.api.domain.CommunityPost;
import com.nikat.api.dto.CommunityPostDto;
import com.nikat.api.repository.CommunityPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityPostRepository communityPostRepository;

    public List<CommunityPostDto> getAllPosts() {
        return communityPostRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public CommunityPostDto getPostById(UUID id) {
        CommunityPost post = communityPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community post not found with id: " + id));
        return mapToDto(post);
    }

    private CommunityPostDto mapToDto(CommunityPost post) {
        return CommunityPostDto.builder()
                .id(post.getId())
                .authorId(post.getAuthor().getId())
                .authorName(post.getAuthor().getFirstName() + " " + (post.getAuthor().getLastName() != null ? post.getAuthor().getLastName() : ""))
                .postType(post.getPostType())
                .title(post.getTitle())
                .content(post.getContent())
                .locationArea(post.getLocationArea())
                .status(post.getStatus())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
