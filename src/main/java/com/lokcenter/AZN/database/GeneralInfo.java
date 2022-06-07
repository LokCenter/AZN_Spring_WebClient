package com.lokcenter.AZN.database;

import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.sql.Time;

/**
 * General Calendar info
 *
 * @version 1.0 2022-06-07
 */
@Entity
@Table(name = "general_info")
public class GeneralInfo {
    @javax.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "vacation_normal")
    private Long vacationNormal;

    @Column(nullable = false, name = "vacation_handicap")
    private Long vacationHandicap;

    @Column(nullable = false, name = "weekend_factor")
    private double weekendFactor;

    @Column(nullable = false, name = "daily_worktime")
    private Time dailyWorktime;

    @Column(nullable = false, name = "daily_pause")
    private short dailyPause;

    public GeneralInfo() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVacationNormal() {
        return vacationNormal;
    }

    public void setVacationNormal(Long vacationNormal) {
        this.vacationNormal = vacationNormal;
    }

    public Long getVacationHandicap() {
        return vacationHandicap;
    }

    public void setVacationHandicap(Long vacationHandicap) {
        this.vacationHandicap = vacationHandicap;
    }

    public double getWeekendFactor() {
        return weekendFactor;
    }

    public void setWeekendFactor(double weekendFactor) {
        this.weekendFactor = weekendFactor;
    }

    public Time getDailyWorktime() {
        return dailyWorktime;
    }

    public void setDailyWorktime(Time dailyWorktime) {
        this.dailyWorktime = dailyWorktime;
    }

    public short getDailyPause() {
        return dailyPause;
    }

    public void setDailyPause(short dailyPause) {
        this.dailyPause = dailyPause;
    }


}
