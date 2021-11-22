let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require('./routes/admin');

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('get apis ', () => {

    
     // Test the GET route
     
    describe("GET /getuser", () => {
        it("It should GET all the users", (done) => {
            chai.request(server)
                .get("/getuser")
                .end((err, response) => {
                    response.should.have.status(200);
                    
                done();
                });
        });
       
});
})