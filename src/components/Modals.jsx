import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { store } from "react-notifications-component";
import { validateInputField } from "../plugins/validators.js";

const style = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
  },
  modalTitle: {
    borderBottom: "1px solid #ccc",
  },
  formContainer: {
    padding: 24,
  },
  actionButtonsWrapper: {
    borderTop: "1px solid #ccc",
  },
  createButton: {
    paddingRight: 24,
  },
};

export function CreateRandomModal({
  isModalOpened,
  onCloseModal,
  createRandom,
}) {
  const [numberOfItems, setNumberOfItems] = React.useState("");

  function handleClose(event) {
    onCloseModal(event);
  }

  const errorFieldsRequired = () => {
    store.addNotification({
      title: "An error occurred",
      message: "The field in the form is required.",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  const handleChangeInNumber = (event) => {
    setNumberOfItems(event.target.value);
  };

  const handleCreateRandom = () => {
    if (validateInputField(numberOfItems)) {
      handleClose();
      createRandom(numberOfItems);
    } else errorFieldsRequired();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpened}>
          <Box sx={style.modalBox}>
            <DialogTitle style={style.modalTitle} sx={{ m: 0, p: 2 }}>
              How many items do you want to create?
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              style={style.formContainer}
              noValidate
              autoComplete="off"
            >
              <div className="row">
                <div className="col-sm-12">
                  <TextField
                    style={{ width: "inherit", margin: 0 }}
                    id="outlined-number"
                    label="Number of items"
                    type="number"
                    value={numberOfItems}
                    onChange={handleChangeInNumber}
                  />
                </div>
              </div>
            </Box>
            <DialogActions style={style.actionButtonsWrapper}>
              <Button style={style.createButton} onClick={handleCreateRandom}>
                Create
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export function TransactionBetweenSumsModal({
  isModalOpened,
  onCloseModal,
  createTransactionBetweenSums,
}) {
  const [firstSum, setFirstSum] = React.useState("");
  const [secondSum, setSecondSum] = React.useState("");

  function handleClose(event) {
    onCloseModal(event);
  }
  const handleFirstSum = (event) => {
    setFirstSum(event.target.value);
  };

  const handleSecondSum = (event) => {
    setSecondSum(event.target.value);
  };

  const handleCreateTransactionBetweenSums = () => {
    handleClose();
    createTransactionBetweenSums(firstSum, secondSum);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpened}>
          <Box sx={style.modalBox}>
            <DialogTitle style={style.modalTitle} sx={{ m: 0, p: 2 }}>
              Transaction list between sums
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              style={style.formContainer}
              noValidate
              autoComplete="off"
            >
              <div className="row">
                <div className="col-sm-12">
                  <TextField
                    style={{
                      width: "inherit",
                      marginBottom: "20px",
                      marginLeft: 0,
                    }}
                    id="outlined-number"
                    label="Lower bound"
                    type="number"
                    value={firstSum}
                    onChange={handleFirstSum}
                  />
                </div>
                <div className="col-sm-12">
                  <TextField
                    style={{ width: "inherit", marginLeft: 0 }}
                    id="outlined-number"
                    label="Upper bound"
                    type="number"
                    value={secondSum}
                    onChange={handleSecondSum}
                  />
                </div>
              </div>
            </Box>
            <DialogActions style={style.actionButtonsWrapper}>
              <Button
                style={style.createButton}
                onClick={handleCreateTransactionBetweenSums}
              >
                Create
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export function DeleteTransactionBetweenDatesModal({
  isModalOpened,
  onCloseModal,
  deleteTransactionBetweenDates,
}) {
  const [firstDate, setFirstDate] = React.useState(null);
  const [secondDate, setSecondDate] = React.useState(null);

  function handleClose(event) {
    onCloseModal(event);
  }
  const handleFirstDate = (data) => {
    setFirstDate(data);
  };

  const handleSecondDate = (data) => {
    setSecondDate(data);
  };

  const handleCreateTransactionBetweenSums = () => {
    handleClose();
    deleteTransactionBetweenDates(firstDate, secondDate);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpened}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpened}>
          <Box sx={style.modalBox}>
            <DialogTitle style={style.modalTitle} sx={{ m: 0, p: 2 }}>
              Delete transactions between dates
              {handleClose ? (
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </DialogTitle>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              style={style.formContainer}
              noValidate
              autoComplete="off"
            >
              <div className="row">
                <div className="col-sm-6">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start date"
                      value={firstDate}
                      onChange={handleFirstDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-sm-6">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End date"
                      value={secondDate}
                      onChange={handleSecondDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </Box>
            <DialogActions style={style.actionButtonsWrapper}>
              <Button
                style={style.createButton}
                onClick={handleCreateTransactionBetweenSums}
              >
                Create
              </Button>
            </DialogActions>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
