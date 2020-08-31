package com.jemberdin.crud.controller;

import com.jemberdin.crud.model.User;
import com.jemberdin.crud.service.UserService;

import java.util.List;

import static com.jemberdin.crud.util.ValidationUtil.assureIdConsistent;
import static com.jemberdin.crud.util.ValidationUtil.checkNew;

public abstract class AbstractUserController {

    private final UserService service;

    public AbstractUserController(UserService service) {
        this.service = service;
    }

    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    public User getUser(int id) {
        return service.getUser(id);
    }

    public User addUser(User user) {
        checkNew(user);
        return service.addUser(user);
    }

    public void updateUser(User user, int id) {
        assureIdConsistent(user, id);
        service.updateUser(user);
    }

    public void deleteUser(int id) {
        service.deleteUser(id);
    }
}
