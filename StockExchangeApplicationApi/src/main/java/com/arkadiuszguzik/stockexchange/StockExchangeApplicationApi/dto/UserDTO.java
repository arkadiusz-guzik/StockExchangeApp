package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto;

public class UserDTO {
    private long user_id;
    private String username;
    private double money;
    private String token;
    private long expirationTime;

    public UserDTO(long user_id, String username, double money){
        this.user_id = user_id;
        this.username = username;
        this.money = money;
    }

    public long getExpirationTime() {
        return expirationTime;
    }

    public void setExpirationTime(long expirationTime) {
        this.expirationTime = expirationTime;
    }

    public void setToken(String token){
        this.token = token;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public String getToken() {
        return token;
    }

    @Override
    public String toString() {
        return "user_id = " + user_id + " username = " + username + " money = " + money + "\ntoken = "+token;
    }
}
