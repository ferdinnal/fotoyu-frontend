import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import MapViewComponent from "./components/MapViewComponent";
import MarkerDetailModal from "./components/MarkerDetailModal";
import AddLocationForm from "./components/AddLocationForm";

export default function App() {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [newCoords, setNewCoords] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setNewCoords(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <MapViewComponent
        onSelectMarker={setSelectedMarker}
        onLongPress={setNewCoords}
        refreshKey={refreshKey}
      />

      {selectedMarker && (
        <MarkerDetailModal
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
        />
      )}

      {newCoords && (
        <AddLocationForm
          coords={newCoords}
          onClose={() => setNewCoords(null)}
          onSuccess={handleAddSuccess}
        />
      )}
    </SafeAreaView>
  );
}
