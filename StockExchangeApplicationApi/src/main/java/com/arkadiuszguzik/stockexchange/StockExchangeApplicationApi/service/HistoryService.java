package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;

import java.util.List;

public interface HistoryService {

    public List<History> getHistoryStockList(long userId);
    public List<History> getHistoryStockList(long userId, String value);
    public void addHistory(History history);
}
