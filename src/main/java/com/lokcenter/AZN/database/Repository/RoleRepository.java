package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;
import com.lokcenter.AZN.database.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {
    @Query(value = "SELECT * FROM role WHERE name = ?1", nativeQuery = true)
    Role findByName(String username);
}
