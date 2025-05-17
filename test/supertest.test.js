import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe('Testing Adopme App', () => {


    describe('Testing Login y Sessions con Cookies', ()=>{
        before(function(){
            const random = Math.floor(Math.random() * 100000);
            this.mockUser = {
                first_name: "Usuario de prueba",
                last_name: "Apellido de prueba",
                email: `maildeprueba+${random}@gmail.com`,
                password: "12345"
        };
            
        });
        

        it('Test para Registrar un usuario correctamente',async function() {
            const {statusCode, _body} = await requester.post('/api/sessions/register').send(this.mockUser);
            
            
            expect(statusCode).is.equal(200)
        })


        it('Test para Login de un usuario exitosamente', async function () {
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password,
            }

            const result = await requester.post("/api/sessions/login").send(mockLogin)
            const cookieResult =  result.headers['set-cookie'][0]
            const cookieData = cookieResult.split('=')
            this.cookie = {
                name: cookieData[0],
                value: cookieData[1]
            }


            expect(this.cookie.name).to.be.ok.and.equal('coderCookie')
            expect(this.cookie.value).to.be.ok


        })

        it('Test de ruta protegida, enviar una cookie y destructurarla', async function () {
            const {_body} = await requester.get('/api/sessions/current').set('cookie', [`${this.cookie.name}=${this.cookie.value}`])
            
            expect(_body.payload.email).to.be.ok.and.equal(this.mockUser.email)
        } )

    })
})