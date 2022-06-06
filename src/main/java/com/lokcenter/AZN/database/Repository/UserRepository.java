package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;

import com.lokcenter.AZN.database.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Fetch Users from DB
 *
 * @version 1.06 2022-06-04
 */
public interface UserRepository extends CrudRepository<User, Long> {
    /**
     * Find user with userdata and role
     * @param username the username
     * @return A user
     */
    @Query(value = " SELECT user.*, role.name FROM user LEFT JOIN user_roles on user.id = user_roles.user_id LEFT JOIN role on role.id = user_roles.role_id" +
            " WHERE username = ?1", nativeQuery = true)
    User findByUsername(String username);
}

