export interface PerfectionRet {
  numObelisks: number;
  goldenClock: boolean;
}

export const parsePerfection = (SaveGame: any): PerfectionRet => {
  let numObelisks = 0;
  let goldenClock = false;
  // StardewValley.Utitility.cs::numObelisksOnFarm()
  const obelisks = new Set([
    "Water Obelisk",
    "Earth Obelisk",
    "Desert Obelisk",
    "Island Obelisk",
  ]);

  try {
    // loop through every building looking for obelisks and golden clock
    // shared between all players on the farm

    // For now, we'll only look in the GameLocation named "Farm", if this is wrong, we'll fix it later
    for (const location of SaveGame.locations.GameLocation) {
      if (!(location["@_xsi:type"] === "Farm")) continue;

      // by default, there should be two buildings (shipping bin and greenhouse)
      for (const building of location.buildings.Building) {
        if (obelisks.has(building.buildingType)) {
          // check if building is done being built
          if (building.daysOfConstructionLeft <= 0) numObelisks++;
        } else if (building.buildingType === "Gold Clock") {
          // check if building is done being built
          if (building.daysOfConstructionLeft <= 0) goldenClock = true;
        }
      }

      return { numObelisks, goldenClock };
    }
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Error in parsePerfection(): ${err.message}`);
    throw new Error(`Error in parsePerfection(): ${err}`);
  }

  return { numObelisks, goldenClock };
};