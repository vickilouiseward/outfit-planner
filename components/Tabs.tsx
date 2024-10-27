import Settings from "@/views/Settings";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { cog } from "ionicons/icons";
import { Route } from "react-router-dom";

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/settings" render={() => <Settings />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
