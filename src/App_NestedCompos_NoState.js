import { useState } from "react";
import { VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

let cellDefinitions = [
  () => ({
    value: Math.floor(Math.random() * 100),
  }),
  () => ({
    value: cellTexts[Math.floor(Math.random() * cellTexts.length)],
  }),
  () => ({
    value: cellModalities[Math.floor(Math.random() * cellModalities.length)],
  }),
  () => ({
    value: Math.random() < 0.5,
  }),
];

let cellModalities = [
  "Apple",
  "Banana",
  "Cherry",
  "Durian",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeyberry",
  "Jujube",
  "Kumquat",
];
let cellTexts = [
  "Alice",
  "Bob",
  "Charlie",
  "Dan",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Ken",
];
function createArray(length, generator) {
  return new Array(length).fill(undefined).map((_, index) => generator(index));
}
function createTable() {
  let nbColumns = 100;
  let nbRows = 50000;

  return {
    pivot1: createArray(nbColumns, (index) => ({
      label: "Country #" + index,
      width: 60 + ~~(Math.random() * 120),
    })),
    pivot2: createArray(nbRows, (index) => ({
      label: "Product #" + index,
      height: 34,
    })),
    data: createArray(nbColumns * nbRows, (index) =>
      cellDefinitions[(index % nbRows) % cellDefinitions.length]()
    ),
  };
}

function Cell(props) {
  if (props.count === undefined) {
    return <Cell {...props} count={99} />;
  }
  if (props.count > 0) {
    return <Cell {...props} count={props.count - 1} />;
  }
  return (
    <div style={props.style}>
      {
        props.data.data[
          props.columnIndex + props.rowIndex * props.data.pivot1.length
        ].value
      }
    </div>
  );
}

export default function App() {
  const [table] = useState(() => createTable());
  return (
    <AutoSizer>
      {({ height, width }) => (
        <VariableSizeGrid
          columnCount={table.pivot1.length}
          columnWidth={(index) => table.pivot1[index].width}
          rowCount={table.pivot2.length}
          rowHeight={(index) => table.pivot2[index].height}
          width={width}
          height={height}
          itemData={table}
        >
          {Cell}
        </VariableSizeGrid>
      )}
    </AutoSizer>
  );
}
