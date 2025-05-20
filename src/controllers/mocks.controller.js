import { mocksService } from "../services/mocks.service.js";

class MocksController {

    getMockingUsers = async (req, res) => {
        const count = parseInt(req.query.count) || 1;
        const users = await mocksService.generateMockUsers(count);
        res.send({ status: "success", payload: users });
    };

    getMockingPets = async (req, res) => {
        const count = parseInt(req.query.count) || 1;
        const pets = await mocksService.generateMockPets(count);
        res.send({ status: "success", payload: pets });
    };

    generateData = async (req, res) => {
        const { users, pets } = req.query;

        const result = await mocksService.generateData({
            users: parseInt(users) || 0,
            pets: parseInt(pets) || 0,
        });

        res.send({ status: "success", message: "Datos generados", ...result });
    };

}
export const mocksController = new MocksController();