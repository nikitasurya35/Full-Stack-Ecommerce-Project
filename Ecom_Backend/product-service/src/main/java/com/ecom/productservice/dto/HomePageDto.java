package com.ecom.productservice.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomePageDto {
    private List<CategoryStockInfoDto> categoriesStockInfo;
    private List<ProductDetailsDto> products;
}
