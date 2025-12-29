// Type definitions and PropTypes
// For JSDoc type annotations and PropTypes

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string} fullName
 * @property {string} [avatar]
 */

/**
 * @typedef {Object} Tour
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string[]} images
 * @property {string} location
 * @property {number} duration
 * @property {number} rating
 * @property {number} reviewCount
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} tourId
 * @property {string} userId
 * @property {Date} date
 * @property {number} guests
 * @property {number} totalPrice
 * @property {string} status
 */

