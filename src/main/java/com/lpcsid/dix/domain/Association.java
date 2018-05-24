package com.lpcsid.dix.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Association.
 */
@Entity
@Table(name = "association")
public class Association implements Serializable {

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

    @NotNull
    @Column(name = "picture", nullable = false)
    private String picture;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "postcode", nullable = false)
    private String postcode;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private UserProfile president;

    @OneToMany(mappedBy = "association")
    @JsonIgnore
    private Set<AssociationUserRole> roles = new HashSet<>();

    @OneToMany(mappedBy = "association")
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "association_members",
               joinColumns = @JoinColumn(name="associations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="members_id", referencedColumnName="id"))
    private Set<UserProfile> members = new HashSet<>();

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

    public Association name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Association description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public Association picture(String picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getAddress() {
        return address;
    }

    public Association address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public Association postcode(String postcode) {
        this.postcode = postcode;
        return this;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getCity() {
        return city;
    }

    public Association city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public UserProfile getPresident() {
        return president;
    }

    public Association president(UserProfile userProfile) {
        this.president = userProfile;
        return this;
    }

    public void setPresident(UserProfile userProfile) {
        this.president = userProfile;
    }

    public Set<AssociationUserRole> getRoles() {
        return roles;
    }

    public Association roles(Set<AssociationUserRole> associationUserRoles) {
        this.roles = associationUserRoles;
        return this;
    }

    public Association addRoles(AssociationUserRole associationUserRole) {
        this.roles.add(associationUserRole);
        associationUserRole.setAssociation(this);
        return this;
    }

    public Association removeRoles(AssociationUserRole associationUserRole) {
        this.roles.remove(associationUserRole);
        associationUserRole.setAssociation(null);
        return this;
    }

    public void setRoles(Set<AssociationUserRole> associationUserRoles) {
        this.roles = associationUserRoles;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public Association events(Set<Event> events) {
        this.events = events;
        return this;
    }

    public Association addEvents(Event event) {
        this.events.add(event);
        event.setAssociation(this);
        return this;
    }

    public Association removeEvents(Event event) {
        this.events.remove(event);
        event.setAssociation(null);
        return this;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<UserProfile> getMembers() {
        return members;
    }

    public Association members(Set<UserProfile> userProfiles) {
        this.members = userProfiles;
        return this;
    }

    public Association addMembers(UserProfile userProfile) {
        this.members.add(userProfile);
        return this;
    }

    public Association removeMembers(UserProfile userProfile) {
        this.members.remove(userProfile);
        return this;
    }

    public void setMembers(Set<UserProfile> userProfiles) {
        this.members = userProfiles;
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
        Association association = (Association) o;
        if (association.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), association.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Association{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", address='" + getAddress() + "'" +
            ", postcode='" + getPostcode() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
