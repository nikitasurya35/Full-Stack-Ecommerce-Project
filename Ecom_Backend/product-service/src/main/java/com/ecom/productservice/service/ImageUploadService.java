package com.ecom.productservice.service;

import com.ecom.productservice.dto.ImageResponseDto;
import com.ecom.productservice.dto.ProductSlugDto;
import com.ecom.productservice.mapper.ProductImageMapper;
import com.ecom.productservice.model.Product;
import com.ecom.productservice.model.ProductImage;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.ProductImgRepo;
import com.ecom.productservice.repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ecom.productservice.repo.ProductRepo;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class ImageUploadService {

    private final Logger log = LoggerFactory.getLogger(ImageUploadService.class);
    private final ProductRepo productRepo;
    private final ProductImgRepo productImgRepo;
    private final ProductImageMapper productImageMapper;

    public ImageUploadService(ProductRepo productRepo, ProductImgRepo productImgRepo, ProductImageMapper productImageMapper) {
        this.productRepo = productRepo;
        this.productImgRepo = productImgRepo;
        this.productImageMapper = productImageMapper;
    }

    @Value("${file.upload-dir}") //References the field from properties file
    private String uploadDir;

     //@Transactional -> This is used so that even if any one database writes fails, all updates are rolled back so that database will not be inconsistent //All database operations inside this method run in a single transaction.
    @Transactional
    public void imageUpload(UUID productId,MultipartFile file)
    {
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        String fileName = UUID.randomUUID() + "_" + product.getSlug();
        Path filePath = Paths.get(uploadDir).toAbsolutePath();

        try{
            Files.createDirectories(filePath);
        }catch (Exception ex){
            System.out.println("Folder already exists");
            ex.printStackTrace();
        }

        Path targetFilePath = filePath.resolve(fileName); //To create filepath with the uploaded image name

        try {
            file.transferTo(targetFilePath); //This is the actual upload of File
        }catch (Exception ex){
            System.out.println("File upload failed");
            ex.printStackTrace();
        }

        String imageUrl = "/images/" + fileName;
        Optional<ProductImage> existingImg = productImgRepo.findByProductId(productId);

        //If there is an existing entry for the image, will update only changed values
        if (existingImg.isPresent()) {
            ProductImage productImage = existingImg.get();
            log.info("####Product image exists###");
            try {
                Files.deleteIfExists(Paths.get(productImage.getFilePath()));
                log.info("Product image delete successfull:{} ", productImage.getProductId());
            }catch (Exception ex){
                log.info("Product image delete failed for Pid:{} ", productImage.getProductId());
                ex.printStackTrace();
            }

            productImage.setImageUrl(imageUrl);
            productImage.setFilePath(targetFilePath.toString());
            productImage.setFileName(fileName);
            productImgRepo.save(productImage);

            product.setImageUrl(imageUrl);
            productRepo.save(product);
            log.info("Product imageURL successfull:{} ", product.getImageUrl());

        } else  {
            ProductImage productImage = ProductImage.builder()
                    .imageId(UUID.randomUUID())
                    .productId(productId)
                    .fileName(fileName)
                    .filePath(targetFilePath.toString())
                    .imageUrl(imageUrl)
                    .createdAt(LocalDateTime.now())
                    .build();
            productImgRepo.save(productImage);

            product.setImageUrl(imageUrl);
            productRepo.save(product);
            log.info("Product imageURL successfull: {}" , product.getImageUrl());
        }
    }

    @Transactional
    public void deleteImage(UUID productId) {

        ProductImage img = productImgRepo.findByProductId(productId).orElseThrow(() -> new RuntimeException("Product Image not found"));
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        productImgRepo.delete(img);

        product.setImageUrl(null);
        productRepo.save(product);

    }

    public List<ProductSlugDto> getSlugInfo() {
        return productRepo.findAll()
                .stream()
                .map(product -> new ProductSlugDto(product.getId(),product.getSlug()))
                .toList();
    }

    public List<ImageResponseDto> getImagesByProduct(UUID productId) {

        List<ProductImage> img = productImgRepo.findAllByProductId(productId);
        img.forEach(i->log.info("image information {}", i));
        return img
                .stream()
                .map(productImageMapper::DtoToImageValues) //When A method reference with ClassName::methodName can only be used if the method is static. To resove this either make that method static or Inject that class in the file you are using the method (Dependecy Injection)
                .toList();

    }
}
