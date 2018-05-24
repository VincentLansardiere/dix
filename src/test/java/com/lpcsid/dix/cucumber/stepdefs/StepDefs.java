package com.lpcsid.dix.cucumber.stepdefs;

import com.lpcsid.dix.DixApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DixApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
