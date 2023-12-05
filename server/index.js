import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { checkUser } from "./controllers/AuthController.js";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static("uploads/images"));

app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(5000, () => {
	console.log(`server started on port 5000`);
});

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
	global.chatSocket = socket;
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id);
		// console.log(onlineUsers);
	});
	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		// console.log(sendUserSocket);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-received", {
				from: data.from,
				message: data.message,
			});
		}
	});
	socket.on("signout", id => {
		onlineUsers.delete(id);
		// socket.broadcast.emit("online-users")
	})
});
