import { Hono } from 'hono'
import users  from "./routes/user.routes";
import blogs from "./routes/blog.routes";


const app = new Hono();

app.get('/',(c)=>{
    
    return c.text("hello");
})
app.route('/v1/api/users',users);
app.route('/v1/api/blogs',blogs);
export default app
