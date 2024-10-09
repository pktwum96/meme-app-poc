import { ChangeEvent, Dispatch, DragEvent, useState } from "react";

const FileUploadArea = ({
  selectedFile,
  setSelectedFile,
}: {
  selectedFile: File | null;
  setSelectedFile: Dispatch<any>;
}) => {
  const [dragActive, setDragActive] = useState(false);

  // Handle file input changes
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle drag-and-drop functionality
  const handleDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer?.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle click on the drag area to open file input dialog
  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div
      className={`file-upload-area ${dragActive ? "active" : ""}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #ccc",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.3s ease",
      }}
    >
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {selectedFile ? (
        <p>File selected: {selectedFile.name}</p>
      ) : (
        <p>Drag and drop your file here or click to upload</p>
      )}
    </div>
  );
};

export default FileUploadArea;
