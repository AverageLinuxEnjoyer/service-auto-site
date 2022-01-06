import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}


export default function DataTable({
  columns,
  rows,
  selectedRows,
  setSelectedRows,
}) {
  const screen_width = getWindowDimensions().width;

  columns.map((column) => {
    column.width = (screen_width / columns.length) * 0.9;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) => selectedIDs.has(row.id));

          setSelectedRows(selectedRows);
        }}
      />
    </div>
  );
}
