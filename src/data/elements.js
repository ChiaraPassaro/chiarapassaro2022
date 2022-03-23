export default {
  nodes: [
    {
      data: {
        id: "1",
        label: "Javascript",
        size: 3,
      },
    },
    {
      data: {
        id: "2",
        label: "Vuejs",
        size: 3,
      },
    },
    {
      data: {
        id: "3",
        label: "Articles",
        size: 8,
      },
    },
    {
      data: {
        id: "4",
        label: "Teaching",
        size: 8,
      },
    },
    {
      data: {
        id: "5",
        label: "HTML",
        size: 3,
      },
    },
    {
      data: {
        id: "6",
        label: "PHP",
        size: 3,
      },
    },
    {
      data: {
        id: "7",
        label: "Ergonomics",
        size: 3,
      },
    },
  ],
  edges: [
    {
      data: {
        source: "1",
        target: "2",
      },
    },
    {
      data: {
        source: "3",
        target: "2",
      },
    },
    {
      data: {
        source: "3",
        target: "1",
      },
    },
    {
      data: {
        source: "4",
        target: "1",
      },
    },
    {
      data: {
        source: "4",
        target: "5",
      },
    },
    {
      data: {
        source: "4",
        target: "6",
      },
    },
    {
      data: {
        source: "3",
        target: "7",
      },
    },
  ],
};
