export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            src={params.row.image}
            alt={params.row.title}
            className="cellImg"
          />
          {params.row.title}
        </div>
      );
    },
  },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "Stock",
    headerName: "Stock",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStock ${params.row.Stock}`}>
          {params.row.Stock}
        </div>
      );
    },
  },
];

export const rows = [
  {
    id: 1,
    Title: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Stock: "active",
    Price: "M",
  },
  {
    id: 2,
    Title: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "S",
    Stock: "passive",
  },
  {
    id: 3,
    Title: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "M",
    Stock: "pending",
  },
  {
    id: 4,
    Title: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "M",
    Stock: "active",
  },
  {
    id: 5,
    Title: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "M",
    Stock: "passive",
  },
  {
    id: 6,
    Title: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "S",
    Stock: "active",
  },
  {
    id: 7,
    Title: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "L",
    Stock: "passive",
  },
  {
    id: 8,
    Title: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "S",
    Stock: "active",
  },
  {
    id: 9,
    Title: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "M",
    Stock: "pending",
  },
  {
    id: 10,
    Title: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    Price: "S",
    Stock: "active",
  },
];
