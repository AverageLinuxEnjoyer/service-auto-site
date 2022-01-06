import React from "react";
import useDeepCompareEffect from 'use-deep-compare-effect'
import Table from "../components/Table.jsx";

export default function Cards({ selectedRows, setSelectedRows, searchResultsForCards }) {
  const [cards, setCards] = React.useState([]);

  const listCards = async () => {
    (async () => {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/card/list"
      );
      const data = await response.json();
      setCards(data);
    })();
  }

  React.useEffect(() => {
    if (searchResultsForCards.length == 0) {
      listCards();
    } else {
      setCards(searchResultsForCards);
    }
  }, []);

  useDeepCompareEffect( // Gets invoked when you use the search
    () => {
      if (searchResultsForCards.length == 0) {
        listCards();
      } else {
        setCards(searchResultsForCards);
      }
    },
    [searchResultsForCards],
  )


  if (cards.length === 0) return <p>Loading cards...</p>;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First name", width: 130 },
    { field: "last_name", headerName: "Last name", width: 130 },
    { field: "cnp", headerName: "CNP", width: 90 },
    { field: "birthday", headerName: "Birthday", width: 90 },
    { field: "registration_date", headerName: "Registration date", width: 90 },
    { field: "total_discounts", headerName: "Total Discounts", width: 90 },
  ];

  return (
    <Table
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      rows={cards}
      columns={columns}
    />
  );
}
