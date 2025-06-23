package com.cmlcz.projects.its_backend.issue.controller;

import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/issue")
public class IssueController {


    @Autowired
    private IssueRepository issueRepository;


    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }
    @GetMapping("/{id}")
    public Issue getIssue(@PathVariable UUID id) {
        return issueRepository.findById(id).orElseThrow();
    }


    @PostMapping()
    public Issue createIssue(@RequestBody Issue issue) {
        issueRepository.save(issue);
        return issue;
    }
}
