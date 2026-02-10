/**
 * Format standardisé pour toutes les réponses API
 * Permet une gestion uniforme des succès et erreurs
 */
export interface ApiResponse<T = any> {
  success: boolean; // Indique si la requête a réussi
  message?: string; // Message de succès ou d'erreur
  data?: T; // Données retournées (type générique)
  errors?: string[]; // Liste des erreurs (validation, etc.)
  timestamp?: string; // Horodatage de la réponse
}

/**
 * Format pour les réponses paginées
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Format pour les erreurs standardisées
 */
export interface ErrorResponse {
  status: number; // Code HTTP (400, 401, 403, 404, 500, etc.)
  message: string; // Message d'erreur
  timestamp: string; // Horodatage de l'erreur
  path?: string; // Endpoint appelé
  errors?: {
    // Détails des erreurs de validation
    field: string;
    message: string;
  }[];
}
