package com.ecom.productservice.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ProductDetailsDto {
    private UUID id;

    private String productName;

    private String categoryName;

    private UUID categoryId;

    private BigDecimal price;

    private BigDecimal comparePrice;

    private Integer availableStock;

    //@JsonFormat(pattern = "dd MMM yyyy, hh:mm a") - to format the LocalDtetime method which is in ISO standard
    private LocalDateTime createdAt;

    private String status;

    private String productImageUrl;
}
