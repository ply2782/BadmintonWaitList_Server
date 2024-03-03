const attendanceModal = document.getElementById("attendance_modal");
const container = document.getElementById("wholeContainerBox");

//이름 리스트
const addWaitListWholeContainer = document.getElementById(
  "addWaitListWholeContainer"
);

const attendance_addWaitListWholeContainer = document.getElementById(
  "attendance_addWaitListWholeContainer"
);
const firstWaitLister = document.getElementById("firstWaitList");
const secondWaitLister = document.getElementById("secondWaitList");
const thirdWaitLister = document.getElementById("thirdWaitList");
const fourthWaitLister = document.getElementById("fourthWaitList");
const confirmBtn = document.getElementById("confirmBtn");
let waitListFrameCount = [];
var isEdit = false;
var isChangeIndexEdit = false;
var clickIndex = -1;
let changeIndexArr = [];
const deleteCheckbox = document.getElementById("deleteCheckbox");
const closeDeleteModal = document.getElementById("closeDeleteModal");
