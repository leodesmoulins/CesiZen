# Plan de Tâches - Projet CESIZen

**Étudiant** : DESMOULINS Léo  
**Formation** : Concepteur Développeur d'Applications (CDA)  
**Bloc** : BLOC 2 - Développer et tester les applications informatiques  
**Durée** : 3 mois environ  

## Stack Technique Retenue

### Frontend
- **Framework** : Angular 21
- **Styling** : TailwindCSS
- **Communication** : Services Angular (HttpClient)

### Backend
- **Framework** : Spring Boot 3.5.6 (ou 4.x si stable)
- **Outils** : Lombok
- **Base de données** : PostgreSQL (relationnelle obligatoire)
- **ORM** : Spring Data JPA

### Modules à développer
1. **Comptes utilisateurs** (Obligatoire)
2. **Informations** (Obligatoire)
3. **Diagnostics** (Au choix - retenu)

---

## PHASE 1 : CONCEPTION ET MODÉLISATION

### 1.1 Modélisation de la Base de Données

#### Tâche 1.1.1 : Créer le MCD (Modèle Conceptuel de Données)
- [ ] Identifier toutes les entités nécessaires pour les 3 modules
  - [ ] Utilisateur (User)
  - [ ] Rôle (Role)
  - [ ] Page d'information (InfoPage)
  - [ ] Menu (Menu)
  - [ ] Question diagnostic (DiagnosticQuestion)
  - [ ] Résultat diagnostic (DiagnosticResult)
  - [ ] Configuration diagnostic (DiagnosticConfig)
- [ ] Définir les attributs de chaque entité
- [ ] Établir les relations entre entités (cardinalités)
- [ ] Valider la cohérence du modèle
- [ ] Utiliser un outil de modélisation (JMerise, Looping, ou Draw.io)

#### Tâche 1.1.2 : Créer le MLD (Modèle Logique de Données)
- [ ] Transformer le MCD en MLD
- [ ] Ajouter les clés primaires (PK)
- [ ] Ajouter les clés étrangères (FK)
- [ ] Définir les types de données précis
- [ ] Normaliser les tables (3NF minimum)
- [ ] Documenter les contraintes d'intégrité

### 1.2 Architecture Logicielle

#### Tâche 1.2.1 : Comparatif des architectures
- [ ] Analyser 3 architectures différentes minimum
  - [ ] Architecture 1 : Monolithique (Spring Boot + Angular)
  - [ ] Architecture 2 : Microservices
  - [ ] Architecture 3 : Serverless
- [ ] Définir les critères de comparaison
  - [ ] Coût de développement
  - [ ] Maintenabilité
  - [ ] Scalabilité
  - [ ] Performance
  - [ ] Sécurité
  - [ ] Complexité
  - [ ] Délais de livraison
- [ ] Justifier le choix final (monolithique recommandé)
- [ ] Documenter dans le dossier technique

#### Tâche 1.2.2 : Conception MVC
- [ ] Schématiser l'architecture MVC
- [ ] Définir la structure des packages Backend
  - [ ] Model (entities, DTOs)
  - [ ] View (REST Controllers)
  - [ ] Controller (Services, Business Logic)
  - [ ] Repository (Data Access Layer)
- [ ] Définir la structure Frontend
  - [ ] Components (View)
  - [ ] Services (Controller)
  - [ ] Models/Interfaces (Model)

### 1.3 Spécifications Fonctionnelles

#### Tâche 1.3.1 : Module Comptes Utilisateurs
- [ ] Rédiger les user stories
  - [ ] US1 : Création compte utilisateur (Visiteur)
  - [ ] US2 : Connexion/Déconnexion (Utilisateur)
  - [ ] US3 : Gestion profil (Utilisateur)
  - [ ] US4 : Réinitialisation mot de passe (Utilisateur)
  - [ ] US5 : CRUD comptes administrateurs (Admin)
  - [ ] US6 : Désactivation/Suppression compte (Admin)
- [ ] Définir les règles de gestion
  - [ ] Format email valide
  - [ ] Politique mot de passe (min 8 caractères, majuscule, chiffre, caractère spécial)
  - [ ] Rôles : VISITEUR, USER, ADMIN
  - [ ] Vérification email (optionnel)
- [ ] Créer les mockups/wireframes (Figma ou Balsamiq)
- [ ] Définir les contraintes de sécurité (JWT, BCrypt)

#### Tâche 1.3.2 : Module Informations
- [ ] Rédiger les user stories
  - [ ] US1 : Affichage pages statiques (Visiteur/User)
  - [ ] US2 : Navigation menu (Visiteur/User)
  - [ ] US3 : Gestion contenu pages (Admin)
  - [ ] US4 : Gestion structure menu (Admin)
