package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.*;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class TransactionServiceImplTest {

    @Mock
    StockDAOImpl stockDAO;

    @Mock
    HistoryDAOImpl historyDAO;

    @Mock
    UserDAOImpl userDAO;

    @InjectMocks
    TransactionServiceImpl transactionService;

    History history, history2, history3;
    User user;
    Stock stock;

    @BeforeEach
    void init(){
        MockitoAnnotations.initMocks(this);

        user = new User(1, "", "", "");
        user.setMoney(10000);

        history = new History(1, "12/12/2020","Buy","APLE","AAPL",40.00, 10, 400.00, 9600.00, user);
        history2 = new History(1, "12/12/2020","Buy","APLE","AAPL",50.00, 4, 200.00, 9700.00, user);
        history3 = new History(1, "12/12/2020","Buy","APLE","AAPL",50.00, 1, 50.00, 9850.00, user);

        stock = new Stock(1,"APLE","AAPL",4,250.00, user);

        when(userDAO.getUser(anyLong())).thenReturn(user);
    }

    @Test
    void purchaseTransaction() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        transactionService.purchaseTransaction(history);

        verify(stockDAO).getStockByShortCut(anyLong(), anyString());
        verify(stockDAO).saveStock(any(Stock.class));
        verify(historyDAO).addHistory(any(History.class));
    }

    @Test
    void purchaseTransactionShouldComputeNewPriceAndNumberOfStockIfUserBoughtTheSameStockBefore() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        transactionService.purchaseTransaction(history);

        verify(stockDAO).saveStock(stock);
        assertAll(
                () -> assertThat(stock.getPrice(), equalTo(100.0)),
                () -> assertThat(stock.getNumber(), equalTo(14))
                );
    }

    @Test
    void purchaseTransactionShouldCreateANewStockIfTheyDoNotExist() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(null);

        transactionService.purchaseTransaction(history);

        verify(stockDAO).saveStock(any(Stock.class));
    }

    @Test
    void userShouldHasLessMoneyAfterTransactionThanBeforeIf() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        double userMoneyBeforeTransaction = user.getMoney();
        transactionService.purchaseTransaction(history);

        assertAll(
                () -> assertThat(user.getMoney(), lessThan(userMoneyBeforeTransaction)),
                () -> assertThat(user.getMoney(), equalTo(9600.0))
        );
    }

    @Test
    void saleTransactionShouldDeleteStockIfUserSellAll() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        transactionService.saleTransaction(history2);

        verify(stockDAO).deleteStockById(anyLong());
        verify(historyDAO).addHistory(any(History.class));
        assertThat(history2.getNumber(), equalTo(stock.getNumber()));

    }

    @Test
    void saleTransactionShouldUpdateQuantityOfStockIfUserDoNotSellAll() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        transactionService.saleTransaction(history3);

        verify(stockDAO).saveStock(any(Stock.class));
        verify(historyDAO).addHistory(any(History.class));
        assertThat(stock.getNumber(), greaterThanOrEqualTo(1));
    }

    @Test
    void saleTransactionShouldUpdateAmountOfUserMoney() {
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(stock);

        double userMoneyBeforeTransaction = user.getMoney();
        transactionService.saleTransaction(history3);

        verify(stockDAO).getStockByShortCut(anyLong(),anyString());
        verify(historyDAO).addHistory(any(History.class));
        assertThat(user.getMoney(), not(equalTo(userMoneyBeforeTransaction)));
        assertThat(user.getMoney(), equalTo(10050.0));
    }
}