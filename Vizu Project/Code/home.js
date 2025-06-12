window.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("projectGallery");
    const docs = JSON.parse(localStorage.getItem("vizuDocs") || "{}");

    if (Object.keys(docs).length === 0) {
        gallery.innerHTML = "<p>There are no saved documents yet.</p>";
        return;
    }

    Object.entries(docs).forEach(([title, content]) => {
        const div = document.createElement("div");
        div.className = "project-card";
        div.innerHTML = `
                <h3>${title}</h3>
                <div class="preview">${content.slice(0, 100)}...</div>
                <button onclick="openDoc('${title}')">Open</button>
                <button class="delete-btn" onclick="deleteDoc('${title}')">Delete</button>
            `;

        gallery.appendChild(div);
    });
});

function openDoc(title) {
    localStorage.setItem("currentDoc", title);
    location.href = "vizu.html";
}

function deleteDoc(title) {
    const confirmed = confirm(`Are you sure you want to delete the document? "${title}";`);
    if (!confirmed) return;

    const docs = JSON.parse(localStorage.getItem("vizuDocs") || "{}");
    delete docs[title];
    localStorage.setItem("vizuDocs", JSON.stringify(docs));

    location.reload();
}

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    const title = prompt("Give a tilte for your Project:");

    if (!title) return;

    const docs = JSON.parse(localStorage.getItem("vizuDocs") || "{}");

    if (docs[title]) {
        const overwrite = confirm("A document with this name already exists. Do you want to replace it?");
        if (!overwrite) return;
    }

    docs[title] = "<p></p>";
    localStorage.setItem("vizuDocs", JSON.stringify(docs));
    localStorage.setItem("currentDoc", title);

    window.location.href = "vizu.html";
});