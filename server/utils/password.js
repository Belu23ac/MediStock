export async function comparePassword(plainPassword, storedPassword) {
    try {
        return plainPassword === storedPassword;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
}
