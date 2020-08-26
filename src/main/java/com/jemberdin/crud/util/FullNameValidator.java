package com.jemberdin.crud.util;

import com.jemberdin.crud.repository.CrudUserRepository;
import org.springframework.stereotype.Component;

@Component
public class FullNameValidator {

    private final CrudUserRepository userRepository;

    public FullNameValidator(CrudUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean test(String firstName, String lastName) {
        return userRepository.getFirstAndLastName(firstName, lastName) == null;
    }

    public boolean test(String firstName, String lastName, Integer id) {
        return userRepository.getFirstAndLastName(firstName, lastName, id) == null;
    }
}
