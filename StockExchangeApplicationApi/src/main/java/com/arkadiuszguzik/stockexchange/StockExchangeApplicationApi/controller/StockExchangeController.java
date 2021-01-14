package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.controller;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto.UserDTO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service.HistoryService;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service.StockService;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service.TransactionService;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service.UserService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import static java.lang.System.currentTimeMillis;

import io.jsonwebtoken.security.Keys;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StockExchangeController {

    @Autowired
    private UserService userService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private StockService stockService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/authorization")
    public UserDTO getAuthorization(@RequestParam("username") String username, @RequestParam("password") String password){

        if(userService.exist(username)){
            UserDTO user = userService.authorization(username, password);
            if(user != null){
                long currentTimeMillis = currentTimeMillis();
                Date expirationTime = new Date(currentTimeMillis + 1800000);
                String token = Jwts.builder()
                        .claim("username", username)
                        .claim("password", password)
                        .setIssuedAt(new Date(currentTimeMillis))
                        .setExpiration(expirationTime)
                        .signWith(Keys.hmacShaKeyFor("NwDmWaFr6JcUe5WCpLfT0pXEizIkmC06".getBytes()),SignatureAlgorithm.HS256)
                        .setHeaderParam("typ", "JWT")
                        .compact();

                user.setToken(token);
                user.setExpirationTime(expirationTime.getTime());
                return user;
            }
        }
        return null;
    }

    @PostMapping("/registration")
    public boolean registerTheUser(@RequestBody User user){
        if(userService.exist(user.getUsername())){
            return false;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.registration(user);
        return true;
    }

    @GetMapping("/historyStockList/{userId}")
    public List<History> getHistoryStockList(@PathVariable long userId){
        return historyService.getHistoryStockList(userId);
    }

    @GetMapping("/historyStockList/{userId}/{value}")
    public List<History> getHistoryStockList(@PathVariable long userId, @PathVariable String value){
        return historyService.getHistoryStockList(userId,value);
    }

    @GetMapping("/portfolioStockList/{userId}")
    public List<Stock> getPortfolioStockList(@PathVariable long userId){
        return stockService.getPortfolioStockList(userId);
    }

    @PostMapping("/purchaseTransaction")
    public boolean purchaseTransaction(@RequestBody History history){
        double userMoney = userService.getUser(history.getUserId()).getMoney();
        double orderValue = history.getNumber()*history.getPrice();
        if(userMoney >= orderValue){
            transactionService.purchaseTransaction(history);
            return true;
        }
        return false;
    }

    @PostMapping("/saleTransaction")
    public boolean saleTransaction(@RequestBody History history){
        Stock userStock = stockService.getStockByShortCut(history.getUserId(), history.getShortcut());
        if(userStock.getNumber() >= history.getNumber()){
            transactionService.saleTransaction(history);
            return true;
        }
        return false;
    }

    @GetMapping("/getMoney/{userId}")
    public double getMoney(@PathVariable long userId){
        return userService.getUser(userId).getMoney();
    }

}