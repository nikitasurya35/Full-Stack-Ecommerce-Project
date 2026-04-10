package com.ecom.productservice.specifications;

import com.ecom.productservice.model.Inventory;
import com.ecom.productservice.model.Product;
import jakarta.persistence.Column;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class ProductSpecifications {

    //Make methods static (no bean needed) - therefore no need for @component or @service required
    //Case 1: Filter by ProductId
    public Specification<Product> hasProductId(UUID productId) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (productId == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("id"), productId);
        };
    }

    public Specification<Product> hasCategoryId(List<UUID> categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null || categoryId.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return root.get("categoryId").in(categoryId);
        };
    }

    public Specification<Product> hasStockStatus(Boolean stockStatus) {
        return (root,query, criteriaBuilder ) -> {
            if(stockStatus == null){
                return criteriaBuilder.conjunction();
            }

            // Calculate available stock: quantity - reservedQuantity
            Expression<Integer> availableStock = criteriaBuilder.diff(
                    root.get("inventory").get("quantity"),
                    root.get("inventory").get("reservedQuantity")
            );

            //Here Join is required because 'Inventory' is a mapped reference in Product entity, ie Inventory table is owning side and not product
            //On the other hand, for abv method, category is being joined because Product entity has owning side as category_id is used as FK
            Join<Product, Inventory> inventory = root.join("inventory");

            // If inStock = true, available stock > 0
            // If inStock = false, available stock <= 0
            return stockStatus ? criteriaBuilder.greaterThan(availableStock, 0) : criteriaBuilder.lessThanOrEqualTo(availableStock, 0);
        };
    }

    // For DTO projection
    public static Specification<Product> withInventoryAndCategory() {
        return (root, query, cb) -> {
            // Fetch joins to avoid N+1 queries
            root.fetch("inventory");
            root.fetch("category");
            query.distinct(true); // avoid duplicates
            return cb.conjunction();
        };
    }

}
