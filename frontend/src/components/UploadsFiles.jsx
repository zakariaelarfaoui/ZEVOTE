function UploadsFiles({ name, setFiles, files }) {
  
  const handelFilesChange = (e) => {
    const uploadsFiles = Array.from(e.target.files);
    setFiles((prev) => uploadsFiles);
  };

  return (
    <>
      <label className="form-label" htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        className="form-control"
        type="file"
        name={name}
        id={name}
        value={files}
        onChange={handelFilesChange}
      />
    </>
  );
}

export default UploadsFiles;
