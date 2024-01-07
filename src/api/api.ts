export async function fetchNLT(
  reference: string | undefined,
  options: { signal: AbortSignal }
) {
  try {
    const formattedRef = reference
      ?.replace(/\s+/g, ".")
      .toLowerCase()
      .replace(/:/g, ".");
    const url = `https://api.nlt.to/api/passages?version=nlt&ref=${formattedRef}&key=TEST`;

    const response = await fetch(url, { signal: options.signal });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const tempElement = document.createElement("div");
    tempElement.innerHTML = await response.text();
    const vnElements = tempElement.querySelectorAll(".vn");
    let verseText = "";
    vnElements.forEach((vnElement) => {
      let currentNode = vnElement.nextSibling;
      while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          const extractedText = currentNode.textContent?.trim();
          verseText += extractedText + "\n";
          break;
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          const extractedText = currentNode.textContent?.trim();
          verseText += extractedText + "\n";
          break;
        }
        currentNode = currentNode.nextSibling;
      }
    });
    return verseText;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchESV(
  passage: string | undefined,
  options: { signal: AbortSignal }
): Promise<string> {
  const params = new URLSearchParams({
    q: passage ?? "",
    "include-headings": "false",
    "include-footnotes": "false",
    "include-verse-numbers": "false",
    "include-short-copyright": "false",
    "include-passage-references": "false",
  });

  const headers = {
    Authorization: `Token ${process.env.REACT_APP_ESV_API_KEY}`,
  };

  const url = `https://api.esv.org/v3/passage/text/?${params}`;

  try {
    const response = await fetch(url, { headers, signal: options.signal });
    const data = await response.json();
    const passages: string[] = data.passages;
    return passages[0].trim();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return "Error: Passage not found";
}
