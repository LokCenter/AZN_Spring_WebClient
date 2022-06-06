package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;
import com.lokcenter.AZN.database.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Fetch Roles from DB
 *
 * @version 1.02 2022-06-04
 */
public interface RoleRepository extends CrudRepository<Role, Long> {
    /**
     * Find Role based on role name
     * @param username a role name
     * @return A role
     */
    @Query(value = "SELECT * FROM role WHERE name = ?1", nativeQuery = true)
    Role findByName(String username);
}
