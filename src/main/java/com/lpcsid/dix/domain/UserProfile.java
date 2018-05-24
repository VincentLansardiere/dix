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
 * A UserProfile.
 */
@Entity
@Table(name = "user_profile")
public class UserProfile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "birthdate", nullable = false)
    private LocalDate birthdate;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "postcode", nullable = false)
    private String postcode;

    @NotNull
    @Column(name = "mail", nullable = false)
    private String mail;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "mobilephone")
    private String mobilephone;

    @Column(name = "homephone")
    private String homephone;

    @OneToMany(mappedBy = "userProfile")
    @JsonIgnore
    private Set<AssociationUserRole> roles = new HashSet<>();

    @OneToMany(mappedBy = "userProfile")
    @JsonIgnore
    private Set<Category> categories = new HashSet<>();

    @OneToMany(mappedBy = "userProfile")
    @JsonIgnore
    private Set<UserEventParticipation> participants = new HashSet<>();

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastname() {
        return lastname;
    }

    public UserProfile lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public UserProfile firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public UserProfile birthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getAddress() {
        return address;
    }

    public UserProfile address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public UserProfile postcode(String postcode) {
        this.postcode = postcode;
        return this;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getMail() {
        return mail;
    }

    public UserProfile mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getCity() {
        return city;
    }

    public UserProfile city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public UserProfile mobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
        return this;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }

    public String getHomephone() {
        return homephone;
    }

    public UserProfile homephone(String homephone) {
        this.homephone = homephone;
        return this;
    }

    public void setHomephone(String homephone) {
        this.homephone = homephone;
    }

    public Set<AssociationUserRole> getRoles() {
        return roles;
    }

    public UserProfile roles(Set<AssociationUserRole> associationUserRoles) {
        this.roles = associationUserRoles;
        return this;
    }

    public UserProfile addRole(AssociationUserRole associationUserRole) {
        this.roles.add(associationUserRole);
        associationUserRole.setUserProfile(this);
        return this;
    }

    public UserProfile removeRole(AssociationUserRole associationUserRole) {
        this.roles.remove(associationUserRole);
        associationUserRole.setUserProfile(null);
        return this;
    }

    public void setRoles(Set<AssociationUserRole> associationUserRoles) {
        this.roles = associationUserRoles;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public UserProfile categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public UserProfile addCategories(Category category) {
        this.categories.add(category);
        category.setUserProfile(this);
        return this;
    }

    public UserProfile removeCategories(Category category) {
        this.categories.remove(category);
        category.setUserProfile(null);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<UserEventParticipation> getParticipants() {
        return participants;
    }

    public UserProfile participants(Set<UserEventParticipation> userEventParticipations) {
        this.participants = userEventParticipations;
        return this;
    }

    public UserProfile addParticipant(UserEventParticipation userEventParticipation) {
        this.participants.add(userEventParticipation);
        userEventParticipation.setUserProfile(this);
        return this;
    }

    public UserProfile removeParticipant(UserEventParticipation userEventParticipation) {
        this.participants.remove(userEventParticipation);
        userEventParticipation.setUserProfile(null);
        return this;
    }

    public void setParticipants(Set<UserEventParticipation> userEventParticipations) {
        this.participants = userEventParticipations;
    }

    public User getUser() {
        return user;
    }

    public UserProfile user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        UserProfile userProfile = (UserProfile) o;
        if (userProfile.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userProfile.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserProfile{" +
            "id=" + getId() +
            ", lastname='" + getLastname() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", address='" + getAddress() + "'" +
            ", postcode='" + getPostcode() + "'" +
            ", mail='" + getMail() + "'" +
            ", city='" + getCity() + "'" +
            ", mobilephone='" + getMobilephone() + "'" +
            ", homephone='" + getHomephone() + "'" +
            "}";
    }
}
