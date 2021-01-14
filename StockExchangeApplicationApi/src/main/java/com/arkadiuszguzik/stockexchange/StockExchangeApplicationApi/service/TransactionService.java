package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;

public interface TransactionService {
    public void purchaseTransaction(History history);
    public void saleTransaction(History history);
}
