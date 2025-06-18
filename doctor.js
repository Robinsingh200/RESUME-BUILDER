// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const editBtn = document.getElementById("editButton");
  const downloadBtn = document.getElementById("downloadButton");

  // Form Submit: Fill Template with Data
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    for (let [name, value] of formData.entries()) {
      const target = document.getElementById(`${name}_out`);
      if (target) {
        target.textContent = value;
      }
    }

    // Show the resume preview
    document.getElementById("resumeTemplate").style.display = "block";
  });

  // Edit button: Hide template, show form again
  editBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("resumeTemplate").style.display = "none";
    window.scrollTo(0, 0);
  });

  // Download PDF
  downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const resume = document.getElementById("resumeTemplate");

    html2canvas(resume, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "pt", "a4");

      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      let position = 0;
      if (imgHeight > pageHeight) {
        let heightLeft = imgHeight;
        while (heightLeft > 0) {
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage();
            position = -(imgHeight - heightLeft);
          }
        }
      } else {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }

      pdf.save("Doctor_Resume.pdf");
    });
  });
});
