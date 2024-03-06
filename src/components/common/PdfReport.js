const {
  REACT_APP_DOMAIN_URL_INVOICE_REPORT,
  REACT_APP_ENPOINT_PDF_REPORT,
  REACT_APP_AUTH_API_REPORT_USER,
  REACT_APP_AUTH_API_REPORT_PASSWORD,
} = process.env;

export const pdfReport = async (shipping) => {
  let url = REACT_APP_DOMAIN_URL_INVOICE_REPORT + REACT_APP_ENPOINT_PDF_REPORT;
  let username = REACT_APP_AUTH_API_REPORT_USER;
  let password = REACT_APP_AUTH_API_REPORT_PASSWORD;
  const base64encodedData = Buffer.from(`${username}:${password}`).toString(
    "base64"
  );

  const basicAuth = 'Basic ' + btoa(username + ':' + password);

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    cache: "default",    
    headers: {
      "Content-Type": "application/json",
      'Authorization': basicAuth //`Basic ${base64encodedData}`,
    },
    body: shipping,
  })
    .then((res) => res.blob())
    .then((blob) => {
      window.URL.createObjectURL(blob);
    })
    .catch((error) => {
      console.error("Error fetching or displaying invoice PDF:", error);
    });
};
