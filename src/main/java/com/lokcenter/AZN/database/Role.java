package com.lokcenter.AZN.database;

import javax.persistence.*;
import java.util.Collection;

/**
 * Roles table
 *
 * @version 1.02 2022-05-29
 */
@Entity
public class Role {
    /**
     * Table id
     *
     * @implNote Auto generated in mariadb
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Role name
     */
    @Column(nullable = false)
    private String name;
    /**
     * user_roles table
     *
     * @implNote Map users to roles
     */
    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    /**
     * Map roles to privileges and get all privileges for a role
     *
     * @implNote Foreign Key required
     */
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id")
    )
    private Collection<Privilege> privileges;

    public Role(String name) {
        this.name = name;
    }

    public Role() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<User> getUsers() {
        return users;
    }

    public void setUsers(Collection<User> users) {
        this.users = users;
    }

    public Collection<Privilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(Collection<Privilege> privileges) {
        this.privileges = privileges;
    }
}
