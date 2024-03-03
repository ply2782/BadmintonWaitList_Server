// 모달 키기 이벤트
const modal = document.getElementById("modal");
const modalOn = () => {
  modal.style.display = "flex";
  showList();
};
// 모달 끄기 이벤트
const modalOff = () => {
  modal.style.display = "none";
  isEdit = false;
};
const btnModal = document.querySelector(".neumorphic-addBtnContainer");
btnModal.addEventListener("click", (e) => {
  modalOn();
});

const showList = () => {
  $.ajax({
    url: "/getCurrentInPersonLit",
    type: "POST",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: (data) => {
      const inPersonList = data.filter((v) => v.currentStatus === "IN");
      if (addWaitListWholeContainer) {
        const childNodes = addWaitListWholeContainer.childNodes;
        for (const childNode of childNodes) {
          const name = childNode.getAttribute("data-name");
          if (name !== "GUEST") {
            const timeOut = setTimeout(() => {
              const isIncluded = inPersonList.find((v) => v.name === name);
              if (isIncluded == undefined) {
                addWaitListWholeContainer.removeChild(childNode);
              }
              clearTimeout(timeOut);
            }, 100);
          }
        }
      }

      for (const person of inPersonList) {
        const btn = document.querySelector(
          'button.button-30[data-name="' + person.name + '"]'
        );
        if (btn == null) {
          const newContainer = createWaitList(person.name, person.color);
          addWaitListWholeContainer.insertBefore(
            newContainer,
            addWaitListWholeContainer.lastElementChild
          );
        }
      }

      const nameList_1 = firstWaitLister.textContent.trim();
      const nameList_2 = secondWaitLister.textContent.trim();
      const nameList_3 = thirdWaitLister.textContent.trim();
      const nameList_4 = fourthWaitLister.textContent.trim();
      if (
        nameList_1 !== "미정" &&
        nameList_2 !== "미정" &&
        nameList_3 !== "미정" &&
        nameList_4 !== "미정"
      ) {
        const nameListBtns = document.querySelectorAll(
          "#addWaitListWholeContainer button"
        );
        nameListBtns.forEach((button) => {
          button.disabled = true;
        });
      }
    },
    fail: (e) => {
      console.log("data is fail");
    },
  });
};

const createWaitList = (name, color) => {
  const wholeContainer = document.createElement("button");
  wholeContainer.classList.add("button-30");
  wholeContainer.textContent = `${name}`;
  wholeContainer.setAttribute("data-name", `${name}`);
  wholeContainer.style.backgroundColor = color;
  wholeContainer.style.color = color == "YELLOW" ? "black" : "white";
  wholeContainer.style.boxShadow = ` rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, ${color} 0 -3px 0 inset`;
  wholeContainer.style.margin = "0px 0px 20px 40px;";

  const insertWaitList = () => {
    let nameList_1 = firstWaitLister.textContent.trim();
    let nameList_2 = secondWaitLister.textContent.trim();
    let nameList_3 = thirdWaitLister.textContent.trim();
    let nameList_4 = fourthWaitLister.textContent.trim();
    const hideElement = document.querySelector(
      'button.button-30[data-name="' + name + '"]'
    );
    const isGuest = hideElement.textContent;
    if (hideElement) {
      if (isGuest !== "GUEST") {
        hideElement.style.display = "none";
      }
    }
    if (nameList_1 == "미정") {
      firstWaitLister.textContent = `${name}`;
    } else if (nameList_2 == "미정") {
      secondWaitLister.textContent = `${name}`;
    } else if (nameList_3 == "미정") {
      thirdWaitLister.textContent = `${name}`;
    } else if (nameList_4 == "미정") {
      fourthWaitLister.textContent = `${name}`;
    }

    nameList_1 = firstWaitLister.textContent.trim();
    nameList_2 = secondWaitLister.textContent.trim();
    nameList_3 = thirdWaitLister.textContent.trim();
    nameList_4 = fourthWaitLister.textContent.trim();
    if (
      nameList_1 !== "미정" &&
      nameList_2 !== "미정" &&
      nameList_3 !== "미정" &&
      nameList_4 !== "미정"
    ) {
      const nameListBtns = document.querySelectorAll(
        "#addWaitListWholeContainer button"
      );
      nameListBtns.forEach((button) => {
        button.disabled = true;
      });
    }
  };
  wholeContainer.addEventListener("click", insertWaitList);
  return wholeContainer;
};
