package com.cmlcz.projects.its_backend.issue.mapper;

import com.cmlcz.projects.its_backend.common.exception.ResourceNotFoundException;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityCreateDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityDTO;
import com.cmlcz.projects.its_backend.issue.dto.IssueActivity.IssueActivityUpdateDTO;
import com.cmlcz.projects.its_backend.issue.model.Issue;
import com.cmlcz.projects.its_backend.issue.model.IssueActivity;
import com.cmlcz.projects.its_backend.issue.repository.IssueRepository;
import com.cmlcz.projects.its_backend.user.mapper.UserMapper;
import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.repository.UserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public abstract class IssueActivityMapper {


    @Autowired
    protected IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;


    @Mapping(source = "performedBy.username", target = "performed_by_username")
    public abstract IssueActivityDTO toDto(IssueActivity issueActivity);

    @Mapping(source = "performed_by_id", target = "performedBy", qualifiedByName = "mapUserById")
    public abstract IssueActivity toEntity(IssueActivityCreateDTO issueActivityCreateDTO);

    public abstract void updateFromDto(IssueActivityUpdateDTO issueActivityUpdateDTO, @MappingTarget IssueActivity issueActivity);


    @Named("mapUserById")
    User mapUserById(UUID id){
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
