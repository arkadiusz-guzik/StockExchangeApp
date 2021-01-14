package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;

import java.util.List;

public interface UserDAO {

    public User getUser(long id);
    public List<User> getUsers();
    public User authorization(String username, String password);
    public void saveUser(User user);
}
