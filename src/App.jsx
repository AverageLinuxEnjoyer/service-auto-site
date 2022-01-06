/* eslint-disable import/first */
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Panel from "./components/Panel.jsx";
import CreateServiceModal from "./components/CreateServiceModal.jsx";
import EditServiceModal from "./components/EditServiceModal.jsx";
import {
  CreateRandomModal,
  TransactionBetweenSumsModal,
  DeleteTransactionBetweenDatesModal,
} from "./components/Modals.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Cards from "./pages/Cards.jsx";
import Cars from "./pages/Cars.jsx";
import Transactions from "./pages/Transactions.jsx";
import { TypeOfService } from "./plugins/enums.js";
import { store } from "react-notifications-component";

export default function App() {
  const moment = require("moment");
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchResultsForCars, setSearchResultsForCars] = React.useState([]);
  const [searchResultsForCards, setSearchResultsForCards] = React.useState([]);
  const [serviceType, setServiceType] = React.useState("");
  const [createModalIsOpen, setIsCreateModalOpen] = React.useState(false);
  const [editModalIsOpen, setIsEditModalOpen] = React.useState(false);
  const [createRandomModalIsOpen, setIsCreateRandomModalOpen] =
    React.useState(false);
  const [
    createTransactionBetweenSumsModalIsOpen,
    setIsCreateTransactionBetweenSumsModalOpen,
  ] = React.useState(false);
  const [transactionsBetweenSums, setTransactionBetweenSums] = React.useState(
    []
  );

  const [
    deleteTransactionBetweenDatesModalIsOpen,
    setIsDeleteTransactionBetweenDatesModalOpen,
  ] = React.useState(false);

  function openCreationModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreationModal() {
    setIsCreateModalOpen(false);
  }

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  function openCreateRandomModal() {
    setIsCreateRandomModalOpen(true);
  }

  function handleCloseCreateRandomModal() {
    setIsCreateRandomModalOpen(false);
  }

  const handleDeleteTransaction = async (firstDate, secondDate) => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    const response = await fetch(
      `https://django-car-service-api.herokuapp.com/transaction/delete/${moment(
        firstDate
      ).format("YYYY-MM-DD")}/${moment(secondDate).format("YYYY-MM-DD")}/`,
      {
        method: "DELETE",
      }
    );
    const obj = await response.json();

    window.location.reload();
  };

  const handleUpdate = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    if (isCar || isTransaction || isCard) {
      // Open a modal only if you're on one of these pages
      openEditModal();
    }

    if (isCar) {
      setServiceType(TypeOfService.Cars);
    } else if (isTransaction) {
      setServiceType(TypeOfService.Transactions);
    } else if (isCard) {
      setServiceType(TypeOfService.Cards);
    }
  };

  const handleCreate = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    if (isCar || isTransaction || isCard) {
      // Open a modal only if you're on one of these pages
      openCreationModal();
    }

    if (isCar) {
      setServiceType(TypeOfService.Cars);
    } else if (isTransaction) {
      setServiceType(TypeOfService.Transactions);
    } else if (isCard) {
      setServiceType(TypeOfService.Cards);
    }
  };

  const createNewService = async (event, model) => {
    if (serviceType == TypeOfService.Cars) {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/car/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model.model,
            acquisition_date: moment(model.acquisitionDate).format(
              "YYYY-MM-DD"
            ),
            kilometers: model.kilometers,
            warranty: model.isWarrantyChecked,
          }),
        }
      );
      const data = await response.json();
      successMessageForCreation("car");
    } else if (serviceType == TypeOfService.Cards) {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/card/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: model.firstName,
            last_name: model.lastName,
            cnp: model.cnp,
            birthday: moment(model.birthday).format("YYYY-MM-DD"),
            registration_date: moment(model.registrationDate).format(
              "YYYY-MM-DD"
            ),
          }),
        }
      );
      const data = await response.json();
      successMessageForCreation("card");
    } else {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/transaction/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car: model.carId,
            card: model.cardId,
            components_price: model.componentsPrice,
            workmanship: model.workmanship,
            datetime: moment(model.dateTime).format("YYYY-MM-DD"),
          }),
        }
      );
      const data = await response.json();
      successMessageForCreation("transaction");
    }
  };

  const successMessageForCreation = (typeCreated) => {
    store.addNotification({
      title: "Congratulations!",
      message: `Your ${typeCreated} entry has been created successfully.`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true,
      },
      onRemoval: () => {
        window.location.reload();
      },
    });
  };

  const editService = async (event, model) => {
    if (serviceType == TypeOfService.Cars) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/car/update/${selectedRows[0].id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model.model,
            acquisition_date: moment(model.acquisitionDate).format(
              "YYYY-MM-DD"
            ),
            kilometers: model.kilometers,
            warranty: model.isWarrantyChecked,
          }),
        }
      );
      const data = await response.json();

      alert("Car updated");
    } else if (serviceType == TypeOfService.Cards) {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/card/update/" +
          selectedRows[0].id +
          "/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: model.firstName,
            last_name: model.lastName,
            cnp: model.cnp,
            birthday: moment(model.birthday).format("YYYY-MM-DD"),
            registration_date: moment(model.registrationDate).format(
              "YYYY-MM-DD"
            ),
          }),
        }
      );
      const data = await response.json();
      alert("Card upated");
    } else {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/transaction/update/${selectedRows[0].id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car: model.carId,
            card: model.cardId,
            components_price: model.componentsPrice,
            workmanship: model.workmanship,
            datetime: moment(model.dateTime).format("YYYY-MM-DD"),
          }),
        }
      );
      const data = await response.json();
      alert("Transaction updated");
    }
    window.location.reload();
  };

  const handleUndo = async () => {
    fetch("https://django-car-service-api.herokuapp.com/undo/", {
      method: "POST",
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 50);
    });
  };

  const handleRedo = async () => {
    fetch("https://django-car-service-api.herokuapp.com/redo/", {
      method: "POST",
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 50);
    });
  };

  const handleRenew = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/car/renewWarranty/",
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    window.location.reload();
  };

  const handleBetweenSums = async (firstSum, secondSum) => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    const response = await fetch(
      `https://django-car-service-api.herokuapp.com/transaction/list/${firstSum}/${secondSum}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    console.log(JSON.stringify(data, null, 4));

    setTransactionBetweenSums(data);

    // window.location.reload();
  };

  const handleCreateRandom = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    if (isCar || isTransaction || isCard) {
      // Open a modal only if you're on one of these pages
      openCreateRandomModal();
    }

    if (isCar) {
      setServiceType(TypeOfService.Cars);
    } else if (isCard) {
      setServiceType(TypeOfService.Cards);
    } else if (isTransaction) {
      setServiceType(TypeOfService.Transactions);
    }
  };

  const createRandomService = async (numberOfItems) => {
    if (serviceType == TypeOfService.Cars) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/car/random/${numberOfItems}/`,
        {
          method: "POST",
        }
      );
    } else if (serviceType == TypeOfService.Cards) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/card/random/${numberOfItems}/`,
        {
          method: "POST",
        }
      );
    } else if (serviceType == TypeOfService.Transactions) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/transaction/random/${numberOfItems}/`,
        {
          method: "POST",
        }
      );
    }

    alert(`Created ${numberOfItems} items`);

    window.location.reload();
  };

  const handleDelete = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    selectedRows.forEach(async (row) => {
      if (isCar) {
        await fetch(
          `https://django-car-service-api.herokuapp.com/car/delete/${row.id}/`,
          {
            method: "DELETE",
          }
        );
      } else if (isCard) {
        await fetch(
          `https://django-car-service-api.herokuapp.com/card/delete/${row.id}/`,
          {
            method: "DELETE",
          }
        );
      } else if (isTransaction) {
        await fetch(
          `https://django-car-service-api.herokuapp.com/transaction/delete/${row.id}/`,
          {
            method: "DELETE",
          }
        );
      }
    });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div>
      <Router>
        <Navbar
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          setSelectedRows={setSelectedRows}
          setSearchResultsForCars={setSearchResultsForCars}
          setSearchResultsForCards={setSearchResultsForCards}
          setTransactionBetweenSums={setTransactionBetweenSums}
        />
        <Panel
          handleDelete={handleDelete}
          handleCreateRandom={handleCreateRandom}
          handleRenew={handleRenew}
          handleCreate={handleCreate}
          handleDeleteTransaction={handleDeleteTransaction}
          handleBetweenSums={handleBetweenSums}
          handleUpdate={handleUpdate}
          selectedRows={selectedRows}
          setIsDeleteTransactionBetweenDatesModalOpen={
            setIsDeleteTransactionBetweenDatesModalOpen
          }
          setIsCreateTransactionBetweenSumsModalOpen={
            setIsCreateTransactionBetweenSumsModalOpen
          }
        />
        <Routes>
          <Route
            path="cars"
            element={
              <Cars
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                searchResultsForCars={searchResultsForCars}
              />
            }
          />
          <Route
            path="cards"
            element={
              <Cards
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                searchResultsForCards={searchResultsForCards}
              />
            }
          />
          <Route
            path="transactions"
            element={
              <Transactions
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                transactionsBetweenSums={transactionsBetweenSums}
              />
            }
          />
          <Route
            path="search"
            element={
              <div>
                <Cars
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  searchResultsForCars={searchResultsForCars}
                />
                <Cards
                  selectedRows={selectedRows}
                  setSelectedRows={setSelectedRows}
                  searchResultsForCards={searchResultsForCards}
                />
              </div>
            }
          />
        </Routes>
      </Router>
      <CreateServiceModal
        isModalOpened={createModalIsOpen}
        onCloseModal={handleCloseCreationModal}
        serviceType={serviceType}
        createNewService={createNewService}
      />
      <EditServiceModal
        isModalOpened={editModalIsOpen}
        onCloseModal={handleCloseEditModal}
        serviceType={serviceType}
        editService={editService}
        selectedRows={selectedRows}
      />
      <CreateRandomModal
        isModalOpened={createRandomModalIsOpen}
        onCloseModal={handleCloseCreateRandomModal}
        createRandom={createRandomService}
      />
      <TransactionBetweenSumsModal
        isModalOpened={createTransactionBetweenSumsModalIsOpen}
        onCloseModal={() => setIsCreateTransactionBetweenSumsModalOpen(false)}
        createTransactionBetweenSums={handleBetweenSums}
      />
      <DeleteTransactionBetweenDatesModal
        isModalOpened={deleteTransactionBetweenDatesModalIsOpen}
        onCloseModal={() => setIsDeleteTransactionBetweenDatesModalOpen(false)}
        deleteTransactionBetweenDates={handleDeleteTransaction}
      />
    </div>
  );
}
