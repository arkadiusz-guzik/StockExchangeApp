package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StockDAOImpl implements StockDAO{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Stock> getStockList(long userId) {

        Session currentSession = sessionFactory.getCurrentSession();

        Query<Stock> theQuery = currentSession.createQuery("from Stock where user_id=:theUserId", Stock.class);
        theQuery.setParameter("theUserId", userId);

        List<Stock> portfolioStockList = theQuery.getResultList();

        return portfolioStockList;
    }

    @Override
    public void saveStock(Stock stock) {
        Session currentSession = sessionFactory.getCurrentSession();
        currentSession.saveOrUpdate(stock);

    }

    @Override
    public Stock getStockByShortCut(long userId, String shortcut) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<Stock> theQuery = currentSession.createQuery("from Stock where user_id=:theUserId and shortcut=:theShortcut", Stock.class);
        theQuery.setParameter("theUserId", userId);
        theQuery.setParameter("theShortcut", shortcut);
        Stock result= theQuery.uniqueResult();

        return result;
    }

    @Override
    public void deleteStockById(long stockId) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<Stock> theQuery = currentSession.createQuery("delete from Stock where stockId=:theStockId");
        theQuery.setParameter("theStockId", stockId);

        theQuery.executeUpdate();
    }
}
