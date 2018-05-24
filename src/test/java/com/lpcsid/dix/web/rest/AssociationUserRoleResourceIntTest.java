package com.lpcsid.dix.web.rest;

import com.lpcsid.dix.DixApp;

import com.lpcsid.dix.domain.AssociationUserRole;
import com.lpcsid.dix.repository.AssociationUserRoleRepository;
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
 * Test class for the AssociationUserRoleResource REST controller.
 *
 * @see AssociationUserRoleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DixApp.class)
public class AssociationUserRoleResourceIntTest {

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    @Autowired
    private AssociationUserRoleRepository associationUserRoleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAssociationUserRoleMockMvc;

    private AssociationUserRole associationUserRole;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssociationUserRoleResource associationUserRoleResource = new AssociationUserRoleResource(associationUserRoleRepository);
        this.restAssociationUserRoleMockMvc = MockMvcBuilders.standaloneSetup(associationUserRoleResource)
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
    public static AssociationUserRole createEntity(EntityManager em) {
        AssociationUserRole associationUserRole = new AssociationUserRole()
            .role(DEFAULT_ROLE);
        return associationUserRole;
    }

    @Before
    public void initTest() {
        associationUserRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssociationUserRole() throws Exception {
        int databaseSizeBeforeCreate = associationUserRoleRepository.findAll().size();

        // Create the AssociationUserRole
        restAssociationUserRoleMockMvc.perform(post("/api/association-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationUserRole)))
            .andExpect(status().isCreated());

        // Validate the AssociationUserRole in the database
        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeCreate + 1);
        AssociationUserRole testAssociationUserRole = associationUserRoleList.get(associationUserRoleList.size() - 1);
        assertThat(testAssociationUserRole.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createAssociationUserRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = associationUserRoleRepository.findAll().size();

        // Create the AssociationUserRole with an existing ID
        associationUserRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssociationUserRoleMockMvc.perform(post("/api/association-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationUserRole)))
            .andExpect(status().isBadRequest());

        // Validate the AssociationUserRole in the database
        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = associationUserRoleRepository.findAll().size();
        // set the field null
        associationUserRole.setRole(null);

        // Create the AssociationUserRole, which fails.

        restAssociationUserRoleMockMvc.perform(post("/api/association-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationUserRole)))
            .andExpect(status().isBadRequest());

        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAssociationUserRoles() throws Exception {
        // Initialize the database
        associationUserRoleRepository.saveAndFlush(associationUserRole);

        // Get all the associationUserRoleList
        restAssociationUserRoleMockMvc.perform(get("/api/association-user-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(associationUserRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }

    @Test
    @Transactional
    public void getAssociationUserRole() throws Exception {
        // Initialize the database
        associationUserRoleRepository.saveAndFlush(associationUserRole);

        // Get the associationUserRole
        restAssociationUserRoleMockMvc.perform(get("/api/association-user-roles/{id}", associationUserRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(associationUserRole.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAssociationUserRole() throws Exception {
        // Get the associationUserRole
        restAssociationUserRoleMockMvc.perform(get("/api/association-user-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssociationUserRole() throws Exception {
        // Initialize the database
        associationUserRoleRepository.saveAndFlush(associationUserRole);
        int databaseSizeBeforeUpdate = associationUserRoleRepository.findAll().size();

        // Update the associationUserRole
        AssociationUserRole updatedAssociationUserRole = associationUserRoleRepository.findOne(associationUserRole.getId());
        // Disconnect from session so that the updates on updatedAssociationUserRole are not directly saved in db
        em.detach(updatedAssociationUserRole);
        updatedAssociationUserRole
            .role(UPDATED_ROLE);

        restAssociationUserRoleMockMvc.perform(put("/api/association-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssociationUserRole)))
            .andExpect(status().isOk());

        // Validate the AssociationUserRole in the database
        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeUpdate);
        AssociationUserRole testAssociationUserRole = associationUserRoleList.get(associationUserRoleList.size() - 1);
        assertThat(testAssociationUserRole.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingAssociationUserRole() throws Exception {
        int databaseSizeBeforeUpdate = associationUserRoleRepository.findAll().size();

        // Create the AssociationUserRole

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAssociationUserRoleMockMvc.perform(put("/api/association-user-roles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationUserRole)))
            .andExpect(status().isCreated());

        // Validate the AssociationUserRole in the database
        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAssociationUserRole() throws Exception {
        // Initialize the database
        associationUserRoleRepository.saveAndFlush(associationUserRole);
        int databaseSizeBeforeDelete = associationUserRoleRepository.findAll().size();

        // Get the associationUserRole
        restAssociationUserRoleMockMvc.perform(delete("/api/association-user-roles/{id}", associationUserRole.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssociationUserRole> associationUserRoleList = associationUserRoleRepository.findAll();
        assertThat(associationUserRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssociationUserRole.class);
        AssociationUserRole associationUserRole1 = new AssociationUserRole();
        associationUserRole1.setId(1L);
        AssociationUserRole associationUserRole2 = new AssociationUserRole();
        associationUserRole2.setId(associationUserRole1.getId());
        assertThat(associationUserRole1).isEqualTo(associationUserRole2);
        associationUserRole2.setId(2L);
        assertThat(associationUserRole1).isNotEqualTo(associationUserRole2);
        associationUserRole1.setId(null);
        assertThat(associationUserRole1).isNotEqualTo(associationUserRole2);
    }
}
