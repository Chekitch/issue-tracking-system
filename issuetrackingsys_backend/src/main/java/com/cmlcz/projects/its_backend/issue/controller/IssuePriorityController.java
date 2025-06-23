package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.issue.repository.IssuePriorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/issue-priority")
public class IssuePriorityController {

    @Autowired
    private IssuePriorityRepository issuePriorityRepository;


}
