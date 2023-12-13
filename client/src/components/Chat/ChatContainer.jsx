import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useState } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";
import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), {
	ssr: false,
});
// import VoiceMessage from "./VoiceMessage";

function ChatContainer() {
	const {
		state: { messages, userInfo, currentChatUser },
	} = useStateProvider();

	return (
		<div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar relative">
			<div className="bg-chat-background bg-fixed h-full w-full left-0 top-0 z-0 opacity-5 fixed absolute"></div>
			<div className="mx-10 my-6 relative bottom-0 z-40 left-0">
				<div className="flex w-full relative z-10">
					<div className="flex flex-col justify-end w-full gap-1 overflow-auto">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.senderId === currentChatUser.id
										? "justify-start"
										: "justify-end"
								}`}
							>
								{message.type === "text" && (
									<div
										className={`opacity-70 text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
											message.senderId === currentChatUser.id
												? "bg-incoming-background"
												: "bg-outgoing-background"
										}`}
									>
										<span className="break-all">{message.message} </span>
										<div className="flex gap-1 items-end">
											<span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
												{calculateTime(message.createdAt)}
											</span>
											<span>
												{message.senderId === userInfo.id && (
													<MessageStatus
														messageStatus={message.messageStatus}
													/>
												)}
											</span>
										</div>
									</div>
								)}
								{message.type === "image" && <ImageMessage message={message} />}
								{/* {message.type === "audio" && <VoiceMessage message={message} />} */}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChatContainer;
