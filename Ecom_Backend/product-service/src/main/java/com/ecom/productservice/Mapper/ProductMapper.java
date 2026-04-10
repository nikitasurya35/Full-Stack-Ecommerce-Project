package com.ecom.productservice.Mapper;

import com.ecom.productservice.Dto.ProductDetailsDto;
import com.ecom.productservice.model.Category;
import com.ecom.productservice.model.Inventory;
import com.ecom.productservice.model.Product;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProductMapper {

    public static ProductDetailsDto toProductDetailDTO(Product p) {
        //ProductDetailsDto productDetailsDto = new ProductDetailsDto();
        Inventory inventory = p.getInventory();
        Category category = p.getCategory();
        return new ProductDetailsDto(
                p.getId(),
                p.getProductName(),
                category.getCategoryName(),
                category.getId(),
                p.getPrice(),
                p.getComparePrice(),
                inventory.getQuantity() - inventory.getReservedQuantity(), // Available stock
                p.getCreatedAt(),
                p.getStatus(),
                p.getImageUrl()
        );

    }
}
