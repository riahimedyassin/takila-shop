import bcrypt from 'bcrypt';
import { HashingManager } from './HashingManager';
import { injectable } from 'inversify';

@injectable()
export class HashingManagerImpl implements HashingManager {
    public async encode(data: string): Promise<string> {    
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data,salt); 
        return hashed ; 
    }
    public async isMatching(data: string, encoded: string): Promise<boolean> {
        return await bcrypt.compare(data,encoded)
    }
}