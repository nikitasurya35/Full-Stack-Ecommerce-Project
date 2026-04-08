package com.ecom.productservice.Dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class HomePageDto {
    private List<CategoryStockInfoDto> categoriesStockInfo;
    private List<ProductDetailsDto> products;
}
