package com.cmlcz.projects.its_backend.user.repository;

import com.cmlcz.projects.its_backend.user.model.User;
import com.cmlcz.projects.its_backend.user.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsById(UUID id);

    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);

    @Query("SELECT u from User u JOIN fetch u.role order by u.creationDate asc")
    List<User> findAllWithRolesByOrderByCreationDateAsc();

    @Query("select u from User u join fetch u.role where u.id = :id")
    Optional<User> findById(UUID id);

    @Query("select u from User u join fetch u.role r join fetch r.permissions where u.username = :username")
    Optional<User> findByUsernameWithRoleAndPermissions(String username);

    @Modifying
    @Query("update User u SET u.role = :base where u.role = :old")
    int reassignUsers(@Param("old") UserRole old, @Param("base") UserRole base);

}
