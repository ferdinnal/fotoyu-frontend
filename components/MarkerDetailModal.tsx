import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const MarkerDetailModal = ({ marker, onClose }: any) => {
  if (!marker) return null;

  return (
    <Modal visible={!!marker} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{marker.name}</Text>
          <Text style={styles.subtitle}>{marker.description}</Text>
          <Text style={styles.type}>Type: {marker.type}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {marker.photos?.map((photo: string, index: number) => (
              <Image
                key={index}
                source={{
                  uri: `https://fotoyu-backend-production.up.railway.app${photo}`,
                }}
                style={styles.image}
              />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MarkerDetailModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 14, marginBottom: 5 },
  type: { fontSize: 12, color: "#777", marginBottom: 10 },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  closeBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
