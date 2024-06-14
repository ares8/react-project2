const Footer = ({ children }) => {
  const footerStyles = {
    height: "100px",
    width: "100%",
    backgroundColor: "#c3e6cb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="footer" style={footerStyles}>
      {children}
    </div>
  );
};

export default Footer;
