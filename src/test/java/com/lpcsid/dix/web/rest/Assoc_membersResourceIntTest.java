package com.lpcsid.dix.web.rest;

import com.lpcsid.dix.DixApp;

import com.lpcsid.dix.domain.Assoc_members;
import com.lpcsid.dix.repository.Assoc_membersRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.lpcsid.dix.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Assoc_membersResource REST controller.
 *
 * @see Assoc_membersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DixApp.class)
public class Assoc_membersResourceIntTest {

    private static final Integer DEFAULT_MEMBERS_ID = 1;
    private static final Integer UPDATED_MEMBERS_ID = 2;

    private static final Integer DEFAULT_ASSOCIATIONS_ID = 1;
    private static final Integer UPDATED_ASSOCIATIONS_ID = 2;

    private static final LocalDate DEFAULT_JOINED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_JOINED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private Assoc_membersRepository assoc_membersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssoc_membersMockMvc;

    private Assoc_members assoc_members;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Assoc_membersResource assoc_membersResource = new Assoc_membersResource(assoc_membersRepository);
        this.restAssoc_membersMockMvc = MockMvcBuilders.standaloneSetup(assoc_membersResource)
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
    public static Assoc_members createEntity(EntityManager em) {
        Assoc_members assoc_members = new Assoc_members()
            .members_id(DEFAULT_MEMBERS_ID)
            .associations_id(DEFAULT_ASSOCIATIONS_ID)
            .joined_date(DEFAULT_JOINED_DATE);
        return assoc_members;
    }

    @Before
    public void initTest() {
        assoc_members = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssoc_members() throws Exception {
        int databaseSizeBeforeCreate = assoc_membersRepository.findAll().size();

        // Create the Assoc_members
        restAssoc_membersMockMvc.perform(post("/api/assoc-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assoc_members)))
            .andExpect(status().isCreated());

        // Validate the Assoc_members in the database
        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeCreate + 1);
        Assoc_members testAssoc_members = assoc_membersList.get(assoc_membersList.size() - 1);
        assertThat(testAssoc_members.getMembers_id()).isEqualTo(DEFAULT_MEMBERS_ID);
        assertThat(testAssoc_members.getAssociations_id()).isEqualTo(DEFAULT_ASSOCIATIONS_ID);
        assertThat(testAssoc_members.getJoined_date()).isEqualTo(DEFAULT_JOINED_DATE);
    }

    @Test
    @Transactional
    public void createAssoc_membersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = assoc_membersRepository.findAll().size();

        // Create the Assoc_members with an existing ID
        assoc_members.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssoc_membersMockMvc.perform(post("/api/assoc-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assoc_members)))
            .andExpect(status().isBadRequest());

        // Validate the Assoc_members in the database
        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAssociations_idIsRequired() throws Exception {
        int databaseSizeBeforeTest = assoc_membersRepository.findAll().size();
        // set the field null
        assoc_members.setAssociations_id(null);

        // Create the Assoc_members, which fails.

        restAssoc_membersMockMvc.perform(post("/api/assoc-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assoc_members)))
            .andExpect(status().isBadRequest());

        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAssoc_members() throws Exception {
        // Initialize the database
        assoc_membersRepository.saveAndFlush(assoc_members);

        // Get all the assoc_membersList
        restAssoc_membersMockMvc.perform(get("/api/assoc-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(assoc_members.getId().intValue())))
            .andExpect(jsonPath("$.[*].members_id").value(hasItem(DEFAULT_MEMBERS_ID)))
            .andExpect(jsonPath("$.[*].associations_id").value(hasItem(DEFAULT_ASSOCIATIONS_ID)))
            .andExpect(jsonPath("$.[*].joined_date").value(hasItem(DEFAULT_JOINED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getAssoc_members() throws Exception {
        // Initialize the database
        assoc_membersRepository.saveAndFlush(assoc_members);

        // Get the assoc_members
        restAssoc_membersMockMvc.perform(get("/api/assoc-members/{id}", assoc_members.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(assoc_members.getId().intValue()))
            .andExpect(jsonPath("$.members_id").value(DEFAULT_MEMBERS_ID))
            .andExpect(jsonPath("$.associations_id").value(DEFAULT_ASSOCIATIONS_ID))
            .andExpect(jsonPath("$.joined_date").value(DEFAULT_JOINED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssoc_members() throws Exception {
        // Get the assoc_members
        restAssoc_membersMockMvc.perform(get("/api/assoc-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssoc_members() throws Exception {
        // Initialize the database
        assoc_membersRepository.saveAndFlush(assoc_members);
        int databaseSizeBeforeUpdate = assoc_membersRepository.findAll().size();

        // Update the assoc_members
        Assoc_members updatedAssoc_members = assoc_membersRepository.findOne(assoc_members.getId());
        // Disconnect from session so that the updates on updatedAssoc_members are not directly saved in db
        em.detach(updatedAssoc_members);
        updatedAssoc_members
            .members_id(UPDATED_MEMBERS_ID)
            .associations_id(UPDATED_ASSOCIATIONS_ID)
            .joined_date(UPDATED_JOINED_DATE);

        restAssoc_membersMockMvc.perform(put("/api/assoc-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssoc_members)))
            .andExpect(status().isOk());

        // Validate the Assoc_members in the database
        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeUpdate);
        Assoc_members testAssoc_members = assoc_membersList.get(assoc_membersList.size() - 1);
        assertThat(testAssoc_members.getMembers_id()).isEqualTo(UPDATED_MEMBERS_ID);
        assertThat(testAssoc_members.getAssociations_id()).isEqualTo(UPDATED_ASSOCIATIONS_ID);
        assertThat(testAssoc_members.getJoined_date()).isEqualTo(UPDATED_JOINED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingAssoc_members() throws Exception {
        int databaseSizeBeforeUpdate = assoc_membersRepository.findAll().size();

        // Create the Assoc_members

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssoc_membersMockMvc.perform(put("/api/assoc-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(assoc_members)))
            .andExpect(status().isCreated());

        // Validate the Assoc_members in the database
        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssoc_members() throws Exception {
        // Initialize the database
        assoc_membersRepository.saveAndFlush(assoc_members);
        int databaseSizeBeforeDelete = assoc_membersRepository.findAll().size();

        // Get the assoc_members
        restAssoc_membersMockMvc.perform(delete("/api/assoc-members/{id}", assoc_members.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Assoc_members> assoc_membersList = assoc_membersRepository.findAll();
        assertThat(assoc_membersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assoc_members.class);
        Assoc_members assoc_members1 = new Assoc_members();
        assoc_members1.setId(1L);
        Assoc_members assoc_members2 = new Assoc_members();
        assoc_members2.setId(assoc_members1.getId());
        assertThat(assoc_members1).isEqualTo(assoc_members2);
        assoc_members2.setId(2L);
        assertThat(assoc_members1).isNotEqualTo(assoc_members2);
        assoc_members1.setId(null);
        assertThat(assoc_members1).isNotEqualTo(assoc_members2);
    }
}
