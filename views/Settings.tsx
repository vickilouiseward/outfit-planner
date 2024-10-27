import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
} from "@ionic/react";

const Settings = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonToggle
          // checked={settings.enableNotifications}
          // onIonChange={e => {
          //   setSettings({
          //     ...settings,
          //     enableNotifications: e.target.checked,
          //   });
          // }}
          >
            Enable Notifications
          </IonToggle>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
);

export default Settings;
