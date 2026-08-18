package com.ecom.productservice.service;
import com.ecom.productservice.mapper.ProductImageMapper;
import com.ecom.productservice.repo.ProductImgRepo;
import com.ecom.productservice.repo.ProductRepo;
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
public class ImageUploadServiceTests {
    @Mock
    private ProductRepo productRepo;

    @Mock
    private ProductImgRepo  productImgRepo;

    @Mock
    private ProductImageMapper productImageMapper;

    @InjectMocks
    private ImageUploadService imageUploadService;

}
