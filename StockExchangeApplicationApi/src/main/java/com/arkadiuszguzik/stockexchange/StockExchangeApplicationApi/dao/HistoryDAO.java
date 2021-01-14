package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;

import java.util.List;

public interface HistoryDAO {

    public List<History> getStockList(long userId);
    public void addHistory(History history);
    public List<History> findStockListByValue(long userId, String value);
}
