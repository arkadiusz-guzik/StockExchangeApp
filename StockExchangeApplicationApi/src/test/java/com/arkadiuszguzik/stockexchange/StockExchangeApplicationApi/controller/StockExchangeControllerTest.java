package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.controller;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dto.UserDTO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThan;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.mockito.ArgumentMatchers.*;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class StockExchangeControllerTest {

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    UserServiceImpl userService;

    @Mock
    HistoryServiceImpl historyService;

    @Mock
    StockServiceImpl stockService;

    @Mock
    TransactionServiceImpl transactionService;

    @InjectMocks
    StockExchangeController stockExchangeController;

    @Test
    void authorizationShouldReturnNullIfThereIsNotEnteredUsername() {
        when(userService.exist(anyString())).thenReturn(false);
        String username = "username";
        String password = "password";

        UserDTO user = stockExchangeController.getAuthorization(username, password);

        assertNull(user);
    }

    @Test
    void authorizationShouldReturnUser() {
        String username = "username";
        String password = "password";
        UserDTO user = new UserDTO(1, username, 10000.0);
        when(userService.exist(anyString())).thenReturn(true);
        when(userService.authorization(anyString(), anyString())).thenReturn(user);

        UserDTO theUser = stockExchangeController.getAuthorization(username, password);

        assertNotNull(theUser);
    }

    @Test
    void registerTheUserShouldReturnFalseIfNameOfUserExists() {
        User user = new User(1, "", "", "");
        when(userService.exist(anyString())).thenReturn(true);

        boolean exist = stockExchangeController.registerTheUser(user);

        verify(userService).exist(anyString());
        assertFalse(exist);
    }

    @Test
    void registerTheUserShouldRegisterUser() {
        User user = new User(1, "", "", "");
        when(userService.exist(anyString())).thenReturn(false);

        boolean exist = stockExchangeController.registerTheUser(user);

        verify(userService).exist(anyString());
        verify(passwordEncoder).encode(anyString());
        verify(userService).registration(any(User.class));
        assertTrue(exist);
    }

    @Test
    void getHistoryStockList() {
        List<History> historyList = new ArrayList<>();
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 10, 100.00, 10000.00,new User(1, "", "", ""));
        historyList.add(history);
        when(historyService.getHistoryStockList(anyLong())).thenReturn(historyList);

        List<History> histories = stockExchangeController.getHistoryStockList(anyLong());

        verify(historyService).getHistoryStockList(anyLong());
        assertNotNull(histories);
    }

    @Test
    void getHistoryStockListByValue() {
        List<History> historyList = new ArrayList<>();
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 10, 100.00, 10000.00,new User(1, "", "", ""));
        historyList.add(history);
        when(historyService.getHistoryStockList(anyLong(), anyString())).thenReturn(historyList);

        List<History> histories = stockExchangeController.getHistoryStockList(anyLong(), anyString());

        verify(historyService).getHistoryStockList(anyLong(),anyString());
        assertNotNull(histories);
    }

    @Test
    void getPortfolioStockList() {
        List<Stock> stockList = new ArrayList<>();
        Stock stock = new Stock(1,"Aple","AAPL",1,10.00,new User(1, "","",""));
        stockList.add(stock);

        when(stockService.getPortfolioStockList(anyLong())).thenReturn(stockList);

        List<Stock> stocks = stockExchangeController.getPortfolioStockList(anyLong());

        verify(stockService).getPortfolioStockList(anyLong());
        assertNotNull(stocks);
    }

    @Test
    void purchaseTransactionShouldBeCorrect() {
        User user = new User(1, "username", "password", "username@mail.com");
        user.setMoney(10000);
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 1, 100.00, 10000.00, user);
        when(userService.getUser(anyLong())).thenReturn(user);

        boolean purchaseTransaction = stockExchangeController.purchaseTransaction(history);

        verify(userService).getUser(anyLong());
        verify(transactionService).purchaseTransaction(any(History.class));
        assertThat(userService.getUser(anyLong()).getMoney(), greaterThanOrEqualTo(history.getNumber()*history.getPrice()));
        assertTrue(purchaseTransaction);
    }

    @Test
    void purchaseTransactionShouldBeIncorrectIfUserDoNotHaveEnoughMoney(){
        User user = new User(1, "username", "password", "username@mail.com");
        user.setMoney(0);
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 1, 100.00, 10000.00, user);
        when(userService.getUser(anyLong())).thenReturn(user);

        boolean purchaseTransaction = stockExchangeController.purchaseTransaction(history);

        verify(userService).getUser(anyLong());
        assertThat(userService.getUser(anyLong()).getMoney(), lessThan(history.getNumber()*history.getPrice()));
        assertFalse(purchaseTransaction);
    }

    @Test
    void saleTransactionShouldBeCorrect() {
        Stock stock = new Stock(1,"Aple","AAPL",10,10.00,new User(1, "","",""));
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 1, 100.00, 10000.00,new User(1, "", "", ""));
        when(stockService.getStockByShortCut(anyLong(),anyString())).thenReturn(stock);

        boolean saleTransaction = stockExchangeController.saleTransaction(history);

        verify(stockService).getStockByShortCut(anyLong(),anyString());
        verify(transactionService).saleTransaction(any(History.class));
        assertThat(stock.getNumber(), greaterThanOrEqualTo(history.getNumber()));
        assertTrue(saleTransaction);
    }

    @Test
    void saleTransactionShouldBeIncorrectIfUserBoughtMoreStockThanTheyHave() {
        Stock stock = new Stock(1,"Aple","AAPL",1,10.00,new User(1, "","",""));
        History history = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 5, 100.00, 10000.00,new User(1, "", "", ""));
        when(stockService.getStockByShortCut(anyLong(),anyString())).thenReturn(stock);

        boolean saleTransaction = stockExchangeController.saleTransaction(history);

        verify(stockService).getStockByShortCut(anyLong(),anyString());
        assertThat(stock.getNumber(), lessThan(history.getNumber()));
        assertFalse(saleTransaction);
    }

    @Test
    void getMoney() {
        User user = new User(1, "", "", "");
        when(userService.getUser(anyLong())).thenReturn(user);

        double money = stockExchangeController.getMoney(anyLong());

        verify(userService).getUser(anyLong());
        assertThat(money, equalTo(user.getMoney()));
    }
}