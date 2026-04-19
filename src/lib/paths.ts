const BASE_PATH = process.env.NODE_ENV === "production" ? "/Mitologia-Grega" : "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

export const DRACO_DECODER_PATH = `${BASE_PATH}/draco/gltf/`;
