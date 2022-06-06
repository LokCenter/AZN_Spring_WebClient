package com.lokcenter.AZN.database;

import javax.persistence.*;

/**
 * Authorities database table
 *
 * @deprecated Do not delete...
 * @version 1.06 2022-06-03
 */
@Entity
public class Authorities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="userUsername", nullable = false, referencedColumnName = "username")
    private User username;
    @Column(nullable = false)
    private String authority;

    public Authorities() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUsername() {
        return username;
    }

    public void setUsername(User username) {
        this.username = username;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
