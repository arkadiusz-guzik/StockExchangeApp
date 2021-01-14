package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.StockDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockDAO stockDAO;

    @Override
    @Transactional
    public List<Stock> getPortfolioStockList(long userId) {
        return stockDAO.getStockList(userId);
    }

    @Override
    @Transactional
    public Stock getStockByShortCut(long userId, String shortcut) {
        return stockDAO.getStockByShortCut(userId, shortcut);
    }

    @Override
    @Transactional
    public void saveStock(Stock stock) {
       stockDAO.saveStock(stock);
    }
}
