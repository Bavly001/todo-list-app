import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { ModalType } from '../types';

export function useModalParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const taskParam = searchParams.get('task');
  const modalParam = searchParams.get('modal');
  const taskIdParam = searchParams.get('taskId');
  const projectIdParam = searchParams.get('projectId');

  let activeModal: ModalType = null;
  if (taskParam) {
    activeModal = 'edit-task';
  } else if (modalParam) {
    activeModal = modalParam as ModalType;
  }

  const activeTaskId = taskParam || taskIdParam || null;
  const activeProjectId = projectIdParam || null;

  const openTask = useCallback(
    (id: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('task', id);
        next.delete('modal');
        next.delete('taskId');
        return next;
      });
    },
    [setSearchParams]
  );

  const openModal = useCallback(
    (modal: string, extra?: Record<string, string>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set('modal', modal);
        next.delete('task');
        if (extra) {
          Object.entries(extra).forEach(([k, v]) => {
            if (v !== undefined && v !== null) {
              next.set(k, v);
            }
          });
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const closeModal = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('modal');
      next.delete('task');
      next.delete('taskId');
      next.delete('projectId');
      return next;
    });
  }, [setSearchParams]);

  return {
    activeModal,
    activeTaskId,
    activeProjectId,
    openTask,
    openModal,
    closeModal,
  };
}
