import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import schema from './schema';
import {ApolloServer} from 'apollo-server-express';
import expresPlayground from 'graphql-playground-middleware-express';

const app = express()
app.use(cors())
app.use(compression())

const servidor = new ApolloServer({
    schema,
    introspection: true
})

servidor.applyMiddleware({app});

app.get('/',expresPlayground({
    endpoint: '/graphql'
}));

app.get('/' , (req,res)=>{
    res.send("Checkpoint desde express")
});

const puerto = 5400;
const httpServer = createServer(app)

httpServer.listen(
    {port: puerto},
    () => console.log("Escuchando por el puerto: http://localhost:" + puerto+"/graphql")
)