package com.jcsport.sports.services;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import com.jcsport.sports.model.PersonList;
import com.jcsport.sports.model.PersonList.Colors;
import com.jcsport.sports.model.PersonList.CurrentStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final String KEY = "personList"; // Redis 해시의 키
    private final String COUNTER_KEY = KEY + "_counter";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Integer, Object> hashOperations;
    private SimpleDateFormat smp = new SimpleDateFormat("YYYY-MM-dd");
    private final Logger logger = LoggerFactory.getLogger(PersonService.class);
    private final String KEY_3 = "attendanceCtn";
    private final String KEY_4 = "area";
    private ObjectMapper objectMapper = new ObjectMapper();

    /* 클럽 지역 데이터 가져오기 */
    public List<Object> getAreas() {
        try {
            ListOperations<String, Object> listOps = redisTemplate.opsForList();
            List<Object> areasList = listOps.range(KEY_4, 0, -1);
            return areasList;
        } catch (Exception e) {
            logger.error("[crawlingAreaDatas ERROR]: {}", e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    /* 클럽 지역 크롤링 데이터 */
    public void crawlingAreaDatas() {
        try {
            ListOperations<String, Object> listOps = redisTemplate.opsForList();
            redisTemplate.delete(KEY_4);
            List<Object> areaList = new ArrayList<>();
            Document document = Jsoup.connect("http://www.nbawith.com/community/").get();
            Elements clubElements = document.select("table[width=1000] table td.smenu");
            for (Element clubElement : clubElements) {
                String clubName = clubElement.text();
                clubName = clubName.substring(clubName.lastIndexOf(":") + 1).trim();
                areaList.add(clubName);
            }
            listOps.rightPushAll(KEY_4, areaList);
            logger.info("[areaList]: {}", areaList.toString());
        } catch (IOException e) {
            logger.error("[crawlingAreaDatas ERROR]: {}", e.getMessage());
            e.printStackTrace();
        }
    }

    /* 출석률 현황 계산 */
    public Map<Integer, String> calculatedAttendanceList() {
        try {
            HashOperations<String, Integer, String> hashOps = redisTemplate.opsForHash();
            Map<Integer, String> personDataMap = hashOps.entries(KEY_3);
            return personDataMap;
        } catch (Exception e) {
            logger.error("[calculatedAttendanceList ERROR]: {}", e.getMessage());
            return new HashMap<>();
        }
    }

    /* 현재 참석한 회원 불러오기 */
    public List<PersonList> currentAttendancePersonList() {
        try {
            final String KEY_2 = smp.format(new Date());
            HashOperations<String, Integer, LinkedHashMap<String, String>> hashOps = redisTemplate.opsForHash();
            Map<Integer, LinkedHashMap<String, String>> personDataMap = hashOps.entries(KEY_2);
            return personDataMap.entrySet().stream()
                    .map(entry -> parsePerson(entry.getKey(), entry.getValue()))
                    .filter(v -> v.getCurrentStatus() != CurrentStatus.OUT)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("[currentAttendancePersonList ERROR]: {}", e.getMessage());
            return new ArrayList<>();
        }

    }

    /* 여러회원 한번에 추가 */
    public boolean insertPersonLists(List<PersonList> personLists) {
        try {
            hashOperations = redisTemplate.opsForHash();
            Map<Integer, PersonList> personMap = convertListToMap(personLists);
            hashOperations.putAll(KEY, personMap);
            return true;
        } catch (Exception e) {
            logger.error("[insertPersonLists ERROR]: {}", e.getMessage());
            return false;
        }

    }

    /* 회원 삭제 */
    public boolean deletePerson(int key) {
        try {
            hashOperations = redisTemplate.opsForHash();
            hashOperations.delete(KEY, key);
            hashOperations.delete(smp.format(new Date()), key);
            hashOperations.delete(KEY_3, key);
            return true;
        } catch (Exception e) {
            logger.error("[deletePerson ERROR]: {}", e.getMessage());
            return false;
        }

    }

    /* 회원 추가 */
    public boolean insertPersonList(PersonList personList) {
        try {
            hashOperations = redisTemplate.opsForHash();
            Long counter = redisTemplate.opsForValue().increment(COUNTER_KEY);
            int personKey = counter.intValue();
            personList.setIdentity(String.valueOf(personKey));
            hashOperations.put(KEY, personKey, personList);
            return true;
        } catch (Exception e) {
            logger.error("[insertPersonList ERROR]: {}", e.getMessage());
            return false;
        }

    }

    /* 출석 체크 */
    public PersonList attendanceChk(@RequestBody Map<String, Object> map) {
        try {
            final String KEY_2 = smp.format(new Date());
            hashOperations = redisTemplate.opsForHash();
            int hashKey = Integer.parseInt((String) map.get("identity"));
            LinkedHashMap<String, Object> res = (LinkedHashMap<String, Object>) hashOperations.get(KEY, hashKey);
            PersonList person = new PersonList().converFromMapToObject(res);

            if (person.getCurrentStatus().equals(CurrentStatus.IN)) {
                person.setCurrentStatus(CurrentStatus.OUT);
                hashOperations.put(KEY, hashKey, person);
                hashOperations.put(KEY_2, hashKey, person);
            } else {
                person.setCurrentStatus(CurrentStatus.IN);
                hashOperations.put(KEY, hashKey, person);
                savePersonAttendanceList(hashOperations, person, KEY_2);
            }
            return person;
        } catch (Exception e) {
            logger.error("[attendanceChk ERROR]: {}", e.getMessage());
            return new PersonList();
        }
    }

    /* 출석 날짜 저장 */
    public void savePersonAttendanceList(HashOperations<String, Integer, Object> hashOperations, PersonList person,
            String key) {
        try {
            List<Object> objList = hashOperations.values(key);
            boolean isDuplicated = false;
            boolean isAttendanceChecked = false;
            if (objList.size() > 0) {
                for (Object obj : objList) {
                    String jsonString = objectMapper.writeValueAsString(obj);
                    PersonList personList = objectMapper.readValue(jsonString, PersonList.class);
                    if (personList.getName().equals(person.getName())) {
                        isAttendanceChecked = true;
                        if (personList.getCurrentStatus().equals(person.getCurrentStatus())) {
                            isDuplicated = true;
                            return;
                        }
                    }
                }

                if (!isDuplicated) {
                    hashOperations.put(key, Integer.parseInt(person.getIdentity()), person);
                }
                if (!isAttendanceChecked) {
                    Object date = hashOperations.get(KEY_3, Integer.parseInt(person.getIdentity()));
                    if (date == null) {
                        date = smp.format(new Date());
                    } else if (date instanceof String) {
                        date = date + "," + smp.format(new Date());
                    }
                    hashOperations.put(KEY_3, Integer.parseInt(person.getIdentity()), date);
                }

            } else {
                hashOperations.put(key, Integer.parseInt(person.getIdentity()), person);
                Object date = hashOperations.get(KEY_3, Integer.parseInt(person.getIdentity()));
                if (date == null) {
                    date = smp.format(new Date());
                } else if (date instanceof String) {
                    date = date + "," + smp.format(new Date());
                }
                hashOperations.put(KEY_3, Integer.parseInt(person.getIdentity()), date);
            }

        } catch (Exception e) {
            logger.error("[savePersonAttendanceList ERROR]: {}", e.getMessage());
            e.printStackTrace();
        }
    }

    /* 특정 회원 정보 불러오기 */
    public PersonList findPerson(int id) {
        try {
            HashOperations<String, Integer, Object> hashOps = redisTemplate.opsForHash();
            LinkedHashMap<String, Object> res = (LinkedHashMap<String, Object>) hashOps.get(KEY, id);
            PersonList person = new PersonList().converFromMapToObject(res);
            return person;
        } catch (Exception e) {
            PersonList person = new PersonList();
            person.setIdentity(null);
            person.setColor(null);
            person.setGender(null);
            person.setName(null);
            logger.error("[findPerson ERROR]: {}", e.getMessage());
            return person;
        }

    }

    /* 모든 회원 정보 불러오기 */
    public List<PersonList> getAllPersons() {
        try {
            HashOperations<String, Integer, LinkedHashMap<String, String>> hashOps = redisTemplate.opsForHash();
            Map<Integer, LinkedHashMap<String, String>> personDataMap = hashOps.entries("personList");

            return personDataMap.entrySet().stream()
                    .map(entry -> parsePerson(entry.getKey(), entry.getValue()))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("[getAllPersons ERROR]: {}", e.getMessage());
            return new ArrayList<>();
        }

    }

    /* utils */
    private PersonList parsePerson(int key, LinkedHashMap<String, String> json) {
        PersonList person = new PersonList();
        if (json.get("name") != null) {
            person.setName(json.get("name"));
        }
        if (json.get("gender") != null) {
            person.setGender(json.get("gender"));
        }
        if (json.get("clubName") != null) {
            person.setClubName(json.get("clubName"));
        }
        if (json.get("color") != null) {
            person.setColor(Colors.valueOf(json.get("color")));
        }
        if (json.get("identity") != null) {
            person.setIdentity(json.get("identity"));
        }
        person.setCurrentStatus(CurrentStatus.valueOf(json.get("currentStatus")));
        return person;
    }

    public <T> Map<Integer, T> convertListToMap(List<T> listT) {
        Map<Integer, T> objectMap = new HashMap<>();
        for (T object : listT) {
            Long counter = redisTemplate.opsForValue().increment(COUNTER_KEY);
            int personKey = counter.intValue();
            if (object instanceof PersonList) {
                ((PersonList) object).setIdentity(String.valueOf(personKey));
            }
            objectMap.put(personKey, object);
        }
        return objectMap;
    }
}
