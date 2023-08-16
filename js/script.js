function generateRedirectUrl() {
  const longUrl = document.getElementById("long-url").value;

  const numbersToCheck = [
    "165078", "cfcb710f", // rabbi
    "",
  ];

  if (!numbersToCheck.some((num) => longUrl.includes(num))) {
    alert(
      "This URL does not shorten without registration. দয়াকরে আপনার প্রোফাইল সংযোগ করুন । যোগাযোগঃ- আমান- +8801773633328 (whatapp)."
    );
    return;
  }

  const tinyUrl = "https://tinyurl.com/api-create.php";
  const urlParams = new URLSearchParams({
    url: longUrl,
  });
  const fullUrl = `${tinyUrl}?${urlParams}`;

  fetch(fullUrl)
    .then((response) => response.text())
    .then((data) => {
      const shortenedUrl = data.trim();
      console.log(shortenedUrl);

      const event = "comments";
      const redirectUrl =
        "https://www.youtube.com/redirect?" +
        "&event=" +
        event +
        "&redir_token=" +
        redirToken +
        "=" +
        encodeURIComponent(longUrl) +
        "&html_redirect=1";

      // Update result and copy button
      const shortUrl = redirectUrl;
      document.getElementById("result").innerHTML =
        "Your shortened URL is: <a href='" +
        shortUrl +
        "' target='_blank'>" +
        shortUrl +
        "</a>";
      document.getElementById("copy-btn").style.display = "block";
      document.getElementById("copy-btn").setAttribute("data-clipboard-text", shortUrl);
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("result").innerHTML = "An error occurred while shortening the URL.";
    });
}

// Add copy to clipboard functionality
const copyBtn = document.getElementById("copy-btn");
copyBtn.addEventListener("click", function () {
  const clipboardText = copyBtn.getAttribute("data-clipboard-text");
  navigator.clipboard.writeText(clipboardText).then(
    function () {
      alert("Copied to clipboard!");
    },
    function () {
      alert("Error: Could not copy to clipboard.");
    }
  );
});

document.addEventListener(
  "contextmenu",
  function (e) {
    if (e.target.id !== "long-url") {
      e.preventDefault();
    }
  },
  false
);

document.getElementById("long-url").addEventListener(
  "touchstart",
  function (e) {
    e.stopPropagation();
  },
  false
);

document.getElementById("long-url").addEventListener(
  "contextmenu",
  function (e) {
    e.stopPropagation();
  },
  false
);
