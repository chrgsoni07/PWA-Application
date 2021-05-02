import { TabView, TabPanel } from "primereact/tabview";

import ItemsPanel from "./ItemsPanel";

const Items = () => {
  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="Gold Items">
            <ItemsPanel category="goldItems" />
          </TabPanel>
          <TabPanel header="Silver per price items">
            <ItemsPanel category="silverPerPriceItems" />
          </TabPanel>
          <TabPanel header="Silver per weight items">
            <ItemsPanel category="silverPerWeightItems" />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;
