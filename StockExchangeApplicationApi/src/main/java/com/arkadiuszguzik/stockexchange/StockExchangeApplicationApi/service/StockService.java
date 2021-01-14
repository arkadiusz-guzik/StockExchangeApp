package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;

import java.util.List;

public interface StockService {

    public List<Stock> getPortfolioStockList(long userId);
    public Stock getStockByShortCut(long userId, String shortcut);
    public void saveStock(Stock stock);
}
