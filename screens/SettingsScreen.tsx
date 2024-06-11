import React, { useState } from "react";
import {
	View,
	Text,
	Switch,
	StyleSheet,
	Button,
	TextInput,
	ScrollView,
	Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const SettingsScreen: React.FC = () => {
	const [notificationsEnabled, setNotificationsEnabled] = useState(false);
	const [userName, setUserName] = useState("");
	const [theme, setTheme] = useState("light");
	const [dataSaverMode, setDataSaverMode] = useState(false);
	const [privacyOption, setPrivacyOption] = useState("public");
	const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
		useState(false);
	const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
	const [language, setLanguage] = useState("english");

	const saveSettings = () => {
		Alert.alert(
			"Settings Saved",
			"Your settings have been successfully saved."
		);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Settings</Text>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Enable Notifications</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
					onValueChange={setNotificationsEnabled}
					value={notificationsEnabled}
				/>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Enable Email Notifications</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={emailNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
					onValueChange={setEmailNotificationsEnabled}
					value={emailNotificationsEnabled}
				/>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Enable Sound Effects</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={soundEffectsEnabled ? "#f5dd4b" : "#f4f3f4"}
					onValueChange={setSoundEffectsEnabled}
					value={soundEffectsEnabled}
				/>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Username</Text>
				<TextInput
					style={styles.input}
					onChangeText={setUserName}
					value={userName}
					placeholder="Enter your username"
				/>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Theme</Text>
				<Picker
					selectedValue={theme}
					style={styles.picker}
					onValueChange={(itemValue) => setTheme(itemValue)}
					itemStyle={{ height: 120 }}
				>
					<Picker.Item label="Light" value="light" />
					<Picker.Item label="Dark" value="dark" />
				</Picker>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>App Language</Text>
				<Picker
					selectedValue={language}
					style={styles.picker}
					onValueChange={(itemValue) => setLanguage(itemValue)}
					itemStyle={{ height: 120 }}
				>
					<Picker.Item label="English" value="english" />
					<Picker.Item label="Spanish" value="spanish" />
					<Picker.Item label="French" value="french" />
					<Picker.Item label="German" value="german" />
				</Picker>
			</View>

			<View style={styles.setting}>
				<Text style={styles.settingTitle}>Data Saver Mode</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={dataSaverMode ? "#f5dd4b" : "#f4f3f4"}
					onValueChange={setDataSaverMode}
					value={dataSaverMode}
				/>
			</View>

			<View style={styles.lastSetting}>
				<Text style={styles.settingTitle}>Privacy Option</Text>
				<Picker
					selectedValue={privacyOption}
					style={styles.picker}
					onValueChange={(itemValue) => setPrivacyOption(itemValue)}
					itemStyle={{ height: 120 }}
				>
					<Picker.Item label="Public" value="public" />
					<Picker.Item label="Private" value="private" />
					<Picker.Item label="Friends Only" value="friends" />
				</Picker>
			</View>

			<Button title="Save Settings" onPress={saveSettings} />
		</ScrollView>
	);
};

const item = {
	flexDirection: "row",
	justifyContent: "space-between",
	width: "100%",
	alignItems: "center",
	marginRight: 10,
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	setting: {
		paddingBottom: 80,
		...(item as any),
	},
	lastSetting: {
		paddingBottom: 20,
		...(item as any),
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		flex: 1,
		padding: 10,
		marginLeft: 30,
		borderRadius: 8,
		fontSize: 16,
	},
	picker: {
		width: 150,
	},
	settingTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default SettingsScreen;
