"use client";

import { useCallback, useState } from "react";

type GeoState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; lat: number; lng: number }
  | { status: "error"; message: string };

/**
 * Geolocalización bajo demanda: nunca pide permiso solo, solo cuando se
 * llama a request() (por ejemplo, al tocar un botón "Usar mi ubicación").
 */
export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "idle" });

  const request = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setState({
        status: "error",
        message: "Tu navegador no permite compartir tu ubicación.",
      });
      return;
    }
    setState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          status: "success",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        const message =
          err.code === err.PERMISSION_DENIED
            ? "No nos diste permiso de ubicación. Podés elegir tu sucursal manualmente."
            : "No pudimos obtener tu ubicación. Probá de nuevo.";
        setState({ status: "error", message });
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5 * 60_000 }
    );
  }, []);

  return { state, request };
}
