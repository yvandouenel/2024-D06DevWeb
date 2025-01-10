let template = document.getElementById("my-paragraph");
let templateContent = template.content.cloneNode(true);
let templateContent2 = template.content.cloneNode(true);
document.body.appendChild(templateContent);
document.body.appendChild(templateContent2);