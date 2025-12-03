import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import "./Tab3.css";

const Tab3: React.FC = () => {
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
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKhv2fM6YMIO_wHUwO2kY6Pjh4t7L4_OzpA&s"
          />
          <IonCardHeader>
            <IonCardTitle>Alexander Montero</IonCardTitle>
            <IonCardSubtitle>alexandermontero</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Soy un desarrollador junior de software
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
