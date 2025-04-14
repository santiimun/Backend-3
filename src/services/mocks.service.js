import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

class MocksService {


    generateMockUsers =  (count = 1) => {
        const passwordHash = bcrypt.hashSync("coder123", 10);
        const users = [];
        for (let i = 0; i < count; i++) {
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: passwordHash,
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            });
        }
        return users;
    };

    generateMockPets = (count = 1) => {
        const pets = [];
    
        for (let i = 0; i < count; i++) {
            pets.push({
                name: faker.animal.dog(),
                specie: faker.helpers.arrayElement(["dog", "cat"]),
                birthDate: faker.date.birthdate({ min: 1, max: 15, mode: "age" }),
                adopted: faker.datatype.boolean(),
                owner: null,
                image: faker.image.urlLoremFlickr({ category: "animals" })
            });
        }
    
        return pets;
    };


    generateData = async ({ users = 0, pets = 0 }) => {
        const mockUsers = this.generateMockUsers(users);
        const insertedUsers = await userModel.insertMany(mockUsers);
    
        const mockPets = this.generateMockPets(pets);
        const insertedPets = await petModel.insertMany(mockPets);
    
        return {
            usersInserted: insertedUsers.length,
            petsInserted: insertedPets.length,
        };
    };
}

export const mocksSercive = new MocksService();