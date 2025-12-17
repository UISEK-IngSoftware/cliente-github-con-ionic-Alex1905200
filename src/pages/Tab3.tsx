import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import "./Tab3.css";
import { useState } from "react";
import { UserInfo } from "../interfaces/UserInfo";
import { getUserInfo } from "../services/GithubService";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loadUserInfo = async () => {
    const info = await getUserInfo();
    setUserInfo(info);
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{userInfo?.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt={userInfo?.name} src={userInfo?.avatar_url} />

          <IonCardHeader>
            <IonCardTitle>{userInfo?.name}</IonCardTitle>
            <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{userInfo?.bio}</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
