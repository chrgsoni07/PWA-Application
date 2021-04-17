import { useState, useEffect } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import {
  goldItems as mockGoldItems,
  silverPerPriceItems as mockSilverPerPriceItems,
  silverPerWeightItems as mockSilverPerWeightItems,
} from "./mockData";
import ItemsPanel from "./ItemsPanel";
import "./DataTable.css";
import { db } from "../../firebase";
import { ItemType } from "./types";

const Items = () => {
  const confirmDeleteSelected = () => {};

  const [goldItems, setGoldItems] = useState<ItemType[]>([]);
  const [silverPerPriceItems, setSilverPerPriceItems] = useState(
    mockSilverPerPriceItems
  );
  const [silverPerWeightItems, setSilverPerWeightItems] = useState(
    mockSilverPerWeightItems
  );

  useEffect(() => {
    var goldItemCollection = db.collection("goldItems");

    goldItemCollection.get().then((querySnapshot) => {
      querySnapshot.forEach((goldItem) => {
        console.log(goldItem.id);
        var goldItemDetail = goldItem.data();
        console.log(JSON.stringify(goldItemDetail));
        setGoldItems([
          ...goldItems,
          { name: goldItemDetail.name, id: goldItem.id },
        ]);
      });
    });
  }, []);

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
