import { Message } from "@/model/User";

export interface ApiResponse {
    success: boolean;
    message: string;
    isMsgAccepted?: boolean;
    messages?:Array<Message>;
}