package com.lpcsid.dix.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "picture")
    private String picture;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "recurrence")
    private Integer recurrence;

    @ManyToOne
    private Association association;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    private Set<UserEventParticipation> participants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public Event picture(String picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getLocation() {
        return location;
    }

    public Event location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Event startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Event endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Integer getRecurrence() {
        return recurrence;
    }

    public Event recurrence(Integer recurrence) {
        this.recurrence = recurrence;
        return this;
    }

    public void setRecurrence(Integer recurrence) {
        this.recurrence = recurrence;
    }

    public Association getAssociation() {
        return association;
    }

    public Event association(Association association) {
        this.association = association;
        return this;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }

    public Set<UserEventParticipation> getParticipants() {
        return participants;
    }

    public Event participants(Set<UserEventParticipation> userEventParticipations) {
        this.participants = userEventParticipations;
        return this;
    }

    public Event addParticipants(UserEventParticipation userEventParticipation) {
        this.participants.add(userEventParticipation);
        userEventParticipation.setEvent(this);
        return this;
    }

    public Event removeParticipants(UserEventParticipation userEventParticipation) {
        this.participants.remove(userEventParticipation);
        userEventParticipation.setEvent(null);
        return this;
    }

    public void setParticipants(Set<UserEventParticipation> userEventParticipations) {
        this.participants = userEventParticipations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", location='" + getLocation() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", recurrence=" + getRecurrence() +
            "}";
    }
}
