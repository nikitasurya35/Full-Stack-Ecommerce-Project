//Used for counting number of items per category by their availabilty
package com.ecom.productservice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
@Getter
@Setter
public class ProductPerCategoryDto {
    private int totalCount;
    private int inStockCount;
    private int outOfStockCount;
}
