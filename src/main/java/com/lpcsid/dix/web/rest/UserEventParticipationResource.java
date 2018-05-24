package com.lpcsid.dix.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lpcsid.dix.domain.UserEventParticipation;

import com.lpcsid.dix.repository.UserEventParticipationRepository;
import com.lpcsid.dix.web.rest.errors.BadRequestAlertException;
import com.lpcsid.dix.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserEventParticipation.
 */
@RestController
@RequestMapping("/api")
public class UserEventParticipationResource {

    private final Logger log = LoggerFactory.getLogger(UserEventParticipationResource.class);

    private static final String ENTITY_NAME = "userEventParticipation";

    private final UserEventParticipationRepository userEventParticipationRepository;

    public UserEventParticipationResource(UserEventParticipationRepository userEventParticipationRepository) {
        this.userEventParticipationRepository = userEventParticipationRepository;
    }

    /**
     * POST  /user-event-participations : Create a new userEventParticipation.
     *
     * @param userEventParticipation the userEventParticipation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userEventParticipation, or with status 400 (Bad Request) if the userEventParticipation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-event-participations")
    @Timed
    public ResponseEntity<UserEventParticipation> createUserEventParticipation(@RequestBody UserEventParticipation userEventParticipation) throws URISyntaxException {
        log.debug("REST request to save UserEventParticipation : {}", userEventParticipation);
        if (userEventParticipation.getId() != null) {
            throw new BadRequestAlertException("A new userEventParticipation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserEventParticipation result = userEventParticipationRepository.save(userEventParticipation);
        return ResponseEntity.created(new URI("/api/user-event-participations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-event-participations : Updates an existing userEventParticipation.
     *
     * @param userEventParticipation the userEventParticipation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userEventParticipation,
     * or with status 400 (Bad Request) if the userEventParticipation is not valid,
     * or with status 500 (Internal Server Error) if the userEventParticipation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-event-participations")
    @Timed
    public ResponseEntity<UserEventParticipation> updateUserEventParticipation(@RequestBody UserEventParticipation userEventParticipation) throws URISyntaxException {
        log.debug("REST request to update UserEventParticipation : {}", userEventParticipation);
        if (userEventParticipation.getId() == null) {
            return createUserEventParticipation(userEventParticipation);
        }
        UserEventParticipation result = userEventParticipationRepository.save(userEventParticipation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userEventParticipation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-event-participations : get all the userEventParticipations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userEventParticipations in body
     */
    @GetMapping("/user-event-participations")
    @Timed
    public List<UserEventParticipation> getAllUserEventParticipations() {
        log.debug("REST request to get all UserEventParticipations");
        return userEventParticipationRepository.findAll();
        }

    /**
     * GET  /user-event-participations/:id : get the "id" userEventParticipation.
     *
     * @param id the id of the userEventParticipation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userEventParticipation, or with status 404 (Not Found)
     */
    @GetMapping("/user-event-participations/{id}")
    @Timed
    public ResponseEntity<UserEventParticipation> getUserEventParticipation(@PathVariable Long id) {
        log.debug("REST request to get UserEventParticipation : {}", id);
        UserEventParticipation userEventParticipation = userEventParticipationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userEventParticipation));
    }

    /**
     * DELETE  /user-event-participations/:id : delete the "id" userEventParticipation.
     *
     * @param id the id of the userEventParticipation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-event-participations/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserEventParticipation(@PathVariable Long id) {
        log.debug("REST request to delete UserEventParticipation : {}", id);
        userEventParticipationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
