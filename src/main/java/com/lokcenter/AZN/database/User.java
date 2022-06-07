package com.lokcenter.AZN.database;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Collection;

/**
 * User table
 *
 * @version 1.05 2022-06-04
 */
@Entity
public class User {
    /**
     * Table id
     *
     * @implNote Auto generated in mariadb
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * username
     *
     * @implNote NOT NULL
     */
    @Column(nullable = false, unique = true)
    private String username;
    /**
     * password
     *
     * @implNote NOT NULL
     */
    @Column(nullable = false)
    private String password;
    /**
     * Check if user account is enabled
     *
     * @implNote must be int
     * @implNote NOT NULL
     */
    @Column(nullable = false)
    private int enabled;
    /**
     *  check if token is still valid
     *
     * @implNote must be int
     * @implNote NOT NULL
     */
    @Column(nullable = false)
    private int tokenExpired;

    /**
     *  set handicap
     */
    @Column(nullable = false)
    private int handicap;

    /**
     *  Map users to roles to get all roles for a user
     *
     * @implNote use lazy_load_no_trans
     */
    @ManyToMany
    @JoinTable(
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )

    @Fetch(FetchMode.SUBSELECT) // enable_lazy_load_no_trans property
    private Collection<Role> roles;

    public int getTokenExpired() {
        return tokenExpired;
    }

    public void setTokenExpired(int tokenExpired) {
        this.tokenExpired = tokenExpired;
    }

    public void setEnabled(int val) {
        enabled = val;
    }

    public int getEnabled() {
        return enabled;
    }

    // must be set
    public User(){}

    public User(String username, String password, int enabled, int tokenExpired, Collection<Role> roles) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.tokenExpired = tokenExpired;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
