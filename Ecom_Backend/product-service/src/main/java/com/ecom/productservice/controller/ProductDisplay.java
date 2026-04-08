package com.ecom.productservice.controller;

import com.ecom.productservice.Dto.CategoryStockInfoDto;
import com.ecom.productservice.Dto.HomePageDto;
import com.ecom.productservice.Dto.ProductDetailsDto;
import com.ecom.productservice.Dto.ProductPerCategoryDto;
import com.ecom.productservice.service.ProductQuery;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
//@CrossOrigin(origins = "http://localhost:3000")
@Tag(name="Ecom_Backend", description = "APIs for Getting Product Details")
public class ProductDisplay {

    private final ProductQuery productQuery;
    public ProductDisplay(ProductQuery productQuery) {
        this.productQuery = productQuery;
    }


    //FrontEnd will send data like: GET /home?categoryId=abc,def&productId=xyz
    @GetMapping("/home")
    @Operation(summary = "Collection of all data to be displayed on home page")
    public ResponseEntity<HomePageDto> getHome(
            @RequestParam(required = false) List<UUID> categoryId,
            @RequestParam(required = false) UUID productId
    ) {
        return ResponseEntity.ok().body(productQuery.getHomeData(categoryId, productId));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get All Categories")
    public ResponseEntity<List<CategoryStockInfoDto>> getCategories(@RequestParam(required = false) List<UUID> categoryId) {
        List<CategoryStockInfoDto> stockInfo = productQuery.CategoryStockInfo(categoryId);
        return ResponseEntity.ok().body(stockInfo);
    }
//    public ResponseEntity<List<String>> getAllCategories() {
//        List<String> categories = productQuery.ListOfCategories();
//        return ResponseEntity.ok().body(categories);
//
//        //logic for stockcount as well
//    }

//    @GetMapping("/{$category}")
//    public ResponseEntity<ProductPerCategoryDto> getStockCount(@PathVariable("$category") String category) {
//        return ResponseEntity.ok().body(productQuery.NoOfProductsInCategory(category));
//    }

    //GET /products?categoryId=uuid1&categoryId=uuid2
    //?productId=123e4567-e89b-12d3-a456-426614174000
    @GetMapping("/products")
    public ResponseEntity<List<ProductDetailsDto>> getAllProducts(@RequestParam(required = false) List<UUID> categoryId, @RequestParam(required = false) UUID productId) {
        return ResponseEntity.ok().body(productQuery.ProductDetails(categoryId, productId));
    }

}
