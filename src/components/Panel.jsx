import "./Panel.css";

import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ListIcon from "@mui/icons-material/List";

function Panel({
  handleDelete,
  handleRenew,
  handleCreateRandom,
  handleBetweenSums,
  handleDeleteTransaction,
  setIsCreateTransactionBetweenSumsModalOpen,
  setTransactionBetweenSums,
  handleUpdate,
  handleCreate,
  selectedRows,
  setIsDeleteTransactionBetweenDatesModalOpen,
}) {
  const [currentPage, setCurrentPage] = React.useState("/");

  React.useEffect(() => {
    switch (window.location.pathname) {
      case "/cars":
        setCurrentPage("cars");
        break;
      case "/transactions":
        setCurrentPage("transactions");
        break;
      case "/cards":
        setCurrentPage("cards");
        break;
      default:
        setCurrentPage("/");
    }
  });

  return (
    <Stack direction="row" spacing={2} className="PanelButtons">
      <Button
        onClick={handleCreate}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Create
      </Button>
      {selectedRows.length == 1 ? (
        <Button
          onClick={handleUpdate}
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      ) : (
        ""
      )}
      {selectedRows.length >= 1 ? (
        <Button
          onClick={handleDelete}
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ) : (
        ""
      )}

      <Button
        onClick={handleCreateRandom}
        variant="contained"
        startIcon={<AddIcon />}
      >
        Create Random
      </Button>
      {currentPage === "cars" && (
        <Button
          onClick={handleRenew}
          variant="contained"
          startIcon={<PublishedWithChangesIcon />}
        >
          Renew Cars Warranty
        </Button>
      )}

      {currentPage === "transactions" && (
        <>
          {" "}
          <Button
            onClick={() => setIsCreateTransactionBetweenSumsModalOpen(true)}
            variant="contained"
            startIcon={<ListIcon />}
          >
            Transaction list between sums
          </Button>
          <Button
            onClick={() => setIsDeleteTransactionBetweenDatesModalOpen(true)}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete transactions between dates
          </Button>
        </>
      )}
    </Stack>
  );
}

export default Panel;
