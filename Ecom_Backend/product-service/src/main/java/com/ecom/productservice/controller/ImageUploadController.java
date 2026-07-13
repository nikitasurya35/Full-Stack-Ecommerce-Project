package com.ecom.productservice.controller;

import com.ecom.productservice.dto.ImageResponseDto;
import com.ecom.productservice.dto.ProductSlugDto;
import com.ecom.productservice.service.ImageUploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name="Ecom_Backend", description = "APIs for uploading image")

public class ImageUploadController {

    private final Logger log = LoggerFactory.getLogger(ImageUploadController.class);
    private final ImageUploadService imageUploadService;

    public ImageUploadController(ImageUploadService imageUploadService) {
        this.imageUploadService = imageUploadService;
    }

    @GetMapping("/slugs")
    @Operation(summary = "List of Slugs and respective product ids")
    public ResponseEntity<List<ProductSlugDto>> getProductSlugs(){
        List<ProductSlugDto> slugs = imageUploadService.getSlugInfo();
        return ResponseEntity.ok().body(slugs);
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Upload the Image")
    public ResponseEntity<String> uploadImage(
            @RequestParam UUID productId,
            @RequestParam MultipartFile file) {

        imageUploadService.imageUpload(productId, file);
        return ResponseEntity.ok("Image uploaded");
    }

    @DeleteMapping("delete/{productId}")
    @Operation(summary = "Delete the Image")
    public ResponseEntity<String> deleteImage(@PathVariable UUID productId) {
        imageUploadService.deleteImage(productId);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("product/{productId}")
    @Operation(summary = "Get the images corresponding to the productId")
    public ResponseEntity<List<ImageResponseDto>> getImage(@PathVariable UUID productId) {

        log.info("Searching images for productId={}", productId);
        return ResponseEntity.ok().body(imageUploadService.getImagesByProduct(productId));
    }
}
