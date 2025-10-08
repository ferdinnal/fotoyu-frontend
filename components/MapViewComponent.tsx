import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://fotoyu-backend-production.up.railway.app/api/locations";

export default function MapViewComponent({ onSelectMarker, onLongPress, refreshKey }: any) {
  const [region, setRegion] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required to use the map.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      setRegion(initialRegion);
      mapRef.current?.animateToRegion(initialRegion);
    })();

    fetchLocations();
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [refreshKey]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(API_URL);
      setMarkers(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const centerToUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      console.error("Error centering map:", error);
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton={false}
          onLongPress={(e) => onLongPress(e.nativeEvent.coordinate)}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => onSelectMarker(marker)}
            >
              <Image
                source={
                  marker.type === "Tree"
                    ? require("../assets/tree.png")
                    : require("../assets/spot.png")
                }
                style={{ width: 28, height: 28 }}
              />
              <Callout>
                <View style={{ width: 160 }}>
                  <Text style={styles.title}>{marker.name}</Text>
                  <Text style={styles.desc}>{marker.description}</Text>
                  {marker.photos?.length > 0 && (
                    <Image
                      source={{
                        uri: `https://fotoyu-backend-production.up.railway.app${marker.photos[0]}`,
                      }}
                      style={{
                        width: "100%",
                        height: 80,
                        borderRadius: 6,
                        marginTop: 5,
                      }}
                    />
                  )}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}

      <TouchableOpacity style={styles.gpsButton} onPress={centerToUserLocation}>
        <Ionicons name="locate-outline" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  title: { fontWeight: "bold", fontSize: 14 },
  desc: { fontSize: 12, color: "#555" },
  gpsButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});
