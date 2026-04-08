package com.ecom.productservice.projections;

public interface ProductCount {
    Long getTotalCount();
    Long getInStockCount();
    Long getOutOfStockCount();
}
