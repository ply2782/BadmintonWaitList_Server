// 참가자 리스트 삭제 모달 닫기 이벤트
const closeDeleteModalFunc = () => {
  $("#modal-container").addClass("out");
  $("body").removeClass("modal-active");
  deleteCheckbox.checked = false;
};
closeDeleteModal.addEventListener("click", closeDeleteModalFunc);
