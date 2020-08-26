package com.jemberdin.crud.controller;

import com.jemberdin.crud.model.User;
import com.jemberdin.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = UserRestController.REST_URL)
public class UserRestController extends AbstractUserController {

    static final String REST_URL = "/api/users";

    @Autowired
    public UserRestController(UserService service) {
        super(service);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return super.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return super.getUser(id);
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody @Valid User user) {
        User created = super.addUser(user);

        URI uriOfNewResource = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/{id}")
                .buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(uriOfNewResource).body(created);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody User user,
                           @PathVariable int id) {
        super.updateUser(user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        super.deleteUser(id);
    }
}
