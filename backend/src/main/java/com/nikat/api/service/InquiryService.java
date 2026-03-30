package com.nikat.api.service;

import com.nikat.api.domain.Inquiry;
import com.nikat.api.dto.InquiryDto;
import com.nikat.api.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InquiryService {
    private final InquiryRepository inquiryRepository;

    public List<InquiryDto> getInquiriesByShop(String shopId) {
        return inquiryRepository.findByShopId(shopId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public InquiryDto updateReply(UUID inquiryId, String reply) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));
        inquiry.setReply(reply);
        inquiry.setStatus("REPLIED");
        return mapToDto(inquiryRepository.save(inquiry));
    }

    public void deleteInquiry(UUID inquiryId) {
        inquiryRepository.deleteById(inquiryId);
    }

    private InquiryDto mapToDto(Inquiry inquiry) {
        return InquiryDto.builder()
                .id(inquiry.getId())
                .userId(inquiry.getUser().getId())
                .userName(inquiry.getUser().getFirstName() + " " + (inquiry.getUser().getLastName() != null ? inquiry.getUser().getLastName() : ""))
                .userAvatar(inquiry.getUser().getPhotoData())
                .shopId(inquiry.getShop() != null ? inquiry.getShop().getId() : null)
                .message(inquiry.getMessage())
                .reply(inquiry.getReply())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .build();
    }
}