- [ ] Définir les règles de gestion
  - [ ] Pages hiérarchiques (menu/sous-menu)
  - [ ] Éditeur WYSIWYG pour contenu
  - [ ] Publication/dépublication pages
  - [ ] SEO-friendly URLs
- [ ] Créer les mockups (pages info + back-office)

#### Tâche 1.3.3 : Module Diagnostics
- [ ] Rédiger les user stories
  - [ ] US1 : Afficher questionnaire (Visiteur/User)
  - [ ] US2 : Dérouler questionnaire (Visiteur/User)
  - [ ] US3 : Calcul et affichage résultat (Visiteur/User)
  - [ ] US4 : Configuration questions (Admin)
  - [ ] US5 : Configuration page résultats (Admin)
- [ ] Définir les règles de gestion
  - [ ] Échelle Holmes et Rahe (événements + points)
  - [ ] Calcul score total
  - [ ] Catégories de stress (faible/moyen/élevé)
  - [ ] Seuils configurables
- [ ] Intégrer les données de l'échelle Holmes et Rahe
- [ ] Créer les mockups (questionnaire + résultats)

### 1.4 Diagrammes UML

#### Tâche 1.4.1 : Diagramme de cas d'utilisation
- [ ] Identifier les acteurs (Visiteur, Utilisateur, Admin)
- [ ] Définir les cas d'utilisation pour chaque module
- [ ] Établir les relations (include, extend)
- [ ] Utiliser un outil UML (PlantUML, Draw.io, StarUML)

#### Tâche 1.4.2 : Diagrammes de séquence
- [ ] Créer diagramme pour "Création de compte"
- [ ] Créer diagramme pour "Connexion utilisateur"
- [ ] Créer diagramme pour "Déroulement du diagnostic"
- [ ] Créer diagramme pour "Modification contenu page info" (Admin)

#### Tâche 1.4.3 : Diagramme de classes
- [ ] Modéliser les classes principales
- [ ] Définir les attributs et méthodes
- [ ] Établir les associations entre classes
- [ ] Valider la cohérence avec le MCD

---

## PHASE 2 : DÉVELOPPEMENT BACKEND

### 2.1 Configuration du Projet Spring Boot

#### Tâche 2.1.1 : Initialisation du projet
- [ ] Générer projet via Spring Initializr
  - [ ] Spring Boot 3.5.6 (ou 4.x)
  - [ ] Dependencies : Web, JPA, PostgreSQL, Security, Lombok, Validation
- [ ] Configurer application.properties / application.yml
  - [ ] Connexion PostgreSQL
  - [ ] JPA/Hibernate settings
  - [ ] Port serveur (8080)
  - [ ] Logs
- [ ] Configurer structure packages
  ```
  com.cesizen
    ├── config
    ├── model
    │   ├── entity
    │   └── dto
    ├── repository
    ├── service
    ├── controller
    ├── security
    └── exception
  ```

#### Tâche 2.1.2 : Configuration de la sécurité
- [ ] Implémenter Spring Security
- [ ] Configurer JWT (génération et validation tokens)
- [ ] Créer filtres de sécurité
- [ ] Gérer les rôles et permissions
- [ ] Crypter les mots de passe (BCryptPasswordEncoder)

### 2.2 Modèle de Données (Entities)

#### Tâche 2.2.1 : Entités Module Comptes Utilisateurs
- [ ] Créer entity User
  - [ ] id, email, password, firstName, lastName, createdAt, updatedAt, isActive
  - [ ] Relations : ManyToMany avec Role
- [ ] Créer entity Role
  - [ ] id, name (ROLE_USER, ROLE_ADMIN), description
- [ ] Annoter avec JPA (@Entity, @Table, @Id, etc.)
- [ ] Ajouter Lombok (@Data, @NoArgsConstructor, @AllArgsConstructor)
- [ ] Ajouter validation (@NotNull, @Email, etc.)

#### Tâche 2.2.2 : Entités Module Informations
- [ ] Créer entity InfoPage
  - [ ] id, title, slug, content, isPublished, createdAt, updatedAt
  - [ ] Relations : ManyToOne avec Menu
- [ ] Créer entity Menu
  - [ ] id, title, slug, order, parentId (auto-référence)
  - [ ] Relations : OneToMany avec InfoPage

#### Tâche 2.2.3 : Entités Module Diagnostics
- [ ] Créer entity DiagnosticQuestion
  - [ ] id, eventName, points, order, isActive
