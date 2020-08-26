package com.jemberdin.crud.repository;

import com.jemberdin.crud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
public interface CrudUserRepository extends JpaRepository<User, Integer> {

    @Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.id=:id")
    int delete(@Param("id") int id);

    @Query("SELECT u FROM User u WHERE u.firstName=:firstName AND u.lastName=:lastName")
    User getFirstAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName);

    @Query("SELECT u FROM User u WHERE u.firstName=:firstName AND u.lastName=:lastName AND u.id NOT IN (:id)")
    User getFirstAndLastName(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("id") Integer id);
}
