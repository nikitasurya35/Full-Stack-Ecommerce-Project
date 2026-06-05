package com.ecom.productservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponseDto {

    private UUID imageId;

    private UUID productId;

    private String fileName;

    private String filePath;

    private String imageUrl;

    private LocalDateTime createdAt;
}