- [ ] Créer entity DiagnosticResult
  - [ ] id, userId (nullable), totalScore, category, resultText, createdAt
- [ ] Créer entity DiagnosticConfig
  - [ ] id, minScoreLow, maxScoreLow, minScoreMedium, maxScoreMedium, etc.
  - [ ] Textes pour chaque catégorie

### 2.3 Repositories

#### Tâche 2.3.1 : Créer les interfaces Repository
- [ ] UserRepository extends JpaRepository
  - [ ] findByEmail(String email)
  - [ ] existsByEmail(String email)
- [ ] RoleRepository
  - [ ] findByName(String name)
- [ ] InfoPageRepository
  - [ ] findBySlug(String slug)
  - [ ] findByIsPublished(boolean isPublished)
- [ ] MenuRepository
  - [ ] findByOrderByOrderAsc()
- [ ] DiagnosticQuestionRepository
  - [ ] findByIsActiveTrueOrderByOrderAsc()
- [ ] DiagnosticResultRepository
  - [ ] findByUserId(Long userId)
- [ ] DiagnosticConfigRepository

### 2.4 Services (Logique Métier)

#### Tâche 2.4.1 : Services Module Comptes Utilisateurs
- [ ] Créer UserService
  - [ ] register(UserDTO) : créer compte
  - [ ] login(LoginDTO) : authentification + génération JWT
  - [ ] updateProfile(Long id, UserDTO)
  - [ ] resetPassword(String email)
  - [ ] deactivateUser(Long id) - Admin
  - [ ] deleteUser(Long id) - Admin
- [ ] Créer AuthService pour gestion JWT

#### Tâche 2.4.2 : Services Module Informations
- [ ] Créer InfoPageService
  - [ ] getAllPublishedPages()
  - [ ] getPageBySlug(String slug)
  - [ ] createPage(InfoPageDTO) - Admin
  - [ ] updatePage(Long id, InfoPageDTO) - Admin
  - [ ] publishPage(Long id) - Admin
- [ ] Créer MenuService
  - [ ] getAllMenus()
  - [ ] createMenu(MenuDTO) - Admin
  - [ ] updateMenu(Long id, MenuDTO) - Admin

#### Tâche 2.4.3 : Services Module Diagnostics
- [ ] Créer DiagnosticService
  - [ ] getAllQuestions() : récupérer questions actives
  - [ ] calculateScore(List<Long> selectedQuestionIds) : calcul score
  - [ ] saveResult(DiagnosticResultDTO)
  - [ ] getResultCategory(int score) : déterminer catégorie
  - [ ] getUserResults(Long userId) : historique
- [ ] Créer DiagnosticConfigService
  - [ ] getConfig()
  - [ ] updateConfig(DiagnosticConfigDTO) - Admin
- [ ] Créer DiagnosticQuestionService (CRUD Admin)

### 2.5 Controllers (API REST)

#### Tâche 2.5.1 : Controllers Module Comptes Utilisateurs
- [ ] AuthController
  - [ ] POST /api/auth/register
  - [ ] POST /api/auth/login
  - [ ] POST /api/auth/reset-password
- [ ] UserController
  - [ ] GET /api/users/{id}
  - [ ] PUT /api/users/{id}
  - [ ] GET /api/users (Admin)
  - [ ] DELETE /api/users/{id} (Admin)
  - [ ] PATCH /api/users/{id}/deactivate (Admin)

#### Tâche 2.5.2 : Controllers Module Informations
- [ ] InfoPageController
  - [ ] GET /api/pages
  - [ ] GET /api/pages/{slug}
  - [ ] POST /api/pages (Admin)
  - [ ] PUT /api/pages/{id} (Admin)
  - [ ] PATCH /api/pages/{id}/publish (Admin)
- [ ] MenuController
  - [ ] GET /api/menus
  - [ ] POST /api/menus (Admin)
  - [ ] PUT /api/menus/{id} (Admin)

#### Tâche 2.5.3 : Controllers Module Diagnostics
- [ ] DiagnosticController
  - [ ] GET /api/diagnostic/questions
  - [ ] POST /api/diagnostic/calculate
  - [ ] POST /api/diagnostic/save-result
  - [ ] GET /api/diagnostic/results (User)
- [ ] DiagnosticAdminController
  - [ ] GET /api/admin/diagnostic/questions
  - [ ] POST /api/admin/diagnostic/questions
  - [ ] PUT /api/admin/diagnostic/questions/{id}
  - [ ] DELETE /api/admin/diagnostic/questions/{id}
  - [ ] GET /api/admin/diagnostic/config
  - [ ] PUT /api/admin/diagnostic/config

