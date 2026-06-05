package com.ecom.productservice.repo;

import com.ecom.productservice.model.Product;
import com.ecom.productservice.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductImgRepo extends JpaRepository<ProductImage, UUID>, JpaSpecificationExecutor<ProductImage> {

    Optional<ProductImage> findByProductId(UUID productId);
    //List<ProductImage> findByProductId(UUID productId);
    List<ProductImage> findAllByProductId(UUID productId);
}
