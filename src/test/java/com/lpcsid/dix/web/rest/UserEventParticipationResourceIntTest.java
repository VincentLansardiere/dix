package com.lpcsid.dix.web.rest;

import com.lpcsid.dix.DixApp;

import com.lpcsid.dix.domain.UserEventParticipation;
import com.lpcsid.dix.repository.UserEventParticipationRepository;
import com.lpcsid.dix.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.lpcsid.dix.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserEventParticipationResource REST controller.
 *
 * @see UserEventParticipationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DixApp.class)
public class UserEventParticipationResourceIntTest {

    @Autowired
    private UserEventParticipationRepository userEventParticipationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserEventParticipationMockMvc;

    private UserEventParticipation userEventParticipation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserEventParticipationResource userEventParticipationResource = new UserEventParticipationResource(userEventParticipationRepository);
        this.restUserEventParticipationMockMvc = MockMvcBuilders.standaloneSetup(userEventParticipationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserEventParticipation createEntity(EntityManager em) {
        UserEventParticipation userEventParticipation = new UserEventParticipation();
        return userEventParticipation;
    }

    @Before
    public void initTest() {
        userEventParticipation = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserEventParticipation() throws Exception {
        int databaseSizeBeforeCreate = userEventParticipationRepository.findAll().size();

        // Create the UserEventParticipation
        restUserEventParticipationMockMvc.perform(post("/api/user-event-participations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEventParticipation)))
            .andExpect(status().isCreated());

        // Validate the UserEventParticipation in the database
        List<UserEventParticipation> userEventParticipationList = userEventParticipationRepository.findAll();
        assertThat(userEventParticipationList).hasSize(databaseSizeBeforeCreate + 1);
        UserEventParticipation testUserEventParticipation = userEventParticipationList.get(userEventParticipationList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserEventParticipationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userEventParticipationRepository.findAll().size();

        // Create the UserEventParticipation with an existing ID
        userEventParticipation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserEventParticipationMockMvc.perform(post("/api/user-event-participations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEventParticipation)))
            .andExpect(status().isBadRequest());

        // Validate the UserEventParticipation in the database
        List<UserEventParticipation> userEventParticipationList = userEventParticipationRepository.findAll();
        assertThat(userEventParticipationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserEventParticipations() throws Exception {
        // Initialize the database
        userEventParticipationRepository.saveAndFlush(userEventParticipation);

        // Get all the userEventParticipationList
        restUserEventParticipationMockMvc.perform(get("/api/user-event-participations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userEventParticipation.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUserEventParticipation() throws Exception {
        // Initialize the database
        userEventParticipationRepository.saveAndFlush(userEventParticipation);

        // Get the userEventParticipation
        restUserEventParticipationMockMvc.perform(get("/api/user-event-participations/{id}", userEventParticipation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userEventParticipation.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserEventParticipation() throws Exception {
        // Get the userEventParticipation
        restUserEventParticipationMockMvc.perform(get("/api/user-event-participations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserEventParticipation() throws Exception {
        // Initialize the database
        userEventParticipationRepository.saveAndFlush(userEventParticipation);
        int databaseSizeBeforeUpdate = userEventParticipationRepository.findAll().size();

        // Update the userEventParticipation
        UserEventParticipation updatedUserEventParticipation = userEventParticipationRepository.findOne(userEventParticipation.getId());
        // Disconnect from session so that the updates on updatedUserEventParticipation are not directly saved in db
        em.detach(updatedUserEventParticipation);

        restUserEventParticipationMockMvc.perform(put("/api/user-event-participations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserEventParticipation)))
            .andExpect(status().isOk());

        // Validate the UserEventParticipation in the database
        List<UserEventParticipation> userEventParticipationList = userEventParticipationRepository.findAll();
        assertThat(userEventParticipationList).hasSize(databaseSizeBeforeUpdate);
        UserEventParticipation testUserEventParticipation = userEventParticipationList.get(userEventParticipationList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserEventParticipation() throws Exception {
        int databaseSizeBeforeUpdate = userEventParticipationRepository.findAll().size();

        // Create the UserEventParticipation

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserEventParticipationMockMvc.perform(put("/api/user-event-participations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userEventParticipation)))
            .andExpect(status().isCreated());

        // Validate the UserEventParticipation in the database
        List<UserEventParticipation> userEventParticipationList = userEventParticipationRepository.findAll();
        assertThat(userEventParticipationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserEventParticipation() throws Exception {
        // Initialize the database
        userEventParticipationRepository.saveAndFlush(userEventParticipation);
        int databaseSizeBeforeDelete = userEventParticipationRepository.findAll().size();

        // Get the userEventParticipation
        restUserEventParticipationMockMvc.perform(delete("/api/user-event-participations/{id}", userEventParticipation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserEventParticipation> userEventParticipationList = userEventParticipationRepository.findAll();
        assertThat(userEventParticipationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserEventParticipation.class);
        UserEventParticipation userEventParticipation1 = new UserEventParticipation();
        userEventParticipation1.setId(1L);
        UserEventParticipation userEventParticipation2 = new UserEventParticipation();
        userEventParticipation2.setId(userEventParticipation1.getId());
        assertThat(userEventParticipation1).isEqualTo(userEventParticipation2);
        userEventParticipation2.setId(2L);
        assertThat(userEventParticipation1).isNotEqualTo(userEventParticipation2);
        userEventParticipation1.setId(null);
        assertThat(userEventParticipation1).isNotEqualTo(userEventParticipation2);
    }
}
