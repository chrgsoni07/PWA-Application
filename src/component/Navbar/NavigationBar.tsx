import { useHistory } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/components/menuitem/MenuItem";

const NavigationBar = () => {
  const history = useHistory();
  const items: MenuItem[] | undefined = [
    { label: "Item", command: () => history.push("/items") },
    { label: "Customers", command: () => history.push("/customers") },
    { label: "Bills", command: () => history.push("/") },
    { label: "Gold/Silver Rate", command: () => history.push("/rates") },
  ];
  return (
    <Menubar
      start={
        <span
          style={{
            display: "inline-block",
            paddingTop: ".3125rem",
            paddingBottom: ".3125rem",
            marginRight: "1rem",
            fontSize: "1.25rem",
            lineHeight: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          R K Jewellers
        </span>
      }
      model={items}
    />
  );
};

export default NavigationBar;
