package com.lpcsid.dix.repository;

import com.lpcsid.dix.domain.Assoc_members;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Assoc_members entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Assoc_membersRepository extends JpaRepository<Assoc_members, Long> {

}
