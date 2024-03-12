package com.jcsport.sports;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.assertj.core.api.Assertions;
import org.json.JSONArray;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import com.jcsport.sports.model.PersonList;
import com.jcsport.sports.model.PersonList.Colors;
import com.jcsport.sports.model.PersonList.CurrentStatus;
import com.jcsport.sports.services.PersonService;

@SpringBootTest
class SportsApplicationTests {
	final Logger logger = LoggerFactory.getLogger(SportsApplicationTests.class);

	@Autowired
	private PersonService personService;

	@Test
	@DisplayName("Test")
	void listTest() {
		String question = "ihrhbakrfpndopljhygc";
		int m = 4, s = 2;
		String str = question.substring(0, m);
		String str2 = question.substring(m, m * 2);

		logger.info("str : {}", str);
	}

	@Test
	@DisplayName("크롤링 테스트")
	void test() {
		try {
			List<String> areaList = new ArrayList<>();
			Document document = Jsoup.connect("").get();
			Elements clubElements = document.select("table[width=1000] table td.smenu");
			for (Element clubElement : clubElements) {
				String clubName = clubElement.text();
				clubName = clubName.substring(clubName.lastIndexOf(":") + 1).trim();
				areaList.add(clubName);
			}
		} catch (IOException e) {
			logger.error("[crawlingAreaDatas ERROR]", e);
			e.printStackTrace();
		}
	}

	@Test
	@DisplayName("Redis 데이터 personList 추가")
	void contextLoads() {
		List<PersonList> personList = new ArrayList<>();
		String[] greenWomanList = {};

		for (String name : greenWomanList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("F");
			person.setColor(Colors.GREEN);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

		String[] greenManList = {};
		personList = new ArrayList<>();
		for (String name : greenManList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("M");
			person.setColor(Colors.GREEN);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

		String[] redWoManList = {};
		personList = new ArrayList<>();
		for (String name : redWoManList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("F");
			person.setColor(Colors.RED);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

		String[] orangeManList = {};
		personList = new ArrayList<>();
		for (String name : orangeManList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("M");
			person.setColor(Colors.ORANGE);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

		String[] yellowWoManList = {};
		personList = new ArrayList<>();
		for (String name : yellowWoManList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("F");
			person.setColor(Colors.YELLOW);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

		String[] blackManList = {};
		personList = new ArrayList<>();
		for (String name : blackManList) {
			PersonList person = new PersonList();
			person.setName(name);
			person.setGender("M");
			person.setColor(Colors.BLACK);
			person.setCurrentStatus(CurrentStatus.OUT);
			personList.add(person);
		}
		personService.insertPersonLists(personList);

	}

}
