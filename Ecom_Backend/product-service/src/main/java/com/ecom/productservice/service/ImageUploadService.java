package com.ecom.productservice.service;

import com.ecom.productservice.model.Product;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ecom.productservice.repo.ProductRepo;
import java.util.UUID;


@Service
public class ImageUploadService {

    private final Logger logger = LoggerFactory.getLogger(ImageUploadService.class);
    private final ProductRepo productRepo;

    public ImageUploadService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    @Transactional //This is used so that even if any one database writes fails, all updates are rolled back so that database will not be inconsistent
    public void imageUpload(UUID productId,
                            MultipartFile file)
    {
        Product product = productRepo.findById(productId).orElseThrow(() ->
            new RuntimeException("Product not found"));

        String fileName = UUID.randomUUID() + "_" + product.getSlug();
    }
}
