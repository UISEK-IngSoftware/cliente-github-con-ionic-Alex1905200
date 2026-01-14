import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import "./RepoItem.css";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { createOutline, trashOutline } from "ionicons/icons";

const RepoItem: React.FC<{
  repo: RepositoryItem;
  onEdit?: (repo: RepositoryItem) => void;
  onDelete?: (repo: RepositoryItem) => void;
}> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      {/* Contenido principal */}
      <IonItem>
        <IonThumbnail slot="start">
          <img
            src={
              repo.imageUrl ||
              "https://ionicframework.com/docs/demos/api/list/avatar-finn.png"
            }
            alt={repo.name}
          />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje: {repo.language}</p>
        </IonLabel>
      </IonItem>

      {/* Opciones al final */}
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => onEdit && onEdit(repo)}>
          <IonIcon icon={createOutline} slot="start" />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => onDelete && onDelete(repo)}
        >
          <IonIcon icon={trashOutline} slot="start" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
