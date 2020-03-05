"use strict";
var yeoman = require("yeoman-generator");
module.exports = class extends yeoman {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "type",
        message: "Введите тип заданий (Что-то из этого): html, html-css, js, html-css-js, mf/html-css-js, php"
      },
      {
        type: "input",
        name: "task",
        message: "Введите количество страничек с заданиями в главе"
      }
    ]);
  }

  writing() {
    const task = this.answers.task;
    const sum = Number(this.answers.task) + 1;
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
    }

    for (let i = 1; i <= task; i++) {
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
};
