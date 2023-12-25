import { Box } from "@mui/material";
import { useRef, useState } from "react";

function VideoPreviewer({ url }: { url: string }) {
  const [playing, togglePlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onPlay = () => {
    videoRef.current?.play();
    togglePlaying(!playing);
  };

  const onEnd = () => {
    if (videoRef.current) videoRef.current.currentTime = 0;
    togglePlaying(false);
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "160px",
      }}
    >
      <video
        width="100%"
        height={playing ? "100%" : "160px"}
        style={{
          background: "black",
          maxHeight: "160px",
          objectFit: playing ? "contain" : "cover",
        }}
        controls={playing}
        onEnded={onEnd}
        ref={videoRef}
      >
        <source src={url} />
      </video>

      {playing ? null : (
        <div
          onClick={onPlay}
          style={{
            backgroundColor: "#00000038",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: "0%",
            right: "0%",
            top: "0%",
            bottom: "0%",
            margin: "auto",
          }}
        >
          <div
            style={{
              backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA41JREFUaEPtmU2oVVUUx39/RTFtlDqw/CAKlCQHKj1sZhOpJgr28UiwiFJ4Co3SV4IDC5+zxPckM2iQlPRFQdFEdKQDq1EGGk7yo4kfoxCemauz4tzHfcdz7zl7n32f3nBN7uCutfb677X2Omv/t+hzUZ/Hz30AdzuDSTJgZtOBAWAtsBJYBiwAHswB/gX8CZwDfgFOAKcl/dN0AxoBMLPFwDbgFeDhwGAuA0eAMUkXA20n1KMAmNl84H3g1ex3Ruziud1N4BNgl6Srob6CAZjZJmA/8FDoYhX614Dtkj4P8VsbgJnNBA4Cr4csEKH7kZelpL/r2NYCYGZzgK+BdXWcJtD5Edgo6UaVr0oAZuY1/h3wbJWzxP8fA56X5Geko9QB8PEUlE2nAA9J2hoNID+wnybe2VB3g5KOdjLqmAEzmwucBeaFrphY/zqwtFOL7QbAu8EbiYOJdXdQ0lCZcSkAM1sEnAe8dYbK5rzdeudKJd5SH5d0oeiwE4B9wNsxq0uSmT0BfAn4byoZkTRcCcDMpgF/AAtjVnYAbmdmDwAfZEPcmzF+Smx8dlpSHADvyICZPQ2cjF20BaBlb2Y+L40CKUpqQNLp9tjKALwLvJcKQJ6NVCU1LGmkCsA3wIaUABKW1FeSXqgC8FuTw1csoeJGNCypM5KerALgY230qFwFIM+G39i+yAbEScHUyPpVSX4XmZCyMzAe2f//c1oHQIOSGs/OwKz/PYC+L6Ez2Vd0eY16LFWpKqGGh/hXSSuqSqjv2+g7OeMQlYSyDJhZbNcpxrBTks9pXbvQGuBUVPQlXahhyRTDeErST1UA7tVhzkfpRyXd7gog79E+b+yIyUIPx+m92QXfy3uS9OJC81rC6bMVrH9cH5PkI3U1gDwLHwJbYrLQA5tRSdvL/PbDpd4/rMuCL/V5FgaBz3qwoyEuX5Tk19NSqUNsHUp4LQwJ3HWdenf6vqPUAeDU4rfZg8Rzoas31P8BWC/pViMAeSnNzlmGqQLxPfBSEnK3hT4neQ9MQWcaA96q2vlWXJUlVEyfmb0MOJDUlOMVYKjbgQ1qo93qLudN9+SsdQx71+7eP1KHMypptyTnQYMkOAPt3s3MyS/nLP2Rz+nIEPGHvdYj3x1f2LqOGgFoOx8+AK4GngFWOZuc7eojhWfWS8DvwM/AcX9uLQ5mdYNu10sCIGbhVDb3AaTayVg/fZ+BfwH9gypAjb+SFgAAAABJRU5ErkJggg==')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "30%",
              height: "30%",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      )}
    </Box>
  );
}

export default VideoPreviewer;
