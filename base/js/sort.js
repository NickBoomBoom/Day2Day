const fs = require("fs");
const obj = {
  nodes: [
    {
      id: "cef6eba2-4398-4143-990e-37ace72ce9bb",
      type: "root",
      x: 0,
      y: 0,
      properties: {
        skillId: 7,
        nodeType: "root",
        width: 100,
        height: 60,
      },
      text: {
        x: 0,
        y: 0,
        value: "cq 测试",
      },
    },
    {
      id: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042",
      type: "knowledge",
      x: -267.5,
      y: -152,
      properties: {
        teachingModuleId: 3992,
        skillId: 7,
        nodeType: "knowledge",
        moduleType: 1,
        width: 100,
        height: 60,
      },
      text: {
        x: -267.5,
        y: -152,
        value: "我问问",
      },
    },
    {
      id: "83a361d3-666d-481f-9327-ebb8f7615691",
      type: "skill",
      x: -227.5,
      y: -312,
      properties: {
        skillId: 7,
        nodeType: "skill",
        moduleType: 2,
        width: 100,
        height: 60,
      },
      text: {
        x: -227.5,
        y: -312,
        value: "小技能 j;lkjds;af",
      },
    },
    {
      id: "66fce5b2-4048-418c-b907-5049f602ec2f",
      type: "knowledge",
      x: 61.5,
      y: -246,
      properties: {
        teachingModuleId: 3988,
        skillId: 7,
        nodeType: "knowledge",
        moduleType: 1,
        width: 100,
        height: 60,
      },
      text: {
        x: 61.5,
        y: -246,
        value: "Cruise Ship Daily Cleaning & Up keep",
      },
    },
  ],
  edges: [
    {
      id: "706a189d-c90e-4fc2-8fb7-3db5aa103803",
      type: "smoothCurvedEdge",
      properties: {},
      sourceNodeId: "83a361d3-666d-481f-9327-ebb8f7615691",
      targetNodeId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042",
      sourceAnchorId: "83a361d3-666d-481f-9327-ebb8f7615691_2",
      targetAnchorId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042_0",
      startPoint: {
        x: -227.5,
        y: -282,
      },
      endPoint: {
        x: -267.5,
        y: -182,
      },
      pointsList: [
        {
          x: -227.5,
          y: -282,
        },
        {
          x: -227.5,
          y: -232,
        },
        {
          x: -267.5,
          y: -232,
        },
        {
          x: -267.5,
          y: -182,
        },
      ],
    },
    {
      id: "7e828d62-2e34-45c2-95b4-140fd9e4878e",
      type: "smoothCurvedEdge",
      properties: {},
      sourceNodeId: "66fce5b2-4048-418c-b907-5049f602ec2f",
      targetNodeId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042",
      sourceAnchorId: "66fce5b2-4048-418c-b907-5049f602ec2f_2",
      targetAnchorId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042_1",
      startPoint: {
        x: 61.5,
        y: -216,
      },
      endPoint: {
        x: -217.5,
        y: -152,
      },
      pointsList: [
        {
          x: 61.5,
          y: -216,
        },
        {
          x: 61.5,
          y: -152,
        },
        {
          x: -217.5,
          y: -152,
        },
      ],
    },
    {
      id: "bec11e21-2564-4389-a7d6-6aca1e035a61",
      type: "smoothCurvedEdge",
      properties: {},
      sourceNodeId: "66fce5b2-4048-418c-b907-5049f602ec2f",
      targetNodeId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042",
      sourceAnchorId: "66fce5b2-4048-418c-b907-5049f602ec2f_3",
      targetAnchorId: "d3de5e43-061b-4d3c-bf6a-e6ef5f09c042_2",
      startPoint: {
        x: 11.5,
        y: -246,
      },
      endPoint: {
        x: -267.5,
        y: -122,
      },
      pointsList: [
        {
          x: 11.5,
          y: -246,
        },
        {
          x: -18.5,
          y: -246,
        },
        {
          x: -18.5,
          y: -92,
        },
        {
          x: -267.5,
          y: -92,
        },
        {
          x: -267.5,
          y: -122,
        },
      ],
    },
  ],
};
const res = {
  create: [],
  update: [],
};
function sort(obj) {
  const { nodes, edges } = obj;

  nodes.forEach((node) => {
    const {
      properties: { nodeType, moduleType, teachingModuleId, skillId },
      text: { value },
      id: nodeId,
    } = node;

    const parent = [];
    edges.forEach((edge) => {
      // sourceNodeId  起始节点
      // targetNodeId  目标节点
      const { sourceNodeId, targetNodeId } = edge;

      if (nodeId === sourceNodeId) {
        const targetNode = nodes.find((t) => t.id === targetNodeId);
        if (targetNode && targetNode.type !== "root") {
          parent.push(targetNode);
        }
      }
    });
    if (teachingModuleId) {
      res.update.push({
        ...node,
        parent,
      });
    } else if (nodeType !== "root") {
      res.create.push({
        ...node,
        parent,
      });
    }
  });

  // 模拟接口创建成功
  res.create.forEach((item) => {
    const tt = obj.nodes.find((t) => t.id === item.id);
    tt.properties.teachingModuleId =
      item.properties.nodeType + ~~(Math.random() * 1000);
    tt.properties.kk = 11;
    tt.properties.ii = 22;
  });

  // 进行 update 操作
  const newUpdate = [];
  res.update.forEach((item) => {
    const { parent } = item;
    parent.forEach((tt) => {
      newUpdate.push({
        ...item.properties,
        parentTeachingModuleId: tt.properties.teachingModuleId,
        nodeId: item.id,
        text: item.text.value,
        parentNodeId: tt.id,
      });
    });
  });
  res.create.forEach((t) => {
    const { parent } = t;
    parent.forEach((tt) => {
      const target = nodes.find((ttt) => ttt.id === tt.id);
      console.log("target", target, tt);
      newUpdate.push({
        parentTeachingModuleId: target.properties.teachingModuleId,
        ...t.properties,
        text: t.text.value,
        nodeId: t.id,
        parentNodeId: target.id,
      });
    });
  });

  fs.writeFileSync(
    "./result.json",
    JSON.stringify(
      {
        newUpdate,
        obj,
        res,
      },
      null,
      2
    ),
    "utf-8"
  );
}

sort(obj);
