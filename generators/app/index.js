"use strict";
const yeoman = require("yeoman-generator");
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
        type: "input",
        name: "courseName",
        when: currentAnswers => currentAnswers.courseOrSkill === "course",
        message: "Введите название главы"
      },
      {
        type: "input",
        name: "courseDescription",
        when: currentAnswers => currentAnswers.courseOrSkill === "course",
        message: "Введите описание для главы"
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
    let nameCount;
    // Создаем папки и файлы для заданий
    if (this.answers.courseOrSkill === "course") {
      for (let i = 1; i <= task; i++) {
        if (i < 10) {
          nameCount = "0" + i;
        } else {
          nameCount = i;
        }

        switch (this.answers.checkClient) {
          case "html":
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${nameCount}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "HtmlCssJsChecker"
              }
            );

            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${nameCount}-task/meta.json`),
              { title: i, type: "html" }
            );
            break;
          case "js":
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${nameCount}-task/check.client.js`),
              {
                view: "JsView",
                runner: "JsRunner",
                checker: "JsChecker"
              }
            );
            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${nameCount}-task/meta.json`),
              { title: i, type: "js" }
            );
            break;
          case "html-css-js":
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${nameCount}-task/check.client.js`),
              {
                view: "HtmlCssView",
                runner: "HtmlCssRunner",
                checker: "HtmlCssJsChecker"
              }
            );
            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${nameCount}-task/meta.json`),
              { title: i, type: this.answers.type }
            );
            break;
          case "php":
            this.fs.copyTpl(
              this.templatePath("check.client.js"),
              this.destinationPath(`${nameCount}-task/check.client.js`),
              {
                view: "PhpView",
                runner: "PhpRunner",
                checker: "PhpChecker"
              }
            );
            this.fs.copyTpl(
              this.templatePath("meta.json"),
              this.destinationPath(`${nameCount}-task/meta.json`),
              { title: i, type: "php" }
            );
            this.fs.copyTpl(
              this.templatePath("code/index.php"),
              this.destinationPath(`${nameCount}-task/code/index.php`)
            );
            break;
          default:
            break;
        }

        this.fs.copyTpl(
          this.templatePath("goals.html"),
          this.destinationPath(`${nameCount}-task/goals.html`)
        );

        this.fs.copyTpl(
          this.templatePath("theory.html"),
          this.destinationPath(`${nameCount}-task/theory.html`)
        );

        this.fs.copyTpl(
          this.templatePath("code/index.html"),
          this.destinationPath(`${nameCount}-task/code/index.html`)
        );

        this.fs.copyTpl(
          this.templatePath("code/style.css"),
          this.destinationPath(`${nameCount}-task/code/style.css`)
        );

        this.fs.copyTpl(
          this.templatePath("code/script.js"),
          this.destinationPath(`${nameCount}-task/code/script.js`)
        );
      }

      // Создаем папки и файлы для испытаний
      if (this.answers.challenge === true) {
        switch (this.answers.typeChallenge) {
          case "html-css-js-iframe-challenge":
            this.fs.copyTpl(
              this.templatePath("challenge/check.client.js"),
              this.destinationPath(`${challenge}-challenge/check.client.js`),
              {
                view: "HtmlCssJsIframeView",
                runner: "HtmlCssJsIframeRunner",
                checker: "HtmlCssJsIframeChallengeChecker, function () {}"
              }
            );
            this.fs.copyTpl(
              this.templatePath("challenge/meta.json"),
              this.destinationPath(`${challenge}-challenge/meta.json`),
              {
                title: this.answers.challengeName,
                type: "html-css-js-iframe-challenge"
              }
            );
            break;
          case "html-css-challenge":
            this.fs.copyTpl(
              this.templatePath("challenge/check.client.js"),
              this.destinationPath(`${challenge}-challenge/check.client.js`),
              {
                view: "HtmlCssChallengeView",
                runner: "HtmlCssRunner",
                checker: "HtmlCssChallengeChecker"
              }
            );
            this.fs.copyTpl(
              this.templatePath("challenge/meta.json"),
              this.destinationPath(`${challenge}-challenge/meta.json`),
              {
                title: this.answers.challengeName,
                type: "html-css-challenge"
              }
            );
            break;
          case "js-challenge":
            this.fs.copyTpl(
              this.templatePath("challenge/check.client.js"),
              this.destinationPath(`${challenge}-challenge/check.client.js`),
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
              this.destinationPath(`${challenge}-challenge/meta.json`),
              {
                title: this.answers.challengeName,
                type: "js-challenge"
              }
            );
            break;
          default:
        }

        this.fs.copyTpl(
          this.templatePath("code/index.html"),
          this.destinationPath(`${challenge}-challenge/code/index.html`)
        );

        this.fs.copyTpl(
          this.templatePath("code/index.php"),
          this.destinationPath(`${challenge}-challenge/code/index.php`)
        );

        this.fs.copyTpl(
          this.templatePath("code/script.js"),
          this.destinationPath(`${challenge}-challenge/code/script.js`)
        );

        this.fs.copyTpl(
          this.templatePath("code/style.css"),
          this.destinationPath(`${challenge}-challenge/code/style.css`)
        );

        this.fs.copyTpl(
          this.templatePath("goals.html"),
          this.destinationPath(`${challenge}-challenge/goals.html`)
        );

        this.fs.copyTpl(
          this.templatePath("theory.html"),
          this.destinationPath(`${challenge}-challenge/theory.html`)
        );
      }

      // Мета и конспект
      this.fs.copyTpl(
        this.templatePath("code/meta.json"),
        this.destinationPath(`meta.json`),
        {
          title: this.answers.courseName,
          description: this.answers.courseDescription
        }
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

    // Навычная
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
