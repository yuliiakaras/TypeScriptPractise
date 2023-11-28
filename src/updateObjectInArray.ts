export function updateObjectInArray<ObjectShape>(
    initialArray: ObjectShape[], 
    key: keyof ObjectShape, 
    value: ObjectShape[keyof ObjectShape], 
    patch: Partial<ObjectShape>) : ObjectShape[] {
        
    let arrayCopy: ObjectShape[] = [...initialArray];
    const index: number = arrayCopy.findIndex(obj => obj[key] === value);

    if (index === -1) {
        throw new Error('Object not found');
    }
    
    arrayCopy[index] = {...arrayCopy[index], ...patch};

    return arrayCopy;
}