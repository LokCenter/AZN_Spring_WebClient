package com.lokcenter.AZN.database;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Authorities {
    @Id
    private Long id;
    @Column(nullable = false)
    private String username; // TODO: Foreign Key
    @Column(nullable = false)
    private String authority;

    public Authorities() {}

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

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
