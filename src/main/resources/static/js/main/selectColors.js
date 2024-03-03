const selectColors = document.getElementsByClassName("colorLabel");
for (const item of selectColors) {
  const input = item.htmlFor;
  if (input == "input1") {
    item.style.backgroundColor = "red";
  } else if (input == "input2") {
    item.style.backgroundColor = "orange";
  } else if (input == "input3") {
    item.style.backgroundColor = "yellow";
  } else if (input == "input4") {
    item.style.backgroundColor = "green";
  } else if (input == "input5") {
    item.style.backgroundColor = "black";
  }
}
