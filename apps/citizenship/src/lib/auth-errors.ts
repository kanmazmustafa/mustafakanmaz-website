/**
 * Utility to map Firebase Auth error codes to translation keys.
 * Keys should exist in your auth.json message bundle.
 */
export function mapAuthCodeToKey(code: string): string {
    switch (code) {
        case 'auth/invalid-email':
            return 'error_invalid_email';
        case 'auth/user-disabled':
            return 'error_user_disabled';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return 'error_invalid_credentials';
        case 'auth/email-already-in-use':
            return 'error_email_in_use';
        case 'auth/weak-password':
            return 'error_weak_password';
        case 'auth/operation-not-allowed':
            return 'error_operation_not_allowed';
        case 'auth/popup-closed-by-user':
            return 'error_popup_closed';
        default:
            return 'error_generic';
    }
}
