import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "vlw-outfit-planner",
  bundledWebRuntime: false,
  webDir: "out",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    CapacitorSQLite: {
      iosDatabaseLocation: "Library/CapacitorDatabase",
      iosIsEncryption: true,
      iosKeychainPrefix: "angular-sqlite-app-starter",
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for capacitor sqlite",
      },
      // androidIsEncryption: true,
      // androidBiometric: {
      //   biometricAuth: false,
      //   biometricTitle: "Biometric login for capacitor sqlite",
      //   biometricSubTitle: "Log in using your biometric",
      // },
      // electronIsEncryption: true,
      // electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
      // electronMacLocation: "/Volumes/Development_Lacie/Development/Databases",
      // electronLinuxLocation: "Databases",
    },
  },
  cordova: {},
};
