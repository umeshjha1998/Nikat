package com.nikat.nikat_backend.services;

import com.nikat.nikat_backend.entities.Category;
import com.nikat.nikat_backend.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository repository;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return repository.findById(id);
    }

    public Category createCategory(Category category) {
        return repository.save(category);
    }

    public Category updateCategory(Long id, Category updatedCategory) {
        return repository.findById(id).map(category -> {
            category.setName(updatedCategory.getName());
            category.setDescription(updatedCategory.getDescription());
            category.setPlaceholderDescription(updatedCategory.getPlaceholderDescription());
            category.setImageUrl(updatedCategory.getImageUrl());
            category.setServiceCategory(updatedCategory.isServiceCategory());
            return repository.save(category);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteCategory(Long id) {
        repository.deleteById(id);
    }
}
