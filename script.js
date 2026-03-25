// SCROLL
function scrollToSection() {
  document.getElementById("about").scrollIntoView();
}

// 🔥 SUPABASE CONFIG
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

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
    loadFeedback();
  }
});

// LOAD DATA
async function loadFeedback() {
  const { data } = await supabaseClient.from("feedback").select("*");

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
