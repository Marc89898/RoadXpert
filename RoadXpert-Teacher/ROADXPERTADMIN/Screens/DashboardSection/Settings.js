import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import BackNavigation from "../Navigation/BackNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 
import MainButton from "../../Components/Buttons/mainButton";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  };

  const handleAdmin = () => {
    navigation.navigate("");
  };

  const handleEditProfile = () => {
    navigation.navigate("UserProfile");
  };

  const handleDarkModeChange = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const SettingsOption = ({
    iconName = "account-edit",
    iconColor = "#333",
    text = "Ver perfil",
    onPress = () => {},
    showSwitch = false,
    switchValue = false,
    onSwitchValueChange = () => {},
  }) => (
    <View style={[styles.divContainer, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.divItem, isDarkMode && styles.darkItem]}>
          <Icon name={iconName} size={24} color={isDarkMode ? "#fff" : iconColor} />
          <Text style={[styles.divText, isDarkMode && styles.darkText]}>{text}</Text>
          {showSwitch ? (
            <Switch
              value={switchValue}
              onValueChange={onSwitchValueChange}
              thumbColor={switchValue ? "#333" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          ) : (
            <Icon name="chevron-right" size={24} color={isDarkMode ? "#fff" : "#333"} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <BackNavigation />
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <Text style={[styles.headerText, isDarkMode && styles.darkText]}>Settings</Text>

        <TouchableOpacity onPress={handleAdmin}>
          <View style={[styles.iconAdminContainer, isDarkMode && styles.darkContainer]}>
            <Text style={[styles.adminText, isDarkMode && styles.darkText]}>Admin</Text>
            <View style={[styles.iconContainer, isDarkMode && styles.darkContainer]}>
              <Icon name="account-cog" size={18} color={isDarkMode ? "#fff" : "#333"} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <SettingsOption
          iconName="account-edit"
          iconColor="#333"
          text="View Profile"
          onPress={handleEditProfile}
        />

        <SettingsOption
          iconName="brightness-6"
          iconColor="#333"
          text="Dark Mode"
          showSwitch
          switchValue={isDarkMode}
          onSwitchValueChange={handleDarkModeChange}
        />
      </View>

      <View style={styles.buttonContainer}>
        <MainButton
          style={[styles.button, isDarkMode && styles.darkButton]}
          title="LogOut"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  header: {
    paddingLeft: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkHeader: {
    backgroundColor: "#333",
  },
  headerText: {
    fontSize: 25,
  },
  darkText: {
    color: "#fff",
  },
  iconAdminContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 50,
    gap: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginRight: 24,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  adminText: {
    fontSize: 16,
    color: "#333",
  },
  divContainer: {
    marginTop: 0,
  },
  divItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  darkItem: {
    backgroundColor: "#333",
  },
  divText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginHorizontal: 16,
  },
  darkText: {
    color: "#fff",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    marginHorizontal: 24,
  },
  darkButton: {
    backgroundColor: "#333",
    color: "#fff",
  },
  settingsContainer: {
    marginTop: 24,
  },
});

export default Settings;