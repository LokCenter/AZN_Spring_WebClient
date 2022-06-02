package com.lokcenter.AZN.database.Repository;

import com.lokcenter.AZN.database.Privilege;
import com.lokcenter.AZN.database.Repository.Custom.UserRepositoryCustom;
import com.lokcenter.AZN.database.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query(value = "SELECT * FROM user WHERE username = ?1", nativeQuery = true)
    User findByUsername(String username);
}
