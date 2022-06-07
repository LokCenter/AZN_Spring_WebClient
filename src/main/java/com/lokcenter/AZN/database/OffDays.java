package com.lokcenter.AZN.database;

import javax.persistence.*;
import java.util.Date;

/**
 * Table for holidays and vacation
 *
 * @version 1.01 2022-06-07
 */
@Entity
@Table(name = "off_days")
public class OffDays {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(nullable = false, name = "general_vacation")
    private int generalVacation;

    @Column(nullable = false, name = "official_holiday")
    private int officialHoliday;

    @Column(nullable = true)
    private String comment;

    public OffDays() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getGeneralVacation() {
        return generalVacation;
    }

    public void setGeneralVacation(int generalVacation) {
        this.generalVacation = generalVacation;
    }

    public int getOfficialHoliday() {
        return officialHoliday;
    }

    public void setOfficialHoliday(int officialHoliday) {
        this.officialHoliday = officialHoliday;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