### 2.6 DTOs (Data Transfer Objects)

#### Tâche 2.6.1 : Créer les DTOs nécessaires
- [ ] UserDTO, UserRegistrationDTO, UserLoginDTO
- [ ] InfoPageDTO, MenuDTO
- [ ] DiagnosticQuestionDTO, DiagnosticResultDTO, DiagnosticConfigDTO
- [ ] Ajouter validation (@NotBlank, @Email, @Size, etc.)

### 2.7 Exception Handling

#### Tâche 2.7.1 : Gestion globale des erreurs
- [ ] Créer exceptions personnalisées
  - [ ] ResourceNotFoundException
  - [ ] BadRequestException
  - [ ] UnauthorizedException
- [ ] Créer @ControllerAdvice pour gestion centralisée
- [ ] Retourner réponses JSON standardisées

### 2.8 Base de Données

#### Tâche 2.8.1 : Scripts SQL
- [ ] Créer script d'initialisation (schema.sql)
- [ ] Créer script de données initiales (data.sql)
  - [ ] Rôles (USER, ADMIN)
  - [ ] Utilisateur admin par défaut
  - [ ] Questions échelle Holmes et Rahe
  - [ ] Configuration diagnostic par défaut
  - [ ] Pages d'information de base

---

## PHASE 3 : DÉVELOPPEMENT FRONTEND

### 3.1 Configuration du Projet Angular

#### Tâche 3.1.1 : Initialisation
- [ ] Créer projet Angular 21
  ```bash
  ng new cesizen-frontend --routing --style=scss
  ```
