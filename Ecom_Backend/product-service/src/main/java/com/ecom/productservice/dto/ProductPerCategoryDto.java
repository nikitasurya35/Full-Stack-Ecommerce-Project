//Used for counting number of items per category by their availabilty
package com.ecom.productservice.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductPerCategoryDto {
    private int totalCount;
    private int inStockCount;
    private int outOfStockCount;
}
