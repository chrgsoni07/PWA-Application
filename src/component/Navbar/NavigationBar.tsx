import Navbar from "react-bootstrap/Navbar";
import { Link, useHistory } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/components/menuitem/MenuItem";

const NavigationBar = () => {
  const history = useHistory();
  const items: MenuItem[] | undefined = [
    { label: "Item", command: () => history.push("/") },
    { label: "Customers", command: () => history.push("/customers") },
    { label: "Bills", command: () => history.push("/bills") },
    { label: "Gold/Silver Rate", command: () => history.push("/rates") },
  ];
  return (
    <Menubar start={<Navbar.Brand>R K Jewellers</Navbar.Brand>} model={items} />
  );
};

export default NavigationBar;
