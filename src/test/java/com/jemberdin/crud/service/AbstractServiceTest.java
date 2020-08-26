package com.jemberdin.crud.service;

import static com.jemberdin.crud.util.ValidationUtil.getRootCause;
import static org.junit.jupiter.api.Assertions.assertThrows;

abstract class AbstractServiceTest {

    public <T extends Throwable> void validateRootCause(Runnable runnable, Class<T> exceptionClass) {
        assertThrows(exceptionClass, () -> {
            try {
                runnable.run();
            } catch (Exception e) {
                throw getRootCause(e);
            }
        });
    }
}
