import fs from 'fs'

class ProductManager {
    
    constructor(path) {
        this.path = path;
    }

    async getAllProducts() {
        try {
            const users = await fs.promises.readFile(this.path, "utf-8");
            
            return JSON.parse(users);
        } catch (error) {
            
            
            return [];
        }
    }

    async getProductById(Id) {
        const users = await this.getAllProducts();

        for (let key in users) {
            if (users[key].Id == Id) {
                return {
                    code: 200,
                    user: users[key]
                };
            }
        }

        return {
            code: 400,
            message: `El usuario ${Id} no existe!`
        };
    }

    async createProduct(user) {
        const users = await this.getAllProducts();

        const newUser = {
            Id: this.getProductId(users),
            LastName: user.LastName || "Sin Apellido",
            Name: user.Name || "Sin Nombre",
            Age: user.Age || "Sin Edad",
        };
        users.push(newUser);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));

            return newUser;
        } catch(e) {
            return {
                message: "Error al crear el producto!"
            };
        }
    }

    getProductId(Users) {
        
        const usersLength = Users.length;
        if (usersLength > 0) {
            return parseInt(Users[usersLength -1].Id) + 1;
        }

        return 1;
    }

    async updateProduct(Id, User) {
        const users = await this.getAllProducts();
        let userUpdated = {};

        for (let key in users) {
            if (users[key].Id == Id) {
                users[key].Name = User.Name ? User.Name : users[key].Name;
                users[key].LastName = User.LastName ? User.LastName : users[key].LastName;
                users[key].Age = User.Age ? User.Age : users[key].Age;

                userUpdated = users[key];
            }
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"));

            return userUpdated;
        } catch(e) {
            return {
                message: "Error al actualizar el producto"
            };
        }
    }

    async deleteProductById(Id) {
        
        const users = await this.getAllProducts();
        const initLength = users.length;

        const usersProcessed = users.filter((user) => user.Id != Id);

        const finalLength = usersProcessed.length;

        try {
            if (initLength == finalLength) {
                throw new Error(`No fue posible eliminar el usuario ${Id}`);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(usersProcessed, null, "\t"));

            return {
                code: 200,
                message : `El usuario ${Id} fue eliminado correctamente`
            };
        } catch(e) {
            return {
                code: 400,
                message: e.message
            };
        }
    }
}

export default ProductManager;




