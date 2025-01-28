export async function exportPDF(element, userName) {
  if (typeof window !== "undefined") {
    const html2pdf = (await import("html2pdf.js")).default;
    const options = {
      margin: 0,
      filename: `CV_${userName.split(" ")[1]}_${userName.split(" ")[0]}_${new Date().toLocaleDateString("fr-FR").replace(/\s/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  } else {
    console.error("Cette fonction ne peut être exécutée que dans un environnement de navigateur.");
  }
}
