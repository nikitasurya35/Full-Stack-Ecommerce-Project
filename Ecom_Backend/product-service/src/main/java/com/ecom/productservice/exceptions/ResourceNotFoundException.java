package com.ecom.productservice.exceptions;

/**
 * Thrown when a requested resource (Product, Image, etc.) does not exist in the DB.
 * Replaces bare RuntimeException("Product not found") calls throughout the service layer.
 */
public class ResourceNotFoundException extends RuntimeException {

    private final String resourceName;
    private final Object resourceId;

    //Constructor
    public ResourceNotFoundException(String resourceName, Object resourceId) {
        super(resourceName + " not found with id: " + resourceId); //'super' is used to call the parent class constructor
        this.resourceName = resourceName;
        this.resourceId   = resourceId;
    }

    public String getResourceName() { return resourceName; }
    public Object getResourceId()   { return resourceId;   }
}
