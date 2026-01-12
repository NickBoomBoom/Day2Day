import exceljs from "exceljs";

const rows = [
  [
    {
      value: "",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 1,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 2,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 3,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 4,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 5,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 6,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 7,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 8,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: 9,
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
  ],
  [
    {
      value: "学生",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "v3-测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "陈琦v3测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "刘莹辉v3测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "许孙玥v3测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "徐骏达v3测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "黄驯仁v3测试",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "阿萨德发生的发生的",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "他天天",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "555",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
    {
      value: "总分",
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF74B9FF",
        },
      },
      alignment: {
        horizontal: "center",
      },
    },
  ],
  ["黄驯仁", 504, 59, 627, 595, 616, 76, 432, 207, 15, 3131],
  ["刘莹辉", 776, 981, 110, 355, 287, 835, 471, 134, 886, 4835],
  ["伍翀", 986, 238, 54, 345, 510, 196, 761, 336, 968, 4394],
  ["许孙玥（学生）", 442, 476, 253, 572, 549, 738, 356, 125, 832, 4343],
  ["许孙玥", 648, 315, 572, 102, 447, 304, 882, 868, 318, 4456],
  ["1测试学生", 613, 549, 972, 774, 893, 669, 247, 254, 240, 5211],
];
async function run() {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("sheet1");

  const renderRows = rows.map((t) => {
    return t.map((tt: any) => (typeof tt === "object" ? tt.value : tt));
  });
  worksheet.addRows(renderRows);
  rows.forEach((t: any[], rowIndex: number) => {
    t.forEach((tt: any, cellIndex: number) => {
      if (typeof tt === "object") {
        const cell: any = worksheet.getCell(rowIndex + 1, cellIndex + 1);
        const { value, ...config } = tt;
        console.log(5555, tt, Object.keys(config).length);
        if (Object.keys(config).length) {
          for (const key in config) {
            console.log(111, key);
            cell[key] = config[key];
          }
        }
      }
    });
  });

  for (let i = 1; i <= worksheet.columnCount; i++) {
    const col = worksheet.getColumn(i);
    col.width = 20;
  }

  // [{ rowIndex: 2, cellIndex: 1 }].forEach((t) => {
  //   const { rowIndex, cellIndex } = t;

  //   const row = worksheet.getRow(rowIndex);
  //   const lastColumnNumber = row.cellCount; // 返回这一行实际有多少个单元格
  //   const lastColumnLetter = worksheet.getColumn(lastColumnNumber).letter;

  //   worksheet.autoFilter = {
  //     from: `A${rowIndex}`,
  //     to: `${lastColumnLetter}${rowIndex}`,
  //   };
  // });

  // const filterRowIndex = 2;
  // worksheet.autoFilter = {
  //   from: `A${filterRowIndex}`,
  //   to: `${worksheet.getColumn(worksheet.columnCount).letter}${filterRowIndex}`,
  // };

  worksheet.autoFilter = {
    from: "A2",
    to: "A2",
  };
  workbook.xlsx.writeFile("./xxxx.xlsx");
}

run();
