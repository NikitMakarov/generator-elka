"use strict";
var yeoman = require("yeoman-generator");
module.exports = class extends yeoman {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "list",
        name: "courseOrSkill",
        choices: [
          {
            name: "Интерактивный курс",
            value: "course"
          },
          {
            name: "Навык",
            value: "skill"
          }
        ],
        message: "Новый интерактивный курс или навык?"
      },
      {
        type: "list",
        name: "checkClient",
        when: currentAnswers => currentAnswers.courseOrSkill === "course",
        choices: [
          {
            name: "Задания html",
            value: "html"
          },
          {
            name: "Задания js",
            value: "js"
          },
          {
            name: "Задания html-css-js и mf/html-css-js",
            value: "html-css-js"
          },
          {
            name: "Задания php",
            value: "php"
          }
        ],
        message: "Выберите шаблон типа заданий для check.client.js"
      },
      {
        type: "list",
        name: "type",
        when: currentAnswers => currentAnswers.checkClient === "html-css-js",
        choices: [
          {
            name: "html-css-js",
            value: "html-css-js"
          },
          {
            name: "mf/html-css-js",
            value: "mf/html-css-js"
          }
        ],
        message: "Какой тип задания запишем в meta.json?"
      },
      {
        type: "confirm",
        name: "challenge",
        message: "В курсе будет испытание?",
        default: true
      },
      {
        type: "list",
        name: "typeChallenge",
        when: currentAnswers => currentAnswers.challenge === true,
        choices: [
          {
            name: "html-css-js-iframe-challenge",
            value: "html-css-js-iframe-challenge"
          },
          {
            name: "html-css-challenge",
            value: "html-css-challenge"
          },
          {
            name: "js-challenge",
            value: "js-challenge"
          }
        ],
        message: "Выберите тип испытания:"
      },
      {
        type: "input",
        name: "challengeName",
        when: currentAnswers => currentAnswers.challenge === true,
        message: "Введите название испытания:"
      },
      {
        type: "input",
        name: "task",
        when: currentAnswers => currentAnswers.courseOrSkill === "course",
        message: "Введите количество страничек с заданиями в главе:"
      },
      {
        type: "input",
        name: "name",
        when: currentAnswers => currentAnswers.courseOrSkill === "skill",
        message: "Название навыка?",
        default: "new-case"
      },
      {
        type: "input",
        name: "zip",
        when: currentAnswers => currentAnswers.courseOrSkill === "skill",
        message: "Количество кейсов?"
      }
    ]);
  }

  writing() {
    const task = this.answers.task;
    const cases = this.answers.zip;
    const name = this.answers.name;
    const sum = Number(this.answers.task) + 1;
    const challenge = Number(this.answers.task) + 2;
    if (this.answers.courseOrSkill === "course") {
      for (let i = 1; i <= task; i++) {
        if (i < 10) {
          if (this.answers.checkClient === "html") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`0${i}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "HtmlCssJsChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`0${i}-task/meta.json`),
              { title: i, type: "html" }
            );
          }

          if (this.answers.checkClient === "js") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`0${i}-task/check.client.js`),
              {
                view: "JsView",
                runner: "JsRunner",
                checker: "JsChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`0${i}-task/meta.json`),
              { title: i, type: "js" }
            );
          }

          if (this.answers.checkClient === "html-css-js") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`0${i}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "PhpChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`0${i}-task/meta.json`),
              { title: i, type: this.answers.type }
            );
          }

          if (this.answers.checkClient === "php") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`0${i}-task/check.client.js`),
              {
                view: "PhpView",
                runner: "PhpRunner",
                checker: "PhpChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`0${i}-task/meta.json`),
              { title: i, type: "php" }
            );
          }
        } else {
          if (this.answers.checkClient === "html") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${i}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "HtmlCssJsChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${i}-task/meta.json`),
              { title: i, type: "html" }
            );
          }

          if (this.answers.checkClient === "js") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${i}-task/check.client.js`),
              {
                view: "JsView",
                runner: "JsRunner",
                checker: "JsChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${i}-task/meta.json`),
              { title: i, type: "js" }
            );
          }

          if (this.answers.checkClient === "html-css-js") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${i}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "PhpChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${i}-task/meta.json`),
              { title: i, type: this.answers.type }
            );
          }

          if (this.answers.checkClient === "php") {
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${i}-task/check.client.js`),
              {
                view: "PhpView",
                runner: "PhpRunner",
                checker: "PhpChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${i}-task/meta.json`),
              { title: i, type: "php" }
            );
          }
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("goals.html"),
            this.destinationPath(`0${i}-task/goals.html`)
          );

          this.fs.copyTpl(
            this.templatePath("theory.html"),
            this.destinationPath(`0${i}-task/theory.html`)
          );

          this.fs.copyTpl(
            this.templatePath("code/index.html"),
            this.destinationPath(`0${i}-task/code/index.html`)
          );

          this.fs.copyTpl(
            this.templatePath("code/index.php"),
            this.destinationPath(`0${i}-task/code/index.php`)
          );

          this.fs.copyTpl(
            this.templatePath("code/style.css"),
            this.destinationPath(`0${i}-task/code/style.css`)
          );

          this.fs.copyTpl(
            this.templatePath("code/script.js"),
            this.destinationPath(`0${i}-task/code/script.js`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("goals.html"),
            this.destinationPath(`${i}-task/goals.html`)
          );

          this.fs.copyTpl(
            this.templatePath("theory.html"),
            this.destinationPath(`${i}-task/theory.html`)
          );

          this.fs.copyTpl(
            this.templatePath("code/index.html"),
            this.destinationPath(`${i}-task/code/index.html`)
          );

          this.fs.copyTpl(
            this.templatePath("code/index.php"),
            this.destinationPath(`${i}-task/code/index.php`)
          );

          this.fs.copyTpl(
            this.templatePath("code/style.css"),
            this.destinationPath(`${i}-task/code/style.css`)
          );

          this.fs.copyTpl(
            this.templatePath("code/script.js"),
            this.destinationPath(`${i}-task/code/script.js`)
          );
        }
      }

      if (this.answers.challenge === true) {
        if (this.answers.typeChallenge === "html-css-js-iframe-challenge") {
          this.fs.copyTpl(
            this.templatePath("challenge/check.client.js"),
            this.destinationPath(`${challenge}-task/check.client.js`),
            {
              view: "HtmlCssJsIframeView",
              runner: "HtmlCssJsIframeRunner",
              checker: "HtmlCssJsIframeChallengeChecker, function () {}"
            }
          );

          this.fs.copyTpl(
            this.templatePath("challenge/meta.json"),
            this.destinationPath(`${challenge}-task/meta.json`),
            {
              title: this.answers.challengeName,
              type: "html-css-js-iframe-challenge"
            }
          );
        }

        if (this.answers.typeChallenge === "html-css-challenge") {
          this.fs.copyTpl(
            this.templatePath("challenge/check.client.js"),
            this.destinationPath(`${challenge}-task/check.client.js`),
            {
              view: "HtmlCssChallengeView",
              runner: "HtmlCssRunner",
              checker: "HtmlCssChallengeChecker"
            }
          );

          this.fs.copyTpl(
            this.templatePath("challenge/meta.json"),
            this.destinationPath(`${challenge}-task/meta.json`),
            {
              title: this.answers.challengeName,
              type: "html-css-challenge"
            }
          );
        }

        if (this.answers.typeChallenge === "js-challenge") {
          this.fs.copyTpl(
            this.templatePath("challenge/check.client.js"),
            this.destinationPath(`${challenge}-task/check.client.js`),
            {
              view: `JsView`,
              runner: `JsRunner, function () {
    this.enableChallenge();
  }`,
              checker: `JsChallengeChecker, function () {}`
            }
          );

          this.fs.copyTpl(
            this.templatePath("challenge/meta.json"),
            this.destinationPath(`${challenge}-task/meta.json`),
            {
              title: this.answers.challengeName,
              type: "js-challenge"
            }
          );
        }

        this.fs.copyTpl(
          this.templatePath("code/index.html"),
          this.destinationPath(`${challenge}-task/code/index.html`)
        );

        this.fs.copyTpl(
          this.templatePath("code/index.php"),
          this.destinationPath(`${challenge}-task/code/index.php`)
        );

        this.fs.copyTpl(
          this.templatePath("code/script.js"),
          this.destinationPath(`${challenge}-task/code/script.js`)
        );

        this.fs.copyTpl(
          this.templatePath("code/style.css"),
          this.destinationPath(`${challenge}-task/code/style.css`)
        );

        this.fs.copyTpl(
          this.templatePath("goals.html"),
          this.destinationPath(`${challenge}-task/goals.html`)
        );

        this.fs.copyTpl(
          this.templatePath("theory.html"),
          this.destinationPath(`${challenge}-task/theory.html`)
        );
      }

      this.fs.copy(
        this.templatePath("code/meta.json"),
        this.destinationPath("meta.json")
      );
      this.fs.copy(
        this.templatePath("code/summary/check.client.js"),
        this.destinationPath(`${sum}-summary/check.client.js`)
      );
      this.fs.copy(
        this.templatePath("code/summary/meta.json"),
        this.destinationPath(`${sum}-summary/meta.json`)
      );
      this.fs.copy(
        this.templatePath("code/summary/theory.html"),
        this.destinationPath(`${sum}-summary/theory.html`)
      );
    }

    if (this.answers.courseOrSkill === "skill") {
      this.fs.write(this.destinationPath("src/pages/.gitkeep"), "");
      this.fs.copyTpl(
        this.templatePath("skills/demos/content.json"),
        this.destinationPath(`demos/${name}/content.json`)
      );
      for (let i = 1; i <= cases; i++) {
        this.fs.copyTpl(
          this.templatePath("skills/files/sample-1.zip"),
          this.destinationPath(`files/code-${name}-${i}.zip`)
        );
      }

      this.fs.copyTpl(
        this.templatePath("skills/description.html"),
        this.destinationPath("description.html")
      );

      this.fs.copyTpl(
        this.templatePath("skills/meta.json"),
        this.destinationPath("meta.json")
      );
    }
  }
};
