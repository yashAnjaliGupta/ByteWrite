import { Hono } from 'hono'
import users  from "./routes/user.routes";
import blogs from "./routes/blog.routes";
import blogsPublic from "./routes/blogPublic.routes";
import preview from "./routes/preview.routes";
import { cors } from 'hono/cors';


const app = new Hono();

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://bytewrite.yashguptaiiit.in"
    ],
    allowMethods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
      "PATCH"
    ],
    allowHeaders: [
      "Content-Type",
      "Authorization"
    ],
    credentials: true
  })
);
app.get('/',(c)=>{
    return c.text("hello");
})
app.route('/v1/api/users',users);
app.route('/v1/api/publicblogs',blogsPublic);
app.route('/v1/api/blogs',blogs);
app.route("/share/blog", preview);



export default app
