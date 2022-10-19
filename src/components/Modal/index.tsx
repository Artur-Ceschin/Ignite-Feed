import { useCallback, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  content: string;
  onDeleteComment: (commentToDelete: string) => void;
}

export function Modal({
  isModalOpen,
  setIsModalOpen,
  onDeleteComment,
  content,
}: ModalProps) {
  function handleDeleteComment() {
    onDeleteComment(content);
  }

  const modalRef = useRef<HTMLDivElement>(null);

  function closeOnClickOutsideModal(event: React.MouseEvent<HTMLElement>) {
    if (modalRef.current === event.target) {
      setIsModalOpen(false);
    }
  }

  const closeOnScapeKey = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    },
    [isModalOpen, setIsModalOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", (event: any) =>
      closeOnScapeKey(event)
    );
    return () =>
      document.removeEventListener("keydown", (event: any) =>
        closeOnScapeKey(event)
      );
  }, [closeOnScapeKey]);

  return (
    <>
      {isModalOpen && (
        <div
          ref={modalRef}
          onClick={closeOnClickOutsideModal}
          className={styles.overlay}
        >
          <div className={styles.modalBackground}>
            <h1 className={styles.title}>Excluir comentário</h1>
            <p className={styles.content}>
              Você tem certeza que gostaria de excluir este comentário?
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancel}
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button className={styles.confirm} onClick={handleDeleteComment}>
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
