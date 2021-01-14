package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HistoryDAOImpl implements HistoryDAO{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<History> getStockList(long userId) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<History> theQuery = currentSession.createQuery("from History where user_id=:userId", History.class);
        theQuery.setParameter("userId", userId);

        List<History> historyStockList = theQuery.getResultList();

        return historyStockList;
    }

    @Override
    public void addHistory(History history) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.saveOrUpdate(history);
    }

    @Override
    public List<History> findStockListByValue(long userId, String value) {
        Session currentSession = sessionFactory.getCurrentSession();


        //Query<History> theQuery = currentSession.createQuery("from History where shortcut like :theValue", History.class);
        Query<History> theQuery = currentSession.createQuery("from History where date like :theValue or action like :theValue " +
                "or name like :theValue or shortcut like :theValue or number like :theValue or price like :theValue " +
                "or totalPrice like :theValue or accountBalance like :theValue and userId=:theUserId", History.class);

        String newValue = "%"+value+"%";
        theQuery.setParameter("theValue", newValue);
        theQuery.setParameter("theUserId", userId);

        List<History> historyStockList = theQuery.getResultList();
        return  historyStockList;
    }
}
