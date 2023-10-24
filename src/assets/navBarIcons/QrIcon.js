import React from "react";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import { Link } from "react-router-dom";

/**
 *
 * @returns The Qr icon which takes the user to the ScanArticlePage (View 3) onClick.
 */

const QrIcon = () => {
  return (
    <Link to="/scan-article">
      <QrCodeScannerOutlinedIcon sx={{ fontSize: "60px", color: "black" }} />
    </Link>
  );
};

export default QrIcon;
