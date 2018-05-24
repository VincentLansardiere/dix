package com.lpcsid.dix.repository;

import com.lpcsid.dix.domain.AssociationUserRole;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AssociationUserRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssociationUserRoleRepository extends JpaRepository<AssociationUserRole, Long> {

}
