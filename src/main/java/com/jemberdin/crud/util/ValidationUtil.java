package com.jemberdin.crud.util;
import com.jemberdin.crud.model.User;
import com.jemberdin.crud.util.exception.ApiRequestException;
import org.springframework.util.Assert;

public class ValidationUtil {

    private ValidationUtil() { }

    public static <T> T checkNotFoundWithId(T object, int id) {
        return checkNotFound(object, "id=" + id);
    }

    public static void checkNotFoundWithId(boolean found, int id) {
        checkNotFound(found, "id=" + id);
    }

    public static <T> T checkNotFound(T object, String msg) {
        checkNotFound(object != null, msg);
        return object;
    }

    public static void checkNotFound(boolean found, String msg)  {
        if (!found) {
            throw new ApiRequestException("Not found entity with " + msg);
        }
    }

    public static void checkNew(User user) {
        if (!user.isNew()) {
            throw new ApiRequestException(user + " must be new (id=null)");
        }
    }

    public static void assureIdConsistent(User user, int id) {
        Assert.notNull(user.getId(), "Entity must have id");
        if (user.isNew()) {
            user.setId(id);
        } else if (user.getId() != id) {
            throw new ApiRequestException(user + " must be with id=" + id);
        }
    }

    public static Throwable getRootCause(Throwable t) {
        Throwable result = t;
        Throwable cause;

        while (null != (cause = result.getCause()) && (result != cause)) {
            result = cause;
        }
        return result;
    }


}
