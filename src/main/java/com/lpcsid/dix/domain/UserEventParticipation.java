package com.lpcsid.dix.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserEventParticipation.
 */
@Entity
@Table(name = "user_event_participation")
public class UserEventParticipation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserProfile userProfile;

    @ManyToOne
    private Event event;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public UserEventParticipation userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Event getEvent() {
        return event;
    }

    public UserEventParticipation event(Event event) {
        this.event = event;
        return this;
    }

    public void setEvent(Event event) {
        this.event = event;
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
        UserEventParticipation userEventParticipation = (UserEventParticipation) o;
        if (userEventParticipation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userEventParticipation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserEventParticipation{" +
            "id=" + getId() +
            "}";
    }
}
