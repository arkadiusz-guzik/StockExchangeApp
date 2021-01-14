package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto.UserDTO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;

import java.util.List;

public interface UserService {

    public User getUser(long id);
    public boolean exist(String username);
    public UserDTO authorization(String username, String password);
    public void registration(User user);
}
