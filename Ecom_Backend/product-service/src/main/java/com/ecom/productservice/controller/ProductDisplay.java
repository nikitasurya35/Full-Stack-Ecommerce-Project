package com.ecom.productservice.controller;

import com.ecom.productservice.dto.*;
import com.ecom.productservice.service.ProductQuery;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name="Ecom_Backend", description = "APIs for Getting Product Details")
public class ProductDisplay {

    private final ProductQuery productQuery;
    public ProductDisplay(ProductQuery productQuery) {
        this.productQuery = productQuery;
    }


    //FrontEnd will send data like: GET /home?categoryId=abc,def&productId=xyz
    @GetMapping("/homeapp")
    @Operation(summary = "Collection of all data to be displayed on home page")
    public ResponseEntity<HomePageDto> getHome(
            @RequestParam(required = false) List<UUID> categoryId,
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) Boolean stockStatus,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok().body(productQuery.getHomeData(categoryId, productId, stockStatus, sortBy, page, size, keyword));
    }

    @GetMapping("/categories")
    @Operation(summary = "Get All Categories")
    public ResponseEntity<List<CategoryStockInfoDto>> getCategories(@RequestParam(required = false) List<UUID> categoryId) {
        List<CategoryStockInfoDto> stockInfo = productQuery.CategoryStockInfo(categoryId);
        return ResponseEntity.ok().body(stockInfo);
    }


    //GET /products?categoryId=uuid1&categoryId=uuid2
    //?productId=123e4567-e89b-12d3-a456-426614174000
    @GetMapping("/products")
    @Operation(summary = "List of Products")
    public ResponseEntity<Page<ProductDetailsDto>> getAllProducts(
            @RequestParam(required = false) List<UUID> categoryId,
            @RequestParam(required = false) UUID productId,
            @RequestParam(required = false) Boolean stockStatus,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword

    ) {
        return ResponseEntity.ok().body(productQuery.getProductDetails(categoryId, productId, stockStatus, sortBy, page, size, keyword));
    }

    @GetMapping("/suggestions")
    @Operation(summary = "Get list of all productnames related to the keyword typed in the search bar")
    public ResponseEntity<List<SearchSuggestionDto>> getKeywordRelatedProductNames(@RequestParam(required = false) String keyword){
        return ResponseEntity.ok().body(productQuery.SearchSuggestions(keyword));
    }

//    @GetMapping("/searchProducts")
//    @Operation(summary = "Get list of all products related to the keyword typed in the search bar")
//    public ResponseEntity<List<ProductDetailsDto>> getKeywordRelatedProduct(@RequestParam(required = false) String keyword){
//        return ResponseEntity.ok().body(productQuery.SearchProducts(keyword));
//    }


}
