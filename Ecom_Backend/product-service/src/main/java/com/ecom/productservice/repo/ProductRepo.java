package com.ecom.productservice.repo;

import com.ecom.productservice.Dto.CategoryStockInfoDto;
import com.ecom.productservice.Dto.ProductDetailsDto;
import com.ecom.productservice.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepo extends JpaRepository<Product, UUID> {

    //Count of Products per category by status
//    @Query("""
//    SELECT COUNT(p.id) as totalCount,
//        SUM(CASE WHEN (i.quantity - i.reservedQuantity) > 0 THEN 1 ELSE 0 END) AS inStockCount,
//        SUM(CASE WHEN (i.quantity - i.reservedQuantity) <= 0 THEN 1 ELSE 0 END) AS outOfStockCount
//    FROM Product p
//    JOIN Inventory i on i.product = p
//    JOIN Category c on p.categoryId = c.id
//    WHERE c.categoryName = :category
//    """)
//    ProductCount findProductCountByCategory(@Param("category") String category);

    //Category Stock Information //To be shown HomePage - onLoad
    @Query("""
    SELECT new com.ecom.productservice.Dto.CategoryStockInfoDto(
        c.categoryName,
        c.id,
        COUNT(p.id),
        SUM(CASE WHEN (i.quantity - i.reservedQuantity) > 0 THEN 1 ELSE 0 END),
        SUM(CASE WHEN (i.quantity - i.reservedQuantity) <= 0 THEN 1 ELSE 0 END)
        )
    FROM Product p
    JOIN Inventory i on i.product = p
    JOIN Category c on p.categoryId = c.id
    GROUP BY c.categoryName, c.id
    """)
    List<CategoryStockInfoDto> findCategoryStockInfo();



    //Category Stock Information by selected Categories - onClick
    @Query("""
    SELECT new com.ecom.productservice.Dto.CategoryStockInfoDto(
        c.categoryName,
        c.id,
        COUNT(p.id),
        SUM(CASE WHEN (i.quantity - i.reservedQuantity) > 0 THEN 1 ELSE 0 END),
        SUM(CASE WHEN (i.quantity - i.reservedQuantity) <= 0 THEN 1 ELSE 0 END)
        )
    FROM Product p
    JOIN Inventory i on i.product = p
    JOIN Category c on p.categoryId = c.id
    WHERE c.id IN :categoryId
    GROUP BY c.categoryName, c.id
    """)
    List<CategoryStockInfoDto> findCategoryStockInfobyId(@Param("categoryId") List<UUID> categoryId);



    //ALL Product Details - HomePage - onLoad - 'all Categories -onClick'
    // JPQL does NOT allow AS inside constructor projection
    // JPQL returns wrapper types (Integer, Long) (therefore, DTO projections must have wrapper types instead of primitive types)
    @Query(""" 
    SELECT new com.ecom.productservice.Dto.ProductDetailsDto
        (
        p.id,
        p.productName,
        c.categoryName, 
        c.id,
        p.price, 
        p.comparePrice, 
        (i.quantity - i.reservedQuantity), 
        p.createdAt, 
        p.status, 
        p.imageUrl
        )
    FROM Product p
    JOIN Inventory i on i.product = p 
    JOIN Category c on p.categoryId = c.id
    """)
    List<ProductDetailsDto> findProductDetails();


    // Product Details by category selected - onClick
    @Query(""" 
    SELECT new com.ecom.productservice.Dto.ProductDetailsDto
        (
        p.id,
        p.productName,
        c.categoryName, 
        c.id,
        p.price, 
        p.comparePrice, 
        (i.quantity - i.reservedQuantity), 
        p.createdAt, 
        p.status, 
        p.imageUrl
        )
    FROM Product p
    JOIN Inventory i on i.product = p 
    JOIN Category c on p.categoryId = c.id
    WHERE c.id IN :categoryId
    """)
    List<ProductDetailsDto> findProductDetailsbyCategory(@Param("categoryId") List<UUID> categoryId);



    // Product Details by product id - onClick
    @Query(""" 
    SELECT new com.ecom.productservice.Dto.ProductDetailsDto
        (
        p.id,
        p.productName,
        c.categoryName, 
        c.id,
        p.price, 
        p.comparePrice, 
        (i.quantity - i.reservedQuantity), 
        p.createdAt, 
        p.status, 
        p.imageUrl
        )
    FROM Product p
    JOIN Inventory i on i.product = p 
    JOIN Category c on p.categoryId = c.id
    WHERE p.id = :productId
    """)
    List<ProductDetailsDto> findProductDetailsbyId(@Param("productId") UUID productId);






}
