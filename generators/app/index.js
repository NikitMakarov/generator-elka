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
        message: "Новый интерактивный курс или навык?",
        default: 0,
        store: true
      },
      {
        type: "input",
        name: "type",
        when: currentAnswers => currentAnswers.courseOrSkill === "course",
        message:
          "Введите тип заданий (Что-то из этого): html, html-css, js, html-css-js, mf/html-css-js, php."
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
    if (this.answers.courseOrSkill === "course") {
      for (let i = 1; i <= task; i++) {
        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("goals.html"),
            this.destinationPath(`0${i}-task/goals.html`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("goals.html"),
            this.destinationPath(`${i}-task/goals.html`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("check.client.js"),
            this.destinationPath(`0${i}-task/check.client.js`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("check.client.js"),
            this.destinationPath(`${i}-task/check.client.js`)
          );
        }

        if (i < 10) {
          this.fs.copy(
            this.templatePath("meta.json"),
            this.destinationPath(`0${i}-task/meta.json`)
          );
        } else {
          this.fs.copy(
            this.templatePath("meta.json"),
            this.destinationPath(`${i}-task/meta.json`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("meta.json"),
            this.destinationPath(`0${i}-task/meta.json`),
            { title: i, type: this.answers.type }
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("meta.json"),
            this.destinationPath(`${i}-task/meta.json`),
            { title: i, type: this.answers.type }
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("theory.html"),
            this.destinationPath(`0${i}-task/theory.html`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("theory.html"),
            this.destinationPath(`${i}-task/theory.html`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("code/index.html"),
            this.destinationPath(`0${i}-task/code/index.html`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("code/index.html"),
            this.destinationPath(`${i}-task/code/index.html`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("code/index.php"),
            this.destinationPath(`0${i}-task/code/index.php`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("code/index.php"),
            this.destinationPath(`${i}-task/code/index.php`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("code/style.css"),
            this.destinationPath(`0${i}-task/code/style.css`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("code/style.css"),
            this.destinationPath(`${i}-task/code/style.css`)
          );
        }

        if (i < 10) {
          this.fs.copyTpl(
            this.templatePath("code/script.js"),
            this.destinationPath(`0${i}-task/code/script.js`)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath("code/script.js"),
            this.destinationPath(`${i}-task/code/script.js`)
          );
        }
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
