import AdoptionDao from "../../src/dao/Adoption.js";
import mongoose from "mongoose";
import chai from 'chai';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_DB_TEST);

const expect = chai.expect;

describe('Testing Adoption DAO', () => {

    before(function(){
        this.adoptionDao = new AdoptionDao();
    })

    beforeEach(function(){
        mongoose.connection.collections.adoptions.drop()
    })

    it('El dao debe devolver todas las adopciones en un arreglo', async function () {
        const emptyArray = []

        const result = await this.adoptionDao.get();
        
        expect(result).to.be.deep.equal(emptyArray);
        expect(Array.isArray(result)).to.be.ok;
        expect(Array.isArray(result)).to.be.equal(true);
        expect(result.length).to.be.deep.equal(emptyArray.length);
    })

    it('El dao debe agregar una adopción a la BD', async function () {
        const mockAdoption = {
            owner: new mongoose.Types.ObjectId(), 
            pet: new mongoose.Types.ObjectId()
        };

        const result = await this.adoptionDao.save(mockAdoption);

        expect(result).to.have.property('_id');
        expect(result.owner.toString()).to.equal(mockAdoption.owner.toString());
        expect(result.pet.toString()).to.equal(mockAdoption.pet.toString());
    });

    it('El dao debe buscar una adoption por id correctamente', async function () {
        const mockAdoption = {
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId()
        };

        const saved = await this.adoptionDao.save(mockAdoption);
        const result = await this.adoptionDao.getBy({ _id: saved._id });

        expect(result).to.not.be.null;
        expect(result._id.toString()).to.equal(saved._id.toString());
    });

    it('El dao debe actualizar una adopcion de forma correcta', async function () {
        const mockAdoption = {
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId()
        };

        const saved = await this.adoptionDao.save(mockAdoption);
        const newPetId = new mongoose.Types.ObjectId();
        const updated = await this.adoptionDao.update(saved._id, { pet: newPetId });
        
        expect(saved).to.have.property('_id');
        expect(updated).to.not.be.null;
        expect(updated.pet.toString()).to.equal(newPetId.toString());
    });

    it('El dao debe eliminar una adopción exitosamente', async function () {
        const mockAdoption = {
            owner: new mongoose.Types.ObjectId(),
            pet: new mongoose.Types.ObjectId()
        };

        const saved = await this.adoptionDao.save(mockAdoption);
        await this.adoptionDao.delete(saved._id);
        const result = await this.adoptionDao.getBy({ _id: saved._id });

        expect(result).to.be.null;
    });
})

