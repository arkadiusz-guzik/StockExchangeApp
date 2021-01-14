package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.StockDAOImpl;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


class StockServiceImplTest {

    @InjectMocks
    StockServiceImpl stockService;

    @Mock
    StockDAOImpl stockDAO;

    List<Stock> stockList;
    Stock s1;

    @BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);

        stockList = new ArrayList<>();
        s1 = new Stock(1,"Aple","AAPL",1,10.00,new User(1, "","",""));
        stockList.add(s1);
    }

    @Test
    void getPortfolioStockList(){
        when(stockDAO.getStockList(anyLong())).thenReturn(stockList);

        List<Stock> stocks = stockService.getPortfolioStockList(anyLong());

        verify(stockDAO).getStockList(anyLong());
        assertNotNull(stocks);
    }

    @Test
    void getStockByShortCut(){
        when(stockDAO.getStockByShortCut(anyLong(), anyString())).thenReturn(s1);

        Stock stock = stockService.getStockByShortCut(anyLong(), anyString());

        verify(stockDAO).getStockByShortCut(anyLong(),anyString());
        assertNotNull(stock);
    }

    @Test
    void saveStock(){
        stockService.saveStock(s1);

        verify(stockDAO).saveStock(any(Stock.class));
    }
}