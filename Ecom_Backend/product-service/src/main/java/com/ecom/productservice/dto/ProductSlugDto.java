package com.ecom.productservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ProductSlugDto {
    private UUID productId;

    private String productSlug;
}
