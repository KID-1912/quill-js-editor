import Quill from "quill";
import Delta from "quill-delta";
import { quillEditor } from "./quillEditor";
import Clipboard from "clipboard";

// 上传图片
const imageUploader = document.querySelector("#image_uploader");
imageUploader.addEventListener("change", function (e) {
  const [file] = imageUploader.files;
  const fileReader = new FileReader();
  fileReader.onload = () => {
    if (fileReader.error) {
      console.log(fileReader.error);
      return;
    }
    const dataString = fileReader.result;
    // quillEditor.insertEmbed(Date.now(), "image", dataString);

    // 限制图片大小
    const maxWidth = quillEditor.root.clientWidth;
    const img = new Image();
    img.src = dataString;
    img.onload = function () {
      const index = quillEditor.getSelection(true).index;
      const delta = new Delta().retain(index);
      delta.insert("\n");
      delta.insert(
        { image: dataString },
        { width: maxWidth > img.width ? img.width : maxWidth }
      );
      delta.insert("\n");
      quillEditor.updateContents(delta);
      quillEditor.setSelection(index + 3, Quill.sources.USER);
    };
    imageUploader.value = "";
  };
  fileReader.readAsDataURL(file);
});

// 导出
new Clipboard(".btn-export");
