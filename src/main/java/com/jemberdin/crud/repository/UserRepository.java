package com.jemberdin.crud.repository;

import com.jemberdin.crud.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final CrudUserRepository crudRepository;

    @Autowired
    public UserRepository(CrudUserRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    public User addUser(User user) {
        return crudRepository.save(user);
    }

    public boolean deleteUser(int id) {
        return crudRepository.delete(id) != 0;
    }

    public User getUser(int id) {
        return crudRepository.findById(id).orElse(null);
    }

    public List<User> getAllUsers() {
        return crudRepository.findAll();
    }

}
