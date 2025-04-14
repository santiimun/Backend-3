import { mocksSercive } from "../services/mocks.service.js";

class MocksController {

    getMockingUsers = async (req, res) => {
        const users = await mocksSercive.generateMockUsers(50);
        res.send({ status: "success", payload: users });
    };

    getMockingPets = async (req, res) => {
        const pets = await mocksSercive.generateMockPets(50);
        res.send({ status: "success", payload: pets });
    };

    generateData = async (req, res) => {
        const { users, pets } = req.query;

        const result = await mocksSercive.generateData({
            users: parseInt(users) || 0,
            pets: parseInt(pets) || 0,
        });

        res.send({ status: "success", message: "Datos generados", ...result });
    };

}
export const mocksController = new MocksController();