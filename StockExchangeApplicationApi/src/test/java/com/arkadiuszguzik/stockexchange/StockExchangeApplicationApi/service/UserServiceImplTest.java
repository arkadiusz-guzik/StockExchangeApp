package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.UserDAOImpl;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto.UserDTO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserDAOImpl userDAO;

    boolean exist;

    List<User> userList;
    User u1, u2, u3;

    @BeforeEach
    void init() {
        MockitoAnnotations.initMocks(this);

        u1 = new User(1, "test1", "password1", "test1@mail.com");
        u2 = new User(2, "test2", "password2", "test2@mail.com");
        u3 = new User(3, "test3", "password3", "test3@mail.com");

        userList = new ArrayList<>();
        userList.add(u1);
        userList.add(u2);
        userList.add(u3);

        when(userDAO.getUsers()).thenReturn(userList);
    }

    @Test
    void getUser(){
        when(userDAO.getUser(anyLong())).thenReturn(u1);

        User user = userService.getUser(anyLong());

        verify(userDAO).getUser(anyLong());
        assertNotNull(user);
    }

    @Test
    void userShouldExist(){
        String username = "test2";
        exist = false;

        for(User user: userDAO.getUsers()){
            if (user.getUsername().equals(username)) {
                exist = true;
                break;
            }
        }
        assertTrue(exist);
    }

    @Test
    void userShouldNotExist(){
        String username = "test";
        exist = false;

        for(User user: userDAO.getUsers()){
            if (user.getUsername().equals(username)) {
                exist = true;
                break;
            }
        }
        assertFalse(exist);
    }

    @Test
    void authorization(){
        when(userDAO.authorization(anyString(),anyString())).thenReturn(u1);

        UserDTO user = userService.authorization(anyString(), anyString());

        verify(userDAO).authorization(anyString(), anyString());
        assertNotNull(user);
    }

    @Test
    void registration(){
        userService.registration(u1);

        verify(userDAO).saveUser(any(User.class));
    }
}