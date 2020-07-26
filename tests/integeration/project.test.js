 const request=require('supertest');
 const axios =require('axios');
 let server;
 describe('/projects',()=>{
     const login=async ()=>{
         //log in and I assume you user is registered
         const res =await axios
             .post('http://localhost:4000/users/login',{
                 email:"osama11@gmail.com",
                 password:"123456aA@"
             })

         return res;
     }
     let token="";
     let user={}
     it("test login",async ()=>{
         let r=await login();
         expect(r.status).toBe(200)
         expect(r.data).toMatchObject({status:"success",
             message:"1 user is fetched- login in success"})
         expect(r.data).hasOwnProperty("user")
     })
    beforeEach(async ()=>{
        server=require('../../server');
        let res=await login();
        token=res.data.token;
        user=res.data.user;
          // console.log(token,user)
    });
    afterEach(()=>{
        server.close();
    })

    it('get all project path = /projects/userId',async ()=>{
       const res=await request(server).get(`/projects/${user.id}`)
           .set('authorization',`Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body.hasOwnProperty("projects"))
        expect(res.body).toMatchObject({ status:"success",
               message:"Successfully fetched users ..."})
     })

   it("test test ",()=>{
       expect(1).toBe(1)
   })

   describe("post ",()=>{
       it('post project path = /projects/userId',async ()=>{
           const res=await request(server).post(`/projects/${user.id}`)
               .set('authorization',`Bearer ${token}`)
               .send({
                   "name":"React Node Project",
                   "status_progress":"In Review",
                   "status_provider":"aquire",
                   "resources":8,
                   "complicity":60,
                   "price":50,
                   "provider":"Alialiaaa",
                   "start_date":"2012-03-22",
                   "end_date":"2014/05/04",
                   "offers":44
               })

           expect(res.status).toBe(201)
             expect(res.body.hasOwnProperty("project"))
           expect(res.body).toMatchObject({
               status:"success",
               message:"1 product is added"
           })
       })

   })
})

