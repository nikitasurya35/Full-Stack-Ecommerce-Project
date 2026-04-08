package com.ecom.productservice.repo;


import com.ecom.productservice.model.Category;
import com.ecom.productservice.projections.CategoryInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepo extends JpaRepository<Category, UUID> {
    //To get category names
    List<CategoryInfo> findAllProjectedBy();

}
