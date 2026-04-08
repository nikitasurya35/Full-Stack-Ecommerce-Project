package com.ecom.productservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//Builder example
//Product product = Product.builder()
//        .name("Wireless Earbuds Pro")
//        .sku("SKU-1021")
//        .price(new BigDecimal("849.00"))
//        .status("ACTIVE")
//        .isFeatured(true)
//        .build();

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "category_id", nullable = false)
    private UUID categoryId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "sku", nullable = false, unique = true)
    private String sku;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "compare_price", precision = 10, scale = 2)
    private BigDecimal comparePrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "images_json", columnDefinition = "TEXT")
    private String imagesJson;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "is_featured", nullable = false)
    private boolean isFeatured = false;

    @CreationTimestamp //automatically set the timestamp - once when the record is first inserted into the database
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp //automatically set the timestamp - Refreshed every time the record is saved or updated
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "product") //no column created, just a Java navigation field (mappedby field)
    private Inventory inventory;

}
