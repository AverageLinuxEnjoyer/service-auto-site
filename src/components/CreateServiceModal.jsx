import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { store } from 'react-notifications-component';
import { TypeOfService } from '../plugins/enums.js';
import { validateInputField } from '../plugins/validators.js'

const style = {
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
    },
    checkboxForm: {
        marginLeft: 0,
    },
    modalTitle: {
        borderBottom: '1px solid #ccc',
    },
    formContainer: {
        padding: 24,
    },
    actionButtonsWrapper: {
        borderTop: '1px solid #ccc',
    },
    createButton: {
        paddingRight: 24,
    }
};

export default function TransitionsModal({
    serviceType,
    isModalOpened,
    onCloseModal,
    createNewService
}) {
    const [carsForm, setCarsForm] = React.useState({
        model: '',
        acquisitionDate: null,
        kilometers: '',
        isWarrantyChecked: false,
    });
    const [cardsForm, setCardsForm] = React.useState({
        firstName: '',
        lastName: '',
        cnp: '',
        birthday: null,
        registrationDate: null,
    });
    const [transactionsForm, setTransactionsForm] = React.useState({
        carId: '',
        cardId: '',
        componentsPrice: '',
        dateTime: null,
        workmanship: '',
    });

    let createServiceContainer;

    function handleClose(event) {
        onCloseModal(event);
    }
    function handleCreate(event) {
        if (serviceType == TypeOfService.Cards) {
            if (!validateInputField(cardsForm.firstName) && !validateInputField(cardsForm.lastName)
                && !validateInputField(cardsForm.birthday) && !validateInputField(cardsForm.cnp)
                && !validateInputField(cardsForm.registrationDate)) {
                errorFieldsRequired()
                return;
            };
            if (cardsForm.cnp.replace(/\s/g, '').length == 13) { // Remove white spaces and check for length of string
                handleClose();
                createNewService(event, cardsForm);
            } else {
                store.addNotification({
                    title: "Important message",
                    message: "The CNP field must contain 13 digits.",
                    type: "info",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 3000,
                        onScreen: true
                    }
                });
            };
        } else if (serviceType == TypeOfService.Cars) {
            if (validateInputField(carsForm.model) && validateInputField(carsForm.kilometers)
                && validateInputField(carsForm.acquisitionDate)) {
                handleClose();
                createNewService(event, carsForm);
            } else errorFieldsRequired();
        } else if (serviceType == TypeOfService.Transactions) {
            if (validateInputField(transactionsForm.carId) && validateInputField(transactionsForm.componentsPrice)
                && validateInputField(transactionsForm.dateTime) && validateInputField(transactionsForm.workmanship)) {
                handleClose();
                createNewService(event, transactionsForm);
            } else errorFieldsRequired();
        } else {
            store.addNotification({
                title: "Creation failed",
                message: "An error occurred while creating your service.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true
                }
            });
        }
    }
    const errorFieldsRequired = () => {
        store.addNotification({
            title: "An error occurred",
            message: "All the fields in the form are required.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    };
    const handleWarrantyChange = (prop) => (event) => {
        setCarsForm({ ...carsForm, [prop]: event.target.checked })
    };
    const setCarsInputValue = (prop) => (event) => {
        setCarsForm({ ...carsForm, [prop]: event.target.value });
    };
    const setCardsInputValue = (prop) => (event) => {
        setCardsForm({ ...cardsForm, [prop]: event.target.value });
    };
    const setTransactionsInputValue = (prop) => (event) => {
        setTransactionsForm({ ...transactionsForm, [prop]: event.target.value });
    };

    if (serviceType == TypeOfService.Cars) {
        createServiceContainer = <div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-required"
                        label="Model"
                        value={carsForm.model}
                        onChange={setCarsInputValue('model')}
                    />
                </div>
                <div className="col-sm-6">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Acquisition Date"
                            value={carsForm.acquisitionDate}
                            onChange={(newValue) => {
                                setCarsForm({ ...carsForm, ['acquisitionDate']: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="Kilometers"
                        type="number"
                        value={carsForm.kilometers}
                        onChange={setCarsInputValue('kilometers')}
                    />
                </div>
                <div className="col-sm-6">
                    <FormControlLabel
                        style={style.checkboxForm}
                        label="Warranty"
                        control={
                            <Checkbox
                                checked={carsForm.isWarrantyChecked}
                                onChange={handleWarrantyChange('isWarrantyChecked')}
                                label="Warranty"
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                    />
                </div>
            </div>
        </div>;
    } else if (serviceType == TypeOfService.Cards) {
        createServiceContainer = <div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-required"
                        label="First Name"
                        value={cardsForm.firstName}
                        onChange={setCardsInputValue('firstName')}
                    />
                </div>
                <div className="col-sm-6">
                    <TextField
                        id="outlined-required"
                        label="Last Name"
                        value={cardsForm.lastName}
                        onChange={setCardsInputValue('lastName')}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="CNP"
                        type="number"
                        value={cardsForm.cnp}
                        onChange={setCardsInputValue('cnp')}
                    />
                </div>
                <div className="col-sm-6">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Birthday"
                            value={cardsForm.birthday}
                            onChange={(newValue) => {
                                setCardsForm({ ...cardsForm, ['birthday']: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Registration Date"
                            value={cardsForm.registrationDate}
                            onChange={(newValue) => {
                                setCardsForm({ ...cardsForm, ['registrationDate']: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
        </div>;
    } else {
        createServiceContainer = <div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="Car ID"
                        type="number"
                        value={transactionsForm.carId}
                        onChange={setTransactionsInputValue('carId')}
                    />
                </div>
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="Card ID"
                        type="number"
                        value={transactionsForm.cardId}
                        onChange={setTransactionsInputValue('cardId')}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="Components Price"
                        type="number"
                        value={transactionsForm.componentsPrice}
                        onChange={setTransactionsInputValue('componentsPrice')}
                    />
                </div>
                <div className="col-sm-6">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Datetime"
                            value={transactionsForm.dateTime}
                            onChange={(newValue) => {
                                setTransactionsForm({ ...transactionsForm, ['dateTime']: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <TextField
                        id="outlined-number"
                        label="Workmanship"
                        type="number"
                        value={transactionsForm.workmanship}
                        onChange={setTransactionsInputValue('workmanship')}
                    />
                </div>
            </div>
        </div>;
    }

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
                            Create {serviceType}
                            {handleClose ? (
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={{
                                        position: 'absolute',
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
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            style={style.formContainer}
                            noValidate
                            autoComplete="off"
                        >
                            {createServiceContainer}
                        </Box>
                        <DialogActions style={style.actionButtonsWrapper}>
                            <Button style={style.createButton} onClick={handleCreate}>Create</Button>
                        </DialogActions>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
    // <Typography id="transition-modal-title" variant="h6" component="h2">
    //     Text in a modal
    // </Typography>
    // <Typography id="transition-modal-description" sx={{ mt: 2 }}>
    //     {serviceType}
    // </Typography>
}