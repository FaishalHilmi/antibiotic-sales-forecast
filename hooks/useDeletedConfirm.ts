import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface UseDeleteWithConfirmProps {
  endpoint: string;
  onSuccess?: (id: string | number) => void;
}

export const useDeleteWithConfirm = ({
  endpoint,
  onSuccess,
}: UseDeleteWithConfirmProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback((id: string | number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedId === null) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${endpoint}/${selectedId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Data berhasil dihapus.");
        onSuccess?.(selectedId);
      } else {
        toast.error(`Gagal menghapus: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
      setSelectedId(null);
    }
  }, [endpoint, onSuccess, selectedId]);

  return {
    isModalOpen,
    isDeleting,
    handleDelete,
    handleConfirmDelete,
    setIsModalOpen,
  };
};
