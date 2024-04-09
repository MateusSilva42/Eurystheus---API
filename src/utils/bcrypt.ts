import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export function encryptData(data: string | undefined): string {
    if (!data) return 'Erro ao criptografar';
    return bcrypt.hashSync(data, saltRounds);
}

export function compareData(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
}