package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;

import java.util.List;

public interface StockDAO {

    public List<Stock> getStockList(long userId);

    public void saveStock(Stock stock);

    public Stock getStockByShortCut(long userId, String symbol);

    public void deleteStockById(long stockId);
}
