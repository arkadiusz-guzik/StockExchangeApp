package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.dao;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO{

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User getUser(long id) {
        Session currentSession = sessionFactory.getCurrentSession();

        User user = currentSession.get(User.class, id);
        return  user;
    }

    @Override
    public List<User> getUsers() {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<User> theQuery =
                currentSession.createQuery("from User order by userId", User.class);

        List<User> users = theQuery.getResultList();
        return users;
    }

    @Override
    public User authorization(String username, String password) {
        Session currentSession = sessionFactory.getCurrentSession();

        Query<User> theQuery = currentSession.createQuery("from User where username=:theUsername", User.class);
        theQuery.setParameter("theUsername", username);

        User user = theQuery.uniqueResult();

        if(user != null){
            if(passwordEncoder.matches(password, user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    @Override
    public void saveUser(User user) {
        Session currentSession = sessionFactory.getCurrentSession();
        if(user.getUserId()==0){
            user.setMoney(10000);
        }
        currentSession.saveOrUpdate(user);
    }
}
