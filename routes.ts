/**
 * Routes that can be accessed by users who are not logged in.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/api/uploadthing",
  "/api/testimonials",
  "/courses",
  "/courses/explore",
  "/courses/[id]",
];

/**
* Routes that can be accessed by users who are logged in.
* @type {string[]}
*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/complete-registration"
];

/**
* Prefix for API routes.
* @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/**
* Default redirect URL when a user successfully logs in.
* @type {string}
*/
export const DEFAULT_REDIRECT_URL = "/";