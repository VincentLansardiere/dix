package com.lpcsid.dix.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lpcsid.dix.domain.Assoc_members;

import com.lpcsid.dix.repository.Assoc_membersRepository;
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
 * REST controller for managing Assoc_members.
 */
@RestController
@RequestMapping("/api")
public class Assoc_membersResource {

    private final Logger log = LoggerFactory.getLogger(Assoc_membersResource.class);

    private static final String ENTITY_NAME = "assoc_members";

    private final Assoc_membersRepository assoc_membersRepository;

    public Assoc_membersResource(Assoc_membersRepository assoc_membersRepository) {
        this.assoc_membersRepository = assoc_membersRepository;
    }

    /**
     * POST  /assoc-members : Create a new assoc_members.
     *
     * @param assoc_members the assoc_members to create
     * @return the ResponseEntity with status 201 (Created) and with body the new assoc_members, or with status 400 (Bad Request) if the assoc_members has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/assoc-members")
    @Timed
    public ResponseEntity<Assoc_members> createAssoc_members(@Valid @RequestBody Assoc_members assoc_members) throws URISyntaxException {
        log.debug("REST request to save Assoc_members : {}", assoc_members);
        if (assoc_members.getId() != null) {
            throw new BadRequestAlertException("A new assoc_members cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Assoc_members result = assoc_membersRepository.save(assoc_members);
        return ResponseEntity.created(new URI("/api/assoc-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /assoc-members : Updates an existing assoc_members.
     *
     * @param assoc_members the assoc_members to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated assoc_members,
     * or with status 400 (Bad Request) if the assoc_members is not valid,
     * or with status 500 (Internal Server Error) if the assoc_members couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/assoc-members")
    @Timed
    public ResponseEntity<Assoc_members> updateAssoc_members(@Valid @RequestBody Assoc_members assoc_members) throws URISyntaxException {
        log.debug("REST request to update Assoc_members : {}", assoc_members);
        if (assoc_members.getId() == null) {
            return createAssoc_members(assoc_members);
        }
        Assoc_members result = assoc_membersRepository.save(assoc_members);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, assoc_members.getId().toString()))
            .body(result);
    }

    /**
     * GET  /assoc-members : get all the assoc_members.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of assoc_members in body
     */
    @GetMapping("/assoc-members")
    @Timed
    public List<Assoc_members> getAllAssoc_members() {
        log.debug("REST request to get all Assoc_members");
        return assoc_membersRepository.findAll();
        }

    /**
     * GET  /assoc-members/:id : get the "id" assoc_members.
     *
     * @param id the id of the assoc_members to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the assoc_members, or with status 404 (Not Found)
     */
    @GetMapping("/assoc-members/{id}")
    @Timed
    public ResponseEntity<Assoc_members> getAssoc_members(@PathVariable Long id) {
        log.debug("REST request to get Assoc_members : {}", id);
        Assoc_members assoc_members = assoc_membersRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(assoc_members));
    }

    /**
     * DELETE  /assoc-members/:id : delete the "id" assoc_members.
     *
     * @param id the id of the assoc_members to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/assoc-members/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssoc_members(@PathVariable Long id) {
        log.debug("REST request to delete Assoc_members : {}", id);
        assoc_membersRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
