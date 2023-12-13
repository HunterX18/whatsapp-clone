import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useState, useRef } from "react";
import Avatar from "../common/Avatar";
import { FaStop, FaPlay } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import WaveSurfer from "wavesurfer.js";
import { HOST } from "@/utils/ApiRoutes";

function VoiceMessage({ message }) {
	const {
		state: { userInfo, currentChatUser },
	} = useStateProvider();
	const [audioMessage, setAudioMessage] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
	const [totalDuration, setTotalDuration] = useState(0);
	const isMounted = useRef(true);

	const waveFormRef = useRef(null);
	const waveform = useRef(null);

	const formatTime = (time) => {
		if (isNaN(time)) return "00:00";
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	useEffect(() => {
		if (waveform.current === null) {
			waveform.current = WaveSurfer.create({
				container: waveFormRef.current,
				waveColor: "#ccc",
				progressColor: "#4a9eff",
				cursorColor: "#7ae3c3",
				barWidth: 2,
				height: 30,
				responsive: true,
			});
		}
		waveform.current.on("finish", () => {
			setIsPlaying(false);
		});
		console.log("useEffect 1");
		return () => {
			console.log("cleanup function");
			waveform.current.destroy();
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		const fetchAudio = async () => {
			const response = await fetch(
				"http://localhost:5000/uploads/recordings/1702107827004recording.mp3"
			);
			if (!response.ok) {
				throw new Error("Failed to fetch audio file");
			}

			// Convert the response to a blob
			const blob = await response.blob();

			// Create a new Audio instance with the blob
			const audio = new Audio(URL.createObjectURL(blob));
			return audio;
			// Update the state to trigger a re-render with the new Audio instance
		};
		const audio = fetchAudio();
		setAudioMessage(audio);
		const audioURL = `${HOST}/${message.message}`;
		// const audio = new Audio(audioURL);
		console.log("useEffect 2");
		// console.log(audioURL);
		if (waveform.current && isMounted.current) {
			waveform.current.load(audioURL);
			waveform.current.on("ready", () => {
				setTotalDuration(waveform.current.getDuration());
			});
		}
	}, [message.message]);

	useEffect(() => {
		if (audioMessage) {
			const updatePlaybackTime = () => {
				setCurrentPlaybackTime(audioMessage.currentTime);
			};
			audioMessage.addEventListener("timeupdate", updatePlaybackTime);
			return () => {
				audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
			};
		}
	}, [audioMessage]);

	const handlePlayAudio = () => {
		if (audioMessage && waveform.current && isMounted.current) {
			console.log(waveform.current);
			waveform.current.stop();
			waveform.current.play();
			audioMessage.play();
			setIsPlaying(true);
		}
	};

	const handlePauseAudio = () => {
		waveform.current.stop();
		audioMessage.pause();
		setIsPlaying(false);
	};
	return (
		<div
			className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-m ${
				message.senderId === currentChatUser.id
					? "bg-incoming-background"
					: "bg-outgoing-background"
			}`}
		>
			<div>
				<Avatar type="lg" image={currentChatUser?.profilePicture} />
			</div>
			<div className="cursor-pointer text-xl">
				{!isPlaying ? (
					<FaPlay onClick={handlePlayAudio} />
				) : (
					<FaStop onClick={handlePauseAudio} />
				)}
			</div>
			<div className="relative">
				<div className="w-60" ref={waveFormRef} />
				<div className="text-bubble-meta text-[11px] pt-1 flex justify-between absolutel bottom-[-22px] w-full">
					<span>
						{formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
					</span>
					<div className="flex gap-1">
						<span>{calculateTime(message.createdAt)}</span>
						{message.senderId === userInfo.id && (
							<MessageStatus messageStatus={message.messageStatus} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VoiceMessage;
