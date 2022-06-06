package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * Fetch Privileges from DB
 *
 * @version 1.02 2022-06-04
 */
public interface PrivilegeRepository extends CrudRepository<Privilege, Long> {
    /**
     * Fetch privilege based on priv name
     * @param username The privilige name
     * @return A privilige
     */
    @Query(value = "SELECT * FROM privilege WHERE name = ?1", nativeQuery = true)
    Privilege findByName(String username);
}
