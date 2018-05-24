package com.lpcsid.dix.repository;

import com.lpcsid.dix.domain.Association;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Association entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssociationRepository extends JpaRepository<Association, Long> {
    @Query("select distinct association from Association association left join fetch association.members")
    List<Association> findAllWithEagerRelationships();

    @Query("select association from Association association left join fetch association.members where association.id =:id")
    Association findOneWithEagerRelationships(@Param("id") Long id);

}
