package com.ecom.productservice.mapper;

import com.ecom.productservice.dto.ImageResponseDto;
import com.ecom.productservice.model.ProductImage;
import org.springframework.stereotype.Component;

@Component
public class ProductImageMapper {
    //Since we are getting list of images, cannot use builder as it will be only for one image or will have to map it so that it can run for per image in a loop. Therefore mapper would be a better choice

    public ImageResponseDto DtoToImageValues(ProductImage productImage) {
        ImageResponseDto imageResponseDto = ImageResponseDto.builder()
                .imageId(productImage.getImageId())
                .productId(productImage.getProductId())
                .fileName(productImage.getFileName())
                .filePath(productImage.getFilePath())
                .imageUrl(productImage.getImageUrl())
                .createdAt(productImage.getCreatedAt())
                .build();
        return imageResponseDto;
    }

}
