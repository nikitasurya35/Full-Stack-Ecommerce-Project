package com.ecom.productservice.service;

import com.ecom.productservice.controller.ImageUploadController;
import com.ecom.productservice.dto.ImageResponseDto;
import com.ecom.productservice.exceptions.ResourceNotFoundException;
import com.ecom.productservice.service.ImageUploadService;

// ---- JUnit 5 ----
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

// ---- Spring's test support (drives MockMvc, wires @MockBean) ----
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

// ---- Mockito ----
import static org.mockito.Mockito.*;


// ---- MockMvc's fluent request/response DSL ----
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ImageUploadController.class) // Spring loads ONLY the web layer for this controller
class ImageUploadControllerTest {

    @Autowired
    private MockMvc mockMvc; // fires fake HTTP requests, no real server/port

    @Mock // Mockito mock, registered into the Spring context in place of the real service
    private ImageUploadService imageUploadService;

    @Test
    @DisplayName("POST /api/images/upload returns 200 and delegates to the service")
    void uploadImage_validRequest_returnsOk() throws Exception {
        UUID productId = UUID.randomUUID();

        MockMultipartFile file = new MockMultipartFile(
                "file", "photo.png", "image/png", "fake-image-bytes".getBytes());

        // Mockito: imageUpload(...) returns void, so by default the mock just does nothing -
        // no stubbing needed unless we want to throw or verify args later.

        mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("productId", productId.toString()))
                .andExpect(status().isOk())                     // JUnit-style assertion, via MockMvc's matcher API
                .andExpect(content().string("Image uploaded"));

        // Mockito verify: confirm the controller actually called the service with the right args
        verify(imageUploadService).imageUpload(eq(productId), any());
    }

    @Test
    @DisplayName("POST /api/images/upload returns 404 when the service reports product not found")
    void uploadImage_productNotFound_returns404() throws Exception {
        UUID productId = UUID.randomUUID();
        MockMultipartFile file = new MockMultipartFile(
                "file", "photo.png", "image/png", "bytes".getBytes());

        // Mockito: force the mocked service to throw, so we can test the GlobalExceptionHandler
        // wiring end-to-end through the real controller -> real @ExceptionHandler chain.
        doThrow(new ResourceNotFoundException("Product not found", productId)).when(imageUploadService).imageUpload(eq(productId), any());

        mockMvc.perform(multipart("/api/images/upload")
                        .file(file)
                        .param("productId", productId.toString()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /api/images/product/{productId} returns the images as JSON")
    void getImage_returnsImagesForProduct() throws Exception {
        UUID productId = UUID.randomUUID();
        ImageResponseDto dto = ImageResponseDto.builder()
                .imageId(UUID.randomUUID())
                .productId(productId)
                .fileName("photo.png")
                .build();

        // Mockito: stub the fake service's return value
        when(imageUploadService.getImagesByProduct(productId)).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/images/product/{productId}", productId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fileName").value("photo.png"))
                .andExpect(jsonPath("$[0].productId").value(productId.toString()));
    }

    @Test
    @DisplayName("GET /api/images/product/{productId} returns 400 for a malformed UUID path variable")
    void getImage_invalidUuid_returns400() throws Exception {
        // No Mockito stubbing at all here - the request never reaches the service.
        // This exercises Spring's own path-variable conversion + your GlobalExceptionHandler.
        mockMvc.perform(get("/api/images/product/{productId}", "not-a-uuid"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(imageUploadService);
    }
}