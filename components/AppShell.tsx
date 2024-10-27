"use client";

import Tabs from "./Tabs";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

// import { CapacitorSQLite } from "@capacitor-community/sqlite";

// // async function initializeSQLite() {
// //   const sqlitePlugin = await CapacitorSQLite.initWebStore();
// //   // You can now use the SQLite plugin methods
// // }

// // initializeSQLite();

setupIonicReact({});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", async (status) => {
    try {
      await StatusBar.setStyle({
        style: status.matches ? Style.Dark : Style.Light,
      });
    } catch {}
  });

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/" render={() => <Tabs />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
