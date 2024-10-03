/**
 * Rute yang dapat diakses oleh pengguna yang tidak masuk log.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/api/uploadthing",
  "/api/testimonials",
  "/community",
];

/**
* Rute yang dapat diakses oleh pengguna yang masuk log.
* @type {string[]}
*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/complete-registration"
];

/**
* Awalan untuk rute yang ada di API.
* @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/**
* URL pengalihan default ketika pengguna berhasil masuk log.
* @type {string}
*/
export const DEFAULT_REDIRECT_URL = "/";