- [ ] Installer et configurer TailwindCSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init
  ```
- [ ] Configurer tailwind.config.js
- [ ] Configurer structure de dossiers
  ```
  src/app
    ├── core (services, guards, interceptors)
    ├── shared (composants réutilisables, pipes, directives)
    ├── features
    │   ├── auth
    │   ├── user
    │   ├── info-pages
    │   └── diagnostic
    ├── models (interfaces TypeScript)
    └── layouts (header, footer, layout principal)
  ```

#### Tâche 3.1.2 : Configuration HTTP et Interceptors
- [ ] Configurer HttpClient
- [ ] Créer AuthInterceptor (ajout JWT aux requêtes)
- [ ] Créer ErrorInterceptor (gestion erreurs globales)
- [ ] Configurer environnements (environment.ts)
  - [ ] apiUrl: 'http://localhost:8080/api'

### 3.2 Modèles et Interfaces

#### Tâche 3.2.1 : Créer les interfaces TypeScript
- [ ] User, Role, LoginRequest, RegisterRequest
- [ ] InfoPage, Menu
- [ ] DiagnosticQuestion, DiagnosticResult, DiagnosticConfig
- [ ] ApiResponse (format standardisé réponses)

### 3.3 Services Angular

#### Tâche 3.3.1 : Services Module Comptes Utilisateurs
- [ ] AuthService
  - [ ] register(userData)
  - [ ] login(credentials)
  - [ ] logout()
  - [ ] getCurrentUser()
  - [ ] isAuthenticated()
  - [ ] getToken() / setToken()
- [ ] UserService
  - [ ] getUserProfile(id)
  - [ ] updateProfile(id, data)
  - [ ] getAllUsers() (Admin)
  - [ ] deleteUser(id) (Admin)

#### Tâche 3.3.2 : Services Module Informations
- [ ] InfoPageService
  - [ ] getPublishedPages()
  - [ ] getPageBySlug(slug)
  - [ ] createPage(data) (Admin)
  - [ ] updatePage(id, data) (Admin)
- [ ] MenuService
  - [ ] getMenus()
  - [ ] createMenu(data) (Admin)
  - [ ] updateMenu(id, data) (Admin)

#### Tâche 3.3.3 : Services Module Diagnostics
- [ ] DiagnosticService
  - [ ] getQuestions()
  - [ ] calculateScore(selectedIds)
  - [ ] saveResult(data)
  - [ ] getUserResults()
- [ ] DiagnosticAdminService
  - [ ] getQuestions() (Admin)
  - [ ] createQuestion(data) (Admin)
  - [ ] updateQuestion(id, data) (Admin)
  - [ ] getConfig() (Admin)
  - [ ] updateConfig(data) (Admin)

### 3.4 Guards et Routing

#### Tâche 3.4.1 : Créer les Guards
- [ ] AuthGuard (protection routes authentifiées)
- [ ] AdminGuard (protection routes admin)
- [ ] GuestGuard (redirection si déjà connecté)

#### Tâche 3.4.2 : Configurer le routing
- [ ] Routes publiques
  - [ ] /home (page d'accueil)
  - [ ] /login
  - [ ] /register
  - [ ] /pages/:slug (pages info)
  - [ ] /diagnostic (questionnaire)
- [ ] Routes authentifiées
  - [ ] /profile
  - [ ] /dashboard
  - [ ] /diagnostic/results
- [ ] Routes admin
  - [ ] /admin/dashboard
  - [ ] /admin/users
  - [ ] /admin/pages
  - [ ] /admin/menus
  - [ ] /admin/diagnostic

### 3.5 Composants - Module Comptes Utilisateurs

#### Tâche 3.5.1 : Composants Authentification
- [ ] LoginComponent
  - [ ] Formulaire réactif (email, password)
  - [ ] Validation
  - [ ] Gestion erreurs
  - [ ] Redirection après login
- [ ] RegisterComponent
  - [ ] Formulaire réactif (email, password, firstName, lastName)
  - [ ] Validation (password match, email unique)
  - [ ] Gestion erreurs
- [ ] ResetPasswordComponent (optionnel)

#### Tâche 3.5.2 : Composants Profil
- [ ] UserProfileComponent
  - [ ] Affichage infos utilisateur
  - [ ] Formulaire modification
  - [ ] Upload photo (optionnel)
- [ ] UserListComponent (Admin)
  - [ ] Tableau utilisateurs
  - [ ] Filtres et recherche
  - [ ] Actions (activer/désactiver/supprimer)

### 3.6 Composants - Module Informations

#### Tâche 3.6.1 : Composants Front-Office
- [ ] InfoPageListComponent
  - [ ] Liste pages publiées
  - [ ] Navigation
- [ ] InfoPageDetailComponent
  - [ ] Affichage contenu page
  - [ ] Breadcrumb
- [ ] MenuComponent
  - [ ] Navigation principale
  - [ ] Menu responsive (burger mobile)

#### Tâche 3.6.2 : Composants Back-Office (Admin)
- [ ] InfoPageManagementComponent
  - [ ] Liste pages (publiées/non publiées)
  - [ ] Actions CRUD
- [ ] InfoPageEditorComponent
  - [ ] Formulaire création/édition
  - [ ] Éditeur WYSIWYG (ngx-editor ou Quill)
  - [ ] Preview
- [ ] MenuManagementComponent
  - [ ] Gestion structure menu
  - [ ] Drag & drop pour ordre (optionnel)

### 3.7 Composants - Module Diagnostics

#### Tâche 3.7.1 : Composants Front-Office
- [ ] DiagnosticIntroComponent
  - [ ] Explication test
  - [ ] Bouton démarrer
- [ ] DiagnosticQuestionnaireComponent
  - [ ] Affichage questions
  - [ ] Checkboxes pour sélection
  - [ ] Progression (X/Y questions)
  - [ ] Bouton soumettre
- [ ] DiagnosticResultComponent
  - [ ] Affichage score
  - [ ] Catégorie stress
  - [ ] Conseils personnalisés
  - [ ] Graphique (Chart.js ou ng2-charts)
- [ ] DiagnosticHistoryComponent
  - [ ] Liste résultats passés (User)
  - [ ] Graphique évolution

#### Tâche 3.7.2 : Composants Back-Office (Admin)
- [ ] DiagnosticQuestionManagementComponent
  - [ ] Liste questions
  - [ ] CRUD questions
  - [ ] Activation/désactivation
  - [ ] Tri (order)
- [ ] DiagnosticConfigComponent
  - [ ] Formulaire configuration seuils
  - [ ] Textes catégories

### 3.8 Composants Shared et Layout

#### Tâche 3.8.1 : Composants Layout
- [ ] HeaderComponent
  - [ ] Logo
  - [ ] Menu navigation
  - [ ] Boutons login/logout
  - [ ] Menu utilisateur (dropdown)
- [ ] FooterComponent
  - [ ] Liens utiles
  - [ ] Mentions légales
- [ ] SidebarComponent (Admin)
  - [ ] Menu administration

#### Tâche 3.8.2 : Composants Shared
- [ ] LoaderComponent (spinner)
- [ ] AlertComponent (messages succès/erreur)
- [ ] ConfirmDialogComponent (confirmations)
- [ ] PaginationComponent (réutilisable)

### 3.9 Styling avec TailwindCSS

#### Tâche 3.9.1 : Design System
- [ ] Définir palette couleurs (primary, secondary, etc.)
- [ ] Définir typographie
- [ ] Créer composants réutilisables (buttons, inputs, cards)
- [ ] Assurer cohérence visuelle
- [ ] Responsive design (mobile-first)

#### Tâche 3.9.2 : Pages spécifiques
- [ ] Page d'accueil attractive
- [ ] Pages 404, 403, 500
- [ ] Dashboard utilisateur
- [ ] Dashboard admin

---

## PHASE 4 : TESTS

### 4.1 Tests Unitaires Backend

#### Tâche 4.1.1 : Tests Services
- [ ] Configurer JUnit 5 et Mockito
- [ ] Tester UserService
  - [ ] Test register() - succès
  - [ ] Test register() - email déjà existant
  - [ ] Test login() - succès
  - [ ] Test login() - credentials invalides
- [ ] Tester DiagnosticService
  - [ ] Test calculateScore()
  - [ ] Test getResultCategory()
- [ ] Tester InfoPageService
- [ ] Viser couverture > 70%

#### Tâche 4.1.2 : Tests Repositories
- [ ] Utiliser @DataJpaTest
- [ ] Tester requêtes personnalisées
- [ ] Tester contraintes d'intégrité

### 4.2 Tests Unitaires Frontend

#### Tâche 4.2.1 : Tests Composants
- [ ] Configurer Jasmine/Karma
- [ ] Tester LoginComponent
  - [ ] Validation formulaire
  - [ ] Soumission
- [ ] Tester DiagnosticQuestionnaireComponent
  - [ ] Sélection questions
  - [ ] Calcul score
- [ ] Tester composants critiques

#### Tâche 4.2.2 : Tests Services
- [ ] Mocker HttpClient (HttpClientTestingModule)
- [ ] Tester AuthService
- [ ] Tester DiagnosticService

### 4.3 Tests Fonctionnels

#### Tâche 4.3.1 : Scénarios de tests
- [ ] **Module Comptes Utilisateurs**
  - [ ] Scénario 1 : Inscription nouvel utilisateur
  - [ ] Scénario 2 : Connexion utilisateur existant
  - [ ] Scénario 3 : Modification profil
  - [ ] Scénario 4 : Réinitialisation mot de passe
  - [ ] Scénario 5 : Gestion utilisateurs (Admin)

- [ ] **Module Informations**
  - [ ] Scénario 1 : Consultation page publique
  - [ ] Scénario 2 : Navigation menu
  - [ ] Scénario 3 : Création page (Admin)
  - [ ] Scénario 4 : Modification contenu (Admin)

- [ ] **Module Diagnostics**
  - [ ] Scénario 1 : Compléter questionnaire (Visiteur)
  - [ ] Scénario 2 : Calcul et affichage résultat
  - [ ] Scénario 3 : Sauvegarde résultat (User)
  - [ ] Scénario 4 : Consultation historique (User)
  - [ ] Scénario 5 : Configuration questions (Admin)

### 4.4 Tests de Non-Régression

#### Tâche 4.4.1 : Définir les tests de non-régression
- [ ] Identifier fonctionnalités critiques
- [ ] Créer suite de tests à rejouer avant chaque release
- [ ] Automatiser avec Selenium/Cypress (optionnel)

### 4.5 Cahier de Tests

#### Tâche 4.5.1 : Rédiger le cahier de tests
- [ ] Créer document structuré
- [ ] Pour chaque test inclure :
  - [ ] ID du test
  - [ ] Type (unitaire/fonctionnel/non-régression)
  - [ ] Pré-conditions
  - [ ] Étapes du scénario
  - [ ] Résultats attendus
  - [ ] Résultats obtenus
  - [ ] Statut (Pass/Fail)
  - [ ] Responsable
- [ ] Couvrir les 3 modules

### 4.6 Automatisation des Tests

#### Tâche 4.6.1 : Configurer outils d'automatisation
- [ ] Backend : Maven Surefire Plugin (tests auto lors build)
- [ ] Frontend : Karma (tests auto)
- [ ] Optionnel : CI/CD (GitHub Actions, GitLab CI)
  - [ ] Pipeline : build → tests → deploy
  - [ ] Tests auto à chaque commit

### 4.7 Procédure de Validation

#### Tâche 4.7.1 : Créer procédure de validation (recette)
- [ ] Définir processus de recette
  - [ ] Planification
  - [ ] Exécution tests
  - [ ] Validation résultats
  - [ ] Acceptation/Refus livraison
- [ ] Créer modèle de PV de recette
  - [ ] Date et participants
  - [ ] Liste tests effectués
  - [ ] Résultats
  - [ ] Anomalies constatées
  - [ ] Décision (validé/refusé)
  - [ ] Signatures

---

## PHASE 5 : DOCUMENTATION

### 5.1 Documentation Technique

#### Tâche 5.1.1 : Guide d'Installation
- [ ] Prérequis système
  - [ ] Java 17+ / Node.js 18+
  - [ ] PostgreSQL 14+
  - [ ] IDE recommandés
- [ ] Installation Backend
  - [ ] Clone repository
  - [ ] Configuration base de données
  - [ ] Build : `mvn clean install`
  - [ ] Run : `mvn spring-boot:run`
- [ ] Installation Frontend
  - [ ] Clone repository
  - [ ] Installation dépendances : `npm install`
  - [ ] Configuration environment.ts
  - [ ] Run : `ng serve`
- [ ] Initialisation base de données
  - [ ] Exécution scripts SQL
  - [ ] Compte admin par défaut

#### Tâche 5.1.2 : Documentation de l'architecture
- [ ] Schéma architecture globale
- [ ] Description stack technique
- [ ] Structure projet (backend + frontend)
- [ ] Justification choix techniques
- [ ] Modèle MLD
- [ ] Comparatif architectures (3 architectures)

#### Tâche 5.1.3 : Documentation API (optionnel mais recommandé)
- [ ] Swagger/OpenAPI pour documenter endpoints
- [ ] Description de chaque endpoint
- [ ] Exemples requêtes/réponses

### 5.2 Dossier Final (15-20 pages)

#### Tâche 5.2.1 : Structurer le dossier
- [ ] Page de garde
- [ ] Sommaire
- [ ] Introduction
- [ ] **Documentation technique** (6-8 pages)
  - [ ] Modèle Logique de Données (MLD)
  - [ ] Comparatif architectures (méthodologie, critères, choix)
  - [ ] Pertinence solution retenue
  - [ ] Guide d'installation
- [ ] **Démonstration prototype** (2-3 pages)
  - [ ] Screenshots
  - [ ] Description fonctionnalités implémentées
- [ ] **Tests et validation** (4-5 pages)
  - [ ] Cahier de recette (scenarii détaillés)
  - [ ] Procédure de validation
  - [ ] Modèle PV de recette
- [ ] Conclusion
- [ ] Annexes

#### Tâche 5.2.2 : Qualité du dossier
- [ ] Orthographe et grammaire irréprochables
- [ ] Mise en page professionnelle
- [ ] Schémas clairs et lisibles
- [ ] Respect limite 20 pages max
- [ ] Export PDF

---

## PHASE 6 : PRÉPARATION SOUTENANCE

### 6.1 Support de Présentation

#### Tâche 6.1.1 : Créer le support PowerPoint/PDF
- [ ] Slide 1 : Page de titre
- [ ] Slide 2-3 : Contexte et objectifs du projet
- [ ] Slide 4-5 : Architecture technique (schémas)
- [ ] Slide 6-7 : Modélisation BDD (MLD)
- [ ] Slide 8-9 : Démonstration prototype (captures)
- [ ] Slide 10-11 : Tests et qualité
- [ ] Slide 12 : Conclusion et perspectives
- [ ] Support visuel, épuré, professionnel

### 6.2 Préparation de la Démonstration

#### Tâche 6.2.1 : Préparer la démo live
- [ ] Vérifier que l'application fonctionne
- [ ] Préparer données de test cohérentes
- [ ] Scénario de démonstration fluide (5-7 min)
  - [ ] Inscription/Connexion
  - [ ] Navigation pages info
  - [ ] Questionnaire diagnostic complet
  - [ ] Accès espace admin (CRUD)
- [ ] Prévoir plan B (vidéo si problème technique)

### 6.3 Répétition

#### Tâche 6.3.1 : Répéter la soutenance
- [ ] Chronométrer : 20 minutes max
- [ ] Structurer le discours
  - [ ] Introduction (2 min)
  - [ ] Présentation technique (7-8 min)
  - [ ] Démonstration (8-10 min)
  - [ ] Conclusion (2 min)
- [ ] Anticiper questions jury
  - [ ] Choix techniques
  - [ ] Difficultés rencontrées
  - [ ] Sécurité et RGPD
  - [ ] Tests
  - [ ] Évolutions possibles
- [ ] S'entraîner à haute voix

---

## PHASE 7 : LIVRABLES FINAUX

### 7.1 Checklist Livrables

#### Tâche 7.1.1 : Vérifier exhaustivité
- [x] **Prototype fonctionnel**
  - [ ] Déployé et accessible
  - [ ] 3 modules opérationnels (Comptes, Infos, Diagnostics)
  
- [x] **Documentation technique**
  - [ ] MLD complet et valide
  - [ ] Comparatif 3 architectures avec justification
  - [ ] Guide d'installation détaillé
  
- [x] **Documentation tests**
  - [ ] Cahier de tests (scenarii détaillés)
  - [ ] Procédure de validation
  - [ ] Modèle PV de recette
  
- [x] **Dossier écrit** (15-20 pages)
  - [ ] Structuré selon consignes
  - [ ] Qualité professionnelle
  - [ ] Export PDF
  
- [x] **Support de soutenance**
  - [ ] Slides clairs et visuels
  - [ ] Export PDF

### 7.2 Dépôt et Remise

#### Tâche 7.2.1 : Soumettre les livrables
- [ ] Remettre dossier PDF au pilote 1 semaine avant soutenance
- [ ] Vérifier bon de réception
- [ ] Préparer clé USB de secours (dossier + support + code source)

---

## CALENDRIER PRÉVISIONNEL (3 mois)

### Mois 1 : Conception
- Semaines 1-2 : Modélisation BDD, UML, spécifications
- Semaines 3-4 : Architecture, comparatif, mockups

### Mois 2 : Développement
- Semaines 5-6 : Backend (entities, repositories, services)
- Semaines 7-8 : Backend (controllers, sécurité) + Frontend (structure, services)

### Mois 3 : Finalisation
- Semaines 9-10 : Frontend (composants, styling), Intégration
- Semaine 11 : Tests, documentation, dossier
- Semaine 12 : Relecture, préparation soutenance, dépôt dossier

---

## CRITÈRES D'ÉVALUATION (Rappel)

### Documentation technique (11 points)
- MLD : 3 points
- Comparatif solutions : 4 points
- Pertinence solution : 2 points
- Guide d'installation : 2 points

### Prototype fonctionnel (10 points)
- Livraison et démonstration : 10 points

### Tests et validation (5 points)
- Cahier de recette : 3 points
- Procédure validation : 1 point
- Modèle PV recette : 1 point

### Dossier et soutenance (4 points)
- Qualité : 4 points

**TOTAL : 30 points**

---

## CONSEILS ET BONNES PRATIQUES

### Gestion de Projet
- [ ] Utiliser un outil de gestion (Trello, Notion, GitHub Projects)
- [ ] Commits réguliers avec messages clairs
- [ ] Branching Git : develop, feature/*, hotfix/*
- [ ] Documentation du code (JavaDoc, JSDoc)

### Qualité du Code
- [ ] Respect conventions de nommage
- [ ] Code propre et lisible
- [ ] Éviter duplication (DRY)
- [ ] SOLID principles
- [ ] Commentaires pertinents

### Sécurité
- [ ] Ne JAMAIS commiter credentials (use .env)
- [ ] Validation inputs côté backend
- [ ] Protection CSRF
- [ ] CORS configuré correctement
- [ ] Cryptage passwords (BCrypt)
- [ ] JWT avec expiration

### Performance
- [ ] Indexer colonnes fréquemment recherchées (BDD)
- [ ] Lazy loading routes Angular
- [ ] Pagination des listes
- [ ] Caching (si temps)

### Points d'Attention Spécifiques
- [ ] **RGPD** : Mentionner conformité dans dossier
- [ ] **Échelle Holmes-Rahe** : Intégrer les vraies données
- [ ] **Responsive** : Tester sur mobile
- [ ] **Accessibilité** : Attributs ARIA (bonus)

---

## RESSOURCES UTILES

### Documentation Officielle
- Spring Boot : https://spring.io/projects/spring-boot
- Angular : https://angular.io/docs
- TailwindCSS : https://tailwindcss.com/docs

### Outils
- Modélisation BDD : Looping, JMerise, MySQL Workbench
- UML : PlantUML, Draw.io, StarUML
- Mockups : Figma, Balsamiq
- Tests API : Postman, Insomnia

### Échelle Holmes et Rahe
- https://actinutrition.fr/sante/stress/echelle-de-stress-holmes-rahe/
- https://www.jeromepoiraud.fr/wp-content/uploads/2015/06/Echelle-de-Holmes-et-Rahe-v2.pdf

---

**Bon courage pour votre projet ! 🚀**

*Document généré pour Léo DESMOULINS - CDA LM55N202 - Janvier 2026*
