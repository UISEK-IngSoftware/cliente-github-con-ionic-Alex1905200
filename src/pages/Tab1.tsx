import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Tab1.css";
import RepoItem from "../components/RepoItem";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <RepoItem
            name="android-project"
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/1022px-Android_robot.svg.png"
          />

          <RepoItem
            name="iOS-project"
            imageUrl="https://e7.pngegg.com/pngimages/980/413/png-clipart-apple-logo-business-iphone-apple-heart-computer.png"
          />

          <RepoItem
            name="Ionic-project"
            imageUrl="https://e7.pngegg.com/pngimages/426/603/png-clipart-ionic-new-logo-tech-companies.png"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
