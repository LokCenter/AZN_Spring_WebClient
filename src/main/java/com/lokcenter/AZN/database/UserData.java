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
    @Column(nullable = false, columnDefinition = "ENUM('NEGATIVE', 'POSITIVE')")
    private Balance balanceTime;

    @Column(nullable = false, name = "used_vacationDays")
    private Long usedVacationDays;

    @Column(nullable = false)
    private int sickDays;

    @Column(nullable = false)
    private int glazDays;

    @Column(nullable = false)
    private Long vacationWhileSick;

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
        return balanceTime;
    }

    public void setBalanceTime(Balance balanceTime) {
        this.balanceTime = balanceTime;
    }

    public Long getUsedVacationDays() {
        return usedVacationDays;
    }

    public void setUsedVacationDays(Long usedVacationDays) {
        this.usedVacationDays = usedVacationDays;
    }

    public int getSickDays() {
        return sickDays;
    }

    public void setSickDays(int sickDays) {
        this.sickDays = sickDays;
    }

    public int getGlazDays() {
        return glazDays;
    }

    public void setGlazDays(int glazDays) {
        this.glazDays = glazDays;
    }

    public Long getVacationWhileSick() {
        return vacationWhileSick;
    }

    public void setVacationWhileSick(Long vacationWhileSick) {
        this.vacationWhileSick = vacationWhileSick;
    }
}
