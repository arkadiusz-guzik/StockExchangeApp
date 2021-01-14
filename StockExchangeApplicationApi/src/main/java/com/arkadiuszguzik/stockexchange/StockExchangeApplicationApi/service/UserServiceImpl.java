package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.UserDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto.UserDTO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public User getUser(long id) {

        return userDAO.getUser(id);
    }

    @Override
    @Transactional
    public boolean exist(String username) {
        List<User> userList = userDAO.getUsers();

        for(User user : userList){
            if(user.getUsername().equals(username)){
                return true;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public UserDTO authorization(String username, String password) {
        User user = userDAO.authorization(username, password);
        if(user != null){
            return new UserDTO(user.getUserId(), user.getUsername(), user.getMoney());
        }
        return null;
    }

    @Override
    @Transactional
    public void registration(User user) {
        userDAO.saveUser(user);
    }

}
