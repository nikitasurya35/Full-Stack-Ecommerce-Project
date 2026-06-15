package com.ecom.productservice.dto;

import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomePageDto {
    //private List<CategoryStockInfoDto> categoriesStockInfo;
    private Page<ProductDetailsDto> products;
//    private List<ProductDetailsDto> products;
}
