const fs = require('fs')
const path = require('path')

class Cube {
    constructor() {
        this.data = require('../config/database.json');
    }
    // "lastIndex":0,
    // "entities":[]

    _writeToDatabase(newData, resolvedData) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                this.data = newData;
                resolve(resolvedData)
            })
        })
    }

    insert(newCube) {
        let newIndex = this.data.lastIndex+1;
        let newEntity = {
            id: newIndex,
            ...newCube
        }
        let newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newEntity)
        }
        return this._writeToDatabase(newData, newEntity);

    }

    update(id, updates) {
        const cubeToUpdateIndex = this.data.entities.findIndex(x => x.id === id);
        const cubeToUpdate = this.data.entities[cubeToUpdateIndex];
        const updatedCube = {
            ...cubeToUpdate,
            ...updates
        };
        let newData = {
            lastIndex: this.data.lastIndex,
            entities:
                /**We use slice for not to modify original data, because if we use splice and replace originalCube with updated when we writeFile if we have error the date will not be correct */
                [
                    ...this.data.entities.slice(0, cubeToUpdateIndex),
                    updatedCube,
                    ...this.data.entities.slice(cubeToUpdateIndex + 1)
                ]
        }
        return this._writeToDatabase(newData, updatedCube);
    }

    delete(id) {
        const cubeToDeleteIndex = this.data.entities.findIndex(x => x.id === id);
        const cubeToDelete = this.data.entities[cubeToDeleteIndex];
        let newData = {
            lastIndex: this.data.lastIndex,
            entities:
                /**We use slice for not to modify original data, because if we use splice and replace originalCube with updated when we writeFile if we have error the date will not be correct */
                [
                    ...this.data.entities.slice(0, cubeToUpdateIndex),
                    ...this.data.entities.slice(cubeToUpdateIndex + 1)
                ]
        }
        return this._writeToDatabase(newData, cubeToDelete);
    }

    getOne(id) {
        return Promise.resolve(this.data.entities.find(x => x.id == id));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }

    
}

module.exports = new Cube();