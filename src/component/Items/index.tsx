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
          <TabPanel header="Silver Items">
            <ItemsPanel category="silverItems" />
          </TabPanel>
          <TabPanel header="Fixed Price Items">
            <ItemsPanel category="fixed" />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;
