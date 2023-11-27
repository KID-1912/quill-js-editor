import "@simonwep/pickr/dist/themes/monolith.min.css";
import Pickr from "@simonwep/pickr";
import { Dropdown } from "../plugins/dropdown";
import { quillEditor } from "./quillEditor";

const $toolbar = document.querySelector("#toolbar");
const $undoBtn = $toolbar.querySelector(".undo");
const $redoBtn = $toolbar.querySelector(".redo");
const $dropdownSize = $toolbar.querySelector(".dropdown-size");
const $colorPicker = $toolbar.querySelector(".color-picker");
const $backgroundPicker = $toolbar.querySelector(".background-picker");

// 撤销
$undoBtn.addEventListener("click", () => quillEditor.history.undo());
// 重做
$redoBtn.addEventListener("click", () => quillEditor.history.redo());

// 默认字号
const defaultSize = "17px";
quillEditor.container.style.fontSize = defaultSize;
$dropdownSize.querySelector(".dropdown-toggle .size").textContent = defaultSize;
// 设置字号
new Dropdown({ el: $dropdownSize });
$dropdownSize.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  const size = e.target.dataset.size;
  if (!size) return;
  // 调用编辑器设置字号方法
  quillEditor.format("size", `${size}px`);
  $dropdownSize.querySelector(
    ".dropdown-toggle .size"
  ).textContent = `${size}px`;
});

// 设置文字颜色
const colorList = [
  "#ffffff",
  "#ffacaa",
  "#fffb00",
  "#73fa79",
  "#78acfe",
  "#d7aba9",
  "#ffda51",
  "#00d5ff",
  "#888888",
  "#7a4442",
  "#ff4c00",
  "#ffa900",
  "#3da742",
  "#000000",
];
const colorPickr = Pickr.create({
  el: $colorPicker,
  theme: "monolith",
  useAsButton: true,
  swatches: colorList,
  components: {
    preview: true,
    hue: true,
    interaction: {
      input: true,
      save: true,
    },
  },
  i18n: { "btn:save": "确认" },
});
colorPickr.on("save", (color, instance) => {
  instance.hide();
  quillEditor.format("color", color.toHEXA().toString());
});

// 设置文字背景颜色
const backgroundPickr = Pickr.create({
  el: $backgroundPicker,
  theme: "monolith",
  useAsButton: true,
  swatches: colorList,
  components: {
    preview: true,
    hue: true,
    interaction: {
      input: true,
      save: true,
    },
  },
  i18n: { "btn:save": "确认" },
});
backgroundPickr.on("save", (color, instance) => {
  instance.hide();
  quillEditor.format("background", color.toHEXA().toString());
});
