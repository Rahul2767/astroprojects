export function formatKundliData(formData: any, coordinates: { lat: number; lng: number }) {
  const date = new Date(formData.dateOfBirth);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  
  return new URLSearchParams({
    name: formData.fullName,
    seed249: "",
    date: formattedDate,
    time: formData.timeOfBirth,
    offset: "330", // IST offset
    place: formData.place,
    latitute: coordinates.lat.toString(),
    longitude: coordinates.lng.toString(),
    ayan: "3",
    viewId: `x${Date.now()}`
  }).toString();
}

export async function fetchKundli(formData: string) {
  try {
    console.log(formData);

    const response = await fetch("https://api-nadianalizer.vercel.app/getData", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set appropriate content type
      },
      body: formData, // Pass the form data as the body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text(); // Assuming the response is HTML
  } catch (error) {
    console.error("Error fetching kundli:", error);
    return null;
  }
}
