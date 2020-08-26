package com.jemberdin.crud;

import com.jemberdin.crud.util.EmailValidator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    void itShouldValidateCorrectEmail() {
        assertTrue(underTest.test("test@gmail.com"));
    }

    @Test
    void itShouldValidateAnIncorrectEmail() {
        assertFalse(underTest.test("testgmail.com"));
    }

    @Test
    void itShouldValidateAnIncorrectEmailWithoutDotAtTheEnd() {
        assertFalse(underTest.test("testg@mail"));
    }
}
