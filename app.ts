import express from "express";
console.log(process.env.DEBUG)



type ServerPathList = {get: string[], post: string[]}

let app = express()

let port = process.env.PORT || 3000



app.use( (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


app.get('/', (req,res) =>{

    let stack = app._router.stack

    let paths : ServerPathList ={get:[] , post:[]}
    stack.forEach(function(r: any ){
        if (r.route && r.route.path){

            if(r.route.methods.get){
                paths.get.push(r.route.path)
            }
            if (r.route.methods.post){
                paths.post.push(r.route.path)
            }
        }
      })

    res.send({paths})

})


//#region GET
app.get('/user/:id', (req,res) => {

    

    res.send({userId: req.params.id})
})

app.get('/user/:id/artifacts', (req,res) => {
    res.send([{uuid:'id', set:'Initiate', type:'Flower', main_stat:'HP+', substats:[{type:'HP+', value:'200'}]}])
})

app.get('/artifact/sets', (req,res) => {
    res.send([{id:1, name:'Initiate'}])
})

app.get('/artifact/sets/:id', (req,res) => {
    res.send([{id:req.params.id, name:'Initiate'}])
})

app.get('/artifact/types', (req,res) => {
    res.send([{id:1, name:'Flower', possible_main_stats:['HP+']}])
})

//#endregion GET

//#region POST
app.post('/users/new', (req,res) => {
    let body = req.body
    console.log(body)
})
//#endregion POST

let sv = app.listen(port, () => {
    console.log('listening')
})
