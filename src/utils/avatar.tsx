const Avatar: React.FC<{ initials: string }> = ({ initials }) => {
    return (
      <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#007bff",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px",
        fontWeight: "bold"
      }}>
        {initials}
      </div>
    );
  };

export default Avatar;