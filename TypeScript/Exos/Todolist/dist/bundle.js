/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Task.ts":
/*!********************************!*\
  !*** ./src/components/Task.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Component_1 = __webpack_require__(/*! ../utils/Component */ \"./src/utils/Component.ts\");\nclass Task extends Component_1.default {\n    constructor(id, title, description, done = false, parentElement) {\n        super();\n        this.id = id;\n        this.title = title;\n        this.description = description;\n        this.done = done;\n        this.parentElement = parentElement;\n        // Appel de render\n        this.render();\n    }\n    render() {\n        // Création d'une balise article\n        const articleElt = this.createMarkup(\"article\", this.parentElement);\n        // Création d'une balise h3 qui reprend le titre de la tâche\n        const h3Elt = this.createMarkup(\"h3\", articleElt, this.title);\n        // Case à cocher pour montrer si la tâche est faite\n        const checkbox = this.createMarkup(\"input\", articleElt, \"\", {\n            type: \"checkbox\",\n        });\n        checkbox.checked = this.done;\n    }\n}\nexports[\"default\"] = Task;\n\n\n//# sourceURL=webpack://tp01WebpackTS/./src/components/Task.ts?");

/***/ }),

/***/ "./src/components/Todolist.ts":
/*!************************************!*\
  !*** ./src/components/Todolist.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Component_1 = __webpack_require__(/*! ../utils/Component */ \"./src/utils/Component.ts\");\nconst Task_1 = __webpack_require__(/*! ./Task */ \"./src/components/Task.ts\");\nclass Todolist extends Component_1.default {\n    constructor(title, tasks) {\n        super();\n        this.title = title;\n        this.tasks = tasks;\n        // Appel de render dès la construction\n        this.render();\n    }\n    // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist\n    render() {\n        // création d'une section qui entoure la todolist\n        const section = this.createMarkup(\"section\", document.body);\n        // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section\n        this.createMarkup(\"h2\", section, this.title, { id: \"title-todolist\" });\n        // Création des balises \"article\" à partir de la propriété tasks\n        // Attention, vous êtes obligés de passer par la création d'un composant class \"Task\"\n        this.tasks.forEach((task) => {\n            new Task_1.default(task.id, task.title, task.description, task.done, section);\n        });\n    }\n}\nexports[\"default\"] = Todolist;\n\n\n//# sourceURL=webpack://tp01WebpackTS/./src/components/Todolist.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Todolist_1 = __webpack_require__(/*! ./components/Todolist */ \"./src/components/Todolist.ts\");\nconsole.log(`Dans index.ts`);\nconst tasks = [\n    {\n        id: \"1\",\n        title: \"Faire la vaisselle\",\n        description: \"Et que ça saute\",\n        done: true,\n    },\n    {\n        id: \"2\",\n        title: \"Faire du sport\",\n        description: \"Et que ça saute\",\n        done: false,\n    },\n];\nconst todolist1 = new Todolist_1.default(\"Première Todolist\", tasks);\nconsole.log(`todolist1.title`, todolist1.title);\n\n\n//# sourceURL=webpack://tp01WebpackTS/./src/index.ts?");

/***/ }),

/***/ "./src/utils/Component.ts":
/*!********************************!*\
  !*** ./src/utils/Component.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass Component {\n    /**\n     * Crée un élément du dom, lui ajoute du texte, le place comme dernier\n     * enfant de parent et ajoute un attribut en utilisant le paramètre attributes\n     * @param {String} markup_name\n     * @param {domElement} parent\n     * @param {String} text\n     * @param {Object} attributes\n     * @returns domElement\n     */\n    createMarkup(markupname, parent, text = \"\", attributes = {}) {\n        const markup = document.createElement(markupname);\n        markup.textContent = text;\n        parent.appendChild(markup);\n        for (let key in attributes) {\n            markup.setAttribute(key, attributes[key]);\n        }\n        return markup;\n    }\n}\nexports[\"default\"] = Component;\n\n\n//# sourceURL=webpack://tp01WebpackTS/./src/utils/Component.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;