package com.lpcsid.dix.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lpcsid.dix.domain.AssociationUserRole;

import com.lpcsid.dix.repository.AssociationUserRoleRepository;
import com.lpcsid.dix.web.rest.errors.BadRequestAlertException;
import com.lpcsid.dix.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AssociationUserRole.
 */
@RestController
@RequestMapping("/api")
public class AssociationUserRoleResource {

    private final Logger log = LoggerFactory.getLogger(AssociationUserRoleResource.class);

    private static final String ENTITY_NAME = "associationUserRole";

    private final AssociationUserRoleRepository associationUserRoleRepository;

    public AssociationUserRoleResource(AssociationUserRoleRepository associationUserRoleRepository) {
        this.associationUserRoleRepository = associationUserRoleRepository;
    }

    /**
     * POST  /association-user-roles : Create a new associationUserRole.
     *
     * @param associationUserRole the associationUserRole to create
     * @return the ResponseEntity with status 201 (Created) and with body the new associationUserRole, or with status 400 (Bad Request) if the associationUserRole has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/association-user-roles")
    @Timed
    public ResponseEntity<AssociationUserRole> createAssociationUserRole(@Valid @RequestBody AssociationUserRole associationUserRole) throws URISyntaxException {
        log.debug("REST request to save AssociationUserRole : {}", associationUserRole);
        if (associationUserRole.getId() != null) {
            throw new BadRequestAlertException("A new associationUserRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssociationUserRole result = associationUserRoleRepository.save(associationUserRole);
        return ResponseEntity.created(new URI("/api/association-user-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /association-user-roles : Updates an existing associationUserRole.
     *
     * @param associationUserRole the associationUserRole to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated associationUserRole,
     * or with status 400 (Bad Request) if the associationUserRole is not valid,
     * or with status 500 (Internal Server Error) if the associationUserRole couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/association-user-roles")
    @Timed
    public ResponseEntity<AssociationUserRole> updateAssociationUserRole(@Valid @RequestBody AssociationUserRole associationUserRole) throws URISyntaxException {
        log.debug("REST request to update AssociationUserRole : {}", associationUserRole);
        if (associationUserRole.getId() == null) {
            return createAssociationUserRole(associationUserRole);
        }
        AssociationUserRole result = associationUserRoleRepository.save(associationUserRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, associationUserRole.getId().toString()))
            .body(result);
    }

    /**
     * GET  /association-user-roles : get all the associationUserRoles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of associationUserRoles in body
     */
    @GetMapping("/association-user-roles")
    @Timed
    public List<AssociationUserRole> getAllAssociationUserRoles() {
        log.debug("REST request to get all AssociationUserRoles");
        return associationUserRoleRepository.findAll();
        }

    /**
     * GET  /association-user-roles/:id : get the "id" associationUserRole.
     *
     * @param id the id of the associationUserRole to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the associationUserRole, or with status 404 (Not Found)
     */
    @GetMapping("/association-user-roles/{id}")
    @Timed
    public ResponseEntity<AssociationUserRole> getAssociationUserRole(@PathVariable Long id) {
        log.debug("REST request to get AssociationUserRole : {}", id);
        AssociationUserRole associationUserRole = associationUserRoleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(associationUserRole));
    }

    /**
     * DELETE  /association-user-roles/:id : delete the "id" associationUserRole.
     *
     * @param id the id of the associationUserRole to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/association-user-roles/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssociationUserRole(@PathVariable Long id) {
        log.debug("REST request to delete AssociationUserRole : {}", id);
        associationUserRoleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
