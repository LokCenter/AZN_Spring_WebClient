package com.lokcenter.AZN.database;

import javax.persistence.*;
import java.sql.Time;

/**
 * Table for dayPlan data from every user
 *
 * @version 1.0 2022-06-07
 */
@Entity
@Table(name = "user_dayPlanData")
public class UserDayPlanData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * id from User table
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, referencedColumnName = "id")
    private User user_id;

    @Column(nullable = true, name = "start_time")
    private Time startTime;

    @Column(nullable = true, name = "end_time")
    private Time endTime;

    @Column(nullable = true)
    private short pause;

    @Column(nullable = false, name = "school_day")
    private int schoolDay;

    @Column(nullable = false, name = "glaz_day")
    private int glazDay;

    @Column(nullable = false, name = "vacation_day")
    private int vacationDay;

    @Column(nullable = false, name = "sick_day")
    private int sickDay;

    @Column(nullable = true)
    private String comment;

    public UserDayPlanData(){
    }

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

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time startTime) {
        this.startTime = startTime;
    }

    public Time getEndTime() {
        return endTime;
    }

    public void setEndTime(Time endTime) {
        this.endTime = endTime;
    }

    public short getPause() {
        return pause;
    }

    public void setPause(short pause) {
        this.pause = pause;
    }

    public int getSchoolDay() {
        return schoolDay;
    }

    public void setSchoolDay(int schoolDay) {
        this.schoolDay = schoolDay;
    }

    public int getGlazDay() {
        return glazDay;
    }

    public void setGlazDay(int glazDay) {
        this.glazDay = glazDay;
    }

    public int getVacationDay() {
        return vacationDay;
    }

    public void setVacationDay(int vacationDay) {
        this.vacationDay = vacationDay;
    }

    public int getSickDay() {
        return sickDay;
    }

    public void setSickDay(int sickDay) {
        this.sickDay = sickDay;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
