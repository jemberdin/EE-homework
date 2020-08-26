package com.jemberdin.crud;

import com.jemberdin.crud.model.User;
import java.time.LocalDate;

public class UserTestData {

    public static final int USER1_ID = 1;
    public static final int USER2_ID = 2;
    public static final int USER3_ID = 3;

    public static final User USER1 = new User(
            USER1_ID,
            "Ain",
            "Kala",
            LocalDate.of(1990, 11, 11),
            "ain.kala@gmail.com",
            "Viirati 13 Tallinn");

    public static final User USER2 = new User(
            USER2_ID,
            "Siiru",
            "Viiru",
            LocalDate.of(1980, 01, 11),
            "siiru.viiru@gmail.com",
            "Soo 10 Tallinn");

    public static final User USER3 = new User(
            USER3_ID,
            "Heli",
            "Kopter",
            LocalDate.of(1985, 06, 22),
            "heli.kopter@gmail.com",
            "Prantsusmaa");

    public static User getNew() {
        return new User(
                null,
                "NewFirstName",
                "NewLastName",
                LocalDate.of(1990, 1, 1),
                "new@gmail.com",
                "Tallinn"
        );
    }

    public static User getUpdated() {
        User updated = new User(USER1);
        updated.setFirstName("UpdatedName");
        return updated;
    }

    public static User getUpdatedDuplicate() {
        User updated = new User(USER1);
        updated.setFirstName("Siiru");
        updated.setLastName("Viiru");
        return updated;
    }
}
