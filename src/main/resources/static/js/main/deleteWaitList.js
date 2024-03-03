const trashImgBox = document.getElementById("box");
// 참가자 리스트 삭제 이벤트
const deleteWaitList = () => {
  if (!deleteCheckbox.checked) {
    deleteCheckbox.checked = true;
  }

  if (waitListFrameCount.length > 0) {
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
    const resetElement_1 = document.querySelector(
      `button.button-30[data-name=${firstChildElement.textContent}]`
    );
    if (resetElement_1) {
      resetElement_1.style.display = "";
    }
    const resetElement_2 = document.querySelector(
      `button.button-30[data-name=${secondChildElement.textContent}]`
    );
    if (resetElement_2) {
      resetElement_2.style.display = "";
    }
    const resetElement_3 = document.querySelector(
      `button.button-30[data-name=${thirdChildElement.textContent}]`
    );
    if (resetElement_3) {
      resetElement_3.style.display = "";
    }
    const resetElement_4 = document.querySelector(
      `button.button-30[data-name=${fourthChildElement.textContent}]`
    );
    if (resetElement_4) {
      resetElement_4.style.display = "";
    }

    waitListFrameCount.splice(clickIndex - 1, 1);
    waitListFrameCount.forEach((v, i) => {
      const span = v.querySelector(".wholeContainer > div:nth-child(2) > span");
      span.setAttribute("data-count", `${i + 1}`);
      span.textContent = `${i + 1}`;
    });
    const deleteElement = container.children[clickIndex - 1];
    if (deleteElement) {
      container.removeChild(deleteElement);
    }

    const timeOut = setTimeout(() => {
      closeDeleteModalFunc();
      clearTimeout(timeOut);
    }, 250);
  } else {
    alert("삭제할 명단이 없습니다.");
  }
};
trashImgBox.addEventListener("click", deleteWaitList);
deleteCheckbox.addEventListener("click", deleteWaitList);
