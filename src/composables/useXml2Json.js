export default function useXml2Json(xml) {
  try {
    let obj = {};
    if (xml.children.length > 0) {
      for (let i = 0; i < xml.children.length; i++) {
        const item = xml.children.item(i);
        let nodeName = item.nodeName;

        if (nodeName === "content:encoded") {
          nodeName = "content";
        }

        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = useXml2Json(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
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
