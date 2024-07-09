import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

const TesTemplate = () => {
  const viewer = useRef(null);
  const jsonData = {
    nomorSurat: "Tes Mbah BMN",
  };

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    // If you prefer to use the Iframe implementation, you can replace this line with: WebViewer.Iframe(...)
    WebViewer.WebComponent(
      {
        path: "/lib",
        initialDoc: "/DokumenBMN.docx",
        licenseKey:
          "demo:1720496789493:7f83802803000000004e54129f2f3719a3c9f13bf36126a9140bf4c7e0", // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current
    ).then((instance) => {
      //   instance.UI.loadDocument("/DokumenBMN.docx");

      const { documentViewer } = instance.Core;

      documentViewer.addEventListener("documentLoaded", async () => {
        const doc = documentViewer.getDocument();
        documentViewer.updateView();
        await doc.applyTemplateValues(jsonData);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default TesTemplate;
