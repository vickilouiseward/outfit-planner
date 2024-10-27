import PhotoGallery from "@/components/PhotoGallery";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { camera } from "ionicons/icons";

const Upload: React.FC = () => {
  const { photos, takePhoto, removePhotoBackground, deletePhoto } =
    usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PhotoGallery
          photos={photos}
          removePhotoBackground={removePhotoBackground}
          deletePhoto={deletePhoto}
        />
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Upload;
