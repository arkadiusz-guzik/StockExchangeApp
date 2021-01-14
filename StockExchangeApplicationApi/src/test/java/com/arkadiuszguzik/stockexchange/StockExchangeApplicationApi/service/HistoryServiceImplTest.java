package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.HistoryDAOImpl;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class HistoryServiceImplTest {

    @Mock
    HistoryDAOImpl historyDAO;

    @InjectMocks
    HistoryServiceImpl historyService;

    History h1;
    List<History> historyList;


    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);

        historyList = new ArrayList<>();
        h1 = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 10, 100.00, 10000.00,new User(1, "", "", ""));
        historyList.add(h1);
    }

    @Test
    void getHistoryStockList(){
        when(historyDAO.getStockList(anyLong())).thenReturn(historyList);

        List<History> historyList = historyService.getHistoryStockList(anyLong());

        verify(historyDAO).getStockList(anyLong());
        assertNotNull(historyList);
    }

    @Test
    void getHistoryStockListByValue(){
        when(historyDAO.findStockListByValue(anyLong(), anyString())).thenReturn(historyList);

        List<History> historyList = historyService.getHistoryStockList(anyLong(),anyString());

        verify(historyDAO).findStockListByValue(anyLong(), anyString());
        assertNotNull(historyList);
    }

    @Test
    void addHistory(){
        historyService.addHistory(h1);
        verify(historyDAO).addHistory(any(History.class));
    }

}