package com.ecom.productservice.repo;

import com.ecom.productservice.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InventoryRepo extends JpaRepository<Inventory, UUID> {

    // Find by product
    Optional<Inventory> findByProductId(UUID productId);

    // Find all items that are completely out of stock
    @Query("SELECT i FROM Inventory i WHERE (i.quantity - i.reservedQuantity) <= 0")
    List<Inventory> findOutOfStockItems();

}
