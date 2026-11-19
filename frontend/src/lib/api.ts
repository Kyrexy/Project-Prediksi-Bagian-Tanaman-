import type { Prediction } from "@/types/prediction";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function predictPlant(file: File): Promise<Prediction> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error("Gagal menghubungi server backend. Pastikan FastAPI berjalan.");
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    if (body && typeof body === "object" && "detail" in body && typeof body.detail === "string") {
      throw new Error(body.detail);
    }
    throw new Error(`Prediksi gagal (HTTP ${response.status}).`);
  }
  return body as Prediction;
}
