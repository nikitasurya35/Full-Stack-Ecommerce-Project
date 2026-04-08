//All Read/Query business logic
package com.ecom.productservice.service;

import com.ecom.productservice.Dto.CategoryStockInfoDto;
import com.ecom.productservice.Dto.HomePageDto;
import com.ecom.productservice.Dto.ProductDetailsDto;
import com.ecom.productservice.Dto.ProductPerCategoryDto;
import com.ecom.productservice.projections.CategoryInfo;
import com.ecom.productservice.projections.ProductCount;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.InventoryRepo;
import com.ecom.productservice.repo.ProductRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductQuery {

    private static final Logger log = LoggerFactory.getLogger(ProductQuery.class);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final InventoryRepo inventoryRepo;


    public ProductQuery(ProductRepo productRepo, CategoryRepo categoryRepo, InventoryRepo inventoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.inventoryRepo = inventoryRepo;
    }



//    public List<String> ListOfCategories() {
//        List<String> name =  categoryRepo.findAllProjectedBy()
//                .stream()
//                .map(CategoryInfo::getCategoryName)
//                .collect(Collectors.toList());
//        //name.forEach(System.out::println);
//        return name;
//    }

//    public ProductPerCategoryDto NoOfProductsInCategory(String category_name) {
//        ProductCount result =  productRepo.findProductCountByCategory(category_name);
//        int total    = safe(result.getTotalCount());
//        int inStock  = safe(result.getInStockCount());
//        int outStock = safe(result.getOutOfStockCount());
//        ProductPerCategoryDto stockCount = new ProductPerCategoryDto(total, inStock, outStock);
//        return stockCount;
//    }

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



    public List<ProductDetailsDto> ProductDetails(List<UUID> categoryId, UUID productId) {

        // Case 1: Product ID present
        if (productId != null) {
            List<ProductDetailsDto> result = productRepo.findProductDetailsbyId(productId);
            result.forEach(p -> log.info("{}", p));
            return result;
        }

        // Case 2: Category filter
        if (categoryId != null && !categoryId.isEmpty()) {
            List<ProductDetailsDto> result = productRepo.findProductDetailsbyCategory(categoryId);
            result.forEach(p -> log.info("{}", p));
            return result;
        }

        // Case 3: Default → all products
        List<ProductDetailsDto> result = productRepo.findProductDetails();
        result.forEach(p -> log.info("{}", p));
        return result;


    }



    //Consolidating for Home Page
    public HomePageDto getHomeData(List<UUID> categoryId, UUID productId) {

        // Case 1: Product ID present
        if (productId != null){
            List<CategoryStockInfoDto> categoryStockInfo = null;
            List<ProductDetailsDto> products = ProductDetails(categoryId, productId);

            return HomePageDto.builder()
                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }

        if(categoryId != null && !categoryId.isEmpty()) {
            List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
            List<ProductDetailsDto> products = ProductDetails(categoryId, productId);

            return HomePageDto.builder()
                    .categoriesStockInfo(categoryStockInfo)
                    .products(products)
                    .build();
        }
        List<CategoryStockInfoDto> categoryStockInfo = CategoryStockInfo(categoryId);
        List<ProductDetailsDto> products = ProductDetails(categoryId, productId);

        return HomePageDto.builder()
                .categoriesStockInfo(categoryStockInfo)
                .products(products)
                .build();
    }

    private int safe(Long val) {
        return val != null ? val.intValue() : 0;
    }
}
