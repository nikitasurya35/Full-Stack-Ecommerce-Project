//All Read/Query business logic
package com.ecom.productservice.service;

import com.ecom.productservice.dto.*;
import com.ecom.productservice.mapper.ProductMapper;
import com.ecom.productservice.model.Product;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.InventoryRepo;
import com.ecom.productservice.repo.ProductRepo;
import com.ecom.productservice.specifications.ProductSpecifications;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductQuery {

    private static final Logger log = LoggerFactory.getLogger(ProductQuery.class);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final InventoryRepo inventoryRepo;
    private final ProductSpecifications productSpecifications;
    private final ProductMapper productMapper;


    public ProductQuery(ProductRepo productRepo, CategoryRepo categoryRepo, InventoryRepo inventoryRepo, ProductSpecifications productSpecifications, ProductMapper productMapper) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.inventoryRepo = inventoryRepo;
        this.productSpecifications = productSpecifications;
        this.productMapper = productMapper;
    }


    public List<CategoryStockInfoDto> CategoryStockInfo(List<UUID> categoryId) {

        //Case 1: Multiple/One Categories Selected
        if (categoryId != null && !categoryId.isEmpty()) {
            List<CategoryStockInfoDto> result = productRepo.findCategoryStockInfobyId(categoryId);
            result.forEach(p -> log.info("{}", p));
            return result;
        }

        //Case 2: No Category Selected
        List<CategoryStockInfoDto> result = productRepo.findCategoryStockInfo();
        result.forEach(p -> log.info("{}", p));
        return result;
    }


    //Uses Spring JPA CriteriaAPI
    //Was previously List -> now made the return 'Page'
    public Page<ProductDetailsDto> getProductDetails(
            List<UUID> categoryId,
            UUID productId,
            Boolean stockStatus,
            String sortBy,
            int page,
            int size,
            String keyword
    ) {

        // Build dynamic specification
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();

        //Filters
        //Case 1: Product ID present
        if (productId != null){
            spec = spec.and(productSpecifications.hasProductId(productId));
        }
        // Case 2: Category filter
        if (categoryId != null && !categoryId.isEmpty()){
            spec = spec.and(productSpecifications.hasCategoryId(categoryId));
        }
        // Case 3: Stock status present
        if (stockStatus != null){
            spec = spec.and(productSpecifications.hasStockStatus(stockStatus));
        }
        if (keyword != null && !keyword.isEmpty()){
            spec = spec.and(productSpecifications.hasProductNameContaining(keyword));
        }

        //Sorting
        Sort sortval = buildSort(sortBy);

        //Paging of Web products
        Pageable pageable = PageRequest.of(
                page,
                size,
                sortval
        );

        //Query
        //List<Product> products = productRepo.findAll(spec, sort);
        Page<Product> products = productRepo.findAll(spec, pageable);

        //DTO conversion
        //List<ProductDetailsDto> dtoList = products.stream().map(p -> productMapper.toProductDetailDTO(p)).toList();
        Page<ProductDetailsDto> dtoList = products.map(productMapper::toProductDetailDTO);
        dtoList.forEach(p -> log.info("ProductDetails::::: {}", p));

        return dtoList;


    }



    //Consolidating for Home Page
    public HomePageDto getHomeData(List<UUID> categoryId, UUID productId, Boolean stockStatus, String sortBy, int page, int size, String keyword)
    {

        // Case 1: Product ID present
        if (productId != null){
//            List<CategoryStockInfoDto> categoryStockInfo = null;
            //List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);
            Page<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy, page, size, keyword );

            return HomePageDto.builder()
//                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        //Case 2: Category Selected
        if(categoryId != null && !categoryId.isEmpty()) {
//            List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
//            List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);
            Page<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy, page, size , keyword );

            return HomePageDto.builder()
//                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        //Case 3: StockStatus is selected
        if(stockStatus != null || sortBy != null){
//            List<CategoryStockInfoDto> categoryStockInfo = null;
//            List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);
            Page<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy, page, size , keyword );

            return HomePageDto.builder()
//                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        if(keyword != null && !keyword.isEmpty()){
            Page<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy, page, size , keyword );
            return HomePageDto.builder()
                    .products(products)
                    .build();
        }

        //Case 0: Nothing is selected
        List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
//        List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);
        Page<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy, page, size , keyword );

        return HomePageDto.builder()
//                .categoriesStockInfo(categoryStockInfo)
                .products(products)
                .build();
    }

    //To get dropdown of all related productnames from db in the search bar
    public List<SearchSuggestionDto> SearchSuggestions(String keyword) {
        log.info("KEYWORD: {}",keyword);
        List<SearchSuggestionDto> suggestions = productRepo.findSuggestions(keyword);
        suggestions.forEach(s -> log.info("PRODUCT NAMES:: {}", s));
        return suggestions;
    }

    public List<ProductDetailsDto> SearchProducts(String keyword) {
        log.info("KEYWORDssss: {}",keyword);

        // Build dynamic specification
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();
        spec = spec.and(productSpecifications.hasProductNameContaining(keyword));
        log.info("SPEC: {}",spec);

        //Query
        List<Product> products = productRepo.findAll(spec);

        //DTO conversion
        List<ProductDetailsDto> dtoList = products.stream().map(p -> productMapper.toProductDetailDTO(p)).toList();
        dtoList.forEach(p -> log.info("PRODUCTS:: {}", p));

        return dtoList;

    }


    static int safe(Long val) {
        return val != null ? val.intValue() : 0;
    }

    static Sort buildSort(String sortBy) {
        if(sortBy == null || sortBy.isEmpty()){
            return Sort.unsorted();
        }
        return switch (sortBy.toLowerCase()){
            case "price_low_to_high" -> Sort.by("price").ascending();
            case "price_high_to_low" -> Sort.by("price").descending();
            case "featured" -> Sort.by("isFeatured").ascending();
            case "new" -> Sort.by("createdAt").ascending();
            case "old" -> Sort.by("createdAt").descending();
            default -> Sort.unsorted();
        };
    }

}
