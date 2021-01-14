package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.service;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.HistoryDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.StockDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao.UserDAO;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.History;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.Stock;
import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private StockDAO stockDAO;
    @Autowired
    private HistoryDAO historyDAO;
    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public void purchaseTransaction(History history) {
        Stock theStock = stockDAO.getStockByShortCut(history.getUserId(), history.getShortcut());
        if(theStock != null){
            double newPrice = ((theStock.getPrice()*theStock.getNumber())+(history.getPrice()*history.getNumber()))/(theStock.getNumber()+history.getNumber());
            theStock.setPrice(newPrice);
            int newShareNumber = theStock.getNumber()+history.getNumber();
            theStock.setNumber(newShareNumber);
            stockDAO.saveStock(theStock);
        }else {
            Stock newStock = new Stock(0, history.getName(), history.getShortcut(), history.getNumber(), history.getPrice(), history.getUser());
            stockDAO.saveStock(newStock);
        }

        userDAO.getUser(history.getUserId()).setMoney(history.getAccountBalance());
        historyDAO.addHistory(history);
    }

    @Override
    @Transactional
    public void saleTransaction(History history) {
        Stock theStock = stockDAO.getStockByShortCut(history.getUserId(),history.getShortcut());

        User theUser = userDAO.getUser(history.getUserId());
        double profit = (history.getPrice())*history.getNumber();

        if(history.getNumber()==theStock.getNumber()){
            stockDAO.deleteStockById(theStock.getStockId());
        }else{
            int newShareNumber = theStock.getNumber()-history.getNumber();
            theStock.setNumber(newShareNumber);
            stockDAO.saveStock(theStock);
        }

        userDAO.getUser(history.getUserId()).setMoney(theUser.getMoney()+profit);
        historyDAO.addHistory(history);
    }
}
