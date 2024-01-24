import React from "react";
import "./AttentionDelete.css";

function AttentionDelete() {
  return <div className="AttentionDelete">
    <p>Attention, cette action entraînera une suppression définitive de cette offre.</p>
    <button>Valide</button>
  </div>;
}

export default AttentionDelete;
