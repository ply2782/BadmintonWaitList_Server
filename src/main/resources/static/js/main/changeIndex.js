$("#changeIndex").click(function () {
  isChangeIndexEdit = isChangeIndexEdit ? false : true;
  $("div[class=checkbox-wrapper-26]").each(function () {
    if (isChangeIndexEdit) {
      $(this).css("display", "");
    } else {
      $(this).css("display", "none");
      $(this).find("input[type='checkbox']").prop("checked", false);
      changeIndexArr = [];
    }
  });
});
