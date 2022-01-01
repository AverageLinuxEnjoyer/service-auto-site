import "./Panel.css";

import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import ListIcon from '@mui/icons-material/List';

function Panel() {
  return (
    <Stack direction="row" spacing={2} className="PanelButtons">
      <Button variant="contained" startIcon={<AddIcon />}>
        Create
      </Button>
      <Button variant="contained" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" startIcon={<AddIcon />}>
        Create Random
      </Button>
      <Button variant="contained" startIcon={<PublishedWithChangesIcon />}>
        Renew Cars Warranty
      </Button>
      <Button variant="contained" startIcon={<ListIcon />}>
        Transaction list between sums
      </Button>
      <Button variant="contained" startIcon={<DeleteIcon />}>
        Delete transactions between dates
      </Button>
    </Stack>
  );
}

export default Panel;
