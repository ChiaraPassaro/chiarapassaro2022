import { unref } from "vue";

// cytoscape for Map
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
cytoscape.use(cola);

function mouseOverNode(node, bgColorEnd) {
  node.style("background-color", bgColorEnd);
  const label = node.style("label");
  node.style("label", "Open " + label);
}

function mouseLeaveNode(node, bgColorStart) {
  node.style("background-color", bgColorStart);
  const label = node.style("label").replace("Open", "");
  node.style("label", label);
}

export const useInitGraph = ({
  elementDOM,
  bgColorStart,
  bgColorEnd,
  lineMapColor,
  elements,
  callback,
}) => {
  console.log("graph");
  const setupCytoscape = {
    hideEdgesOnViewport: true,
    container: unref(elementDOM),
    autounselectify: true,
    boxSelectionEnabled: false,
    pannable: false,
    userZoomingEnabled: false,
    layout: {
      name: "cola",
      animate: true,
      refresh: 1,
      maxSimulationTime: 30000,
      fit: true,
      padding: 30,
      nodeDimensionsIncludeLabels: false,
      randomize: false,
      avoidOverlap: true,
      handleDisconnected: true,
      convergenceThreshold: 0.01,
      flow:
        window.innerWidth < 1024 ? { axis: "x", minSeparation: 30 } : undefined,
      nodeSpacing: function (node) {
        return 18;
      },
      edgeLength: 40,
    },
    style: [
      {
        selector: "node",
        style: {
          "background-color": bgColorStart,
          label: "data(label)",
          color: "data(color)",
          "font-size": window.innerWidth > 1024 ? "9" : "12",
          width: "data(size)",
          height: "data(size)",
          "border-width": "0.6",
          "border-style": "solid",
          "border-color": lineMapColor,
        },
      },
      {
        selector: "edge",
        css: {
          width: 0.4,
          "line-color": lineMapColor,
        },
      },
    ],
    elements: elements.value,
  };

  const graph = cytoscape(setupCytoscape)
    .on("mouseover", "node", function (event) {
      const node = event.target;
      if (node.data("aside")) {
        mouseOverNode(node, bgColorEnd);
      }
    })
    .on("mouseout", "node", function (event) {
      const node = event.target;
      if (node.data("aside")) {
        mouseLeaveNode(node, bgColorStart);
      }
    })
    .on("tap", "node", function (event) {
      const node = event.target;
      if (node.data("aside")) {
        const nodeName = node.data("name");
        mouseLeaveNode(node, bgColorStart);
        callback({ tag: node.data("tag"), name: nodeName });
      }
    })
    .on("layoutstop", function () {
      this.nodes()
        .filter(function (element) {
          return element.data("aside");
        })
        .forEach((element) => {
          const jAni = element.animation({
            style: {
              width: element.data("size") + 10,
              height: element.data("size") + 10,
            },
            duration: 1000,
          });

          setTimeout(() => {
            jAni.play();
          }, 1100);
        });
    });

  return graph;
};
