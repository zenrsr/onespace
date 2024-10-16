import { useState, useEffect } from "react";

export const useRandomImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/randomimage?category=abstract",
          {
            headers: {
              "X-Api-Key": "dA1lfAm6OromJU5OxAvTFA==dSWGC8y6ucsWJg2j",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return { imageUrl, isLoading, error };
};
