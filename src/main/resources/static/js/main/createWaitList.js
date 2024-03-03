const createWaitListFrame = (
  waitList_1,
  waitList_2,
  waitList_3,
  waitList_4
) => {
  const wholeContainer = document.createElement("div");
  wholeContainer.classList.add("wholeContainer");

  //체크박스
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.classList.add("checkbox-wrapper-26");
  checkboxWrapper.style.display = isChangeIndexEdit ? "" : "none";

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("id", "_checkbox-26" + new Date().getTime());
  checkboxInput.setAttribute("type", "checkbox");

  // 체크박스의 label 엘리먼트를 생성합니다.
  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", "_checkbox-26" + new Date().getTime());

  const tick_markDiv = document.createElement("div");
  tick_markDiv.classList.add("tick_mark");

  checkboxLabel.appendChild(tick_markDiv);
  checkboxWrapper.appendChild(checkboxInput);
  checkboxWrapper.appendChild(checkboxLabel);
  wholeContainer.appendChild(checkboxWrapper);

  //카운트
  const newContainer = document.createElement("div");
  newContainer.addEventListener("click", () => {
    $(".button").click(function () {
      $("#modal-container").removeAttr("class").addClass("one");
      $("body").addClass("modal-active");
    });
    clickIndex = newElement.textContent;
  });
  newContainer.classList.add("neumorphic-container_Count", "button");
  const newElement = document.createElement("span");
  newElement.classList.add("neumorphic-element", "neumorhic-span");
  newElement.textContent = `${waitListFrameCount.length + 1}`;
  newElement.setAttribute("data-count", `${waitListFrameCount.length + 1}`);
  newContainer.appendChild(newElement);
  wholeContainer.appendChild(newContainer);

  // 순서 변경 및 초기화
  checkboxInput.addEventListener("change", () => {
    if (checkboxInput.checked) {
      changeIndexArr.push(newElement.textContent - 1);
    } else {
      changeIndexArr.shift();
    }

    if (changeIndexArr.length == 2) {
      const wholeContainerBox = document.getElementById("wholeContainerBox");
      const children = Array.from(wholeContainerBox.children);
      const startIndex = changeIndexArr[0];
      const endIndex = changeIndexArr[1];
      const startEle = children[startIndex];
      const endEle = children[endIndex];
      const startChildSpan = startEle.querySelector(
        ".wholeContainer > div:nth-child(2)  > span"
      );
      const endChildSpan = endEle.querySelector(
        ".wholeContainer > div:nth-child(2)  > span"
      );

      const copyStartText = startChildSpan.textContent;
      const copyEndText = endChildSpan.textContent;

      [startChildSpan.textContent, endChildSpan.textContent] = [
        copyEndText,
        copyStartText,
      ];
      startChildSpan.setAttribute("data-count", copyEndText);
      endChildSpan.setAttribute("data-count", copyStartText);

      const nextSiblingOfFirst = startEle.nextElementSibling;
      const nextSiblingOfThird = endEle.nextElementSibling;

      wholeContainerBox.insertBefore(endEle, nextSiblingOfFirst);
      wholeContainerBox.insertBefore(startEle, nextSiblingOfThird);
      [waitListFrameCount[startIndex], waitListFrameCount[endIndex]] = [
        waitListFrameCount[endIndex],
        waitListFrameCount[startIndex],
      ];
      isChangeIndexEdit = false;
      $("div[class=checkbox-wrapper-26]").each(function () {
        $(this).css("display", "none");
        $(this).find("input[type='checkbox']").prop("checked", false);
      });
      changeIndexArr = [];
    }
  });
  //
  //
  //대기자 1
  const newContainer1 = document.createElement("div");
  newContainer1.classList.add("neumorphic-container");
  const newElement1 = document.createElement("span");
  newElement1.classList.add("neumorphic-element", "neumorhic-span");
  let gender = "";
  if (waitList_1 === "미정") {
    newElement1.style.color = "white";
  } else {
    if (waitList_1 !== "GUEST") {
      gender = allData.find((v) => v.name === waitList_1).gender;
      if (gender === "F") {
        newElement1.style.color = "deeppink";
      }
    }
  }

  newElement1.textContent = `${waitList_1}`;
  newElement1.setAttribute("data-name", `${waitList_1}`);
  newContainer1.appendChild(newElement1);
  wholeContainer.appendChild(newContainer1);
  //
  //
  //대기자 2
  const newContainer2 = document.createElement("div");
  newContainer2.classList.add("neumorphic-container");
  const newElement2 = document.createElement("span");
  newElement2.classList.add("neumorphic-element", "neumorhic-span");
  if (waitList_2 === "미정") {
    newElement2.style.color = "white";
  } else {
    if (waitList_2 !== "GUEST") {
      gender = allData.find((v) => v.name === waitList_2).gender;
      if (gender === "F") {
        newElement2.style.color = "deeppink";
      }
    }
  }

  newElement2.textContent = `${waitList_2}`;
  newElement2.setAttribute("data-name", `${waitList_2}`);
  newContainer2.appendChild(newElement2);
  wholeContainer.appendChild(newContainer2);
  //
  //
  //대기자 3
  const newContainer3 = document.createElement("div");
  newContainer3.classList.add("neumorphic-container");
  const newElement3 = document.createElement("span");
  newElement3.classList.add("neumorphic-element", "neumorhic-span");
  if (waitList_3 === "미정") {
    newElement3.style.color = "white";
  } else {
    if (waitList_3 !== "GUEST") {
      gender = allData.find((v) => v.name === waitList_3).gender;
      if (gender === "F") {
        newElement3.style.color = "deeppink";
      }
    }
  }

  newElement3.textContent = `${waitList_3}`;
  newElement3.setAttribute("data-name", `${waitList_3}`);
  newContainer3.appendChild(newElement3);
  wholeContainer.appendChild(newContainer3);
  //
  //
  //대기자 4
  const newContainer4 = document.createElement("div");
  newContainer4.classList.add("neumorphic-container");
  const newElement4 = document.createElement("span");
  newElement4.classList.add("neumorphic-element", "neumorhic-span");
  if (waitList_4 === "미정") {
    newElement4.style.color = "white";
  } else {
    if (waitList_4 !== "GUEST") {
      gender = allData.find((v) => v.name === waitList_4).gender;
      if (gender === "F") {
        newElement4.style.color = "deeppink";
      }
    }
  }

  newElement4.textContent = `${waitList_4}`;
  newElement4.setAttribute("data-name", `${waitList_4}`);
  newContainer4.appendChild(newElement4);
  wholeContainer.appendChild(newContainer4);

  //모달 켜질때 데이터 넘기는 이벤트
  const modalOnWithDatas = () => {
    // wordingset
    isEdit = true;
    clickIndex = newElement.textContent;

    const firstChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(3)  > span"
    );
    const secondChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(4)  > span"
    );
    const thirdChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(5)  > span"
    );
    const fourthChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(6)  > span"
    );

    firstWaitLister.textContent = firstChildElement.textContent;
    secondWaitLister.textContent = secondChildElement.textContent;
    thirdWaitLister.textContent = thirdChildElement.textContent;
    fourthWaitLister.textContent = fourthChildElement.textContent;
    modalOn();
  };
  newContainer1.addEventListener("click", modalOnWithDatas);
  newContainer2.addEventListener("click", modalOnWithDatas);
  newContainer3.addEventListener("click", modalOnWithDatas);
  newContainer4.addEventListener("click", modalOnWithDatas);
  return wholeContainer;
};

