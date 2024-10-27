"use client";

import {
  IonCard,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { colorWand, trash } from "ionicons/icons";
import React from "react";

export interface Photo {
  filePath: string;
  webviewPath?: string;
  hasBg: boolean;
}

const PhotoGallery: React.FC<{
  photos: Photo[];
  removePhotoBackground: (
    fileName: string,
    onComplete: () => Promise<void>,
  ) => void;
  deletePhoto: (fileName: string) => void;
}> = ({ photos, removePhotoBackground, deletePhoto }) => {
  const [present, dismiss] = useIonLoading();
  const [displayAlert] = useIonAlert();
  const confirmRemoveBg = (fileName: string) =>
    displayAlert({
      message:
        "Are you sure you want to remove the background from this photo? ",
      buttons: [
        { text: "Cancel", role: "cancel" },
        { text: "OK", role: "confirm" },
      ],
      onDidDismiss: (e) => {
        if (e.detail.role === "cancel") {
          return;
        }
        present({
          message: "Removing background...",
        });
        removePhotoBackground(fileName, dismiss);
      },
    });
  const confirmDelete = (fileName: string) =>
    displayAlert({
      message: "Are you sure you want to delete this photo? ",
      buttons: [
        { text: "Cancel", role: "cancel" },
        { text: "OK", role: "confirm" },
      ],
      onDidDismiss: (e) => {
        if (e.detail.role === "cancel") {
          return;
        }

        deletePhoto(fileName);
      },
    });

  return (
    <IonGrid>
      <IonRow>
        {photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonCard>
              <IonFab vertical="bottom" horizontal="start">
                <IonFabButton
                  onClick={() => confirmRemoveBg(photo.filePath)}
                  size="small"
                  color="light"
                  disabled={!photo.hasBg}
                >
                  <IonIcon icon={colorWand} color="primary"></IonIcon>
                </IonFabButton>
              </IonFab>
              <IonFab vertical="bottom" horizontal="end">
                <IonFabButton
                  onClick={() => confirmDelete(photo.filePath)}
                  size="small"
                  color="light"
                >
                  <IonIcon icon={trash} color="danger"></IonIcon>
                </IonFabButton>
              </IonFab>

              <IonImg src={photo.webviewPath} />
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default PhotoGallery;
