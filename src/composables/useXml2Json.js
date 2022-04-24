import { isArray } from "@vue/shared";

export default function useXml2Json(xml) {
  try {
    let obj = {};
    let length = xml.children.length;
    if (length > 0) {
      for (let index = 0; index < length; index++) {
        const item = xml.children[index];
        let nodeName =
          item.nodeName === "content:encoded" ? "content" : item.nodeName;
        if (!(nodeName in obj)) {
          obj[nodeName] = useXml2Json(item);
        } else {
          if (!isArray(obj[nodeName])) {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(useXml2Json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
    console.log(e.message);
  }
}
