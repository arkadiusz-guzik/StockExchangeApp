package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.ArgumentMatchers.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class HistoryDAOImplTest {

    @Mock
    private SessionFactory sessionFactory;

    @Mock
    private Session currentSession;

    @Mock
    private Query<History> theQuery;

    @InjectMocks
    private HistoryDAOImpl historyDAO;

    private History h1, h2;
    private List<History> listOfStocks;
    private List<History> historyList;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
        when(sessionFactory.getCurrentSession()).thenReturn(currentSession);

        h1 = new History(1, "12/12/2020","Buy","APLE","AAPL",10.00, 10, 100.00, 10000.00,new User(1, "", "", ""));

        listOfStocks = new ArrayList<>();
        historyList = new ArrayList<>();

        listOfStocks.add(h1);
        listOfStocks.add(h2);
    }

    @Test
    void getStockList(){
        long userId = 1;
        when(currentSession.createQuery(anyString(), eq(History.class))).thenReturn(theQuery);
        when(theQuery.getResultList()).thenReturn(listOfStocks);

        List<History> histories = historyDAO.getStockList(userId);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(), eq(History.class));
        verify(theQuery).setParameter(eq("userId"), anyLong());
        verify(theQuery).getResultList();
        assertNotNull(histories);
        assertNotNull(histories.get(0));
    }

    @Test
    void addHistory(){
        historyDAO.addHistory(h1);

        verify(currentSession).saveOrUpdate(any(History.class));
    }

    @Test
    void findStockListByValue(){
        long userId = 1;
        String value = "test";

        when(currentSession.createQuery(anyString(), eq(History.class))).thenReturn(theQuery);
        when(theQuery.getResultList()).thenReturn(listOfStocks);

        List<History> histories = historyDAO.findStockListByValue(userId, value);

        verify(sessionFactory).getCurrentSession();
        verify(currentSession).createQuery(anyString(), eq(History.class));
        verify(theQuery).setParameter(eq("theValue"),anyString());
        verify(theQuery).setParameter(eq("theUserId"),anyLong());
        verify(theQuery).getResultList();
        assertNotNull(histories);
        assertNotNull(histories.get(0));
    }



}