package com.ecom.productservice.exceptions;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

/**
 * Uniform JSON body returned for every error response.
 *
 * Example payload:
 * {
 *   "status"    : 404,
 *   "error"     : "Not Found",
 *   "message"   : "Product not found with id: 550e8400-...",
 *   "path"      : "/api/images/upload",
 *   "timestamp" : "2024-06-15T14:30:00"
 * }
 */
public record ErrorResponse(
        int status,
        String error,
        String message,
        String path,

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        LocalDateTime timestamp
) {
    /** Convenience factory — timestamp is always now. */
    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(status, error, message, path, LocalDateTime.now());
    }
}
