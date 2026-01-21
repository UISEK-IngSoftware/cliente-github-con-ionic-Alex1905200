import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  // ⬇️ NUEVOS IMPORTS
  IonAlert,
  IonModal,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonLoading,
  // ⬆️ NUEVOS IMPORTS
} from "@ionic/react";
import React, { useState } from "react";

import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import {
  fetchRepositories,
  updateRepository, // ⬅️ NUEVO IMPORT
  deleteRepository, // ⬅️ NUEVO IMPORT
} from "../services/GithubService";

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<RepositoryItem[]>([]);

  // ⬇️ NUEVOS ESTADOS
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);
  const [editDescription, setEditDescription] = useState("");
  // ⬆️ NUEVOS ESTADOS

  const loadRepos = async () => {
    setLoading(true); // ⬅️ MODIFICADO
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false); // ⬅️ MODIFICADO
  };

  useIonViewDidEnter(() => {
    console.log("IonViewDidEnter - Cargando repositorios");
    loadRepos();
  });

  // ⬇️ NUEVAS FUNCIONES
  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setEditDescription(repo.description || "");
    setShowEditModal(true);
  };

  const handleDelete = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (selectedRepo?.owner) {
      setLoading(true);
      try {
        await deleteRepository(selectedRepo.owner, selectedRepo.name);
        // Eliminar el repositorio localmente sin recargar toda la lista
        setRepos((prevRepos) =>
          prevRepos.filter(
            (repo) =>
              !(
                repo.name === selectedRepo.name &&
                repo.owner === selectedRepo.owner
              ),
          ),
        );
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
      setLoading(false);
    }
    setShowDeleteAlert(false);
  };

  const confirmEdit = async () => {
    if (selectedRepo?.owner) {
      setLoading(true);
      try {
        await updateRepository(
          selectedRepo.owner,
          selectedRepo.name,
          editDescription,
        );
        // Actualizar el repositorio localmente sin recargar toda la lista
        setRepos((prevRepos) =>
          prevRepos.map((repo) =>
            repo.name === selectedRepo.name && repo.owner === selectedRepo.owner
              ? { ...repo, description: editDescription }
              : repo,
          ),
        );
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
      setLoading(false);
    }
    setShowEditModal(false);
  };
  // ⬆️ NUEVAS FUNCIONES

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

        {/* ⬇️ NUEVO */}
        <IonLoading isOpen={loading} message="Procesando..." />
        {/* ⬆️ NUEVO */}

        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo={repo}
              onEdit={handleEdit} // ⬅️ NUEVO
              onDelete={handleDelete} // ⬅️ NUEVO
            />
          ))}
        </IonList>

        {/* ⬇️ NUEVO - Alert de eliminación */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Confirmar eliminación"
          message={`¿Eliminar "${selectedRepo?.name}"?`}
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Eliminar", handler: confirmDelete },
          ]}
        />
        {/* ⬆️ NUEVO */}

        {/* ⬇️ NUEVO - Modal de edición */}
        <IonModal
          isOpen={showEditModal}
          onDidDismiss={() => setShowEditModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Descripción</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel>
                <strong>{selectedRepo?.name}</strong>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea
                value={editDescription}
                onIonInput={(e) => setEditDescription(e.detail.value!)}
                rows={6}
              />
            </IonItem>
            <IonButton expand="block" onClick={confirmEdit}>
              Guardar
            </IonButton>
            <IonButton
              expand="block"
              fill="clear"
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
        {/* ⬆️ NUEVO */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
