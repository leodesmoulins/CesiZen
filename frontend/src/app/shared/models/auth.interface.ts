/**
 * Interface pour la requête de connexion
 * Utilisée lors de l'appel POST /api/auth/login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interface pour la requête d'inscription
 * Utilisée lors de l'appel POST /api/auth/register
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Interface pour la réponse d'authentification
 * Renvoyée par le backend après login réussi
 */
export interface AuthResponse {
  token: string; // JWT token
  user: User; // Informations utilisateur
  roles: string[]; // Liste des rôles
}

/**
 * Interface User simplifiée
 */
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  active: boolean;
  roles?: string[];
}
