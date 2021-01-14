package com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi;

import com.arkadiuszguzik.stockexchange.StockExchangeApplicationApi.controller.StockExchangeController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class StockExchangeApplicationApiApplicationTests {

	@Autowired
	StockExchangeController controller;

	@Test
	void contextLoads() throws  Exception{
		assertThat(controller).isNotNull();
	}

}
