import React from "react";
import Navbar from "./components/Navbar.jsx";
import Panel from "./components/Panel.jsx";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Cards from "./pages/Cards.jsx";
import Cars from "./pages/Cars.jsx";
import Transactions from "./pages/Transactions.jsx";
import { DICK } from "./dick/insideDick/dick.js";

export default function App() {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleUndo = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/undo/",
      {
        method: "POST",
      }
    );
  };

  const handleRedo = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/redo/",
      {
        method: "POST",
      }
    );
  };

  const handleRenew = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/car/renewWarranty/",
      {
        method: "PUT",
      }
    );
    const data = await response.json();
  };

  const handleBetweenSums = async () => {
    let sum1 = prompt(`Enter the first sum`);
    let sum2 = prompt(`Enter the second sum`);

    const response = await fetch(
      `https://django-car-service-api.herokuapp.com/transaction/list/${sum1}/${sum2}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    alert(JSON.stringify(data, null, 4));
  };

  const handleCreateRandom = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    let times = prompt(`How many ${DICK} do you want to create?`);

    if (isCar) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/car/random/${times}/`,
        {
          method: "POST",
        }
      );
    } else if (isCard) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/card/random/${times}/`,
        {
          method: "POST",
        }
      );
    } else if (isTransaction) {
      const response = await fetch(
        `https://django-car-service-api.herokuapp.com/transaction/random/${times}/`,
        {
          method: "POST",
        }
      );
    }

    alert(`Created ${times} ${DICK}`);
  };

  const handleDelete = async () => {
    let isCar = selectedRows.length > 0 && !!selectedRows[0]?.model;
    let isCard = selectedRows.length > 0 && !!selectedRows[0]?.cnp;
    let isTransaction =
      selectedRows.length > 0 && !!selectedRows[0]?.workmanship;

    if (selectedRows.length) {
      selectedRows.forEach(async (row) => {
        if (isCar) {
          await fetch(
            `https://django-car-service-api.herokuapp.com/car/delete/${row.id}`,
            {
              method: "DELETE",
            }
          );
        } else if (isCard) {
          await fetch(
            `https://django-car-service-api.herokuapp.com/card/delete/${row.id}`,
            {
              method: "DELETE",
            }
          );
        } else if (isTransaction) {
          await fetch(
            `https://django-car-service-api.herokuapp.com/transaction/delete/${row.id}`,
            {
              method: "DELETE",
            }
          );
        }
      });
    }

    // const response = await fetch(
    //   "https://django-car-service-api.herokuapp.com/card/delete"
    // );
    // const data = await response.json();
    // console.log(data);
  };

  return (
    <Router>
      <Navbar
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        setSelectedRows={setSelectedRows}
      />
      <Panel
        handleDelete={handleDelete}
        handleCreateRandom={handleCreateRandom}
        handleRenew={handleRenew}
        handleBetweenSums={handleBetweenSums}
      />
      <Routes>
        <Route
          path="cars"
          element={
            <Cars
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          }
        />
        <Route
          path="cards"
          element={
            <Cards
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          }
        />
        <Route
          path="transactions"
          element={
            <Transactions
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          }
        />
      </Routes>
    </Router>
  );
}
