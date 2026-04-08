package com.ecom.productservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Inventory")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY) //one product has exactly one inventory record
    @JoinColumn(name = "product_id", nullable = false, unique = true)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "reserved_quantity", nullable = false)
    private int reservedQuantity;

    @Column(name = "reorder_point", nullable = false)
    private int reorderPoint;

    @Column(name = "reorder_quantity", nullable = false)
    private int reorderQuantity;

    @Column(name = "warehouse_location")
    private String warehouseLocation;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    // ── Derived fields — never stored in DB ──

    @Transient
    public int getAvailableQuantity() {
        return this.quantity - this.reservedQuantity;
    }

    @Transient
    public boolean isLowStock() {
        return this.quantity <= this.reorderPoint;
    }

    @Transient
    public boolean isOutOfStock() {
        return getAvailableQuantity() <= 0;
    }

    @Transient
    public int getQuantityNeededToReorder() {
        return this.reorderPoint - this.quantity;
    }

    @Transient
    public boolean isInStock() {
        return getAvailableQuantity() > 0;
    }
}
