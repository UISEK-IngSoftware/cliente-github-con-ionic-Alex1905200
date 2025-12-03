import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonInput, IonTextarea } from "@ionic/react";
import "./Tab2.css";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario del Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario del Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            className="form-field"
          ></IonInput>
          <IonTextarea
            label="Descripcion del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            className="form-field"
            rows={6}
          ></IonTextarea>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
