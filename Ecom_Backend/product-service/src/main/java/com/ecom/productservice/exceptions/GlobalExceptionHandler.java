package com.ecom.productservice.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

/**
 * Central place for all exception-to-HTTP-response mapping.
 *
 * Every controller in product-service (ProductDisplay, ImageUploadController)
 * is covered automatically — no try/catch boilerplate needed in controllers.
 *
 * Add a new @ExceptionHandler here whenever a new error type needs its own
 * HTTP status or message format.
 */
@RestControllerAdvice //Spring annotation for global exception handling
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // -----------------------------------------------------------------------
    // 404 — product / image not found in DB
    // -----------------------------------------------------------------------

    /**
     * Handles ResourceNotFoundException thrown from ImageUploadService and ProductQuery
     * instead of the bare RuntimeException("Product not found") calls.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex,
            HttpServletRequest request) {

        log.warn("Resource not found — {} | path={}", ex.getMessage(), request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.of(
                        HttpStatus.NOT_FOUND.value(),
                        "Not Found",
                        ex.getMessage(),
                        request.getRequestURI()
                ));
    }

    //500-File upload/delete related inssues
    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ErrorResponse> handleFileIssue(ResourceNotFoundException ex,
                                                         HttpServletRequest request)
    {
        log.error("File storage error", ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(
                        500,
                        "File Storage Error",
                        ex.getMessage(),
                        request.getRequestURI()
                ));
    }

    // -----------------------------------------------------------------------
    // 400 — bad / missing request parameters
    // -----------------------------------------------------------------------

    /**
     * Triggered when a required @RequestParam is absent.
     * e.g. POST /api/images/upload called without ?productId=
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingParam(
            MissingServletRequestParameterException ex,
            HttpServletRequest request) {

        log.warn("Missing request parameter — {} | path={}", ex.getMessage(), request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(
                        HttpStatus.BAD_REQUEST.value(),
                        "Bad Request",
                        "Required parameter '" + ex.getParameterName() + "' is missing",
                        request.getRequestURI()
                ));
    }

    /**
     * Triggered when a UUID path-variable or query-param cannot be parsed.
     * e.g. GET /api/images/product/not-a-uuid
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex,
            HttpServletRequest request) {

        String message = "Invalid value '" + ex.getValue()
                + "' for parameter '" + ex.getName() + "'";

        log.warn("Type mismatch — {} | path={}", message, request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(
                        HttpStatus.BAD_REQUEST.value(),
                        "Bad Request",
                        message,
                        request.getRequestURI()
                ));
    }

    // -----------------------------------------------------------------------
    // 413 — file too large (ImageUploadController)
    // -----------------------------------------------------------------------

    /**
     * Triggered when an uploaded image exceeds spring.servlet.multipart.max-file-size.
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleFileTooLarge(
            MaxUploadSizeExceededException ex,
            HttpServletRequest request) {

        log.warn("File upload too large | path={}", request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(ErrorResponse.of(
                        HttpStatus.PAYLOAD_TOO_LARGE.value(),
                        "Payload Too Large",
                        "File exceeds the maximum allowed upload size",
                        request.getRequestURI()
                ));
    }

    // -----------------------------------------------------------------------
    // 500 — anything else that wasn't caught above
    // -----------------------------------------------------------------------

    /**
     * Safety net — logs the full stack trace (important!) but only returns
     * a generic message to the client so internal details are never leaked.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(
            Exception ex,
            HttpServletRequest request) {

        // Full stack trace in server logs — visible in Kibana / log aggregator
        log.error("Unhandled exception | path={}", request.getRequestURI(), ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "Internal Server Error",
                        "An unexpected error occurred. Please try again later.",
                        request.getRequestURI()
                ));
    }
}
