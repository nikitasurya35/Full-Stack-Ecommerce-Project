package com.ecom.productservice.service;

import com.ecom.productservice.dto.CategoryStockInfoDto;
import com.ecom.productservice.mapper.ProductMapper;
import com.ecom.productservice.repo.CategoryRepo;
import com.ecom.productservice.repo.InventoryRepo;
import com.ecom.productservice.repo.ProductRepo;
import com.ecom.productservice.specifications.ProductSpecifications;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

@ExtendWith(MockitoExtension.class)
class ProductQueryTest {

    // ---- Mockito fakes for every constructor dependency of ProductQuery ----
    @Mock
    private ProductRepo productRepo;

    // Mockito builds a real ProductQuery and injects the mocks above into its constructor
    @InjectMocks
    private ProductQuery productQuery;

    /**
     * Requirement under test:
     *   CategoryStockInfo(categoryId):
     *     - non-empty categoryId list -> calls productRepo.findCategoryStockInfobyId(categoryId)
     *                                     and NEVER productRepo.findCategoryStockInfo()
     *     - null or empty categoryId  -> calls productRepo.findCategoryStockInfo()
     *                                     and NEVER productRepo.findCategoryStockInfobyId(...)
     */

    @Test // JUnit 5: marks this method as an executable test case
    @DisplayName("CategoryStockInfo: with categoryId list present, queries by category and skips the 'all categories' query")
    void categoryStockInfo_withCategoryIDs_callsFindCategoryStockInfobyId() {

        //Values Required
        List<UUID> categoryIds = List.of(UUID.randomUUID());
        CategoryStockInfoDto dto = CategoryStockInfoDto.builder()
                .categoryName("Electronics")
                .categoryId(categoryIds.get(0))
                .totalCount(10L)
                .inStockCount(7L)
                .outOfStockCount(3L)
                .build();

        // Mockito: stub only the method we expect to be called
        when(productRepo.findCategoryStockInfobyId(categoryIds)).thenReturn(List.of(dto));

        //Call
        List<CategoryStockInfoDto> result = productQuery.CategoryStockInfo(categoryIds);

        //Verify
        // JUnit 5 assertion: the mocked data flowed through untouched
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getCategoryName());
        // Mockito verify: the "by id" query ran exactly once...
        verify(productRepo, times(1)).findCategoryStockInfobyId(categoryIds);
        // ...and the "all categories" query never ran
        verify(productRepo, never()).findCategoryStockInfo();
    }

    @Test
    @DisplayName("CategoryStockInfo: with categoryId list is null, queries by 'all categories' query")
    void categoryStockInfo_withNullCategoryID_callsfindCategoryStockInfo(){
        CategoryStockInfoDto dto = CategoryStockInfoDto.builder()
                .categoryName("Electronics")
                .categoryId(UUID.randomUUID())
                .totalCount(10L)
                .inStockCount(7L)
                .outOfStockCount(3L)
                .build();

        // Mockito: stub only the method we expect to be called
        when(productRepo.findCategoryStockInfo()).thenReturn(List.of(dto));

        //Call
        List<CategoryStockInfoDto> result = productQuery.CategoryStockInfo(null);

        // JUnit 5 assertion: the mocked data flowed through untouched
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getCategoryName());
        // Mockito verify: the "without id" query ran exactly once...
        verify(productRepo, times(1)).findCategoryStockInfo();
        // any(), not a specific list, since this branch should never call the "by id" overload at all
        verify(productRepo, never()).findCategoryStockInfobyId(any());
    }

    @Test
    @DisplayName("CategoryStockInfo: with categoryId list is empty, queries by 'all categories' query")
    void categoryStockInfo_withEmptyCategoryID_callsfindCategoryStockInfo(){
        //Values Required
        List<UUID> categoryIds = List.of();
        CategoryStockInfoDto dto = CategoryStockInfoDto.builder()
                .categoryName("Electronics")
                .categoryId(UUID.randomUUID())
                .totalCount(10L)
                .inStockCount(7L)
                .outOfStockCount(3L)
                .build();

        // Mockito: stub only the method we expect to be called
        when(productRepo.findCategoryStockInfo()).thenReturn(List.of(dto));

        //Call
        List<CategoryStockInfoDto> result = productQuery.CategoryStockInfo(categoryIds);

        // JUnit 5 assertion: the mocked data flowed through untouched
        assertEquals(1, result.size());
        assertEquals("Electronics", result.get(0).getCategoryName());
        // Mockito verify: the "without id" query ran exactly once...
        verify(productRepo, times(1)).findCategoryStockInfo();
        // any(), not a specific list, since this branch should never call the "by id" overload at all
        verify(productRepo, never()).findCategoryStockInfobyId(any());
    }
}