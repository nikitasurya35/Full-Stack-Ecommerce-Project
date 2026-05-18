package com.ecom.productservice.dto;

import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryStockInfoDto {
    private String categoryName;
    private UUID categoryId;
    private Long totalCount;
    private Long inStockCount;
    private Long outOfStockCount;
}
