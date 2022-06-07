package com.lokcenter.AZN.database;

import javax.persistence.*;

/**
 * Stores user data
 */
@Entity
@Table(name = "user_data")
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * id from User table
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user_id;

    /**
     * Positive or negative credit based on enum value
     *
     * @implNote columnDefinition = "ENUM('NEGATIVE', 'POSITIVE') must be set /
     * for mysql
     */
    @Column(nullable = false, columnDefinition = "ENUM('NEGATIVE', 'POSITIVE')", name = "balance_time")
    private Balance a_balanceTime;

    @Column(nullable = false, name = "used_vacationDays")
    private Long b_usedVacationDays;

    @Column(nullable = false, name = "sick_days")
    private int c_sickDays;

    @Column(nullable = false, name = "glaz_days")
    private int d_glazDays;

    @Column(nullable = false, name = "vacation_while_sick")
    private Long e_vacationWhileSick;

    public UserData() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Balance getBalanceTime() {
        return a_balanceTime;
    }

    public void setBalanceTime(Balance balanceTime) {
        this.a_balanceTime = balanceTime;
    }

    public Long getUsedVacationDays() {
        return b_usedVacationDays;
    }

    public void setUsedVacationDays(Long usedVacationDays) {
        this.b_usedVacationDays = usedVacationDays;
    }

    public int getSickDays() {
        return c_sickDays;
    }

    public void setSickDays(int sickDays) {
        this.c_sickDays = sickDays;
    }

    public int getGlazDays() {
        return d_glazDays;
    }

    public void setGlazDays(int glazDays) {
        this.d_glazDays = glazDays;
    }

    public Long getVacationWhileSick() {
        return e_vacationWhileSick;
    }

    public void setVacationWhileSick(Long vacationWhileSick) {
        this.e_vacationWhileSick = vacationWhileSick;
    }
}
