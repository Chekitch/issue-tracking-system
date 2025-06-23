package com.cmlcz.projects.its_backend;

import com.cmlcz.projects.its_backend.parentproject.model.ParentProject;
import com.cmlcz.projects.its_backend.parentproject.repository.ParentProjectRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class IssuetrackingsysBackendApplicationTests {

    ParentProjectRepository parentProjectRepository;

    @Test
    void contextLoads() {
        ParentProject parentProject = new ParentProject();
        parentProjectRepository.save(parentProject);
    }

}
