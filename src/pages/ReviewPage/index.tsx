import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MediaRenderer } from "../../components/MediaRenderer";
import Text from "../../components/Text";
import {
  approveMeme,
  getAllMyMemesInReview,
  rejectMeme,
} from "../../queries/memes";
import { Meme } from "../../supabase/types";
import { useUser } from "../../supabase/useUser";

export const ReviewPage = () => {
  const [reviewList, setReviewList] = useState<Meme[]>([]);
  const { supabaseClient } = useSessionContext();

  const { userDetails } = useUser();

  useEffect(() => {
    const fetchMemes = async () => {
      if (userDetails) {
        try {
          const { data, error } = await getAllMyMemesInReview(
            supabaseClient,
            userDetails.id
          );
          if (error) {
            throw error;
          }
          if (data) {
            setReviewList(data);
          }
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    };
    fetchMemes();
  }, [supabaseClient, userDetails]);

  const onApproveClick = async (meme: Meme) => {
    try {
      const { error, data } = await approveMeme(supabaseClient, meme);

      if (error) {
        throw new Error(error.message);
      }
      onUpdateMeme(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onRejectClick = async (meme: Meme) => {
    try {
      const { error, data } = await rejectMeme(supabaseClient, meme);

      if (error) {
        throw new Error(error.message);
      }

      onUpdateMeme(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const onUpdateMeme = (meme: Meme) => {
    const tempList = [...reviewList];
    const memeIndex = tempList.findIndex((review) => review.id === meme.id);

    tempList[memeIndex].status = meme.status;

    setReviewList(tempList);
  };
  return (
    <Container sx={{ paddingY: 4 }}>
      <Text variant="h4">Reviews</Text>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Media</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewList.map((meme, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell sx={{ maxWidth: "15rem" }}>
                  <MediaRenderer
                    type={meme.media_type || ""}
                    src={meme.media_url}
                  />
                </TableCell>
                <TableCell>{meme.title}</TableCell>
                <TableCell>
                  {new Date(meme.created_at || "").toDateString()}
                </TableCell>
                <TableCell>{meme.created_by}</TableCell>
                <TableCell>
                  {meme.status !== "review" ? (
                    <Box>
                      <Chip
                        color={
                          meme.status === "published" ? "success" : "error"
                        }
                        label={meme.status}
                      />
                    </Box>
                  ) : (
                    <Box display={"flex"}>
                      <IconButton
                        color="error"
                        onClick={() => {
                          onRejectClick(meme);
                        }}
                      >
                        <ThumbDownIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={() => {
                          onApproveClick(meme);
                        }}
                      >
                        <ThumbUpIcon />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
