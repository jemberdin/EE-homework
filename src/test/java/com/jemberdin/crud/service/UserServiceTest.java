package com.jemberdin.crud.service;

import com.jemberdin.crud.model.User;
import com.jemberdin.crud.util.exception.ApiRequestException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import javax.validation.ConstraintViolationException;
import java.time.LocalDate;
import java.util.List;

import static com.jemberdin.crud.UserTestData.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest extends AbstractServiceTest {

    protected UserService service;

    @Autowired
    public UserServiceTest(UserService service) {
        this.service = service;
    }

    @Test
    void getAllUsers() {
        List<User> all = service.getAllUsers();
        assertIterableEquals(all, List.of(USER1, USER2, USER3));
    }

    @Test
    void getUser() {
        User user = service.getUser(USER1_ID);
        assertEquals(user, USER1);
    }

    @Test
    void addUser() {
        User newUser = getNew();
        User created = service.addUser(new User(newUser));
        Integer newId = created.getId();
        newUser.setId(newId);
        assertEquals(created, newUser);
        Assert.notNull(newId, "id must not be null");
        assertEquals(service.getUser(newId), newUser);
        service.deleteUser(newId);
    }

    @Test
    void updateUser() {
        User updated = getUpdated();
        service.updateUser(new User(updated));
        assertEquals(service.getUser(USER1_ID), updated);
        service.updateUser(USER1);
    }

    @Test
    void deleteUser() {
        service.deleteUser(USER1_ID);
        assertThrows(ApiRequestException.class, () ->
                service.deleteUser(USER1_ID));
    }

    @Test
    void getNotFound() {
        assertThrows(ApiRequestException.class, () ->
                service.getUser(10000));
    }

    @Test
    void deletedNotFound() {
        assertThrows(ApiRequestException.class, () ->
                service.deleteUser(10000));
    }

    @Test
    void addUserWithNotValidEmail() {
        assertThrows(ApiRequestException.class, () ->
                service.addUser(new User(
                        null,
                        "NewFirstName",
                        "NewLastName",
                        LocalDate.of(1990, 1, 1),
                        "ain.kala@gmail",
                        "Tallinn"))
        );
    }

    @Test
    void addUserWithDuplicateFullName() {
        assertThrows(ApiRequestException.class, () ->
                service.addUser(new User(
                        null,
                        "Ain",
                        "Kala",
                        LocalDate.of(1990, 1, 1),
                        "ain.kala@gmail",
                        "Tallinn"))
        );
    }

    @Test
    void updateUserWithDuplicateFullName() {
        User updatedDuplicate = getUpdatedDuplicate();
        assertThrows(ApiRequestException.class, () ->
                service.updateUser(updatedDuplicate));
    }

    @Test
    void createWithException() {
        validateRootCause(() -> service.addUser(new User(
                null,
                "   ",
                "User",
                LocalDate.of(1990, 1, 1),
                "user@gmail.com",
                "Tallinn")),
                ConstraintViolationException.class);

        validateRootCause(() -> service.addUser(new User(
                null,
                "New",
                "   ",
                LocalDate.of(1990, 1, 1),
                "user@gmail.com",
                "Tallinn")),
                ConstraintViolationException.class);

        validateRootCause(() -> service.addUser(new User(
                null,
                "New",
                "User",
                null,
                "user@gmail.com",
                "Tallinn")),
                ConstraintViolationException.class);

        validateRootCause(() -> service.addUser(new User(
                null,
                "New",
                "User",
                LocalDate.of(1990, 1, 1),
                "user@gmail.com",
                "   ")),
                ConstraintViolationException.class);
    }
}