function updatePreview(id, previewId, formatter = (val) => val) {
  document.getElementById(id).addEventListener("input", function () {
    document.getElementById(previewId).innerText = formatter(this.value);
  });
}

updatePreview("firstName", "previewName", (val) => val + " ");
updatePreview("lastName", "previewName", (val) => document.getElementById("previewName").innerText + val);
updatePreview("jobTitle", "previewJob");
updatePreview("address", "previewAddress");
updatePreview("city", "previewCity");
updatePreview("country", "previewCountry");
updatePreview("phone", "previewPhone");
updatePreview("email", "previewEmail");
updatePreview("summary", "previewSummary");
updatePreview("skills", "previewSkills");
updatePreview("education", "previewEducation");
updatePreview("experience", "previewExperience");
updatePreview("projects", "previewProjects");
updatePreview("certificates", "previewCertificates");
updatePreview("hobbies", "previewHobbies");

// ========== PDF & Edit Buttons ========== //

window.addEventListener("DOMContentLoaded", () => {
  const previewSection = document.getElementById("resumePreview");
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download PDF";

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit Mode";

  buttonGroup.appendChild(downloadBtn);
  buttonGroup.appendChild(editBtn);

  // Insert the button group *after* the preview section
  previewSection.parentNode.insertBefore(buttonGroup, previewSection.nextSibling);


  downloadBtn.addEventListener("click", () => {
    const element = document.getElementById("resumePreview");
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  });

  editBtn.addEventListener("click", () => {
    document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
  });
});




document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Fetch form fields
  const form = e.target;
  const fields = [
    "full_name", "qualification", "phone", "email", "certification",
    "licensure", "languages", "research_experience", "accreditations",
    "hobbies", "references", "objectives", "experience", "education",
    "training", "responsibilities"
  ];

  // Insert data into template
  fields.forEach(field => {
    const value = form[field].value.trim();
    const target = document.getElementById(field + "_out");
    if (target) {
      target.textContent = value;
    }
  });

  // Show template if hidden
  document.getElementById("resumeTemplate").style.display = "block";
});
