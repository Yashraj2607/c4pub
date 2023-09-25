const express= require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {postRouter}= require("./routes/post.routes")
// const {postRouter}=require("./routes/post.routes")

const cors=require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({"mgs":"welcome to homepage"})
})
app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(8080,async(req,res)=>{
    try {
        await connection
        console.log("connnected to database")
        console.log("app is running at port 8080")
    } catch (error) {
        console.log(error)
    }
    
})