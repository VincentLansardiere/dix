package com.lpcsid.dix.repository;

import com.lpcsid.dix.domain.UserProfile;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UserProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    @Query("select user_profile from UserProfile user_profile where user_profile.user.login = ?#{principal.username}")
    List<UserProfile> findByUserIsCurrentUser();

}
