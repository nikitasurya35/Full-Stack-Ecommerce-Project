package com.ecom.productservice.Dto;

import lombok.*;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CategoryStockInfoDto {
    private String categoryName;
    private UUID categoryId;
    private Long totalCount;
    private Long inStockCount;
    private Long outOfStockCount;
}
