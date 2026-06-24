import React from "react"

type ConfirmMode = "delete" | "trash"

interface ConfirmationModalProps {
  isOpen: boolean
  mode: ConfirmMode
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  mode,
  onConfirm,
  onCancel,
}) => {
//   if (!isOpen) return null

  const config =
    mode === "delete"
      ? {
          title: "Delete Task",
          message:
            "This task would be permanently deleted. Are you sure?",
          confirmText: "Delete",
        }
      : {
          title: "Move to Trash",
          message:
            "This item will be moved to trash. Are you sure?",
          confirmText: "Yes",
        }

  return (
<div
  className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
    isOpen
      ? "opacity-100 backdrop-blur-sm bg-black/20 pointer-events-auto"
      : "opacity-0 backdrop-blur-none bg-transparent pointer-events-none"
  }`}
  onClick={onCancel}
>
  <div
    className={`bg-white w-[90%] max-w-md rounded-lg p-6 shadow-xl transition-all duration-300 ease-out ${
      isOpen
        ? "scale-100 opacity-100"
        : "scale-95 opacity-0"
    }`}
    onClick={(e) => e.stopPropagation()}
  >
    <h2 className="text-xl font-semibold mb-3">{config.title}</h2>

    <p className="text-gray-600 mb-6">{config.message}</p>

    <div className="flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        Cancel
      </button>

      <button
        onClick={onConfirm}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        {config.confirmText}
      </button>
    </div>
  </div>
</div>
  )
}

export default ConfirmationModal