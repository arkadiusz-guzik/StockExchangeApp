package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.HistoryDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryDAO historyDAO;

    @Override
    @Transactional
    public List<History> getHistoryStockList(long userId) {
        return historyDAO.getStockList(userId);
    }

    @Override
    @Transactional
    public List<History> getHistoryStockList(long userId, String value) {
        return historyDAO.findStockListByValue(userId, value);
    }

    @Override
    @Transactional
    public void addHistory(History history) {
        historyDAO.addHistory(history);
    }
}
