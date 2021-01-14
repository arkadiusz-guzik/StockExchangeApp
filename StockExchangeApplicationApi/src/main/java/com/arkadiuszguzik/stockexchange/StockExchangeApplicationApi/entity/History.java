package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private long historyId;

    @Column(name = "date")
    private String date;

    @Column(name = "name")
    private String name;

    @Column(name = "action")
    private String action;

    @Column(name = "shortcut")
    private String shortcut;

    @Column(name = "price")
    private double price;

    @Column(name = "number")
    private int number;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "account_balance")
    private double accountBalance;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public History() {
        this.historyId = 0;
        this.date = null;
        this.action = "";
        this.name = "";
        this.shortcut = "";
        this.price = 0;
        this.number = 0;
        this.totalPrice = 0;
        this.accountBalance = 0;
        this.user = null;
    }

    public History(long historyId, String date, String action, String name, String shortcut, double price, int number, double totalPrice, double accountBalance, User user) {
        this.historyId = historyId;
        this.date = date;
        this.action = action;
        this.name = name;
        this.shortcut = shortcut;
        this.price = price;
        this.number = number;
        this.totalPrice = totalPrice;
        this.accountBalance = accountBalance;
        this.user = user;
    }

    public long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(long historyId) {
        this.historyId = historyId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortcut() {
        return shortcut;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public User getUser(){
        return this.user;
    }

    public long getUserId(){
        return this.user.getUserId();
    }

    public void setUserId(long userId){
        this.user.setUserId(userId);
    }

    @Override
    public String toString() {
        return "History{" +
                "historyId=" + historyId +
                ", date=" + date +
                ", name='" + name + '\'' +
                ", action='" + action + '\'' +
                ", shortcut='" + shortcut + '\'' +
                ", price=" + price +
                ", number=" + number +
                ", totalPrice=" + totalPrice +
                ", accountBalance=" + accountBalance +

                ", user  = " +user.toString() +
                '}';
    }
}
