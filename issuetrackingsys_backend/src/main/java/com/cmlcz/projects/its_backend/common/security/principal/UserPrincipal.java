package com.cmlcz.projects.its_backend.common.security.principal;

import com.cmlcz.projects.its_backend.user.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class UserPrincipal implements UserDetails {

    private final UUID id;
    private final String username;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getHashedPassword();

        this.authorities = Stream.concat(
                Stream.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRole())),
                user.getRole().getPermissions().stream().map(
                        p -> new SimpleGrantedAuthority("PERM_" + p.getDescription()))
                ).collect(Collectors.toSet());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
