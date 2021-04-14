import { FC, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import {
  goldItems as mockGoldItems,
  silverPerPriceItems as mockSilverPerPriceItems,
  silverPerWeightItems as mockSilverPerWeightItems,
} from "./mockData";
import ItemsPanel from "./ItemsPanel";
import "./DataTable.css";

const Items = () => {
  const confirmDeleteSelected = () => {};

  const [goldItems, setGoldItems] = useState(mockGoldItems);
  const [silverPerPriceItems, setSilverPerPriceItems] = useState(
    mockSilverPerPriceItems
  );
  const [silverPerWeightItems, setSilverPerWeightItems] = useState(
    mockSilverPerWeightItems
  );

  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="Gold Items">
            <ItemsPanel items={goldItems} updateItems={setGoldItems} />
          </TabPanel>
          <TabPanel header="Silver per price items">
            <ItemsPanel
              items={silverPerPriceItems}
              updateItems={setSilverPerPriceItems}
            />
          </TabPanel>
          <TabPanel header="Silver per weight items">
            <ItemsPanel
              items={silverPerWeightItems}
              updateItems={setSilverPerWeightItems}
            />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Items;
