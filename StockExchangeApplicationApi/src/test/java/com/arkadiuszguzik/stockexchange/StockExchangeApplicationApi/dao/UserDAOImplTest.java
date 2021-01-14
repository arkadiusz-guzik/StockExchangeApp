package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserDAOImplTest {

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    SessionFactory sessionFactory;

    @Mock
    Session currentSession;

    @InjectMocks
    UserDAOImpl userDAO;

    @Mock
    Query<User> theQuery;

    List<User> userList;
    User u0,u1;

    @BeforeEach
    void init(){
        MockitoAnnotations.initMocks(this);
        when(sessionFactory.getCurrentSession()).thenReturn(currentSession);

        userList = new ArrayList<>();
        u0 = new User(0, "test0", "password0", "test1@mail.com");
        u1 = new User(1, "test1", "password1", "test1@mail.com");
        userList.add(u1);
    }

    @Test
    void getUser() {
        long id = 1;
        when(currentSession.get(User.class, id)).thenReturn(u1);

        User user = userDAO.getUser(id);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).get(eq(User.class),anyLong());
        assertNotNull(user);
    }

    @Test
    void getUsers(){
        when(currentSession.createQuery(anyString(),eq(User.class))).thenReturn(theQuery);
        when(theQuery.getResultList()).thenReturn(userList);

        List<User> users = userDAO.getUsers();

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(),eq(User.class));
        verify(theQuery).getResultList();
        assertNotNull(users);
        assertNotNull(users.get(0));
    }

    @Test
    void correctAuthorizationShouldReturnUser() {
        when(currentSession.createQuery(anyString(),eq(User.class))).thenReturn(theQuery);
        when(theQuery.uniqueResult()).thenReturn(u1);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);

        String username = "test";
        String password = "password";
        User user = userDAO.authorization(username, password);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(),eq(User.class));
        verify(theQuery).setParameter(eq("theUsername"), anyString());
        verify(theQuery).uniqueResult();
        verify(passwordEncoder).matches(eq(password), eq(user.getPassword()));
        assertNotNull(user);
    }

    @Test
    void authorizationWithWrongPasswordShouldReturnNull() {
        when(currentSession.createQuery(anyString(),eq(User.class))).thenReturn(theQuery);
        when(theQuery.uniqueResult()).thenReturn(u1);
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(false);

        String username = "test";
        String password = "password";
        User user = userDAO.authorization(username, password);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(),eq(User.class));
        verify(theQuery).setParameter(eq("theUsername"), anyString());
        verify(theQuery).uniqueResult();
        verify(passwordEncoder).matches(anyString(), anyString());
        assertNull(user);
    }

    @Test
    void saveUserWithUserIdEqualsZero(){
        userDAO.saveUser(u0);

        verify(currentSession).saveOrUpdate(any(User.class));
        assertThat(u0.getMoney(), equalTo(10000.0));
    }

    @Test
    void saveUserWithUserIdEqualsOne(){
        userDAO.saveUser(u1);

        verify(currentSession).saveOrUpdate(any(User.class));
        assertThat(u1.getMoney(), equalTo(0.0));
    }
}