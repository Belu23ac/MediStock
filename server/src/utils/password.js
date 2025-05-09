/**
 * Compares a plain text password with a stored password.
 * @param {string} plainPassword - The plain text password.
 * @param {string} storedPassword - The password stored in the database.
 * @returns {Promise<boolean>} - Returns true if the passwords match, otherwise false.
 */
export async function comparePassword(plainPassword, storedPassword) {
    try {
        return plainPassword === storedPassword;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
}
