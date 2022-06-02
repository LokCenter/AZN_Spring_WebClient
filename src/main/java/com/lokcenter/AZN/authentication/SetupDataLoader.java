package com.lokcenter.AZN.authentication;

import com.lokcenter.AZN.database.Privilege;
import com.lokcenter.AZN.database.Repository.PrivilegeRepository;
import com.lokcenter.AZN.database.Repository.RoleRepository;
import com.lokcenter.AZN.database.Repository.UserRepository;
import com.lokcenter.AZN.database.Role;
import com.lokcenter.AZN.database.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    boolean setupDone = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (setupDone) {
            return;
        }

        Privilege readPrivilege = createPrivilegeIfNotFound("READ_PRIVILEGE");
        Privilege writePrivilege = createPrivilegeIfNotFound("WRITE_PRIVILEGE");

        List<Privilege> adminPrivileges = Arrays.asList(
                readPrivilege, writePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges);
        createRoleIfNotFound("ROLE_USER", List.of(readPrivilege));

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        // test user
        User user = new User();
        user.setPassword("sebi");
        user.setEnabled(1);
        user.setTokenExpired(0);
        user.setUsername("sebi");
        user.setRoles(List.of(adminRole));
        userRepository.save(user);
    }

    @Transactional
    public Role createRoleIfNotFound(String role_username, List<Privilege> privileges) {
        Role optionalRole = roleRepository.findByName(role_username);

        if (optionalRole == null) {
            Role role = new Role(role_username);
            role.setPrivileges(privileges);
            roleRepository.save(role);

            return role;
        }

        return optionalRole;
    }

    @Transactional
    public Privilege createPrivilegeIfNotFound(String name) {

        Privilege priv = privilegeRepository.findByName(name);

        if (priv == null) {
            Privilege privilege = new Privilege(name);
            privilegeRepository.save(privilege);
            return privilege;
        } else {
          return priv;
        }
    }
}
