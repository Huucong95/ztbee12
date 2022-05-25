export declare const generateSessionId: (length: number) => string;
export interface InfoTokenOrderWithoutLogin {
    email: string;
    phone: string;
    fullName: string;
}
export declare const generateTokenForOrderWithoutLogin: (data: InfoTokenOrderWithoutLogin) => string;
