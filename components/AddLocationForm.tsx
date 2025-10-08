import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = "https://fotoyu-backend-production.up.railway.app/api/locations";

export default function AddLocationForm({ coords, onClose, onSuccess }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"Tree" | "Spot">("Tree");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your gallery!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!name || !description || !coords) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("latitude", coords.latitude.toString());
    formData.append("longitude", coords.longitude.toString());
    formData.append("type", type);

    if (image) {
      const filename = image.split("/").pop();
      formData.append("photo", {
        uri: image,
        name: filename,
        type: "image/jpeg",
      } as any);
    }

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Success", "Location added successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error uploading location:", error);
      Alert.alert("Error", "Failed to upload location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Add New Location</Text>
          <ScrollView>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              style={[styles.input, { height: 70 }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.typeContainer}>
              {["Tree", "Spot"].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeButton, type === t && styles.typeSelected]}
                  onPress={() => setType(t as any)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      type === t && { color: "#fff", fontWeight: "bold" },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
              <Text style={{ color: "#333" }}>
                {image ? "Change Photo" : "Pick Photo"}
              </Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 180, borderRadius: 8, marginVertical: 10 }}
              />
            )}

            <TouchableOpacity
              style={[styles.submitButton, loading && { opacity: 0.5 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {loading ? "Uploading..." : "Add Location"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={{ color: "#555" }}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 8,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  typeContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
  typeSelected: { backgroundColor: "#007AFF" },
  typeText: { color: "#007AFF" },
  imageButton: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#007AFF",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  cancelButton: { alignItems: "center", marginTop: 10 },
});
