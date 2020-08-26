package com.jemberdin.crud.service;

import com.jemberdin.crud.model.User;
import com.jemberdin.crud.repository.UserRepository;
import com.jemberdin.crud.util.EmailValidator;
import com.jemberdin.crud.util.exception.ApiRequestException;
import com.jemberdin.crud.util.FullNameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

import static com.jemberdin.crud.util.ValidationUtil.*;

@Service
public class UserService {

    private final UserRepository repository;
    private final EmailValidator emailValidator;
    private final FullNameValidator fullNameValidator;

    @Autowired
    public UserService(UserRepository repository, EmailValidator emailValidator, FullNameValidator fullNameValidator) {
        this.repository = repository;
        this.emailValidator = emailValidator;
        this.fullNameValidator = fullNameValidator;
    }

    public List<User> getAllUsers() {
        return repository.getAllUsers();
    }

    public User getUser(int id) {
        return checkNotFoundWithId(repository.getUser(id), id);
    }

    public User addUser(User user) {
        Assert.notNull(user, "user must not be null");
        if(!emailValidator.test(user.getEmail())) {
            throw new ApiRequestException(user.getEmail() + " is not valid email");
        }
        if(!fullNameValidator.test(user.getFirstName(), user.getLastName())) {
            throw new ApiRequestException("Full name " + user.getFirstName() + " " + user.getLastName() + " is taken");
        }
        return repository.addUser(user);
    }

    public void updateUser(User user) {
        Assert.notNull(user, "user must not be null");
        if(!emailValidator.test(user.getEmail())) {
            throw new ApiRequestException(user.getEmail() + " is not valid email");
        }
        if(!fullNameValidator.test(user.getFirstName(), user.getLastName(), user.getId())) {
            throw new ApiRequestException("Can not update: full name " + user.getFirstName() + " " + user.getLastName() + " is taken");
        }
        repository.addUser(user);
    }

    public void deleteUser(int id) {
        checkNotFoundWithId(repository.deleteUser(id), id);
    }
}
