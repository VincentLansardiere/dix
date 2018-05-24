package com.lpcsid.dix.web.rest;

import com.lpcsid.dix.DixApp;

import com.lpcsid.dix.domain.Association;
import com.lpcsid.dix.domain.UserProfile;
import com.lpcsid.dix.repository.AssociationRepository;
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
 * Test class for the AssociationResource REST controller.
 *
 * @see AssociationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DixApp.class)
public class AssociationResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_PICTURE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTCODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTCODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    @Autowired
    private AssociationRepository associationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssociationMockMvc;

    private Association association;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssociationResource associationResource = new AssociationResource(associationRepository);
        this.restAssociationMockMvc = MockMvcBuilders.standaloneSetup(associationResource)
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
    public static Association createEntity(EntityManager em) {
        Association association = new Association()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .address(DEFAULT_ADDRESS)
            .postcode(DEFAULT_POSTCODE)
            .city(DEFAULT_CITY);
        // Add required entity
        UserProfile president = UserProfileResourceIntTest.createEntity(em);
        em.persist(president);
        em.flush();
        association.setPresident(president);
        return association;
    }

    @Before
    public void initTest() {
        association = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssociation() throws Exception {
        int databaseSizeBeforeCreate = associationRepository.findAll().size();

        // Create the Association
        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isCreated());

        // Validate the Association in the database
        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeCreate + 1);
        Association testAssociation = associationList.get(associationList.size() - 1);
        assertThat(testAssociation.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAssociation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAssociation.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testAssociation.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testAssociation.getPostcode()).isEqualTo(DEFAULT_POSTCODE);
        assertThat(testAssociation.getCity()).isEqualTo(DEFAULT_CITY);
    }

    @Test
    @Transactional
    public void createAssociationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = associationRepository.findAll().size();

        // Create the Association with an existing ID
        association.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        // Validate the Association in the database
        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setName(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setDescription(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPictureIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setPicture(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setAddress(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPostcodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setPostcode(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationRepository.findAll().size();
        // set the field null
        association.setCity(null);

        // Create the Association, which fails.

        restAssociationMockMvc.perform(post("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isBadRequest());

        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAssociations() throws Exception {
        // Initialize the database
        associationRepository.saveAndFlush(association);

        // Get all the associationList
        restAssociationMockMvc.perform(get("/api/associations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(association.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(DEFAULT_PICTURE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postcode").value(hasItem(DEFAULT_POSTCODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())));
    }

    @Test
    @Transactional
    public void getAssociation() throws Exception {
        // Initialize the database
        associationRepository.saveAndFlush(association);

        // Get the association
        restAssociationMockMvc.perform(get("/api/associations/{id}", association.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(association.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.picture").value(DEFAULT_PICTURE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.postcode").value(DEFAULT_POSTCODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssociation() throws Exception {
        // Get the association
        restAssociationMockMvc.perform(get("/api/associations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssociation() throws Exception {
        // Initialize the database
        associationRepository.saveAndFlush(association);
        int databaseSizeBeforeUpdate = associationRepository.findAll().size();

        // Update the association
        Association updatedAssociation = associationRepository.findOne(association.getId());
        // Disconnect from session so that the updates on updatedAssociation are not directly saved in db
        em.detach(updatedAssociation);
        updatedAssociation
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .address(UPDATED_ADDRESS)
            .postcode(UPDATED_POSTCODE)
            .city(UPDATED_CITY);

        restAssociationMockMvc.perform(put("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssociation)))
            .andExpect(status().isOk());

        // Validate the Association in the database
        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeUpdate);
        Association testAssociation = associationList.get(associationList.size() - 1);
        assertThat(testAssociation.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAssociation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAssociation.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testAssociation.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testAssociation.getPostcode()).isEqualTo(UPDATED_POSTCODE);
        assertThat(testAssociation.getCity()).isEqualTo(UPDATED_CITY);
    }

    @Test
    @Transactional
    public void updateNonExistingAssociation() throws Exception {
        int databaseSizeBeforeUpdate = associationRepository.findAll().size();

        // Create the Association

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssociationMockMvc.perform(put("/api/associations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(association)))
            .andExpect(status().isCreated());

        // Validate the Association in the database
        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssociation() throws Exception {
        // Initialize the database
        associationRepository.saveAndFlush(association);
        int databaseSizeBeforeDelete = associationRepository.findAll().size();

        // Get the association
        restAssociationMockMvc.perform(delete("/api/associations/{id}", association.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Association> associationList = associationRepository.findAll();
        assertThat(associationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Association.class);
        Association association1 = new Association();
        association1.setId(1L);
        Association association2 = new Association();
        association2.setId(association1.getId());
        assertThat(association1).isEqualTo(association2);
        association2.setId(2L);
        assertThat(association1).isNotEqualTo(association2);
        association1.setId(null);
        assertThat(association1).isNotEqualTo(association2);
    }
}
