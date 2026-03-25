// SCROLL
function scrollToSection() {
  document.getElementById("about").scrollIntoView();
}

// 🔥 SUPABASE CONFIG
const SUPABASE_URL = "https://bvvthjidmopoqnpaqwxv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2dnRoamlkbW9wb3FucGFxd3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MDQyODQsImV4cCI6MjA4OTk4MDI4NH0.wiQxDCBWs5il6ynQWO0j0Ses9KxYDVmlijgzHhJMc1w";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// FORM SUBMIT
document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const { data, error } = await supabaseClient
    .from("feedback")
    .insert([{ name, email, message }]);

  if (error) {
    alert("Error saving feedback");
  } else {
    alert("Feedback submitted!");
    await loadFeedback(); // ✅ Fix: await added
  }
});

// LOAD DATA
async function loadFeedback() {
  const { data, error } = await supabaseClient.from("feedback").select("*");

  // ✅ Fix: null/error guard added
  if (error || !data) return;

  const list = document.getElementById("feedbackList");
  list.innerHTML = "";
  data.forEach(f => {
    list.innerHTML += `
      <div class="feedback-card">
        <strong>${f.name}</strong>
        <p>${f.message}</p>
      </div>
    `;
  });
}

loadFeedback();
