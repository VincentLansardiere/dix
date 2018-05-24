package com.lpcsid.dix.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AssociationUserRole.
 */
@Entity
@Table(name = "association_user_role")
public class AssociationUserRole implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_role", nullable = false)
    private String role;

    @ManyToOne
    private UserProfile userProfile;

    @ManyToOne
    private Association association;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public AssociationUserRole role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public AssociationUserRole userProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
        return this;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public Association getAssociation() {
        return association;
    }

    public AssociationUserRole association(Association association) {
        this.association = association;
        return this;
    }

    public void setAssociation(Association association) {
        this.association = association;
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
        AssociationUserRole associationUserRole = (AssociationUserRole) o;
        if (associationUserRole.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), associationUserRole.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssociationUserRole{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
