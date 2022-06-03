package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PrivilegeRepository extends CrudRepository<Privilege, Long> {
    @Query(value = "SELECT * FROM privilege WHERE name = ?1", nativeQuery = true)
    Privilege findByName(String username);
}