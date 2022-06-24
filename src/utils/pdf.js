import html2Canvas from "html2canvas";
import jsPDF from "jspdf";

// id-导出pdf的div容器；title-导出文件标题
function htmlToPdf(element, fileName) {
  const opts = {
    dpi: window.devicePixelRatio,
    scale: 12, // 缩放比例，提高生成图片清晰度
    useCORS: true, // 允许加载跨域的图片
    allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
    tainttest: true, // 检测每张图片已经加载完成
    logging: true // 日志开关，发布的时候记得改成 false
  };
  html2Canvas(element, opts).then(function (canvas) {
    var margin = 20;
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;

    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = contentWidth / 595.28 * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28  - margin * 2;
    var imgHeight = ((595.28 - margin * 2) / contentWidth) * contentHeight;

    var pageData = canvas.toDataURL("image/jpeg", 1.0);

    var pdf = new jsPDF("", "pt", "a4");

    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, "JPEG", margin, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, "JPEG", margin, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }

    pdf.save(fileName);
  });
}

export default {
  htmlToPdf
};
