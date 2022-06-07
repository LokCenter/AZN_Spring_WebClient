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

    @Column(nullable = false)
    private int schoolDay;
}
