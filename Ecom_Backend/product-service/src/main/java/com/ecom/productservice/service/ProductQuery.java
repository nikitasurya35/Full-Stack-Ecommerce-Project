//All Read/Query business logic
package com.ecom.productservice.service;

import com.ecom.productservice.Dto.CategoryStockInfoDto;
import com.ecom.productservice.Dto.HomePageDto;
import com.ecom.productservice.Dto.ProductDetailsDto;
import com.ecom.productservice.Dto.ProductPerCategoryDto;
import com.ecom.productservice.Mapper.ProductMapper;
import com.ecom.productservice.model.Product;
import com.ecom.productservice.projections.CategoryInfo;
import com.ecom.productservice.projections.ProductCount;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.InventoryRepo;
import com.ecom.productservice.repo.ProductRepo;
import com.ecom.productservice.specifications.ProductSpecifications;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public List<ProductDetailsDto> getProductDetails(
            List<UUID> categoryId,
            UUID productId,
            Boolean stockStatus,
            String sortBy
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
        // Case 3: Default → all products
        if (stockStatus != null){
            spec = spec.and(productSpecifications.hasStockStatus(stockStatus));
        }

        //Sorting
        Sort sort = buildSort(sortBy);

        //Query
        List<Product> products = productRepo.findAll(spec, sort);

        //DTO conversion
        List<ProductDetailsDto> dtoList = products.stream().map(p -> productMapper.toProductDetailDTO(p)).toList();
        dtoList.forEach(p -> log.info("{}", p));

        return dtoList;


        // Case 1: Product ID present
//        if (productId != null) {
//            List<ProductDetailsDto> result = productRepo.findProductDetailsbyId(productId);
//            result.forEach(p -> log.info("{}", p));
//            return result;
//        }
//
//        // Case 2: Category filter
//        if (categoryId != null && !categoryId.isEmpty()) {
//            List<ProductDetailsDto> result = productRepo.findProductDetailsbyCategory(categoryId);
//            result.forEach(p -> log.info("{}", p));
//            return result;
//        }
//
        // Case 3: Default → all products
//        List<ProductDetailsDto> result = productRepo.findProductDetails();
//        result.forEach(p -> log.info("{}", p));
//        return result;


//        // Default
//        else {
//            List<ProductDetailsDto> result = productRepo.findProductDetails();
//            result.forEach(p -> log.info("{}", p));
//            return result;
//        }
    }



    //Consolidating for Home Page
    public HomePageDto getHomeData(List<UUID> categoryId, UUID productId, Boolean stockStatus, String sortBy)
    {

        // Case 1: Product ID present
        if (productId != null){
            List<CategoryStockInfoDto> categoryStockInfo = null;
            List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);

            return HomePageDto.builder()
                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        //Case 2: Category Selected
        if(categoryId != null && !categoryId.isEmpty()) {
            List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
            List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);

            return HomePageDto.builder()
                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        //Case 3: StockStatus is selected
        if(stockStatus != null){
            List<CategoryStockInfoDto> categoryStockInfo = null;
            List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);

            return HomePageDto.builder()
                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        //Case 4: Nothing is selected
        List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
        List<ProductDetailsDto> products = getProductDetails(categoryId, productId, stockStatus, sortBy);

        return HomePageDto.builder()
                .categoriesStockInfo(categoryStockInfo)
                .products(products)
                .build();
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
            case "featured" -> Sort.by("featured").ascending();
            case "new" -> Sort.by("createdAt").ascending();
            case "old" -> Sort.by("createdAt").descending();
            default -> Sort.unsorted();
        };
    }
}
