'use server'

import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) {
    throw new Error("No file provided");
  }

  const apiKey = process.env.PICS_SHADE_API_KEY;
  if (!apiKey) {
    throw new Error("PICS_SHADE_API_KEY not found in environment variables");
  }

  const formDataToSend = new FormData();
  formDataToSend.append("file", file);
  formDataToSend.append("path", "uploads");
  formDataToSend.append("tags", "editor,upload");

  try {
    const response = await fetch("https://pics.shade.cool/api/upload", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    revalidatePath('/');
    return data.cdn; // Use the correct CDN URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

