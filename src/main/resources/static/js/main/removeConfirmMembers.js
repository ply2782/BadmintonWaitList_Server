//확정 인원 클릭시 다시 원래대로 돌리는 이벤트
const removeFirstName = () => {
  const removeElement = document.querySelector(
    `button.button-30[data-name=${firstWaitLister.textContent}]`
  );
  if (removeElement) {
    removeElement.style.display = "";
  }
  firstWaitLister.textContent = "미정";
  const nameListBtns = document.querySelectorAll(
    "#addWaitListWholeContainer button"
  );
  nameListBtns.forEach((button) => {
    button.disabled = false;
  });
};
const removeSecondName = () => {
  const removeElement = document.querySelector(
    `button.button-30[data-name=${secondWaitLister.textContent}]`
  );
  if (removeElement) {
    removeElement.style.display = "";
  }
  secondWaitLister.textContent = "미정";
  const nameListBtns = document.querySelectorAll(
    "#addWaitListWholeContainer button"
  );
  nameListBtns.forEach((button) => {
    button.disabled = false;
  });
};
const removeThirdName = () => {
  const removeElement = document.querySelector(
    `button.button-30[data-name=${thirdWaitLister.textContent}]`
  );
  if (removeElement) {
    removeElement.style.display = "";
  }
  thirdWaitLister.textContent = "미정";
  const nameListBtns = document.querySelectorAll(
    "#addWaitListWholeContainer button"
  );
  nameListBtns.forEach((button) => {
    button.disabled = false;
  });
};
const removeFourthName = () => {
  const removeElement = document.querySelector(
    `button.button-30[data-name=${fourthWaitLister.textContent}]`
  );
  if (removeElement) {
    removeElement.style.display = "";
  }
  fourthWaitLister.textContent = "미정";
  const nameListBtns = document.querySelectorAll(
    "#addWaitListWholeContainer button"
  );
  nameListBtns.forEach((button) => {
    button.disabled = false;
  });
};

firstWaitLister.addEventListener("click", removeFirstName);
secondWaitLister.addEventListener("click", removeSecondName);
thirdWaitLister.addEventListener("click", removeThirdName);
fourthWaitLister.addEventListener("click", removeFourthName);
