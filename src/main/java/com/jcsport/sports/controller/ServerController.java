package com.jcsport.sports.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.jcsport.sports.model.PersonList;
import com.jcsport.sports.model.PersonList.Colors;
import com.jcsport.sports.model.PersonList.CurrentStatus;
import com.jcsport.sports.services.PersonService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ServerController {

    @Autowired
    private PersonService personService;
    private List<PersonList> allPersondata;

    @GetMapping("/")
    public String home(Model model) throws IOException {
        allPersondata = getDataForDate();
        model.addAttribute("datas", allPersondata);
        model.addAttribute("areas", getAreas());
        return "waitList";
    }

    /* 크롤링 스케쥴러 */
    @Scheduled(cron = "59 59 23 * * *") // 매일 자정에 실행 (Cron 표현식은 필요에 따라 조절 가능)
    public void executeCrawlingJob() {
        personService.crawlingAreaDatas();
    }

    /* 클럽 종류 가져오기 */
    @PostMapping("/getAreas")
    @ResponseBody
    public List<Object> getAreas() throws IOException {
        return personService.getAreas();
    }

    /* 출석률 계산 */
    @PostMapping("/calculatedAttendanceList")
    @ResponseBody
    public Map<Integer, Object> calculatedAttendanceList() throws IOException {
        Map<Integer, String> attendancList = personService.calculatedAttendanceList();
        Map<Integer, Object> attendancListJson = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode jsonNode = null;
        Set<Integer> keys = attendancList.keySet();
        for (Integer key : keys) {
            jsonNode = objectMapper.createObjectNode();
            Optional<PersonList> result = getDataForDate().stream()
                    .filter(person -> person.getIdentity().equals(key.toString()))
                    .findFirst();
            if (result.isPresent()) {
                PersonList person = result.get();
                String date = attendancList.get(key);
                jsonNode.put("name", person.getName());
                jsonNode.put("dateCtn", date.split(",").length);
                attendancListJson.put(key, jsonNode);
            }
        }
        return attendancListJson;
    }

    /* 멤버 가입 */
    @PostMapping("/insertMembers")
    @ResponseBody
    public List<PersonList> insertMembersInRedis(@RequestBody Map<String, Object> map) throws IOException {
        PersonList personList = new PersonList();
        personList.setGender((String) map.get("gender"));
        personList.setName((String) map.get("name"));
        personList.setClubName((String) map.get("clubName"));
        personList.setColor(Colors.valueOf((((String) map.get("color")).toUpperCase())));
        personList.setCurrentStatus(CurrentStatus.OUT);
        boolean res = personService.insertPersonList(personList);
        List<PersonList> result;
        if (res) {
            result = getDataForDate();
        } else {
            result = new ArrayList<>();
        }
        return result;
    }

    /* 현재 출석멤버 불러오기 */
    @PostMapping("/getCurrentInPersonLit")
    @ResponseBody
    public List<PersonList> currentAttendancePersonList(Model model) throws IOException {
        return personService.currentAttendancePersonList();
    }

    /* 출석체크 */
    @PostMapping("/attendanceChk")
    @ResponseBody
    public PersonList attendanceChk(@RequestBody Map<String, Object> map, Model model) throws IOException {
        PersonList res = personService.attendanceChk(map);
        return res;
    }

    /* 멤버 삭제 */
    @PostMapping("/deletePerson")
    @ResponseBody
    public boolean deletePerson(@RequestBody Map<String, Object> map) throws IOException {
        int hashKey = Integer.parseInt((String) map.get("identity"));
        return personService.deletePerson(hashKey);
    }

    /* 모든 멤버 불러오기 */
    @PostMapping("/getAllPersons")
    @ResponseBody
    public List<PersonList> getDataForDate() throws IOException {
        return personService.getAllPersons();
    }

    /* 모든 멤버 불러오기 */
    @PostMapping("/getErrorLog")
    @ResponseBody
    public void getErrorLog(String msg) throws IOException {
        System.out.println("[ERROR] " + msg);
    }

}
