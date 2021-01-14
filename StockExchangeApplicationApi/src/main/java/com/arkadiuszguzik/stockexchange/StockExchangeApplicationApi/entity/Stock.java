package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name="stocks")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private long stockId;

    @Column(name = "name")
    private String name;

    @Column(name = "shortcut")
    private String shortcut;

    @Column(name = "number")
    private int number;

    @Column(name = "price")
    private double price;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Stock(){
        this.stockId = 0;
        this.name = "";
        this.shortcut = "";
        this.number = 0;
        this.price = 0;
        this.user = null;
    }

    public Stock(long stockId, String name, String shortcut, int number, double price, User user) {
        this.stockId = stockId;
        this.name = name;
        this.shortcut = shortcut;
        this.number = number;
        this.price = price;
        this.user = user;
    }

    public long getStockId() {
        return stockId;
    }

    public void setStockId(long stockId) {
        this.stockId = stockId;
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

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "stockId=" + stockId +
                ", name='" + name + '\'' +
                ", shortcut='" + shortcut + '\'' +
                ", number=" + number +
                ", price=" + price +
                ", user=" + user +
                '}';
    }
}
