const deleteAll = () => {
  // Iterate over each element in waitListFrameCount array
  for (const element of waitListFrameCount) {
    const firstChildElement = element.querySelector(
      ".wholeContainer > div:nth-child(3)  > span"
    );
    const secondChildElement = element.querySelector(
      ".wholeContainer > div:nth-child(4)  > span"
    );
    const thirdChildElement = element.querySelector(
      ".wholeContainer > div:nth-child(5)  > span"
    );
    const fourthChildElement = element.querySelector(
      ".wholeContainer > div:nth-child(6)  > span"
    );

    // Reset display for corresponding buttons

    resetDisplay(
      `button.button-30[data-name=${firstChildElement.textContent}]`
    );
    resetDisplay(
      `button.button-30[data-name=${secondChildElement.textContent}]`
    );
    resetDisplay(
      `button.button-30[data-name=${thirdChildElement.textContent}]`
    );
    resetDisplay(
      `button.button-30[data-name=${fourthChildElement.textContent}]`
    );

    // Remove the current element from the container
    container.removeChild(element);
  }
  // Clear the waitListFrameCount array
  waitListFrameCount = [];
};

// Function to reset display property of a button
const resetDisplay = (selector) => {
  const resetElement = document.querySelector(selector);
  if (resetElement) {
    resetElement.style.display = "";
  }
};

document.getElementById("deleteAll").addEventListener("click", deleteAll);
