package com.jcsport.sports.model;

import java.io.Serializable;
import java.util.LinkedHashMap;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PersonList implements Serializable {

    public enum CurrentStatus {
        IN("IN"),
        OUT("OUT");

        private final String label;

        CurrentStatus(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

    public enum Colors {
        GREEN("GREEN"),
        RED("RED"),
        ORANGE("ORANGE"),
        YELLOW("YELLOW"),
        BLACK("BLACK");

        private final String label;

        Colors(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

    private String identity;
    private String name;
    private String gender;
    private Colors color;
    private CurrentStatus currentStatus;
    private String clubName;

    public PersonList converFromMapToObject(LinkedHashMap<String, Object> data) {
        PersonList person = new PersonList();
        if (data.containsKey("identity") && (data.get("identity") instanceof String)) {
            person.setIdentity((String) data.get("identity"));
        }
        if (data.containsKey("name") && (data.get("name") instanceof String)) {
            person.setName((String) data.get("name"));
        }
        if (data.containsKey("gender") && (data.get("gender") instanceof String)) {
            person.setGender((String) data.get("gender"));
        }
        if (data.containsKey("color") && (data.get("color") instanceof String)) {
            person.setColor(Colors.valueOf((String) data.get("color")));
        }
        if (data.containsKey("currentStatus") && (data.get("currentStatus") instanceof String)) {
            person.setCurrentStatus(CurrentStatus.valueOf((String) data.get("currentStatus")));
        }
        if (data.containsKey("clubName") && (data.get("clubName") instanceof String)) {
            person.setClubName((String) data.get("clubName"));
        }

        return person;
    }

}
