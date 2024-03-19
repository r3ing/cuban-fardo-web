import axios from "axios";

const {
  REACT_APP_DOMAIN_URL_INVOICE_REPORT,
  REACT_APP_ENPOINT_PDF_REPORT,
  REACT_APP_AUTH_API_REPORT_USER,
  REACT_APP_AUTH_API_REPORT_PASSWORD,
} = process.env;

export const pdfReport = async (shipping, fileName) => {
    
  let url = REACT_APP_DOMAIN_URL_INVOICE_REPORT + REACT_APP_ENPOINT_PDF_REPORT;
  let username = REACT_APP_AUTH_API_REPORT_USER;
  let password = REACT_APP_AUTH_API_REPORT_PASSWORD;

  const basicAuth = 'Basic ' + btoa(username + ':' + password);  

  try {
    const response = await axios.post(url, shipping, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      },
      responseType: 'blob' 
    });    
    
    // Create a virtual link element
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;

    // Set the custom filename using Content-Disposition header
    link.setAttribute('download', fileName);

    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error; 
  }
  

};
