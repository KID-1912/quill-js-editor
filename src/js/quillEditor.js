import Quill from "quill";
import "quill/dist/quill.core.css";
import BlotFormatter from "quill-blot-formatter";
import { DeleteAction, ResizeAction, ImageSpec } from "quill-blot-formatter";

// 图片/视频设置大小居中
Quill.register("modules/blotFormatter", BlotFormatter);
class CustomImageSpec extends ImageSpec {
  init() {
    this.formatter.quill.root.addEventListener("click", this.onClick);
    this.formatter.quill.root.addEventListener("scroll", () => {
      this.formatter.repositionOverlay();
    });
  }
  getActions() {
    return [DeleteAction, ResizeAction];
  }
}

// 字号白名单
const SizeAttributor = Quill.import("attributors/style/size");
SizeAttributor.whitelist = [
  "12px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
  "20px",
  "24px",
];
Quill.register(SizeAttributor, true);

// QuillEditor
const quillEditor = new Quill(".editor", {
  modules: {
    toolbar: "#toolbar",
    history: {},
    clipboard: {},
    blotFormatter: {
      specs: [CustomImageSpec],
      resize: {
        handleStyle: {
          width: "8px",
          height: "8px",
          opacity: 1,
          border: "1px solid rgb(7, 193, 96)",
          backgroundColor: "rgb(7, 193, 96)",
        },
      },
      overlay: {
        style: {
          border: "2px solid rgb(7, 193, 96)",
        },
      },
    },
  },
});

export { quillEditor };
