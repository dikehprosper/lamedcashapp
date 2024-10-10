import DOMAIN from "@/components/(Utils)/domain";
import { io } from "socket.io-client";

const socket = io(DOMAIN);

export default socket;
