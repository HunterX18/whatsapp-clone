import { useStateProvider } from "@/context/StateContext";
import { data } from "autoprefixer";
import dynamic from "next/dynamic";
import React from "react";
const Container = dynamic(() => import("./Container"), {
	ssr: false,
});
import { useEffect } from "react";

function VideoCall() {
	const {
		state: { videoCall, socket, userInfo },
	} = useStateProvider();
	useEffect(() => {
		if (videoCall.type === "out-going") {
			socket.current.emit("outgoing-video-call", {
				to: videoCall.id,
				from: {
					id: userInfo.id,
					profilePicture: userInfo.profileImage,
					name: userInfo.name,
				},
				callType: videoCall.callType,
				roomId: videoCall.roomId,
			});
		}
	}, [videoCall]);
	return <Container data={videoCall} />;
}

export default VideoCall;
