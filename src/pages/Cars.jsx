import React from "react";
import Table from "../components/Table.jsx";

export default function Cars({ selectedRows, setSelectedRows }) {
  const [cars, setCars] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://django-car-service-api.herokuapp.com/car/list"
      );
      const data = await response.json();
      console.log(data);
      setCars(data);
    })();
  }, []);

  if (cars.length === 0) return <p>Loading cars...</p>;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "acquisition_date", headerName: "Acquisition date", width: 130 },
    { field: "kilometers", headerName: "Kilometers", width: 90 },
    { field: "warranty", headerName: "Warranty", width: 90 },
    { field: "total_workmanship", headerName: "Total workmanship", width: 90 },
  ];

  return (
    <Table
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      rows={cars}
      columns={columns}
    />
  );
}

//
//
