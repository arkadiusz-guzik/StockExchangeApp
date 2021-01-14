package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.hamcrest.Matchers;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class StockDAOImplTest {

    @Mock
    SessionFactory sessionFactory;

    @Mock
    Session currentSession;

    @Mock
    Query<Stock> theQuery;

    @InjectMocks
    StockDAOImpl stockDAO;

    List<Stock> stockList;
    Stock s1, s2;

    @BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
        when(sessionFactory.getCurrentSession()).thenReturn(currentSession);

        stockList = new ArrayList<>();

        s1 = new Stock(1,"Aple","AAPL",1,10.00,new User(1, "","",""));
        stockList.add(s1);

    }

    @Test
    void getStockList(){
        long userId = 1;
        when(currentSession.createQuery(anyString(), eq(Stock.class))).thenReturn(theQuery);
        when(theQuery.getResultList()).thenReturn(stockList);

        List<Stock> stocks = stockDAO.getStockList(userId);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(), eq(Stock.class));
        verify(theQuery).setParameter(eq("theUserId"),anyLong());
        verify(theQuery).getResultList();
        assertNotNull(stocks);
        assertNotNull(stocks.get(0));
    }

    @Test
    void saveStock(){
        stockDAO.saveStock(s1);

        verify(currentSession).saveOrUpdate(any(Stock.class));
    }

    @Test
    void getStockByShortCut(){
        long userId = 1;
        String shortcut = "test";
        when(currentSession.createQuery(anyString(), eq(Stock.class))).thenReturn(theQuery);
        when(theQuery.uniqueResult()).thenReturn(s1);

        Stock stock = stockDAO.getStockByShortCut(userId, shortcut);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(), eq(Stock.class));
        verify(theQuery).setParameter(eq("theUserId"),anyLong());
        verify(theQuery).setParameter(eq("theShortcut"),anyString());
        verify(theQuery).uniqueResult();
        assertNotNull(stock);
    }

    @Test
    void deleteStockById(){
        long userId = 1;
        when(currentSession.createQuery(anyString())).thenReturn(theQuery);

        stockDAO.deleteStockById(userId);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString());
        verify(theQuery).setParameter(eq("theStockId"),anyLong());
        verify(theQuery).executeUpdate();
    }
}