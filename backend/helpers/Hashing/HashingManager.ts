


/**
 * @interface
 * @description Hashing Manager Interface
 */
export interface HashingManager {
    /**
     * @public
     * @async
     * @description Given a string, return a hashed value of that value 
     * @param {string} data 
     * @returns {Promise<string>} 
     */
    encode(data :string ) : Promise<string> ;
    /**
     * @public
     * @async
     * @description Return true if the data and the hashed data matches
     * @param {string} data 
     * @param {string} encoded 
     * @returns {Promise<boolean>}
     */ 
    isMatching(data : string , encoded : string ) : Promise<boolean>
}