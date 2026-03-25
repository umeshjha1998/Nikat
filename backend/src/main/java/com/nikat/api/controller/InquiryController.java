package com.nikat.api.controller;

import com.nikat.api.dto.InquiryDto;
import com.nikat.api.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/inquiries")
@RequiredArgsConstructor
public class InquiryController {
    private final InquiryService inquiryService;

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<InquiryDto>> getInquiriesByShop(@PathVariable UUID shopId) {
        return ResponseEntity.ok(inquiryService.getInquiriesByShop(shopId));
    }

    @PatchMapping("/{id}/reply")
    public ResponseEntity<InquiryDto> updateReply(@PathVariable UUID id, @RequestBody String reply) {
        // Simple string body for reply
        return ResponseEntity.ok(inquiryService.updateReply(id, reply));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable UUID id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.noContent().build();
    }
}
