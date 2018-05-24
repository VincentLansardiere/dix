package com.lpcsid.dix.repository;

import com.lpcsid.dix.domain.UserEventParticipation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserEventParticipation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserEventParticipationRepository extends JpaRepository<UserEventParticipation, Long> {

}
