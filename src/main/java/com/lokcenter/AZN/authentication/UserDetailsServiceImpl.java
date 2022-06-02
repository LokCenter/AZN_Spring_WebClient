package com.lokcenter.AZN.authentication;

import com.lokcenter.AZN.database.Privilege;
import com.lokcenter.AZN.database.Repository.RoleRepository;
import com.lokcenter.AZN.database.Repository.UserRepository;
import com.lokcenter.AZN.database.Role;
import com.lokcenter.AZN.database.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageSource message;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // here we use own find method
        User user  = userRepository.findByUsername(username);

        // check if user exists
       if (user == null) {
           throw new UsernameNotFoundException("username not found");
       } else {
           // create new spring user
           return new org.springframework.security.core.userdetails.User(
                   user.getUsername(), user.getPassword(),  user.getEnabled() != 0,
                   true, true, true, 
                   getAuthorities(user.getRoles())
           );
       }
    }

     private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
         return getGrantedAuthorities(getPrivileges(roles));
     }

    private List<String> getPrivileges(Collection<Role> roles) {
        List<String> privileges = new ArrayList<>();
        List<Privilege> collection = new ArrayList<>();

        for (Role role : roles) {
            privileges.add(role.getName());
            collection.addAll(role.getPrivileges());
        }
        for (Privilege item : collection) {
            privileges.add(item.getName());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        // make authorities
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        return authorities;
    }

}