const settingInit = () => {
  firstWaitLister.textContent = "미정";
  secondWaitLister.textContent = "미정";
  thirdWaitLister.textContent = "미정";
  fourthWaitLister.textContent = "미정";
  modal.style.display = "none";
  isEdit = false;
  const nameListBtns = document.querySelectorAll(
    "#addWaitListWholeContainer button"
  );
  nameListBtns.forEach((button) => {
    button.disabled = false;
  });
};

//확정 클릭 이벤트
const confirm = () => {
  const newContainer = createWaitListFrame(
    firstWaitLister.textContent.trim(),
    secondWaitLister.textContent.trim(),
    thirdWaitLister.textContent.trim(),
    fourthWaitLister.textContent.trim()
  );
  if (isEdit) {
    // 변경
    const firstChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(3)  > span"
    );
    const secondChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(4)  > span"
    );
    const thirdChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(5)  > span"
    );
    const fourthChildElement = waitListFrameCount[clickIndex - 1].querySelector(
      ".wholeContainer > div:nth-child(6)  > span"
    );

    firstChildElement.setAttribute(
      "data-name",
      `${firstWaitLister.textContent.trim()}`
    );
    firstChildElement.textContent = firstWaitLister.textContent.trim();
    if (firstChildElement.textContent !== "미정") {
      if (firstChildElement.textContent !== "GUEST") {
        const gender = allData.find(
          (v) => v.name === firstChildElement.textContent
        ).gender;
        if (gender === "F") {
          firstChildElement.style.color = "deeppink";
        } else {
          firstChildElement.style.color = "#000";
        }
      } else {
        firstChildElement.style.color = "#000";
      }
    } else {
      firstChildElement.style.color = "#fff";
    }

    secondChildElement.setAttribute(
      "data-name",
      `${secondWaitLister.textContent.trim()}`
    );
    secondChildElement.textContent = secondWaitLister.textContent.trim();
    if (secondChildElement.textContent !== "미정") {
      if (secondChildElement.textContent !== "GUEST") {
        const gender = allData.find(
          (v) => v.name === secondChildElement.textContent
        ).gender;
        if (gender === "F") {
          secondChildElement.style.color = "deeppink";
        } else {
          secondChildElement.style.color = "#000";
        }
      } else {
        secondChildElement.style.color = "#000";
      }
    } else {
      secondChildElement.style.color = "#fff";
    }

    thirdChildElement.setAttribute(
      "data-name",
      `${thirdWaitLister.textContent.trim()}`
    );
    thirdChildElement.textContent = thirdWaitLister.textContent.trim();
    if (thirdChildElement.textContent !== "미정") {
      if (thirdChildElement.textContent !== "GUEST") {
        const gender = allData.find(
          (v) => v.name === thirdChildElement.textContent
        ).gender;
        if (gender === "F") {
          thirdChildElement.style.color = "deeppink";
        } else {
          thirdChildElement.style.color = "#000";
        }
      } else {
        thirdChildElement.style.color = "#000";
      }
    } else {
      thirdChildElement.style.color = "#fff";
    }

    fourthChildElement.setAttribute(
      "data-name",
      `${fourthWaitLister.textContent.trim()}`
    );
    fourthChildElement.textContent = fourthWaitLister.textContent.trim();
    if (fourthChildElement.textContent !== "미정") {
      if (fourthChildElement.textContent !== "GUEST") {
        const gender = allData.find(
          (v) => v.name === fourthChildElement.textContent
        ).gender;
        if (gender === "F") {
          fourthChildElement.style.color = "deeppink";
        } else {
          fourthChildElement.style.color = "#000";
        }
      } else {
        fourthChildElement.style.color = "#000";
      }
    } else {
      fourthChildElement.style.color = "#fff";
    }
  } else {
    // 추가
    waitListFrameCount.push(newContainer);
    container.insertBefore(newContainer, container.lastElementChild);
  }
  settingInit();
};
confirmBtn.addEventListener("click", confirm);
