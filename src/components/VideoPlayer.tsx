import {
  PauseCircleFilled,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import { MouseEvent, useEffect, useRef, useState } from "react";

export const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Play the video and pause other videos
  const handlePlay = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (videoRef.current) {
      // Emit a custom event to notify other videos to pause
      window.dispatchEvent(new Event("pauseAllVideos"));
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause the video
  const handlePause = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Event listener to pause this video when another video starts playing
    const pauseVideo = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("pauseAllVideos", pauseVideo);

    return () => {
      window.removeEventListener("pauseAllVideos", pauseVideo);
    };
  }, []);

  const iconSize = "60px";

  // Hide controls after 2 seconds on mouse leave
  const handleMouseLeave = () => {
    if (isPlaying) {
      setTimeout(() => {
        setShowControls(false);
      }, 500);
    }
  };

  return (
    <Box
      position={"relative"}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
        onEnded={() => setIsPlaying(false)}
      />
      {showControls ? (
        <Box
          position={"absolute"}
          top={0}
          height={"100%"}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={isPlaying ? undefined : alpha("#000", 0.3)}
        >
          {isPlaying ? (
            <IconButton
              aria-label="Pause Button"
              onClick={handlePause}
              component={"span"}
            >
              <PauseCircleFilled sx={{ fontSize: iconSize }} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Play Button"
              onClick={handlePlay}
              component={"span"}
            >
              <PlayCircleFilledOutlined sx={{ fontSize: iconSize }} />
            </IconButton>
          )}
        </Box>
      ) : null}
    </Box>
  );
};
