HtmlacademyTask.setup(function () {
  this.setView(HtmlCssView);
  this.setRunner(HtmlCssRunner);
  this.setChecker(HtmlCssJsChecker, function () {
    this.setMatcher(function () {});
  });
  this.setAnswers([]);
});
