//이름 리스트 클릭시 확정 컴포넌트에 클릭한 이름 렌더링 이벤트

const createOnlyGuest = (name) => {
  const wholeContainer = document.createElement("button");
  wholeContainer.classList.add("button-30");
  wholeContainer.textContent = `${name}`;
  wholeContainer.setAttribute("data-name", `${name}`);
  const insertWaitList = () => {
    let nameList_1 = firstWaitLister.textContent.trim();
    let nameList_2 = secondWaitLister.textContent.trim();
    let nameList_3 = thirdWaitLister.textContent.trim();
    let nameList_4 = fourthWaitLister.textContent.trim();
    const hideElement = document.querySelector(`button[data-name=${name}]`);
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

const onlyGeustContainer = createOnlyGuest("GUEST");
addWaitListWholeContainer.insertBefore(
  onlyGeustContainer,
  addWaitListWholeContainer.lastElementChild
);
