$("#closeInsertMemberModal").click((e) => {
  const modal = document.getElementById("insertMemberModal");
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
  document.getElementById("nameInputText").value = "";
  radioButtons.forEach(function (button) {
    button.checked = false;
  });
  genderRadioButtons.forEach(function (button) {
    button.checked = false;
  });
  const selectElement = document.getElementById("areaSelect");
  selectElement.selectedIndex = 0;
});

let currentColor = "";
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="colorRadio"]'
);
radioButtons.forEach(function (button) {
  button.addEventListener("change", function () {
    currentColor = button.value;
  });
});

let currentGender = "";
const genderRadioButtons = document.querySelectorAll(
  'input[type="radio"][name="gender"]'
);
genderRadioButtons.forEach(function (button) {
  button.addEventListener("change", function () {
    currentGender = button.value;
  });
});

$("#insertMemberBtn").click((e) => {
  const getName = document.getElementById("nameInputText").value;
  // 선택된 옵션의 값을 가져오기
  const selectElement = document.getElementById("areaSelect");
  const clubName = selectElement.value;

  const data = {
    name: getName,
    color: currentColor,
    gender: currentGender,
    clubName: clubName,
  };

  if (data.clubName == "") {
    window.Bridge.showToast("소속클럽을 선택해주세요..");
  } else if (data.name == "") {
    window.Bridge.showToast("성함을 입력해주세요..");
  } else if (data.color == "") {
    window.Bridge.showToast("색을 선택해주세요..");
  } else if (data.gender == "") {
    window.Bridge.showToast("성벼을 선택해주세요..");
  } else {
    $.ajax({
      url: "/insertMembers",
      type: "POST",
      contentType: "application/json;charset=UTF-8",
      data: JSON.stringify(data),
      dataType: "json",
      success: (data) => {
        allData = [];
        allData = data;
        if (data.length > 0) {
          const modal = document.getElementById("insertMemberModal");
          modal.style.visibility = "hidden";
          modal.style.opacity = "0";
          document.getElementById("nameInputText").value = "";
          radioButtons.forEach(function (button) {
            button.checked = false;
          });
          genderRadioButtons.forEach(function (button) {
            button.checked = false;
          });
          selectElement.selectedIndex = 0;
          window.Bridge.showToast(getName + "님이 추가되었습니다.");
        } else {
          window.Bridge.showToast("서버와의 연결이 원할하지 않습니다.");
        }
      },
      fail: (e) => {
        console.log("data is fail");
      },
    });
  }
});
