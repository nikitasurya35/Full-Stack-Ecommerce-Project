package com.ecom.productservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "product_image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImage {

    @Id
    private UUID imageId;

    private UUID productId;

    private String fileName;

    private String filePath;

    private String imageUrl;

    private LocalDateTime createdAt;
}
