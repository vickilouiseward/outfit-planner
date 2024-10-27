import { Photo } from "@/components/PhotoGallery";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo as CameraPhoto,
} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { removeBackground } from "@imgly/background-removal";
import { isPlatform } from "@ionic/react";
import { useState, useEffect } from "react";

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };

    reader.readAsDataURL(blob);
  });
}

async function base64FromBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("method did not return a string");
      }
    };

    reader.readAsDataURL(blob);
  });
}

const PHOTOS_PREF_KEY = "photos";

export const usePhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
      const photosInPreferences: Photo[] = value ? JSON.parse(value) : [];

      if (!isPlatform("hybrid")) {
        for (let photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filePath,
            directory: Directory.Data,
          });

          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }

      setPhotos(photosInPreferences);
    };

    loadSaved();
  }, []);

  useEffect(() => {
    Preferences.set({ key: PHOTOS_PREF_KEY, value: JSON.stringify(photos) });
  }, [photos]);

  const savePhoto = async (
    photo: CameraPhoto,
    fileName: string,
  ): Promise<Photo> => {
    let base64Data: string | Blob;

    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      return {
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        hasBg: true,
      };
    }

    return {
      filePath: fileName,
      webviewPath: photo.webPath,
      hasBg: true,
    };
  };

  const takePhoto = async () => {
    try {
      const photo: CameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      const fileName = new Date().getTime() + ".png";
      const savedFileImage = await savePhoto(photo, fileName);
      console.log(savedFileImage);

      const newPhotos = [...photos, savedFileImage];
      setPhotos(newPhotos);
    } catch (e) {
      return;
    }
  };

  const removePhotoBackground = async (
    fileName: string,
    onComplete: () => Promise<void>,
  ) => {
    const photo = photos.find((photo) => photo.filePath === fileName);
    if (photo?.webviewPath) {
      const withoutBg = await removeBackground(photo.webviewPath);
      const base64Data = await base64FromBlob(withoutBg);
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      setPhotos(
        photos.map((photo) => {
          if (photo.filePath === fileName) {
            if (isPlatform("hybrid")) {
              return {
                filePath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
                hasBg: false,
              };
            }

            return {
              filePath: fileName,
              webviewPath: base64Data,
              hasBg: false,
            };
          }

          return photo;
        }),
      );

      onComplete();
    }
  };

  const deletePhoto = async (fileName: string) => {
    setPhotos(photos.filter((photo) => photo.filePath !== fileName));
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data,
    });
  };

  return {
    photos,
    takePhoto,
    removePhotoBackground,
    deletePhoto,
  };
};
