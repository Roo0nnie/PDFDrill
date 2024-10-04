document.getElementById("file-input").addEventListener("change", function () {
  const fileName = this.files[0].name;
  document.getElementById("file-name").innerText = fileName;
});

document
  .getElementById("upload-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    document.getElementById("loading-spinner").style.display = "inline-block";
    document.getElementById("btn-clicked").style.display = "none";

    try {
      const response = await fetch(
        "https://python-extracter-2.onrender.com/extract_pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        document.getElementById("error-message").innerText =
          error.error || "An error occurred";
        document.getElementById("output").innerText = "";
        showModal();
        return;
      }

      const result = await response.json();

      document.getElementById("output").innerText =
        result.content || "No content extracted.";
      document.getElementById("error-message").innerText = "";
      showModal();
    } catch (error) {
      document.getElementById("error-message").innerText =
        "Network error: " + error.message;
      document.getElementById("output").innerText = "";
      showModal();
    } finally {
      document.getElementById("loading-spinner").style.display = "none";
      document.getElementById("btn-clicked").style.display = "block";
    }
  });

function showModal() {
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
  document.getElementById("loading-spinner").style.display = "none";
  document.getElementById("btn-clicked").style.display = "block";
}
