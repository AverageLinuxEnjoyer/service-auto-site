import React from "react";
import Navbar from "./components/Navbar.jsx";
import Panel from "./components/Panel.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Cards from "./pages/Cards.jsx";
import Cars from "./pages/Cars.jsx";
import Transactions from "./pages/Transactions.jsx";

export default function App() {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleDeleteTransaction = async () => {
    const firstDate = prompt("Enter first date");
    const secondDate = prompt("Enter second");

    const response = await fetch(
      `https://django-car-service-api.herokuapp.com/transaction/delete/${firstDate}/${secondDate}/`,
      {
        method: "DELETE",
      }
    );
    const obj = await response.json();

    alert("Transactions deleted");

    window.location.reload();
  };

  const handleCreate = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    if (isCar) {
      let model = prompt("Enter model");
      let acquisition_date = prompt("Enter acquisition_date");
      let kilometers = prompt("Enter kilometers");
      let warranty = prompt("Enter warranty");
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/car/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            acquisition_date: new Date(String(acquisition_date)).toISOString(),
            kilometers,
            warranty: warranty === "true",
          }),
        }
      );
      const data = await response.json();

      alert("Car created");
    } else if (isTransaction) {
      let car = prompt("Enter car");
      let card = prompt("Enter card");
      let components_price = prompt("Enter components_price");
      let datetime = prompt("Enter datetime");
      let workmanship = prompt("Enter workmanship");
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/transaction/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            car,
            card,
            components_price,
            workmanship,
            datetime: new Date(String(datetime)).toISOString(),
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Transacion created");
    } else if (isCard) {
      let first_name = prompt("Enter first_name");
      let last_name = prompt("Enter last_name");
      let cnp = prompt("Enter cnp");
      let birthday = prompt("Enter birthday");
      let registration_date = prompt("Enter registration_date");

      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/card/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            cnp,
            birthday,
            registration_date,
          }),
        }
      );
      const data = await response.json();
      alert("Card created");
    }
    window.location.reload();
  };

  const handleUndo = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/undo/",
      {
        method: "POST",
      }
    );
    window.location.reload();
  };

  const handleRedo = async () => {
    const response = await fetch(
      "https://django-car-service-api.herokuapp.com/redo/",
      {
        method: "POST",
      }
    );
    window.location.reload();
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

    window.location.reload();
  };

  const handleCreateRandom = async () => {
    let isCar = window.location.pathname.includes("cars");
    let isTransaction = window.location.pathname.includes("transactions");
    let isCard = window.location.pathname.includes("cards");

    let times = prompt(`How many items do you want to create?`);

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

    alert(`Created ${times} items`);

    window.location.reload();
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

    window.location.reload();

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
        handleCreate={handleCreate}
        handleDeleteTransaction={handleDeleteTransaction}
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
